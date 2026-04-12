import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import paymentRoutes from './routes/paymentRoutes.js'
import dotenv from "dotenv";

dotenv.config();

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// ✅ MIDDLEWARES MUST COME BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://docscheduler-appointment-management-68ha.onrender.com'
  ],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

// ✅ NOW register your API endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/payment', paymentRoutes)

app.get('/', (req, res) => {
    res.send('API WORKING SIR')
})

app.listen(port, () => console.log("Server Started", port))