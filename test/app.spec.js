/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */

const app = require('../src/app');
// this is to test the hello, world endpoint! I keep this in here as a way to ensure the server itself works

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });
});
