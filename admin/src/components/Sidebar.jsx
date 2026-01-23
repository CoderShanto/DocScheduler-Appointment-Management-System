import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, UserPlus, Users, LogOut, ChevronRight, Menu, Activity, Stethoscope } from 'lucide-react';

const Sidebar = () => {
  const { aToken, logout: adminLogout } = useContext(AdminContext);
  const { dToken, logout: doctorLogout } = useContext(DoctorContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  // Admin navigation items
  const adminNavItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: Home },
    { path: '/all-appointments', label: 'Appointments', icon: Calendar },
    { path: '/add-doctor', label: 'Add Doctor', icon: UserPlus },
    { path: '/doctor-list', label: 'Doctors List', icon: Users },
  ];

  // Doctor navigation items
  const doctorNavItems = [
    { path: '/doctor-dashboard', label: 'Dashboard', icon: Home },
    { path: '/doctor-appointments', label: 'Appointments', icon: Calendar },
    { path: '/doctor-profile', label: 'Profile', icon: Users },
  ];

  // Determine which navigation to show and which logout to use
  const isAdmin = !!aToken;
  const isDoctor = !!dToken;
  const navItems = isAdmin ? adminNavItems : doctorNavItems;
  const logout = isAdmin ? adminLogout : doctorLogout;
  const logoText = isAdmin ? 'Admin Portal' : 'Doctor Portal';

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  // Don't render if neither token exists
  if (!aToken && !dToken) return null;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 h-screen sticky top-0 flex flex-col border-r border-cyan-500/20 relative"



    >
      {/* Floating particles background for sidebar */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-cyan-400 rounded-full opacity-5'
            animate={{
              x: [Math.random() * 200, Math.random() * 200],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 200,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      {/* Top header with logo and toggle */}
      <div className="p-4 flex items-center justify-between border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl z-10">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-md opacity-40"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
              <Activity className="text-white" size={20} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                key="logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                {logoText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-cyan-500/10 transition-colors text-cyan-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? <ChevronRight size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 py-2 overflow-y-auto max-h-[calc(100vh-80px)]">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setActiveItem(item.path)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive: navActive }) => 
                    `relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
                    ${navActive 
                      ? '' 
                      : 'text-cyan-300/80 hover:text-cyan-300'
                    }`
                  }
                  onClick={() => setIsExpanded(true)}
                >
                  {/* Animated background for active state */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl z-0 border border-cyan-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Icon container with hover animation */}
                  <motion.div
                    className={`relative z-10 p-2 rounded-lg ${
                      isActive ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-slate-800/50 border border-cyan-500/30'
                    }`}
                    whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Icon 
                      size={20} 
                      className={isActive ? 'text-white' : 'text-cyan-400'} 
                    />
                  </motion.div>
                  
                  {/* Label with staggered entrance */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium z-10 truncate text-white"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover indicator */}
                  <AnimatePresence>
                    {activeItem === item.path && !isActive && (
                      <motion.div
                        className="absolute right-2 w-1 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 24 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Removed Logout button as requested */}
      
      {/* Subtle glow effect */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-500/30 to-purple-500/30"></div>
    </motion.div>
  );
};

export default Sidebar;
