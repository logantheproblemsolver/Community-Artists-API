require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const logger = require('./logger');
const showArtworkRouter = require('./ShowArtwork/showArtworkRouter');
const uploadArtworkRouter = require('./UploadArtwork/uploadArtworkRouter');

const app = express();
// the morgan, helmet, cors, and the error handler are all middleware
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';


app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use((error, req, res, next) => {
  console.log(error)

    let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    logger.error(error.message);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});


// here are the implementation for the routes

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.get('/api', (req, res) => {
  res.json({ ok: true });
});

app.use(showArtworkRouter);
app.use(uploadArtworkRouter);



module.exports = app;
