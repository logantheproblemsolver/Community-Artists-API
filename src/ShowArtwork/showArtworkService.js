const ShowArtwork = {
    getAllArtwork(knex) {
        return knex
            .select('*')
            .from('artwork')
            .orderBy('id', 'desc')
    },
    getById(knex, id) {
        return knex 
            .from('artwork')
            .select('*')
            .where('id', id)
            .first()
    },
}

module.exports = ShowArtwork