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
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { FaCircleCheck } from "react-icons/fa6";


const ShopListings = ({listings,styles}) => {
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


const getFirstTwoSentences = (text) => {
  const sentences = text.match(/[^.!?]*[.!?]/g) || [text]; // Split by sentence-ending punctuation
  return sentences.slice(0, 2).join(' ');
};
  

// Get the current date (now)
const now = new Date();
  return (
    <div className='w-full flex flex-wrap mx-auto '>
      <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-2 lg:grid-cols-2 md-lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-1'} gap-3`}>

      {/* <div className="w-full grid grid-cols-2 md-lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6"> */}
        {
         listings.map((p, i) => 
         <div key={i} className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md">
            <div className="relative overflow-hidden">
           <div className="flex justify-start items-end flex-col gap-1  absolute  right-2 top-2">
                 {
                   p.additionalFeatures && p.additionalFeatures.length > 0 ? 
                   
                   ( 
                     p.additionalFeatures.map((feature, i) => (
                       <div key={i} className="text-white px-2 py-1 bg-primary/50 rounded-md font-semibold text-sm flex gap-1 items-center">
                         {feature}
                         <span><FaCircleCheck /></span>
                       </div>
                     ))
                   ) : (
                      <div className=""></div>
                    ) 
                  }
              </div>
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
              
              {/* <img className='sm:w-full w-full h-[240px] rounded-md object-cover' src={p.images[0]} alt="listing_image" /> */}
              <Link to={`/listing/details/${p.slug}`}>
                <img className='sm:w-full w-full h-[240px] rounded-md object-cover' src={p.images[0]} alt="listing_image" />
              </Link>
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                    {/* Wishlist Tooltip */}
                    <li
                      onClick={() => add_wishlist(p)}
                      className="w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all"
                      data-tooltip-id="wishlist-tooltip"
                      data-tooltip-content="Add to Wishlist"
                   >
                      <FaHeart size="13px" />
                   </li>

                    {/* View Details Tooltip */}
                    <Link
                      to={`/listing/details/${p.slug}`}
                      className="w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all"
                     data-tooltip-id="details-tooltip"
                      data-tooltip-content="View Details"
                    >
                     <FaEye />
                    </Link>

                    {/* Add to Cart Tooltip */}
                    <li
                     onClick={() => handleAddCard(p._id)}
                     className="w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all"
                      data-tooltip-id="cart-tooltip"
                     data-tooltip-content="Add to Cart"
                   >
                      <PiStackPlusFill />
                   </li>

                    {/* Negotiate Tooltip */}
                    <li
                      onClick={() => redirect_(p)}
                      className="w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all"
                      data-tooltip-id="negotiate-tooltip"
                      data-tooltip-content="Take Deal"
                    >
                      <FaHandshake />
                    </li>

                    {/* Tooltip Components */}
                    <Tooltip id="wishlist-tooltip" className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold" />
                    <Tooltip id="details-tooltip" className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold" />
                    <Tooltip id="cart-tooltip" className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold" />
                    <Tooltip id="negotiate-tooltip" className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold" />
                  </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <div className="flex justify-between">
                <h2 className='' id='listing_name'>{p.name}</h2>
                 <div className="flex gap-3 text-xl">
                     {/* Seller Delivery Tooltip */}
                     {p.sellerDelivery && (
                       <span data-tooltip-id="seller-delivery" data-tooltip-content="Seller Delivery">
                         <FaTruckLoading />
                       </span>
                     )}

                     {/* Trader Pickup Tooltip */}
                     {p.traderPickup && (
                       <span data-tooltip-id="trader-pickup" data-tooltip-content="Trader Pickup">
                         <FaTruck />
                        </span>
                     )}

                      {/* Customized Tooltips */}
                                     <Tooltip
                        id="seller-delivery"
                        className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold"
                      />
                      <Tooltip
                        id="trader-pickup"
                        className="!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-sm shadow-lg font-semibold"
                      />
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
                  <Link to={`/clusters/cluster-details/${p.sellerId._id}`} className='h-[50px] w-[60px]'>
                  <img className='h-full border-2 border-primaryDark bg-primaryDark/50 rounded-full' src={p.sellerId.profileImage} alt="" />
                  </Link>
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

             

             <div className="flex justify-center gap-1 py-1 items-center text-center text-sm h-[90px] flex-col">    
                <p>{getFirstTwoSentences(p.description)}</p>
                {p.description.split(/[^.!?]*[.!?]/g).length > 2 && (
                  <Link to={`/listing/details/${p.slug}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                    Read more
                  </Link>
                )}
              </div>
                <div className="flex justify-start gap-0 py-1 items-start flex-col border-y-2 ">
                  <label htmlFor="" className='text-[15px] font-bold'>Harvest Schedule:</label>
                   <div className="flex justify-between w-full items-center text-[15px] font-bold px-3">
                        <span className=''>{dateFormat((p.harvestStartDate), "mmmm dS, yyyy")} </span>
                        <span>-</span>
                        <span className=''>{dateFormat((p.harvestEndDate), "mmmm dS, yyyy")} </span>
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