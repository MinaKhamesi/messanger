const mongoose = require('mongoose') ;
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app.js");

chai.should();
chai.use(chaiHttp);


afterEach(async () => {
  const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});

describe("/GET /users/auth", () => {
    it("FAIL, 401 if there is no token", (done) => {
      chai
        .request(app)
        .get(`/users/auth`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("errors")
            res.body.errors[0].should.include({msg:'Not Authorized!'});
          done();
        });
    });

    it("OK, 200 if there is token", (done) => {
        chai
          .request(app)
          .post('/users/register')
          .send({'name':'test','email':'test@test.com',password:'123456'})
          .end((err,res)=>{
            const Cookies = res.headers['set-cookie'].pop().split(';')[0];
            chai
            .request(app)
            .get(`/users/auth`)
            .set('Cookie', Cookies)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('user');
                res.body.user.should.include({name: 'test',
                email: 'test@test.com',});
                done();
              });
          })   
      });
  });
  