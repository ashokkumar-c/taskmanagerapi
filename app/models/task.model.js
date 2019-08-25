const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskModel = new Schema(
  {
    _id: { type: String },
    parentTaskId: { type: String },
    task: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    priority: { type: Number, default: 0, min:0, max:30 }
  }
);


// True since it is a parallel middleware
taskModel.pre('save', function(next, done) {
  
if(!this._id){
  next(new Error("taskId should not be null"));
}
if(!this.task){
  next(new Error("task should not be empty"));
}
  next();
});

module.exports = mongoose.model('Task', taskModel);