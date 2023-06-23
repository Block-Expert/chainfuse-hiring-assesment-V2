const cors = require('cors');
const express = require('express');
const router = require('./router');
const errors = require('./helpers/error');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// connect database
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(8000, () => {
  console.log('Server started at port 8000');
});

app.use(errors);
