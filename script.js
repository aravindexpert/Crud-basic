// Define an array to store the data
let data = [];

// Function to add data to the table
function addDataToTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editData(index));
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteData(index));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Function to create data
function createData(name, email) {
    const newData = {
        id: Date.now(), 
        name: name,
        email: email
    };

    data.push(newData);
}

// Function to read data
function readData() {
    // Retrieve data from local storage if available
    const storedData = localStorage.getItem('crudData');
    if (storedData) {
        data = JSON.parse(storedData);
    }
}

// Function to save data
function saveData() {
    // Store data in local storage
    localStorage.setItem('crudData', JSON.stringify(data));
}

// Function to update data
function updateData(index, name, email) {
    data[index].name = name;
    data[index].email = email;
}

// Function to delete data
function deleteData(index) {
    data.splice(index, 1);
    addDataToTable();
    saveData();
}

// Function to reset the form for creating new data
function resetForm() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
  
    nameInput.value = '';
    emailInput.value = '';
    submitBtn.textContent = 'Create';
    submitBtn.dataset.action = 'create';
    delete submitBtn.dataset.index; // Remove the index data attribute
  }
  
  // Function to edit data
  function editData(index) {
    const item = data[index];
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
  
    nameInput.value = item.name;
    emailInput.value = item.email;
    submitBtn.textContent = 'Update';
    submitBtn.dataset.action = 'update';
    submitBtn.dataset.index = index;
  
    // Set the form's onsubmit event listener to update the data after editing
    document.getElementById('crudForm').onsubmit = function(e) {
      e.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (name && email) {
        const action = submitBtn.dataset.action;
        if (action === 'update') {
          const index = parseInt(submitBtn.dataset.index, 10);
          updateData(index, name, email);
        } else if (action === 'create') {
          createData(name, email);
        }
  
        addDataToTable();
        saveData();
  
        resetForm(); // Reset the form to its initial state for creating new data
      }
    };
  }
  
  // Function to handle form submission for adding new data
  document.getElementById('crudForm').onsubmit = function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
  
    if (name && email) {
      const action = submitBtn.dataset.action;
      if (action === 'create') {
        createData(name, email);
      } else if (action === 'update') {
        const index = parseInt(submitBtn.dataset.index, 10);
        updateData(index, name, email);
      }
  
      addDataToTable();
      saveData();
  
      resetForm(); // Reset the form to its initial state for creating new data
    } else {
      alert('Please fill in all the fields!');
    }
  };

  
  
  // Read data from local storage and populate the table
  readData();
  addDataToTable();
