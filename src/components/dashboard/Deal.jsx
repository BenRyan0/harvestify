import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_deal } from '../../store/reducers/dealReducer';
import { BiSolidDiscount } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { TbCurrencyPeso } from 'react-icons/tb';
import { IoTicketSharp } from 'react-icons/io5';
import { MdLocalShipping } from 'react-icons/md';

const Deal = () => {
  const { dealId } = useParams();
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
        Deal ID: {myDeal._id}, <span className="pl-1">{myDeal.date}</span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold">Deliver to: {myDeal.shippingInfo?.name}</h2>
          <p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Home
            </span>
            <div className="flex flex-col pl-2">
              <span className="text-slate-600 text-sm">{myDeal.shippingInfo?.address}</span>
              <span className="text-slate-600 text-sm">
                {myDeal.shippingInfo?.province}, {myDeal.shippingInfo?.munCity},{' '}
                {myDeal.shippingInfo?.barangay}, {myDeal.shippingInfo?.street}
              </span>
            </div>
          </p>
          <p className="text-slate-600 text-sm font-semibold">Email to {userInfo.email}</p>
        </div>
        <div className="text-slate-600">
          <h2>
            Price: <span className="pr-1">&#8369;</span>
            {formatNumber(myDeal.price + myDeal.shipping_fee)} include shipping fee
          </h2>
          <p>
            Payment status:{' '}
            <span
              className={`py-[1px] text-xs px-3 ${
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
              className={`py-[1px] text-xs px-3 ${
                myDeal.delivery_status === 'paid'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-red-100 text-red-800'
              } rounded-md `}
            >
              {myDeal.shipPickUpStatus}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-600 text-lg pb-2">LISTING</h2>
        <div className="w-full flex flex-row md-lg:flex-col">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-center items-center">
              <img
                className="w-[300px] rounded-md"
                src={myDeal.listing[0].images[0]}
                alt=""
              />
            </div>
            <div className="w-full bg-slate-300 mt-3 rounded-md py-3 px-3">
              <div className="">
                <h2>asdasd</h2>
              </div>
            </div>
          </div>
          <div className="w-full">asd02</div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
