// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('DOCUMENT', () => {
  let token;
  const doc = {
    title: 'This is a dummy title',
    content: 'Content goes here',
  };
  const doc2 = {
    title: 'Dummy title',
    content: 'Content goes here',
  };
  before((done) => {
    chai.request(api)
    .post('/users/login')
    .send({
      username: 'john',
      password: '1234',
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });
  describe('POST', () => {
    it('Should create a new document', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'document');
        expect(res.body.document).to.have.keys('createdAt', 'ownerId', 'content', 'title', '_id', 'updatedAt', '__v');
        expect(res.body.message).to.be.equal('Document created');
        done();
      });
    });

    it('Should create a new document with all fileds', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc2)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'document');
        expect(res.body.document).to.have.keys('createdAt', 'ownerId', 'content', 'title', '_id', 'updatedAt', '__v');
        expect(res.body.message).to.be.equal('Document created');
        done();
      });
    });

    it('Should create a new document the title should be unique', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc)
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
    it('/documents/: Returns all documents according to dates created.', (done) => {
      chai.request(api)
        .get('/documents')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents).to.be.a('Array');
          expect(res.body.documents.length).to.equal(4);
          expect(res.body.documents[0]).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          expect(res.body.documents[0].createdAt > res.body.documents[1].createdAt).to.be.true;
          done();
        });
    });

    it('/documents/<id>: Find document.', (done) => {
      chai.request(api)
        .get('/documents/57d11f44b0a303c1186279bf')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          done();
        });
    });
  });
  describe('UPDATE', () => {
    it('/documents/<id>: Update document attributes.', (done) => {
      chai.request(api)
        .put('/documents/57d11f44b0a303c1186279bf')
        .set({ Authorization: 'Bearer ' + token })
        .send({
          title: 'new title',
          content: 'new content',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.document._id).to.be.equal('57d11f44b0a303c1186279bf');
          expect(res.body.document.title).to.be.equal('new title');
          expect(res.body.document.content).to.be.equal('new content');
          done();
        });
    });

    it('/documnents/<id>: Returns error if document is not found.', (done) => {
      chai.request(api)
        .put('/documnents/67e806916b61fd612204fe2b')
        .set({ Authorization: 'Bearer ' + token })
        .send({
          title: 'title',
          content: 'content',
        })
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('SEARCH', () => {
    it('Returns search results according to text searched', (done) => {
      chai.request(api)
        .get('/search/new title')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.results).to.be.a('array');
          expect(res.body.results[0]).to.have.all.keys('_id', 'updatedAt', 'createdAt', 'ownerId', 'content', 'title');
          done();
        });
    });

    it('Returns search results according to date searched', (done) => {
      chai.request(api)
        .get('/search?date=12/23/15')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.results).to.be.a('array');
          expect(res.body.results.length).to.be.equal(4);
          done();
        });
    });

    it('Returns error if query is not found', (done) => {
      chai.request(api)
        .get('/search/monicah')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.be.equal('No such title in documents');
          done();
        });
    });
  });
  describe('PAGINATION', () => {
    it('/documents/ Returns document with limit.', (done) => {
      chai.request(api)
        .get('/documents/?limit=2&page=1')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(2);
          done();
        });
    });
    it('/documents/ Returns document with pagination.', (done) => {
      chai.request(api)
        .get('/documents/?limit=1&page=2')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(1);
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('/documents/<id>: Delete document.', (done) => {
      chai.request(api)
        .delete('/documents/57d11f44b0a303c1186279bf')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.message).to.equal('Successfully deleted');
          done();
        });
    });
  });
});

describe('ROLE ACCESS CONTROL', () => {
  let token;
  before((done) => {
    chai.request(api)
    .post('/users/login')
    .send({
      username: 'mary',
      password: '12345',
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });
  it('/users/<id>: User should not be able to update another user\'s  documents', (done) => {
    chai.request(api)
    .put('/documents/57d12f44b0a303c1186279bf')
    .set({ Authorization: 'Bearer ' + token })
    .send({
      title: 'new title',
      content: 'new content',
    })
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.be.equal('Not accessible');
      done();
    });
  });

  it('/users/<id>: User should not be able to delete another user\'s documents.', (done) => {
    chai.request(api)
    .delete('/documents/57d12f44b0a303c1186279bf')
    .set({ Authorization: 'Bearer ' + token })
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.be.equal('Not accessible');
      done();
    });
  });
});
