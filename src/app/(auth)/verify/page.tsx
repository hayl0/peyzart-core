"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VerifyPage: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8 flex items-center justify-center"
    >
      <div className="liquid-glass-card p-8 space-y-6 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Verify Your Account</h1>
        <p className="text-lg text-gray-700 mb-6">
          Enter the 6-digit code sent to your email to verify your account.
        </p>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              whileFocus={{ scale: 1.1 }}
              className="w-12 h-12 text-center text-2xl font-bold rounded-lg bg-white/30 backdrop-blur-md border border-blue-300 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={() => alert('Verification code submitted!')}
          className="mt-6 w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Verify
        </button>
      </div>
    </motion.div>
  );
};

export default VerifyPage;
