const TaskModel = require('../../models/task.model');

// Handle index actions
exports.getall = (req, res) => {    
    TaskModel.find()
    .then(tasks =>{
        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks
        });
    }).catch(error => {
        res.status(500).json({
            status: "error",
            message: error,
        });
    });
}; // end of getall function

//add a task in to task table

exports.add = (req, res) => {
    //validate the body content
    if(!req.body) {
        return res.status(400).json({
            status: 'failure',
            message: 'task content can not be empty'
        });
    }

    const task = new TaskModel({
        _id: req.body._id,
        parentTaskId: req.body.parentTaskId,
        task: req.body.task,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority
    });

    task.save()
    .then(objTask => {
        res.status(200).json({
            status: "success",
            message: "New Task created!",
            data: objTask
        });        
    }).catch(error => {
        res.status(500).json({
            status: 'failure',
            message: error
        });
    });

};// end of add task

exports.findTaskByID = (req, res, next) => {
    TaskModel.findById (req.params.id , (err, Task) => {
        //console.log(req);
        if (err){
            res.send(err);
        }
        if(Task){            
            req.task = Task;
            return next();
        }    
        return res.sendStatus(404);    
    });// end of findById function.
};

exports.get = (req, res) => {
    TaskModel.findById(req.params.id)
    .then(objTaskModel =>{
        if(!objTaskModel) {
            return res.status(404).json({
                status: 'failure',
                message: 'Note not found with id ' + req.params.id
            });            
        }
        res.status(200).json({
            status: "success",
            message: "Task retrieved successfully",
            data: objTaskModel
        });
    }).catch(error => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                status: 'failure',
                message: "Task not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            status: 'failure',
            message: "Error retrieving task with id " + req.params.id
        });
    });
};

exports.udpate = (req, res) => {
 // Validate Request
    if(!req.body) {
        return res.status(400).json({
            status: 'failure',
            message: "Request body content can not be empty"
        });
    }

// Find task and update it with the request body
    TaskModel.findByIdAndUpdate(req.params.id,req.body, {new: true})
    .then(objTaskModel => {
        if(!objTaskModel) {
            return res.status(404).json({
                status: 'failure',
                message: "Task not found with id " + req.params.id
            });
        }
        res.status(200).json({
            status: "success",
            message: "Task with id "+ req.params.id + " updated",
            data: objTaskModel
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                status: 'failure',
                message: "Task not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            status: 'failure',
            message: "Error updating task with id " + req.params.id
        });
    });
};


exports.delete = (req, res) => {
    TaskModel.findByIdAndRemove(req.params.id)
    .then(ObjTaskModel => {
        if(!ObjTaskModel) {
            return res.status(404).json({
                status: 'failure',
                message: "Task not found with id " + req.params.id
            });
        }
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                status: 'failure',
                message: "Task not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            status: 'failure',
            message: "Could not delete Task with id " + req.params.id
        });
    });
};