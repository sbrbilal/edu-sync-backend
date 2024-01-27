// Importing the connectDB function for establishing a MongoDB connection
// and importing ObjectId from MongoDB for working with document IDs
import connectDB from '../config/db.js';
import { ObjectId } from 'mongodb';

// Async function to retrieve lessons based on query parameters
const getLessons = async (req, res) => {
  try {
    // Extracting query parameters from the request
    const queryParams = req.query;

    // Establishing a connection to the MongoDB database
    const db = await connectDB();

    // Initializing options and sortOptions objects for MongoDB query
    let options = {};
    let sortOptions = {};

    // Checking if a search query is provided
    if (queryParams.query) {
      options.$or = [
        { "subject": { $regex: queryParams.query, $options: 'i' } },
        { "location": { $regex: queryParams.query, $options: 'i' } }
      ];
    }

    // Checking if sorting options are provided
    if (queryParams.sortBy) {
      sortOptions[queryParams.sortBy] = queryParams.sortOrder == 'asc' ? 1 : -1;
    }

    // Querying the 'lessons' collection, applying options and sorting, and converting to an array
    const lessons = await db.collection('lessons').find(options).sort(sortOptions).toArray();

    // Sending the retrieved lessons as a JSON response
    res.json(lessons);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Async function to update lesson spaces based on provided parameters
const updateLessons = async (req, res) => {
  try {
    // Extracting parameters from the request body
    const params = req.body;

    // Establishing a connection to the MongoDB database
    const db = await connectDB();

    // Retrieving lessons based on provided IDs
    const lessons = await db.collection('lessons').find({ "_id": { $in: params.lessons.map((lesson) => { return new ObjectId(lesson._id) }) } }).toArray();

    // Generating MongoDB bulk write operations based on provided parameters
    const operations = params.lessons.map((lesson) => {
      let spaces = lessons.find((l) => l._id == lesson._id).spaces;

      // Adjusting spaces based on the 'add' property in the lesson parameter
      if (lesson.add) {
        spaces += lesson.spaces;
      } else {
        spaces = Math.max(0, spaces - lesson.spaces);
      }

      // Creating an update operation for each lesson
      return {
        updateOne: {
          filter: { "_id": new ObjectId(lesson._id) },
          update: { $set: { "spaces": spaces } }
        }
      };
    });

    // Performing bulk write operations on the 'lessons' collection
    const response = await db.collection('lessons').bulkWrite(operations);

    // Sending the response as JSON
    res.json(response);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Exporting the getLessons and updateLessons functions for use in other parts of the application
export { getLessons, updateLessons };
