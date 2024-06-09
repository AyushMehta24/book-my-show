import express from 'express'
import user from './usersRoutes'
import theater from './theaterRoutes'
import screen from './screenRoutes'
import seatType from './seatTypeRoutes'
import seat from './seatRoutes'
import movie from './movieDetailRoutes'
import event from './eventDetailRoutes'
import booking from './bookingRoutes'
const router = express()

router.use('/user', user)
router.use('/theater', theater)
router.use('/screen', screen)
router.use('/seattype', seatType)
router.use('/seat', seat)
router.use('/movie', movie)
router.use('/event', event)
router.use('/booking', booking)

export default router
