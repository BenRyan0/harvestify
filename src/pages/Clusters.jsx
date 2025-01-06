import React, {useEffect, useState} from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import {price_range_listing,yield_range_listing,query_listings,get_listings, expected_yields_units} from '../store/reducers/homeReducer'



const Clusters = () => {
    const dispatch = useDispatch()
    const {categories,allListings,listings,totalListing,latestListings, priceRange, allYieldUnits, yieldRange, parPage} = useSelector(state=>state.home)
    console.log(allListings)


    
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    const  [category, setCategory] = useState('')
    // const [state, setState] = useState({values : [50,100]})
    const [rating, setRating] = useState('')
    const [sortPrice, setSortPrice] = useState('')
    const [sortYield, setSortYield] = useState('')
    const [sortYieldUnit, setSortYieldUnit] = useState('')

    const [priceValues, setPriceValues] = useState([priceRange.low, priceRange.high]);
    const [yieldValues, setYieldValues] = useState([yieldRange.low, yieldRange.high]);



    useEffect(()=>{
        dispatch(price_range_listing())
        dispatch(expected_yields_units())
        dispatch(yield_range_listing())
    },[])
    
    
   // Slice listings for the current page


    
  

//    useEffect(()=>{
   
//     dispatch(get_listings())
//   },[allListings] )

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
    console.log(category)

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
      }, [priceValues, yieldValues, category, rating, pageNumber, sortPrice, sortYield, dispatch,sortYieldUnit]);

      const rstRating = ()=>{
        setRating('')
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
        }))
      }
    
  return (
    <>
         <Headers/>
         {/* <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' > */}
         <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/1.jpg')" }}>
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
                    <div className={`w-4/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                        <h2 className='text-xl font-bold mb-3 text-slate-600'>Category</h2>
                        <div className='py-2'>
                            {
                                categories.map((c,i)=> <div className='flex justify-start items-center gap-2 py-1' key={i}>
                                    <input checked={category === c.name ? true : false} onChange={(e)=>queryCategory(e, c.name)} className='' type="checkbox" id={c.name}/>
                                    <label className='text-slate-600 block cursor-pointer' htmlFor={c.name}>{c.name}</label>
                                </div>)
                            }
                        </div>
                         {/* Price Range Filter */}
                            <div className="p-2 flex flex-col gap-5">
                                <h2 className="text-2xl font-bold mb-3 text-slate-600">Price</h2>
                                <Range
                                step={1}
                                min={priceRange.low}
                                max={priceRange.high}
                                values={priceValues}
                                onChange={(values) => setPriceValues(values)}
                                renderTrack={({ props, children }) => (
                                    <div {...props} className="w-full h-[6px] bg-slate-200 rounded-full cursor-default">
                                    {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div className="w-[15px] h-[15px] bg-blue-500 rounded-full" {...props} />
                                )}
                                />
                                <div className="flex ">
                                <span className="text-accent text-lg font-semibold flex justify-start gap-1 items-center">
                                    <span>{Math.floor(priceValues[0])}</span>
                                    <span className='font-bold text-base'>&#8369;</span>
                                    <span> - </span>
                                    <span>{Math.floor(priceValues[1])}</span>
                                    <span className='font-bold text-base'>&#8369;</span>
                                     
                                    
                                </span>
                               
                                </div>
                            </div>

                            {/* Yield Range Filter */}
                            <div className="p-2 flex flex-col gap-5">
                                <h2 className="text-2xl font-bold mb-3 text-slate-600">Expected Yield ({sortYieldUnit})</h2>
                                <Range
                                step={1}
                                min={yieldRange.low}
                                max={yieldRange.high}
                                values={yieldValues}
                                onChange={(values) => setYieldValues(values)}
                                renderTrack={({ props, children }) => (
                                    <div {...props} className="w-full h-[6px] bg-slate-200 rounded-full cursor-default">
                                    {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div className="w-[15px] h-[15px] bg-blue-500 rounded-full" {...props} />
                                )}
                                />
                                <div className="flex">
                                <span className="text-accent text-lg font-semibold">
                                    {Math.floor(yieldValues[0])} {sortYieldUnit} - {Math.floor(yieldValues[1])}
                                </span>
                                <select
                                    onChange={(e) => setSortYieldUnit(e.target.value)}
                                    className="outline-none p-1 border-none text-slate-600 font-semibold rounded-sm"
                                    disabled={allYieldUnits.length === 1}
                                >
                                    <option value="">Unit</option>
                                    {allYieldUnits.map((unit, index) => (
                                    <option key={index} value={unit}>
                                        {unit}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                      
                        <div className="py-3 flex flex-col gap-4">
                             <h2 className='text-xl font-bold mb-3 text-slate-600'>Cluster Rating</h2>
                             <div className="flex flex-col gap-3">
                                <div onClick={()=>setRating(5)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                </div>
                                <div onClick={()=>setRating(4)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div onClick={()=>setRating(3)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div onClick={()=>setRating(2)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div onClick={()=>setRating(1)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiSolidCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                </div>
                                <div onClick={rstRating} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>
                                    <span><BiCheckShield /></span>  
                                </div>
                             </div>
                        </div>
                        <div className="py-5 flex flex-col gap-4 md:hid">
                            <Listings title = "Latest Listings" listings={latestListings}/>
                        </div>
                    </div>
                    <div className="w-8/12 md-lg:w-8/12 md:w-full">
                        <div className="pl-8 md:pl-0">
                                <div className="py-4 mb-10 px-3 rounded-md flex justify-between items-center text-center border">
                                      <h2 className='visible md:invisible text-lg font-semibold text-slate-600 text-center '>{totalListing} listings</h2>                                
                                    <div className="flex justify-center items-center gap-3 ">
                                        <select onChange={(e)=> setSortPrice(e.target.value)} className='outline-none p-1 border outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm' name="" id="">
                                            <option value="">Price</option>
                                            <option value="low-to-high">Low to High</option>
                                            <option value="high-to-Low">High to Low</option>
                                        </select>
                                        <select onChange={(e)=> setSortYield(e.target.value)} className='outline-none p-1 border outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm' name="" id="">
                                            <option value="">Quantity</option>
                                            <option value="low-to-high">Low to High</option>
                                            <option value="high-to-Low">High to Low</option>
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
                                <div className="pb-8 ">
                                    <ShopListings listings={listings} styles={styles}/>
                                    {/* <ShopListings listing={paginatedListings()} styles={styles} /> */}

                                </div>
                                <div className="">
                                {/* {
                                        totalListing > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalListing} parPage={parPage} showItem={Math.floor(totalListing / parPage)} />
                                    } */}
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
  )
}

export default Clusters