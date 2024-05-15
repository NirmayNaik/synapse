'use client'
import { DataContext } from '@/app/layout';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

// export async function getStaticProps() {
//     const response = await fetch('/issues/');
//     const data = await response.json();
  
//     return { props: { data } };
//   }

export default function IName({params}) {
    const { user, iss, setUChange, setIss} = useContext(DataContext);
    if(iss!=null && iss.title && iss.title.length > 0) 
    localStorage.setItem('issue', JSON.stringify(iss));
    const issue = JSON.parse(localStorage.getItem('issue'));

    const [title, setTitle] = useState(issue.title);
    const [body, setBody] = useState(issue.body);
    const [prior, setPrior] = useState(issue.priority);
    const [status, setStatus] = useState(issue.status);
    const [file, setFile] = useState([]);
    const [reply, setReply] = useState(null);
    const [edit, setEdit] = useState(null);

    // const [ititle, setITitle] = useState(issue.title);
    // const [ibody, setIBody] = useState(issue.body);
    // const [iprior, setIPrior] = useState(issue.priority);
    // const [istatus, setIStatus] = useState(issue.status);
    // const [edited, setEdited] = useState(false);
    // const [ifile, setIFile] = useState([]);

    const [comment, setComment] = useState("");
    const [allCom, setAllCom] = useState(null);
    const router = useRouter();
    var prevAuth="", currentAuth="";
    

    // Retrieve data from local storage

    const [f, setF]= useState(false);
    const [f2, setF2]= useState(true);
    console.log(iss);
    // const pageName = router.query.name;

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Commenting");
        
        const response = await fetch(`http://localhost:4000/issues/${params.name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({body:comment, author:user, isEdited:false, isDeleted:false, iss:issue, replyAuth:reply?reply.author.username:"", replyBody:reply?reply.body:""}),
        })
        .then(()=>{setF(c=>!c); setComment("");
        setReply(null);
        if(f2) setUChange(c=>!c);
        setF2(false);
        toast.success('Commented!');
    });
    
        // Handle response (e.g., show success message or redirect)
      };

    const handleEdit = async (event) => {
        event.preventDefault();
        // console.log("Commenting");
        
        const response = await fetch(`http://localhost:4000/issues/${params.name}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id:edit._id, desc:comment}),
        })
        .then(()=>{setF(c=>!c); setComment("");
        setEdit(null);
        // if(f2) setUChange(c=>!c);
        // setF2(false);
        // toast.success('🦄 Wow so easy!', {
        //     position: "top-right",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     // transition: Bounce,
        //     });
    });
    
        // Handle response (e.g., show success message or redirect)
      };

      const handleFormSubmit = async(event) => {
        // event.preventDefault();
        
        // console.log("handleFormSubmit");
        const response = await fetch(`http://localhost:4000/issues/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: issue._id, title:title, author:user,body:body, priority:prior, status:status}),
        })
        .then (async res => {
            // const data= await res.json();
            setIss(({_id:issue._id, title:title,id:issue.id, author:user, body:body, priority:prior,status:status, isEdited:true, isDeleted:false}))
            // console.log(({_id:issue._id, title:title,id:issue.id, author:user, body:body, priority:prior,status:status, isEdited:true, isDeleted:false}));
            console.log(iss);
            
        //   if(data.Issues){
        //     // toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
        //     setIssues(data.Issues)
            // setISChage(c=>!c)
            // router.push("/")
            setF(f=>!f);
        //   }else{
        //     setLoginPass(""); 
        //     // toast.error('Incorrect Username or Password!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
          
        
        })
        .catch(err => {console.log(err)});
        ;
    }


      useEffect(() => {
        console.log("Fetching comments...");
        
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/issues/${params.name}`, {
                method: 'GET',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({iss:issue}),
              })
              .then(async (res)=>{
                  const data = await res.json();
                //   console.log(data);
                  setAllCom(data);
                  
              })
              .catch(err=>{console.log(err)});
        }
        fetchData();
      },[f]);

    //   console.log(issue.author);
    
    // const fetchData = async () => {
    //     const response = await fetch('/issues');
    //     const jsonData = await response.json();
    //     setAllCom(jsonData);
    // };
  return (
    <div>
    {!allCom &&  <span className="loading loading-ring w-1/6 mx-auto my-auto z-30 absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"></span>
        } 
    {allCom && <div className='h-screen overflow-y-auto pb-20'>
        <div className='top-20'>
        {/* <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// transition: Bounce,
/> */}
{/* Same as */}
{/* <ToastContainer /> */}
        <div className="card w-3/5 bg-base-100 shadow-xl relative mx-auto top-20">
        {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
            <div className="card-body">
                <h2 className="card-compact absolute ">Issue-{params.name}</h2>
                {issue.author && (user.username == issue.author.username) &&<button className="btn btn-ghost shadow-xl absolute right-5" onClick={()=>{document.getElementById('my_modal_3').showModal()}}>Edit</button>}
                <h2 className="card-title text-2xl mx-auto">{issue.title}</h2>
                <p>{issue.body}</p>
                <div className="card-actions justify-end">
                </div>

            </div>
        </div>
        <dialog id="my_modal_3" className="modal  z-40 absolute left-1/2 top-1/2 h-fit translate-x-[-50%] translate-y-[-50%] mx-auto my-auto">
            <div className="modal-box">
                {/* <form method="dialog"  onSubmit={(e)=>{handleFormSubmit(e)}}> */}
                <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg mx-auto flex justify-center">Edit Issue</h3>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Title</span>
                    </label>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title for issue" className="w-full input input-bordered input-primary" />
                    {/* {errors.name && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.name}</p>}  */}
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Description</span>   
                    </label>
                    <textarea rows="4" value={body} onChange={e=>setBody(e.target.value)} placeholder="A more detailed description..." className="w-full rounded bg-base-100 border border-primary input-primary p-2" />
                    {/* {errors.name && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.name}</p>}  */}
                </div>

                <span className="text-base label-text">Upload image (optional)</span>
                <div class="flex items-center justify-center w-full mt-1 mb-2">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" value={file} onChange={()=>setFile([...file])} accept="image/png, image/gif, image/jpeg" class="hidden" />
                        {/* {file.map((file,id) =>{
                            c++;
                            const imgStr = 'image'+c;
                            return <img id={imgStr} />
                        }) 
                    } */}
                    </label>
                </div> 
                <div className='inline-flex w-full'>
                    <div className="dropdown  dropdown-top ">
                        <div tabIndex={0} role="button" className="btn btn-ghost mr-2">Priority {prior}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={()=>{setPrior("P1")}}><a>P1</a></li>
                            <li onClick={()=>{setPrior('P2')}}><a>P2</a></li>
                            <li onClick={()=>{setPrior('P3')}}><a>P3</a></li>
                            <li onClick={()=>{setPrior('P4')}}><a>P4</a></li>
                            <li onClick={()=>{setPrior('P5')}}><a>P5</a></li>
                            {/* <li><a>Item 2</a></li> */}
                        </ul>
                    </div>
                    
                    <button type='button' className={`btn  btn-outline ${status?'btn-warning':'btn-success'}`} onClick={()=>{setStatus(c=>!c)}}>Status: {status?'Resolved':'Pending'}</button>
                    <button type='submit' onClick={(e)=>{handleFormSubmit(e)}} disabled={!title || !body}  className='btn btn-primary ml-auto'>Submit</button>
                </div>
                </form>
                {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            </div>
        </dialog>
        <div className="card w-3/5 bg-base-100 shadow-xl relative mx-auto top-20 my-1 mb-20 min-h-[50vh]">
            {allCom && allCom.map(com=>{
                prevAuth = currentAuth;
                currentAuth = com.author.username;
                if(f2 && prevAuth === currentAuth) setF2(false);
                return(
                    <div>
                        <div>
                        <div className={`chat ${user.username==com.author.username?'chat-end':'chat-start'} mx-[15%] relative ${com.replyAuth.length>0 && `card ${user.username==com.author.username?'bg-violet-900':'bg-slate-700'} w-fit float-end`}`}>
                            {/* <div className='card bg-base-100'> */}
                            {com.replyAuth.length > 0 && 
                                <div className={`card bg-violet-950 z-10 ml-2 p-0`}>
                                    <div className='card-header px-5'>
                                        {com.replyAuth}
                                    </div>
                                    <div className='card-body pl-5 py-2'>
                                        {com.replyBody}
                                    </div>
                                </div>
                            }
                            {/* </div> */}
                        {/* <script>prevAuth = com.author.username; console.log(prevAuth); */}
                        {/* </script> */}
                            <div className={`chat-bubble pr-8 ${com.author.username!==prevAuth ?'mt-4 mb-[-2px]':'my-[-3px]'} ${user.username==com.author.username&&'bg-violet-900'}`}>
                            {com.author.username!==prevAuth && <div className="chat-header">
                                {com.author.username}
                                {/* <time className="text-xs opacity-50">12:45</time> */}
                                </div>
                            }   
                                <div className='chat-header absolute top-2 right-2 h-4'>
                                    <div className="dropdown dropdown-hover h-4">
                                    <span tabIndex={0} role="button" className="btn p-0 btn-ghost h-4 min-h-4">{'>'}</span>
                                    <ul tabIndex={0} className="dropdown-content  my-[-6px] p-2 menu shadow bg-slate-700 rounded-box w-fit z-30">
                                        <li onClick={()=>{setReply(com); setEdit(null)}}><a>Reply</a></li>
                                        <li onClick={()=>{setEdit(com); setReply(null)}}><a>Edit</a></li>
                                    </ul>
                                    </div>
                                </div>
                                    {com.body}
                                {com.isEdited && <p className='italic text-xs ml-auto'>Edited</p>}
                            </div>
                            
                        {com.author.username!==prevAuth && <div className={`chat-image avatar absolute ${user.username==com.author.username?'left-0':'left-[-35px]'}`}>
                            <div className="w-10 rounded-full">
                            {/* <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                            {com.author.photos?<img src={com.author.photos} />:<svg className="absolute w-10 h-10 text-gray-400 bg-base-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>}
                            </div>
                        </div>  
                        }   
                        </div>
                        </div>
                    </div>  
                )
            })
            }

            </div>

        </div>
        <div>

        <form className='' onSubmit={edit?handleEdit:handleSubmit}>

                <label className="form-control w-3/5 absolute bottom-10 left-1/2 translate-x-[-50%] z-20">

                <div className={(reply!=null||edit!=null) && 'card bg-slate-700 h-fit p-1 z-30'}>
                    {reply && 

                    <div className='bg-base-100 card'>
                    <button onClick={()=>{setReply(null)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 w-fit h-fit">✕</button>
                    <p className='card-header pt-5 ml-5'>{reply.author.username}</p>

                    <p className='card-body p-0 pl-5 mb-2 ml-5'>{reply.body}</p>
                    </div>
                    }
                    {edit && 

                    <div className='bg-base-100 card'>
                    <button onClick={()=>{setEdit(null)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 w-fit h-fit">✕</button>
                    <p className='card-header pt-5 ml-5 italic'>Edit</p>

                    <p className='card-body p-0 pl-5 mb-2 ml-5'>{edit.body}</p>
                    </div>
                    }
                    <div className='flex-row flex'>
                        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} placeholder={(user==null || user.username==null) ? 'Please Login to comment':`Comment to contribute`} className="input input-bordered w-4/5 mx-auto " />
                        <div className="label">
                            {/* <span className="label-text-alt">Bottom Left label</span>
                            <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                            <button className="btn btn-primary" type="submit" disabled={user==null || user.username==null || comment == ""}>Submit</button>
                    </div>    
                </div>
                </label>
        </form>
        </div>
    </div>}
    </div>
  )
}

// export default IName
