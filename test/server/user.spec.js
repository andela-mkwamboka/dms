// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');
const mongoose = require('mongoose');

const User = mongoose.model('Users');
const expect = chai.expect;

chai.use(chaiHttp);

describe('USER', () => {
  let token;
  User.collection.drop();
  const user = {
    username: 'Mona',
    first: 'Monicah',
    last: 'Kwamboka',
    email: 'mona@gmail.com',
    password: '1234',
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

    it('/users/login: Logs a user in through authentication and returns token.', (done) => {
      chai.request(api)
      .post('/users/login')
      .send({
        username: 'Mona',
        password: '1234',
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.body.token).to.be.exist;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'token');
        done();
      });
    });
    it('/users/login: Return error is user isn\'t registered.', (done) => {
      chai.request(api)
      .post('/users/login')
      .send({
        username: 'Hellen',
        password: '1234',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.equal('User not found.');
        done();
      });
    });
    it('/users/login: Return error if user passes wrong password.', (done) => {
      chai.request(api)
      .post('/users/login')
      .send({
        username: 'Mona',
        password: '4321',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message');
        done();
      });
    });
  });
  describe('GET', () => {
    it('Should create user with all fileds', (done) => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.users[0]).to.have.all.keys('_id', 'email', 'role', 'username', 'name');
        expect(res.body.users[0].name).to.have.all.keys('first', 'last');
        done();
      });
    });

    it('/users/: Should get all users.', (done) => {
      chai.request(api)
      .get('/users')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });
});