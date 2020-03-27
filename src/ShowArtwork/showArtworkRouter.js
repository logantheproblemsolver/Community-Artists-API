const express = require('express');
const xss = require('xss');
const ShowArtwork = require('./showArtworkService');

const showArtworkRouter = express.Router();

const serializeartwork = (artwork) => ({
  id: artwork.id,
  image: xss(artwork.image),
  title: xss(artwork.title),
  artist_name: artwork.artist_name,
  price: artwork.price,
  description: xss(artwork.description),
});

// this is the set up for showing the artwork in the database; future iterations will be able to view by ID
showArtworkRouter
  .route('/api/showartwork')
  .get((req, res, next) => {
    ShowArtwork.getAllArtwork(req.app.get('db'))
      .then((artwork) => {
        res
          .json(artwork.map(serializeartwork));
        console.log(artwork)
      })
      .catch(next);
  });


module.exports = showArtworkRouter;
