'use client'
import React, { useState } from 'react'
import Button from './button';
// import Drawer from ;
    import AppDrawer from './drawer/drawer';
import Nav from './navbar/navbar';
import Drawer from './trial';

const Comps = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
        {/* <Button open={open} setOpen={setOpen}/>
        <AppDrawer open={open} setOpen={setOpen}/> */}
        <Drawer/>
        <Nav user={props.user} setUser={props.setUser}/>
        </div>
    )
}

export default Comps;
