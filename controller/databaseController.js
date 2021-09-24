const { Task } = require('./model/model.js');
// const { locals } = require('../server.js');
const databaseController = {};

databaseController.getTasks = async (res, req, next) => {
  //query our database for all tasks 
  try {
    const myTasksDocs = await Task.find({})
    res.locals.myTasks = myTasksDocs;
    return next()
    }
    catch{
        next({
            Error: 'Unable to find your tasks',
        })
    }

}