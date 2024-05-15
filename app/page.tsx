'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import bgimg from './bg1.jpg'
import Image from 'next/image'
import { DataContext } from './layout';
import Link from 'next/link';

// const DataContext = createContext();

export default function Home({}) {
  const [data, setData] =useState(null);
  // const [resolved, setResolved] =useState([]);
  const {issues,user, setUser,setIssues, ISChange, setIss} = useContext(DataContext);
  const [opt, setOpt] = useState(0);
  const menu = ['All Issues', 'Open Issues', 'Resolved Issues', 'My Reported Issues'];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/issues');
      const jsonData = await response.json();
      
      setIssues(jsonData);
      setData(jsonData);
    };
    fetchData();
  }, [ISChange]);

  const f2=()=>{
    var req=[];
    issues && issues.map(issue=>{
      if(issue.status==false){
        req.push(issue);
      }
    })
    setData(req);
    req=[];
  };

  const f3=()=>{
    var req=[];
    issues && issues.map(issue=>{
      if(issue.status==true){
        req.push(issue);
      }
    })
    setData(req);
    req=[];
  };

  const f4 = ()=>{
    var req=[];
    issues && issues.map(issue=>{
      if(issue.author.username==user.username){
        req.push(issue);
      }
    })
    setData(req);
    req=[];
  };

  return (
    <div className='relative h-screen w-screen overflow-hidden box-border'>
      <h1 className='relative top-20 justify-center z-20 text-white text-4xl w-fit py-5 mx-auto'>{menu[opt]}</h1>
      <div className='grid grid-cols-10 gap-x-4 mt-20 relative h-4/5 md:h-4/5 overflow-y-auto md:overflow-y-hidden'>
      <ul className="menu bg-base-200 py-5 px-4 md:px-6  rounded-xl col-start-1 col-end-11 md:col-end-3 mx-auto md:mt-8 z-20 h-fit gap-2 md:gap-4 text-md md:text-base">
        <p className='mx-auto mb-2 '>Navigate</p>
        <li className={opt==0?`bg-slate-800 rounded-lg disabled pointer-events-none p-1`:'p-2 hover:animate-pulse hover:text-violet-500 cursor-pointer'} onClick={()=>{setOpt(0); setData(issues)}}>All Issues</li>
        <li className={opt==1?`bg-slate-800 rounded-lg disabled pointer-events-none p-1`:'p-2 hover:animate-pulse hover:text-violet-500 cursor-pointer'} onClick={()=>{setOpt(1); f2();}}>Open Issues</li>
        <li className={opt==2?`bg-slate-800 rounded-lg disabled pointer-events-none p-1`:'p-2 hover:animate-pulse hover:text-violet-500 cursor-pointer'} onClick={()=>{setOpt(2); f3();}}>Resolved Issues</li>
        <li className={opt==3?`bg-slate-800 rounded-lg disabled pointer-events-none p-1`:'p-2 hover:animate-pulse hover:text-violet-500 cursor-pointer'} onClick={()=>{setOpt(3); f4();}}>My Reported Issues</li>
        {/* <li><a>Item 3</a></li> */}
      </ul>
      {!(data) && <span className="loading loading-ring w-1/6 mx-auto my-auto z-30 absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"></span>
        }
      { data &&
        <div className="col-end-11 col-start-1 md:col-start-4 md:overflow-y-auto ">
        {(!data || data.length==0)&&<div className='text-2xl w-4/5 text-slate-300 mx-auto my-20 '>No Issues here yet</div> }
          
        {data.map(issue =>{
          return(
            
            <div className="translate-x-[6px] card w-4/5 sm:w-2/3 md:w-1/2 bg-base-100  hover:shadow-violet-950 hover:shadow-[10px_13px_10px_-5px] hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all shadow-md shadow-base-100 mx-auto md:mx-0 my-4" onClick={()=>{setIss(issue)}}>
              <Link href={`/issue/${issue.id}`}>
              {issue.status==true && 
              <span class="absolute flex h-3 w-3 right-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              }
              <div className="card-body overflow-x-hidden hover:animate-pulse hover:text-violet-400">
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
        })}
        {/* <div className="card w-1/2 bg-base-100 shadow-xl mx-auto md:mx-0 my-4">
              <span class="absolute flex h-3 w-3 right-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div className="card-body">
                <div className='flex flex-row w-full'>
                  <h2 className="card-title w-fit">Card title!</h2>
                  <span className='relative ml-auto w-fit animate-pulse'>P3</span>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p> */}
                {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}  
              {/* </div>
            </div>

            <div className="card w-1/2 bg-base-100 shadow-xl  my-4">
              <span class="absolute flex h-3 w-3 right-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p> */}
                {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
              {/* </div>
            </div> */}
      </div>
      }
    </div>
    </div>
  )
}