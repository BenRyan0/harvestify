import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_deal } from '../../store/reducers/dealReducer';
import { BiSolidDiscount } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { TbCurrencyPeso } from 'react-icons/tb';
import { IoTicketSharp } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';
import dateFormat, { masks } from "dateformat";
import { paymentAdd ,messageClear,deleteTraderDeal} from '../../store/reducers/transactionReducer';
import toast from 'react-hot-toast';
import { TiCancel } from "react-icons/ti";

const Deal = () => {
  const { dealId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myDeal } = useSelector((state) => state.deal);

  const [isLoading, setIsLoading] = useState(true);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  useEffect(() => {
    const fetchDeal = async () => {
      setIsLoading(true);
      await dispatch(get_deal(dealId)); // Wait for the dispatch to complete
      setIsLoading(false);
    };

    fetchDeal();
  }, [dealId, dispatch]);
  const [showModal, setShowModal] = useState(false);
 
  const handleConfirm = async () => {
    setShowModal(false); // Close the modal
    const resultAction = await dispatch(deleteTraderDeal(dealId)); // Dispatch the delete action
  
    if (deleteTraderDeal.fulfilled.match(resultAction)) {
      // If deletion is successful, navigate to the desired page
      navigate(`/dashboard`);
    } else {
      // Handle error if deletion fails
      toast.error("Failed to delete deal:", resultAction.payload);
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-slate-600 font-semibold text-lg">Loading deal details...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5">
      <h2 className="text-slate-600 font-semibold">
        <span className="pl-1">{myDeal.date}</span>
        {/* Deal ID: {myDeal._id}, <span className="pl-1">{myDeal.date}</span> */}
      </h2>
      <div className="flex flex-row lg:flex-col gap-3 px-3 py-2 rounded-md bg-slate-200">
        <div className="w-full flex flex-col gap-1 text-slate-600 ">
          <h2 className=" font-semibold">MY PROVIDED INFO</h2>
          {
            myDeal.shippingMethod === "traderPickup" ? 
            (
              <div className="pl-3 ">
                <h2><span className='font-semibold'>Name: </span>{myDeal.shippingInfo.name}</h2>
                <h2><span className='font-semibold'>Phone: </span>{myDeal.shippingInfo.phone}</h2>
                {/* <h2><span>Email: </span>{myDeal.shippingInfo.}</h2> */}
              </div>
            )
            :
            (
              <div className="">
                 <h2><span className='font-semibold'>Name: </span>{myDeal.shippingInfo.name}</h2>
                 <h2><span className='font-semibold'>Phone: </span>{myDeal.shippingInfo.phone}</h2>
                 <h2><span className='font-semibold'>Location: </span>{myDeal.shippingInfo.locationInfo}</h2>
                 <h2><span className='font-semibold'>Email: </span>{myDeal.shippingInfo.address}</h2>
              </div>
            )
          }
        </div>
        <div className="w-full text-slate-600">
          <h2>
            Price To Pay: <span className="pr-1">&#8369;</span>
            {formatNumber(myDeal.price + myDeal.shipping_fee)} 
          </h2>
          <p>
            Payment status:{' '}
            <span
              className={`text-xs font-bold px-3 py-1 ${
                myDeal.payment_status === 'paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              } rounded-md `}
            >
              {myDeal.paymentStatus}
            </span>
          </p>
          <p>
            Order status:{' '}
            <span
              className={`text-xs font-bold px-3 py-1  ${
                myDeal.delivery_status === 'paid'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-red-100 text-red-800'
              } rounded-md `}
            >
              {myDeal.shipPickUpStatus}
            </span>
          </p>

          {
             myDeal.shippingMethod === "traderPickup" ? 
             (
              <div className="">
                 
              </div>
             )
             :
             (
              <div className="">
                 <h2>
                  Shipping Distance: {myDeal.shipping_distance}km
                </h2>
                 <h2>
                  Price per km: <span className="pr-1">&#8369;</span>
                  {formatNumber(myDeal.listing[0].pricePerUnit)}/ {myDeal.listing[0].unit}
                </h2>
                 <h2>
                  Suggested Shipping Fee: <span className="pr-1">&#8369;</span>
                  {formatNumber(myDeal.price + myDeal.shipping_fee)} 
                </h2>
              </div>
             )
          }
         
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-600 text-lg pb-2">Product Info</h2>
        <div className="w-full flex flex-row md-lg:flex-col">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-center items-center">
             
            </div>
            <div className={`bg-slate-200 mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md  opacity-100 w-full flex flex-row`}>
             
              {
                myDeal.listing[0]? 
                (
                  <div className=" w-full flex flex-row lg:flex-col-reverse justify-between ">
                    <div className="w-full text-slate-600">
                      <h2><span className='font-bold uppercase pr-1'>Name: </span > {myDeal.listing[0].name}</h2>
                      <h2><span className='font-bold uppercase pr-1'>price: </span> <span>&#8369;</span> {myDeal.listing[0].price}/{myDeal.listing[0].unit}</h2>
                      <h2><span className='font-bold uppercase pr-1'>expectedHarvestYield: </span> {myDeal.listing[0].expectedHarvestYield} {myDeal.listing[0].yieldUnit}</h2>
                      <h2><span className='font-bold uppercase pr-1'>totalPrice: </span> {formatNumber(myDeal.listing[0].totalPrice)}</h2>
                      <h2><span className='font-bold uppercase pr-1'>description: </span> {myDeal.listing[0].description}</h2>
                      <h2><span className='font-bold uppercase pr-1'>harvestStartDate: </span> {dateFormat((myDeal.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                      <h2><span className='font-bold uppercase pr-1'>harvestEndDate: </span>{dateFormat((myDeal.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                      <h2><span className='font-bold uppercase pr-1'>locationInfo: </span> {myDeal.listing[0].locationInfo}</h2>
                      <h2 className='py-1'>
                        <span className="font-bold uppercase pr-1">mapsLink: </span>
                        <a 
                          href={myDeal.listing[0].mapsLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                        >
                          Open in Google Maps
                        </a>
                      </h2>
                      
                      <h2><span className='font-bold uppercase pr-1'>pricePerUnit: </span> {myDeal.listing[0].pricePerUnit} <span>&#8369;</span> /{myDeal.listing[0].unit}/KM</h2>
                      <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1 '>sellerDelivery: </span> 
                        {myDeal.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px] ">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }
                      </h2>
                      <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1'>traderPickup: </span> 
                        {myDeal.listing[0].traderPickup === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px]">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }  
                        </h2>
                        {
                          myDeal.listing[0].shippingFee === 0?
                          (
                            <div className=""></div>
                          )
                          :
                          (
                            <h2><span className='font-bold uppercase pr-1'>shippingFee: </span> {myDeal.listing[0].shippingFee}</h2>

                          )
                        }
                        <h2><span className='font-bold uppercase pr-1'>discount: </span> {myDeal.listing[0].discount} %</h2>
                        <h2><span className='font-bold uppercase pr-1'>category: </span> {myDeal.listing[0].category}</h2>
                        <h2><span className='font-bold uppercase pr-1'>clusterName: </span> {myDeal.listing[0].clusterName}</h2>
                      
                    </div>
                    <div className="py-3 w-full ">
                      <img
                            className="w-full h-full flex-row lg:w-[300px] rounded-md"
                            src={myDeal.listing[0].images[0]}
                            alt=""
                          />
                     </div>
                 </div> 
                  
                )
                :
                ( <div className=""></div> )
              }
             
             
            </div>
            <div className="w-full pt-5">
                                        <div>
                                            {
                                                              myDeal.paymentStatus === "Cancelled" ? (
                                                                <div className=""></div>
                                                              ):(
                                                                 <button
                                             onClick={() => setShowModal(true)}
                                             className="bg-red-400 font-semibold px-3 py-2 text-slate-100 rounded-sm flex justify-center items-center"
                                           >
                                             Cancel Deal
                                              <TiCancel size={25} />
                                            </button>
                                                              )
                                                            }
                                          
                                                    {showModal && (
                                                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
                                                       <div className="bg-white p-6 rounded-lg shadow-lg text-slate-600">
                                                          <h2 className="text-xl font-semibold">Confirm Navigation</h2>
                                                         <div className="text-center">
                                                            <p className="mt-2 text-[17px]">Are you sure you want to Cancel the order?</p>
                                                            <p className="mt-2 text-[13px]">Before the seller confirms it.</p>
                                                          </div>
                                                        
                                                          <div className="mt-4 flex justify-end gap-3">
                                                          
                                                            <button
                                                              onClick={handleCancel}
                                                              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                                            >
                                                              Cancel
                                                            </button>
                                                            <button
                                                              onClick={handleConfirm}
                                                              className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600"
                                                            >
                                                              Confirm
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                              )}
                                      </div>
                        </div>
           
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Deal;
