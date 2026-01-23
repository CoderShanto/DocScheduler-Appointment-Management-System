import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { motion } from 'framer-motion'
import { LogOut, User } from 'lucide-react'

const Navbar = ({ navigate }) => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const logout = () => {
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    navigate('/')
  }

  const isAdmin = !!aToken
  const role = isAdmin ? 'Admin' : 'Doctor'

  return (
    <div className="bg-[#1a1d3d] border-b border-indigo-800/30 shadow-lg">
      <div className="flex justify-between items-center px-6 sm:px-10 py-4">
        {/* Left - Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Dashboard Panel</h1>
              <p className="text-indigo-300 text-xs">Healthcare Management</p>
            </div>
          </div>
        </motion.div>

        {/* Right - Role & Logout */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Role Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full backdrop-blur-sm">
            <User className="w-4 h-4 text-indigo-300" />
            <span className="text-indigo-200 text-sm font-semibold">{role}</span>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-full shadow-lg shadow-red-500/40 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Navbar