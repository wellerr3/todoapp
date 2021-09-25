const express = require('express');
const router = express.Router();
const { getTasks, addTask, checkBox, deleteTask } = require('../controller/databaseController.js');
const path = require('path');


router.get('/getTasks', getTasks, (req,res)=>{
  console.log("tasksRouter")
  res.status(200).json(res.locals.myTasks)
})

router.post('/addTask', addTask, getTasks, (req,res)=>{
    console.log("addTask")
    res.status(200).json(res.locals.task);
  })
router.patch('/checkBox', checkBox, (req,res)=>{
  console.log("box checked")
  res.sendStatus(200);
})

router.delete('/deleteTask', deleteTask, getTasks, (req, res) => {
  console.log("task deleted")
  res.sendStatus(200);
})

module.exports = router;