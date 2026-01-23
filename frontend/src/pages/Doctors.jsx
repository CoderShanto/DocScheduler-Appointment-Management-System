import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Search, Filter, X, ChevronRight, Sparkles } from 'lucide-react'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const specialties = [
    { name: 'General physician', icon: '🩺', color: 'from-blue-500 to-cyan-500' },
    { name: 'Gynecologist', icon: '👶', color: 'from-pink-500 to-rose-500' },
    { name: 'Dermatologist', icon: '✨', color: 'from-purple-500 to-indigo-500' },
    { name: 'Pediatricians', icon: '🧸', color: 'from-orange-500 to-amber-500' },
    { name: 'Neurologist', icon: '🧠', color: 'from-teal-500 to-emerald-500' },
    { name: 'Gastroenterologist', icon: '🏥', color: 'from-red-500 to-pink-500' }
  ]

  const applyFilter = () => {
    let filtered = doctors

    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality)
    }

    if (search.trim()) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilterDoc(filtered)
    setAnimateCards(true)
    setTimeout(() => setAnimateCards(false), 500)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, search])

  const handleSpecialityClick = (spec) => {
    if (speciality === spec) {
      navigate('/doctors')
    } else {
      navigate(`/doctors/${spec}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 px-4 mb-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-10 -ml-48 -mb-48"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Find Your Doctor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            Browse Medical Specialists
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Connect with experienced healthcare professionals across various specializations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Search Bar */}
        <div className={`relative mb-8 transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-blue-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <button
              onClick={() => setShowFilter(prev => !prev)}
              className="lg:hidden w-full flex items-center justify-between px-6 py-3 bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 mb-4"
            >
              <span className="flex items-center gap-2 font-semibold text-gray-700">
                <Filter className="w-5 h-5" />
                Specialties
              </span>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} />
            </button>

            <div className={`${showFilter ? 'flex' : 'hidden lg:flex'} flex-col gap-3`}>
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Specialties
              </h2>
              {specialties.map((spec, index) => (
                <div
                  key={spec.name}
                  onClick={() => handleSpecialityClick(spec.name)}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    speciality === spec.name
                      ? 'shadow-xl scale-105'
                      : 'shadow-md hover:shadow-xl'
                  }`}
                  style={{
                    animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${spec.color} opacity-${speciality === spec.name ? '100' : '0'} group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`relative px-6 py-4 flex items-center gap-3 ${
                    speciality === spec.name ? 'text-white' : 'text-gray-700 bg-white'
                  } group-hover:text-white transition-colors duration-300`}>
                    <span className="text-2xl">{spec.icon}</span>
                    <span className="font-medium flex-1">{spec.name}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${speciality === spec.name ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-full px-6 py-3 shadow-md">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <span className="text-white font-bold text-lg">{filterDoc.length}</span>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">
                    {filterDoc.length === 1 ? 'Doctor' : 'Doctors'} Found
                  </p>
                  {speciality && (
                    <p className="text-sm text-blue-600 font-medium">
                      in {speciality}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    animateCards ? 'animate-fade-in-up' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Availability Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      item.available
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    } shadow-lg backdrop-blur-sm`}>
                      <span className={`w-2 h-2 rounded-full ${
                        item.available ? 'bg-white animate-pulse' : 'bg-white'
                      }`}></span>
                      {item.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {item.speciality}
                    </p>
                    
                    <div className="mt-4">
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] group-hover:from-blue-500 group-hover:to-pink-500 transition-all duration-300">
                        <div className="bg-white rounded-lg px-4 py-2.5 flex items-center justify-between group-hover:bg-transparent transition-all duration-300">
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                            Book Appointment
                          </span>
                          <div className="flex items-center gap-1">
                            <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                            <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-white transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {filterDoc.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Doctors