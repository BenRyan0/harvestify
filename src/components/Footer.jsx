import React from 'react'
import {Link} from 'react-router-dom'


import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";


const logo = "/images/Harvestify_logo_full.png"
const Footer = () => {
  return (
   <footer className='bg-[#F3F6Fa'>
        <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
            <div className="w-3/12 lg:w-4/12 sm:w-full">
                <div className="flex flex-col gap-3">
                    <img className='w-[220px] h-[70px]' src={logo} alt="" />
                    <ul>
                        <li>Address : W6WV+M68, Pres. Diosdado P. Macapagal Hwy, Mati, Davao Oriental</li>
                        <li>Phone : +63 9758975701</li>
                        <li>Email : harvestifyph@gmail.com</li>
                    </ul>
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
                                {/* <li>
                                    <Link>Harvestify Blog</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li> */}
                            </ul>
                            <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                {/* <li>
                                    <Link>About Us</Link>
                                </li>
                                <li>
                                    <Link>Harvestify Blog</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li>
                                <li>
                                    <Link>About Us</Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-4/12 lg:w-full lg:mt-6">
                <div className="w-full flex flex-col justify-start gap-5">
                    <h2 className='text-base font-semibold mb-2'>Join Our Newsletter</h2>
                    <span className='text-sm'>Get Email Updates on Market trends</span>
                    <div className="h-[50px] w-full bg-white border relative">
                        <input className='h-full bg-transparent w-full px-3 outline-0' placeholder='Enter your Email' type="text" />
                        <button className='h-full absolute right-0 bg-accent text-white uppercase px-4 font-bold text-sm'>Subscribe</button>
                    </div>
                    <ul className='flex justify-start items-center gap-3'>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-accent hover:text-white flex justify-center items-center bg-white rounded-md' href="/" ><FaFacebookSquare /></a>
                        </li>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-accent hover:text-white flex justify-center items-center bg-white rounded-md' href="/" >
                            <RiTwitterXFill />
                            </a>
                        </li>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-accent hover:text-white flex justify-center items-center bg-white rounded-md' href="/" ><FaSquareInstagram /></a>
                        </li>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-accent hover:text-white flex justify-center items-center bg-white rounded-md' href="/" >
                                <FaLinkedin /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto border-b py-3 text-center">
            <span className='text-sm'>&copy; 2024 <span className='italic'>Harvestify</span>. All Rights Reserved.</span>
        </div>
        {/* <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[95px] right-2 bg-white rounded-full p-2">
            <div className="w-full h-full flex gap-2 flex-col justify-center items-center">
                <Link>asdasdasdasd</Link>
            </div>
        </div> */}
   </footer>
  )
}

export default Footer