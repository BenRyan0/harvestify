import React from 'react'
import {Link} from 'react-router-dom'


import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";


const logo = "/images/Harvestify_logo_full.png"
const Footer = () => {
  return (
   <footer className=''>
        <div className="w-[85%] flex flex-wrap mx-auto border-b py-4 md-lg:pb-10 sm:pb-6">
            <div className="w-3/12 lg:w-4/12 sm:w-full">
                <div className="flex flex-col gap-3">
                    <img className='w-[190px] h-[50px]' src={logo} alt="" />
                   
                </div>
            </div>
            <div className="w-5/12 lg:w-6/12 sm:w-full">
                <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
                    <div>
                        {/* <h2 className='text-lg font-base mb-2'>ABOUT <span className='italic font-bold text-[#05D748]'>Harvestify</span></h2> */}
                        <div className="flex justify-between gap-[50px] lg:gap-[40px]">
                            <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                <li>
                                    {/* <Link to={'/about-us'}>About Us</Link> */}
                                </li>
                            </ul>
                            <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-4/12 lg:w-full lg:mt-6">
                <div className="w-full flex flex-col justify-start gap-5 font-base text-xs text-slate-600">
                     <ul>
                        <li>Address : W6WV+M68, Pres. Diosdado P. Macapagal Hwy, Mati, Davao Oriental</li>
                        <li>Phone : +63 9758975701</li>
                        <li>Email : harvestifyph@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto border-b py-3 text-center">
            <span className='text-xs'>&copy; 2024 <span className='italic'>Harvestify</span>. All Rights Reserved.</span>
        </div>
   </footer>
  )
}

export default Footer