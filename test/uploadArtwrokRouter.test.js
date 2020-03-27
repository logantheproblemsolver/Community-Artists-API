const knex = require('knex');
const app = require('../src/app');
const fs = require('fs');

// this is to test uploading the artwork
describe('upload artwork endpoint', () => {
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

  describe('POST /api/uploadartwork', () => {
    it('responds with 201 when uploading an image', () => {
      return supertest(app)
        .post('/api/uploadartwork')
        .field('title', 'Test Image')
        .field('artist_name', 'Test artist')
        .field('price', '$6.00')
        .field('description', 'This is a test')
        .attach('image', __dirname + '/artwork.jpg')
        .expect(201)
    });
  });
});
