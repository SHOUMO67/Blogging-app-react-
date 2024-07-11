//  import Blog from "./Components/Blog";
import Blog from "./Components/Blogwithdb";
function App() {
  return (
    <>
      <Blog />
    </>
  );
}

export default App;


// this for using the custom hooks and save in localstorages

// import Login from "./Components/login";
// import Reset from "./Components/reset";

// import { useState } from "react";

// function App() {
//   const [form, setForm] = useState("login");

//   return (
//     <div className="App">

//       <h1>Welcome!</h1>

//       {form === "login" ? <Login /> : <Reset />}
      
//       <button onClick={() => {setForm(form === "login" ? "reset" : "login");}}>
//         {form === "login" ? "Forgot Password" : "Back to Login"}
//       </button>


//     </div>
//   );
// }

// export default App;

