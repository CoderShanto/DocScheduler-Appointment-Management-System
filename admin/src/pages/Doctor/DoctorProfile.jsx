import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { User, GraduationCap, Briefcase, MapPin, DollarSign, Edit3, Save, X, Check, Award, Clock, Star, Mail, Phone, Calendar } from 'lucide-react'

const DoctorProfile = () => {
  const { getProfileData, profileData, setProfileData, dToken, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      
      const response = await fetch(backendUrl + '/api/doctor/update-profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dToken}` 
        },
        body: JSON.stringify(updateData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='min-h-screen bg-[#0a0e27] p-4 md:p-8'>
      <div className='fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 pointer-events-none'></div>
      
      <div className='relative max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8 animate-slide-down'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Doctor Profile</h1>
          <p className='text-gray-400'>Manage your professional information</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Profile Image Card */}
          <div className='lg:col-span-1 animate-slide-right'>
            <div className='bg-[#0f1629] rounded-2xl border border-gray-800 overflow-hidden'>
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <img 
                  className='w-full h-auto object-cover' 
                  src={profileData.image} 
                  alt='Doctor Profile' 
                />
                {/* Availability Badge */}
                <div className='absolute top-4 right-4'>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border ${
                    profileData.available 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-red-500/20 border-red-500/50 text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.available ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span className='text-sm font-medium'>
                      {profileData.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className='p-6 space-y-4'>
                <div className='flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 transform hover:scale-105 transition-transform'>
                  <div className='p-2 bg-blue-500/20 rounded-lg'>
                    <Award className='w-5 h-5 text-blue-400' />
                  </div>
                  <div>
                    <p className='text-gray-400 text-xs'>Specialization</p>
                    <p className='text-white font-medium'>{profileData.speciality}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 transform hover:scale-105 transition-transform'>
                  <div className='p-2 bg-purple-500/20 rounded-lg'>
                    <Clock className='w-5 h-5 text-purple-400' />
                  </div>
                  <div>
                    <p className='text-gray-400 text-xs'>Experience</p>
                    <p className='text-white font-medium'>{profileData.experience}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transform hover:scale-105 transition-transform'>
                  <div className='p-2 bg-emerald-500/20 rounded-lg'>
                    <DollarSign className='w-5 h-5 text-emerald-400' />
                  </div>
                  <div>
                    <p className='text-gray-400 text-xs'>Consultation Fee</p>
                    <p className='text-white font-medium'>{currency} {profileData.fees}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className='lg:col-span-2 animate-slide-left'>
            <div className='bg-[#0f1629] rounded-2xl border border-gray-800 p-6 md:p-8'>
              {/* Edit Button */}
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-white'>Professional Information</h2>
                {!isEdit ? (
                  <button
                    onClick={() => setIsEdit(true)}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all transform hover:scale-105 active:scale-95'
                  >
                    <Edit3 className='w-4 h-4' />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setIsEdit(false)}
                      className='flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all transform hover:scale-105 active:scale-95'
                    >
                      <X className='w-4 h-4' />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={updateProfile}
                      disabled={loading}
                      className='flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {loading ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className='w-4 h-4' />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Name Section */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-blue-500/10 rounded-lg'>
                    <User className='w-5 h-5 text-blue-400' />
                  </div>
                  <h3 className='text-xl font-semibold text-white'>{profileData.name}</h3>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <span className='flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm'>
                    <GraduationCap className='w-4 h-4' />
                    {profileData.degree}
                  </span>
                  <span className='flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm'>
                    <Briefcase className='w-4 h-4' />
                    {profileData.speciality}
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div className='mb-6 p-4 bg-[#141b31] rounded-xl border border-gray-800'>
                <div className='flex items-center gap-2 mb-3'>
                  <Award className='w-5 h-5 text-blue-400' />
                  <h4 className='text-white font-semibold'>About</h4>
                </div>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  {profileData.about}
                </p>
              </div>

              {/* Fees Section */}
              <div className='mb-6 p-4 bg-[#141b31] rounded-xl border border-gray-800'>
                <div className='flex items-center gap-2 mb-3'>
                  <DollarSign className='w-5 h-5 text-emerald-400' />
                  <h4 className='text-white font-semibold'>Consultation Fee</h4>
                </div>
                {isEdit ? (
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-400'>{currency}</span>
                    <input
                      type='number'
                      onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                      value={profileData.fees}
                      className='bg-[#0a0e27] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 w-32'
                    />
                  </div>
                ) : (
                  <p className='text-2xl font-bold text-emerald-400'>{currency} {profileData.fees}</p>
                )}
              </div>

              {/* Address Section */}
              <div className='mb-6 p-4 bg-[#141b31] rounded-xl border border-gray-800'>
                <div className='flex items-center gap-2 mb-3'>
                  <MapPin className='w-5 h-5 text-purple-400' />
                  <h4 className='text-white font-semibold'>Clinic Address</h4>
                </div>
                {isEdit ? (
                  <div className='space-y-3'>
                    <input
                      type='text'
                      placeholder='Address Line 1'
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      value={profileData.address.line1}
                      className='w-full bg-[#0a0e27] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500'
                    />
                    <input
                      type='text'
                      placeholder='Address Line 2'
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      value={profileData.address.line2}
                      className='w-full bg-[#0a0e27] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500'
                    />
                  </div>
                ) : (
                  <div className='text-gray-300 text-sm space-y-1'>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </div>
                )}
              </div>

              {/* Availability Toggle */}
              <div className='p-4 bg-[#141b31] rounded-xl border border-gray-800'>
                <label className='flex items-center justify-between cursor-pointer group'>
                  <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-lg ${
                      profileData.available ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        profileData.available ? 'text-emerald-400' : 'text-red-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className='text-white font-semibold'>Availability Status</h4>
                      <p className='text-gray-400 text-sm'>Toggle your availability for appointments</p>
                    </div>
                  </div>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={profileData.available}
                      onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                      disabled={!isEdit}
                      className='sr-only peer'
                    />
                    <div className={`w-14 h-7 rounded-full transition-all ${
                      profileData.available ? 'bg-emerald-500' : 'bg-gray-600'
                    } ${!isEdit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      profileData.available ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-right {
          animation: slide-right 0.6s ease-out;
        }
        .animate-slide-left {
          animation: slide-left 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default DoctorProfile