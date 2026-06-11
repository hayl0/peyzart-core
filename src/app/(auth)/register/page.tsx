'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RegisterPage() {
  const [userType, setUserType] = useState<'customer' | 'landscaper'>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8"
    >
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-900">Register</h1>
        <p className="text-lg text-gray-700">Create your account to get started</p>
      </header>

      <section className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <LiquidButton label="Sign Up" onClick={() => alert('Account Created!')} variant="primary" />
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2026 Peyzart. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
