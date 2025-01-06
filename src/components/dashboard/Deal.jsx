import React, { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {get_deal} from '../../store/reducers/dealReducer'
import { BiSolidDiscount } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import { IoTicketSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

const Deal = () => {
    const {dealId} = useParams()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth) 
    const {myDeal} = useSelector(state => state.deal)

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
      };
      

    useEffect(()=>{
        dispatch(get_deal(dealId))
    },[dealId])
  return (
    // <div className='bg-white p-5'>
    //     <h2></h2>

    // </div>
            <div className='bg-white p-5'>
            <h2 className='text-slate-600 font-semibold'>#{myDeal._id} , <span className='pl-1'>{myDeal.date}</span></h2>
            <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-slate-600 font-semibold'>Deliver to: {myDeal.shippingInfo?.name}</h2>
                    <p>
                        <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>Home</span>
                        <div className="flex flex-col pl-2">
                            <span className='text-slate-600 text-sm'>{myDeal.shippingInfo?.address}</span>
                            <span className='text-slate-600 text-sm'>{myDeal.shippingInfo?.province}, {myDeal.shippingInfo?.munCity}, {myDeal.shippingInfo?.barangay}, {myDeal.shippingInfo?.street}</span>
                        </div>
                        
                    </p>
                    <p className='text-slate-600 text-sm font-semibold'>Email to {userInfo.email}</p>
                </div>
                <div className='text-slate-600'>
                    <h2>Price: <span className='pr-1'>&#8369;</span>{formatNumber(myDeal.price + myDeal.shipping_fee)} include shipping fee</h2>
                    {/* <h2>Price: <span className='pr-1'>&#8369;</span>{myDeal.price}  include shipping fee</h2> */}
                    <p>Payment status: <span className={`py-[1px] text-xs px-3 ${myDeal.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md `}>{myDeal.paymentStatus}</span></p>
                    <p>Order status: <span className={`py-[1px] text-xs px-3 ${myDeal.delivery_status === 'paid' ? 'bg-indigo-100 text-indigo-800' : 'bg-red-100 text-red-800'} rounded-md `}>{myDeal.shipPickUpStatus}</span></p>
                </div>
            </div>
            <div className='mt-3'>
                <h2 className='text-slate-600 text-lg pb-2'>LISTING</h2>
                <div className='flex gap-5 flex-col pl-2'>
                    {
                        myDeal.listing?.map((p, i) => <div key={i}>
                            <div className='flex gap-5 justify-start items-center text-slate-600'>
                                <div className='flex gap-2'>
                                    <img className='w-[55px] h-[55px]' src={p.images[0]} alt="listing" />
                                    <div className='flex text-sm flex-col justify-start items-start'>
                                        <Link>{p.name}</Link>
                                        <span>{p.clusterName}</span>
                                        
                                        <p>
                                           
                                        </p>
                                    </div>
                                </div>
                                <div className='pl-4 flex flex-col text-base'>
                                    <h2 className='text-base text-primaryDark'> <span>&#8369;</span>{p.price} /<span className='font-bold'>{p.unit}</span> <span>&#64;</span> {p.expectedHarvestYield} <span className='font-bold'>{p.yieldUnit}</span> </h2>                   
                                        {p.discount > 0 ? (
                                            <div className="flex justify-start items-center">
                                                <span>&#8369;</span>
                                                <h2 className=" text-primary pr-1">
                                                    {formatNumber(p.totalPrice - Math.floor((p.totalPrice * p.discount) / 100))}
                                                </h2>
                                                <p className="line-through">{formatNumber(p.totalPrice)}</p>
                                                <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{p.discount}% 
                                                <IoTicketSharp  className='ml-[1px]'/></p>
                                            </div>
                                        ) : p.discount === 0 ? (
                                            <div className="flex items-center">
                                                <span className=''><TbCurrencyPeso size={19} /></span>
                                                <h2 className="text-primaryDark ">{formatNumber(p.totalPrice)}</h2>
                                            </div>
                                        
                                        ) : (
                                            <div className="flex items-center">
                                                <span className=''><TbCurrencyPeso size={19} /></span>
                                                <h2 className="text-primaryDark ">{formatNumber(p.totalPrice)}</h2>
                                            </div>
                                        )}
                                        <div className="">
                                         <p className="flex items-center gap-1 text-base text-gray-500 bg-primary/50">+ {p.shippingFee}  <MdLocalShipping className='' size={19} /></p>
                                        </div>
           
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
  )
}

export default Deal