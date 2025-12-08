import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Ratings from './Ratings';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import RatingReact from 'react-rating';
import { BiSolidCheckShield, BiShield } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { trader_review, messageClear, get_reviews, get_listing } from '../store/reducers/homeReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import dateFormat from "dateformat";

const Reviews = ({ listing, slug }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { 
    errorMessage, 
    successMessage, 
    reviews, 
    totalReview,
    rating_review 
  } = useSelector(state => state.home);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [rate, setRate] = useState('');
  const [rev, setRev] = useState('');

  const perPage = 2;
  const listingId = listing?._id;
  const sellerId = listing?.sellerId?._id;
  const sellerRating = listing?.sellerId?.rating || 0;

  // Memoize rating distribution calculations
  const ratingDistribution = useMemo(() => {
    if (!rating_review || totalReview === 0) return [];
    
    return [5, 4, 3, 2, 1].map((rating, index) => ({
      rating,
      count: rating_review[index]?.sum || 0,
      percentage: Math.floor((100 * (rating_review[index]?.sum || 0)) / totalReview)
    }));
  }, [rating_review, totalReview]);

  // Memoize review submit handler
  const review_submit = useCallback((e) => {
    e.preventDefault();
    
    if (!rate || !rev.trim()) {
      toast.error('Please provide a rating and review');
      return;
    }

    const obj = {
      name: userInfo.name,
      review: rev.trim(),
      rating: rate,
      listingId,
      sellerId
    };
    
    dispatch(trader_review(obj));
  }, [rate, rev, userInfo?.name, listingId, sellerId, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      
      if (listingId && sellerId) {
        dispatch(get_reviews({
          listingId,
          sellerId,
          pageNumber
        }));
      }

      if (slug) {
        dispatch(get_listing(slug));
      }
      
      setRate('');
      setRev('');
      dispatch(messageClear());
    }
  }, [successMessage, listingId, sellerId, pageNumber, slug, dispatch]);

  // Fetch reviews when dependencies change
  useEffect(() => {
    if (listingId && sellerId) {
      dispatch(get_reviews({
        listingId,
        sellerId,
        pageNumber
      }));
    }
  }, [pageNumber, listingId, sellerId, dispatch]);

  // Early return if no listing data
  if (!listing) {
    return null;
  }

  return (
    <div className='mt-8'>
      <div className="flex gap-10 md:flex-col">
        {/* Rating Summary */}
        <div className="flex flex-col gap-2 justify-start items-start p-4">
          <div>
            <span className='text-4xl font-semibold'>{sellerRating}</span>
            <span className='text-2xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className="flex flex-row text-lg">
            <Ratings ratings={sellerRating} />
          </div>
          <p>{totalReview} Transaction Ratings</p>
        </div>

        {/* Rating Distribution */}
        <div className="flex gap-2 flex-col py-4">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex justify-start flex-row items-center gap-5">
              <div className="text-md flex gap-1 w-[93px]">
                <RatingTemp rating={rating} />
              </div>
              <div className="w-[200px] h-[14px] bg-slate-200 relative">
                <div 
                  style={{ width: `${percentage}%` }} 
                  className="h-full bg-primary transition-all duration-300"
                />
              </div>
              <p className='text-sm text-slate-500 w-[0%]'>{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div>
        <h2 className='text-slate-600 text-xl font-bold py-5'>
          Past Listings Reviews {totalReview}
        </h2>
        
        <div className="flex flex-col gap-3 pb-10 pt-4">
          {reviews?.length > 0 ? (
            reviews.map((r) => (
              <div key={r._id || r.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-xl">
                    <RatingTemp rating={r.rating} />
                  </div>
                  <span className='text-slate-500'>
                    {dateFormat(r.createdAt, "yyyy-mm-dd")}
                  </span>
                </div>
                <span className='text-slate-600 font-bold'>{r.name}</span>
                <p className='text-slate-600 px-5'>{r.review}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No reviews yet</p>
          )}
          
          {totalReview > perPage && (
            <div className="flex justify-end pt-10">
              <Pagination 
                pageNumber={pageNumber} 
                setPageNumber={setPageNumber} 
                totalItem={totalReview} 
                parPage={perPage} 
                showItem={Math.ceil(totalReview / perPage)} 
              />
            </div>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default React.memo(Reviews);