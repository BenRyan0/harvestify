import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import {Link, useNavigate} from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import FadeLoader from 'react-spinners/FadeLoader'
import {useSelector, useDispatch} from 'react-redux'
import {trader_login,messageClear,redirectClear} from '../store/reducers/authReducer'
import { useTranslation } from 'react-i18next';
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loader, successMessage, errorMessage, userInfo,redirect} = useSelector(state => state.auth)


    // useEffect((redirect)=>{
    //     if(redirect === 1){
    //         navigate('/pending')
    //     }
    // },[redirect])
    
    const {t} = useTranslation()
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
        // console.log(state)
        dispatch(trader_login(state))
    }

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }if(userInfo){
            navigate('/')
        }if(redirect === 1){
            navigate('/pending')
            dispatch(redirectClear())

        }
    },[successMessage, errorMessage])

    const [showPassword, setShowPassword] = useState(false);

    const hide = true;
  return (
    <div className="">
         {
            loader && <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
                <FadeLoader/>
            </div>
        }
        <Headers hideSBar={hide} hideCBar={hide}/>
        {/* <Headers hideSearchBar={}/> */}
            <div className="bg-slate-200 mt-4">
                <div className="w-full justify-center items-center py-10">
                    <div className="grid lg:grid-cols-1 grid-cols-2 md:w-[90%] w-[60%] mx-auto bg-white rounded-md justify-center items-center">
                        <div className="px-8 py-8">
                            <h2 className='text-center w-full text-xl text-slate-600 font-black'>{t("login")}</h2>
                            <div className="">
                            <form onSubmit={login} className=''>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="email">Email</label>
                                    <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='email' name='email' placeholder='Email' />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 relative">
                                    <label className='text-[#208515]' htmlFor="password">Password</label>
                                                                    <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md focus:border-accent overflow-hidden'    type={showPassword ? "text" : "password"} name='password' placeholder='password' id='password' required/>
                                                                {/* <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-accent overflow-hidden' type="password" name='password' placeholder='password' id='password' required/> */}
                                                                
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    className="ml-2 text-gray-600 hover:text-gray-500 pr-2 absolute right-2 top-6 bottom-0"
                                                                >
                                                                    {showPassword ? <LuEye  size={19} /> : <LuEyeClosed size={16} />}
                                                                    {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                                                                </button>                                </div>
                                <button className='px-8 w-full mt-4 py-2 bg-accent hover:shadow-lg hover:shadow-accent/10 rounded-md font-bold text-white'>{t("login")}</button>
                            </form>
                            <div className="mt-6 w-full text-center flex flex-col">
                                <p className='text-sm text-slate-600 -mb-2 pb-1'>{t("dontHaveAccount")} 
                                </p>
                                <span className='text-sm font-semibold text-primaryDark'><a href="https://harvestify-dashboard.vercel.app/trader/register">
                                {t("applyForTraderAccount")}</a></span>
                                {/* <span className='text-sm font-semibold text-primaryDark'><a href="http://localhost:3000/trader/register">Apply for Trader Account</a></span> */}
                                
                            </div>
                            <div className="mt-6 pt-2 w-full text-center flex flex-row justify-between border-t-2">
                                {/* <p className='text-sm text-slate-600 -mb-2 pb-1'></p> */}
                                {/* <span className='text-sm font-semibold text-primaryDark'><Link to="/register">Farmer Login</Link></span> */}
                                <span className='text-sm font-semibold text-primaryDark'><a href="https://harvestify-dashboard.vercel.app/login">{t("farmerLogin")}</a></span>
                                <span className='text-sm font-semibold text-primaryDark'><a href="https://harvestify-dashboard.vercel.app/register">{t("becomeSellerFarmer")}</a></span>
                            </div>
                            {/* <div className="mt-6 w-full text-center">
                                <p className='text-sm text-slate-600 -mb-2 pb-1'>Don't Have An Account Yet?</p>
                                <span className='text-sm font-semibold text-primaryDark'><Link to="/register">Fill Up An Application</Link></span>
                            </div> */}
                            </div>
                        </div>
                        <div className="w-full h-full py-4 pr-4 lg:hidden block">
                            <img className='w-full h-full rounded border-2 border-slate-300' src="/images/Login_Register.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
    </div>

  )
}

export default Login