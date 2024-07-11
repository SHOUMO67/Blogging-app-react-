import { useState,useEffect } from "react";

export default function UseLocalStorage(){

    const [email,setEmail] = useState("");


       useEffect(()=>{
    let emails=localStorage.getItem("email");
    if(emails){
      setEmail(emails)
    }
  },[]);

   
   useEffect(()=>{
    localStorage.setItem("email", email);
   },[email])


   return {email, setEmail};
}