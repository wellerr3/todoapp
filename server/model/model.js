const mongoose = require('mongoose');
require('dotenv').config();
const Schema = mongoose.Schema;
// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = 'mongodb+srv://moonluck:mishra@cluster0.ht5ng.mongodb.net/to-do?retryWrites=true&w=majority'
  

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  dbName: 'to-do',
})
    .then(() => console.log('Connected to Mongo DB'))
    .catch(err => console.log(err));



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
  },
  done: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model('task', taskSchema)

module.exports = {
    Task,
};