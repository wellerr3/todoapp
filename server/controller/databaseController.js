const { Task } = require('../model/model.js');
const { json } = require('express');
// const { locals } = require('../server.js');
const databaseController = {};

databaseController.getTasks = async (req, res, next) => {
  //query our database for all tasks 
  console.log("databaseController get tasks")
  
  try {
    const myTasksDocs = await Task.find({})
    res.locals.myTasks = myTasksDocs;
    return next()
    }
    catch(error){
        next({
            Error: 'Unable to find your tasks'
        })
    }
}

databaseController.addTask = async (req, res, next) => {
    
    console.log("databaseController add task")

    const task = {
    taskLabel: req.body.taskLabel,
    dueDate: req.body.dueDate,
    }

    try {
      const myTask = await Task.create(task);
      console.log("myTaskDoc added",myTask);
      res.locals.task = myTask;
      return next()
      }
      catch(error){
          next({
              Error: 'Unable to add your tasks'
          })
      }
  }
databaseController.checkBox = async (req, res, next) => {
    try{
        console.log("databaseController.checkBox", req.body)
        const { taskLabel } = req.body;
        const myTask = await Task.findOne({ taskLabel: taskLabel });
        console.log("myTask before dbcheck",myTask)
        if (myTask.done === true ){
            myTask.done = false
        } else myTask.done = true;
        await myTask.save();
        console.log("myTask after dbcheck",myTask)
        return next()
    } 
    catch(error){ 
        next({
            Error: 'Unable to add your tasks'
        })

    }
}

databaseController.deleteTask = async (req, res, next) => {
    try{
        const { taskLabel } = req.body;
        await Task.findOneAndDelete( { taskLabel: taskLabel });
        return next();
    }
    catch(error){ 
        next({
            Error: 'Unable to delete your task'
        })

    }
}

module.exports = databaseController;