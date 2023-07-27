var selectedRow = null
let emp_url;
const existingIds=[];

function onFormSubmit(e) {
	event.preventDefault();
        // Validate the form data
    if (validatedata()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

//validate data
function validatedata() {
    let isFormValid = true;

    //Validate ID
    const idInput = document.getElementById("emp_id");
    const idError = document.getElementById("id-error");
    if (idInput.value === "") {
        idError.innerHTML = "Fill the data";
        isFormValid = false;
    } else if (!isIdOnlyDigits(idInput.value)) {
        idError.innerHTML = "Enter valid ID";
        isFormValid = false;
    } 
    else if (idInput > 0) {
        idError.innerHTML = "Enter Valid Numeric value";
        isFormValid = false;
    }
        else {
        idError.innerHTML = "";
    }

    //Validate name
    const nameInput = document.getElementById("emp_name");
    const nameError = document.getElementById("name-error");
    if (nameInput.value === "") {
        nameError.innerHTML = "Fill the data";
        isFormValid = false;
    } else if (!isAlphabeticOnly(nameInput.value)) {
        nameError.innerHTML = "Only alphabets allowed";
        isFormValid = false;
    } else {
        nameError.innerHTML = "";
    }

    //Validate age
    const ageInput = document.getElementById("emp_age");
    const ageError = document.getElementById("age-error");
    if (ageInput.value === "") {
        ageError.innerHTML = "Fill the data";
        isFormValid = false;
    } else if (!isAgeValid(ageInput.value)) {
        ageError.innerHTML = "Age should be between 18 and 60";
        isFormValid = false;
    } else {
        ageError.innerHTML = "";
    }

    //Validate url
    const urlInput = document.getElementById("emp_url");
    const urlError = document.getElementById("url-error");
    if (urlInput.value === "") {
        urlError.innerHTML = "Fill the data";
        isFormValid = false;
    } else {
        urlError.innerHTML = "";
    }

    //Validate designation
    const designationInput = document.getElementById("emp_designation");
    const designationError = document.getElementById("designation-error");
    if (designationInput.value === "") {
        designationError.innerHTML = "Fill the data";
        isFormValid = false;
    } else {
        designationError.innerHTML = "";
    }

    //Validate designation
    const genderInput = document.getElementById("emp_gender");
    const genderError = document.getElementById("gender-error");
    if (genderInput.value === "") {
        genderError.innerHTML = "Fill the data";
        isFormValid = false;
    } else {
        genderError.innerHTML = "";
    }

    return isFormValid;
}

//isdigitfunction
function isIdOnlyDigits(id) {
    const idPattern = /^[1-9]\d*$/; 
    return idPattern.test(id);
  }


//isuniqueid
function isIdUnique(id) {
    return !existingIds.includes(id);
  }


//isalphabets only
function isAlphabeticOnly(input) {
    input =input.trim();
    const alphabeticPattern = /^[A-Za-z][A-Za-z\s]+$/;
    return alphabeticPattern.test(input);
  }

//isbetween18-60
function isAgeValid(age) {
      if(age>=18 && age<=60)
      {
        return true;
      }
}

//designation validation
function isDesignationSelected(designation) {
    // Check if a valid option (other than the default "Select Designation" option) is selected
    return designation == "select designation";
  }


//Retrieve the data
function readFormData() {
    var formData = {};
    formData["ID"] = document.getElementById("emp_id").value;
    formData["Name"] = document.getElementById("emp_name").value;
    formData["age"] = document.getElementById("emp_age").value;
    formData["designation"] = document.getElementById("emp_designation").value;
    formData["gender"] = document.getElementById("emp_gender").value;
    return formData;
}

function insertNewRecord(data) {

    if (isIdUnique(data.ID))
    {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
	cell1.innerHTML = data.ID;
    cell2 = newRow.insertCell(1);
	cell2.innerHTML = data.Name;
    cell3 = newRow.insertCell(2);
	cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
	cell4.innerHTML = data.designation;
    cell5 = newRow.insertCell(4);
	cell5.innerHTML = data.gender;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button> <button onClick="onView(this)">View</button>`;
    existingIds.push(document.getElementById("emp_id").value);
    console.log(existingIds);
    }
    else {
        alert("ID already exists. Please enter a unique ID.");
      }
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("emp_id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("emp_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("emp_age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("emp_designation").value = selectedRow.cells[3].innerHTML;
    document.getElementById("emp_gender").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    // Get the old ID from the selected row
    const oldID = selectedRow.cells[0].innerHTML;
  
    // Check if the ID has been changed
    if (oldID !== formData.ID) {
        // Remove the old ID from existingIds array
        const index = existingIds.indexOf(oldID);
        if (index !== -1) {
            existingIds.splice(index, 1);
        }
    }

    // Update the row with the new data
    selectedRow.cells[0].innerHTML = formData.ID;
    selectedRow.cells[1].innerHTML = formData.Name;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.designation;
    selectedRow.cells[4].innerHTML = formData.gender;
  
    // Add the new ID to existingIds array
    existingIds.push(formData.ID);
}



//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}


//Reset the data
function resetForm() {
    document.getElementById("emp_id").value = '';
    document.getElementById("emp_name").value = '';
    document.getElementById("emp_age").value = '';
    document.getElementById("emp_designation").value = '';
    document.getElementById("emp_url").value = '';
    document.getElementById("emp_gender").value = '';
    selectedRow = null;
}


function onView(td) {
selectedRow = td.parentElement.parentElement;
emp_url = document.getElementById("emp_url").value;
alert(emp_url);

    const employeeDetails = {

        ID:selectedRow.cells[0].innerHTML,
        Name:selectedRow.cells[1].innerHTML,
        Age:selectedRow.cells[2].innerHTML,
    URL:emp_url,
        Designation:selectedRow.cells[3].innerHTML,
        Gender:selectedRow.cells[4].innerHTML
        
    };

    showEmployeeDetails(employeeDetails);
}
/*
function showEmployeeDetails(employeeDetails) {
    const detailsString = `Employee ID: ${employeeDetails.ID}\n` +
        `Name: ${employeeDetails.Name}\n` +
        `Age: ${employeeDetails.Age}\n` +
        `URL: ${employeeDetails.URL}\n` +
        `Designation: ${employeeDetails.Designation}\n` +
        `Gender: ${employeeDetails.Gender}`;

    alert(detailsString);
}*/

function showEmployeeDetails(employeeDetails) {
    const modalContainer = document.getElementById("modal-container");
    const employeeDetailsDiv = document.getElementById("employee-details");

    // Clear previous content
    employeeDetailsDiv.innerHTML = "";

    // Create an image element for the employee's photo
    const img = document.createElement("img");
    img.style.height="100px";
    img.style.width="100px";
    img.style.borderRadius="90px";
    img.style.border="2px solid black";
    img.src = employeeDetails.URL; 

    // Append the image element to employeeDetailsDiv
    employeeDetailsDiv.appendChild(img);

    // Create a new <p> element for each detail and append to employeeDetailsDiv
    for (const key in employeeDetails) {
        if (key !== "URL") { // Exclude the photo URL from the details list
            const detail = document.createElement("p");
            detail.textContent = `${key}: ${employeeDetails[key]}`;
            employeeDetailsDiv.appendChild(detail);
        }
    }

    // Show the modal container
    modalContainer.style.display = "block";
}


function closeModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "none";
}


