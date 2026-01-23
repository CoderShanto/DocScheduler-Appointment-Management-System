import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Calendar, Clock, Award, DollarSign, CheckCircle, Info, Sparkles, ArrowRight } from 'lucide-react'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()
    let allSlots = []
    let dayCount = 0

    while(allSlots.length < 7) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + dayCount)

      let endTime = new Date()
      endTime.setDate(today.getDate() + dayCount)
      endTime.setHours(21,0,0,0)

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day +"_" + month + "_" + year
        const slotTimeCheck = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTimeCheck) ? false : true

        if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      if(timeSlots.length > 0) {
        allSlots.push(timeSlots)
      }
      dayCount++
    }
    setDocSlots(allSlots)
  }

  const bookAppointment = async () => {
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day  = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()
      const slotDate = day +"_" + month + "_" + year
      
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime},{headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])

  useEffect(() =>{
    if(docInfo) getAvailableSlots()
  },[docInfo])

  return docInfo && (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-8'>
      {/*-----------Doctor Details Card-----------*/}
      <div className='flex flex-col sm:flex-row gap-6 bg-white rounded-2xl shadow-lg p-6 mb-10 animate-fade-in'>
        {/* Doctor Image */}
        <div className='relative group w-full sm:max-w-xs'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity'></div>
          <img 
            className='relative w-full sm:max-w-72 rounded-xl object-cover border-2 border-gray-100 transform group-hover:scale-[1.02] transition-transform duration-300' 
            src={docInfo.image} 
            alt={docInfo.name} 
          />
        </div>

        {/* Doctor Info */}
        <div className='flex-1 border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-blue-50'>
          {/* Name & Verification */}
          <div className='flex items-center gap-2 mb-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>{docInfo.name}</h1>
            <img className='w-5 h-5 animate-pulse' src={assets.verified_icon} alt='Verified' />
          </div>

          {/* Credentials */}
          <div className='flex flex-wrap items-center gap-2 mb-4 text-sm text-gray-600'>
            <span className='flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium'>
              <Award className='w-3.5 h-3.5' />
              {docInfo.degree}
            </span>
            <span>-</span>
            <span className='bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium'>
              {docInfo.speciality}
            </span>
            <button className='px-3 py-1 border border-gray-300 text-xs rounded-full hover:bg-gray-50 transition-colors'>
              {docInfo.experience}
            </button>
          </div>

          {/* About Section */}
          <div className='mb-4'>
            <div className='flex items-center gap-2 mb-2'>
              <Info className='w-4 h-4 text-blue-500' />
              <p className='text-sm font-semibold text-gray-900'>About</p>
            </div>
            <p className='text-sm text-gray-600 leading-relaxed max-w-[700px]'>
              {docInfo.about}
            </p>
          </div>

          {/* Fee */}
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-3 rounded-xl shadow-md'>
            <DollarSign className='w-5 h-5' />
            <div>
              <p className='text-xs opacity-90'>Appointment fee</p>
              <p className='text-lg font-bold'>{currencySymbol}{docInfo.fees}</p>
            </div>
          </div>
        </div>
      </div>

      {/*-----------Booking Slots Section-----------*/}
      <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-10 animate-fade-in-delayed'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg'>
            <Calendar className='w-5 h-5 text-white' />
          </div>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Booking Slots</h2>
        </div>

        {/* Date Selection */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll pb-4 mb-6 scrollbar-hide'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => { setSlotIndex(index); setSlotTime("") }}
              className={`text-center py-4 px-5 min-w-[80px] rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
                slotIndex === index
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40'
                  : 'border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <p className='text-xs font-semibold mb-1'>
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </p>
              <p className='text-xl font-bold'>
                {item[0] && item[0].datetime.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* Time Selection */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll pb-4 scrollbar-hide'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-medium flex-shrink-0 px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                item.time === slotTime
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40'
                  : 'text-gray-500 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className='flex items-center gap-1.5'>
                <Clock className='w-3.5 h-3.5' />
                {item.time.toLowerCase()}
              </div>
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className='mt-6'>
          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className='group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-10 py-3.5 rounded-full shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            <span>Book an appointment</span>
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </button>
        </div>
      </div>

      {/*-----------Related Doctors-----------*/}
      <div className='animate-fade-in-slow'>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Appointment