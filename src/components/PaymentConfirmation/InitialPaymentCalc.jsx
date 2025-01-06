import React from "react";

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  

const InitialPaymentCalc = ({ price, percentage }) => {
  // If no percentage is provided or it's 0, return the original price
  const calculatedValue = percentage && percentage > 0 ? price * (percentage / 100) : price;

  return (
    <div className="w-full flex justify-between">
        <div className="">
            <p>
                <span>{percentage}% </span>
                 of  
                <span className='font-bold text-base h-full pl-1 pr-[1px]'>&#8369;</span>
                 {formatNumber(price)}
            </p>
           
        </div>
        <div className="">
            <p className="text-primaryDark">
                <span className='font-bold text-base h-full pl-1 pr-[1px]'>&#8369;</span>
                <span>{formatNumber(calculatedValue)}</span>
            </p>
        </div>
    </div>
  );
};

export default InitialPaymentCalc;
