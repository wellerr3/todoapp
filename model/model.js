const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
  

mongoose.connect(MONGO_URI, {
  useNewUrlParser: trunInNewContext,
  useUnifiedTopology: true, 
  dbName: 'ToDo',
})
    .then(() => console.log('Connected to Mongo DB'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  taskLabel: {
    type: String, 
    required: true
  }, 
  dateCreated: {
    type: Date,
    default: Date.now
    // required: true
  }, 
  dueDate: {
    type: Date, 
    required: true
  }
});

const Task = mongoose.model('task', taskSchema)

module.exports = {
    Task,
};