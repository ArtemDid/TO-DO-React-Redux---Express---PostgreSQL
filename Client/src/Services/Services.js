const URL = "http://localhost:3001";

const createUser = function (login, password, repeatpassword) {
    fetch(`${URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password, repeatpassword }),
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            alert(data);
            window.location.assign('http://localhost:3000/');
        })
        .catch(err=>{
            alert(err);
            console.log("Not Found");
        });
}

const createToDo = function (description) {
  fetch(`${URL}/todos`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
  })
      .then(response => {
          return response.text();
      })
      .then(data => {
          console.log(data);
          alert(data);
          window.location.reload();
      })
      .catch(err=>{
          alert(err);
          console.log("Not Found");
      });
}

const updateToDo = function (idtodo, description) {
  fetch(`${URL}/update/${idtodo}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({idtodo, description }),
  })
      .then(response => {
          return response.text();
      })
      .then(data => {
          console.log(data);
          alert(data);
          window.location.reload();
      })
      .catch(err=>{
          alert(err);
          console.log("Not Found");
      });
}

const checkLogin = function (login, password) {
  fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
  })
      .then(response => {
          return response.text();
      })
      .then(data => {
          console.log(data);
          alert(data);
          if(data != "User not found")
          window.location.assign('http://localhost:3000/todoshow');
      })
      .catch(err=>{
          alert(err);
          console.log("Not Found");
      });
}

const assureNotEmpty = function (str) {
    if (str) {
      if (str.trim().length > 0) {
        return true;
      }
      else return false;
    }
    else return false;
  }
  
const assureAreEqual = function (str1, str2) {
    if (str1 && str2) {
      if (str1.trim() == str2.trim()) {
        return true;
      }
      else return false;
    }
    else return false;
  }
  
const assureRegPasswords = function (str) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;
  
    if (reg.test(str) == true) {
      return true;
    }
    else return false;
  }

const checkRemember = function (login, passWord) {
      const myLog = JSON.stringify(login);
      const myPass = JSON.stringify(passWord);
      if (window.localStorage != undefined) {
        window.localStorage.setItem("login", myLog);
        window.localStorage.setItem("password", myPass);
      }

  }

export {updateToDo, createToDo, checkLogin, createUser, assureNotEmpty, assureAreEqual, assureRegPasswords, checkRemember };
