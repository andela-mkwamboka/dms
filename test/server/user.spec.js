// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);

describe('USER', () => {
  User.collection.drop();
  const user = {
    username: 'Mona',
    first: 'Monicah',
    last: 'Kwamboka',
    email: 'mona@gmail.com',
    password: '1234',
    role: 'admin',
  };
  describe('POST', () => {
    it('Should create new user', (done) => {
      chai.request(api)
      .post('/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'token');
        done();
      });
    });

    it('Should send an error if user isn\'t unique ', (done) => {
      chai.request(api)
      .post('/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message');
        expect(res.body.message).to.equal('A user with that username already exists.');
        done();
      });
    });
  });
});
