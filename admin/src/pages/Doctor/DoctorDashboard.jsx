import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, TrendingUp, Users, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react'

const DoctorDashboard = () => {
  const { getDashData, dashData, cancelAppointment, dToken, completeAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)
  const [animatedStats, setAnimatedStats] = useState({ earnings: 0, appointments: 0, patients: 0 })

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  useEffect(() => {
    if (dashData) {
      const duration = 1000
      const steps = 50
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          earnings: Math.floor(dashData.earnings * progress),
          appointments: Math.floor(dashData.appointments * progress),
          patients: Math.floor(dashData.patients * progress)
        })

        if (currentStep >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [dashData])

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId)
    getDashData()
  }

  const handleCompleteAppointment = async (appointmentId) => {
    await completeAppointment(appointmentId)
    getDashData()
  }

  // Process real appointment data for charts
  const getAppointmentStats = () => {
    if (!dashData?.latestAppointment) return []
    
    const stats = {}
    dashData.latestAppointment.forEach(apt => {
      const date = new Date(apt.slotDate)
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      
      if (!stats[dateStr]) {
        stats[dateStr] = { date: dateStr, total: 0, completed: 0, cancelled: 0 }
      }
      
      stats[dateStr].total++
      if (apt.isCompleted) stats[dateStr].completed++
      if (apt.cancelled) stats[dateStr].cancelled++
    })
    
    return Object.values(stats).slice(-7)
  }

  const appointmentChartData = getAppointmentStats()

  return dashData && (
    <div className='min-h-screen bg-[#0a0e27] p-4 md:p-8'>
      {/* Gradient Overlay */}
      <div className='fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none'></div>
      
      <div className='relative max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Dashboard</h1>
          <p className='text-gray-400'>Welcome back, Doctor</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* Earnings Card */}
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative bg-[#0f1629] rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all'>
              <div className='flex items-start justify-between mb-4'>
                <div className='p-3 bg-emerald-500/10 rounded-xl'>
                  <DollarSign className='w-6 h-6 text-emerald-400' />
                </div>
                <span className='text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full'>Active</span>
              </div>
              <h3 className='text-gray-400 text-sm mb-1'>Total Earnings</h3>
              <p className='text-3xl font-bold text-white mb-2'>
                {currency}{animatedStats.earnings.toLocaleString()}
              </p>
              <div className='flex items-center text-emerald-400 text-sm'>
                <TrendingUp className='w-4 h-4 mr-1' />
                <span>Revenue generated</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative bg-[#0f1629] rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all'>
              <div className='flex items-start justify-between mb-4'>
                <div className='p-3 bg-blue-500/10 rounded-xl'>
                  <Calendar className='w-6 h-6 text-blue-400' />
                </div>
                <span className='text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full'>Total</span>
              </div>
              <h3 className='text-gray-400 text-sm mb-1'>Appointments</h3>
              <p className='text-3xl font-bold text-white mb-2'>
                {animatedStats.appointments}
              </p>
              <div className='flex items-center text-blue-400 text-sm'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>Scheduled appointments</span>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative bg-[#0f1629] rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all'>
              <div className='flex items-start justify-between mb-4'>
                <div className='p-3 bg-purple-500/10 rounded-xl'>
                  <Users className='w-6 h-6 text-purple-400' />
                </div>
                <span className='text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full'>Unique</span>
              </div>
              <h3 className='text-gray-400 text-sm mb-1'>Total Patients</h3>
              <p className='text-3xl font-bold text-white mb-2'>
                {animatedStats.patients}
              </p>
              <div className='flex items-center text-purple-400 text-sm'>
                <Users className='w-4 h-4 mr-1' />
                <span>Registered patients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {appointmentChartData.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
            {/* Appointment Trends */}
            <div className='bg-[#0f1629] rounded-2xl p-6 border border-gray-800'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold text-white'>Appointment Trends</h3>
                <div className='flex gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-blue-500'></div>
                    <span className='text-gray-400'>Total</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-emerald-500'></div>
                    <span className='text-gray-400'>Completed</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width='100%' height={250}>
                <AreaChart data={appointmentChartData}>
                  <defs>
                    <linearGradient id='colorTotal' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3}/>
                      <stop offset='95%' stopColor='#3b82f6' stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id='colorCompleted' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#10b981' stopOpacity={0.3}/>
                      <stop offset='95%' stopColor='#10b981' stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
                  <XAxis dataKey='date' stroke='#64748b' />
                  <YAxis stroke='#64748b' />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f1629', 
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Area type='monotone' dataKey='total' stroke='#3b82f6' fillOpacity={1} fill='url(#colorTotal)' strokeWidth={2} />
                  <Area type='monotone' dataKey='completed' stroke='#10b981' fillOpacity={1} fill='url(#colorCompleted)' strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Status Overview */}
            <div className='bg-[#0f1629] rounded-2xl p-6 border border-gray-800'>
              <h3 className='text-xl font-semibold text-white mb-6'>Appointment Status</h3>
              <ResponsiveContainer width='100%' height={250}>
                <BarChart data={appointmentChartData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#1e293b' />
                  <XAxis dataKey='date' stroke='#64748b' />
                  <YAxis stroke='#64748b' />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f1629', 
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey='completed' fill='#10b981' radius={[8, 8, 0, 0]} />
                  <Bar dataKey='cancelled' fill='#ef4444' radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className='flex gap-4 mt-4 text-sm justify-center'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-emerald-500'></div>
                  <span className='text-gray-400'>Completed</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-red-500'></div>
                  <span className='text-gray-400'>Cancelled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Bookings */}
        <div className='bg-[#0f1629] rounded-2xl border border-gray-800 overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-800 flex items-center gap-3'>
            <img src={assets.list_icon} alt='' className='w-6 h-6' />
            <h3 className='text-xl font-semibold text-white'>Latest Bookings</h3>
          </div>
          
          <div className='divide-y divide-gray-800'>
            {dashData?.latestAppointment?.map((item, index) => (
              <div 
                key={index} 
                className='px-6 py-4 hover:bg-[#141b31] transition-colors flex items-center gap-4'
              >
                <img 
                  className='w-14 h-14 rounded-full object-cover ring-2 ring-gray-700' 
                  src={item.userData.image} 
                  alt='' 
                />
                
                <div className='flex-1 min-w-0'>
                  <p className='text-white font-medium text-base mb-1'>{item.userData.name}</p>
                  <p className='text-gray-400 text-sm flex items-center gap-1'>
                    <Clock className='w-3.5 h-3.5' />
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30'>
                    <XCircle className='w-4 h-4 text-red-400' />
                    <span className='text-sm font-medium text-red-400'>Cancelled</span>
                  </div>
                ) : item.isCompleted ? (
                  <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30'>
                    <CheckCircle className='w-4 h-4 text-emerald-400' />
                    <span className='text-sm font-medium text-emerald-400'>Completed</span>
                  </div>
                ) : (
                  <div className='flex gap-2'>
                    <button 
                      onClick={() => handleCancelAppointment(item._id)}
                      className='p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all'
                      title='Cancel'
                    >
                      <img className='w-6 h-6' src={assets.cancel_icon} alt='Cancel' />
                    </button>
                    <button 
                      onClick={() => handleCompleteAppointment(item._id)}
                      className='p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all'
                      title='Complete'
                    >
                      <img className='w-6 h-6' src={assets.tick_icon} alt='Complete' />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default DoctorDashboard