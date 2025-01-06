import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import Carousel from 'react-multi-carousel';
import Ratings from '../components/Ratings';
import { FaPhone } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdSave } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import Reviews from '../components/Reviews';
import dateFormat, { masks } from "dateformat";
import { IoTicketSharp } from "react-icons/io5";
import { TbCurrencyPeso } from "react-icons/tb"
import toast,{Toaster} from 'react-hot-toast'
import {Swiper, SwiperSlide} from 'swiper/react'
// import 'swiper/css'
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
// import DaysCounterF from '../components/listings/DaysCounterF';
import DaysCounter from '../components/DaysCounter';
import ClustersListings from '../components/listings/ClustersListings'

import {get_listing} from '../store/reducers/homeReducer'
import { add_to_card , messageClear ,add_to_wishlist} from '../store/reducers/cardReducer';
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";





const Details = () => {

    // const {slug} = useParams()
    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
  

    useEffect(() => {
        dispatch(get_listing(slug));
      },[slug]);      
 
   
    const {
        listing,
      relatedListings,
      moreListings,
      totalShippingFee
     } = useSelector(state => state.home)

    const {
        userInfo
     } = useSelector(state => state.auth)
    const {
        successMessage, errorMessage
     } = useSelector(state => state.card)
   

   
    

    const [image, setImage] = useState('')

    const [state,setState] = useState('reviews')
  
    const responsive = {
        superLargeDesktop : {
            breakpoint : { max: 4000, min: 3000},
            items: 4,
        },
        desktop : {
            breakpoint : { max: 3000, min: 1024},
            items: 4,
        },
        tablet : {
            breakpoint : { max: 1024, min: 464},
            items: 4,
        },
        mdtablet : {
            breakpoint : { max: 991, min: 464},
            items: 3,
        },
        mobile : {
            breakpoint : { max: 640, min: 0},
            items: 2,
        },
       smmobile : {
            breakpoint : { max: 640, min: 0},
            items: 2,
        },
       xsmobile : {
            breakpoint : { max: 440, min: 0},
            items: 1,
        },
    }


    useEffect(() => {
        dispatch(get_listing(slug))
    }, [slug])
    const images = [1,2,3,4]
    const discount = 2;
    const stock = 1;



  




    // const add_card
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

  
 
    // const redirect_ = (listing_) => {
    //     console.log(listing_)
    //     console.log("____________________________________ >")
    //     console.log(listing_.clusterName)

    //     const obj = [
    //         {
    //             sellerId: listing_.sellerId,
    //             shopName: listing_.shopName,
    //             price: listing_.totalPrice,
    //             listings: [
    //                 {
    //                     quantity: 1,
    //                     listingInfo: listing_
    //                 }
    //             ]
    //         }
    //     ]
    //     navigate("/shipping", {
    //         state: {
    //             listings: obj, // Send only the specific listing as an array
    //             totalPrice: listing_.totalPrice, // Adjust price if needed
    //             shipping_fee: totalShippingFee, // Keep the same shipping fee
    //             items: 1, // Or filter based on this specific listing
    //         }
    //     });
    // };
   

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
            "unit": listing_.unit || '', // Default unit to 'ct' if not specified
            "expectedHarvestYield": listing_.expectedHarvestYield || 0,
            "totalPrice": listing_.totalPrice,
            "yieldUnit": listing_.yieldUnit || '',
            "category": listing_.category || '',
            "description": listing_.description || 'No description available.',
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
            "additionalLocationInfo": listing_.additionalLocationInfo, // Assuming seller last name exists
            "locationInfo": listing_.locationInfo, // Assuming seller last name exists
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
    

    
    
    const now = new Date();
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
      };

  // Render the page content once all data is available
  return (
    <div>
      {listing?.sellerId?.firstName ? (
        <div>
        <Headers/>
            <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/card.jpg')" }}>
                    <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
                        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                                <img className='w-[350px]' src={`http://localhost:3001/images/Harvestify_logo_full.png`} alt="" />
                            </div>
                        </div>
                    </div>
            </section>
    
            <div className=" py-5 mb-5">
                <div className="w-[85%] bg-slate-100 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto py-5 px-3">
                    <div className="flex justify-start items-center text-md text-slate-500 w-full text-sm gap-1">
                        <Link to='/'>Home</Link>
                        <span><FaAngleRight size='10px' /></span>
                        <span>{listing.category}</span>
                        <span><FaAngleRight size='10px' /></span>
                        <span>{listing.name}</span>
                    </div>
               </div>
            </div>
            <section>
                <div className="w-[85%] bg-slate-100 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto py-5 px-3 pb-16">
                    <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
                        <div className="relative">
                            <div className="">
                                <img className='h-[400px] w-full rounded' src={image ? image : listing.images?.[0] } alt="" />
                            </div>
                            <div className="py-3 w-full">
                                {
                                    listing.images && 
                                    <Carousel
                                    autoPlay={true}
                                    infinite={true}
                                    transitionDuration={500}
                                    responsive={responsive}
    
                                    >
                                        {
                                            listing.images.map((img,i)=>{
                                                return(
                                                    <div key={i} className="px-1 h-[150px]" onClick={()=>setImage(img)}>
                                                         <img className='cursor-pointer h-full w-full rounded-sm' src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
    
                                    </Carousel>
                                }
                            </div>
                           
                             <div className="flex flex-col gap-2 justify-start items-start absolute w-[80px] h-[200px] font-semibold text-xs left-2 top-2 transition-all duration-700 z-50">
                                <ul className='flex transition-all duration-700 left-1 top-6 justify-center items-center absolute w-[100px] opacity-0 group-hover:left-[66px] group-hover:w-[90px] group-hover:opacity-100 bg-red-600'>
                                    <Link className='w-full py-2 px-0 z-0 cursor-pointer flex justify-end pr-1 items-center rounded-md text-primaryDark transition-all bg-white text-end'>
                                    <h1>Till Harvest</h1>
                                    </Link>
                                </ul>
                                    <DaysCounter
                                    className="border-2"
                                    textSize={"text-[14px]"}
                                    startDate={dateFormat((listing.harvestStartDate), "yyyy-mm-dd")}  
                                    endDate={dateFormat((listing.harvestEndDate), "yyyy-mm-dd")}  
                                    createdAt={dateFormat((listing.createdAt), "yyyy-mm-dd")}  
                                    currentDate={dateFormat((now), "yyyy-mm-dd")}
                                    />
            
                             </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="font-bold text-2xl text-slate-700">
                                <h2 className=''>{listing.name}</h2>
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="flex gap-1">
                                    <img className='h-[50px] rounded-full border-primaryDark border-2' src={listing.sellerId.profileImage} alt="" />
                                    <div className="w-full">
                                    <div className="flex justify-between ">
                                        <h1 className='text-sm font-semibold'>{listing.sellerId.firstName}</h1>
                                        <div className="flex items-center">
                                        <Ratings ratings={listing.sellerId.rating}/>
                                    </div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                    <span><FaPhone /></span>
                                    <span className='text-sm'>{listing.sellerId.phoneNumber}</span>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl text-primaryDark font-bold flex gap-2">
                               {listing.discount > 0 ? (
                                   <div className="flex justify-center items-start flex-col">
                                        <div className="flex justify-center items-center">
                                            <span className='font-bold text-base'>&#8369;</span>
                                            <span className='text-base font-bold'>{formatNumber(listing.price)}</span>
                                            <span className='text-base font-bold'>/{listing.unit}</span>
                                        
                                            <span className='font-extrabold ml-2'>&#64;</span>
                                            <span className='text-base font-bold'>{listing.expectedHarvestYield}</span>
                                            <span className='text-base font-bold'>{listing.yieldUnit}</span>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                            <h2 className="text-lg text-primary pr-1">
                                                {formatNumber(listing.totalPrice - Math.floor((listing.totalPrice * listing.discount) / 100))}
                                            </h2>
                                            <p className="line-through text-slate-500">{formatNumber(listing.totalPrice)}</p>
                                            <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1 rounded-md"> -{listing.discount}% 
                                            <IoTicketSharp  className='ml-[1px]'/></p>
                                        </div>
                                      
                                   </div>
                               ) : listing.discount === 0 ? (
                                    <div className="flex justify-center items-start flex-col">
                                        <div className="">
                                            <span className='font-bold text-base'>&#8369;</span>
                                            <span className='text-base font-bold'>{formatNumber(listing.price)}</span>
                                            <span className='text-base font-bold'>/{listing.unit}</span>
                                        
                                            <span className='font-extrabold ml-2'>&#64;</span>
                                            <span className='text-base font-bold'>{listing.expectedHarvestYield}</span>
                                            <span className='text-base font-bold'>{listing.yieldUnit}</span>
                                        </div>
                                        
    
                                        <div className="flex">
                                            <span className='font-bold text-base'>&#8369;</span>
                                            <h2 className="text-primaryDark text-lg">{formatNumber(listing.totalPrice)}</h2>
                                        </div>
                                    </div>
                                    
                                  
                               ) : (
                                   <div className="flex items-center">
                                       <span className=''><TbCurrencyPeso size={19} /></span>
                                       <h2 className="text-primaryDark text-lg">{formatNumber(listing.totalPrice)}</h2>
                                   </div>
                               )
                               }
                                                                                    
                            </div>
                            <div className="text-slate-600">
                                <p>{listing.description}</p>
                            </div>
                            <div className="text-slate-600">
                            <div className="flex justify-start items-center flex-row gap-1">
                                            {
                                              listing.additionalFeatures && listing.additionalFeatures.length > 0 ? 
                                              
                                              ( 
                                                listing.additionalFeatures.map((feature, i) => (
                                                  <div key={i} className="text-white px-2 py-1 bg-primary/80 rounded-md font-semibold text-sm flex gap-1 items-center">
                                                    {feature}
                                                    <span><FaCircleCheck /></span>
                                                  </div>
                                                ))
                                              ) : (
                                                <div className="">NGIasd</div>
                                              )
                            
                                            
                                              
                                            }
                                        </div>
                            </div>
                            <div className="text-slate-600">
                                <div className="flex justify-start items-center text-center gap-1 font-semibold">
                                    <span><FaMapMarkedAlt size={20} /></span>
                                    <h2>Listing Location: </h2>
                                </div>
                                <p>{listing.additionalLocationInfo}, {listing.locationInfo}</p>
                            </div>

                            <div className="flex justify-start w-full gap-1 items-start">
                                <span className="text-sm">
                                {listing.mapsLink ? (
                                <a
                                    href={listing.mapsLink}
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
                            <div className="flex gap-3 pb-10 border-b text-slate-600 justify-start items-center">
                                {
                                    stock ? 
                                    <div className="">
                                        <button onClick={() => handleAddCard(listing._id)} className='h-[50px] group flex justify-center items-center gap-2 font-bold bg-primaryDark px-4 py-2 rounded-md text-slate-100 hover:shadow-md'>
                                            Save listing
                                            <MdSave 
                                                size={25} 
                                                className='transition-transform duration-300 ease-in-out group-hover:animate-wiggle'
                                            />
                                        </button>
                                    </div>
                                    :
                                ''
                                }
                                <div className="">
                                    <button onClick={() => add_wishlist(listing)} className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-md rounded-md bg-primaryDark group">
                                     <FaHeart size={23} fill='#F1F5F9' className='group-hover:animate-wiggle' />
                                    </button>
                                </div>
    
                            </div>
                            <div className="flex py-5 gap-5">
                                <div className="w-[150px] text-black font-bold text-lg flex flex-col gap-5">
                                    <span>Availability: </span>
                                    <span>Share: </span>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <span className={`font-semibold ${stock ? 'text-green-500' : 'text-red-500'}`}>
                                        { stock ? 'Available' : 'Unavailable' }
                                    </span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        <li>
                                            <a className='group w-[38px] h-[38px] hover:bg-accent hover:text-white text-slate-200 flex justify-center items-center bg-primaryDark rounded-full' href="/">
                                                <FaFacebookSquare className="transition-transform duration-300 ease-in-out group-hover:animate-wiggle" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='group w-[38px] h-[38px] hover:bg-accent hover:text-white text-slate-200 flex justify-center items-center bg-primaryDark rounded-full' href="/">
                                                <RiTwitterXFill className="transition-transform duration-300 ease-in-out group-hover:animate-wiggle" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='group w-[38px] h-[38px] hover:bg-accent hover:text-white text-slate-200 flex justify-center items-center bg-primaryDark rounded-full' href="/">
                                                <FaSquareInstagram className="transition-transform duration-300 ease-in-out group-hover:animate-wiggle" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className='group w-[38px] h-[38px] hover:bg-accent hover:text-white text-slate-200 flex justify-center items-center bg-primaryDark rounded-full' href="/">
                                                <FaLinkedin className="transition-transform duration-300 ease-in-out group-hover:animate-wiggle" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
    
                            </div>
    
                            <div className="flex md-lg:flex-col py-5 gap-3">
                                {
                                stock ? 
                                <button onClick={() => redirect_(listing)}  className='h-[50px] group flex justify-center items-center gap-2 font-bold bg-primaryDark px-5 py-2 rounded-md text-slate-100 hover:shadow-md'>
                                        Take Deal 
                                        <FaHandshake 
                                        size={25} 
                                        className='transition-transform duration-300 ease-in-out group-hover:animate-wiggle'
                                        />
                                    </button> : '' 
                                }
                                <Link to={`/dashboard/chat/${listing.sellerId._id}`} className='h-[50px] block group flex justify-center items-center gap-2 font-bold bg-primaryDark px-5 py-2 rounded-md text-slate-100 hover:shadow-md'>
                                    Chat Seller
                                    <IoChatboxEllipses
                                        size={25}
                                        className='transition-transform duration-300 ease-in-out group-hover:animate-wiggle'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="w-[85%] bg-slate-100 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto py-5 px-3 pb-16">
                    <div className="flex flex-wrap">
                        <div className="w-[72%] md-lg:w-full">
                            <div className="pr-4 md-lg:pr-0">
                            <div className="grid grid-cols-2 font-semibold gap-1">
                                <button
                                    onClick={() => setState('reviews')}
                                    className={`py-3 px-5 transition-colors duration-200 hover:bg-primaryDark hover:text-white ${state === 'reviews' ? 'bg-primaryDark text-white' : 'bg-slate-200 text-slate-700'}`}>
                                    Past Transaction Reviews
                                </button>
                                <button
                                    onClick={() => setState('description')}
                                    className={`py-3 px-5 transition-colors duration-200 hover:bg-primaryDark hover:text-white ${state === 'description' ? 'bg-primaryDark text-white' : 'bg-slate-200 text-slate-700'}`}>
                                    Description
                                </button>
                            </div>
                                <div className="">
                                    {
                                        state === 'reviews' ? <Reviews listing={listing}/> : <p className='py-5 text-slate-600'>{listing.description}</p>
                                    }
                                </div>
                            </div>
                           
                        </div>
                        <div className="w-[28%] md-lg:w-full">
                            <div className="pl-4 md-lg:pl-0">
                                <div className="px-3 py-3 font-semibold text-slate-600 bg-slate-200">
                                    <h2>More from {listing.clusterName}</h2>
                                </div>
                                <div className="flex flex-col gap-5 mt-3 border p-3">
                                    {/* <ClustersListings styles="grid"/> */}
                                   {
                                     moreListings.map((p,i)=>{
                                        return(
                                            <Link className='block ' to={`/listing/details/${p.slug}`}>
                                                <div className="relative h-[270px]">
                                                 <img className='w-full h-full' src={p.images[0]} alt="" />
                                                 {
                                                    p.discount?  <div className="flex justify-center items-center absolute text-white py-1 px-2 gap-1 rounded-md bg-primaryDark/80 font-semibold text-xs left-2 top-2"> -{p.discount}%  <IoTicketSharp/></div> : <div className=""></div> 
                                                 }
                                                
                                                </div>
                                               <h2 className='text-slate-500'>{p.description}</h2>
                                              
                                            </Link>
                                        )
                                    })
                                   }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <section>
                <div className="w-[85%] bg-slate-100 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto py-5 px-3 pb-16">
                    <h2 className='text-xl text-slate-600 '>Related Listings</h2>
                    <div className="">
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{
                                1280: {
                                    slidesPerView: 3
                                },
                                565: {
                                    slidesPerView: 2
                                }
                            }}
                            spaceBetween={25}
                            loop={true}
                            pagination={{
                                clickable :true,
                                dynamicBullets: true,
                              }}
                              modules={[Pagination]}
                              className="mySwiper"
                              style={{
                                "--swiper-pagination-color": "#04714A",
                                "--swiper-pagination-bullet-inactive-color": "#999999",
                                "--swiper-pagination-bullet-inactive-opacity": "1",
                                "--swiper-pagination-bullet-size": "13px",
                                "--swiper-pagination-bullet-horizontal-gap": "3px"
                              }}
                        >
                            {
                                 relatedListings.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Link className='block py-3 mb-10' to={`/listing/details/${p.slug}`}>
                                                <div className="relative h-[270px]">
                                                    <div className="w-full h-full">
                                                        <img className='w-full h-full rounded-md' src={p.images[0]} alt="" />
                                                        <div className="absolute h-full w-full top-0 left-0 bg-primaryDark opacity-10 hover:opacity-30 transition-all duration-300"></div>
                                                    </div>
                                                    {
                                                    p.discount?  <div className="flex justify-center items-center absolute text-white py-1 px-2 gap-1 rounded-md bg-primaryDark/80 font-semibold text-xs left-2 top-2"> -{p.discount}%  <IoTicketSharp/></div> : <div className=""></div> 
                                                 }
                                                    {/* <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-primaryDark font-semibold text-xs left-2 top-2">2%</div> */}
                                                </div>
                                                <div className="p-4 flex flex-col gap-1">
                                                    <h2 className='text-slate-500 font-semibold'>{p.name}</h2>
                                                    <div className="text-sm text-primaryDark font-bold flex gap-2">
                                                        {
                                                            p.discount ?
                                                                <div className="flex flex-col">
                                                                    <div className="flex gap-2 items-center">
                                                                        <h2 className='text-primaryDark'> <span>&#8369;</span>20/kl</h2>
                                                                        <div className="border-l-4 h-[70%] border-primaryDark"></div>
                                                                        <h2 className=''>2tn</h2>
                                                                    </div>
    
                                                                    <div className="">
                                                                        <h2 className='line-through text-slate-400'><span>&#8369;</span>40000</h2>
                                                                        <h2><span>&#8369;</span>{40000 - Math.floor((40000 * discount) / 100)} (-{discount}%)</h2>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="flex flex-col">
                                                                    <div className="flex flex-row gap-2 items-center">
                                                                        <h2 className=''>Price: <span>&#8369;</span>20/kl</h2>
                                                                        <div className="border-l-4 h-[70%] border-primaryDark"></div>
                                                                        <h2 className=''>2tn</h2>
                                                                    </div>
                                                                    <h2 className=''>Sum Total: <span>&#8369;</span> 40000 </h2>
                                                                </div>
                                                        }
    
                                                    </div>
                                                    <div className="flex items-center gap-1 pt-2">
                                                        <h2 className='text-slate-500 text-sm'>Seller Rating</h2>
                                                        <div className="flex">
                                                            <Ratings ratings={4} />
                                                        </div>
                                                    </div>
                                                </div>
    
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
    
                        </Swiper>
                        {/* Pagination bullets */}
                        <div className="custom_bullet swiper-pagination"></div>
                    </div>
                </div>
        </section>
    
        <Footer/>
    </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );




}

export default Details