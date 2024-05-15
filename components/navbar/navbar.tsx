import { DataContext } from '@/app/layout';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const Nav = ({user,setUser}) => {
  // const data = useContext(DataContext);
  const cookie = new Cookies();

  // const {user, setUser} = useContext(DataContext);
  // console.log(data);
  useEffect(()=>{
    // console.log(user);
    // console.log(data);
  }, [user])

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async() => {
  //   if(user.googleId && user.googleId.length > 0) {
  //      window.open(
  //        `http://localhost:4000/auth/logout`,
  //        "_self"
  //      )
  //  } 
    setUser({});
    cookie.set("loginSession",{}, {path:'/', expires:(new Date(Date.now() + 24*14*60*60*1000))})
    // Router.
    // console.log(user);
    
    
  }
  return (
    <div className="navbar bg-base-300 z-20 absolute top-0 w-screen left-0">
      <div className="flex-1 pl-16 z-20">
        <Link href = '/' className="btn btn-ghost text-xl">Synapse</Link>
      </div>
      

      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>

        {!(isClient && user && user.username) ? 
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
            <Link href = '/login'>
              <svg className=" w-10 h-10  -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>

            </Link>
          </div>
        // </Link>
        :
         <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                {user.photos?<img src={user.photos} />:<svg className="absolute w-10 h-10 text-gray-400 bg-base-100 rounded-3xl p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
}
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 text-lg shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
                <Link href={`/profile/${user.username}`}>
                  Profile
                </Link> 
            </li>
            {/* <li><a>Settings</a></li> */}
            <li onClick={handleLogout}><a>Logout</a></li>  
          </ul>
        </div> 
        }
      </div>
    </div>
  )
}

export default Nav
