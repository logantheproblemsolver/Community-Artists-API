const UploadArtwork = {
    insertArtwork(knex, newArtwork) {
        return knex 
            .insert(newArtwork)
            .into('artwork')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = UploadArtwork