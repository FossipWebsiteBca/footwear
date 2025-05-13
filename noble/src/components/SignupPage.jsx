import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded shadow-md w-full max-w-5xl overflow-hidden">
        
        {/* Left: Signup Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#4E1F00]">Create Account</h2>
          <form className="text-left">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4E1F00] text-white py-2 px-4 rounded hover:bg-[#604652] transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
  Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
</p>
        </div>

        {/* Right: Image Section */}
      <img src="/images/shoes1.png" alt="Signup Illustration"   className="h-140 w-auto object-contain"
 />
      </div>
    </div>
  );
}
