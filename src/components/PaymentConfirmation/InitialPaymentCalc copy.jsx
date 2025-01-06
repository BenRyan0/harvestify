import React from "react";

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  

const InitialPaymentCalc = ({ price, percentage }) => {
  // If no percentage is provided or it's 0, return the original price
  const calculatedValue = percentage && percentage > 0 ? price * (percentage / 100) : price;

  return (
    <div>
      {/* <p>Original Price: <span>{price}</span></p> */}
      {percentage && percentage > 0 ? (
        <p>{percentage}% of Price: 
        <span className='font-bold text-base'>&#8369;</span>
        <span>{formatNumber(price)}</span>
        <span>{formatNumber(calculatedValue)}</span>
        </p>
        // <p>{percentage}% of Price: <span>{calculatedValue.toFixed(2)}</span></p>
      ) : (
        <p><span>{formatNumber(calculatedValue)}</span></p>
        // <p><span>{calculatedValue.toFixed(2)}</span></p>
      )}
    </div>
  );
};

export default InitialPaymentCalc;
