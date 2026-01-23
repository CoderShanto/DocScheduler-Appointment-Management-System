import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { Calendar, DollarSign, Clock, User, CreditCard, Wallet, CheckCircle, XCircle, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  useEffect(() => {
    setAnimateStats(true)
    const timer = setTimeout(() => setAnimateStats(false), 600)
    return () => clearTimeout(timer)
  }, [appointments])

  // Filter appointments
  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = item.userData.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'completed' ? item.isCompleted :
      filterStatus === 'cancelled' ? item.cancelled :
      filterStatus === 'pending' ? !item.isCompleted && !item.cancelled : true
    
    return matchesSearch && matchesFilter
  })

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex)

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Stats
  const stats = {
    total: appointments.length,
    completed: appointments.filter(a => a.isCompleted).length,
    cancelled: appointments.filter(a => a.cancelled).length,
    pending: appointments.filter(a => !a.isCompleted && !a.cancelled).length
  }

  return (
    <div className='min-h-screen bg-[#0a0e27] p-4 md:p-8'>
      <div className='fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none'></div>
      
      <div className='relative max-w-7xl mx-auto'>
        {/* Header with animation */}
        <div className='mb-8 animate-slide-down'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>All Appointments</h1>
          <p className='text-gray-400'>Manage and track your patient appointments</p>
        </div>

        {/* Stats Overview with pulse animation */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
          <div className={`bg-[#0f1629] rounded-xl p-4 border border-gray-800 transform transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-bounce-in' : ''}`}>
            <div className='flex items-center gap-2 mb-2'>
              <Calendar className='w-4 h-4 text-blue-400' />
              <span className='text-gray-400 text-sm'>Total</span>
            </div>
            <p className='text-2xl font-bold text-white'>{stats.total}</p>
          </div>
          
          <div className={`bg-[#0f1629] rounded-xl p-4 border border-emerald-500/20 transform transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-bounce-in' : ''}`} style={{animationDelay: '0.1s'}}>
            <div className='flex items-center gap-2 mb-2'>
              <CheckCircle className='w-4 h-4 text-emerald-400' />
              <span className='text-gray-400 text-sm'>Completed</span>
            </div>
            <p className='text-2xl font-bold text-emerald-400'>{stats.completed}</p>
          </div>
          
          <div className={`bg-[#0f1629] rounded-xl p-4 border border-red-500/20 transform transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-bounce-in' : ''}`} style={{animationDelay: '0.2s'}}>
            <div className='flex items-center gap-2 mb-2'>
              <XCircle className='w-4 h-4 text-red-400' />
              <span className='text-gray-400 text-sm'>Cancelled</span>
            </div>
            <p className='text-2xl font-bold text-red-400'>{stats.cancelled}</p>
          </div>
          
          <div className={`bg-[#0f1629] rounded-xl p-4 border border-blue-500/20 transform transition-all duration-300 hover:scale-105 ${animateStats ? 'animate-bounce-in' : ''}`} style={{animationDelay: '0.3s'}}>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='w-4 h-4 text-blue-400' />
              <span className='text-gray-400 text-sm'>Pending</span>
            </div>
            <p className='text-2xl font-bold text-blue-400'>{stats.pending}</p>
          </div>
        </div>

        {/* Search and Filter with slide animation */}
        <div className='flex flex-col md:flex-row gap-4 mb-6 animate-slide-up'>
          <div className='relative flex-1'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-pulse-subtle' />
            <input
              type='text'
              placeholder='Search patient name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-[#0f1629] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
              >
                <XCircle className='w-5 h-5' />
              </button>
            )}
          </div>
          
          <div className='flex gap-2 flex-wrap'>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                filterStatus === 'all'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-[#0f1629] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                filterStatus === 'pending'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-[#0f1629] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                filterStatus === 'completed'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-[#0f1629] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-4 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                filterStatus === 'cancelled'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-[#0f1629] text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Results info */}
        {searchTerm && (
          <div className='mb-4 text-gray-400 text-sm animate-fade-in'>
            Found <span className='text-white font-semibold'>{filteredAppointments.length}</span> result(s) for "<span className='text-blue-400'>{searchTerm}</span>"
          </div>
        )}

        {/* Appointments Table */}
        <div className='bg-[#0f1629] rounded-2xl border border-gray-800 overflow-hidden animate-fade-in'>
          {/* Table Header - Desktop */}
          <div className='hidden lg:grid grid-cols-[0.5fr_2.5fr_1fr_0.8fr_2fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-gray-800 bg-[#0a0e27]'>
            <p className='text-gray-400 font-medium text-sm'>#</p>
            <p className='text-gray-400 font-medium text-sm'>Patient</p>
            <p className='text-gray-400 font-medium text-sm'>Payment</p>
            <p className='text-gray-400 font-medium text-sm'>Age</p>
            <p className='text-gray-400 font-medium text-sm'>Date & Time</p>
            <p className='text-gray-400 font-medium text-sm'>Fees</p>
            <p className='text-gray-400 font-medium text-sm'>Action</p>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-800 max-h-[65vh] overflow-y-auto'>
            {currentAppointments.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16 animate-fade-in'>
                <Calendar className='w-16 h-16 text-gray-600 mb-4 animate-bounce-slow' />
                <p className='text-gray-400 text-lg'>No appointments found</p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              currentAppointments.map((item, index) => (
                <div
                  key={item._id}
                  className='grid grid-cols-1 lg:grid-cols-[0.5fr_2.5fr_1fr_0.8fr_2fr_1fr_1.5fr] gap-4 px-6 py-4 hover:bg-[#141b31] transition-all duration-300 items-center animate-slide-in-row'
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {/* Index */}
                  <p className='hidden lg:block text-gray-400'>{startIndex + index + 1}</p>

                  {/* Patient Info */}
                  <div className='flex items-center gap-3'>
                    <div className='relative'>
                      <img
                        className='w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-gray-700 hover:ring-blue-500 transition-all duration-300'
                        src={item.userData.image}
                        alt=''
                      />
                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f1629] animate-pulse'></div>
                    </div>
                    <div>
                      <p className='text-white font-medium hover:text-blue-400 transition-colors'>{item.userData.name}</p>
                      <p className='text-gray-400 text-sm lg:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className='flex items-center gap-2'>
                    {item.payment ? (
                      <>
                        <CreditCard className='w-4 h-4 text-blue-400 animate-pulse-subtle' />
                        <span className='text-blue-400 text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 hover:bg-blue-500/20 transition-colors'>
                          Online
                        </span>
                      </>
                    ) : (
                      <>
                        <Wallet className='w-4 h-4 text-emerald-400 animate-pulse-subtle' />
                        <span className='text-emerald-400 text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors'>
                          Cash
                        </span>
                      </>
                    )}
                  </div>

                  {/* Age */}
                  <p className='hidden lg:block text-gray-300'>{calculateAge(item.userData.dob)}</p>

                  {/* Date & Time */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2 text-gray-300'>
                      <Calendar className='w-4 h-4 text-gray-500' />
                      <span className='text-sm'>{slotDateFormat(item.slotDate)}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-400'>
                      <Clock className='w-4 h-4 text-gray-500' />
                      <span className='text-sm'>{item.slotTime}</span>
                    </div>
                  </div>

                  {/* Fees */}
                  <div className='flex items-center gap-1 text-white font-semibold'>
                    <DollarSign className='w-4 h-4 text-emerald-400' />
                    <span>{currency}{item.amount}</span>
                  </div>

                  {/* Action */}
                  <div className='flex items-center gap-2'>
                    {item.cancelled ? (
                      <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 w-full justify-center animate-fade-in'>
                        <XCircle className='w-4 h-4 text-red-400' />
                        <span className='text-sm font-medium text-red-400'>Cancelled</span>
                      </div>
                    ) : item.isCompleted ? (
                      <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 w-full justify-center animate-fade-in'>
                        <CheckCircle className='w-4 h-4 text-emerald-400' />
                        <span className='text-sm font-medium text-emerald-400'>Completed</span>
                      </div>
                    ) : (
                      <div className='flex gap-2'>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className='p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all group transform hover:scale-110 active:scale-95'
                          title='Cancel Appointment'
                        >
                          <img className='w-5 h-5 group-hover:rotate-12 transition-transform' src={assets.cancel_icon} alt='Cancel' />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className='p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all group transform hover:scale-110 active:scale-95'
                          title='Complete Appointment'
                        >
                          <img className='w-5 h-5 group-hover:rotate-12 transition-transform' src={assets.tick_icon} alt='Complete' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#0a0e27]'>
              <p className='text-gray-400 text-sm'>
                Showing <span className='text-white font-semibold'>{startIndex + 1}</span> to <span className='text-white font-semibold'>{Math.min(endIndex, filteredAppointments.length)}</span> of <span className='text-white font-semibold'>{filteredAppointments.length}</span> results
              </p>
              
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg bg-[#0f1629] border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>
                
                <div className='flex gap-1'>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-[#0f1629] border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500/50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='p-2 rounded-lg bg-[#0f1629] border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-row {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-slide-in-row {
          animation: slide-in-row 0.3s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default DoctorAppointments