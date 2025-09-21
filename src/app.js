const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Secure CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins (for production, restrict this!)
  methods: ['GET','POST','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight requests

// Parse incoming JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use API routes under /api
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
