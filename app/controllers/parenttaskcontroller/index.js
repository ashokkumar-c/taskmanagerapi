const parentTaskModel = require('../../models/parenttask.model');



// Handle index actions
exports.getall = (req, res) => {
    parentTaskModel.find(function (err, parentTasks) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "parentTasks retrieved successfully",
            data: parentTasks
        });
    }); // end of save function.
}; // end of getall function

exports.get = ((req, res) => res.json(
    {
        status: "success",
        message: "parentTask retrieved successfully",        
        data: req.parentTask
    }));


exports.findParentTaskByID = (req, res, next) => {
    parentTaskModel.findById (req.params.id , (err, parentTask) => {
        //console.log(req);
        if (err){
            res.send(err);
        }
        if(parentTask){            
            req.parentTask = parentTask;
            return next();
        }    
        return res.sendStatus(404);    
    });// end of findById function.
};

exports.add = (req, res) => {
    var parentTask = new parentTaskModel();

    parentTask._id = req.body._id;
    parentTask.parenttask = req.body.parenttask;
    parentTask.save((err, parentTask) => {  
        if (err){
            res.json({
                status: 'Failure',
                message: err,                           
            });
        } 
        res.json({
            status: 'Successes',
            message: 'New ParentTask created!',            
            data: parentTask
        });
    }); // end of save function.
}; // end of add function

exports.udpate = (req, res) => {

    if(!req.body){
        return res.status(404).json({
            status: 'Failure',
            message: 'reqest body is blank',
        });
    }
    console.log(req.body);
    parentTaskModel.findByIdAndUpdate(req.params.id,{        
        parenttask: req.body.parenttask}, {new:true})
        .then(ObjparentTaskModel => {
            console.log(req.body);
            if(!ObjparentTaskModel){
                return res.status(404).json({
                    status: 'Failure',
                    message: 'not able to find object',
                });
            }
            res.json({
                status: 'Successes',
                message: 'ParentTask with id '+ req.params.id + ' updated',            
                data: ObjparentTaskModel
            });
        }).catch(err => {
            return res.status(404).json({
                status: 'Failure',
                message: 'unable to udpated record with id' + req.params.id,
            });
    });
}; // end of put function

// Handle delete contact
exports.delete = (req, res) => {
    parentTaskModel.findByIdAndRemove(req.params.id)
    .then(ObjparentTaskModel => {
        if(!ObjparentTaskModel) {
            return res.status(404).send({
                message: "Parent Task not found with id " + req.params.id
            });
        }
        res.send({message: "Parent Task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Parent Task not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Parent Task with id " + req.params.id
        });
    });
};
