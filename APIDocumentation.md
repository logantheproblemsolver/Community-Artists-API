<h1>API Documentation<h1>

To show the artwork the API url is https://morning-garden-77807.herokuapp.com/api/showartwork
  The data comes as an array with objects in it. 
    In the object it's formatted like so- 
    {
      title: artwork.title, (this is just text)
      artist_name: artwork.artist_name, (this is just text)
      price: artwork.price, (this is a money value)
      description: artwork.description, (this is just text)
    }

  Simply mapping over the data that comes back and calling it in their respective elements will do the trick!

  At this moment there is no current implementation to look at artwork individually by ID numbers, but that will be in a later release.

To upload artwork to the database the API url is https://morning-garden-77807.herokuapp.com/api/uploadartwork
  The data that's accepted is formdata (<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData" target="_blank">Formadata Docs</a>)
  The best way to send it in React is axios
  The image, title, and description are required values for the database.


For a great example of how to use the API look at the front-end project for Community-Artist on GitHub (https://github.com/logantheproblemsolver/Community-Artists)
  So you don't have to go searching for it. 
    The show artwork API is used in this file- https://github.com/logantheproblemsolver/Community-Artists/blob/master/src/ShowArtwork/showArtwork.js
    The upload artwork API is used in this file- https://github.com/logantheproblemsolver/Community-Artists/blob/master/src/UploadArtwork/uploadArtwork.js
