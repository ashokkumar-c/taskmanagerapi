const mongoose = require('mongoose');

const { Schema } = mongoose;

const parentTaskModel = new Schema(
  {
    _id: { type: String },
    parenttask: { type: String }    
  }
);

// True since it is a parallel middleware
parentTaskModel.pre('save', function(next, done) {
    // now = new Date();
    // if(!this.createdOn) {
    //   this.createdOn = now;
    //   next();  
    // }
    
  if(!this._id){
		next(new Error("parenttaskId should not be null"));
  }
  if(!this.parenttask){
		next(new Error("parenttask should not be empty"));
	}
  	next();
});


module.exports = mongoose.model('ParentTask', parentTaskModel);