import React, { useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import {assets} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {

   const {userData,setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage] = useState(false)

  const updateUserProfileData = async () => {
    
    try {
      
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{Authorization: `Bearer ${token}`}})

       console.log("UPDATE RESPONSE:", data)
       
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
       console.log(error);
       toast.error(error.message)      
    }

  }

    
// Add this at the very start
  if (!userData) return <p>Loading profile...</p>;
 console.log("PROFILE DATA:", userData);


  return userData && (

 <div className="relative overflow-hidden max-w-4xl mx-auto mt-14 px-4 space-y-6">

  {/* ================= BACKGROUND FLOATING CARDS ================= */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-24 -left-16 w-72 h-72 bg-primary/10 rounded-3xl rotate-12 blur-2xl animate-bgFloat" />
    <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-400/10 rounded-3xl -rotate-12 blur-2xl animate-bgFloatSlow" />
    <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pink-400/10 rounded-3xl rotate-6 blur-2xl animate-bgFloat" />
  </div>

  {/* ================= PROFILE HEADER ================= */}
  <div
    className="
      bg-white rounded-2xl p-6
      shadow-sm animate-cardEnter
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      hover:ring-1 hover:ring-primary/20
      flex flex-col sm:flex-row items-center gap-6
    "
  >
    {/* Avatar */}
    <div className="relative group">
      <img
        src={image ? URL.createObjectURL(image) : userData.image}
        className="
          w-32 h-32 rounded-full object-cover
          border-4 border-primary/20
          transition-all duration-300
          group-hover:scale-105 group-hover:shadow-lg
        "
        alt=""
      />
      {isEdit && (
        <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
          <span className="text-white text-sm font-medium">Change</span>
          <input hidden type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </label>
      )}
    </div>

    {/* Name & Email */}
    <div className="flex-1 text-center sm:text-left">
      {isEdit ? (
        <input
          className="text-2xl font-semibold bg-transparent border-b-2 border-primary focus:outline-none"
          value={userData.name}
          onChange={(e)=>setUserData(p=>({...p,name:e.target.value}))}
        />
      ) : (
        <h2 className="text-2xl font-semibold">{userData.name}</h2>
      )}
      <p className="text-gray-500">{userData.email}</p>
    </div>

    {/* Edit Button */}
    {!isEdit && (
      <button
        onClick={()=>setIsEdit(true)}
        className="px-6 py-2 rounded-full border border-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-[1px]"
      >
        Edit Profile
      </button>
    )}
  </div>

  {/* ================= CONTACT INFORMATION ================= */}
  <div
    className="
      bg-white rounded-2xl p-6 shadow-sm
      animate-cardEnter
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      hover:ring-1 hover:ring-primary/20
    "
  >
    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
    <div className="grid sm:grid-cols-2 gap-5 text-sm">
      <div>
        <p className="text-gray-500 mb-1">Phone</p>
        {isEdit ? (
          <input
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-primary outline-none"
            value={userData.phone}
            onChange={(e)=>setUserData(p=>({...p,phone:e.target.value}))}
          />
        ) : <p>{userData.phone}</p>}
      </div>
      <div>
        <p className="text-gray-500 mb-1">Address</p>
        {isEdit ? (
          <>
            <input
              className="w-full px-3 py-2 mb-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-primary outline-none"
              value={userData.address.line1}
              onChange={(e)=>setUserData(p=>({...p,address:{...p.address,line1:e.target.value}}))}
            />
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-primary outline-none"
              value={userData.address.line2}
              onChange={(e)=>setUserData(p=>({...p,address:{...p.address,line2:e.target.value}}))}
            />
          </>
        ) : (
          <p className="text-gray-600">{userData.address.line1}<br/>{userData.address.line2}</p>
        )}
      </div>
    </div>
  </div>

  {/* ================= BASIC INFORMATION ================= */}
  <div
    className="
      bg-white rounded-2xl p-6 shadow-sm
      animate-cardEnter
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      hover:ring-1 hover:ring-primary/20
    "
  >
    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
    <div className="grid sm:grid-cols-2 gap-5 text-sm">
      <div>
        <p className="text-gray-500 mb-1">Gender</p>
        {isEdit ? (
          <select
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-primary outline-none"
            value={userData.gender}
            onChange={(e)=>setUserData(p=>({...p,gender:e.target.value}))}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        ) : <p>{userData.gender}</p>}
      </div>
      <div>
        <p className="text-gray-500 mb-1">Date of Birth</p>
        {isEdit ? (
          <input
            type="date"
            className="w-full px-3 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-primary outline-none"
            value={userData.dob}
            onChange={(e)=>setUserData(p=>({...p,dob:e.target.value}))}
          />
        ) : <p>{userData.dob}</p>}
      </div>
    </div>
  </div>

  {/* ================= SAVE BUTTON ================= */}
  {isEdit && (
    <div className="flex justify-end">
      <button
        onClick={updateUserProfileData}
        className="bg-primary text-white px-10 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] active:scale-95"
      >
        Save Changes
      </button>
    </div>
  )}

</div>



  );
};

export default MyProfile;

