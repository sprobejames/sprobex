const request = require('supertest');
const mongoose = require('mongoose');
const createServer = require('../../server');
const app = createServer();
// const { assert } = require('chai');

before(function (done) {
  const { MONGODB_PORT, MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD } = process.env;
  const dbUri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`;
  mongoose.connect(dbUri, { useNewUrlParser: true }).then(async () => {
    done();
  });
});

after(function (done) {
  mongoose.connection.close();
  done();
});

describe('GET /sample-route Get User Data', () => {
  it('should return [your-expected-response]', async () => {
    const response = await request(app).get('/sample-route').expect(200);
    // always test response content
    // const content = response.body
    // assert.equals('your-expectectation', content);
  });
});
