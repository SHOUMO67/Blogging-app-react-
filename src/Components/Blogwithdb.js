import { useState , useEffect, useRef,} from "react";
import {db} from "../firebaseinit";
import { collection,doc, addDoc,onSnapshot,deleteDoc} from "firebase/firestore";


    // useing database)

        //addDoc either this way
        // const docRef = collection(db, "blogs");
            
        // await addDoc(docRef, {
        //         title: formData.title,
        //         content: formData.content,
        //         createdOn: new Date()
        //     });
        

export default function Blog(){

    // const [title, setTitles] = useState("");
    // const [content, setContent] = useState("");
    const[formdata, setformdata] = useState({title:"", content:""});
    const [blogs, setblogs] = useState([]);

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

    // async function fetchdata(){
    //     const snapshot = await getDocs(collection(db,"Blogs"));
    //     console.log(snapshot);

    //     const dbblogs = snapshot.docs.map((doc)=>{
    //         return{
    //             id: doc.id, 
    //             ...doc.data()
    

    //         }

    //     })

    //     console.log(dbblogs);
    //     setblogs(dbblogs)

    // }

    // fetchdata();


    const fetchdatarealtime = onSnapshot(collection(db,"Blogs"),(snapshot)=>{

         const dbblogs = snapshot.docs.map((doc)=>{
            return{
                id: doc.id, 
                ...doc.data()
            }

        })

        console.log(dbblogs);
        setblogs(dbblogs)

    })

    console.log(fetchdatarealtime);
 },[])


    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        // setTitles("");
        // setContent("");

        // commenting out this because we fetch data from db in realtime using onSnapshot
        //setblogs([{title:formdata.title, content:formdata.content},...blogs])

        setformdata({title:"", content:""});

        titleref.current.focus();
        
        console.log(blogs)
        
        await addDoc(collection(db, "Blogs"), {
            title: formdata.title,
            content: formdata.content,
            createdOn: new Date()
        })

    }

    async function removeblog(id){
        //setblogs(blogs.filter((bolg,index)=> i!==index))
        const deldata = doc(db,"Blogs",id)
        await deleteDoc(deldata)


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
                <button onClick={()=>removeblog(blog.id)} //removeblog(i)
                 className="remove">Delete</button>
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
