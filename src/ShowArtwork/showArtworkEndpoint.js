const express = require('express')

const showArtworkRouter = express.Router()

showArtworkRouter
    .route('/api/showartwork')
    .get((req, res) => {
        res
        .status(200)
        .json("you've gotten the artwork!")
    })



showArtworkRouter
    .route('/api/showartowk/:showartwork_Id')
    .get((req, res) => {
        const {showartwork_id} = req.params
        if(!showartwork_id) {
            logger.error(`Artwork with id ${showartwork_id} was not found, please try again`)
            res 
                .status(401)
                .json({
                    error: {message: `Artwork not found`}
                })
        }
        res
            .status(200)
            .json("you've gotten the specific artwork!")
    })














module.exports = showArtworkRouter