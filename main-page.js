

// All the info needed from localStorage
let users = JSON.parse(localStorage.getItem("users"));
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let loggedUserShifts = JSON.parse(localStorage.getItem(`${loggedUser.user}shifts`))


let user = loggedUser.user
let password = loggedUser.password
let firstName = loggedUser.firstName
let lastName = loggedUser.lastName
let email = loggedUser.email
let age = loggedUser.age



//All global variables needed
let shiftTableContainer = document.querySelector('.add-shift-container');
let searchShiftsContainer = document.querySelector('.search-shift-div');
let displayShiftDiv = document.querySelector('.display-shift-div');
let salariesContainer = document.querySelector('.your-salaries-div');
let editProfileContainer = document.querySelector('.your-profile-div');
let applyButton = document.querySelector('.apply-button');
let editButton = document.querySelector('.edit-button');
let showButton = document.querySelector('.show-button');
let errorContainer = document.querySelector('.error-container');
let temporaryId;


// REMOVE hidden class FUNCTION for an unknown parameter number
function removeHiddenClass(){
  const arg = Array.from(arguments);
  for (let i = 0; i < arg.length; i++ ){
    arg[i].classList.remove("hidden")
  }
}

// ADD hidden class FUNCTION for an unknown parameter number
function addHiddenClass(){
  const arg = Array.from(arguments);
  for (let i = 0; i < arg.length; i++ ){
    arg[i].classList.add("hidden")
  }
}


// Check password function
function checkPassword(){
  let promptPassword = prompt('Please enter your password 🔑');
  if (promptPassword === password){
    return true;
  } else {
    let errorContainer = document.querySelector('.error-container');
    removeHiddenClass(errorContainer);
    displayError('Wrong password 🔑');
  }
}


//Display Error function + removeHiddenClass(errorContainer);

function displayError(param){
  document.querySelector('.error-paragraph').innerHTML = param
  document.querySelector('.x-button').addEventListener('click', ()=>{    
    let errorContainer = document.querySelector('.error-container');
    addHiddenClass(errorContainer)
  })
}




// Logout Button
document.querySelector('.logout-button').addEventListener('click', () => {  
  let hiddenDiv =  document.querySelector(".logout-confirmation-div");
  let noButton = document.querySelector(".logout-no-button");
  let yesButton = document.querySelector(".logout-yes-button");
  
  removeHiddenClass(hiddenDiv)
  noButton.addEventListener('click', () => {
    addHiddenClass(hiddenDiv)
  })

  yesButton.addEventListener('click', () => {
    window.location.href = 'login.html';
    // && delete loggedUser
    localStorage.removeItem("loggedUser");
    window.location.href = 'login.html';
  })
})

// Logo refresh 
document.querySelector('.div1').addEventListener('click', () => {
  location.reload();  
  
})

// ============================ REGISTER SHIFT section ============================

let registerShiftButton = document.querySelector('.js-shift-button');
let dateOfShift = document.querySelector('.js-date-of-shift');
let begginingTime = document.querySelector('.js-beggining-time');
let endTime = document.querySelector('.js-end-time');
let hourPay = document.querySelector('.js-hour-pay');
let locationS = document.querySelector('.js-location');
let shiftName = document.querySelector('.js-shift-name');

document.querySelector('.div2').addEventListener('click', () => { 
  removeHiddenClass(shiftTableContainer,searchShiftsContainer,displayShiftDiv);    
  addHiddenClass(editProfileContainer,salariesContainer);   
})

//Function to REMOVE input values
function clearInputDisplay(){
  dateOfShift.value = "";
  begginingTime.value = "";
  endTime.value = "";
  hourPay.value = "";
  locationS.value = "";
  shiftName.value = "";
}


let Mode = "Register shift"

//part1 - register Shift

let shiftArray;
if(localStorage[`${user}shifts`] != null){
  shiftArray = JSON.parse(localStorage.getItem(`${user}shifts`));
}
else{
  shiftArray = [
    {
    dateOfShift : "",
    begginingTime : "",
    endTime : "",
    hourPay : "",
    locationS : "",
    shiftName : "",
  }    
  ];
}

registerShiftButton.addEventListener('click', (e) => {  
 
  if(!shiftName.value){
    // alert('❌ Please enter a shift name ❌')
    removeHiddenClass(errorContainer);
    displayError('Please enter a shift name');
  } else{
    console.log(shiftName.value);
    let shiftExist = false;
  shiftArray.some(shift => {
    if(shift.shiftName === shiftName.value){
      shiftExist = true
    }   
  });

  if(shiftExist){
    // alert('❌A shift with this name ALREADY exist ❌')
    removeHiddenClass(errorContainer);
    displayError('A shift with this name ALREADY exist');
  } else{  
    if(Mode === "Register shift"){
      let shiftDetails = {
        dateOfShift: dateOfShift.value,
        begginingTime: begginingTime.value,
        endTime: endTime.value,
        hourPay: hourPay.value,
        location: locationS.value,
        shiftName: shiftName.value
      }
    shiftArray.push(shiftDetails); 
     localStorage.setItem(`${user}shifts`, JSON.stringify(shiftArray)); 
     registerShiftButton.innerHTML = `Shift Added <img class="checkmark-img" src="images/checkmark.png"> `
     registerShiftButton.classList.add('green-background')
    
    
     setTimeout (() => {
      registerShiftButton.classList.remove('green-background')
      registerShiftButton.innerHTML = 'Register Shift '
    
     }
     , 2000);
    
     clearInputDisplay()
    }else {    
      editshift(temporaryId)
      registerShiftButton.textContent = "Register shift"
      Mode = "Register shift"
    }
  }
  }
  
  e.preventDefault()
})

//part2 - search and display Shift

let searchByDateButton = document.querySelector('.js-search-by-date');
let searchByNameButton = document.querySelector('.js-search-by-name');

let table = document.querySelector('.js-shift-table');

searchByNameButton.addEventListener('click', () => {

  let searchByNameInput = document.querySelector('.js-search-shift-name-input'); 
  let foundMatch = false; 
  
  shiftArray.forEach((item, index) => {
    if (item.shiftName === searchByNameInput.value) {
      let minutes = calculateMinutesBetweenTwoHours(item.begginingTime, item.endTime)
      let totalMoney = (item.hourPay / 60 * minutes)
      let html = `
        <tr>
          <td>${item.dateOfShift}</td>
          <td>${item.begginingTime}</td>
          <td>${item.endTime}</td>
          <td>$${item.hourPay}</td>
          <td>${item.location}</td>
          <td>${item.shiftName}</td>
          <td>$${totalMoney.toFixed(2)}</td>
          <td>
            <button class="edit-shift-button" onclick = "editshift(${index})">Edit</button>
            <button class="remove-shift-button" onclick = "deleteshift(${index})">Remove</button>
          </td>
        </tr>`;
  
      table.innerHTML = html;
      foundMatch = true; 
    }
  });

  if (!foundMatch) {
    // alert('❌ Shift does not exist ❌');
    removeHiddenClass(errorContainer);
    displayError('Shift does not exist');    
  }
  searchByNameInput.value =''
});

let startDateInput = document.querySelector('.start-date-input');
let endDateInput = document.querySelector('.end-date-input');


searchByDateButton.addEventListener('click', () => {
  let foundMatch = false; 
  shiftArray.forEach((item,index) => {
    if(startDateInput.value < item.dateOfShift && endDateInput.value  > item.dateOfShift){
      let minutes = calculateMinutesBetweenTwoHours(item.begginingTime, item.endTime)
      let totalMoney = (item.hourPay / 60 * minutes)
      let html = `
        <tr>
          <td>${item.dateOfShift}</td>
          <td>${item.begginingTime}</td>
          <td>${item.endTime}</td>
          <td>$${item.hourPay}</td>
          <td>${item.location}</td>
          <td>${item.shiftName}</td>
          <td>$${totalMoney.toFixed(2)}</td>
          <td>
            <button class="edit-shift-button" onclick = "editshift(${index})">Edit</button>
            <button class="remove-shift-button" onclick = "deleteshift(${index})">Remove</button>
          </td>
        </tr>`;
      table.innerHTML += html;
      foundMatch = true; 
      window.scrollTo({
        top: 5000,
        left: 0,
        behavior: 'smooth',    
      });
    }    
  }) ;
  if (!foundMatch) {
    // alert('❌ Shift does not exist ❌');
    removeHiddenClass(errorContainer);
    displayError('Shift does not exist');    
  }
  startDateInput.value = '';
  endDateInput.value = '';
})

//part3 - edit and save shift
function editshift(index){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',    
  });
  temporaryId = index;
  Mode = "Update Shift"
  registerShiftButton.textContent = "Update Shift"
  let shiftAfterModification = {
    dateOfShift : dateOfShift.value,
    begginingTime: begginingTime.value,
    endTime     : endTime.value,
    hourPay: hourPay.value,
    location: locationS.value,
    shiftName: shiftName.value
  }
  dateOfShift.value = shiftArray[temporaryId].dateOfShift
  begginingTime.value = shiftArray[temporaryId].begginingTime
  endTime.value = shiftArray[temporaryId].endTime
  hourPay.value = shiftArray[temporaryId].hourPay
  locationS.value = shiftArray[temporaryId].location
  shiftName.value = shiftArray[temporaryId].shiftName

  shiftArray[temporaryId] = shiftAfterModification
  localStorage.setItem(`${loggedUser.user}shifts`, JSON.stringify(shiftArray))
}

function deleteshift(index){
  shiftArray.splice(index, 1) 
  localStorage.setItem(`${loggedUser.user}shifts`, JSON.stringify(shiftArray)) 
  table.innerHTML = ''; 
  // aici s-ar putea sa trebuiasca sa scot elementul <div class = "clasa-index""> din table.innerHTML 
}



// Calculate minutes between two hours
function calculateMinutesBetweenTwoHours(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;
  let difference = endInMinutes - startInMinutes;
  
  if (difference < 0) {
    difference += 24 * 60; 
  }
  return difference;
}






// ============================ SALARIES section ============================


document.querySelector('.div3').addEventListener('click', () => {
  removeHiddenClass(salariesContainer);
  addHiddenClass(shiftTableContainer,editProfileContainer,searchShiftsContainer,displayShiftDiv); 
})

let bestPaidPerHourShift = shiftArray.reduce((maxObject, currentObject) => {
  const maxHourPay = parseInt(maxObject.hourPay);
  const currentHourPay = parseInt(currentObject.hourPay);
  return currentHourPay > maxHourPay ? currentObject : maxObject;
}) 

let paidInOrder = shiftArray.sort((a,b) => b.hourPay - a.hourPay);

salariesContainer.innerHTML += `
<li class="best-payed-shift">🪙 BEST paid shift is <span class="best-payed-shift-span"> ${bestPaidPerHourShift.shiftName}</span> with $${bestPaidPerHourShift.hourPay}/hour 🤑</li>        
`;

shiftArray.forEach((shift,index) =>{

salariesContainer.innerHTML += `
<li>${index+1}. <span class="bold-span">${shift.shiftName}</span></>
<p>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  paid with  $${shift.hourPay}/h</p>          
`

})







//============================ EDIT PROFILE section ============================

document.querySelector('.div4').addEventListener('click',() =>{
  removeHiddenClass(editProfileContainer);
  addHiddenClass(shiftTableContainer,salariesContainer,searchShiftsContainer,displayShiftDiv);  
})

// part 1 - display info; 
showButton.addEventListener('click',() =>{
 
  if (checkPassword()){
    let userNameP = document.querySelector('.username-p');
  userNameP.textContent = `Username: ${user}`

  let passwordP = document.querySelector('.password-p');
  passwordP.textContent = `Password: ${password}`;

  let firstnameP = document.querySelector('.firstname-p');
  firstnameP.textContent = `First Name: ${firstName}`;

  let lastnameP = document.querySelector('.lastname-p');
  lastnameP.textContent = `Last Name: ${lastName}`;

  let emailP = document.querySelector('.email-p');
  emailP.textContent = `Email: ${email}`;

  let ageP = document.querySelector('.age-p');
  ageP = ageP.textContent = `Age: ${age}`;
  }  
 
})

// part 2 - modify and save info; 
document.querySelectorAll('.edit-button').forEach(button => {
  button.addEventListener('click',()=>{
    if (checkPassword()){
    let editButton = document.querySelectorAll('.edit-button');
    let editInput = document.querySelectorAll('.edit-input');
  
    editButton.forEach((element) =>{
      addHiddenClass(element)
    })
    
    editInput.forEach((element) =>{
      removeHiddenClass(element)
    })  
  
    removeHiddenClass(applyButton)
     
    } else displayError('Wrong password 🔑')
  })
})


applyButton.addEventListener('click', () => {
  let editButton = document.querySelectorAll('.edit-button');
  let editInput = document.querySelectorAll('.edit-input');

  editButton.forEach((element) =>{
    removeHiddenClass(element)
  })
  addHiddenClass(applyButton);
  
  editInput.forEach((element) =>{
    addHiddenClass(element)
  })

  // let usernameInput = document.querySelector('.username-input').value;
  let passwordInput = document.querySelector('.password-input').value;
  let firstNameInput = document.querySelector('.firstName-input').value;
  let lastNameInput = document.querySelector('.lastName-input').value;
  let emailInput = document.querySelector('.email-input').value;
  let ageInput = document.querySelector('.age-input').value;
  

//Here we verify IF the username and password are valid and save them into a new KEY "loggedUser"
  if ((passwordInput.length > 5) && ( firstNameInput.length > 0 && lastNameInput.length > 0) && (emailInput.length > 0 ) &&(ageInput >= 18)) {
    let userDetails = {
      // user : usernameInput,
      user : loggedUser.user,
      password : passwordInput,
      email : emailInput,
      firstName : firstNameInput,
      lastName : lastNameInput,
      age : ageInput
    }       
    let userToDelete = users.find(item => item.user === `${loggedUser.user}`).user
    let userDeleteIndex = users.findIndex(item => item.user === userToDelete);    
    users.splice(userDeleteIndex, 1);       
    users.push(userDetails);       
    
    localStorage.setItem('loggedUser', JSON.stringify(userDetails)); 
    localStorage.setItem('users', JSON.stringify(users));


    setInterval(() => {
      location.reload(); 
    }, 2000);

  let okContainer = document.querySelector('.ok-container');
    removeHiddenClass(okContainer)
  } else {
    removeHiddenClass(errorContainer);    
  }   
  displayError()  
});




// ============================ HELLO USER section ============================

document.querySelector('.div5').addEventListener('mouseenter',() =>{ 
  let paragraph = document.querySelector('.hello-user-paragraph');  

  if (paragraph.innerHTML === 'Show username'){
    paragraph.innerHTML = `${user}`;
  } 
  
  document.querySelector('.div5').addEventListener('mouseleave', () =>{
    if (paragraph.innerHTML === `${user}`){
      paragraph.innerHTML = 'Show username'
    }
  });   
});


//=====================DELETE BELOW==========================





