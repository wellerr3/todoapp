document.addEventListener('DOMContentLoaded', () => {

  //grab all the todos from db via the backend
  fetch('/getTasks')


  //add tasks 
  fetch('/addTask', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify()
  })



});