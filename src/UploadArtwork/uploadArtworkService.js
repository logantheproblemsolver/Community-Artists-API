// This is the connection for uploading information to the database
const UploadArtwork = {
  insertArtwork(knex, newArtwork) {
    return knex
      .insert(newArtwork)
      .into('artwork')
      .returning('*')
      .then((rows) => rows[0]);
  },
};

module.exports = UploadArtwork;
