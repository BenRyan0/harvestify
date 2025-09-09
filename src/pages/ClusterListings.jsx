import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import { Link, useParams } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import Footer from '../components/Footer';
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { query_listings, get_cluster_details } from '../store/reducers/homeReducer';
import Ratings from './../components/Ratings';
import { AiFillShop } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import ClusterListingsists from '../components/listings/ClusterListingsists';

const ClusterListings = () => {
    const { clusterId } = useParams();
    const dispatch = useDispatch();
    const {
        categories,
        allListings,
        totalListing,
        priceRange,
        allYieldUnits,
        yieldRange,
        parPage,
        cluster_listings,
        cluster_listings_count,
        seller,
        loader
    } = useSelector(state => state.home);

    const [pageNumber, setPageNumber] = useState(1);
    const [styles, setStyles] = useState('grid');
    const [filter, setFilter] = useState(true);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [sortYield, setSortYield] = useState('');
    const [sortYieldUnit, setSortYieldUnit] = useState('');

    const [priceValues, setPriceValues] = useState([priceRange.low, priceRange.high]);
    const [yieldValues, setYieldValues] = useState([yieldRange.low, yieldRange.high]);

    useEffect(() => {
        dispatch(get_cluster_details(clusterId));
    }, [clusterId]);


    useEffect(() => {
        setPriceValues([priceRange.low, priceRange.high]);
      }, [priceRange]);
    
      useEffect(() => {
        setYieldValues([yieldRange.low, yieldRange.high]);
      }, [yieldRange]);
    
        const queryCategory = (e,value)=>{
            if(e.target.checked){
                setCategory(value)
            }else{
                setCategory('')
    
            }
        }
    useEffect(() => {
        setPriceValues([priceRange.low, priceRange.high]);
    }, [priceRange]);

    useEffect(() => {
        setYieldValues([yieldRange.low, yieldRange.high]);
    }, [yieldRange]);

    useEffect(() => {
        dispatch(
            query_listings({
                lowPrice: priceValues[0],
                highPrice: priceValues[1],
                lowYield: yieldValues[0],
                highYield: yieldValues[1],
                category,
                rating,
                sortPrice,
                pageNumber,
                sortYield,
                sortYieldUnit
            })
        );
    }, [priceValues, yieldValues, category, rating, pageNumber, sortPrice, sortYield, dispatch, sortYieldUnit]);

    const rstRating = () => {
        setRating('');
        dispatch(query_listings({
            lowPrice: priceValues[0],
            highPrice: priceValues[1],
            lowYield: yieldValues[0],
            highYield: yieldValues[1],
            category,
            rating: '',
            sortPrice,
            pageNumber,
            sortYield,
            sortYieldUnit
        }));
    };

    // Loader Component
    const Loader = () => (
        <div className="w-full h-full flex justify-center items-center bg-red-300">
            <div className="spinner-border animate-spin border-4 border-t-4 border-blue-600 rounded-full w-full h-full  "></div>
        </div>
    );

    // Check if the data is still loading
    // const isLoading = loader;
    const isLoading = loader || !seller.length;
    console.log(cluster_listings)
    console.log("cluster_listings")
    console.log(seller)
    console.log("SELLER")

    return (
        <div className="">
            {isLoading ? (
                // <Loader /> 
                <h2>Loading...</h2>
            ) : (
                <>
                <Headers/>
                {/* <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' > */}
                {/* <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: `url(${seller[0].associationImage})` }}> */}
                <div className="w-[85%] mx-auto h-[350px] flex justify-between gap-1 md:flex-col flex-row ">
                    <div className='w-8/12 md:w-full h-full  mt-6 bg-cover bg-no-repeat relative bg-left rounded-md' style={{ backgroundImage: "url('/images/banner/1.jpg')" }}>
                    <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40 rounded-md">
                        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                                    <h2 className='text-4xl font-bold font-roboto italic'>{seller[0].associationName} </h2>
                                    <div className="flex">
                                        <Ratings ratings={seller[0].rating}/>
                                    </div>
                                    <div className="flex justify-center items-center gap-1 text-xs w-full">
                                        {/* <Link to='/'>Home</Link> */}
                                        <span><FaAngleRight size='10px'/></span>
                                        {/* <span>Cluster Details</span> */}
                                        {/* <span><FaAngleRight size='10px'/></span> */}
                                        {/* <span>Mati Rice Farmers Association</span> */}
                                    </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <section className='w-4/12 md-lg:w-full h-full py-10  mt-6  bg-cover bg-no-repeat relative bg-left rounded-md '>
                    <div className="absolute left-0 top-0 bottom-0 right-0 w-full md:h-fit h-full border-2 border-green-500 bg-opacity-40 rounded-md bg-green-700 ">
                        <div className="w-full h-full p-1 flex gap-1 flex-col justify-between items-between text-center text-primaryDark text-base">
                                <div className="w-full h-[10]  bg-primaryDark rounded-sm flex justify-center items-center text-slate-200 flex-col">
                                    <img className='h-[50px]' src={`https://res.cloudinary.com/ddbcg6wj9/image/upload/v1733517059/assets/t9o71yrhph4iyr8uyuou.png`} alt="" />
                                    {/* <h2 className='font-semibold italic -mt-2'>{seller[0].associationName}</h2> */}
                                    
                                </div>

                                <div className="w-full h-full flex justify-between gap-2">
                                    <div className="w-5/12">
                                        <img className='object-cover rounded-md h-full' src={`${seller[0].profileImage}`} alt="" />
                                    </div>
                                    <div className="w-full text-start text-sm">
                                        <div className="">
                                            <h2>Name: {seller[0].firstName} {seller[0].lastName}</h2>
                                        </div>
                                        <div className="">
                                            <h2>Email: {seller[0].email}</h2>
                                        </div>
                                        <div className="">
                                            <h2>Phone: {seller[0].phoneNumber}</h2>
                                        </div>
                                        <div className="">
                                            <h2>Sex: {seller[0].sex}</h2>
                                        </div>
                                        <div className="">
                                            <h2>Role: {seller[0].role}</h2>
                                        </div>
                                        <div className="">
                                            <Link to={`/dashboard/chat/${seller[0]._id}`} className='h-[30px] block group flex justify-center items-center gap-2 font-bold bg-primaryDark px-5 py-2 rounded-md text-slate-100 hover:shadow-md'>
                                                    Chat Seller
                                                            <IoChatboxEllipses
                                                    size={20}
                                                    className='transition-transform duration-300 ease-in-out group-hover:animate-wiggle'
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[45%] md:h-[90px]   relative  bg-primaryDark rounded-b-sm text-slate-200 flex flex-col justify-start  pt-3 items-center">
                                    <div className="flex gap-1 justify-center">
                                        <h2 className='italic font-semibold text-lg'>{seller[0].associationName}</h2>
                                        <AiFillShop size={25} />
                                    </div>
                                    <div className="flex gap-1 justify-center items-start">
                                        <Ratings className="" ratings={seller[0].rating}/>
                                    </div>

                                    <div className="flex gap-1 justify-center items-center font-base text-start py-1 text-md absolute bottom-0 ">
                                        <FaLocationDot size={15}/>
                                        <h2 className='italic  '>location address</h2>
                                        
                                    </div>
                                </div>
                           
                        </div>
                    </div>
                    </section>
                    
                </div>
               
                <section className='py-16'>
                   <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                       {/* <div className={`md:block hidden ${!filter ? 'mb-6':'mb-0'}`}>
                           <button onClick={()=>setFilter(!filter)} className='text-center w-full py-2 px-3 bg-accent text-white font-semibold'>Filter Listings</button>
                       </div> */}
                       <div className="w-full flex flex-wrap">
                         
                           <div className="w-full">
                               <div className="pl-8 md:pl-0">
                                       <div className="py-4 mb-10 px-3 rounded-md flex justify-between items-center text-center border">
                                             <h2 className='visible md:invisible text-lg font-semibold text-slate-600 text-center '>{cluster_listings_count} listings</h2>                                
                                           <div className="flex justify-center items-center gap-3 ">
                                               <div className="flex justify-center items-start gap-4 md-lg:hidden">
                                                   <div onClick={()=>setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                       <IoGrid size='20px'/>
                                                   </div>
                                                   <div onClick={()=>setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                       <FaThList size='20px' />
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="pb-8 ">
                                       
                                           <ClusterListingsists listings={cluster_listings} seller={seller} />
                                        
            
                                       </div>
                                       <div className="">
                                       {
                                               totalListing > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalListing} parPage={parPage} showItem={Math.floor(totalListing / parPage)} />
                                           }
                          
                                       </div>
                               </div>
                           </div>
            
                       </div>
                   </div>
                </section>
                <Footer/>
            </>
            )}
        </div>
    );
};

export default ClusterListings;
