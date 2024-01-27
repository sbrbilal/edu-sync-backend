// Importing the Express framework and controller functions
import express from 'express';
import { getLessons, updateLessons } from '../controllers/lessons.js';
import { createOrder } from '../controllers/orders.js';

// Creating an instance of Express Router
const router = express.Router();

// Defining routes for lessons and orders using the controller functions
router.get('/lessons', getLessons);
router.put('/lessons', updateLessons);
router.post('/orders', createOrder);

// Exporting the router for use in other parts of the application
export default router;
