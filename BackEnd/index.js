const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// const corsOptions = {
//   origin: 'http://localhost:3000', // Adjust as needed
//   optionsSuccessStatus: 200 // For legacy browser support
// };


// Use cors and bodyParser middleware before your routes
app.use(cors());
app.use(bodyParser.json())

// Import the templates route
const templatesRoute = require('./routes/templates');
app.use('/api/templates', templatesRoute);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Could not connect to MongoDB Atlas:', err);
});

// Use the templates route with its base path
// app.use('/templates', templatesRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
