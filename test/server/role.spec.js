// // Dependencies
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const api = require('./../../server');
// const mongoose = require('mongoose');
//
// const Role = mongoose.model('Role');
// const expect = chai.expect;
//
// chai.use(chaiHttp);
//
// describe('ROLE', () => {
//   let token;
//   let roleID;
//   const admin = {
//     title: 'admin',
//   };
//   const user = {
//     username: 'Malik',
//     first: 'Malik',
//     last: 'Kinaro',
//     email: 'mk@gmail.com',
//     password: '1234',
//     role: 'admin',
//   };
//   Role.collection.drop();
//   before((done) => {
//     chai.request(api)
//     .post('/users')
//     .send(user)
//     .end((err, res) => {
//       token = res.body.token;
//       done();
//     });
//   });
//   describe('POST', () => {
//     it('Should create a new role', (done) => {
//       chai.request(api)
//       .post('/roles')
//       .send(admin)
//       .set({ Authorization: 'Bearer ' + token })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(200);
//         expect(res.body).to.be.a('object');
//         expect(res.body).to.have.all.keys('message', 'role');
//         expect(res.body.role).to.have.keys('title', '_id', '__v');
//         done();
//       });
//     });
//
//     it('New role should be unique', (done) => {
//       chai.request(api)
//       .post('/roles')
//       .send(admin)
//       .set({ Authorization: 'Bearer ' + token })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(409);
//         expect(res.body).to.be.a('object');
//         expect(res.body).to.have.key('message');
//         expect(res.body.message).to.be.equal('Title already exists');
//         done();
//       });
//     });
//   });
//   describe('GET', () => {
//     it('/roles/: Returns all roles', (done) => {
//       chai.request(api)
//         .get('/roles')
//         .set({ Authorization: 'Bearer ' + token })
//         .end((err, res) => {
//           roleID = res.body.roles[0]._id;
//           expect(res.status).to.equal(200);
//           expect(res.body.roles).to.be.a('Array');
//           expect(res.body.roles.length).to.equal(1);
//           expect(res.body.roles[0]).to.have.all.keys('title', '_id');
//           done();
//         });
//     });
//
//     it('/roles/<id>: Find role by id.', (done) => {
//       chai.request(api)
//         .get('/roles/' + roleID)
//         .set({ Authorization: 'Bearer ' + token })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body).to.be.a('object');
//           expect(res.body).to.have.all.keys('_id', 'title');
//           done();
//         });
//     });
//   });
//   describe('DELETE', () => {
//     it('/roles/<id>: Delete role.', (done) => {
//       chai.request(api)
//         .delete('/roles/' + roleID)
//         .set({ Authorization: 'Bearer ' + token })
//         .end((err, res) => {
//           expect(res.status).to.equal(202);
//           expect(res.body.message).to.equal('Successfully deleted');
//           done();
//         });
//     });
//   });
// });
