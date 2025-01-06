import React from 'react'
import {Link} from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoCalendarClearSharp } from "react-icons/io5";
import dateFormat, { masks } from "dateformat";
import Ratings from '../Ratings';
import { IoTicketSharp } from "react-icons/io5";
import { TbCurrencyPeso } from "react-icons/tb";


const Listings = ({title, listings}) => {
    const responsive = {
        superLargeDesktop : {
            breakpoint : { max: 4000, min: 3000},
            items: 1,
        },
        desktop : {
            breakpoint : { max: 3000, min: 1024},
            items: 1,
        },
        tablet : {
            breakpoint : { max: 1024, min: 464},
            items: 1,
        },
        mobile : {
            breakpoint : { max: 464, min: 0},
            items: 1,
        },
    }
    const ButtonGroup = ({next, previous})=>{
        return(
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">{title}</div>
                <div className="flex justify-center items-center gap-3 text-slate-600">
                    <button onClick={()=>previous()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <span><FaAngleLeft /></span>
                    </button>

                    <button onClick={()=>next()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <span><FaAngleRight/></span>
                    </button>
                </div>

            </div>
        )
    }

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(Math.floor(num));
      };
      
  return (
    <div className='flex gap-8 flex-col-reverse'>
          <Carousel className=''
                autoPlay = {false}
                infinite = {false}
                arrows={false}
                responsive={responsive}
                transitionDuration={500}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup/>}
                
            >
                {
                    listings.map((p,i)=>{
                        return(
                            <div className="flex flex-col-reverse justify-start gap-2 ">
                                {
                                    p.map(pl=> 
                                        <Link to={`/listing/details/${pl.slug}`} className='flex justify-between flex-row items-start border my-3 p-1 rounded-md transition-all duration-500 hover:shadow-lg h-[180px]'>
                                            <div className="w-[250px] h-full">
                                              <img className='w-full h-full rounded-md' src={pl.images[0]} alt="listing images" />
                                            </div>
                                            <div className="flex flex-col w-full px-2 relative h-full ">
                                                <div className="flex justify-end w-full text-end">
                                                        <div className="flex gap-1 justify-between w-full">
                                                            <div className="">
                                                                <span className='font-bold '>&#8369;</span>
                                                                <span className='text-base font-bold'>{pl.price}</span>
                                                                <span className='text-base font-bold'>/kg</span>
                                                            </div> 
                                                           
                                                           
                                                            
                                                            <div className="pl-1">
                                                                <span className='font-extrabold'>&#64;</span>
                                                                <span className='text-base font-bold'>{pl.expectedHarvestYield}</span>
                                                                <span className='text-base font-bold'>/{pl.yieldUnit}</span>
                                                            </div>
                                                        </div>
                                                   
                                                </div>
                                                <div className="flex justify-center w-full text-end">
                                                        <div className="flex gap-1 justify-between w-full">
                                                        {pl.discount > 0 ? (
                                                                <div className="flex justify-center items-center">
                                                                    <span className=''><TbCurrencyPeso size={19} /></span>
                                                                    <h2 className="text-lg text-primaryDark pr-1">
                                                                        {formatNumber(pl.totalPrice - Math.floor((pl.totalPrice * pl.discount) / 100))}
                                                                    </h2>
                                                                    <p className="line-through text-slate-500">{formatNumber(pl.totalPrice)}</p>
                                                                    <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{pl.discount}% 
                                                                    <IoTicketSharp  className='ml-[1px]'/></p>
                                                                </div>
                                                            ) : pl.discount === 0 ? (
                                                                <div className="flex items-center">
                                                                    <span className=''><TbCurrencyPeso size={19} /></span>
                                                                    <h2 className="text-primaryDark text-lg">{formatNumber(pl.totalPrice)}</h2>
                                                                </div>
                                                                
                                                            ) : (
                                                                <div className="flex items-center">
                                                                    <span className=''><TbCurrencyPeso size={19} /></span>
                                                                    <h2 className="text-primaryDark text-lg">{formatNumber(pl.totalPrice)}</h2>
                                                                </div>
                                                            )}
                                                        </div>
                                                   
                                                </div>
                                                <div className="flex justify-between w-full">
                                                         <h2 className='font-semibold text-sm pt-1'>{pl.name}</h2>
                                                </div>
                                               
                                                  <div className="w-full flex justify-between items-center text-sm">
                                                        <p>{pl.clusterName}</p>
                                                    </div>
                                                    <div className="w-full flex justify-between items-center">
                                                        <div className="flex">
                                                            <Ratings ratings={pl.sellerId.rating}/>
                                                        </div>
                                                    </div>
                                              
                                                {/* <div className="w-full">
                                                    <p>{pl.description}</p>
                                                </div> */}
                                                <div className="flex flex-col justify-center items-center text-sm w-full absolute bottom-0 left-0">
                                                    <div className="flex justify-center items-center gap-1 self-start pl-2">
                                                        <span className='text-primaryDark'><IoCalendarClearSharp /></span>
                                                        <h2>Harvest Date: </h2>
                                                    </div>
                                                    
                                                    <div className="flex gap-1 pl-2 font-bold">
                                                        <span>{dateFormat((listings.harvestStartDate), "yy-mm-dd")}</span>
                                                        -
                                                        <span>{dateFormat((listings.harvestEndDate), "yy-mm-dd")}</span>
                                                    </div>

                                                </div>
                                               
                                            </div>
                                      
                                        
                                    </Link>
                                    )
                                }
        
                         </div>
                        )
                    })
                }
             </Carousel>  

    </div>
  )
}

export default Listings