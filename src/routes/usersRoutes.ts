import express from 'express'
import { createUser, createUserWithTheater,createUserWithSeat , createUserWithScreen, deleteUser, getAllUser, updateUser } from '../controllers/usersController'
import { createUserValidate, createUserWithTheaterValidate, createUserWithScreenValidate, updateUserValidate, createUserWithSeatValidate } from '../middlewares/userValidator'
const user = express()

user.get('/getuser', getAllUser)
user.post('/create', createUserValidate, createUser)
user.post('/createwiththeater',createUserWithTheaterValidate, createUserWithTheater)
user.post('/createwithscreen',createUserWithScreenValidate, createUserWithScreen)
user.post('/createwithseat',createUserWithSeatValidate, createUserWithSeat)
user.put('/update/:id', updateUserValidate, updateUser)
user.delete('/delete/:id', deleteUser)

export default user
