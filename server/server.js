const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const tasksRouter = require('./routes/tasksRouter');

app.use(express.json());

app.all('/*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers","X-Requested-With, Content-Type");
  next();
});

app.use('/tasks', tasksRouter);

app.use(express.static(path.join(__dirname, '../client')));

app.use((err, req, res, next) => {
  console.log("did we reach error handler")
  const defaultErr = 
  {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred'}
  };
  const errorObj = Object.assign({},defaultErr, err);
  res.send(errorObj);
});

app.listen(PORT);

module.exports = app;