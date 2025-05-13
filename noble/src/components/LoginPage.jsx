import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded shadow-md w-full max-w-5xl overflow-hidden">
        
        {/* Left: Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#4E1F00]">Login</h2>
          <form className="text-left">
            <div className="mb-4 flex items-center">
              <label htmlFor="email" className="w-32 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6 flex items-center">
              <label htmlFor="password" className="w-32 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4E1F00] text-white py-2 px-4 rounded hover:bg-[#604652] transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
  Sign Up
</Link>

          </p>
        </div>

        {/* Right: Image Panel */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <img
            src="/images/login1.png"
            alt="Login Illustration"
            className="object-contain h-85 width-60"
          />
        </div>
      </div>
    </div>
  );
}
