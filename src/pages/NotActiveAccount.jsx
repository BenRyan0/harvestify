import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const NotActiveAccount = () => {
  return (
    <div className='w-full h-screen bg-primaryDark flex justify-center items-center text-center flex-col'>
        <div className="text-center">
            <h2 className='font-bold text-4xl text-slate-200'>Your Account Is Not Active Yet</h2>
            <p className='text-sm text-slate-300'>if this is a mistake please contact the <span>harvestify@gmail.com</span></p>     
        </div>
        <Link to={'/'} className='mt-10 px-2 py-1 underlined hover:underline font-semibold rounded-md text-slate-300'>Go Back To Home</Link>
    </div>
  )
}

export default NotActiveAccount