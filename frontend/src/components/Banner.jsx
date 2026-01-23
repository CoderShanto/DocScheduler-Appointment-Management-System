import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Users, Shield, ArrowRight, Sparkles, CheckCircle, Star } from 'lucide-react'

const Banner = ({ onCreateAccount, onBrowseDoctors }) => {
  const features = [
    { icon: Users, text: '100+ Expert Doctors' },
    { icon: Shield, text: '100% Verified' },
    { icon: Star, text: 'Top Rated Service' }
  ]

  return (
    <div className='relative my-20 md:mx-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-0 -left-48 animate-float'></div>
        <div className='absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-0 -right-48 animate-float-delayed'></div>
        <div className='absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow'></div>
      </div>

      {/* Grid Pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

      <div className='relative flex flex-col md:flex-row items-center px-6 sm:px-10 md:px-14 lg:px-12'>
        {/*------- Left Side --------*/}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 z-10'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-xl animate-slide-in'>
            <Sparkles className='w-4 h-4 text-blue-400 animate-pulse' />
            <span className='text-blue-400 text-sm font-medium'>Trusted Healthcare Platform</span>
          </div>

          {/* Main Heading */}
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight animate-slide-in-delayed'>
            <p className='mb-2'>Book Appointment</p>
            <p className='bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
              With 100+ Trusted Doctors
            </p>
          </div>

          {/* Features List */}
          <div className='flex flex-wrap gap-4 mt-6 mb-8'>
            {features.map((feature, index) => (
              <div 
                key={index}
                className='flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='p-1.5 bg-emerald-500/20 rounded-full'>
                  <feature.icon className='w-3.5 h-3.5 text-emerald-400' />
                </div>
                <span className='text-gray-300 text-sm font-medium'>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-wrap gap-4 animate-fade-in-slow'>
            <button 
              onClick={onCreateAccount}
              className='group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden'
            >
              <span className='relative z-10'>Create Account</span>
              <ArrowRight className='w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform' />
              <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </button>

            
          </div>

          {/* Trust Indicators */}
          <div className='flex items-center gap-6 mt-8 animate-fade-in-slower'>
            <div className='flex -space-x-3'>
              {[1, 2, 3, 4].map((_, i) => (
                <div 
                  key={i}
                  className='w-10 h-10 rounded-full border-2 border-[#0a0e27] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold'
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className='w-10 h-10 rounded-full border-2 border-[#0a0e27] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold'>
                +
              </div>
            </div>
            <div>
              <div className='flex items-center gap-1 mb-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
              <p className='text-gray-400 text-sm'>
                <span className='text-white font-semibold'>50,000+</span> Happy Patients
              </p>
            </div>
          </div>
        </div>

        {/*------- Right Side --------*/}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative py-8 md:py-0'>
          {/* Decorative Elements */}
          <div className='absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow'></div>
          <div className='absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slower'></div>

          {/* Main Image Container */}
          <div className='relative animate-float-image'>
            {/* Glow Effect */}
            <div className='absolute inset-0 bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30'></div>
            
            {/* Image */}
            <div className='relative'>
              <img 
                className='w-full h-auto object-contain relative z-10 drop-shadow-2xl' 
                src={assets.appointment_img} 
                alt='Book Appointment' 
              />
            </div>

            {/* Floating Stats Card */}
            <div className='absolute top-10 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl animate-float'>
              <div className='flex items-center gap-3'>
                <div className='p-3 bg-emerald-500/20 rounded-xl'>
                  <CheckCircle className='w-6 h-6 text-emerald-400' />
                </div>
                <div>
                  <p className='text-white font-bold text-lg'>2,500+</p>
                  <p className='text-gray-300 text-xs'>Appointments</p>
                </div>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className='absolute bottom-10 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl animate-float-delayed'>
              <div className='flex items-center gap-3'>
                <div className='p-3 bg-yellow-500/20 rounded-xl'>
                  <Star className='w-6 h-6 text-yellow-400 fill-yellow-400' />
                </div>
                <div>
                  <p className='text-white font-bold text-lg'>4.9/5</p>
                  <p className='text-gray-300 text-xs'>Rating</p>
                </div>
              </div>
            </div>
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
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-image {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-delayed {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slower {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-image {
          animation: float-image 5s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        .animate-slide-in-delayed {
          animation: slide-in-delayed 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-slower {
          animation: fade-in-slower 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
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

export default Banner