import React, {useState} from 'react'
import Headers from '../components/Headers'
import {Range} from 'react-range'
import { Link } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";
import Footer from '../components/Footer';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { PiShieldCheckFill } from "react-icons/pi";
import { BiSolidCheckShield } from "react-icons/bi";
import { BiCheckShield } from "react-icons/bi";
import Listings from '../components/listings/Listings';
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import ShopListings from '../components/listings/ShopListings';
import Pagination from '../components/Pagination';

import AllListingsDisplay from '../components/listings/AllListingsDisplay';


const AllListings= () => {
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    const categories = [
        "Crops",
        "Livestock",
        "Aquatic",
        "Processed",
        "Fruits",
        "vegetables"
    ]

    // const img = "bg-[url("http://localhost:3000/images/banner/shop.png")]"

    const [state, setState] = useState({values : [10,2000]})
  return (
    <>
         <Headers/>
         <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left bg-bg-main bg-center' style={{ backgroundImage: "url('/images/banner/shop.jpg')" }} >
         {/* <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/cluster.jpg')" }}> */}
            <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
               <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                    <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            {/* <h2 className='text-4xl font-bold font-roboto'>Harvestify </h2> */}
                            <div className="w-full flex justify-center items-center">
                                <img className='w-3/12' src={`/images/Harvestify_logo_full.png`} alt="" />
                            </div>
                            <div className="flex justify-center items-center gap-1 text-xs w-full">
                                {/* <Link to='/'>Home</Link>
                                <span><FaAngleRight size='10px'/></span>
                                <span>Clusters</span>
                                <span><FaAngleRight size='10px'/></span>
                                <span>Mati Rice Farmers Association</span> */}
                            </div>
                    </div>
                </div>
            </div>
         </section>
         <section className='py-16'>
            <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                <div className={`md:block hidden ${!filter ? 'mb-6':'mb-0'}`}>
                    <button onClick={()=>setFilter(!filter)} className='text-center w-full py-2 px-3 bg-accent text-white font-semibold'>Filter Listings</button>
                </div>
                <div className="w-full flex flex-wrap">
                    <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                        <h2 className='text-xl font-bold mb-3 text-slate-600'>Category</h2>
                        <div className='py-2'>
                            {
                                categories.map((c,i)=> <div className='flex justify-start items-center gap-2 py-1' key={i}>
                                    <input className='' type="checkbox" id={i}/>
                                    <label className='text-slate-600 block cursor-pointer' htmlFor="">{c}</label>
                                </div>)
                            }
                        </div>
                        <div className="p-2 flex flex-col gap-5">
                            <h2 className='text-2xl font-bold mb-3 text-slate-600'>Expected Harvest (tons)</h2>
                            <Range
                                step={5}
                                min={10}
                                max={2000}
                                values = {state.values}
                                onChange={(values)=>setState({values})}
                                renderTrack={({props, children})=>(
                                    <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-default'>
                                        {children}

                                    </div>
                                )}
                                renderThumb={({props})=>(
                                    <div className='w-[15px] h-[15px] bg-blue-500 rounded-full' {...props}/>
                                 
                                )}
                            />
                            <div className="">
                                <span className='text-accent text-lg font-semibold'>{Math.floor(state.values[0])}t - {Math.floor(state.values[1])}t</span>
                            </div>
                        </div>
                        <div className="py-3 flex flex-col gap-4">
                             <h2 className='text-xl font-bold mb-3 text-slate-600'>Cluster Rating</h2>
                             <div className="flex flex-col gap-3">
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                </div>
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>  
                                </div>
                             </div>
                        </div>
                        <div className="py-5 flex flex-col gap-4 md:hid">
                            {/* <Listings title = "Latest Listings" listings={latest_listing}/> */}
                        </div>
                    </div>
                    <div className="w-9/12 md-lg:w-8/12 md:w-full">
                        <div className="pl-8 md:pl-0">
                                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-center text-center border">
                                      <h2 className='visible md:invisible text-lg font-semibold text-slate-600 text-center '>6 Listings</h2>                                
                                    <div className="flex justify-center items-center gap-3">
                                        <select className='outline-none p-1 border outline-0 text-slate-600 font-semibold' name="" id="">
                                            <option value="">Sort By</option>
                                            <option value="">Low to High Harvest Quantity</option>
                                            <option value="">High to Low Harvest Quantity</option>
                                        </select>
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
                                <div className="pb-8">
                                    <Link to="http://localhost:3001/listing/details/asd123">
                                         <AllListingsDisplay styles={styles}/>
                                    </Link>
                                </div>
                                <div className="">
                                {/* {
                                    totalOrder <= parPage ? "" :
                                    <Pagination
                                    pageNumber = {currentPage}
                                    setPageNumber = {setCurrentPage}
                                    totalItem = {50}
                                    parPage = {parPage}
                                    showItem = {4}
                                />
                                } */}
                                </div>
                        </div>
                    </div>

                </div>
            </div>
         </section>
         <Footer/>
    </>
  )
}

export default AllListings