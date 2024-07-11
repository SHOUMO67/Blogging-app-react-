// import { useEffect, useState } from "react";
import { useState } from "react";
import UseLocalStorage from "./uselocalstorage";

export default function Login(){
  //  const [email,setEmail] = useState("");

  const {email,setEmail} = UseLocalStorage();
   const [password, setPassword] = useState(""); 

  //  useEffect(()=>{
  //   let emails=localStorage.getItem("email");
  //   if(emails){
  //     setEmail(emails)
  //   }
  // },[])

   
  //  useEffect(()=>{
  //   localStorage.setItem("email", email);
  //  },[email])



    return(
        <>
        <h1>Login to the Portal!</h1>

        <h3>Login</h3>

      <input placeholder="Enter Email" value={email} 
        onChange={(e) => {setEmail(e.target.value)}}/>
      <br />
      <input placeholder="Enter Password" type="password" value={password}
        onChange={(e) => {setPassword(e.target.value);}}/>
      <br />

      <button onClick={() => {console.log("Form submitted")}}>Login</button>
      <br />
    </>
    )
}