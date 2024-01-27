// Importing ObjectId from MongoDB and connectDB function for database connection
import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

// Async function to create an order in the 'orders' collection
const createOrder = async (req, res) => {
  try {
    // Extracting parameters from the request body
    const params = req.body;

    // Establishing a connection to the MongoDB database
    const db = await connectDB();

    // Creating an order document to be inserted into the 'orders' collection
    const response = await db.collection('orders').insertOne({
      ...params,
      lessons: params.lessons.map((lesson) => {
        // Mapping lesson IDs to ObjectId before including them in the order
        return {
          ...lesson,
          "_id": new ObjectId(lesson._id)
        };
      })
    });

    // Sending the response as JSON
    res.json(response);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Exporting the createOrder function for use in other parts of the application
export { createOrder };
