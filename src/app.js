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
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };
    
    app.use(allowCrossDomain)


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