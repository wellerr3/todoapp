

document.addEventListener('DOMContentLoaded', () => {
  
  const body = document.querySelector('body');
  const div1 = document.createElement('div');
  div1.setAttribute('id', 'input_div');
  body.appendChild(div1);

  const input = document.createElement('input');
  input.setAttribute('id', 'input_task');
  input.setAttribute('type','text');
  input.setAttribute('placeholder','Add a task...');
  div1.appendChild(input);
  
  const input2 = document.createElement('input');
  input2.setAttribute('id', 'input_date');
  input2.setAttribute('type','date');
  input2.setAttribute('placeholder','Add due date');
  div1.appendChild(input2);

  const addButton = document.createElement('button');
  addButton.setAttribute('id', 'addButton');
  addButton.innerText = 'ADD TASK';
  div1.appendChild(addButton);
  
  addButton.addEventListener('click', function () {
    const task = document.querySelector("#input_task");
    const dueDate = new Date(document.querySelector("#input_date").value)
    // dueDate = new Date(dueDate);
    
    const responseBody = { taskLabel: task.value, dueDate: dueDate };
    
    fetch('/tasks/addTask', {
      method: 'POST',
      body: JSON.stringify(responseBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((data) => 
      console.log("added task successfully:", data))
    .catch((error) => console.log("are you happy now?"))
  })

  const div2 = document.createElement('div');
  div2.setAttribute('id', 'task_div');
  body.appendChild(div2);
  
  //grab all the todos from db via the backend
  fetch('/tasks/getTasks')
    .then(data => data.json())
    .then(data => {
      for(let i = 0; i < data.length; i++) {
        const row = document.createElement('tr');
        
        const taskLabel = document.createElement('th');
       
        const dateStart = document.createElement('td');
        const dateDue = document.createElement('td');
        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'deleteButton');
        deleteButton.innerText = 'DELETE';
        deleteButton.onclick = () => deletingTask(data[i].taskLabel);
        
        taskLabel.innerHTML = data[i].taskLabel;
        row.setAttribute('id', data[i].taskLabel);
        dateStart.innerHTML = new Date(data[i].dateCreated).toLocaleDateString('en-US');
        dateDue.innerHTML = new Date(data[i].dueDate).toLocaleDateString('en-US');
        
        document.querySelector('#task_div').appendChild(row);
        row.appendChild(taskLabel);
        row.appendChild(dateStart);
        row.appendChild(dateDue);
        row.appendChild(deleteButton);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('id', 'checkbox');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = data[i].done;
        checkbox.onclick = () => checkingBox(taskLabel.innerHTML);
        row.appendChild(checkbox);
      }
      console.log(data)
    })
    const checkingBox = (label) => {
      console.log("checking box called?");
       fetch('/tasks/checkBox', {
         method: 'PATCH', 
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({ taskLabel: label })
       })
       .then(()=>{
         console.log("checked?")
       })
       .catch((error)=>{
         console.log("error from checkbox fetch")
       })
    }

    const deletingTask = (label) => {
      fetch('/tasks/deleteTask', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ taskLabel: label })
      })
      .then(() => console.log("task deleted"))
      .then(() => {
        let task = document.getElementById(`${label}`);
        if (task.parentNode) {
          task.parentNode.removeChild(task);
        }
      })
    }
})