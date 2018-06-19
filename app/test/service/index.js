const should = require('should');
const nock = require('nock');
const reckonService = require('../../service/reckon');

describe('reckon service test cases', () => {
  it('get division output', done => {
    const scope = nock('https://join.reckon.com')
      .get('/test1/rangeInfo')
      .reply(200, { lower: 1, upper: 5 })
      .get('/test1/divisorInfo')
      .reply(200, {
        outputDetails: [
          {
            divisor: 2,
            output: 'Test'
          },
          {
            divisor: 5,
            output: 'Hogg'
          }
        ]
      });

    reckonService
      .getDivisorOutput()
      .then(response => {
        response[3].should.be.equal('4: Test');
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

  it.skip('get division output: test retry', done => {
    nock('https://join.reckon.com')
      .get('/test1/rangeInfo')
      .reply(200, { lower: 1, upper: 5 })
      .get('/test1/divisorInfo')
      .reply(500);

    reckonService
      .getDivisorOutput()
      .then(response => {
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

  it('get search output', done => {
    nock('https://join.reckon.com')
      .get('/test2/textToSearch')
      .reply(200, {
        text: 'What a great day to do coding! mmm'
      })
      .get('/test2/subTexts')
      .reply(200, {
        subTexts: ['coding', 'a', 'g', 'o', 'm']
      });

    reckonService
      .getSearchOutput()
      .then(response => {
        const mock = {
          candidate: 'Alex You',
          text: 'What a great day to do coding! mmm',
          results: [
            { subtext: 'coding', result: '24' },
            { subtext: 'a', result: '3, 6, 11, 15' },
            { subtext: 'g', result: '8, 29' },
            { subtext: 'o', result: '19, 22, 25' },
            { subtext: 'm', result: '32, 33, 34' }
          ]
        };
        JSON.stringify(response).should.be.equal(JSON.stringify(mock));
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });
});
