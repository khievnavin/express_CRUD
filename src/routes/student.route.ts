import express from 'express'
import {index , ejs} from '../controllers/student.controller' 

export const studentRoute =  express.Router();

studentRoute.get('/', index);
studentRoute.get('/ejs', ejs);