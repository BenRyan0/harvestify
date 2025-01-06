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



const ClusterListingList = ({styles, listing}) => {
  return (
    <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 lg:grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-1'} gap-3`}>
      {
       listing.map((p,i)=>
        <div key={i} className={`flex transition-all duration-1000 hover:shadow-md shadow-sm hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start':'justify-start items-center  md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
            <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden':'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-fill' src={p.images[0]} alt="listing images" />
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                      <FaHeart size='13px'/>
                    </li>
                    <Link className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                        <FaEye />
                    </Link>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                      <FaShoppingCart />
                    </li>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                      <FaHandshake />
                    </li>
                  </ul>
            </div>
            <div className="py-3 text-slate-600 px-2 w-full">
              <div className="flex justify-between">
                <h2 className='' id='listing_name'>{p.name}</h2>
                <div className="flex gap-3 text-xl">
                  {/* <h2>Shipping/Delivery: </h2> */}
                  {
                    p.sellerDelivery? <span><FaTruckLoading /></span> : "" 
                  }
                  {
                    p.traderPickup?  <span><FaTruck /></span> : ""
                  }
                  
                 
                </div>
              </div>

              <div className="flex justify-between flex-row items-center gap-[2pxz] text-sm">
                <div className="flex justify-end items-center flex-row">
                  <div className="">
                    <span className='font-bold text-base'>&#8369;</span>
                    <span className='text-base font-bold'>{p.price}</span>
                    <span className='text-base font-bold'>/{p.unit}</span>
                  </div>

                  <div className="pl-1">
                    <span className='font-extrabold'>&#64;</span>
                    <span className='text-base font-bold'>{p.expectedHarvestYield}</span>
                    <span className='text-base font-bold'>{p.yieldUnit}</span>
                  </div>
                 
                  
                </div>
                <div className="text-base font-bold text-primaryDark ">
                   <span className='pr-1'>&#8369;</span> 
                   <span className=''>{p.totalPrice}</span>
                </div>
               

              </div>
           

              <div className="flex justify-center gap-1 py-3 items-end ">
                <p>{p.description}</p>
              </div>
              <div className="flex justify-center gap-1 py-1 items-end">
                <span><IoLocationSharp size='20px' /></span>
                <span className='text-sm'>{p.sellerId.associationloc_barangay} {p.sellerId.associationloc_municipalitycity} {p.sellerId.associationloc_province}</span>
              </div>
            </div>
             {/* <div className="py-3 text-slate-600 px-2">
                    <div className="flex justify-between">
                        <h2 className='text-md text-slate-700 font-base' id='listing_name'>160 Rice</h2>
                        <div className="flex gap-3 text-xl">
                            <span><FaTruckLoading /></span>
                            <span><FaTruck /></span>
                        </div>
                    </div>
                  
                  <div className="flex justify-start flex-row items-center gap-[2pxz] text-sm">
                    <span className='font-bold '>&#8369;</span>
                    <span className='text-base font-bold'>20</span>
                    <span className='text-base font-bold'>/kg</span>
                   
                  </div>
                  <div className="flex gap-1">
                    <img className='h-[50px]' src="/images/farmers/farmer_01.png" alt="" />
                    <div className="w-full">
                     <div className="flex justify-between ">
                          <h1 className='text-sm font-semibold'>Melvin Ignacio</h1>
                          <div className="flex items-center">
                          <Ratings ratings={4.5}/>
                     </div>
                     </div>
                      <div className="flex gap-1 items-center">
                      <span><FaPhone /></span>
                      <span className='text-sm'>+63 9758975701</span>
                      </div>
                    
                    </div>
                  </div>
                 
                  <div className="flex justify-center gap-1 py-1 items-end">
                    <span><IoLocationSharp size='20px' /></span>
                    <span className='text-sm'>MHW2+W4J, Baganga, Davao Oriental</span>
                  </div>
                </div> */}
        </div>
       )}
    </div>
  )
}

export default ClusterListingList