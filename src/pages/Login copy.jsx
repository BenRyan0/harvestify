import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";


const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e)=>{
        e.preventDefault()
        console.log(state)
    }
  return (
        <div className="bg-[url('http://localhost:3001/images/BG_10.jpg')] bg-cover h-screen w-full">
            <div className="w-full h-screen flex justify-center items-center">
                <div className="grid grid-cols-2 md-lg:grid-cols-1 md-lg:w-full w-[60%] h-[600px] mx-auto bg-[url('http://localhost:3001/images/BG_05.png')] bg-white bg-object-cover rounded-lg shadow-xl customBG">
                    <div className="px-8 py-8 flex flex-col justify-center">
                        <h2 className='text-center w-full text-3xl text-[#208515] font-bold'>Login</h2>
                        <div className="">
                        <form onSubmit={login} className=''>
                            <div className="yflex flex-col gap-1 mb-2">
                                <label className='text-[#208515]' htmlFor="email">Email</label>
                                <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='email' name='email' placeholder='Email' />
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                                <label className='text-[#208515]' htmlFor="password">Password</label>
                                <input onChange={inputHandle} value={state.password}  type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='password' name='password' placeholder='Password' />
                            </div>
                            <button className='px-8 w-full py-2 mt-4 bg-accent hover:shadow-lg hover:shadow-accent/10 rounded-md font-bold text-white'>Login</button>
                        </form>

                        <div className="w-full my-2 text-center sm:text-xs text-sm text-[#208515]">
                            <p>Don't Have an Account yet? <Link to='/register' className='font-semibold text-[#208515]'>Signup</Link> </p>
                        </div>
                        {/* <div className="flex justify-center items-center py-2 gap-2">
                            <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                            <span className='font-bold text-sm text-slate-600'>Or</span>
                            <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                        </div> */}
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center md-lg:hidden block text-center flex-col">
                        <div className="mx-14 text-[#208515]">
                        <h2 className='font-bold text-4xl'>Welcome Back!</h2>
                        <p className='text-sm'>It's prime harvest season. Let's get your crops connected with the right buyers on the Agri market.</p>
                        </div>

                        <p className='text-xs underline text-[#208515] mt-10'><a className='' href="http://localhost:3001/">Just browse without an account</a></p>
                     
                        {/* <img className='w-full h-full bg-green-600 rounded-r-lg' src="/images/batong_guy.png" alt="" /> */}
                    </div>

                </div>
                

            </div>
        </div>
 
  )
}

export default Login