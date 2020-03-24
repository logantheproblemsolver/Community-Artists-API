const knex = require('knex');
const app = require('../src/app');


describe('upload artwork endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => db('bookmarks').truncate());

  afterEach('cleanup', () => db('bookmarks').truncate());

  describe('POST /api/uploadartwork', () => {
    it('responds with 201 when uploading an image', () => {
      const artwork = fs.readFile('./artwork.jpg');
      const newArtwork = {
        image: { artwork },
        title: 'Test Image',
        artist_name: 'Test artist',
        price: '$6',
        description: 'This is a test',
      }
      return supertest(app)
        .post('/api/uploadartwork')
        .send(newArtwork)
        .expect(201)
        .expect((res) => {
          expect(res.body.image).to.eql(newArtwork.image);
          expect(res.body.title).to.eql(newArtwork.title);
          expect(res.body.artist_name).to.eql(newArtwork.artist_name);
          expect(res.body.price).to.eql(newArtwork.price);
          expect(res.body.description).to.eql(newArtwork.description);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(`/api/uploadartwork/${res.body.id}`);
        })
        .then((res) => {
          supertest(app)
            .get(`/api/uploadartwork/${res.body.id}`)
            .expect(res.body);
        });
    });
  });
});
