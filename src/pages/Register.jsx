import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  return (
    <div className='w-full h-screen bg-primaryDark flex justify-center items-center text-center flex-col'>
    <div className="text-center">
        <h2 className='font-bold text-4xl text-slate-200'>For Application of trader Accounts please contact us</h2>
        <div className="flex flex-col text-slate-200">
        <span>@harvestify@gmail.com</span>
        <span>or</span>
        <span>Contact us +63 9758975701</span>
        </div>
        
        {/* <p className='text-sm text-slate-300'>if this is a mistake please contact the <span>harvestify@gmail.com</span></p>      */}
    </div>
    {/* <Link to={'/'} className='mt-10 px-2 py-1 bg-red-600 font-semibold rounded-md'>Go Back To Home</Link> */}
</div>
  )
}

export default Register