'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useRef, useEffect } from 'react';
import Drawer from 'rc-drawer';
import { InferGetStaticPropsType } from 'next';
import { getStaticProps } from 'next/dist/build/templates/pages';
// import motionProps from './motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// const OpenContext = React.createContext();

const AppDrawer = ({open, setOpen}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [showDrawer, setShowDrawer] = useState(false); // Conversion into stablecoin dialog

  const handleClickOutside= (event: { target: any; }) => {
    if (ref.current && !ref.current.contains(event.target)) 
      setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
}, []);

  const onTouchEnd = () => {
    setOpen(false);
  };
  console.log(open);
  
  const onSwitch = () => {
    setOpen(c => !c);
  };
  return (
    <div className='absolute'>
        {open && 
        <>
            <div ref = {ref}>
              <Drawer
                  open={true}
                  // defaultOpen
                  onClose={onTouchEnd}
                  afterOpenChange={(c: boolean) => {
                  console.log('transitionEnd: ', c);
                  }}
                  placement="left"
                  // width={400}
                  width="60%"
                  // Motion
                  // {...motionProps}
                  className='z-40 absolute top-0 justify-items-center  left-[-300px] pt-16 bg-gray-900 translate-x-[300px] h-screen w-1/6 transition-all ease-in duration-300'
              >
                  <Link href ='/'> Home </Link>
                  <br/>
                  <Link href ='/about'> About </Link>
                  <br/>
                  <Link href ='/issue/new'> Raise New Issue </Link>
              </Drawer>
            </div>
            <div className = 'z-30 h-screen w-screen bg-black opacity-50 absolute top-[-80px]' />
        </>
        }    
    </div>
  );
};
export default AppDrawer;