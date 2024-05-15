'use client'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../layout';


const Login = () => {
    const [loginName, setLoginName] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 

    const { user, setUser } = useContext(DataContext);

    // const { register, handleSubmit } = useForm();
    const router = useRouter();

    const googleAuth = () => {  
        // window.open(
        //   `http://localhost:4000/auth/google`,
        //   "_self"
        // )
        // .then(()=>{});
        const response = fetch(`http://localhost:4000/auth/getG`)
        
        console.log(response);

      };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // console.log("trying to post")
        
        await fetch('http://localhost:4000/user/getLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username:loginName, password:loginPass}),
        })

            .then (async res => {
                const data= await res.json();

              if(data.loggedInUser){
                // toast.success(`Welcome back, ${user}!`, {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
                setUser(data.loggedInUser)
                router.push("/")
              }else{
                setLoginPass(""); 
                // toast.error('Incorrect Username or Password!', {position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, toastId:1})
              }
            
            })
            .catch(err => {console.log(err)});
    
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
    }, [loginName, loginPass]); 
    // Validate form 
    const validateForm = () => { 
        let errors = {}; 
  
        if (!loginName) { 
            errors.name = 'Name is required.'; 
        } 
  
        if (!loginPass ) { 
            errors.password = 'Password is required.'; 
        } 
  
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 

    
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-4/5 p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-purple-700">Login</h1>
            <form className="space-y-4" onSubmit={handleSubmitLogin}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="Email Address" className="w-full input input-bordered input-primary" />
                    {errors.name && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.name}</p>} 
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter Password" value={loginPass}  onChange={e=>setLoginPass(e.target.value)} 
                        className="w-full input input-bordered input-primary" />
                    {errors.password && <p style={ { color: 'red', fontSize: '14px', marginBottom: '6px', }}>{errors.password}</p>}     
                </div>
                {/* <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a> */}
                <div>
                    <button className="btn btn-primary" type='submit' disabled={!isFormValid} >Login</button>
                </div>
                <br/>
                <Link href='/register' className="mt-5 text-md text-gray-400 hover:underline hover:text-blue-600">
                    Don't have an account? Register!
                </Link>
                
            </form>
            <div class="flex items-center w-full my-4">
                <hr class="w-full" />
                <p class="px-3 ">OR</p>
                <hr class="w-full" />
            </div>
            <div class="my-4 space-y-2">
                {/* <button aria-label="Login with Google" type="button" onClick={googleAuth}
                    class="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                        <path
                            d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z">
                        </path>

                    </svg>
                    <p >Login with Google</p>
                </button> */}
                    <form action="http://localhost:4000/auth/google" method="get">
                    {/* <input type="hidden" name="scope" value={user} onChange={(e)=>{console.log(e); setUser(e.target.value)}}/>
                    <input type="hidden" name="response_type" value="code"/> */}
                    <button type="submit" >Login with Google</button>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default Login

