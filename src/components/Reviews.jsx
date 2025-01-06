import React,{useEffect, useState} from 'react'
import Ratings from './Ratings';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import RatingReact from 'react-rating'
import { BiSolidCheckShield } from "react-icons/bi";
import { BiShield } from "react-icons/bi";
import { Link } from 'react-router-dom';
import {trader_review, messageClear, get_reviews, get_listing} from '../store/reducers/homeReducer'
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast'
import dateFormat, { masks } from "dateformat";

const Reviews = (listing) => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state=>state.auth)
  const {errorMessage,successMessage, reviews,totalReview,
    rating_review,} = useSelector(state=>state.home)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [perPage, setPerPage] = useState(2)
  const [rate, setRate] = useState('')
  const [rev , setRev] = useState('')
  console.log()


  const review_submit = (e)=>{
    e.preventDefault()
    const obj = {
      name: userInfo.name,
      review : rev,
      rating: rate,
      listingId : listing.listing._id,
      sellerId : listing.listing.sellerId._id
      
    }
    dispatch(trader_review(obj))
  }


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(get_reviews({
        listingId : listing.listing._id,
        sellerId : listing.listing.sellerId._id,
        pageNumber
      }))

      dispatch(get_listing(listing.slug))
      setRate('')
      setRev('')
      dispatch(messageClear())
    }
  }, [successMessage])



//   useEffect(()=>{
//     if(successMessage){
//         toast.success(successMessage)
//         dispatch(get_reviews({
//           listingId : listing.listing._id,
//           sellerId : listing.listing.sellerId._id,
//           pageNumber
//         }))

//         dispatch(trader_review(listing.slug))
//         setRate('')
//         setRev('')
//         dispatch(messageClear())
        
//     }
//     if(errorMessage){
//         toast.error(errorMessage)
//         dispatch(messageClear())
//     }
// },[successMessage, errorMessage])



useEffect(()=>{
  console.log(pageNumber)
  if(listing.listing._id){
    dispatch(get_reviews({
      listingId : listing.listing._id,
      sellerId : listing.listing.sellerId._id,
      pageNumber
    }))
  }
}, [pageNumber,listing])
  return (
    <div className='mt-8'>
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start p-4">
          <div className="">
            <span className='text-4xl font-semibold'>{listing.listing.sellerId.rating}</span>
            <span className='text-2xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className="flex flex-row text-lg">
            <Ratings ratings={4.5}/>
          </div>
          <p>{totalReview} Transaction Ratings</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={5}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[0]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary "></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[0]?.sum}</p>
          </div>
          
          <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={4}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[1]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary"></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[1]?.sum}</p>
          </div>

          <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={3}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[2]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary"></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[2]?.sum}</p>
          </div>

          <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={2}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[3]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary"></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[3]?.sum}</p>
          </div>

          <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={1}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[4]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary"></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[4]?.sum}</p>
          </div>

          {/* <div className="flex justify-start flex-row items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={0}/>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width : `${Math.floor((100*(rating_review[5]?.sum || 0))/totalReview)}%`}} className="h-full bg-primary"></div>
            </div>
            <p className='text-sm text-slate-500 w-[0%]'>{rating_review[5]?.sum}</p>
          </div> */}
        </div>

      </div>

      <div className="">
        <h2 className='text-slate-600 text-xl font-bold py-5'>Past Listings Reviews {totalReview}</h2>
        <div className="flex flex-col gap-3 pb-10 pt-4">
          {
           reviews.map((r,i)=>
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-xl">
                    <RatingTemp rating={r.rating}/>
                  </div>
                  <span className='text-slate-500'>{dateFormat((r.createdAt), "yyyy-mm-dd")}</span>
                </div>
                <span className='text-slate-600 font-bold'>{r.name}</span>
                <p className='text-slate-600 px-5'>{r.review}</p>
              </div>
            )
          }
          <div className="flex justify-end pt-10">
            {
             totalReview > 5 &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalReview} parPage={perPage} showItem={Math.round(totalReview / 5)} />
            }
             
          </div>
        </div>
      </div>
      <div className="">
          {
            userInfo ?  <div className="flex flex-col gap-3">
            <div className="flex text-2xl">
                <RatingReact 
                onChange={(e)=>setRate(e)} 
                initialRating={rate}
                emptySymbol={  <span className='text-slate-500'><BiShield/></span>} 
                fullSymbol={ <span className='text-primary'><BiSolidCheckShield/></span>}
                />
                
            </div>
            <form onSubmit={review_submit}>
              <textarea value={rev} required onChange={(e)=>setRev(e.target.value)} className='border-2 outline-0 p-3 w-full border-slate-300 rounded-md text-slate-500 focus:border-primaryDark'  cols="30" rows="5" name="" id=""></textarea>
              <div className="mt-2">
                <button className='py-1 px-5 bg-primary text-white font-semibold rounded-md'>Submit</button>
              </div>
            </form>
          </div>
          :
          <div className="">
            <Link className='py-2 px-5 bg-primary text-white font-semibold rounded-md' to='/login'>LOGIN</Link>
          </div>
          }
      </div>
    </div>
  )
}

export default Reviews
