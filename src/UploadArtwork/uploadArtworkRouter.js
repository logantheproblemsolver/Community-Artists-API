const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const artworkData = require('../artworkData')
const xss = require('xss')
const UploadArtwork = require('./uploadArtworkService')



const uploadArtworkRouter = express.Router()
const bodyParser = express.json()

const serializeArtwork = artwork => ({
    id: artwork.id,
    image: xss(artwork.image),
    title: xss(artwork.title),
    artist_name: artwork.artist_name,
    price: artwork.price,
    description: xss(artwork.description),
})


uploadArtworkRouter
    .route('/api/uploadArtwork')
    .post(bodyParser, (req, res) => {
        for (const field of ['image', 'title', 'description']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res  
                    .status(400)
                    .send(`'${field}' is required`)
            }
        }

        const {image, title, artist_name, price, description} = req.body

        const artwork = {id: uuid(), image, title, artist_name, price, description}
        const uploadedArtwork = {image, title, artist_name, price, description}

        UploadArtwork.insertArtwork(
            req.app.get('db'),
            uploadedArtwork
        )

        artworkData.artwork.push(artwork)

        logger.info(`Artwork with id ${artwork.id} is uploaded!`)
        res
            .status(201)
            .location(`http://localhost:8000/api/uploadArtwork${artwork.id}`)
            .json(serializeArtwork(artwork))

    })

module.exports = uploadArtworkRouter