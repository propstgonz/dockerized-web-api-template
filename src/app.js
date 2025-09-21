const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS seguro
const corsOptions = {
  origin: '*',
  methods: ['GET','POST','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // soporta preflight

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
