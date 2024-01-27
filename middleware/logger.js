// Middleware function for logging incoming HTTP requests
const loggerMiddleware = (req, res, next) => {
    // Getting the current timestamp in ISO format
    const timestamp = new Date().toISOString();
  
    // Logging the request method and URL with the timestamp
    console.log(`${timestamp} - ${req.method} ${req.url}`);
  
    // Passing control to the next middleware or route handler
    next();
  };
  
  // Exporting the loggerMiddleware for use in other parts of the application
  export default loggerMiddleware;
  