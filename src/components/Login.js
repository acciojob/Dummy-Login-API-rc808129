
import React, { useState } from "react";




const users = [
    {
        id: 1,
        name: "ABC",
        email: "abc@gmail.com",
        password: "12"
    },
    {
        id: 2,
        name: "DEF",
        email: "def@gmail.com",
        password: "1234"
    },
    {
        id: 3,
        name: "GHI",
        email: "ghi@gmail.com",
        password: "123456"
    }
  ]


const Login = ()=>{

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [userError, setUserError] = useState("");
const [passwordError, setPasswordError] = useState("");


function dummyLoginApi(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email);

      if (!user) {
        reject({ type: "USER_NOT_FOUND" });
      } else if (user.password !== password) {
        reject({ type: "PASSWORD_INCORRECT" });
      } else {
        resolve(user);
      }
    }, 3000); // 3 seconds delay
  });
}

function handleSubmit(e) {
  e.preventDefault();

  // reset errors
  setUserError("");
  setPasswordError("");

  dummyLoginApi(email, password)
    .then(userData => {
      console.log(userData); // SUCCESS
    })
    .catch(err => {
      if (err.type === "USER_NOT_FOUND") {
        console.log("User not found");
        setUserError("User not found");
      }
      if (err.type === "PASSWORD_INCORRECT") {
        console.log("Password Incorrect");
        setPasswordError("Password Incorrect");
      }
    });
}




  return(<div>
    
    <input  id="input-email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter your email"/>
    <p id="user-error">{userError}</p>
    <input  id="input-password" type="password" 
    value={password} onChange={(e)=>setPassword(e.target.value)}
    placeholder="Enter your password"/>
    <p id="password-error">{passwordError}</p>
    <button id="submit-form-btn" onClick={handleSubmit}>Login</button>

  </div>)
}

export default Login