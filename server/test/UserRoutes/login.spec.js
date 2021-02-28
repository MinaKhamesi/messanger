
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app.js");
const User = require('../../models/User');

chai.should();
chai.use(chaiHttp);

const mongoose = require('mongoose') ;

afterEach(async () => {
  const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});


describe("POST /users/login", () => {
    it("FAIL, 400 if email is not provided", (done) => {
      chai
        .request(app)
        .post(`/users/login`)
        .send({ "password":"12" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          done();
        });
    });
  
    it("FAIL, 400 if email provided is not an email", (done) => {
      chai
        .request(app)
        .post(`/users/login`)
        .send({ "email":"min@g","password":"123456" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          
        });
        chai
        .request(app)
        .post(`/users/login`)
        .send({ "email":"min.com","password":"123456" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("errors")
          res.body.errors.should.be.a('Array');
          res.body.errors[0].should.include({'msg':'please include a valid email'});
          done();
        });
    });

    it("FAIL, 400 if password is not provided", (done) => {
        chai
          .request(app)
          .post(`/users/login`)
          .send({ 'email':'thomas@example.com' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("errors")
            res.body.errors.should.be.a('Array');
            res.body.errors[0].should.include({'msg':'please fill the password field'});
            done();
          });
      });
      it("FAIL, 404 if user doesn't exist", (done) => {
        chai
          .request(app)
          .post(`/users/login`)
          .send({ 'email':'doesnotexist@example.com',"password":"123457" })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have
              .property("errors")
            res.body.errors.should.be.a('Array');
            res.body.errors[0].should.include({'msg':'Invalid email or password'});
            done();
          });
        });
  
    it("FAIL, 401 if password is incorrect", (done) => {
      chai
        .request(app)
        .post(`/users/register`)
        .send({ 'name':'test',email:'test@test.com',"password":"123456" })
        .end((err, res)=>{
            chai
            .request(app)
            .post(`/users/login`)
            .send({ email:'test@test.com',"password":"123457" })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have
                .property("errors")
                res.body.errors.should.be.a('Array');
                res.body.errors[0].should.include({'msg':'Invalid email or password'});
                done();
            });
        })
        
    });
    it("OK, 200 when everything is okay",(done) => {
        chai
        .request(app)
        .post(`/users/register`)
        .send({ 'name':'test',email:'test@test.com',"password":"123456" })
        .end((err, res)=>{
            chai
          .request(app)
          .post(`/users/login`)
          .send({ 'email':"test@test.com","password":"123456" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("msg").eq('login successful')
            done();
          });
        })
        
      });

  });
  