import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import DaysCounter from '../DaysCounter';
import { FaPhone } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { PiStackPlusFill } from "react-icons/pi";
import Ratings from '../Ratings';
import { add_to_card , messageClear} from '../../store/reducers/cardReducer';

import dateFormat, { masks } from "dateformat";
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast'
import { IoTicketSharp } from "react-icons/io5";






const FeaturedListings = ({listings}) => {
  const {userInfo } = useSelector(state => state.auth)
  const {errorMessage,successMessage } = useSelector(state => state.card)
  
  const navigate =useNavigate()
  const dispatch = useDispatch();

  const handleAddCard = (id) => {
    if (userInfo) {
      dispatch(add_to_card({  // Ensure `add_card` here refers to the action creator, not the function name
        userId: userInfo.id,
        quantity: 1,
        listingId: id
      }));
    } else {
      navigate('/login');
    }
  };

  useEffect(()=>{
    if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
    }
},[successMessage, errorMessage])


  

// Get the current date (now)
const now = new Date();
  return (
    <div className='w-[85%] flex flex-wrap mx-auto '>
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-2xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Recent Listings</h2>
          <div className="w-[100px] h-[4px] bg-[#1EE35D] mt-3"></div>

        </div>
      </div>
      <div className="w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {
         listings.map((p, i) => <div key={i} className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md">
            <div className="relative overflow-hidden">
              {
                p.discount ?
                <div className="flex justify-center items-center absolute text-white px-2 py-1 bg-primary/50 rounded-md font-semibold text-sm right-2 top-2">
                -{p.discount}% 
                <span className='ml-1'><IoTicketSharp size={15}/></span>
              </div> :
              <div className=""></div>
              }
              <div className="flex justify-center items-start absolute w-[80px] h-[200px] rounded-full  font-semibold text-xs left-2 top-2 ">
                <DaysCounter
                 className="border-2"
                 textSize={"text-[12px]"}
                 startDate={dateFormat((p.harvestStartDate), "yyyy-mm-dd")}  
                 endDate={dateFormat((p.harvestEndDate), "yyyy-mm-dd")}  
                 createdAt={dateFormat((p.createdAt), "yyyy-mm-dd")}  
                 currentDate={dateFormat((now), "yyyy-mm-dd")}
                 />
              </div>

              {/* <div className="flex justify-center items-center absolute w-[70px] h-[70px] rounded-full font-semibold text-xs left-2 top-24 bg-[rgba(0,0,0,.40)]">
                <DaysCounter className="h-[100px] w-[100px]" endDay={endDay_listing} daysConsumed={daysConsumed_listing} />
              </div>    */}
             
              {/* <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">asd</div> */}
              <img className='sm:w-full w-full h-[240px] rounded-md object-cover' src={p.images[0]} alt="listing_image" />
              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaHeart size='13px' />
                </li>
                <Link to='/listing/details/asd123' className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaEye />
                </Link>
                <li onClick={() => handleAddCard(p._id)} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                 <PiStackPlusFill />
                </li>
                <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                  <FaHandshake />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
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
              <div className="flex gap-1">
                {
                  p.sellerId.profileImage? 
                  <img className='h-[50px] bg-primaryDark/50 rounded-full' src={p.sellerId.profileImage} alt="" />
                  : <img className='h-[50px]  rounded-full' src="/images/Assests/user_profile.png" alt="" />

                }
                <div className="w-full">
                  <div className="flex justify-between ">
                    <h1 className='text-sm font-semibold'>{p.clusterName}</h1>
                    <div className="flex items-center">
                      <Ratings ratings={p.sellerId.rating} />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span><FaPhone /></span>
                    <span className='text-sm'>{p.sellerId.phoneNumber}</span>
                  </div>

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
          </div>)
        }
      </div>
    </div>
  )
}




export default FeaturedListings