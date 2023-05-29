import React from 'react'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { motion } from 'framer-motion';

function LoginPage() {
    const [isRegistrationForm, setISRegistrationForm]= useState(true)
    const toggleForm =()=>{
        setISRegistrationForm(!isRegistrationForm)
    }
  return (
    <div className=' max-w-[1440px] flex justify-center items-center  mx-auto h-screen'>
            {
                isRegistrationForm?(
                    <motion.div 
                    className='w-screen flex h-4/5 items-center '
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    <LoginForm toggleForm={toggleForm}/>
                    </motion.div>
                ):(
                    <motion.div 
                    className='w-screen flex h-4/5 items-center '
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    <RegisterForm toggleForm={toggleForm}/>
                    </motion.div>
                )
            }
        </div>
  )
}

export default LoginPage