import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Calendar, Users, Shield, Clock, Star, ArrowRight, Sparkles, Heart, CheckCircle } from 'lucide-react'

const Header = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { icon: Users, value: '500+', label: 'Expert Doctors' },
    { icon: Star, value: '50k+', label: 'Happy Patients' },
    { icon: CheckCircle, value: '100%', label: 'Verified' }
  ]

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-float'></div>
        <div className='absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-1/4 -right-48 animate-float-delayed'></div>
        <div className='absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl bottom-0 left-1/3 animate-float-slow'></div>
        
        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12'>
        <div className='grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]'>
          {/* Left Side - Content */}
          <div className='flex flex-col gap-8 z-10 animate-slide-in-left'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 w-fit backdrop-blur-xl'>
              <Sparkles className='w-4 h-4 text-blue-400 animate-pulse' />
              <span className='text-blue-400 text-sm font-medium'>Trusted Healthcare Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
              <span className='text-white'>Book </span>
              <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient'>
                Appointment
              </span>
              <br />
              <span className='text-white'>with </span>
              <span className='relative'>
                <span className='text-white'>Trusted</span>
                <div className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-expand'></div>
              </span>
              <br />
              <span className='text-white'>Doctors</span>
            </h1>

            {/* Description */}
            <p className='text-gray-300 text-lg leading-relaxed max-w-xl'>
              Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
            </p>

            {/* Trust Indicators */}
            <div className='flex items-center gap-4 flex-wrap'>
              <div className='flex -space-x-3'>
                <img className='w-12 h-12 rounded-full border-2 border-[#0a0e27] object-cover' src={assets.group_profiles} alt='' />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center gap-1 mb-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
                <p className='text-gray-400 text-sm'>
                  <span className='text-white font-semibold'>50,000+</span> happy patients
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap gap-4'>
              <a 
                href='#speciality' 
                className='group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden'
              >
                <span className='relative z-10'>Book Appointment</span>
                <ArrowRight className='w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform' />
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </a>
              
              <button className='inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95'>
                <Heart className='w-5 h-5' />
                <span>How It Works</span>
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-6 pt-8 border-t border-white/10'>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className='flex flex-col gap-2 group animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className='flex items-center gap-2'>
                    <div className='p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors'>
                      <stat.icon className='w-5 h-5 text-blue-400' />
                    </div>
                    <span className='text-2xl font-bold text-white'>{stat.value}</span>
                  </div>
                  <span className='text-gray-400 text-sm'>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className='relative z-10 animate-slide-in-right'>
            {/* Decorative Elements */}
            <div className='absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slower'></div>
            
            {/* Main Image Container */}
            <div className='relative group'>
              {/* Glow Effect */}
              <div className='absolute inset-0 bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>
              
              {/* Image */}
              <div className='relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl'>
                <img 
                  className='w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700' 
                  src={assets.header_img} 
                  alt='Trusted Doctors' 
                />
                
                {/* Overlay Gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-[#0a0e27]/50 to-transparent'></div>
              </div>

              {/* Floating Cards */}
              <div className='absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl animate-float'>
                <div className='flex items-center gap-3'>
                  <div className='p-3 bg-emerald-500/20 rounded-xl'>
                    <Shield className='w-6 h-6 text-emerald-400' />
                  </div>
                  <div>
                    <p className='text-white font-semibold'>100% Secure</p>
                    <p className='text-gray-400 text-sm'>Verified Doctors</p>
                  </div>
                </div>
              </div>

              <div className='absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl animate-float-delayed'>
                <div className='flex items-center gap-3'>
                  <div className='p-3 bg-blue-500/20 rounded-xl'>
                    <Clock className='w-6 h-6 text-blue-400' />
                  </div>
                  <div>
                    <p className='text-white font-semibold'>24/7 Available</p>
                    <p className='text-gray-400 text-sm'>Quick Booking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce'>
          <span className='text-gray-400 text-sm'>Scroll to explore</span>
          <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2'>
            <div className='w-1 h-3 bg-gray-400 rounded-full animate-scroll'></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
        }
        .animate-expand {
          animation: expand 0.8s ease-out;
          transform-origin: left;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  )
}

export default Header