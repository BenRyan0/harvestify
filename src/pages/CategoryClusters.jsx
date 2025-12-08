import React, {useEffect, useState} from 'react'
import Headers from '../components/Headers'
import {Range} from 'react-range'
import { Link , useSearchParams} from 'react-router-dom'
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
import Clusters from '../components/listings/Clusters';
import Pagination from '../components/Pagination';
import {useDispatch, useSelector} from 'react-redux'
import {price_range_listing,yield_range_listing,query_listings,get_listings, expected_yields_units,get_all_sellers } from '../store/reducers/homeReducer'



const CategoryClusters = () => {

    let [searchParams, setsearchParams] = useSearchParams()
    // const category = searchParams.get('category')
    
    const dispatch = useDispatch()
    const {allListings,listings,totalListing,latestListings, priceRange, allYieldUnits, yieldRange , sellers} = useSelector(state=>state.home)
    console.log(allListings)


    
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    // const [state, setState] = useState({values : [50,100]})
    const [rating, setRating] = useState('')
    const [sortPrice, setSortPrice] = useState('')
    const [sortYield, setSortYield] = useState('')
    const [sortYieldUnit, setSortYieldUnit] = useState('')

    // const [priceValues, setPriceValues] = useState([priceRange.low, priceRange.high]);
    // const [yieldValues, setYieldValues] = useState([yieldRange.low, yieldRange.high]);



    useEffect(()=>{
        dispatch(get_all_sellers())
    },[])
     
  return (
    <div className="sm:px-0 md:px-16">
         <Headers/>
         <section className=' w-[85%] mx-auto h-[150px] mt-6 bg-cover bg-no-repeat relative bg-left md-lg:hidden' style={{ backgroundImage: "url('/images/banner/1.jpg')" }}>
            <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
               <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                    <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            <h2 className='text-4xl font-bold font-roboto italic'>Harvestify.com </h2>
                            <div className="flex justify-center items-center gap-1 text-xs w-full">
                                <Link to='/'>Home</Link>
                                <span><FaAngleRight size='10px'/></span>
                                <span>Listings</span>
                                {/* <span><FaAngleRight size='10px'/></span> */}
                                {/* <span>Mati Rice Farmers Association</span> */}
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
                    <div className="w-full">
                        <div className="pl-8 md:pl-0">
                                <div className="py-4 mb-10 px-3 rounded-md flex justify-between items-center text-center border">
                                      <h2 className='visible md:invisible text-lg font-semibold text-slate-600 text-center '>{sellers.length} Clusters</h2>                                
                                    <div className="flex justify-center items-center gap-3 ">
                                        {/* <select onChange={(e)=> setSortPrice(e.target.value)} className='outline-none p-1 border outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm' name="" id="">
                                            <option value="">Price</option>
                                            <option value="low-to-high">Low to High</option>
                                            <option value="high-to-Low">High to Low</option>
                                        </select>
                                        <select onChange={(e)=> setSortYield(e.target.value)} className='outline-none p-1 border outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm' name="" id="">
                                            <option value="">Quantity</option>
                                            <option value="low-to-high">Low to High</option>
                                            <option value="high-to-Low">High to Low</option>
                                        </select> */}
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
                                    <Clusters clusters={sellers} styles={styles}/>
                                    {/* <ShopListings listing={paginatedListings()} styles={styles} /> */}

                                </div>
                                <div className="">
                                {
                                        sellers.length > perPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalListing} parPage={perPage} showItem={Math.floor(totalListing / perPage) + 1} />
                                    }
                                    {/* {
                            totalListing > perPage &&
                            <Pagination
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                totalItem={totalListing}
                                parPage={perPage}
                                showItem={Math.floor(totalListing / perPage) + 1}
                            />
                        } */}
                                    {/* {
                                        totalListing > perPage &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalListing} parPage={perPage} showItem={Math.floor(totalListing/perPage + 1)} />
                                    } */}
                                   
                                </div>
                        </div>
                    </div>

                </div>
            </div>
         </section>
         <Footer/>
    </div>
  )
}

export default CategoryClusters