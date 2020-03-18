const uuid = require('uuid/v4')


const artwork = [
    {
        id: uuid(),
        image: 'https://res.cloudinary.com/nerdmagic/image/upload/v1584385951/pknj5pedpb8v4uwsjddx.jpg',
        title: 'Absract Art', 
        artist_name: 'Unknown',
        price: '$0',
        description: 'Just a random I got off of Google'
    },
]

module.exports = {artwork}