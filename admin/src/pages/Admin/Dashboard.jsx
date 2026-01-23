import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Activity, Users, Calendar, TrendingUp, Zap, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const {aToken, getDashData, cancelAppointment, dashData} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)
  const [activeView, setActiveView] = useState('overview')
  const [time, setTime] = useState(new Date())

  const handleCancel = async (id) => {
  await cancelAppointment(id);
  await getDashData(); // refresh UI immediately
};


  useEffect(()=>{
    if(aToken){
     getDashData()
    }
  },[aToken])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const statsData = dashData ? [
    { name: 'Doctors', value: dashData.doctors, color: '#06b6d4', icon: Users },
    { name: 'Appointments', value: dashData.appointments, color: '#8b5cf6', icon: Calendar },
    { name: 'Patients', value: dashData.patients, color: '#ec4899', icon: Activity }
  ] : []

  const appointmentStatusData = dashData ? [
    { 
      name: 'Completed', 
      value: dashData.latestAppointments.filter(app => app.isCompleted).length,
      color: '#10b981'
    },
    { 
      name: 'Cancelled', 
      value: dashData.latestAppointments.filter(app => app.cancelled).length,
      color: '#ef4444'
    },
    { 
      name: 'Pending', 
      value: dashData.latestAppointments.filter(app => !app.cancelled && !app.isCompleted).length,
      color: '#f59e0b'
    }
  ] : []

  const radarData = dashData ? [
    { 
      metric: 'Doctors', 
      value: Math.min((dashData.doctors / 20) * 100, 100) 
    },
    { 
      metric: 'Appointments', 
      value: Math.min((dashData.appointments / 50) * 100, 100) 
    },
    { 
      metric: 'Patients', 
      value: Math.min((dashData.patients / 10) * 100, 100) 
    },
    { 
      metric: 'Completion Rate', 
      value: dashData.latestAppointments.length > 0 
        ? (dashData.latestAppointments.filter(app => app.isCompleted).length / dashData.latestAppointments.length) * 100 
        : 0
    },
    { 
      metric: 'Active Rate', 
      value: dashData.latestAppointments.length > 0 
        ? ((dashData.latestAppointments.length - dashData.latestAppointments.filter(app => app.cancelled).length) / dashData.latestAppointments.length) * 100 
        : 0
    }
  ] : []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.3)",
        "0 0 40px rgba(139, 92, 246, 0.4)",
        "0 0 20px rgba(99, 102, 241, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return dashData && (
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

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative z-10 mb-8'
      >
        <div className='bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 shadow-2xl'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <motion.h1 
                className='text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Admin Command Center
              </motion.h1>
              <p className='text-cyan-300/60 mt-2 flex items-center gap-2'>
                <Zap className='w-4 h-4' />
                Real-time System Analytics
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <motion.div 
                className='bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl px-6 py-3'
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className='text-cyan-300 text-sm font-mono'>
                  <Clock className='w-4 h-4 inline mr-2' />
                  {time.toLocaleTimeString()}
                </div>
                <div className='text-cyan-400/60 text-xs mt-1'>
                  {time.toLocaleDateString()}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Holographic Stats Cards */}
      <motion.div 
        className='relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          const colors = [
            { from: 'from-cyan-500', to: 'to-blue-600', glow: 'shadow-cyan-500/50' },
            { from: 'from-purple-500', to: 'to-pink-600', glow: 'shadow-purple-500/50' },
            { from: 'from-pink-500', to: 'to-rose-600', glow: 'shadow-pink-500/50' }
          ]
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className='group relative'
            >
              {/* Glow Effect */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${colors[index].from} ${colors[index].to} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Card Content */}
              <div className='relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden'>
                {/* Holographic Overlay */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                
                {/* Geometric Pattern */}
                <div className='absolute top-0 right-0 w-32 h-32 opacity-10'>
                  <div className={`w-full h-full bg-gradient-to-br ${colors[index].from} ${colors[index].to} rotate-45 translate-x-16 -translate-y-16`} />
                </div>
                
                <div className='relative z-10'>
                  <div className='flex items-center justify-between mb-4'>
                    <motion.div 
                      className={`bg-gradient-to-br ${colors[index].from} ${colors[index].to} p-3 rounded-xl ${colors[index].glow} shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className='w-7 h-7 text-white' />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className='flex items-center gap-1 text-green-400 text-sm font-semibold'
                    >
                      <TrendingUp className='w-4 h-4' />
                      +{12 + index * 3}%
                    </motion.div>
                  </div>
                  
                  <motion.p 
                    className='text-5xl font-bold text-white mb-2'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  
                  <p className='text-cyan-300/70 text-sm font-medium tracking-wide uppercase'>
                    {stat.name}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className='mt-4 h-1 bg-white/10 rounded-full overflow-hidden'>
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${colors[index].from} ${colors[index].to}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Advanced Analytics Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'
      >
        {/* 3D Bar Chart */}
        <motion.div 
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl'
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full' />
            <h3 className='text-xl font-bold text-white'>Performance Metrics</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statsData}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                  border: '2px solid rgba(99, 102, 241, 0.5)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                labelStyle={{ color: '#60a5fa', fontWeight: 'bold', marginBottom: '4px' }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
              />
              <Bar dataKey="value" fill="url(#colorBar)" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Holographic Pie Chart */}
        <motion.div 
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl'
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full' />
            <h3 className='text-xl font-bold text-white'>Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <defs>
                {appointmentStatusData.map((entry, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                labelLine={{
                  stroke: '#94a3b8',
                  strokeWidth: 2
                }}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 30;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text 
                      x={x} 
                      y={y} 
                      fill="#fff" 
                      textAnchor={x > cx ? 'start' : 'end'} 
                      dominantBaseline="central"
                      style={{ 
                        fontSize: '16px', 
                        fontWeight: '700',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                      }}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={3}
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                labelStyle={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '4px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Radar & Area Charts */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'
      >
        {/* Radar Chart */}
        <motion.div 
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 shadow-2xl'
          whileHover={{ scale: 1.02 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-pink-400 to-rose-600 rounded-full' />
            <h3 className='text-xl font-bold text-white'>System Health</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <PolarGrid stroke="rgba(236, 72, 153, 0.2)" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" style={{ fontSize: '11px' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar 
                name="Performance" 
                dataKey="value" 
                stroke="#ec4899" 
                fill="url(#radarGradient)" 
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                  border: '2px solid rgba(236, 72, 153, 0.5)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                labelStyle={{ color: '#f9a8d4', fontWeight: 'bold', marginBottom: '4px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Area Chart */}
        <motion.div 
          className='bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 shadow-2xl'
          whileHover={{ scale: 1.02 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full' />
            <h3 className='text-xl font-bold text-white'>Growth Trajectory</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={statsData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                  border: '2px solid rgba(16, 185, 129, 0.5)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  padding: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                labelStyle={{ color: '#6ee7b7', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#areaGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Futuristic Booking List */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='relative z-10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl'
      >
        {/* Animated Header */}
        <div className='relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border-b border-white/10 px-6 py-5'>
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10'
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className='relative flex items-center gap-3'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Activity className='w-6 h-6 text-cyan-400' />
            </motion.div>
            <h3 className='text-xl font-bold text-white'>Live Booking Feed</h3>
            <motion.div 
              className='ml-auto px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className='text-green-400 text-sm font-semibold'>● LIVE</span>
            </motion.div>
          </div>
        </div>

        {/* Booking Items */}
        <div className='divide-y divide-white/5'>
          {dashData.latestAppointments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                x: 10
              }}
              className='group px-6 py-5 flex items-center gap-5 transition-all duration-300'
            >
              {/* Doctor Avatar with Glow */}
              <div className='relative'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75'
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <img 
                  className='relative w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors' 
                  src={item.docData.image} 
                  alt="" 
                />
              </div>

              {/* Info */}
              <div className='flex-1'>
                <p className='text-white font-semibold text-lg mb-1'>
                  {item.docData.name}
                </p>
                <div className='flex items-center gap-2 text-cyan-300/60 text-sm'>
                  <Clock className='w-4 h-4' />
                  {slotDateFormat(item.slotDate)}
                </div>
              </div>

              {/* Status Badge */}
              {item.cancelled ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm'
                >
                  <XCircle className='w-4 h-4 text-red-400' />
                  <span className='text-red-400 font-semibold text-sm'>Cancelled</span>
                </motion.div>
              ) : item.isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm'
                >
                  <CheckCircle className='w-4 h-4 text-green-400' />
                  <span className='text-green-400 font-semibold text-sm'>Completed</span>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCancel(item._id)}
                  className='flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-xl backdrop-blur-sm hover:bg-orange-500/30 transition-all'
                >
                  <AlertCircle className='w-4 h-4 text-orange-400' />
                  <span className='text-orange-400 font-semibold text-sm'>Cancel</span>
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard