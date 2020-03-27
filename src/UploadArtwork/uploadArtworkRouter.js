/* eslint-disable camelcase */
require('dotenv').config();
const express = require('express');
const xss = require('xss');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const UploadArtwork = require('./uploadArtworkService');

// Cloudinary is used so I can quickly upload images and get back a URL, it's a lot more scaleable than reading 64byte as well
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const bodyParser = formData.parse();

const uploadArtworkRouter = express.Router();

// This is the router to upload the artwork to the database. It's taking in the cloudinary data and formdata
uploadArtworkRouter
  .route('/api/uploadArtwork')
  .post(bodyParser, (req, res, next) => {
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
          res.json({status: true})
        );
      })
      .catch((err) => {
        console.log(err)
      });
    res
      .status(201)
  });

module.exports = uploadArtworkRouter;
