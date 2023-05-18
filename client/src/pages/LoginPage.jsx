import React from 'react'
import logo from '../assets/gym_person.png'
import { useState } from 'react'
function LoginPage() {
    const [isRegistrationForm, setISRegistrationForm]= useState(true)
    const notRegisterButtonHandler =()=>{

    }
  return (
    <div className=' max-w-[1440px] flex justify-center items-center  mx-auto h-screen'>
        <div className='w-screen flex h-4/5 items-center '>
            <form className='w-full bg-gray-200 h-full rounded-l-3xl min-w-min'>
                <div className='w-full h-full px-32 flex flex-col justify-center items-center'>
                <label className='w-full h-1/3 pt-10' >
                    <a href="logo" className='flex items-center justify-center gap-1 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <span>GymMate</span>
                    </a>  
                    <div className=' text-3xl mt-5 '>
                        LOGIN
                    </div>

                </label>
                <label className='h-1/3 w-full flex flex-col items-center justify-center min-w-min'>
                    <input type="email" placeholder='email' className='w-full' />
                    <input type="password" placeholder='password' className='w-full'/>
                    <button className=' bg-orange-400 w-full'>Login</button>
                </label>
                <label className='h-1/3 '>
                    <a href="#" className=" w-full h-full">
                        <img src={logo} alt="gym" className='w-full h-full object-cover object-center'/>
                    </a>
                </label>
                </div>
              
            </form>
            <form className='w-full bg-stone-700 h-full flex flex-col items-center justify-center rounded-r-3xl'>
            <div className='w-full h-full px-32 flex flex-col justify-center items-center'>
                <label className='w-full h-1/3 pt-10' >
                </label>
                <label className='h-1/3 w-full flex flex-col items-center justify-center min-w-min'>
                    <div className=' text-3xl mt-5 '>
                    Not Registered?    
                    </div>
                    <div className=' text-3xl my-5 '>
                    Click below    
                    </div>
                    <button onClick={notRegisterButtonHandler} className=' bg-orange-400 w-full'>Register</button>
                </label>
                <label className='h-1/3 '>
                </label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
