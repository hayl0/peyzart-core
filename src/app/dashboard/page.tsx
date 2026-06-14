"use client";
import LiquidButton from '@/components/ui/LiquidButton';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-green-900">Dashboard</h1>
        <LiquidButton
          label="Settings"
          onClick={() => alert('Settings clicked!')}
          variant="secondary"
        />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Water Level</h3>
          <p className="text-gray-600 text-lg">85%</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">pH Level</h3>
          <p className="text-gray-600 text-lg">6.5 pH</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Temperature</h3>
          <p className="text-gray-600 text-lg">24°C</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">Critical Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
            <h4 className="text-lg font-bold text-yellow-800">Container #8</h4>
            <p className="text-yellow-700">Low water level</p>
          </div>
          <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
            <h4 className="text-lg font-bold text-red-800">Container #14</h4>
            <p className="text-red-700">pH above normal</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">Activity Overview</h2>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <p className="text-gray-600 text-lg">Activity data will be displayed here.</p>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2026 Peyzart Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
