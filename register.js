"use strict"
let userInput = document.querySelector('.create-username-input');
let passwordInput = document.querySelector('.create-password-input');
let paragraph =  document.querySelector('.para');
let emailInput = document.querySelector('.create-email');
let firstNameInput = document.querySelector('.create-first-name');
let lastNameInput = document.querySelector('.create-last-name');
let ageInput = document.querySelector('.create-age');
let users;

if(localStorage.users != null){
  users = JSON.parse(localStorage.getItem('users'));
}
else{
  users = [];
}


// ================================REGISTER========================================

document.querySelector('.create-user-button').addEventListener('click', ()=>{
  let userDetails = {
    user : userInput.value,
    password : passwordInput.value,
    email : emailInput.value,
    firstName : firstNameInput.value,
    lastName : lastNameInput.value,
    age : ageInput.value
  }
 
  let userExists = false;
  users.some(user =>{
    if(user.user === userInput.value){
      userExists = true;
    }
  })
  if(userExists){
    alert('👤User taken, choose a new one');
  } else {
    if(userDetails.user.length < 6 && userDetails.password.length < 6 ) {
      paragraph.textContent = 'Username and password are too short ⛔';
    } else if (userDetails.user.length < 6 || !hasNumberAndCharacter(userDetails.user)){
      paragraph.textContent="User must be 6 character long (letter + number + special character ) ⛔ ";    
    } else if (userDetails.password.length < 6){    
      paragraph.textContent = 'Password should be at least 6 characters ⛔'
    } else {
      users.push(userDetails);
      localStorage.setItem("users", JSON.stringify(users));
      (paragraph.textContent  = 'Good user & password ✅, you will be redirected to the login page in 3,2,1...');    
        
      setTimeout(function(){
        window.location.href = 'login.html';
      },2500)   
    }   
  
  }

  
})

function hasNumberAndCharacter(str){
  const hasNumber = /\d/.test(str); 
  
  const hasCharacter = /[a-zA-Z]/.test(str);

  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
 
  return hasNumber && hasCharacter && hasSpecialChar;
}

