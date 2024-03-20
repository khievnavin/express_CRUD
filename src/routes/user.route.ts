import express from 'express'
import {index} from '../controllers/user.controller' 

export const userRoute =  express.Router();

userRoute.get('/', index);