import Link from 'next/link'
import React, { useState } from 'react'

const Drawer = (props) => {
    const [open, setOpen] = useState(false);
  return (
    <div className="drawer z-30 absolute left-0 top-0 float-start w-fit ">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    {/* <div className="drawer-content">
    <button className="btn btn-square btn-ghost drawer-button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button> 
</div> */}
    <div className="drawer-content pt-2 pl-2">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </label>
    </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 pt-10 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li className='text-lg' onClick={() => {document.getElementById("my-drawer")?.click()}}>
      <Link href ='/' > Home </Link>
      </li>
      <li className=' text-lg' onClick={() => {document.getElementById("my-drawer")?.click()}} >
        <Link href ='/about' > 
        {/* <input id="my-drawer" type="checkbox" className="drawer-toggle" /> */}
        About 
        </Link></li>
      <li className=' text-lg'><Link href ='/issue/new' onClick={() => {document.getElementById("my-drawer")?.click()}}> Raise New Issue </Link></li>
      {/* <li className=' text-lg'><Link href ='/' > About </Link></li>
      <li className=' text-lg'><Link href ='/about' > About </Link></li> */}
      
    </ul>
  </div>
</div>
  )
}

export default Drawer
