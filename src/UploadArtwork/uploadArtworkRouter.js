require('dotenv').config()
const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const artworkData = require('../artworkData')
const xss = require('xss')
const UploadArtwork = require('./uploadArtworkService')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

const app=express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const bodyParser = formData.parse();

const uploadArtworkRouter = express.Router()

const serializeArtwork = artwork => ({
    id: artwork.id,
    image: xss(artwork.image),
    title: xss(artwork.title),
    artist_name: artwork.artist_name,
    price: artwork.price,
    description: xss(artwork.description),
})

// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//    destination: "./public/uploads/",
//    filename: function(req, file, cb){
//       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//    }
// });

// const upload = multer({
//    storage: storage,
//    limits:{fileSize: 1000000},
// }).single("myImage");

uploadArtworkRouter
    .route('/api/uploadArtwork')
    uploadArtworkRouter
    .route('/api/uploadArtwork')
    .post(bodyParser, (req, res) => {

        const {title, artist_name, price, description} = req.body
        
        let uploadedArtwork = {title, artist_name, price, description}

        const values = Object.values(req.files);

        Promise.all(values.map(image => cloudinary.uploader.upload(image.path)))
            .then(images => {
                console.log(images)
                return images[0].url
            })
            .then(image => {            
                uploadedArtwork = {image, title, artist_name, price, description}
                UploadArtwork.insertArtwork(
                    req.app.get('db'),
                    uploadedArtwork
                    )
            })
            .catch(err => {
                return res 
                    .status(401)
                    .json(err)
            });
    })
    


module.exports = uploadArtworkRouter