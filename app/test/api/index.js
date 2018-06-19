'use strict';

const should = require('should');
const request = require('supertest');

const config = {
  host: 'http://localhost:9999'
};

describe('reckon test cases', () => {
  it('run Test1', done => {
    request(config.host)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
