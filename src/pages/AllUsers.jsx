import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'




import { FaHeart } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { PiStackPlusFill } from "react-icons/pi";
import { IoLinkSharp } from "react-icons/io5";




const AllUsers = () => {
    const handleClick_Admin = (event) => {
        event.preventDefault(); // Prevent the default anchor click behavior
        window.location.href = 'http://localhost:3000/admin/login'; // Navigate to external URL
    };
    const handleClick_Trader = (event) => {
        event.preventDefault(); // Prevent the default anchor click behavior
        window.location.href = 'http://localhost:3001'; // Navigate to external URL
    };
    const handleClick_Farmer = (event) => {
        event.preventDefault(); // Prevent the default anchor click behavior
        window.location.href = 'http://localhost:3000/login'; // Navigate to external URL
    };



  return (
        <div className="bg-[url('http://localhost:3001/images/BG_10.jpg')] bg-cover w-full h-screen">
            <div className="w-full h-screen flex justify-center items-center flex-col">
               <div className="">
                <img className='h-[100px]' src="/images/Harvestify_logo_full.png" alt="" />
               </div>
                <div className="grid grid-cols-3 items-center justify-center md-lg:grid-cols-1 gap-5 px-3 md:w-full w-[80%] h-[450px] mx-auto bg-transparent  rounded-lg shadow-lg customBG">
                  <div className="h-[400px] ">
                        <div className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md bg-white h-full p-3">
                            <div className="relative overflow-hidden">
                            <img className='sm:w-full w-full h-[300px] object-cover rounded-md' src='/images/Trader.jpg' alt="listing_image" />
                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={handleClick_Trader} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                                <IoLinkSharp />
                            </li>
                            </ul>
                            </div>
                            <div className="py-3 text-slate-600 px-2">
                            <div className="flex justify-between">
                                <h2 className='font-bold text-lg' id='listing_name'>TRADERS</h2>
                                <div className="flex gap-3 text-xl">
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>         
                  <div className="h-[400px] ">
                        <div className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md bg-white h-full p-3">
                            <div className="relative overflow-hidden">
                            <img className='sm:w-full w-full h-[300px] object-cover rounded-md' src='/images/Admin_.jpg' alt="listing_image" />
                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={handleClick_Admin} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                                <IoLinkSharp />
                                </li>
                            </ul>
                            </div>
                            <div className="py-3 text-slate-600 px-2">
                            <div className="flex justify-between">
                                <h2 className='font-bold text-lg' id='listing_name'>DEPARTMENT OF AGRICULTURE</h2>
                                <div className="flex gap-3 text-xl">
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>         
                  <div className="h-[400px] ">
                        <div className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md bg-white h-full p-3">
                            <div className="relative overflow-hidden">
                            <img className='sm:w-full w-full h-[300px] object-cover rounded-md' src='/images/Farmer.jpg' alt="listing_image" />
                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                <li onClick={handleClick_Farmer} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-md hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                                <IoLinkSharp />
                                </li>
                               
                            </ul>
                            </div>
                            <div className="py-3 text-slate-600 px-2">
                            <div className="flex justify-between">
                                <h2 className='font-bold text-lg' id='listing_name'>Farmers/Seller</h2>
                                <div className="flex gap-3 text-xl">
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>         
                </div>

            </div>
        </div>

  )
}

export default AllUsers