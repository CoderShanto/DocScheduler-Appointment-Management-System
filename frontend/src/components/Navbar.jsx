import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Logo3D from "./Logo3D";

import { 
  Menu, 
  X, 
  User, 
  Calendar, 
  LogOut, 
  ChevronDown,
  Stethoscope,
  Home,
  Users,
  Info,
  BookOpen,
  Phone
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/doctors', label: 'ALL DOCTORS', icon: Stethoscope },
    { path: '/about', label: 'ABOUT', icon: Info },
    { path: '/blog', label: 'BLOG', icon: BookOpen },
    { path: '/contact', label: 'CONTACT', icon: Phone }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
           {/* Logo */}
<div className="cursor-pointer flex items-center">
  <Logo3D onClick={() => navigate("/")} />
</div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="transition-transform group-hover:scale-110" />
                        <span className="font-medium text-sm">{item.label}</span>
                        
                        {/* Animated underline */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 ${
                          isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                        }`}></div>
                        
                        {/* Hover background */}
                        <div className={`absolute inset-0 rounded-lg bg-primary/5 -z-10 transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}></div>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {token && userData ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group border border-blue-100"
                  >
                    <div className="relative">
                      <img 
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-md" 
                        src={userData.image} 
                        alt="User" 
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="font-medium text-gray-700 hidden lg:block">{userData.name?.split(' ')[0]}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-600 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <>
                      {/* Invisible backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowDropdown(false)}
                      ></div>
                      
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 animate-fadeIn">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                          <p className="font-semibold text-lg">{userData.name}</p>
                          <p className="text-sm text-blue-100">{userData.email}</p>
                        </div>
                        
                        <div className="p-2">
                          <button
                            onClick={() => {
                              navigate('my-profile');
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <span className="text-gray-700 font-medium">My Profile</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              navigate('my-appointments');
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                              <Calendar size={16} className="text-purple-600" />
                            </div>
                            <span className="text-gray-700 font-medium">My Appointments</span>
                          </button>
                          
                          <div className="my-2 border-t border-gray-100"></div>
                          
                          <button
                            onClick={() => {
                              logout();
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                              <LogOut size={16} className="text-red-600" />
                            </div>
                            <span className="text-gray-700 font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-primary hover:to-blue-700 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                >
                  <User size={18} />
                  Create Account
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMenu(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            showMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setShowMenu(false)}
        ></div>

        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-white to-gray-50 shadow-2xl transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <img className="w-36" src={assets.logo} alt="Logo1" />
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>
                        <Icon size={18} className={isActive ? 'text-white' : 'text-primary'} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
            {token && userData ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <img className="w-12 h-12 rounded-full object-cover ring-2 ring-white" src={userData.image} alt="User" />
                  <div>
                    <p className="font-semibold text-gray-800">{userData.name}</p>
                    <p className="text-xs text-gray-600">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-primary hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                <User size={18} />
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;