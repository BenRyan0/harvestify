import React, { useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaHandshake, FaPhone, FaTruckLoading, FaTruck, FaCheck, FaUsers, FaUser } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { PiStackPlusFill } from "react-icons/pi";
import { RiMessage3Fill } from "react-icons/ri";
import { TbCurrencyPeso } from "react-icons/tb";
import { IoTicketSharp } from "react-icons/io5";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslation } from "react-i18next";

import DaysCounter from "../DaysCounter";
import Ratings from "../Ratings";
import { add_to_card, messageClear } from "../../store/reducers/cardReducer";

// Constants
const GRID_CLASSES = "grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6";
const TOOLTIP_CLASSES = "!bg-primaryDark !text-white !rounded-lg !px-3 !py-2 !text-[9px] shadow-lg font-semibold";
const DATE_FORMAT = "mmmm dS, yyyy";
const SHORT_DATE_FORMAT = "yyyy-mm-dd";

// Utility Functions
const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(Math.floor(num));
};

const getFirstTwoSentences = (text) => {
  if (!text) return "";
  const sentences = text.match(/[^.!?]*[.!?]/g) || [text];
  return sentences.slice(0, 2).join(" ");
};

const calculateDiscountedPrice = (price, discount) => {
  return price - Math.floor((price * discount) / 100);
};

// Sub-components
const AdditionalFeatures = ({ features }) => {
  if (!features?.length) return null;

  return (
    <div className="flex justify-start items-end flex-col gap-1 absolute right-2 top-2">
      {features.map((feature, i) => (
        <div
          key={i}
          className="text-white px-2 py-1 bg-primaryDark/80 rounded-md font-semibold text-[9px] flex gap-1 items-center"
        >
          {feature}
          <FaCircleCheck />
        </div>
      ))}
    </div>
  );
};

const HarvestCounter = ({ listing, currentDate }) => (
  <div className="flex flex-col gap-2 justify-start items-start absolute w-[60px] h-[200px] font-semibold text-[8px] left-2 top-2 transition-all duration-700 z-50">
    <ul className="flex transition-all duration-700 left-1 top-5 justify-center items-center text-center absolute w-[60px] opacity-0 group-hover:left-[66px] group-hover:w-[60px] group-hover:opacity-100 text-[9px]">
      <div className="w-full py-2 px-0 z-0 cursor-pointer flex justify-end pr-1 items-center rounded-md text-primaryDark transition-all bg-white text-end">
        <h1>Till Harvest</h1>
      </div>
    </ul>
    <DaysCounter
      startDate={dateFormat(listing.harvestStartDate, SHORT_DATE_FORMAT)}
      endDate={dateFormat(listing.harvestEndDate, SHORT_DATE_FORMAT)}
      createdAt={dateFormat(listing.createdAt, SHORT_DATE_FORMAT)}
      currentDate={dateFormat(currentDate, SHORT_DATE_FORMAT)}
    />
  </div>
);

const ActionButtons = ({ listing, onAddToCart, onTakeDeal }) => (
  <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-1">
    <Link
      to={`/dashboard/chat/${listing.sellerId._id}`}
      className="w-[30px] h-[30px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] text-[#178448] hover:text-white hover:rotate-[720deg] transition-all"
      data-tooltip-id="message-tooltip"
      data-tooltip-content="Message Seller"
      aria-label="Message Seller"
    >
      <RiMessage3Fill size={15} />
    </Link>

    <Link
      to={`/listing/details/${listing.slug}`}
      className="w-[30px] h-[30px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] text-[#178448] hover:text-white hover:rotate-[720deg] transition-all"
      data-tooltip-id="details-tooltip"
      data-tooltip-content="View Details"
      aria-label="View Details"
    >
      <FaEye size={15} />
    </Link>

    <button
      onClick={onAddToCart}
      className="w-[30px] h-[30px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] text-[#178448] hover:text-white hover:rotate-[720deg] transition-all"
      data-tooltip-id="cart-tooltip"
      data-tooltip-content="Add to Cart"
      aria-label="Add to Cart"
    >
      <PiStackPlusFill size={15} />
    </button>

    <button
      onClick={onTakeDeal}
      className="w-[30px] h-[30px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] text-[#178448] hover:text-white hover:rotate-[720deg] transition-all"
      data-tooltip-id="negotiate-tooltip"
      data-tooltip-content="Take Deal"
      aria-label="Take Deal"
    >
      <FaHandshake size={15} />
    </button>

    <Tooltip id="message-tooltip" className={TOOLTIP_CLASSES} />
    <Tooltip id="details-tooltip" className={TOOLTIP_CLASSES} />
    <Tooltip id="cart-tooltip" className={TOOLTIP_CLASSES} />
    <Tooltip id="negotiate-tooltip" className={TOOLTIP_CLASSES} />
  </ul>
);

const PriceDisplay = ({ listing }) => {
  const { totalPrice, discount, price, unit, actualHarvestYield, expectedHarvestYield, yieldUnit } = listing;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount ? calculateDiscountedPrice(totalPrice, discount) : totalPrice;

  return (
    <>
      <div className="text-[14px] font-bold text-primaryDark">
        {hasDiscount ? (
          <div className="flex justify-start items-center">
            <span className="-ml-1">
              <TbCurrencyPeso size={19} />
            </span>
            <h2 className="text-primaryDark pr-1">{formatNumber(discountedPrice)}</h2>
            <p className="line-through text-slate-500">{formatNumber(totalPrice)}</p>
            <p className="flex items-center text-gray-500 bg-primary/50 mx-1 px-1">
              -{discount}%
              <IoTicketSharp />
            </p>
          </div>
        ) : (
          <div className="flex">
            <span>
              <TbCurrencyPeso size={19} />
            </span>
            <h2 className="text-primaryDark text-lg">{formatNumber(totalPrice)}</h2>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start flex-row flex-wrap w-full -mt-2 mb-3">
        <div className="flex text-center justify-center items-end text-[12px] font-bold pl-4">
          <span>{formatNumber(price)}</span>
          <span>/{unit}</span>
          <div>
            {actualHarvestYield ? (
              <div className="flex gap-2 justify-center items-center">
                <span className="font-extrabold text-[10px] ml-1">&#64;</span>
                <span
                  className="font-bold"
                  data-tooltip-id="actualHarvestYield"
                  data-tooltip-content={`Actual Yield: ${actualHarvestYield}${yieldUnit}`}
                >
                  {actualHarvestYield}
                </span>
                <span className="font-bold">{yieldUnit}</span>
                <Tooltip id="actualHarvestYield" className={TOOLTIP_CLASSES} />
              </div>
            ) : (
              <div className="text-[12px]">
                <span className="font-extrabold text-[12px] ml-1">&#64;</span>
                <span className="font-bold">{expectedHarvestYield}</span>
                <span className="font-bold">{yieldUnit}</span>
              </div>
            )}
          </div>
        </div>

        {actualHarvestYield > 0 && (
          <div className="pl-1">
            <div className="bg-primaryDark text-slate-200 px-2 py-0.5 flex justify-start gap-1 items-center rounded-md">
              <span className="text-[11px] font-bold">Harvested</span>
              <FaCheck size={12} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const SellerInfo = ({ listing, userInfo }) => {
  const { sellerId, clusterName } = listing;
  const isGroup = sellerId.memberCount > 1;

  return (
    <div className="flex gap-1">
      <Link to={`/clusters/cluster-details/${sellerId._id}`} className="h-[40px] w-[50px]">
        <img
          className="h-full border-2 border-primaryDark bg-primaryDark/50 rounded-full"
          src={sellerId.profileImage || "/images/Assests/user_profile.png"}
          alt={`${clusterName} profile`}
        />
      </Link>

      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-sm font-semibold flex gap-1 justify-center items-center">
            {clusterName}
            <span
              data-tooltip-id="seller-type"
              data-tooltip-content={`${sellerId.sellerType}: ${sellerId.memberCount}`}
            >
              {isGroup ? <FaUsers size={20} /> : <FaUser size={15} />}
            </span>
            <Tooltip id="seller-type" className={TOOLTIP_CLASSES} />
          </h1>
          <div className="flex items-center">
            <Ratings ratings={sellerId.rating} />
          </div>
        </div>
        {userInfo && (
          <div className="flex gap-1 items-center">
            <FaPhone />
            <span className="text-sm">{sellerId.phoneNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DeliveryOptions = ({ sellerDelivery, traderPickup }) => {
  if (!sellerDelivery && !traderPickup) return null;

  return (
    <div className="flex gap-3 text-md">
      {sellerDelivery && (
        <>
          <span data-tooltip-id="seller-delivery" data-tooltip-content="Seller Delivery">
            <FaTruckLoading />
          </span>
          <Tooltip id="seller-delivery" className={TOOLTIP_CLASSES} />
        </>
      )}
      {traderPickup && (
        <>
          <span data-tooltip-id="trader-pickup" data-tooltip-content="Trader Pickup">
            <FaTruck />
          </span>
          <Tooltip id="trader-pickup" className={TOOLTIP_CLASSES} />
        </>
      )}
    </div>
  );
};

// Main Component
const FeaturedListings = ({ listings = [] }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentDate = useMemo(() => new Date(), []);

  // Handle add to cart
  const handleAddCard = useCallback(
    (id) => {
      if (userInfo) {
        dispatch(
          add_to_card({
            userId: userInfo.id,
            quantity: 1,
            listingId: id,
          })
        );
      } else {
        navigate("/login");
      }
    },
    [userInfo, dispatch, navigate]
  );

  // Transform listing data for checkout
  const transformListingForCheckout = useCallback((listing) => {
    const { sellerId, ...rest } = listing;

    return {
      ...rest,
      _id: listing._id,
      sellerId: sellerId._id,
      slug: listing.slug || listing.name.replace(/\s+/g, "-"),
      stock: listing.stock || 1,
      unit: listing.unit || "ct",
      expectedHarvestYield: listing.expectedHarvestYield || 0,
      yieldUnit: listing.yieldUnit || "ct",
      category: listing.category || "Livestock products",
      description: listing.description || "No description available.",
      locationInfo: listing.locationInfo || "No location Available.",
      images: listing.images || [],
      discount: listing.discount || 0,
      shippingFee: listing.shippingFee || 0,
      firstName: sellerId.firstName,
      lastName: sellerId.lastName,
      listingInfo: { shippingFee: listing.shippingFee || 0 },
    };
  }, []);

  // Handle direct purchase
  const handleTakeDeal = useCallback(
    (listing) => {
      const transformedListing = transformListingForCheckout(listing);

      const checkoutData = {
        sellerId: listing.sellerId,
        shopName: listing.shopName || "Unknown Shop",
        price: listing.totalPrice,
        listingInfo: transformedListing,
        listings: [{ quantity: 1, listingInfo: transformedListing }],
      };

      navigate("/shipping", {
        state: {
          listings: checkoutData.listings,
          totalPrice: listing.totalPrice,
          shipping_fee: listing.shippingFee || 0,
          items: 1,
        },
      });
    },
    [navigate, transformListingForCheckout]
  );

  // Handle toast notifications
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  // Early return if no listings
  if (!listings?.length) {
    return (
      <div className="w-[85%] mx-auto text-center py-10">
        <p className="text-slate-600">No featured listings available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-lg text-slate-600 font-bold relative pb-[45px]">
          <h2>{t("featuredProducts")}</h2>
          <div className="w-[60px] h-[4px] bg-[#1EE35D] mt-1"></div>
        </div>
      </div>

      <div className={`w-full ${GRID_CLASSES}`}>
        {listings.map((listing) => (
          <article
            key={listing._id}
            className="border group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <AdditionalFeatures features={listing.additionalFeatures} />
              <HarvestCounter listing={listing} currentDate={currentDate} />

              <Link to={`/listing/details/${listing.slug}`}>
                <img
                  className="sm:w-full w-full h-[210px] rounded-md object-cover"
                  src={listing.images?.[0] || "/images/placeholder.jpg"}
                  alt={listing.name}
                />
              </Link>

              <ActionButtons
                listing={listing}
                onAddToCart={() => handleAddCard(listing._id)}
                onTakeDeal={() => handleTakeDeal(listing)}
              />
            </div>

            {/* Content Section */}
            <div className="py-3 text-slate-600 px-2 mt-1">
              <div className="flex justify-between">
                <h2>
                  {listing.commodity && (
                    <span className="font-bold text-xs bg-primaryDark rounded-sm px-1 py-[3px] text-slate-200 mr-1 mb-1">
                      {listing.commodity}
                    </span>
                  )}
                </h2>
                <DeliveryOptions
                  sellerDelivery={listing.sellerDelivery}
                  traderPickup={listing.traderPickup}
                />
              </div>

              <div className="flex justify-between flex-row items-center gap-[2px] text-sm flex-wrap mt-1">
                <div className="flex justify-start items-center flex-row flex-wrap mb-1 w-full text-start">
                  <span className="font-bold text-sm">{listing.name}</span>
                </div>

                <PriceDisplay listing={listing} />
              </div>

              <SellerInfo listing={listing} userInfo={userInfo} />

              {/* Description */}
              <div className="flex justify-center gap-1 py-1 items-center text-center h-[90px] flex-row text-xs">
                <p>
                  {getFirstTwoSentences(listing.description)}
                  {listing.description?.split(/[^.!?]*[.!?]/g).length > 2 && (
                    <Link
                      to={`/listing/details/${listing.slug}`}
                      className="font-bold text-[10px] ml-1 text-blue-500 underline"
                    >
                      Read more
                    </Link>
                  )}
                </p>
              </div>

              {/* Harvest Schedule */}
              <div className="flex justify-start gap-0 py-1 items-start flex-col border-y-2">
                <label className="text-[11px] font-bold">Harvest Schedule:</label>
                <div className="flex justify-between w-full items-center font-bold px-3">
                  <span className="text-xs">{dateFormat(listing.harvestStartDate, DATE_FORMAT)}</span>
                  <span>-</span>
                  <span className="text-xs">{dateFormat(listing.harvestEndDate, DATE_FORMAT)}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex justify-center gap-1 py-1 items-end">
                <IoLocationSharp size="20px" />
                <span className="text-xs">{listing.locationInfo || "No Location Data Available"}</span>
              </div>

              {/* Google Maps Link */}
              <div className="flex justify-center gap-1 py-1 items-end">
                <span className="text-xs font-bold">
                  {listing.mapsLink ? (
                    <a
                      href={listing.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      OPEN IN GOOGLE MAP
                    </a>
                  ) : (
                    "No Google Map location Data Available"
                  )}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;