// import { useEffect, useState } from "react";

import UseLocalStorage from "./uselocalstorage";

export default function Reset(){

    // const [email,setEmail] = useState("");

    const {email,setEmail} = UseLocalStorage();

    // useEffect(()=>{
    //   let emails=localStorage.getItem("email");
    //   if(emails){
    //     setEmail(emails)
    //   }
    // },[])


    // useEffect(()=>{
    //   localStorage.setItem("email",email);

    // },[email])
    


    return(
        <>
        <h3>Reset Password for</h3>
      <input placeholder="Enter Email" value={email}
        onChange={(e) => {setEmail(e.target.value)}}/>
      <br />
      <button onClick={() => {}}>Submit</button>      

      </>
    )
}