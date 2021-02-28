
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app.js");
const User = require('../../models/User');

chai.should();
chai.use(chaiHttp);

const mongoose = require('mongoose') ;
const { MongoMemoryServer } = require('mongodb-memory-server') ;

let mongoServer;
before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});



describe("POST /users/regisret", () => {
  // beforeEach(function(done) {
  //   mockgoose.helper.reset();
  //   done();
  // });
    it("FAIL, should return 400 if name is not provided", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "email":"min@g.com",'password':'123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'name is required'});
          done();
        });
    });
  
    it("FAIL,should return 400 if email is not provided", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"min",'password':'123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          done();
        });
    });
  
    it("FAIL, should return 400 if email provided is not a valid email", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"min","email":"min@com",'password':'123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          // done();
        });
        chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"min","email":"min.com",'password':'123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          // done();
        });
        chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"min","email":"min.ex.com",'password':'123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          done();
        });
    });
  
    
  
    it("FAIL, should return 400 if password is not provided", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"thomas",'email':'thomas@example.com' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please enter a password with 6 or more characters'});
          done();
        });
    });
  
    it("FAIL, should return 400 if password is less than 6 characters", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"min.com",'email':'thomas@example.com',"password":"12345" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please enter a password with 6 or more characters'});
          done();
        });
    });
  

    it("OK, should return 201 if everything is fine", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"test",'email':"test@test.com","password":'123456' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("msg").eq('register successful')
          done();
        });
    });

    it("FAIL, should return 400 if user already exist.", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ "name":"test",'email':'test@test.com',"password":"123456" })
        .end((err,res)=>{
            chai
          .request(app)
          .post(`/users/register`)
          .send({ "name":"test",'email':'test@test.com',"password":"123456" })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("errors")
            res.body.errors.should.be.a('Array');
            res.body.errors[0].should.include({'msg':'user already exist'});
            done();
          });
        })
        
    });
  
  });
  