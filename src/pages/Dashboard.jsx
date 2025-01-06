import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { FaThList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { BiSolidExit } from "react-icons/bi";
import api from '../api/api'
import { useDispatch } from 'react-redux'
import { user_reset } from '../store/reducers/authReducer'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filterShow, setFilterShow] = useState(false)
    const logout = async () => {
        try {
            const { data } = await api.get('/customer/logout')
            localStorage.removeItem('traderToken')
            dispatch(user_reset())
            // dispatch(reset_count())
            navigate('/login')
        } catch (error) {
            console.log(error.response.data)
        }
    }
  return (
    <div>
        <Headers/>
            <section className="bg-slate-100 mt-5 ">
                <div className="w-[90%] mx-auto pt-5 md-lg:block hidden">
                    <div className="">
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-primaryDark text-white'>
                           <FaThList/>
                        </button>
                    </div>
                </div>
                <div className="h-full mx-auto ">
                    <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
                        <div className={`rounded-md z-50 md-lg:absolute ${filterShow ? '-left-4':'-left-[360px]'} w-[270px] ml-4 bg-white z-[9999999] shadow-lg`}>
                            <ul className='py-2 text-slate-600 px-4 font-semibold'>
                                <li onClick={()=>setFilterShow(!filterShow)} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300 active:shadow-lg '>
                                    <span className='text-xl'><MdDashboard /></span>
                                    <Link to='/dashboard' className='block'>Dashboard</Link>
                                </li>
                                <li onClick={()=>setFilterShow(!filterShow)} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300  active:shadow-lg'>
                                    <span className='text-xl'><PiFarmFill /></span>
                                    <Link to='/dashboard/my-orders' className='block'>My Orders</Link>
                                </li>
                                <li onClick={()=>setFilterShow(!filterShow)} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300 active:shadow-lg'>
                                    <span className='text-xl'><FaRegHeart /></span>
                                    <Link to='/dashboard/my-wishlist' className='block'>Wishlist</Link>
                                </li>
                                <li onClick={()=>setFilterShow(!filterShow)} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300 active:shadow-lg'>
                                    <span className='text-xl'><MdOutlineMessage /></span>
                                    <Link to='/dashboard/chat' className='block'>Chat</Link>
                                </li>
                                <li onClick={()=>setFilterShow(!filterShow)} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300 active:shadow-lg'>
                                    <span className='text-xl'><FaLock /></span>
                                    <Link to='/dashboard/change-password' className='block'>Change Password</Link>
                                </li>
                                <li onClick={logout} className='flex justify-start items-center gap-2 py-2 px-2 hover:bg-primary/80 hover:text-white rounded-md transition-all duration-300 active:shadow-lg'>
                                    <span className='text-xl'><BiSolidExit /></span>
                                    <div className='block'>Logout</div>
                                </li>
                            </ul>
                        </div>

                        <div className="w-[calc(100%-270px)] md-lg:w-full">
                            <div className="mx-4 md-lg:mx-0">
                                <Outlet/>
                            </div>
                         </div>

                    </div>
                  
                </div>


            </section>
        <Footer/>
    </div>
  )
}

export default Dashboard