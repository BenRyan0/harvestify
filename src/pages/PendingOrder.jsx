import React from 'react';
import Footer from '../components/Footer';
import Headers from '../components/Headers';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';

const PendingOrder = () => {
    const { userInfo } = useSelector(state => state.auth);
    const { loader, successMessage, errorMessage } = useSelector(state => state.deal);

    // Destructure the state correctly
    const { state: { price, listing, items, orderId } } = useLocation();
    
    console.log(price, listing, items, orderId); // To check the data passed from navigate

    return (
        <div>
            <Headers />
            <section className='w-[85%] mx-auto h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/card.jpg')" }}>
                <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
                    <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            <h2 className='text-5xl font-bold font-roboto italic'>Harvestify.com </h2>
                            <div className="flex justify-center items-center gap-1 text-base w-full">
                                {/* <span>Your offer has been made, Please wait for the seller to confirm your offer.</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='w-[85%] mx-auto py-10 mt-6 bg-cover bg-no-repeat relative bg-left bg-primaryDark rounded-md'>
              
                    <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            {/* <h2 className='text-4xl font-bold font-roboto italic'>Harvestify.com </h2> */}
                            <div className="flex justify-center flex-col items-center gap-1 text-lg w-full text-wrap">
                                <span>Your offer has been made for the listing <span className='font-bold'> <Link to={`/listing/details/${listing.listingInfo.slug}`}>{listing.listingInfo.name}</Link></span> from <span className='font-bold'>{listing.listingInfo.clusterName
                                }</span>, Please wait for the seller to confirm your offer.</span>
                                <Link to={'/dashboard'} className='text-xs hover:underline'>You may now proceed to your Dashboard</Link>
                                {/* <div className="mt-5 flex flex-col">
                                <Link>Dashboard</Link>
                                <Link>Home</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
               
            </section>

            {/* Display the pending order details */}
            

            <Footer />
        </div>
    );
};

export default PendingOrder;
