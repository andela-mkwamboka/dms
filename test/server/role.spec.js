// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');
<<<<<<< HEAD
const mongoose = require('mongoose');

const Role = mongoose.model('Role');
=======

>>>>>>> c1e4326... Refactor code according to role access
const expect = chai.expect;

chai.use(chaiHttp);

describe('ROLE', () => {
<<<<<<< HEAD
  let token;
  let roleID;
  const admin = {
    title: 'admin',
  };
  const user = {
    username: 'Malik',
    first: 'Malik',
    last: 'Kinaro',
    email: 'mk@gmail.com',
    password: '1234',
  };
  Role.collection.drop();
  before((done) => {
    chai.request(api)
    .post('/users')
    .send(user)
=======
  const admin = {
    title: 'user',
  };
  let token;
  before((done) => {
    chai.request(api)
    .post('/users/login')
    .send({
      username: 'john',
      password: '1234',
    })
>>>>>>> c1e4326... Refactor code according to role access
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });
  describe('POST', () => {
    it('Should create a new role', (done) => {
      chai.request(api)
      .post('/roles')
      .send(admin)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'role');
        expect(res.body.role).to.have.keys('title', '_id', '__v');
        done();
      });
    });

    it('New role should be unique', (done) => {
      chai.request(api)
      .post('/roles')
      .send(admin)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.key('message');
        expect(res.body.message).to.be.equal('Title already exists');
        done();
      });
    });
  });
  describe('GET', () => {
    it('/roles/: Returns all roles', (done) => {
      chai.request(api)
        .get('/roles')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
<<<<<<< HEAD
          roleID = res.body.roles[0]._id;
          expect(res.status).to.equal(200);
          expect(res.body.roles).to.be.a('Array');
          expect(res.body.roles.length).to.equal(1);
=======
          expect(res.status).to.equal(200);
          expect(res.body.roles).to.be.a('Array');
          expect(res.body.roles.length).to.equal(2);
>>>>>>> c1e4326... Refactor code according to role access
          expect(res.body.roles[0]).to.have.all.keys('title', '_id');
          done();
        });
    });

    it('/roles/<id>: Find role by id.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .get('/roles/' + roleID)
=======
        .get('/roles/57d11f35b0a303c1186270ad')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.all.keys('_id', 'title');
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('/roles/<id>: Delete role.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .delete('/roles/' + roleID)
=======
        .delete('/roles/57d11f35b0a303c1186270ad')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.message).to.equal('Successfully deleted');
          done();
        });
    });
  });
});
