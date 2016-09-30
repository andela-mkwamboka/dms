// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');
<<<<<<< HEAD
const mongoose = require('mongoose');

const User = mongoose.model('Users');
=======

>>>>>>> c1e4326... Refactor code according to role access
const expect = chai.expect;

chai.use(chaiHttp);

describe('USER', () => {
  let token;
<<<<<<< HEAD
  let userID;

  User.collection.drop();
=======
>>>>>>> c1e4326... Refactor code according to role access
  const user = {
    username: 'Mona',
    first: 'Monicah',
    last: 'Kwamboka',
    email: 'mona@gmail.com',
    password: '1234',
<<<<<<< HEAD
=======
    role: 'admin',
>>>>>>> c1e4326... Refactor code according to role access
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
<<<<<<< HEAD
=======

>>>>>>> c1e4326... Refactor code according to role access
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
<<<<<<< HEAD
=======

>>>>>>> c1e4326... Refactor code according to role access
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
    it('Should create user with all fields', (done) => {
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
<<<<<<< HEAD
        userID = res.body.users[0]._id;
=======
>>>>>>> c1e4326... Refactor code according to role access
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });

    it('/users/<id>: Find user.', (done) => {
      chai.request(api)
<<<<<<< HEAD
      .get('/users/' + userID)
=======
      .get('/users/54d11f35b0a303c1112345db')
>>>>>>> c1e4326... Refactor code according to role access
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
<<<<<<< HEAD
        expect(res.body._id).to.equal(userID);
=======
        expect(res.body._id).to.equal('54d11f35b0a303c1112345db');
>>>>>>> c1e4326... Refactor code according to role access
        done();
      });
    });

    it('/users/<id>: Returns error if no user is found.', (done) => {
      chai.request(api)
<<<<<<< HEAD
      .get('/users/' + userID)
=======
      .get('/users/54d11f35b0a303c1112345db')
>>>>>>> c1e4326... Refactor code according to role access
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
<<<<<<< HEAD
        expect(res.body._id).to.equal(userID);
=======
        expect(res.body._id).to.equal('54d11f35b0a303c1112345db');
        done();
      });
    });

    it('/users/<id>/documents: Get documents belonging to a user', (done) => {
      chai.request(api)
      .get('/users/57d11f44b0a303c1186279bf/documents')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0].ownerId).to.equal('57d11f44b0a303c1186279bf');
        expect(res.body.length).to.equal(2);
        done();
      });
    });

    it('/users/<id>/documents: Return null if a user has no documents', (done) => {
      chai.request(api)
      .get('/users/54d11f35c0a303c6712367fc/documents')
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User has no documents');
>>>>>>> c1e4326... Refactor code according to role access
        done();
      });
    });
  });
  describe('UPDATE', () => {
    it('/users/<id>: Update user attributes.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .put('/users/67e806916b61fd612204fe2b')
=======
        .put('/users/54d11f35b0a303c1112345db')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .send({
          name: {
            first: 'first name',
            last: 'last name',
          },
        })
        .end((err, res) => {
<<<<<<< HEAD
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
=======
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal('54d11f35b0a303c1112345db');
>>>>>>> c1e4326... Refactor code according to role access
          done();
        });
    });

    it('/users/<id>: Returns error if user not found.', (done) => {
      chai.request(api)
        .put('/users/67e806916b61fd612204fe2b')
        .set({ Authorization: 'Bearer ' + token })
        .send({
          name: {
            first: 'first name',
            last: 'last name',
          },
        })
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('/users/<id>: Delete user.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .delete('/users/' + userID)
=======
        .delete('/users/54d11f35c0a303c6712367fc')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.message).to.equal('Successfully deleted');
          done();
        });
    });
  });
<<<<<<< HEAD
  // describe('ERROR HANDLING', () => {
  //   User.collection.drop();
  //   it.skip('Return error if no users are found', (done) => {
  //     chai.request(api)
  //     .get('/users')
  //     .set({ Authorization: 'Bearer ' + token })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       expect(res.body.message).to.be.equal('No users found');
  //       done();
  //     });
  //   });
  // });
=======
>>>>>>> c1e4326... Refactor code according to role access
});
