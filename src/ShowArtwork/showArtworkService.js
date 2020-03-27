// this is connecting to the database, future code will connect to find the ID
const ShowArtwork = {
  getAllArtwork(knex) {
    return knex
      .select('*')
      .from('artwork')
      .orderBy('id', 'desc');
  },
  
};

module.exports = ShowArtwork;
