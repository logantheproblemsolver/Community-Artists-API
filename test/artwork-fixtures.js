/* eslint-disable no-undef */

// this is the test array
function makeArtworkArray() {
  return [
    {
      id: 3,
      image: 'https://res.cloudinary.com/nerdmagic/image/upload/v1584372892/samples/animals/cat.jpg',
      title: 'Gray Kitty',
      artist_name: 'Uknown',
      price: '$3.00',
      description: 'Cute gray kitty from Cloudinary',

    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/nerdmagic/image/upload/v1584385951/pknj5pedpb8v4uwsjddx.jpg',
      title: 'Abstract Art',
      artist_name: 'Unkown',
      price: '$2.00',
      description: 'Random image I got off of Google',
    },
    {
      id: 1,
      image: 'https://res.cloudinary.com/nerdmagic/image/upload/v1584372896/samples/bike.jpg',
      title: 'Bike Pic',
      artist_name: 'Unknown',
      price: '$1.00',
      description: 'The picture is a random pic from Cloudinary',
    },

  ];
}

module.exports = makeArtworkArray;
