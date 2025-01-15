import React from 'react'
import Headers from './../components/Headers';
import Footer from './../components/Footer';

const AboutUs = () => {
  return (
    <div>
        <Headers/>
            
        <section className='max-container'>
      <h3 className='font-palanquin text-center text-4xl font-bold'>
        What Our
        <span className='text-coral-red'> Customers </span>
        Say?
      </h3>
      <p className='m-auto mt-4 max-w-lg  text-center info-text'>
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className='mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14'>
          <div className='flex justify-center items-center flex-col'>
          <img
            // src={imgURL}
            alt='customer'
            className='rounded-full object-cover w-[120px] h-[120px]'
          />
          <p className='mt-6 max-w-sm text-center info-text'>asdasdasd</p>
          <div className='mt-3 flex justify-center items-center gap-2.5'>
            {/* <img
              src={star}
              width={24}
              height={24}
              alt='rating star'
              className='object-contain m-0'
            /> */}
            <p className='text-xl font-montserrat text-slate-gray'>asdasd</p>
          </div>
          <h3 className='mt-1 font-palanquin text-3xl text-center font-bold'>
            asdasd
          </h3>
        </div>
          <div className='flex justify-center items-center flex-col'>
          <img
            // src={imgURL}
            alt='customer'
            className='rounded-full object-cover w-[120px] h-[120px]'
          />
          <p className='mt-6 max-w-sm text-center info-text'>asdasdasd</p>
          <div className='mt-3 flex justify-center items-center gap-2.5'>
            {/* <img
              src={star}
              width={24}
              height={24}
              alt='rating star'
              className='object-contain m-0'
            /> */}
            <p className='text-xl font-montserrat text-slate-gray'>asdasd</p>
          </div>
          <h3 className='mt-1 font-palanquin text-3xl text-center font-bold'>
            asdasd
          </h3>
        </div>
          <div className='flex justify-center items-center flex-col'>
          <img
            // src={imgURL}
            alt='customer'
            className='rounded-full object-cover w-[120px] h-[120px]'
          />
          <p className='mt-6 max-w-sm text-center info-text'>asdasdasd</p>
          <div className='mt-3 flex justify-center items-center gap-2.5'>
            {/* <img
              src={star}
              width={24}
              height={24}
              alt='rating star'
              className='object-contain m-0'
            /> */}
            <p className='text-xl font-montserrat text-slate-gray'>asdasd</p>
          </div>
          <h3 className='mt-1 font-palanquin text-3xl text-center font-bold'>
            asdasd
          </h3>
        </div>
      </div>
    </section>
        <Footer/>
    </div>
  )
}

export default AboutUs