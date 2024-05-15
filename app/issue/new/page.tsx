'use client'
import { DataContext } from '@/app/layout';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const NewIssue = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [prob, setProb] = useState(typeof window !== "undefined"&&sessionStorage.getItem('prob')!=null?sessionStorage.getItem('prob'):"" );
    const [isFormValid, setIsFormValid] = useState(false); 
    const [file, setFile] = useState([]);
    const [prior, setPrior] = useState("P1");
    const [asked, setAsked] = useState(typeof window !== "undefined"&&sessionStorage.getItem('ask')!=null?sessionStorage.getItem('ask'):false );
    const time = new Date();
    const router = useRouter();

    const { user, issues, setIssues,setISChage, setUChange } = useContext(DataContext);
    const handleFormSubmit = async(event) => {
        // event.preventDefault();
        
        const tid = Math.random().toString(36).substring(2, 8 + 2);
        // console.log(tid);
        const response = await fetch(`http://localhost:4000/issues/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({title:title, author:user,body:desc, priority:prior, id:tid }),
        })
        .then (async res => {
            // const data= await res.json();

        //   if(data.Issues){
        //     // toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
        //     setIssues(data.Issues)
            setISChage(c=>!c)
            setUChange(c=>!c)
            router.push("/")
        //   }else{
        //     setLoginPass(""); 
        //     // toast.error('Incorrect Username or Password!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
          
        
        })
        .catch(err => {console.log(err)});
        ;
    }
    var c=0;

    // reader.onload = (event) => {
    //     document.getElementById('previewImage').src = event.target.result;
    //   };
    // }

    return (
    <div className='relative w-screen h-screen pt-20'>
        <div className="chat chat-start mx-[15%] relative">
            <div className="chat-header">
                Synapse Bot
                {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div className="chat-bubble mt-1">
                How can I help you?
            </div>
            <div className="chat-bubble mt-1">I'll try to find if there are similar solved issues</div>
            <div className="chat-bubble mt-1">If not, you can raise a new issue ticket!</div>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>  
        </div>
        {asked&&<div className="chat chat-end mx-[15%]">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <div className="chat-header"> 
            Admin
            {/* <time className="text-xs opacity-50">12:46</time> */}
        </div>
        <div className="chat-bubble bg-purple-900 text-white">{prob}</div>
        <div className="chat-footer opacity-50">
            Seen at {time.getHours()}:{time.getMinutes()}
        </div>
        </div>
        }
        <div className=' flex justify-center mt-4'>
            {/* <button className='btn btn-primary text-nowrap w-fit relative'>
                Raise Issue anyway
            </button> */}
            {!asked ? <button className="btn btn-primary" onClick={()=>{setDesc(prob); document.getElementById('my_modal_3').showModal()}}>Raise Issue Anyway</button>:
            <button className="btn btn-primary" onClick={()=>{setAsked(false); setProb("");}}>Raise Another Issue</button>}
        </div>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog" onSubmit={(e)=>{handleFormSubmit(e)}} >
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg mx-auto flex justify-center">Raise New Issue</h3>
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
                <textarea rows="4" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="A more detailed description..." className="w-full rounded bg-base-100 border border-primary input-primary p-2" />
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
            <div className='inline-flex'>
                <div className="dropdown dropdown-right dropdown-top ">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">Priority {prior}</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={()=>{setPrior("P1")}}><a>P1</a></li>
                        <li onClick={()=>{setPrior('P2')}}><a>P2</a></li>
                        <li onClick={()=>{setPrior('P3')}}><a>P3</a></li>
                        <li onClick={()=>{setPrior('P4')}}><a>P4</a></li>
                        <li onClick={()=>{setPrior('P5')}}><a>P5</a></li>
                        {/* <li><a>Item 2</a></li> */}
                    </ul>
                </div>
                <button type='submit' disabled={!title || !desc} className='btn btn-primary right'>Submit</button>
            </div>
            </form>
            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        </div>
        </dialog>
            {/* <div className="chat-footer opacity-50">
                Delivered
            </div> */}
        
        <label className="form-control w-4/5  absolute bottom-10 left-1/2 translate-x-[-50%]">
        {/* <div className="label">
            <span className="label-text ">Give brief decription of issue</span> */}
            {/* <span className="label-text-alt">Top Right label</span> */}
        {/* </div> */}
        <div className='flex-row flex'>
            <input type="text" value={prob} disabled={asked} onChange={e=>{setProb(e.target.value); sessionStorage.setItem('prob', prob)}} placeholder={user&&user.username&&user.username.length>0?`Give brief description of your problem`:'Please Login to Raise Issue'} className="input input-bordered w-4/5 mx-auto " />
            <div className="label">
                {/* <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span> */}
            </div>
                <button className="btn btn-primary " type='submit' disabled={asked || prob==null ||prob.length==0} onClick={()=>{setAsked(true); sessionStorage.setItem('ask', asked)}}>Submit</button>
        </div>
        </label>
    </div>
  )
}

export default NewIssue
