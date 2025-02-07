import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.custom((t) => (
          <div className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto overflow-hidden`}>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-[4000ms] ease-linear"
                   style={{ width: t.visible ? '100%' : '0%' }} />
            </div>

            <div className="p-6">
              {/* Success Animation */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-[3px] animate-bounce">
                <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                  <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Registrasi Admin Berhasil!
                </h3>
                <p className="text-gray-600">
                  Selamat datang di LuxeMart Admin, <span className="font-semibold">{formData.fullName}</span>!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate("/admin/login");
                  }}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl
                           font-medium transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25
                           active:scale-[0.98] transition-all duration-200"
                >
                  Login Sekarang
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium
                           hover:bg-gray-50 hover:border-gray-300 transform hover:scale-[1.02] 
                           active:scale-[0.98] transition-all duration-200"
                >
                  Nanti Saja
                </button>
              </div>
            </div>

            {/* Confetti Effect */}
            <div className="absolute -top-10 left-0 w-full h-40 overflow-hidden pointer-events-none">
              <div className="animate-confetti-1 absolute w-3 h-3 bg-yellow-500 rotate-45" style={{ left: '10%' }} />
              <div className="animate-confetti-2 absolute w-3 h-3 bg-primary-500 rotate-45" style={{ left: '20%' }} />
              <div className="animate-confetti-3 absolute w-3 h-3 bg-green-500 rotate-45" style={{ left: '30%' }} />
              <div className="animate-confetti-4 absolute w-3 h-3 bg-pink-500 rotate-45" style={{ left: '40%' }} />
              <div className="animate-confetti-5 absolute w-3 h-3 bg-blue-500 rotate-45" style={{ left: '50%' }} />
              <div className="animate-confetti-6 absolute w-3 h-3 bg-purple-500 rotate-45" style={{ left: '60%' }} />
              <div className="animate-confetti-7 absolute w-3 h-3 bg-red-500 rotate-45" style={{ left: '70%' }} />
              <div className="animate-confetti-8 absolute w-3 h-3 bg-indigo-500 rotate-45" style={{ left: '80%' }} />
            </div>
          </div>
        ), {
          duration: 4000,
          position: 'top-center',
        });

        setTimeout(() => {
          navigate('/admin/login');
        }, 4000);
      } else {
        setError(data.message || 'Registration failed');
        
        // Toast error
        toast.custom((t) => (
          <div className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto overflow-hidden`}>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Registrasi Gagal
                </h3>
                <p className="text-gray-600">
                  {data.message || "Terjadi kesalahan saat registrasi"}
                </p>
              </div>

              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium
                         hover:bg-gray-200 transform hover:scale-[1.02] active:scale-[0.98] 
                         transition-all duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        ), {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to connect to server. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-1 mb-6">
            <span className="text-3xl font-extralight tracking-wider text-primary-900">LUXE</span>
            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              MART
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Register Admin</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/admin/login" className="font-medium text-primary-500 hover:text-primary-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>


            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-12 px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Create Admin Account
          </button>
        </form>

        {/* Back to Store */}
        <div className="text-center">
          <Link to="/" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister; 