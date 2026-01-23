import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { 
  Star, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Users,
  Calendar,
  Clock
} from 'lucide-react';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Sparkles 
              size={16} 
              className="text-blue-400 opacity-20" 
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full border border-blue-200">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Top Rated Healthcare Professionals</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Meet Our Top Doctors
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Connect with highly qualified and experienced medical professionals. 
            <span className="block mt-2 font-semibold text-blue-600">
              Book your appointment today and take the first step towards better health.
            </span>
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">500+</span>
              <span className="text-gray-600 text-sm">Doctors</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-900">10K+</span>
              <span className="text-gray-600 text-sm">Appointments</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              <span className="font-bold text-gray-900">4.9</span>
              <span className="text-gray-600 text-sm">Rating</span>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {doctors.slice(0, 10).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl border border-gray-100"
              style={{
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              {/* Card Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

              {/* Availability Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg ${
                  item.available 
                    ? 'bg-green-500/90 border-green-300 text-white' 
                    : 'bg-red-500/90 border-red-300 text-white'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-white' : 'bg-white'} animate-pulse`}></div>
                  <span className="text-xs font-semibold">
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Doctor Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 aspect-[3/4]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={item.image}
                  alt={item.name}
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                  <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                    Book Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-3">
                {/* Doctor Name */}
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" />
                </div>

                {/* Speciality */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                    <p className="text-sm font-semibold text-blue-700">{item.speciality}</p>
                  </div>
                </div>

                {/* Rating and Experience */}
                
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              navigate('/doctors');
              scrollTo(0, 0);
            }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Button Glow */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
          </button>
          
          <p className="mt-4 text-sm text-gray-600">
            Explore our complete directory of healthcare professionals
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default TopDoctors;