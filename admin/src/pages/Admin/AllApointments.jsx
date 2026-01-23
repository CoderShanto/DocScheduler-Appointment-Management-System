import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Calendar, Clock, Search, Filter, ChevronLeft, ChevronRight, X, CheckCircle, XCircle, AlertCircle, User, Stethoscope, DollarSign } from 'lucide-react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 8

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  // Filter appointments
  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = 
      item.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'completed' ? item.isCompleted :
      filterStatus === 'cancelled' ? item.cancelled :
      filterStatus === 'pending' ? !item.cancelled && !item.isCompleted : true

    return matchesSearch && matchesFilter
  })

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className='flex-1 w-full min-w-0 min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6'>
      {/* Floating Particles Background */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-2 h-2 bg-cyan-400 rounded-full opacity-10'
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 25 + 15,
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
            All Appointments
          </h1>
          <p className='text-cyan-300/60'>Manage and track all patient appointments</p>
        </motion.div>

        {/* Filters & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl mb-6'
        >
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search Bar */}
            <div className='flex-1 relative'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400' />
              <input
                type="text"
                placeholder='Search by patient or doctor name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400 transition-all'
              />
            </div>

            {/* Filter Buttons */}
            <div className='flex gap-2 flex-wrap'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800/50 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700/50'
                }`}
              >
                All ({appointments.length})
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus('completed')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                    : 'bg-slate-800/50 text-green-300 border border-green-500/30 hover:bg-slate-700/50'
                }`}
              >
                Completed ({appointments.filter(a => a.isCompleted).length})
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus('pending')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'pending'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-slate-800/50 text-orange-300 border border-orange-500/30 hover:bg-slate-700/50'
                }`}
              >
                Pending ({appointments.filter(a => !a.cancelled && !a.isCompleted).length})
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus('cancelled')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'cancelled'
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-slate-800/50 text-red-300 border border-red-500/30 hover:bg-slate-700/50'
                }`}
              >
                Cancelled ({appointments.filter(a => a.cancelled).length})
              </motion.button>
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-4 text-cyan-300/60 text-sm'>
            Showing {currentAppointments.length} of {filteredAppointments.length} results
          </div>
        </motion.div>

        {/* Appointments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl'
        >
          {/* Table Header */}
          <div className='hidden lg:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr] gap-4 px-6 py-4 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-b border-white/10'>
            <p className='text-cyan-300 font-semibold'>#</p>
            <p className='text-cyan-300 font-semibold flex items-center gap-2'>
              <User className='w-4 h-4' />
              Patient
            </p>
            <p className='text-cyan-300 font-semibold'>Age</p>
            <p className='text-cyan-300 font-semibold flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              Date & Time
            </p>
            <p className='text-cyan-300 font-semibold flex items-center gap-2'>
              <Stethoscope className='w-4 h-4' />
              Doctor
            </p>
            <p className='text-cyan-300 font-semibold flex items-center gap-2'>
              <DollarSign className='w-4 h-4' />
              Fees
            </p>
            <p className='text-cyan-300 font-semibold'>Status</p>
          </div>

          {/* Table Body */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='divide-y divide-white/5'
          >
            <AnimatePresence mode='wait'>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((item, index) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    layout
                    className='grid grid-cols-1 lg:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1.5fr] gap-4 px-6 py-4 hover:bg-indigo-500/5 transition-colors group'
                  >
                    {/* Index */}
                    <p className='hidden lg:block text-cyan-300/60 font-mono'>
                      {startIndex + index + 1}
                    </p>

                    {/* Patient */}
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-60'
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <img
                          className='relative w-12 h-12 rounded-full object-cover border-2 border-cyan-400/50'
                          src={item.userData.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className='text-white font-semibold'>{item.userData.name}</p>
                        <p className='text-cyan-300/40 text-xs lg:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                      </div>
                    </div>

                    {/* Age */}
                    <p className='hidden lg:block text-cyan-300/60'>
                      {calculateAge(item.userData.dob)} yrs
                    </p>

                    {/* Date & Time */}
                    <div className='text-cyan-300/80'>
                      <p className='font-medium'>{slotDateFormat(item.slotDate)}</p>
                      <p className='text-cyan-300/40 text-sm flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {item.slotTime}
                      </p>
                    </div>

                    {/* Doctor */}
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-40 group-hover:opacity-60'
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <img
                          className='relative w-12 h-12 rounded-full object-cover border-2 border-purple-400/50 bg-slate-700'
                          src={item.docData.image}
                          alt=""
                        />
                      </div>
                      <p className='text-white font-medium'>{item.docData.name}</p>
                    </div>

                    {/* Fees */}
                    <p className='text-green-400 font-bold'>
                      {currency}{item.amount}
                    </p>

                    {/* Status/Actions */}
                    <div className='flex items-center'>
                      {item.cancelled ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-xl w-full justify-center'
                        >
                          <XCircle className='w-4 h-4 text-red-400' />
                          <span className='text-red-400 font-semibold text-sm'>Cancelled</span>
                        </motion.div>
                      ) : item.isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl w-full justify-center'
                        >
                          <CheckCircle className='w-4 h-4 text-green-400' />
                          <span className='text-green-400 font-semibold text-sm'>Completed</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => cancelAppointment(item._id)}
                          className='flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-xl hover:bg-orange-500/30 transition-all w-full justify-center'
                        >
                          <AlertCircle className='w-4 h-4 text-orange-400' />
                          <span className='text-orange-400 font-semibold text-sm'>Cancel</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='py-20 text-center'
                >
                  <div className='text-cyan-300/40 text-lg'>No appointments found</div>
                  <p className='text-cyan-300/20 text-sm mt-2'>Try adjusting your filters</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='flex items-center justify-between px-6 py-4 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50'
            >
              <div className='text-cyan-300/60 text-sm'>
                Page {currentPage} of {totalPages}
              </div>

              <div className='flex gap-2'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-all'
                >
                  <ChevronLeft className='w-5 h-5' />
                </motion.button>

                {/* Page Numbers */}
                <div className='hidden md:flex gap-2'>
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                          : 'bg-slate-800/50 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700/50'
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='p-2 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-all'
                >
                  <ChevronRight className='w-5 h-5' />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AllAppointments