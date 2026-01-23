import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Upload, User, Mail, Lock, GraduationCap, Award, DollarSign, Stethoscope, MapPin, FileText, Sparkles, CheckCircle } from 'lucide-react'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const InputField = ({ icon: Icon, label, type = "text", value, onChange, placeholder, required = true }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <label className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/30 focus:outline-none focus:border-cyan-400 focus:bg-slate-800/70 transition-all"
        />
      </div>
    </motion.div>
  )

  const SelectField = ({ icon: Icon, label, value, onChange, options }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <label className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-slate-800/70 transition-all cursor-pointer"
      >
        {options.map((option, index) => (
          <option key={index} value={option} className="bg-slate-800">
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  )

  return (
    <div className="flex-1 w-full min-w-0 min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
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

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            Add New Doctor
          </h1>
          <p className="text-cyan-300/60">Register a new healthcare professional to your team</p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={onSubmitHandler}
          className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl"
        >
          {/* Image Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <label className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-4">
              <Upload className="w-4 h-4" />
              Doctor Profile Image
            </label>
            
            <div className="flex items-start gap-6">
              {/* Image Preview */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                
                <label htmlFor="doc-img" className="relative cursor-pointer block">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-slate-800/50 flex items-center justify-center">
                    {docImg ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(docImg)}
                        alt=""
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-cyan-300/50 text-xs">Upload</p>
                      </div>
                    )}
                  </div>
                </label>
              </motion.div>

              {/* Upload Instructions */}
              <div className="flex-1 bg-slate-800/30 border border-cyan-500/20 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Upload Guidelines
                </h3>
                <ul className="text-cyan-300/60 text-sm space-y-1">
                  <li>• Professional headshot preferred</li>
                  <li>• Clear face visibility required</li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Formats: JPG, PNG, WebP</li>
                </ul>
              </div>
            </div>

            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-8" />

          {/* Basic Information */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. John Doe"
              />

              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.com"
              />

              <InputField
                icon={Lock}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <SelectField
                icon={GraduationCap}
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                options={[
                  '1 Year', '2 Years', '3 Years', '4 Years', '5 Years',
                  '6 Years', '7 Years', '8 Years', '9 Years', '10 Years'
                ]}
              />
            </div>
          </div>

          {/* Professional Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Professional Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                icon={Stethoscope}
                label="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                options={[
                  'General physician',
                  'Gynecologist',
                  'Dermatologist',
                  'Pediatricians',
                  'Neurologist',
                  'Gastroenterologist'
                ]}
              />

              <InputField
                icon={Award}
                label="Education / Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="MBBS, MD"
              />

              <InputField
                icon={DollarSign}
                label="Consultation Fee"
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="50"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
              Location Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={MapPin}
                label="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="123 Medical Center St"
              />

              <InputField
                icon={MapPin}
                label="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Suite 100, City"
                required={false}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full" />
              About Doctor
            </h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-2">
                <FileText className="w-4 h-4" />
                Professional Bio
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Brief introduction about the doctor's expertise, achievements, and approach to patient care..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/30 focus:outline-none focus:border-cyan-400 focus:bg-slate-800/70 transition-all resize-none"
                required
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <CheckCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Add Doctor to Team
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default AddDoctor