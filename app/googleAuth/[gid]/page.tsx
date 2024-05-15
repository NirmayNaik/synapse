'use client'
import { DataContext } from '@/app/layout'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = ({params}) => {
    const {setUser} = useContext(DataContext);
    const router=useRouter();
    useEffect(() => {
        const fetchData = async () => {
            console.log(params.gid);
            const gid = String(params.gid);
            console.log(String(gid));
            
            const response = await fetch(`http://localhost:4000/user/getGUser?gid=${gid}`, {
                method: 'GET',
              })
              .then(async (res)=>{
                 const data = await res.json();
                //  console.log(data);  
                //  console.log(data.user);
                 
                  setUser(data.user);
                  router.push('/');
              })
              .catch(err=>{console.log(err)});
        }
        fetchData();
      },[]);

    return (
    <div className='w-screen h-screen'>
      Logging in...
       <span className="loading loading-ring w-1/6 mx-auto my-auto z-30 absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"></span>
      </div>
  )
}

export default page
