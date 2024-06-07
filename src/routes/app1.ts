// app.ts

import express from 'express'
import userRoutes from './userRoutes1'
import theaterRoutes from './theaterRoutes'
import screenRoutes from './screenRoutes'
import seatRoutes from './seatRoutes'
import movieDetailRoutes from './movieDetailRoutes'
import eventDetailRoutes from './eventDetailRoutes'
import bookingRoutes from './bookingRoutes'
import ticketRoutes from './ticketRoutes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/theaters', theaterRoutes)
app.use('/api/screens', screenRoutes)
app.use('/api/seats', seatRoutes)
app.use('/api/movie-details', movieDetailRoutes)
app.use('/api/event-details', eventDetailRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/tickets', ticketRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
