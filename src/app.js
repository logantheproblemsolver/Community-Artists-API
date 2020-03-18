require('dotenv').config()
const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const logger = require('./logger')
const showArtworkRouter = require('./ShowArtwork/showArtworkRouter')
const uploadArtworkRouter = require('./UploadArtwork/uploadArtworkRouter')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';


    app.use(morgan(morganOption))
    app.use(helmet())
    app.use( cors())


    app.get('/api', (req, res) => {
        res.json({ok: true})
    })

    app.use(function errorHandler(error, req, res, next) {
        console.error(error)

        let response 
        if (NODE_ENV === 'production') {
            response = {error: {message: 'server error'}}
        } else {
            console.error(error)
            logger.error(error.message)
            response = {message: error.message, error}
        }
        res.status(500).json(response)
    })

    app.use(showArtworkRouter)
    app.use(uploadArtworkRouter)


    module.exports = app