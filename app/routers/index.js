const routers = require('express').Router();

/*const tasks = require('./tasks');
routers.use('/tasks',tasks);*/

const parenttasks = require('./parentTasks');
routers.use('/parenttasks',parenttasks);
const tasks = require('./tasks');
routers.use('/tasks',tasks);


routers.get('/', (req, res) => {
    res.status(200).json({ 
      status: 'Succeses',
      message: 'Rest API is working fine.' });
  });
  
module.exports = routers;