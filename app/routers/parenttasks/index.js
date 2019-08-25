const parentTasks = require('express').Router();
const parentTaskController = require('../../controllers/parentTaskController');

// parentTasks.get('/',(req, res) => {

//     //res.status(200).json(" parent task details.");

// });

parentTasks.route('/')
    .get(parentTaskController.getall)
    .post(parentTaskController.add);
    

parentTasks.use('/:id',parentTaskController.findParentTaskByID);

parentTasks.route('/:id')
    .get(parentTaskController.get)
    .patch(parentTaskController.udpate)
    .delete(parentTaskController.delete);
   

module.exports = parentTasks;