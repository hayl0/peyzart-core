"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertCircle,
  TrendingUp,
  Leaf,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Users,
  DollarSign,
} from 'lucide-react';

// Mock data
const metrics = [
  {
    icon: Users,
    label: 'Aktif Müşteriler',
    value: '24',
    change: '+12%',
    color: 'cyan',
  },
  {
    icon: Leaf,
    label: 'Devam Eden Projeler',
    value: '8',
    change: '+4',
    color: 'green',
  },
  {
    icon: DollarSign,
    label: 'Bu Ay Gelir',
    value: '₺12.450',
    change: '+8%',
    color: 'blue',
  },
  {
    icon: Clock,
    label: 'Ortalama Tepki Süresi',
    value: '2.3h',
    change: '-15%',
    color: 'purple',
  },
];

const alerts = [
  {
    id: 1,
    title: 'Yüksek Talebi Olan İş',
    subtitle: 'Proje #5',
    severity: 'warning',
    time: '2 saat önce',
  },
  {
    id: 2,
    title: 'Müşteri Geri Bildirim Bekliyor',
    subtitle: 'Proje #12',
    severity: 'info',
    time: '5 saat önce',
  },
  {
    id: 3,
    title: 'Ödeme Alındı',
    subtitle: 'Müşteri: Ali Kaya',
    severity: 'success',
    time: '1 saat önce',
  },
];

const projects = [
  {
    id: '1',
    name: 'Villa Bahçesi Tasarımı',
    customer: 'Ahmet Yılmaz',
    status: 'Devam Ediyor',
    progress: 65,
    budget: '₺8.500',
    date: '15 Nisan 2026',
  },
  {
    id: '2',
    name: 'Ticari Peyzaj Projesi',
    customer: 'Şirket A',
    status: 'Beklemede',
    progress: 30,
    budget: '₺15.000',
    date: '18 Nisan 2026',
  },
  {
    id: '3',
    name: 'Bahçe Bakım Hizmeti',
    customer: 'Fatma Demir',
    status: 'Tamamlandı',
    progress: 100,
    budget: '₺2.500',
    date: '10 Nisan 2026',
  },
];

const getStatusColor = (status: string) => {
  if (status === 'Tamamlandı') return 'success';
  if (status === 'Devam Ediyor') return 'info';
  return 'warning';
};

const getSeverityColor = (severity: string) => {
  if (severity === 'warning')
    return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
  if (severity === 'success')
    return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
  return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
};

export default function LandscaperDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-peyzart-darker overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-peyzart-cyan to-peyzart-blue bg-clip-text text-transparent">
              Kontrol Paneli
            </span>
          </h1>
          <p className="text-white/60">Hoş geldin, İbrahim! 👋</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-peyzart-cyan" />
                    <Badge variant="success" size="sm">
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-white/70 text-sm font-semibold mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-3xl font-black text-white">{metric.value}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Grid: Alerts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Critical Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card variant="gradient">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Uyarılar</h2>
                </div>
                <button className="text-peyzart-cyan hover:text-peyzart-cyan/80 text-sm font-semibold transition-colors">
                  Tümü Gör
                </button>
              </div>

              {/* Alerts Section */}
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedAlert(alert.id)}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all border
                      backdrop-blur-sm
                      ${getSeverityColor(alert.severity)}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold">{alert.title}</h3>
                        <p className="text-white/70 text-sm">{alert.subtitle}</p>
                      </div>
                      <span className="text-white/50 text-xs">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Alert Details Modal */}
              {selectedAlert && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">
                      {alerts.find((a) => a.id === selectedAlert)?.title}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {alerts.find((a) => a.id === selectedAlert)?.subtitle}
                    </p>
                    <button
                      onClick={() => setSelectedAlert(null)}
                      className="bg-peyzart-cyan text-white px-4 py-2 rounded-lg hover:bg-peyzart-cyan/80"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Activity Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card variant="glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-peyzart-cyan" />
                  Bu Hafta Aktivite
                </h2>
              </div>

              {/* Simple Chart */}
              <div className="space-y-4">
                {[
                  { day: 'Pazartesi', value: 65, max: 100 },
                  { day: 'Salı', value: 78, max: 100 },
                  { day: 'Çarşamba', value: 45, max: 100 },
                  { day: 'Perşembe', value: 92, max: 100 },
                  { day: 'Cuma', value: 55, max: 100 },
                  { day: 'Cumartesi', value: 85, max: 100 },
                  { day: 'Pazar', value: 30, max: 100 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-white/70">
                        {item.day}
                      </p>
                      <p className="text-sm font-bold text-peyzart-cyan">
                        {item.value}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="h-full bg-gradient-to-r from-peyzart-cyan to-peyzart-blue rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Projects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Calendar className="w-6 h-6 text-peyzart-purple" />
                Aktif Projeler
              </h2>
              <button className="text-peyzart-cyan hover:text-peyzart-cyan/80 text-sm font-semibold transition-colors">
                Tümünü Görüntüle
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      Proje Adı
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      Müşteri
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      Durum
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      İlerleme
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      Bütçe
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                      Tarih
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, i) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{project.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/70">{project.customer}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={getStatusColor(project.status) as any}
                          size="sm"
                        >
                          {project.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1 }}
                              className="h-full bg-gradient-to-r from-peyzart-cyan to-peyzart-purple"
                            />
                          </div>
                          <p className="text-sm font-semibold text-white/70 min-w-[2.5rem]">
                            %{project.progress}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-peyzart-cyan">
                          {project.budget}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/70 text-sm">{project.date}</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
