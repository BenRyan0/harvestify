import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import FadeLoader from 'react-spinners/FadeLoader'

import {useSelector, useDispatch} from 'react-redux'
import { messageClear, trader_register} from '../store/reducers/authReducer'
import toast,{Toaster} from 'react-hot-toast'

const Register = () => {
    const dispatch = useDispatch()
    const {loader, successMessage, errorMessage, userInfo} = useSelector(state => state.auth)
    
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e)=>{
        e.preventDefault()
        dispatch(trader_register(state))
    }

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
            setState(
                {
                    name: '',
                    email: '',
                    password: ''
                }
            )
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage, errorMessage])
  return (
    <div className="">
        {
            loader && <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
                <FadeLoader/>
            </div>
        }
        {/* <Toaster/> */}
        <Headers/>
            <div className="bg-slate-200 mt-4">
                <div className="w-full justify-center items-center p-10">
                    <div className="grid lg:grid-cols-1 grid-cols-2 md:w-[90%] w-[60%] mx-auto bg-white rounded-md justify-center items-center">
                        <div className="px-8 py-8">
                            <h2 className='text-center w-full text-xl text-slate-600 font-black'>REGISTER</h2>
                            <div className="">
                             <form onSubmit={register} className='text-slate-600'>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="name">Name</label>
                                    <input onChange={inputHandle} value={state.name} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='name' name='name' placeholder='Name' required />
                                </div>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="email">Email</label>
                                    <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='email' name='email' placeholder='Email'  required/>
                                </div>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="password">Password</label>
                                    <input onChange={inputHandle} value={state.password}  type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='password' name='password' placeholder='Password'  required/>
                                </div>
                                <button className='px-8 w-full mt-4 py-2 bg-accent hover:shadow-lg hover:shadow-accent/10 rounded-md font-bold text-white'>Register</button>
                            </form>
                            <div className="mt-6 w-full text-center">
                                <p className='text-sm text-slate-600 -mb-2 pb-1'>Already Have An Account? <span className='text-sm font-semibold text-primaryDark'><Link to="/login">LOGIN</Link></span>
                                </p>
                            </div>
                            {/* <div className="mt-6 w-full text-center">
                                <p className='text-sm text-slate-600 -mb-2 pb-1'>Don't Have An Account Yet?</p>
                                <span className='text-sm font-semibold text-primaryDark'><Link to="/register">Fill Up An Application</Link></span>
                            </div> */}
                            </div>
                        </div>
                        <div className="w-full h-full py-4 pr-4 lg:hidden">
                            <img className='w-full h-full rounded border-2 border-slate-300' src="http://localhost:3001/images/Login_Register.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
    </div>

  )
}

export default Register