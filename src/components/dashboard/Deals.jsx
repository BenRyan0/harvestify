import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { get_deals } from '../../store/reducers/dealReducer';
import { BiSolidDiscount } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const Deals = () => {
    const {userInfo} = useSelector(state => state.auth) 
    const { orders } = useSelector(state => state.deal)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [state, setState] = useState('all')




  useEffect(()=>{
    dispatch(get_deals({status: state, traderId: userInfo.id }))
  }, [state])

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
    return new Intl.NumberFormat('en-US').format(num);
  };



  
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className="flex justify-between items-center">
        <h2 className='text-base font-semibold text-slate-600'>My Orders</h2>
        <select className='outline-none px-3 py-1 border rounded-md text-slate-600 uppercase' value={state} onChange={(e)=>setState(e.target.value)} name="" id="">
          <option value="all"> ----ORDER STATUS----</option>
          <option value="placed"> PLACED</option>
          <option value="pending">PENDING</option>
          <option value="InTransit">IN TRANSIT</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>

      <div className="pt-4">
                <div className="relative overflow-x-auto">
                    <table className='w-full text-sm text-left text-gray-500 '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>DEAL ID</th>
                                <th scope='col' className='px-6 py-3'>PRICE</th>
                                <th scope='col' className='px-6 py-3'>payment</th>
                                <th scope='col' className='px-6 py-3'>DEAL STATUS</th>
                                <th scope='col' className='px-6 py-3'>STATUS</th>
                                <th scope='col' className='px-6 py-3 w-2/12'>Action</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                        {
                                orders.map((o,i) => 
                                    <tr className='bg-white border-b'>
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
                                        {formatNumber(o.price)}
                                        <div className="bg-green-300 px-1 py-[1px] flex justify-center items-center rounded-sm ml-1">
                                            -{o.listing[0].discount}
                                            <span><BiSolidDiscount /></span>
                                        </div>
                                    </div> : 
                                     <div className="flex">
                                     <span className='font-normal pr-[1px]'>&#8369;</span>
                                     {formatNumber(o.price)}
                                    
                                 </div>
                                   }

                       
                                </td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.paymentStatus} </td>
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.shipPickUpStatus}</td>
                                <td scope='row' className='px-6 py-4 flex justify-start'>
                                    <Link to={`/dashboard/deal/details/${o._id}`}>
                                        <span className='bg-green-100 hover:bg-green-400 text-green-800 hover:text-slate-100 text-sm font-bold mr-2 px-3 py-[5px] rounded-md flex justify-center items-center gap-1 transition-all duration-300'>view <span><FaRegEye size={17}/></span></span>
                                    </Link>
                                    {/* <span onClick={()=>redirect(o)} className='bg-green-100 text-green-800 text-sm font-bold mr-2 px-5 py-[5px] rounded-md cursor-pointer'>Pay Now</span> */}
                                </td>
                            </tr>
                                
                                
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  )
}

export default Deals