/* eslint-disable no-undef */
const knex = require('knex');
const app = require('../src/app');
const makeArtworkArray = require('./artwork-fixtures');

describe('Show All Artwork Endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  after('disconnect from db', () => db.destroy());


  describe('GET api/showartwork', () => {
    context('Given no artwork', () => {
      it('responds with 200 and an empty list', () => supertest(app)
        .get('/api/showartwork')
        .expect(200, []));
    });

    context('Given there is artwork in the database', () => {
      const testArtwork = makeArtworkArray();

      beforeEach('insert artwork', () => db
        .into('artwork')
        .insert());

      it('responds with 200 and the artwork', () => supertest(app)
        .get('/api/showartwork')
        .expect(200, testArtwork));
    });
  });
});
