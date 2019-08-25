process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const parentTaskTest = require("../app/models/parenttask.model");


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('parentTaskTest', () => {
    beforeEach((done) => { //Before each test we empty the database
        //parentTaskTest.remove({}, (err) => { 
           done();           
       // });        
    });

    /*Post data */
    describe('/POST parent task', () => {
        /*  it('it should not POST a parent task without parent task', (done) => {
               let parenttastInput = {
                  //parenttaskId: 10,
                  parenttask: "Unit test task"
              };
                chai.request(server)
                .post('/parenttasks')
                .send(parenttastInput)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('errors');
                      res.body.errors.should.have.property('pages');
                      res.body.errors.pages.should.have.property('kind').eql('required');
                  done();
                });
          });*/
          it('it should POST a parent task ', (done) => {
                let parenttaskInput = {
                    _id: 1000,
                    parenttask: "Unit test task"
                };
                chai.request(server)
                .post('/parenttasks')
                .send(parenttaskInput)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('status').eql('Successes');
                      res.body.should.have.property('message').eql('New ParentTask created!');
                      res.body.data.should.have.property('_id');
                      res.body.data.should.have.property('parenttask');
                  done();
                });
          });
      });
      
    /*Test the /GET all route*/  
    describe('/GET all parent tasks', () => {
        it('it should GET all the parent Tasks', (done) => {
            chai.request(server)
            .get('/parenttasks')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });

    /*Test the /GET a parent task route*/  
    describe('/GET a parent task', () => {
        it('it should GET a parent Task', (done) => {        
        let uri = '/parenttasks/1000';
        chai.request(server)
            .get(uri)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('parentTask retrieved successfully');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('parenttask');
                done();
            });
        });
    });

    /*Test the /udpate a parent task route*/  
    describe('/GET a parent task', () => {
        it('it should GET a parent Task', (done) => {
        let uri = '/parenttasks/1000';
        let parenttastInput = {            
            parenttask: "Unit test task udpated"
        };
            chai.request(server)
            .patch('/parenttasks/1000')
            .send(parenttastInput)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Successes');
                    res.body.should.have.property('message').eql('ParentTask with id 1000 updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('parenttask');
                done();
            });
        });
    });
    //Delete a record
    describe('/Delete the record', () => {
        it('it should DELETE a parent task', (done) => {
            chai.request(server)
            .delete('/parenttasks/1000')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Parent Task deleted successfully!');
                done();
            });
        });
    });
});