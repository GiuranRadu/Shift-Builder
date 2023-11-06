"use strict"
let users = JSON.parse(localStorage.getItem("users"));
const usernameInput = document.querySelector('.login-username-input');
const passwordInput = document.querySelector('.login-password-input');



// Login 
document.querySelector('.login-user-button').addEventListener('click', ()=>{  
  let validUser = users.find(obj => obj.user === usernameInput.value);
  
  if (validUser && passwordInput.value === validUser.password){
    // alert('Log in Successfully, you will be redirected in 3,2,1...');
    document.querySelector('.please-enter').innerHTML = 'Succes, you will be redirected in 3,2,1 ✅'
    setTimeout(function(){
      window.location.href = 'main-page.html';
      localStorage.setItem('loggedUser', JSON.stringify(validUser));
    }, 2000)

  } else {
    alert('Wrong password🔑 or user👤 ');
  }
});







//=======================FORGOT AND RESET=====================================
let forgotButton = document.querySelector('.forgot-button');
forgotButton.addEventListener('click', () =>{  
  alert(`You can reset password, but you will delete all your user data!!!! ⚠️`)
  let forgotDiv = document.querySelector('.forgot-div');
  
 
  forgotDiv.innerHTML = `
  <p class="forgot-para">Type the user you want to delete</p> 
  <button class="delete-button">Delete</button>
  <button class="back-button">Back</button>
  <input type="text" class="deleteUserInput input-container input" placeholder="Type here and press delete" >
  `;
 

  
  //=============== Here we delete the selected USER=============================
  // ============================== ERROR ================================
  // daca nu gaseste userul, imi da eroare in consola, vreau alert()

  document.querySelector('.delete-button').addEventListener('click', () => {
    
    let deleteUser = document.querySelector('.deleteUserInput');  
    let userToDelete = users.find(item => item.user === deleteUser.value).user;
    let userDeleteIndex = users.findIndex(item => item.user === deleteUser.value);    

   
    if(userToDelete === deleteUser.value){
      users.splice(userDeleteIndex,1)
      localStorage.setItem('users', JSON.stringify(users));
      deleteUser.value = '';
      let forgotPara = document.querySelector('.forgot-para')
      forgotPara.innerHTML = 'User Deleted ✅';
      setTimeout (() => {
        forgotPara.innerHTML = "Type the user you want to delete";          
       }
       , 2000);
    } else {
      console.log('User not found');      
    }
    console.log(userToDelete);
            
  })

  document.querySelector('.back-button').addEventListener('click', () => {
    forgotDiv.innerHTML = `<button class="forgot-button">Forgot User/Password </button>`
    location.reload()
  })
  
})





