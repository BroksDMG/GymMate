import React from 'react'
function LoginPage() {
  return (
    <div className=' max-w-[1440px] flex justify-center items-center  mx-auto h-screen'>
        <div className='w-screen flex h-4/5 items-center '>
            <form className='w-full bg-gray-200 h-full flex flex-col items-center justify-center rounded-l-3xl'>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password'/>
                <button className=' bg-orange-400'>Login</button>
            </form>
            <form className='w-full bg-stone-700 h-full flex flex-col items-center justify-center rounded-r-3xl'>
                <input type="email" placeholder='email' />

                <input type="password" placeholder='password'/>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
