import React from 'react'
import Ratings from '../Ratings';
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
import { RiMessage3Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";


const Clusters = ({styles, clusters}) => {
  return (
    <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 lg:grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-1'} gap-3`}>
      {
       clusters.map((p,i)=>
        <Link to={`/clusters/cluster-details/${p._id}`} key={i} className={`bg-red-600 flex transition-all duration-1000 hover:shadow-md shadow-sm hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start':'justify-start items-center  md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
            <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden':'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
             <div className="absolute top-2 right-2 ">
              {
                p.sellerType ? 
                (
                  <div className="flex flex-col items-end justify-end gap-2">
                    <div className="flex justify-center items-center gap-2 font-bold text-base text-slate-100 bg-primaryDark/80 rounded-md px-2 py-2">Seller Type: <span>{p.sellerType}</span></div>
                    {
                      p.memberCount > 1 ? 
                      (
                        <div className="flex justify-center items-center gap-2 font-bold text-base text-slate-100 bg-primaryDark/80 rounded-md px-2 py-2">
                          Members: {p.memberCount} <FaUsers /></div>
                      )
                      :
                      (
                        <div className=""></div>
                      )
                    }
                   
                  </div>
                )
                :
                (
                <div className=""></div>
                )
              }
             </div>
                <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-fill' src={p.associationImage} alt="clusters images" />
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
              
                    <li>
                      <Link to={`/clusters/cluster-details/${p._id}`} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                          <FaEye />
                      </Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/chat/${p._id}`} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                          <RiMessage3Line />
                      </Link>
                    </li>

                  </ul>
            </div>
            <div className="py-3 text-slate-600 px-2 w-full">
              <div className="flex justify-between">
                <h2 className='' id='listing_name'>{p.associationName}</h2>
                <div className="flex gap-3 text-xl">
                 
                  
                 
                </div>
              </div>

              <div className="flex justify-between flex-row items-center gap-[2pxz] text-sm">
                <div className="flex justify-end items-center flex-row">
                  {/* <div className="">
                    <span className='font-bold text-base'>&#8369;</span>
                    <span className='text-base font-bold'>{p.price}</span>
                    <span className='text-base font-bold'>/{p.unit}</span>
                  </div> */}

                  {/* <div className="pl-1">
                    <span className='font-extrabold'>&#64;</span>
                    <span className='text-base font-bold'>{p.expectedHarvestYield}</span>
                    <span className='text-base font-bold'>{p.yieldUnit}</span>
                  </div> */}
                 
                  
                </div>
                {/* <div className="text-base font-bold text-primaryDark ">
                   <span className='pr-1'>&#8369;</span> 
                   <span className=''>{p.totalPrice}</span>
                </div> */}
               

              </div>
              <div className="flex gap-1">
                {
                  p.profileImage? 
                  <img className='h-[50px] bg-primaryDark/50 rounded-full' src={p.profileImage} alt="" />
                  : <img className='h-[50px]  rounded-full' src="/images/Assests/user_profile.png" alt="" />

                }
                <div className="w-full">
                  <div className="flex justify-between ">
                    <h1 className='text-sm font-semibold'>{p.firstName} {p.lastName}</h1>
                    <div className="flex items-center">
                      <Ratings ratings={p.rating} />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span><FaPhone /></span>
                    <span className='text-sm'>{p.phoneNumber}</span>
                  </div>

                </div>
              </div>

              <div className="flex justify-center gap-1 py-3 items-center flex-col">
                <div className="w-full">
                  <h2>Categories:</h2>
                </div>
                <div className="w-full flex justify-center items-center gap-1 flex-wrap">
                <div className="w-full flex justify-center items-center gap-1 flex-wrap">
                  {p.categories?.length > 0 ? (
                    p.categories.map((c, i) => (
                      <span key={i} className="bg-primaryDark text-slate-200 py-1 px-2 rounded-md">
                        {c}
                      </span>
                    ))
                  ) : (
                    <h2>Seller Has not Had Any Listings Yet</h2>
                  )}
                </div>

                </div>
              </div>
              <div className="flex justify-center gap-1 py-1 items-end">
                <span><IoLocationSharp size='20px' /></span>
                <span className='text-sm'>{p.associationloc_street} {p.associationloc_barangay} {p.associationloc_municipalitycity} {p.associationloc_province}</span>
              </div>
            </div>
            
        </Link>
       )}
    </div>
  )
}

export default Clusters