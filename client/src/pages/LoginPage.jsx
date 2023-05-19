import React from 'react'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
function LoginPage() {
    const [isRegistrationForm, setISRegistrationForm]= useState(true)
    const toggleForm =()=>{
        setISRegistrationForm(!isRegistrationForm)
    }
  return (
    <div className=' max-w-[1440px] flex justify-center items-center  mx-auto h-screen'>
        <div className='w-screen flex h-4/5 items-center '>
            {
                isRegistrationForm?(
                    <LoginForm toggleForm={toggleForm}/>
                ):(
                    <RegisterForm toggleForm={toggleForm}/>
                )
            }
        </div>
    </div>
  )
}

export default LoginPage