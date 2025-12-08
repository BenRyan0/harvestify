import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";
import Ratings from "../Ratings";
import { IoTicketSharp } from "react-icons/io5";

const ListingsSideBar = ({ title, listings }) => {
  console.log("listings");
  console.log(listings);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold">{title}</div>
        <div className="flex justify-center items-center gap-3 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[20px] h-[20px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FaAngleLeft />
            </span>
          </button>

          <button
            onClick={() => next()}
            className="w-[20px] h-[20px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
      </div>
    );
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(Math.floor(num));
  };

  return (
    <div className="flex gap-8 flex-col-reverse ">
      <Carousel
        className=""
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {listings.map((p, i) => {
          return (
            <div className="flex flex-col-reverse justify-start gap-2 p-2">
              {p.map((pl) => (
                <Link
                  to={`/listing/details/${pl.slug}`}
                  className="rounded-md shadow-sm hover:shadow-lg p-1"
                >
                  <div className=" flex justify-center">
                    <div className="w-full px-2 relative">
                      <div className="flex justify-center flex-col w-full ">
                        <h2 className="font-semibold text-xs pt-1">
                          {pl.name}
                        </h2>

                        <div className="flex items-center text-xs">
                          {/* <TbCurrencyPeso size={19} /> */}
                          <span className="font-bold pr-1">&#8369;</span>
                          <h2 className="text-primaryDark pr-1">
                            {formatNumber(
                              pl.discount > 0
                                ? pl.totalPrice -
                                    Math.floor(
                                      (pl.totalPrice * pl.discount) / 100
                                    )
                                : pl.totalPrice
                            )}
                          </h2>
                          {pl.discount > 0 && (
                            <>
                              <p className="line-through text-slate-500">
                                {formatNumber(pl.totalPrice)}
                              </p>
                              <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1">
                                -{pl.discount}%
                                <IoTicketSharp className="ml-[1px]" />
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex gap-1 w-full text-xs">
                          <div className="">
                            <span className="font-bold pl-3">{pl.price}</span>
                            <span className="font-bold">/kg</span>
                          </div>

                          <div className="pl-1">
                            <span className="font-extrabold">&#64;</span>
                            <span className="font-bold">
                              {pl.expectedHarvestYield}
                            </span>
                            <span className="font-bold">/{pl.yieldUnit}</span>
                          </div>
                        </div>
                      </div>
                      {/* <div className="absolute bottom-1">
                        asd
                      </div> */}
                      <div className="flex flex-col justify-center items-center w-full absolute bottom-0 left-0 text-xs">
                        <div className="flex justify-center items-center gap-1 self-start pl-2">
                          <h2>Harvest Date: </h2>
                        </div>

                        <div className="flex gap- 1 pl-2 font-bold justify-between w-full pr-10">
                          <span>
                            {dateFormat(listings.harvestStartDate, "yy-mm-dd")}
                          </span>
                          -
                          <span>
                            {dateFormat(listings.harvestEndDate, "yy-mm-dd")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[160px] lg:w-[200px] h-[120px] ">
                      <img
                        className="w-full h-full rounded-md"
                        src={pl.images[0]}
                        alt="listing images"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex px-3 border-t pt-1 py-1">

                    {pl.sellerId.profileImage ? (
                      <Link
                        to={`/clusters/cluster-details/${pl.sellerId._id}`}
                        className="h-[35px] w-[57px]"
                      >
                        <img
                          className="h-full w-full border-2 border-primaryDark bg-primaryDark/50 rounded-full"
                          src={pl.sellerId.profileImage}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <img
                        className="h-[40px]  rounded-full"
                        src="/images/Assests/user_profile.png"
                        alt=""
                      />
                    )}
                    <div className="w-full flex justify-between items-center text-sm pl-2 font-bold">
                      <p>{pl.clusterName}</p>
                    </div>
                    <div className="w-fit flex justify-between items-center">
                      <Ratings ratings={pl.sellerId.rating} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ListingsSideBar;
