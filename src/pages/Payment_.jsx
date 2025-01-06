import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import Stripe from '../components/Stripe'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('stripe')

  return (
    <div>
      <Headers/>
      {/* <section className='bg-[#eeeeee]'>
          <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 bg-red-700">
            <div className="flex flex-wrap md:flex-col-reverse bg-green-700 justify-center items-center">
              <div className="">
                asd
              </div>
            </div>
        </div>
      </section> */}
        <div className="bg-slate-200 mt-4">
                <div className="w-full justify-center items-center p-10">
                    <form className="grid lg:grid-cols-1 grid-cols-2 md:w-[90%] w-[60%] mx-auto bg-white rounded-md justify-center items-center p-5">
                       <div className="w-full h-full lg:hidden block">
                            <img className='w-full h-full rounded border-2 border-slate-300' src="http://localhost:3001/images/Login_Register.jpg" alt="" />
                            
                        </div>
                        <div className="p-5">
                            <h2 className='text-center w-full text-xl text-slate-600 font-black'>Leave A message</h2>
                            <div className="">
                            <div className=''>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="email">Email</label>
                                    <textarea name="" id=""></textarea>
                                    {/* <input  type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='email' name='email' placeholder='Email' /> */}
                                </div>
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className='text-[#208515]' htmlFor="password">Password</label>
                                    <input type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-accent rounded-md' id='password' name='password' placeholder='Password' />
                                </div>
                                <button className='px-8 w-full mt-4 py-2 bg-accent hover:shadow-lg hover:shadow-accent/10 rounded-md font-bold text-white'>LOGIN</button>
                            </div>
                            <div className="mt-6 w-full text-center">
                                {/* <p className='text-sm text-slate-600 -mb-2 pb-1'>Don't Have An Account Yet? <span className='text-sm font-semibold text-primaryDark'><Link to="/register">Apply for Trader Account</Link></span>
                                </p> */}
                            </div>
                            {/* <div className="mt-6 w-full text-center">
                                <p className='text-sm text-slate-600 -mb-2 pb-1'>Don't Have An Account Yet?</p>
                                <span className='text-sm font-semibold text-primaryDark'><Link to="/register">Fill Up An Application</Link></span>
                            </div> */}
                            </div>
                        </div>
                      
                    </form>
                </div>
            </div>
      <Footer/>
    </div>
  )
}

export default Payment