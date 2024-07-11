import { useState , useEffect, useRef, useReducer} from "react";

import {db} from "../firebaseinit";
import { collection, addDoc,doc,getDocs} from "firebase/firestore";

    // useing database)

        //addDoc either this way
        // const docRef = collection(db, "blogs");
            
        // await addDoc(docRef, {
        //         title: formData.title,
        //         content: formData.content,
        //         createdOn: new Date()
        //     });
        

// if i use blogs instead of satate it will same because,
//The state in the reducer function is the current state of your blogs array.
function blogseducer(state, action){
    //In the blogReducer function, the state parameter represents the current state of the blogs, which is an array in this case.
    // The reducer function's job is to return the new state based on the action it receives

    switch(action.type){
        case "ADD":
            return [action.blog, ...state];
        case " REMOVE":    
        return state.filter((blog,index)=> index !== action.index)
        default:
            return []
    }

}

export default function Blog(){

    // const [title, setTitles] = useState("");
    // const [content, setContent] = useState("");
    const[formdata, setformdata] = useState({title:"", content:""});
    // const [blogs, setblogs] = useState([]);

    //using reducer instead of useState
    //The useReducer hook is initialized with the blogReducer function and an initial state ([] in this case, an empty array).
    //blogs is the current state.
    const[blogs, dispatch] = useReducer(blogseducer,[]);
    //dispatch is the function used to send actions to the reducer.
    const titleref = useRef(null);

  useEffect(() =>{
    titleref.current.focus();
  },[]);


 useEffect(()=>{
    if(blogs.length && blogs[0].title)
        {
            document.title = blogs[0].title;
        }
        else{
            document.title = "No blogs title!!!!";
        }
 },[blogs])

 useEffect(()=>{

    async function fetchdata(){
        const snapshot = await getDocs(collection(db,"Blogs"));
        console.log(snapshot);

        const dbblogs = snapshot.docs.map((doc)=>{
            return{
                id: doc.id, 
                ...doc.data()
    

            }

        })

        console.log(dbblogs);
        // (dbblogs)

    }

    fetchdata();
 },[])





    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        // setTitles("");
        // setContent("");

        //setblogs([{title:formdata.title, content:formdata.content},...blogs])
        dispatch({type: "ADD",blog:{title:formdata.title, content:formdata.content}})

        setformdata({title:"", content:""});

        titleref.current.focus();
        
        console.log(blogs)
        
        await addDoc(collection(db, "Blogs"), {
            title: formdata.title,
            content: formdata.content,
            createdOn: new Date()
        })

    }

    function removeblog(i){
        //setblogs(blogs.filter((bolg,index)=> i!==index))
        dispatch({type: "REMOVE",index:i})

    }

    return(
        <>
        <h1>Write a Blog!</h1>
        
        <div className="section">

            <form onSubmit={handleSubmit}>

                <Row label="Title">
                        <input ref ={titleref}value={formdata.title} onChange={(e)=>setformdata({title:e.target.value, content:formdata.content})} className="input"  placeholder="Enter the Title of the Blog here.." />
                </Row >

                <Row label="Content">
                        <textarea value={formdata.content} onChange={(e)=>setformdata({title:formdata.title, content:e.target.value})}  className="input content" placeholder="Content of the Blog goes here.." required/>
                </Row >
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        <h2> Blogs </h2>
        {blogs.map((blog,i)=>(
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <hr />
                <p>{blog.content}</p>
                <div className="bolg-btn" >
                <button onClick={()=>removeblog(i)} className="remove">Delete</button>
                </div>
                
            </div>
        ))}

        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
