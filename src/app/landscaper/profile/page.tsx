'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MessageSquare, Image as ImageIcon, Settings, Award, MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react'
import { api } from '@/lib/api-client'
import ShimmerSkeleton from '../_components/ShimmerSkeleton'
import ErrorBanner from '../_components/ErrorBanner'

interface ProfileData {
  name: string
  email: string
  phone: string
  address: string
  companyName: string
  bio: string
  experience: number
  isVerified: boolean
}

interface PortfolioImage {
  id: string
  url: string
  category: string
  description: string | null
}

interface ReviewItem {
  id: string
  customer: string
  rating: number
  comment: string
  date: string
  avatar: string
}

interface ReviewsData {
  averageRating: number
  totalReviews: number
  reviews: ReviewItem[]
}

export default function LandscaperProfilePage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [portfolio, setPortfolio] = useState<PortfolioImage[]>([])
  const [reviews, setReviews] = useState<ReviewsData | null>(null)

  const fetchData = async () => {
    try {
      setStatus('loading')
      const [profileRes, portfolioRes, reviewsRes] = await Promise.all([
        api.get<ProfileData>('/api/landscaper/profile'),
        api.get<{ images: PortfolioImage[] }>('/api/landscaper/portfolio'),
        api.get<ReviewsData>('/api/landscaper/reviews?limit=3'),
      ])
      setProfile(profileRes)
      setPortfolio(portfolioRes.images)
      setReviews(reviewsRes)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    queueMicrotask(() => fetchData())
  }, [])

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-white">Profilim</h1>
        <Link href="/landscaper/settings"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-[12px] text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all">
          <Settings size={14} />
          Düzenle
        </Link>
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ShimmerSkeleton variant="card" count={1} />
          </div>
          <div className="md:col-span-2">
            <ShimmerSkeleton variant="card" count={2} />
          </div>
        </div>
      )}

      {status === 'error' && (
        <ErrorBanner message="Profil bilgileri yüklenirken bir hata oluştu" onRetry={fetchData} />
      )}

      {status === 'success' && profile && (
        <>
          {/* Profile Header */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-2xl font-bold text-dark-forest shrink-0">
                {profile.name.charAt(0)}
                {profile.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 border-2 border-[#0a2e1a] flex items-center justify-center">
                    <Award size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-white">{profile.companyName || profile.name}</h2>
                  {profile.isVerified && (
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Doğrulanmış</span>
                  )}
                </div>
                {profile.companyName && (
                  <p className="text-sm text-white/50">{profile.name}</p>
                )}
                {profile.bio && (
                  <p className="text-sm text-white/60 mt-2 line-clamp-2">{profile.bio}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/40">
                  {profile.experience > 0 && (
                    <span className="flex items-center gap-1"><Calendar size={12} /> {profile.experience} yıl deneyim</span>
                  )}
                  {profile.address && (
                    <span className="flex items-center gap-1"><MapPin size={12} /> {profile.address}</span>
                  )}
                  <span className="flex items-center gap-1"><Briefcase size={12} /> Peyzajcı</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-white mb-0.5">
                <Star size={15} className="text-yellow-400 fill-yellow-400" />
                {reviews?.averageRating ?? '-'}
              </div>
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.3px]">{reviews?.totalReviews ?? 0} Yorum</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 text-center">
              <div className="text-lg font-bold text-white mb-0.5">{profile.experience}y</div>
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.3px]">Deneyim</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 text-center">
              <div className="text-lg font-bold text-white mb-0.5">{portfolio.length}</div>
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.3px]">Proje</p>
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase flex items-center gap-1.5">
                <ImageIcon size={13} /> Portföy
              </h3>
              <Link href="/landscaper/portfolio" className="text-[10px] font-semibold text-bright-green hover:underline flex items-center gap-1">
                Tümünü Gör <ExternalLink size={10} />
              </Link>
            </div>
            {portfolio.length === 0 ? (
              <div className="py-8 text-center">
                <ImageIcon size={28} className="mx-auto mb-2 text-white/20" />
                <p className="text-xs text-white/40">Henüz portföy görseli eklenmemiş</p>
                <Link href="/landscaper/portfolio" className="inline-block mt-2 text-xs font-semibold text-bright-green hover:underline">
                  Portföye Git
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {portfolio.slice(0, 6).map(img => (
                  <div key={img.id} className="aspect-square rounded-[12px] overflow-hidden bg-white/5">
                    <img
                      src={img.url}
                      alt={img.description || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {portfolio.length > 6 && (
                  <div className="aspect-square rounded-[12px] bg-white/5 flex items-center justify-center">
                    <span className="text-xs font-bold text-white/40">+{portfolio.length - 6}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase flex items-center gap-1.5">
                <MessageSquare size={13} /> Son Yorumlar
              </h3>
              <Link href="/landscaper/reviews" className="text-[10px] font-semibold text-bright-green hover:underline flex items-center gap-1">
                Tümünü Gör <ExternalLink size={10} />
              </Link>
            </div>
            {!reviews || reviews.reviews.length === 0 ? (
              <div className="py-8 text-center">
                <MessageSquare size={28} className="mx-auto mb-2 text-white/20" />
                <p className="text-xs text-white/40">Henüz yorum bulunmuyor</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.reviews.map(r => (
                  <div key={r.id} className="flex gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60 shrink-0">
                      {r.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-white truncate">{r.customer}</p>
                        <span className="text-[10px] text-white/30 shrink-0">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                        ))}
                      </div>
                      {r.comment && (
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{r.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
