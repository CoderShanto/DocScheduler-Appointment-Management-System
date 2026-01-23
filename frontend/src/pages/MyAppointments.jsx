import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'

const MyAppointment = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) => {

    const dateArray =  slotDate.split('_')
    const day = dateArray[0]
  const monthIndex = Number(dateArray[1]) - 1   // 🔥 important
  const year = dateArray[2]

  return `${day} ${months[monthIndex]} ${year}`

  }
  //const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers: {Authorization: `Bearer ${token}`}
})
      
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

const payNow = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/payment/init",
      { appointmentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      // redirect to SSLCommerz gateway
      window.location.assign(data.gatewayUrl); // ✅ best way
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Payment failed");
  }
};







  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
   <div className='max-w-6xl mx-auto px-4 py-6'>
      <p className='pb-4 mt-12 font-semibold text-zinc-800 border-b-2 border-zinc-200 text-2xl'>My appointments</p>
      <div className='space-y-5 mt-6'>
        {appointments.slice(0, 20).map((item, index) => (
          <div
            className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 border border-zinc-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300'
            key={index}
          >
            <div className='w-32 h-32 flex-shrink-0'>
              <img
                className='w-full h-full object-cover rounded-xl bg-indigo-50 ring-2 ring-indigo-100'
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>
            <div className='flex-1 text-sm text-zinc-600 space-y-2'>
              <div>
                <p className='text-neutral-900 font-bold text-lg'>{item.docData.name}</p>
                <p className='text-indigo-600 font-semibold text-sm bg-indigo-50 inline-block px-3 py-1 rounded-full mt-1'>{item.docData.speciality}</p>
              </div>
              <div className='bg-zinc-50 p-3 rounded-lg mt-3'>
                <p className='text-zinc-800 font-semibold text-sm mb-1'>Address:</p>
                <p className='text-xs text-zinc-700'>{item.docData.address.line1}</p>
                <p className='text-xs text-zinc-700'>{item.docData.address.line2}</p>
              </div>
              <div className='bg-blue-50 p-3 rounded-lg'>
                <span className='text-sm text-neutral-800 font-semibold'>Date & Time: </span>
                <span className='text-sm font-medium text-blue-700'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
              </div>
            </div>
            <div className='flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0'>
             {!item.cancelled && !item.payment && (
  <button
    onClick={() => payNow(item._id)}
    className='text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300 w-full sm:min-w-40'
  >
    Pay Online
  </button>
)}
{item.payment && !item.isCompleted && (
  <button
    disabled
    className='text-sm font-semibold text-green-600 bg-green-50 border border-green-200 py-2.5 px-6 rounded-lg w-full sm:min-w-40 cursor-not-allowed'
  >
    Paid
  </button>
)}


              {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm font-semibold text-red-600 bg-white border-2 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 py-2.5 px-6 rounded-lg transition-all duration-300 w-full sm:min-w-40'>
                Cancel Appointment
              </button> } 
              {item.cancelled && !item.isCompleted && <button className='text-sm font-semibold text-red-600 bg-white border-2 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 py-2.5 px-6 rounded-lg transition-all duration-300 w-full sm:min-w-40'>Appointment cancelled</button>}
              {item.isCompleted && <button className='text-sm font-semibold text-green-600 bg-green-50 border border-green-200 py-2.5 px-6 rounded-lg w-full sm:min-w-40 cursor-not-allowed'>Completed</button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment