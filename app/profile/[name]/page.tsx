'use client'
import { DataContext } from '@/app/layout';
import React, { useContext, useEffect, useState } from 'react'
import acc from '../../acc.png'
import Link from 'next/link'

const page = ({params}) => {
  const { user, setIss} = useContext(DataContext);
//   console.log(params);
    const [prof, setProf] = useState({});
    const [name, setName] = useState("");
    const [desk, setDesk] = useState("");
    const [pic, setPic] = useState({});

useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user");
      
        const response = await fetch('http://localhost:4000/user/getProf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name:params.name }),
        })
        .then (async res => {
            // setISChage(c=>!c)
            const jsonData = await res.json();
            // console.log(jsonData.user);
          
            setProf(jsonData.user);
            // router.push("/")
          })
          .catch(err => {console.log(err)});    
          
      }
      
      fetchData();
    }, [1]);

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
    
      };
    
//   console.log(user);
  return (
    <div>
        {!(prof && prof.username) && <span className="loading loading-ring w-1/6 mx-auto my-auto z-30 absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"></span>
        }
        { prof && prof.username &&
        <div className='grid grid-cols-8 gap-4 h-screen w-screen overflow-y-auto'>
        <div className='md:absolute md:w-1/5 card col-start-2 md:col-start-1 col-end-8 md:col-end-3 bg-base-300 h-4/5 md:h-3/5 mt-32 md:mt-0 md:top-1/2 md:translate-y-[-50%] md:ml-5 '>
            <div className="avatar grid">
                <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto mt-10">
                    {prof && prof.photos?<img src={prof.photos} />:<img src={acc} />}
                </div>
                <h1 className="mx-auto mt-4 text-2xl z-20 relative text-white">{prof && prof.username}</h1>
                <button className="btn  btn-ghost w-fit mx-auto mt-3">Edit Profile</button>

                <h1 className="mx-auto mt-4 text-2xl z-20 relative text-white">{prof && prof.desk}</h1>
                {/* <div> */}
                    {prof && prof.contributed && <h1 className="mx-auto mt-4 text-md z-20 relative text-white">Issues Contributed: {prof.contributed.length}</h1>}
                    {prof && prof.issues && <h1 className="mx-auto mt-4 text-md z-20 relative text-white">Issues Raised: {prof.issues.length}</h1>}
                {/* </div> */}
            </div>  
        </div>
            <div className='col-start-1 md:col-start-4 col-end-8 mt-32 w-screen md:w-full'>
                <h1 className='text-3xl z-10 text-white mx-auto relative '>Reported Issues</h1>
                {prof && prof.issues && !(prof.issues.length>0) &&  <h1 className='text-2xl z-20 text-white mx-auto relative animate-pulse'>No Issues Reported yet</h1>}
                {prof&&   prof.issues&&
                prof.issues.map(issue => {
                        return (
                            <div className="card w-4/5  bg-base-100 shadow-md shadow-base-100 mx-auto md:mx-0 my-4" onClick={()=>{setIss(issue)}}>
                            <Link href={`/issue/${issue.id}`}>
                                <span class="absolute flex h-3 w-3 right-0">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <div className="card-body overflow-x-hidden">
                                <h2 className="card-title">{issue.title}</h2>
                                <span className='absolute right-10 ml-auto w-fit animate-pulse'>{issue.priority}</span>

                                <div className='  h-16 overflow-hidden pb-4 text-ellipsis '>{issue.body}</div>
                                {/* <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div> */}
                                </div>
                            </Link>
                            </div>
                            // <div className="card bg-base-100 shadow-xl">
                            //     <div className="card-body">
                            //     <h2 className="card-title">{issue.title}</h2>
                            //     <p>{issue.desc}</p>
                            //     {/* <div className="card-actions justify-end">
                            //         <button className="btn btn-primary">Buy Now</button>
                            //     </div> */}
                            //     </div>
                            // </div>
                            )
                        })
                    }
                <h1 className='text-3xl z-20 text-white mx-auto relative '>Contributed Issues</h1>
                {prof && prof.contributed && !(prof.contributed.length>0) &&  <h1 className='text-2xl z-20 text-white mx-auto relative animate-pulse'>No Contributed Issues yet</h1>}
                {/* {user.contributed && user.contributed.length>0 &&  <h1 className='text-xl'>Contributed Issues</h1>} */}
                {prof && prof.contributed&&
                    prof.contributed.map(issue => {
                        return (
                        <div className="card w-4/5 bg-base-100 shadow-md shadow-base-100 mx-auto md:mx-0 my-4" onClick={()=>{setIss(issue)}}>
                        <Link href={`/issue/${issue.id}`}>
                            <span class="absolute flex h-3 w-3 right-0">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <div className="card-body overflow-x-hidden">
                            <h2 className="card-title">{issue.title}</h2>
                            <span className='absolute right-10 ml-auto w-fit animate-pulse'>{issue.priority}</span>

                            <div className='col-end-11 col-start-7  h-16 overflow-hidden pb-4 text-ellipsis max-w-1/3 '>{issue.body}</div>
                            {/* <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div> */}
                            </div>
                        </Link>
                        </div>
                        )
                    })
                }

                {/* <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p> */}
                    {/* <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                    {/* </div>
                </div> */}
            </div>
        </div>
        }
    </div>
  )
}

export default page
