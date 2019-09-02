process.env.NODE_ENV = "UNITTESTING";

const mongoose = require("mongoose");
const TaskTest = require("../app/models/task.model");


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
        it('it should POST a task ', (done) => {
            let taskInput = {
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
            let taskInput = {
                "parentTaskId": 3,
                "task": "my unit test task",
                "startDate": "10-10-2018",
                "endDate": "10-10-2019",
                "priority": 10
            };
            var newtaskInput = new TaskTest({
                task: 'my unit test task',
                parentTaskId: 'my unit test task parent',
                startDate: '10-10-2018',
                endDate: '10-10-2019',
                priority: 10
            });
            newtaskInput.save((err,data)=>{
                chai.request(server)
                .get('/tasks/'+ data._id)
                .end((err, res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Task retrieved successfully');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('task');
                    done();
                });
            });
           /* let uri = '/tasks/10000';
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
                });*/
        });
    });

    /*Test the /udpate a parent task route*/
    describe('/Update a task', () => {
        it('it should Update a Task', (done) => {
            let taskUpdatenewInput = {
                "parentTaskId": 5,
                "task": "my unit test task udpated",
                "priority": 15
            };
            var newUpdatetaskInput = new TaskTest({
                task: 'my unit test task',
                parentTaskId: 'my unit test task parent',
                startDate: '10-10-2018',
                endDate: '10-10-2019',
                priority: 10
            });
            newUpdatetaskInput.save((err,data)=>{
                chai.request(server)
                .patch('/tasks/'+data._id)
                .send(taskUpdatenewInput)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Task with id '+ data._id +' updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('task').eql('my unit test task udpated');
                    done();
                });
            });
            /*let uri = '/tasks/10000';
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
                });*/
        });
    });
    //Delete a record
    describe('/Delete the record', () => {
        it('it should DELETE a task', (done) => {
            var newDeleteTaskInput = new TaskTest({
                task: 'my unit test task',
                parentTaskId: 'my unit test task parent',
                startDate: '10-10-2018',
                endDate: '10-10-2019',
                priority: 10
            });

            newDeleteTaskInput.save((err, data)=> {
                chai.request(server)
                .delete('/tasks/' + data._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task deleted successfully!');
                    done();
                });
            });

            /*chai.request(server)
                .delete('/tasks/10000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task deleted successfully!');
                    done();
                });*/
        });
    });
});