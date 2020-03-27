/* eslint-disable no-undef */
const knex = require('knex');
const app = require('../src/app');
const makeArtworkArray = require('./artwork-fixtures');

// this is to test showing the artwork

describe('Show All Artwork Endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  beforeEach('cleanup', () => db('artwork').truncate());

  afterEach('cleanup', () => db('artwork').truncate());

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
        .insert(testArtwork));

      it('responds with 200 and the artwork', () => supertest(app)
        .get('/api/showartwork')
        .expect(200, testArtwork));
    });
  });
});
