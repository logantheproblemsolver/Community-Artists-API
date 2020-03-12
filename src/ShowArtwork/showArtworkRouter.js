const express = require('express')
const ShowArtwork = require('./showArtworkService')
const xss = require('xss')

const showArtworkRouter = express.Router()

const serializeartwork = artwork => ({
    id: artwork.id,
    image: xss(artwork.image),
    title: xss(artwork.title),
    artist_name: artwork.artist_name,
    price: artwork.price,
    description: xss(artwork.description),
})



showArtworkRouter
    .route('/api/showartwork')
    .get((req, res, next) => {
        ShowArtwork.getAllArtwork(req.app.get('db'))
            .then(artwork => {
                res 
                    .json(artwork.map(serializeartwork))
            })
            .catch(next)
    })



showArtworkRouter
    .route('/api/showartwork/:showartwork_Id')
    .get((req, res, next) => {
        const {showartwork_id} = req.params
        ShowArtwork.getById(req.app.get('db'), showartwork_id)
            .then(artwork => {
                if(!artwork) {
                    logger.error(`Artwork with id {artwork_id} not found`)
                    return res
                        .status(400)
                        .json({
                            error: {message: `Artwork not found`}
                        })
                }
            })
            .catch(next)
        res
            .status(200)
            .json(serializeartwork(res.artwork))
    })




module.exports = showArtworkRouter