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
import { add_to_card , messageClear ,add_to_wishlist} from '../../store/reducers/cardReducer';

import dateFormat, { masks } from "dateformat";
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast'
import { IoTicketSharp } from "react-icons/io5";
import { TbCurrencyPeso } from "react-icons/tb";


const ShopListings = ({listings}) => {
  const {userInfo } = useSelector(state => state.auth)
  const {errorMessage,successMessage } = useSelector(state => state.card)
  
  const navigate =useNavigate()
  const dispatch = useDispatch();

  const handleAddCard = (id) => {
    if (userInfo) {
      dispatch(add_to_card({  // Ensure  `add_card` here refers to the action creator, not the function name
        userId: userInfo.id,
        quantity: 1,
        listingId: id
      }));
    } else {
      navigate('/login');
    }
  };

  const redirect_ = (listing_) => {
    console.log(listing_);
    console.log("____________________________________ >");
    console.log(listing_.clusterName);

    // Transforming listing data to match the required format
    const transformedListing = {
        "_id": listing_._id, // Assuming _id is available
        "sellerId": listing_.sellerId._id, // Seller ID from the seller object
        "name": listing_.name, // Assuming `name` is available in the listing object
        "slug": listing_.slug || listing_.name.replace(/\s+/g, '-'), // Generating slug from name if missing
        "clusterName": listing_.clusterName,
        "harvestStartDate": listing_.harvestStartDate || new Date().toISOString(),
        "harvestEndDate": listing_.harvestEndDate || new Date().toISOString(),
        "price": listing_.price,
        "stock": listing_.stock || 1, // Default stock to 1 if not specified
        "unit": listing_.unit || 'ct', // Default unit to 'ct' if not specified
        "expectedHarvestYield": listing_.expectedHarvestYield || 0,
        "totalPrice": listing_.totalPrice,
        "yieldUnit": listing_.yieldUnit || 'ct',
        "category": listing_.category || 'Livestock products',
        "description": listing_.description || 'No description available.',
        "locationInfo": listing_.locationInfo || 'No location Available.',
        "images": listing_.images || [], // Default to empty array if no images provided
        "discount": listing_.discount || 0,
        "sellerDelivery": listing_.sellerDelivery || true,
        "traderPickup": listing_.traderPickup || true,
        "createdAt": listing_.createdAt || new Date().toISOString(),
        "updatedAt": listing_.updatedAt || new Date().toISOString(),
        "__v": listing_.__v || 0,
        "shippingFee": listing_.shippingFee || 0,
        "firstName": listing_.sellerId.firstName, // Assuming seller first name exists
        "lastName": listing_.sellerId.lastName, // Assuming seller last name exists
        "mapsLink": listing_.mapsLink, // Assuming seller last name exists
        "listingInfo": {
            "shippingFee": listing_.shippingFee || 0
        }
    };

    const obj = [
        {
            sellerId: listing_.sellerId,
            shopName: listing_.shopName || "Unknown Shop", // Fallback for shopName
            price: listing_.totalPrice,
            listingInfo: transformedListing,
            listings: [
                {
                    quantity: 1, // Assuming quantity is 1
                    listingInfo: transformedListing
                }
            ]
        }
    ];

    navigate("/shipping", {
        state: {
            listings: obj[0].listings, // Use the listings array inside the obj array (obj[0].listings)
            totalPrice: listing_.totalPrice,
            shipping_fee: listing_.shippingFee || 0, // Use transformed shippingFee
            items: obj[0].listings.length // Dynamically set items count based on the number of listings
        }
    });
};

  const add_wishlist = (listing) =>{
    if (userInfo) {
      dispatch(add_to_wishlist({  // Ensure `add_card` here refers to the action creator, not the function name
        userId: userInfo.id,
        listingId: listing._id,
        name: listing.name,
        price: listing.price,
        image: listing.images[0],
        discount: listing.discount,
        slug: listing.slug

      }));
    } else {
      navigate('/login');
    }

  }

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

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(Math.floor(num));
};



  

// Get the current date (now)
const now = new Date();
  return (
    <div className='w-full flex flex-wrap mx-auto '>
      <div className="w-full">
        {/* <div className="text-center flex justify-center items-center flex-col text-2xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Recent Listings</h2>
          <div className="w-[100px] h-[4px] bg-[#1EE35D] mt-3"></div>

        </div> */}
      </div>
      <div className="w-full grid grid-cols-2 md-lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
        {
         listings.map((p, i) => 
         <div key={i} className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md">
            <div className="relative overflow-hidden">
            {
                p.discount ?
                <div className="flex justify-center items-center absolute text-white px-2 py-1 bg-primary/50 rounded-md font-semibold text-sm right-2 top-2">
                -{p.discount}% 
                <span className='ml-1'><IoTicketSharp size={15}/></span>
              </div> :
              <div className=""></div>
              }
              <div className="flex flex-col gap-2 justify-start items-start absolute w-[80px] h-[200px] font-semibold text-xs left-2 top-2 transition-all duration-700 z-50">
              <ul className='flex transition-all duration-700 left-1 top-6 justify-center items-center absolute w-[80px] opacity-0 group-hover:left-[66px] group-hover:w-[90px] group-hover:opacity-100'>
                <Link className='w-full py-2 px-0 z-0 cursor-pointer flex justify-end pr-1 items-center rounded-md text-primaryDark transition-all bg-white text-end'>
                  <h1>Till Harvest</h1>
                </Link>
              </ul>
                <DaysCounter 
                className="" 
                startDate={dateFormat((p.harvestStartDate), "yyyy-mm-dd")}  
                endDate={dateFormat((p.harvestEndDate), "yyyy-mm-dd")}  
                createdAt={dateFormat((p.createdAt), "yyyy-mm-dd")}  
                currentDate={dateFormat((now), "yyyy-mm-dd")} 
                />
              
           

                {/* <DaysCounter className="" endDay={dateFormat((now), "d")} daysConsumed={dateFormat((listings.harvestStartDate), "d")} /> */}
            
                {/* <DaysCounter className="" endDay={endDay} daysConsumed={daysConsumed} /> */}
              </div>

              {/* <div className="flex justify-center items-center absolute w-[70px] h-[70px] rounded-full font-semibold text-xs left-2 top-24 bg-white/40">
              <DaysCounter className="" endDay={dateFormat((listings.harvestStartDate), "d")}  
                daysConsumed={dateFormat((listings.harvestEndDate), "d")} />
              </div>    */}
             
              {/* <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">asd</div> */}
              <img className='sm:w-full w-full h-[240px] rounded-md object-cover' src={p.images[0]} alt="listing_image" />
              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li onClick={() => add_wishlist(p)} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaHeart size='13px' />
                </li>
                <Link to={`/listing/details/${p.slug}`} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaEye />
                </Link>
                <li onClick={() => handleAddCard(p._id)} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                 <PiStackPlusFill />
                </li>
                <li onClick={() => redirect_(p)} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
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
                    <span className='text-base font-bold'>{formatNumber(p.price)}</span>
                    <span className='text-base font-bold'>/{p.unit}</span>
                  </div>
                
                  {/* {p.discount > 0 ? (
                       <div className="flex justify-center items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-lg text-primary pr-1">
                               {formatNumber(p.totalPrice - Math.floor((p.totalPrice * p.discount) / 100))}
                           </h2>
                           <p className="line-through">{formatNumber(p.totalPrice)}</p>
                           <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{p.discount}% 
                           <IoTicketSharp  className='ml-[1px]'/></p>
                       </div>
                   ) : p.discount === 0 ? (
                       <div className="flex items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-primaryDark text-lg">{formatNumber(p.totalPrice)}</h2>
                       </div>
                      
                   ) : (
                       <div className="flex items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-primaryDark text-lg">{formatNumber(p.totalPrice)}</h2>
                       </div>
                  )} */}
                  

                  <div className="pl-1">
                    <span className='font-extrabold'>&#64;</span>
                    <span className='text-base font-bold'>{p.expectedHarvestYield}</span>
                    <span className='text-base font-bold'>{p.yieldUnit}</span>
                  </div>
                 
                  
                </div>
                <div className="text-base font-bold text-primaryDark ">
                    {p.discount > 0 ? (
                       <div className="flex justify-center items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-lg text-primaryDark pr-1">
                               {formatNumber(p.totalPrice - Math.floor((p.totalPrice * p.discount) / 100))}
                           </h2>
                           <p className="line-through text-slate-500">{formatNumber(p.totalPrice)}</p>
                           <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{p.discount}% 
                           <IoTicketSharp  className='ml-[1px]'/></p>
                       </div>
                   ) : p.discount === 0 ? (
                       <div className="flex items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-primaryDark text-lg">{formatNumber(p.totalPrice)}</h2>
                       </div>
                      
                   ) : (
                       <div className="flex items-center">
                           <span className=''><TbCurrencyPeso size={19} /></span>
                           <h2 className="text-primaryDark text-lg">{formatNumber(p.totalPrice)}</h2>
                       </div>
                  )}
                </div>
                {/* <div className="text-base font-bold text-primaryDark ">
                   <span className='pr-1'>&#8369;</span> 
                   <span className='flex-wrap'>{formatNumber(p.totalPrice)}</span>
                </div> */}
               

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

             

              <div className="flex justify-center gap-1 py-3 items-center text-center text-sm h-[50px]">
                <p>{p.description}</p>
              </div>
              <div className="flex justify-start gap-0 py-1 items-start flex-col border-y-2 ">
                <label htmlFor="" className='text-xs font-bold'>Harvest Schedule:</label>
                 <div className="flex justify-between w-full items-center">
                      <span className='text-[11px]'>{dateFormat((p.harvestStartDate), "mmmm dS, yyyy")} </span>
                      <span>-</span>
                      <span className='text-[11px]'>{dateFormat((p.harvestEndDate), "mmmm dS, yyyy")} </span>
                 </div>
              </div>
              <div className="flex justify-center gap-1 py-1 items-end">
                <span><IoLocationSharp size='20px' /></span>
                <span className='text-sm'>
                  {
                  p.locationInfo ?  <p>{p.locationInfo}</p> :  <p>No Location Data Available</p>
                  
                  }</span>
              </div>
              <div className="flex justify-center gap-1 py-1 items-end">
                {/* <span><IoLocationSharp size='20px' /></span> */}
                <span className="text-sm">
                {p.mapsLink ? (
                  <a
                    href={p.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    OPEN IN GOOGLE MAP
                  </a>
                ) : (
                  <p>No Google Map location Data Available</p>
                )}
              </span>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}




export default ShopListings