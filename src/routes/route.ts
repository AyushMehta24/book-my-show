import express from 'express'
import user from './usersRoutes'
import theater from './theaterRoutes'
import screen from './screenRoutes'
import seatType from './seatTypeRoutes'
import seat from './seatRoutes'
import movie from './movieDetailRoutes'
const router = express()

router.use('/user', user)
router.use('/theater', theater)
router.use('/screen', screen)
router.use('/seattype', seatType)
router.use('/seat', seat)
router.use('/movie', movie)

export default router
