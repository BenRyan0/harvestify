import React, { useEffect } from 'react';
import { HiShoppingCart } from "react-icons/hi2";
import { Link, redirect, useNavigate} from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {get_dashboard_index_data} from '../../store/reducers/dashboardReducer'
import { BiSolidDiscount } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const Index_ = () => {
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)
    const {totalOrder, cancelledOrder, recentOrders, pendingOrder} = useSelector(state => state.dashboard)
    

    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(get_dashboard_index_data(userInfo.id))
    },[])


    const redirect = (ord)=>{
        let items = 0;
        for(let i = 0; i<ord.length; i++){
            items = ord.listings[i].quantity + items
        }
        navigate('/payment',{
            state:{
                price: ord.price,
                items,
                orderId : ord._id
            }
        })
    }




    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(Math.floor(num));
      };
      
      
  return (
    <div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
            <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                <div className="bg-slate-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
                    <span className='text-xl text-green-800'>
                     <HiShoppingCart />
                    </span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center text-slate-600 text-base md:text-xl">
                    <h2 className='font-bold'>{totalOrder}</h2>
                    <span className='font-semibold  pl-1'>ORDERS</span>
                </div>

            </div>
            <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
                    <span className='text-xl text-blue-800'>
                     <HiShoppingCart />
                    </span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center text-slate-600 text-base md:text-xl">
                    <h2 className='font-bold'>{pendingOrder}</h2>
                    <span className='font-semibold pl-1'>PENDING DEALS</span>
                </div>

            </div>
            <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
                <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-base md:text-xl">
                    <span className='text-xl text-red-800'>
                     <HiShoppingCart />
                    </span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center text-slate-600 text-base md:text-xl">
                    <h2 className='font-bold'>{cancelledOrder}</h2>
                    <span className='font-semibold uppercase  pl-1'>Cancelled Deals</span>
                </div>
            </div>
        </div>
        <div className="bg-white p-4 mt-5 rounded-md">
            <h2 className='text-base font-semibold text-slate-600 uppercase'>MY ORDERS</h2>
            <div className="pt-4">
                <div className="relative overflow-x-auto">
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>LISTING</th>
                                <th scope='col' className='px-6 py-3'>PRICE</th>
                                <th scope='col' className='px-6 py-3'>TOTAL</th>
                                <th scope='col' className='px-6 py-3'>SHIPMENT</th>
                                <th scope='col' className='px-6 py-3'>payment</th>
                                <th scope='col' className='px-6 py-3'>STATUS</th>
                                <th scope='col' className='px-6 py-3'>Action</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recentOrders.map((o,i) => 
                                    <tr className='bg-white border-b '>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.listing[0].name}</td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap flex gap-1'>
                                    <div className="flex">
                                        <span className='font-normal pr-[1px]'>&#8369;</span>
                                        {formatNumber(o.listing[0].price)}
                                        <p className='flex flex-row'>/ <span className='font-bold text-primaryDark'>{o.listing[0].unit}</span></p>
                                        
                                        <div className="pl-1">
                                          <span>&#64;</span>
                                          <span>{o.listing[0].expectedHarvestYield}{o.listing[0].yieldUnit}</span>
                                        </div>
                                        
                                    </div> 
                                </td>

                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                   {
                                        o.listing[0].discount? 
                                        <div className="flex">
                                        <span className='font-normal pr-[1px]'>&#8369;</span>
                                        {formatNumber(o.price + o.shipping_fee)}
                                        {/* <div className="bg-green-300 px-1 py-[1px] flex justify-center items-center rounded-sm ml-1">
                                            -{o.listing[0].discount}
                                            <span><BiSolidDiscount /></span>
                                        </div> */}
                                    </div> : 
                                     <div className="flex">
                                     <span className='font-normal pr-[1px]'>&#8369;</span>
                                     {formatNumber(o.price)}
                                    
                                 </div>
                                   }
                                </td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                    {
                                        o.shippingMethod === "traderPickup" ? 'Self Pickup' : 
                                        <div className="">
                                            <span className='font-semibold text-primaryDark'>&#8369; </span>
                                            {formatNumber(o.shipping_fee)}
                            
                                        </div>
                                    }
                                </td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.paymentStatus}</td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.shipPickUpStatus}</td>
                                <td scope='row' className='px-6 py-4 flex justify-start'>
                                {/* <Link to={`/dashboard/deal/detail/${o._id}`}>
                                        <span className='bg-green-100 hover:bg-green-400 text-green-800 hover:text-slate-100 text-sm font-bold mr-2 px-3 py-[5px] rounded-md flex justify-center items-center gap-1 transition-all duration-300'>Progress <span><FaRegEye size={17}/></span></span>
                                    </Link> */}
                                    {
                                        o.shipPickUpStatus === "completed" ?
                                        (
                                            <div className="">
                                                <h2 className='font-bold text-primaryDark'>DONE</h2>
                                            </div>
                                        )
                                        :
                                        (
                                        <Link to={`/dashboard/deal/details/${o._id}`}>
                                            <span className='bg-green-100 hover:bg-green-400 text-green-800 hover:text-slate-100 text-sm font-bold mr-2 px-3 py-[5px] rounded-md flex justify-center items-center gap-1 transition-all duration-300'>view <span><FaRegEye size={17}/></span></span>
                                        </Link>
                                        ) 
                                        
                                        
                                        }
                                  

                            {
                                o.shipPickUpStatus === "confirmed" ? 
                                <Link to={`/dashboard/deal/detail/${o._id}`}>
                                <span className='bg-green-100 hover:bg-green-400 text-green-800 hover:text-slate-100 text-sm font-bold mr-2 px-3 py-[5px] rounded-md flex justify-center items-center gap-1 transition-all duration-300'>Progress <span><FaRegEye size={17}/></span></span>
                            </Link> :
                                o.shipPickUpStatus === "received" ? 
                                <Link to={`/dashboard/deal/detail/${o._id}`}>
                                <span className='bg-green-100 hover:bg-green-400 text-green-800 hover:text-slate-100 text-sm font-bold mr-2 px-3 py-[5px] rounded-md flex justify-center items-center gap-1 transition-all duration-300'>Progress <span><FaRegEye size={17}/></span></span>
                            </Link> :
                                o.shipPickUpStatus === "pending" ? '' :
                                o.shipPickUpStatus === "complete" ? '' :
                                o.shipPickUpStatus === "inTransit" ? '' :
                                o.shipPickUpStatus === "cancelled" ? '' :
                                o.shipPickUpStatus === "rejected" ? '' :
                                ''
                            }
{/* 
                            {
                                o.shipPickUpStatus === "confirmed" ?  <span onClick={()=>redirect(o)} className='bg-green-100 text-green-800 text-sm font-bold mr-2 px-5 py-[5px] rounded-md cursor-pointer'>Pay Now</span> :
                                o.shipPickUpStatus === "pending" ? '' :
                                o.shipPickUpStatus === "complete" ? '' :
                                o.shipPickUpStatus === "inTransit" ? '' :
                                o.shipPickUpStatus === "cancelled" ? '' :
                                o.shipPickUpStatus === "rejected" ? '' :
                                '...'
                            } */}

                                </td>
                                <td>
                                
                                </td>
                            </tr>
                                
                                
                                )
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index_