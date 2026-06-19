'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sprout, ChevronRight, ChevronLeft,
  User, Briefcase, FileText, Camera,
  CheckCircle2, AlertCircle, Upload, Mail, Lock, Phone, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'

const STEPS = [
  { id: 1, title: 'Temel Bilgiler', icon: User },
  { id: 2, title: 'Mesleki Detaylar', icon: Briefcase },
  { id: 3, title: 'Evrak ve Onay', icon: FileText },
]

const ALL_SERVICES = ['Çim Biçme', 'Budama', 'Tasarım', 'Sulama', 'İlaçlama', 'Ağaç Dikimi']

export default function LandscaperRegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()

  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [bio, setBio] = useState('')

  const nextStep = () => { setError(''); setStep(s => Math.min(s + 1, 3)) }
  const prevStep = () => { setError(''); setStep(s => Math.max(s - 1, 1)) }

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleSubmit = async () => {
    setError('')
    if (!name.trim() || !email.includes('@') || password.length < 8) {
      setError('Lütfen tüm zorunlu alanları doldurun')
      return
    }

    setIsLoading(true)
    try {
      await signUp(email, password, name, 'landscaper')
      setIsSubmitted(true)
      setTimeout(() => router.push('/landscaper/dashboard'), 3000)
    } catch (err) {
      const e = err as { code?: string }
      const msg =
        e.code === 'auth/email-already-in-use' ? 'Bu e-posta zaten kayıtlı' :
        e.code === 'auth/weak-password' ? 'Şifre çok zayıf' :
        'Kayıt olurken bir hata oluştu'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f7ee] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white text-center space-y-8 shadow-2xl">
          <div className="inline-flex p-6 bg-[#4CAF50]/20 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-[#4CAF50]" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-[#0A2E1A]">Başvurunuz Alındı!</h1>
            <p className="text-[#0A2E1A]/60 font-medium">
              E-posta adresinize doğrulama bağlantısı gönderdik. Lütfen e-postanızı kontrol edin.
            </p>
          </div>
          <Link href="/login" className="block w-full py-4 bg-[#4CAF50] text-white rounded-2xl font-black shadow-lg shadow-[#4CAF50]/20">
            Giriş Yap
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7ee] flex flex-col md:flex-row font-sans">
      {/* Left Side: Branding & Progress */}
      <div className="w-full md:w-[450px] bg-[#0A2E1A] p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20 animate-pulse" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="logo-gradient text-2xl">Peyzart</span>
        </div>

        <div className="relative z-10 space-y-12 py-20">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black leading-tight">Uzman Kadromuza Katılın</h2>
            <p className="text-white/70 font-medium text-lg">Profesyonelliğinizi belgelendirin, binlerce bahçe sahibine ulaşın.</p>
          </div>

          <div className="space-y-8">
            {STEPS.map((s) => (
              <div key={s.id} className="flex items-center gap-6 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${step >= s.id ? 'bg-white border-white text-primary' : 'bg-transparent border-white/30 text-white/30'}`}>
                   <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-white' : 'text-white/30'}`}>Adım {s.id}</p>
                  <p className={`text-base font-bold ${step >= s.id ? 'text-white' : 'text-white/30'}`}>{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs font-bold text-white/40 uppercase tracking-widest">
           &copy; 2026 Peyzart // Uzman Başvuru Paneli
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 p-6 md:p-20 flex items-center justify-center bg-[#f5f7ee]">
        <div className="max-w-xl w-full space-y-12">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-[16px] p-4 flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Kişisel Bilgiler</h1>
                <p className="text-[#0A2E1A]/60 font-bold">Profilinizde görünecek temel veriler.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1 mb-2 block">Ad Soyad / İşletme Adı</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A2E1A]/30" />
                    <input value={name} onChange={e => setName(e.target.value)}
                      className="w-full p-4 pl-11 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30"
                      placeholder="Örn: Zeytin Peyzaj" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1 mb-2 block">E-posta</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A2E1A]/30" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full p-4 pl-11 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30"
                        placeholder="info@zeytin.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1 mb-2 block">Telefon</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A2E1A]/30" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full p-4 pl-11 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30"
                        placeholder="+90 5XX ..." />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1 mb-2 block">Şifre</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A2E1A]/30" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full p-4 pl-11 pr-11 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none placeholder:text-[#0A2E1A]/30"
                      placeholder="En az 8 karakter" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A2E1A]/30 hover:text-[#0A2E1A]/60">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Uzmanlık Alanları</h1>
                <p className="text-[#0A2E1A]/60 font-bold">Sunduğunuz hizmetleri belirleyin.</p>
              </div>

              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    {ALL_SERVICES.map(s => (
                    <button key={s} type="button" onClick={() => toggleService(s)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                        selectedServices.includes(s)
                          ? 'bg-[#4CAF50]/10 border-[#4CAF50]/40'
                          : 'bg-[#eef1e3] border-[#d0d8bf] hover:border-[#4CAF50]/40'
                      }`}>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedServices.includes(s)
                          ? 'bg-[#4CAF50] border-[#4CAF50]'
                          : 'border-[#4CAF50]/20'
                      }`}>
                        {selectedServices.includes(s) && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className="text-sm font-bold text-[#0A2E1A]/80">{s}</span>
                    </button>
                    ))}
                 </div>
                 <div className="space-y-2 pt-4">
                  <label className="text-xs font-black text-[#0A2E1A]/70 uppercase tracking-widest ml-1 block">Kısa Biyografi</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)}
                    className="w-full p-4 bg-[#eef1e3] border border-[#d0d8bf] rounded-2xl text-sm font-bold text-[#0A2E1A] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none h-32 placeholder:text-[#0A2E1A]/30"
                    placeholder="Tecrübenizden ve tarzınızdan bahsedin..." />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-black text-[#0A2E1A] tracking-tight">Belge Yükleme</h1>
                <p className="text-[#0A2E1A]/60 font-bold">Güvenlik ve doğrulama için gerekli evraklar.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Kimlik / Ehliyet', icon: User },
                  { label: 'Mesleki Sertifika', icon: FileText },
                  { label: 'İmza Sirküleri', icon: FileText },
                  { label: 'Referans Fotoğrafları', icon: Camera },
                ].map((doc, i) => (
                  <div key={i} className="group relative p-8 bg-[#eef1e3] border-2 border-dashed border-[#d0d8bf] rounded-3xl hover:bg-[#e4e8d6] hover:border-[#4CAF50]/40 transition-all text-center space-y-4 cursor-pointer">
                      <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm text-[#4CAF50] group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-[#0A2E1A]">{doc.label}</p>
                        <p className="text-[10px] font-bold text-[#0A2E1A]/40">PDF, JPG veya PNG</p>
                      </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <p className="text-xs font-bold text-yellow-700 leading-relaxed">
                  Yüklenen belgeler KVKK kapsamında şifrelenir ve sadece onay ekibimiz tarafından görüntülenir.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-12 border-t border-[#d0d8bf]">
            <button
              onClick={prevStep}
              disabled={step === 1 || isLoading}
              className={`flex items-center gap-2 text-sm font-black text-[#0A2E1A]/40 hover:text-[#4CAF50] transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-5 h-5" />
              Geri
            </button>

            {error && (
              <p className="text-xs font-bold text-red-500 text-center flex-1">{error}</p>
            )}

            <button
              onClick={step === 3 ? handleSubmit : nextStep}
              disabled={isLoading}
              className="flex items-center gap-3 px-10 py-5 bg-[#4CAF50] text-white rounded-[2rem] font-black shadow-xl shadow-[#4CAF50]/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Kaydediliyor...</>
              ) : step === 3 ? 'Başvuruyu Gönder' : 'Sonraki Adım'}
              {step !== 3 && !isLoading && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
