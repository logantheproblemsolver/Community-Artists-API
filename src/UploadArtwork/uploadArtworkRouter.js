const express = require('express')


const uploadArtworkRouter = express.Router()
const bodyParser = express.json()


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

        res
            .status(201)
            .location(`http://localhost:8000/${artwork.id}`)
            .json('artwork is uploaded!')

    })

module.exports = uploadArtworkRouter