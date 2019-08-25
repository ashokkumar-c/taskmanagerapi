process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const parentTaskTest = require("../app/models/task.model");


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('TaskTest', () => {
    beforeEach((done) => { //Before each test we empty the database
        //parentTaskTest.remove({}, (err) => { 
           done();           
       // });        
    });

    /*Post data */
    describe('/POST task', () => {
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
          it('it should POST a task ', (done) => {
                let taskInput = {
                    "_id": 10000,
                    "parentTaskId": 3,
                    "task": "my unit test task",
                    "startDate": "10-10-2018",
                    "endDate": "10-10-2019",
                    "priority": 10
                };
                chai.request(server)
                .post('/tasks')
                .send(taskInput)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('status').eql('success');
                      res.body.should.have.property('message').eql('New Task created!');
                      res.body.data.should.have.property('_id');
                      res.body.data.should.have.property('task');
                  done();
                });
          });
      });
      
    /*Test the /GET all route*/  
    describe('/GET all tasks', () => {
        it('it should GET all the Tasks', (done) => {
            chai.request(server)
            .get('/tasks')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });

    /*Test the /GET a parent task route*/  
    describe('/GET a task', () => {
        it('it should GET a Task', (done) => {        
        let uri = '/tasks/10000';
        chai.request(server)
            .get(uri)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Task retrieved successfully');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('task');
                done();
            });
        });
    });

    /*Test the /udpate a parent task route*/  
    describe('/Update a task', () => {
        it('it should Update a Task', (done) => {
        let uri = '/tasks/10000';
        let taskInput = {
            "parentTaskId": 5,
            "task": "my unit test task udpated",
            "priority": 15
        };
            chai.request(server)
            .patch(uri)
            .send(taskInput)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Task with id 10000 updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('task').eql('my unit test task udpated');
                done();
            });
        });
    });
    //Delete a record
    describe('/Delete the record', () => {
        it('it should DELETE a task', (done) => {
            chai.request(server)
            .delete('/tasks/10000')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Task deleted successfully!');
                done();
            });
        });
    });
});