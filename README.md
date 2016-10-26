# [Document Management System (API)](http://docs.dms15.apiary.io/#reference)

The system manages documents, users and user roles. 

  - The documents defines access rights using uses roles can access it. Also, each document specifies the date it was published.
  - Users are categorized by roles. Each user must have a role defined for them.

### Tech

DMS uses a number of open source projects to work properly:

* [MongoDB](https://www.mongodb.com/) -  Document-oriented database program
* [Mongoose](http://mongoosejs.com/) -  MongoDB object modeling designed to work in an asynchronous environment.
* [Express](https://expressjs.com/) - Node.js web application framework.
* [Mocha](https://mochajs.org/) - JavaScript test framework running on [Node.js](https://nodejs.org/en/)
* [Chai](http://chaijs.com/) - BDD / TDD assertion library for [node](https://nodejs.org/en/)
* [Jsonwebtoken](https://jwt.io/) - JSON Web Tokens is compact token format intended for space constrained environments such as HTTP Authorization headers and URI query parameters.
* [Eslint](http://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code

### Available Endpoints

| Endpoint | Description |
| ---- | --------------- |
| [POST /users/login](#) |  Logs a user in. |
| [POST /users/logout](#) | Logs a user out.|
| [POST /users/](#) | Creates a new user. |
| [GET /users/](#) | Gets all users. |
| [GET /users/:id:](#) | Find user. |
| [PUT /users/:id:](#) | Update user attributes. |
| [DELETE /users/:id:](#) | Delete user.. |
| [POST /documents/](#) | Creates a new document instance. |
| [GET /documents/](#) | Gets all documents. |
| [GET /documents/:id:](#) | Find document. |
| [PUT /documents/:id:](#) | Update document attributes. |
| [DELETE /documents/:id:](#) | Delete document. |
| [GET /users/:id:/documents](#) | Find all documents belonging to the user. |
| [GET /documents?limit=10](#) | Get 10 documents list belonging to user ordered by published date.|
| [GET /documents?q=This](#) | Search for documents with 'This' in name. |
| [GET /roles/](#) | Returns all roles. |

### For full API Documentation click [here](http://docs.dms15.apiary.io/#reference)
License
----

MIT

**Free Api, Enjoy!**
