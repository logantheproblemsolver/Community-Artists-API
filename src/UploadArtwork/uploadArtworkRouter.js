/* eslint-disable camelcase */
require('dotenv').config();
const express = require('express');
const xss = require('xss');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const artworkData = require('../artworkData');
const UploadArtwork = require('./uploadArtworkService');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const bodyParser = formData.parse();

const uploadArtworkRouter = express.Router();


uploadArtworkRouter
  .route('/api/uploadArtwork')
  .post(bodyParser, (req, res) => {
    const {
      title, artist_name, price, description,
    } = req.body;
    let serializeArtwork = (artwork) => ({
      id: artwork.id,
      image: xss(artwork.image),
      title: xss(artwork.title),
      artist_name: artwork.artist_name,
      price: artwork.price,
      description: xss(artwork.description),
    });
    const values = Object.values(req.files);

    Promise.all(values.map((image) => cloudinary.uploader.upload(image.path)))
      .then((images) => images[0].url)
      .then((image) => {
        serializeArtwork = {
          image, title, artist_name, price, description,
        };
        UploadArtwork.insertArtwork(
          req.app.get('db'),
          serializeArtwork,
          res.status(201)
        );
      })
      .catch((err) => {
        console.log(err)
      });
    artworkData.push(serializeArtwork);
  });

module.exports = uploadArtworkRouter;
