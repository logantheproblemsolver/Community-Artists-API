const express = require('express')
const uuid = require('uuid/v4')
const artworkData = require('../artworkData')



const uploadArtworkRouter = express.Router()
const bodyParser = express.json()

const serializeartwork = artwork => ({
    id: artwork.id,
    image: xss(artwork.image),
    title: xss(artwork.title),
    artist_name: artwork.artist_name,
    price: artwork.price,
    description: xss(artwork.description),
})


uploadArtworkRouter
    .route('/uploadArtwork')
    .post(bodyParser, (req, res) => {
        for (const field of ['image', 'title', 'description']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res  
                    .status(400)
                    .send(`'${field}' is required`)
            }
        }

        const {image, title, description} = req.body

        const artwork = {id: uuid(), image, title, artist_name, price, description}

        artworkData.artwork.push(artwork)

        logger.info(`Artwork with id ${artwork.id} is uploaded!`)
        res
            .status(201)
            .location(`http://localhost:8000/${artwork.id}`)
            .json(serializeartwork(artwork))

    })

module.exports = uploadArtworkRouter