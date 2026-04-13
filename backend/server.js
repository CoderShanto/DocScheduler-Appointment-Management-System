import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import paymentRoutes from './routes/paymentRoutes.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// DB + cloud
connectDB()
connectCloudinary()

// ======================
// MIDDLEWARES
// ======================

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ SIMPLE + SAFE CORS (FINAL)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://docscheduler-appointment-management-68ha.onrender.com'
  ],
  credentials: true
}))

// ✅ Handle preflight
app.options('*', cors())

// ======================
// ROUTES
// ======================

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/payment', paymentRoutes)

// test route
app.get('/', (req, res) => {
  res.send('API WORKING SIR FINAL')
})

// ======================
// START SERVER
// ======================

app.listen(port, () => {
  console.log("Server Started on port", port)
})