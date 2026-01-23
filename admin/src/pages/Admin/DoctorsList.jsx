import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Search, Filter, Stethoscope, Award, CheckCircle, XCircle, Star, MapPin, Phone, Mail, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpeciality, setFilterSpeciality] = useState('all')
  const [filterAvailability, setFilterAvailability] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  // Get unique specialities
  const specialities = ['all', ...new Set(doctors.map(doc => doc.speciality))]

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpeciality = filterSpeciality === 'all' || doctor.speciality === filterSpeciality
    
    const matchesAvailability = 
      filterAvailability === 'all' ? true :
      filterAvailability === 'available' ? doctor.available :
      filterAvailability === 'unavailable' ? !doctor.available : true

    return matchesSearch && matchesSpeciality && matchesAvailability
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className='flex-1 w-full min-w-0 min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6'>
      {/* Floating Particles Background */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      <div className='relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6'
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2'>
            Medical Team
          </h1>
          <p className='text-cyan-300/60'>Manage your healthcare professionals</p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl mb-6'
        >
          {/* Search Bar */}
          <div className='mb-4'>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400' />
              <input
                type="text"
                placeholder='Search by name or speciality...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400 transition-all'
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className='flex flex-wrap gap-3'>
            {/* Availability Filters */}
            <div className='flex gap-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterAvailability('all')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filterAvailability === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800/50 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700/50'
                }`}
              >
                All ({doctors.length})
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterAvailability('available')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filterAvailability === 'available'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                    : 'bg-slate-800/50 text-green-300 border border-green-500/30 hover:bg-slate-700/50'
                }`}
              >
                Available ({doctors.filter(d => d.available).length})
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterAvailability('unavailable')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filterAvailability === 'unavailable'
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-slate-800/50 text-red-300 border border-red-500/30 hover:bg-slate-700/50'
                }`}
              >
                Unavailable ({doctors.filter(d => !d.available).length})
              </motion.button>
            </div>

            <div className='w-px h-8 bg-white/10'></div>

            {/* Speciality Filters */}
            <div className='flex gap-2 flex-wrap'>
              {specialities.map((spec, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterSpeciality(spec)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all capitalize ${
                    filterSpeciality === spec
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-slate-800/50 text-purple-300 border border-purple-500/30 hover:bg-slate-700/50'
                  }`}
                >
                  {spec}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-4 text-cyan-300/60 text-sm'>
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          <AnimatePresence mode='wait'>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -8 }}
                  className='group relative'
                >
                  {/* Glow Effect */}
                  <motion.div
                    className='absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500'
                  />

                  {/* Card */}
                  <div className='relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl'>
                    
                    {/* Doctor Image Section - Medium Size */}
                    <div className='relative h-56 overflow-hidden'>
                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10' />
                      
                      {/* Doctor Image */}
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        className='w-full h-full object-cover object-top'
                        src={doctor.image}
                        alt={doctor.name}
                      />
                      
                      {/* Holographic overlay on hover */}
                      <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10' />
                      
                      {/* Availability Badge - Top Right */}
                      <div className='absolute top-4 right-4 z-20'>
                        <motion.div
                          animate={doctor.available ? { 
                            boxShadow: [
                              '0 0 10px rgba(16, 185, 129, 0.5)',
                              '0 0 20px rgba(16, 185, 129, 0.8)',
                              '0 0 10px rgba(16, 185, 129, 0.5)'
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-2 ${
                            doctor.available 
                              ? 'bg-green-500/30 border border-green-400/60' 
                              : 'bg-red-500/30 border border-red-400/60'
                          }`}
                        >
                          {doctor.available ? (
                            <CheckCircle className='w-4 h-4 text-green-300' />
                          ) : (
                            <XCircle className='w-4 h-4 text-red-300' />
                          )}
                          <span className={`text-sm font-bold ${
                            doctor.available ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {doctor.available ? 'Available' : 'Busy'}
                          </span>
                        </motion.div>
                      </div>

                      {/* Name Overlay at Bottom */}
                      <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
                        <h3 className='text-2xl font-bold text-white mb-1 drop-shadow-lg'>
                          {doctor.name}
                        </h3>
                        <div className='flex items-center gap-2'>
                          <Stethoscope className='w-4 h-4 text-purple-300' />
                          <p className='text-purple-200 text-sm font-medium'>
                            {doctor.speciality}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className='p-5 space-y-3'>
                      
                      {/* Stats Row */}
                      <div className='flex gap-2'>
                        <div className='flex-1 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-3'>
                          <div className='flex items-center gap-1.5 mb-1'>
                            <GraduationCap className='w-4 h-4 text-cyan-400' />
                            <span className='text-cyan-300/70 text-xs'>Experience</span>
                          </div>
                          <p className='text-white font-bold text-sm'>{doctor.experience || '5+'} yrs</p>
                        </div>
                        
                        {doctor.fees && (
                          <div className='flex-1 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-3'>
                            <div className='flex items-center gap-1.5 mb-1'>
                              <Award className='w-4 h-4 text-green-400' />
                              <span className='text-green-300/70 text-xs'>Fee</span>
                            </div>
                            <p className='text-white font-bold text-sm'>${doctor.fees}</p>
                          </div>
                        )}
                      </div>

                      {/* Degree */}
                      <div className='bg-slate-800/50 border border-purple-500/20 rounded-xl p-3'>
                        <div className='flex items-center gap-2'>
                          <Award className='w-4 h-4 text-purple-400 flex-shrink-0' />
                          <span className='text-purple-300 text-sm font-medium truncate'>
                            {doctor.degree}
                          </span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Mail className='w-3.5 h-3.5 text-cyan-400 flex-shrink-0' />
                          <span className='text-cyan-300/60 text-xs truncate'>{doctor.email}</span>
                        </div>
                        
                        {doctor.address && (
                          <div className='flex items-center gap-2'>
                            <MapPin className='w-3.5 h-3.5 text-pink-400 flex-shrink-0' />
                            <span className='text-pink-300/60 text-xs truncate'>{doctor.address.line1}</span>
                          </div>
                        )}
                      </div>

                      {/* About */}
                      {doctor.about && (
                        <div className='pt-2 border-t border-white/5'>
                          <p className='text-cyan-300/50 text-xs leading-relaxed line-clamp-2'>
                            {doctor.about}
                          </p>
                        </div>
                      )}

                      {/* Availability Toggle */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='mt-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-white/10 rounded-xl p-3.5 cursor-pointer hover:border-cyan-400/30 transition-all'
                        onClick={() => changeAvailability(doctor._id)}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-white text-sm font-semibold'>
                            Toggle Availability
                          </span>
                          <motion.div
                            animate={{
                              backgroundColor: doctor.available ? '#10b981' : '#ef4444'
                            }}
                            className='relative w-12 h-6 rounded-full shadow-inner'
                          >
                            <motion.div
                              animate={{
                                x: doctor.available ? 24 : 2
                              }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className='absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg'
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='col-span-full py-20 text-center'
              >
                <div className='text-cyan-300/40 text-lg'>No doctors found</div>
                <p className='text-cyan-300/20 text-sm mt-2'>Try adjusting your filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default DoctorsList