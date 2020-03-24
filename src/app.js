require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const logger = require('./logger');
const showArtworkRouter = require('./ShowArtwork/showArtworkRouter');
const uploadArtworkRouter = require('./UploadArtwork/uploadArtworkRouter');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';


app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (res) => {
  res.send('Hello, world!');
});

app.get('/api', (req, res) => {
  res.json({ ok: true });
});

// function errorHandler(error, res) {
//   let response;
//   if (NODE_ENV === 'production') {
//     response = { error: { message: 'server error' } };
//   } else {
//     logger.error(error);
//     response = { message: error, error };
//   }
//   res.status(500).json(response);
// }

// app.use(errorHandler());

app.use(showArtworkRouter);
app.use(uploadArtworkRouter);


module.exports = app;
