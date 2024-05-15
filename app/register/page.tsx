'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { DataContext } from '../layout'

const Register = (props) => {
    const [regName, setRegName] = useState("");
    const [regPass, setRegPass] = useState("");
    const [regPass2, setRegPass2] = useState("");
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 
    const [desk, setDesk] = useState("");
    const router = useRouter();

    const { user, setUser} = useContext(DataContext);

    const handleSubmitReg = async (e) => {
        e.preventDefault();
        // console.log("trying to post")
        
        if(regPass === regPass2) {
            const response = await fetch(`http://localhost:4000/user/getRegister`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username:regName, password:regPass, desk:desk}),
              })
              .then (async res =>  {
                // console.log("Responsing");
                // console.log(res);
                // console.log(res.json());
                const data= await res.json();
                // console.log(data);
                // console.log(res.json().loggedInUser);
                // const data = await res.json();
                // console.log(res.json().getValue());
                if(data.loggedInUser){
                    // toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
                    setUser(data.loggedInUser);
                    router.push("/")
                }})
                .catch(err => {
                    console.log(err)});
                
            // await fetch('/user/getRegister', {regname: regName,regpass: regPass})
            // .then (res => {
            //   if(res.data.loggedInUser){
            //     // toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
                
            //     setUser(res.data.loggedInUser)
            //   }else{
            //     setRegPass(""); 
            //     setRegPass2(""); 
            //     // toast.error('Incorrect Username or Password!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
            //   }
              
            // })
            // .catch(err => {console.log(err)});
        }
        // console.log(props.isLoggedIn)
    }

    // useEffect(() => {
    //     if(user && user.name){
    //         // props.setIsLoggedIn(false)
    //         // setLog(false)
    //         router.back();
    //         // <Redirect to = '/threads'/>
    //     }
    // },user);

    useEffect(() => { 
        validateForm(); 
    }, [regName, regPass, regPass2]); 
    // Validate form 
    const validateForm = () => { 
        let errors = {}; 
        if (!regName) { 
            errors.name = 'Name is required.'; 
        } 
        if (!regPass ) { 
            errors.password = 'Password is required.'; 
        } 
        if (!regPass2 ) { 
            errors.password2 = 'Password is required.'; 
        } 
        if (regPass !== regPass2 ) { 
            errors.match = "Password don't match"; 
        } 
  
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden pt-16"> 
      <div className="w-4/5 p-6 m-auto bg-base-100 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
            <form className="space-y-2"  onSubmit={handleSubmitReg}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Name</span>
                    </label>
                    <input type="text" value={regName} onChange={e=>setRegName(e.target.value)} placeholder="Name" className="w-full input input-bordered input-primary" />
                    {errors.name && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.name}</p>} 
                </div>
                {/* <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" value={regPass} onChange={e=>setRegPass(e.target.value)} placeholder="Email Address" className="w-full input input-bordered input-primary" />
                    {errors.password && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.password}</p>}     
                </div> */}
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" value={regPass} onChange={e=>setRegPass(e.target.value)} placeholder="Enter Password"
                        className="w-full input input-bordered input-primary" />
                    {errors.password && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.password}</p>}     
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="password" value={regPass2} onChange={e=>setRegPass2(e.target.value)} placeholder="Confirm Password"
                        className="w-full input input-bordered input-primary" />
                    {errors.password2 && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.password2}</p>
                    || errors.match && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.match}</p>}
                </div>
                {/* <div className='w-fit'> */}
                {/* <label className="input input-bordered flex items-center gap-2 w-fit mr-0 pr-0 flex-row"> */}
                {/* <div className=' input-bordered gap-2 flex items-center w-fit '> */}
                    {/* <span className="badge badge-info bg-gray-500">Optional</span> */}
                {/* </div> */}
                {/* </label> */} 
                {/* </div> */}
                <div className=' p-1 border-gray-600 w-full'>
                    {/* <div className=''> */}
                        <span>Desk Number</span>
                        <input type="text" className="w-1/4 input ml-2 input-bordered bg-base-100 mr-0" value={desk} onChange={(e)=>{setDesk(e.target.value)}} placeholder="Optional" />
                    {/* </div> */}
                    <button className="btn btn-primary ml-auto mr-4 right-0 float-end"  type='submit' disabled={!isFormValid}>Sign Up</button>
                </div>
                <div>

                <Link href='/login' className="mt-5 text-md text-gray-400 hover:underline hover:text-blue-600">
                    Already have an account? Login!
                </Link>
                </div>
                
            </form>
            <div class="flex items-center w-full my-4">
                <hr class="w-full" />   
                <p class="px-3 ">OR</p>
                <hr class="w-full" />
            </div>
            <div class="my-4 space-y-2">
                {/* <button aria-label="Login with Google" type="button"
                    class="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                        <path
                            d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z">
                        </path>
                    </svg>
                    <p>Login with Google</p>
                </button> */}
                <form action="http://localhost:4000/auth/google" method="get">
                    {/* <input type="hidden" name="scope" value={user} onChange={(e)=>{console.log(e); setUser(e.target.value)}}/>
                    <input type="hidden" name="response_type" value="code"/> */}
                    <button type="submit" >Login with Google</button>
                </form>
                {/* <button aria-label="Login with GitHub" role="button"
                    class="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                        <path
                            d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z">
                        </path>
                    </svg>
                    <p>Login with GitHub</p>
                </button> */}
            </div>
        </div>
    </div>
  )
}

export default Register
