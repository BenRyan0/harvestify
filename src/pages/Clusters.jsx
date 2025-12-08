import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { Range } from "react-range";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { PiShieldCheckFill } from "react-icons/pi";
import { BiSolidCheckShield } from "react-icons/bi";
import { BiCheckShield } from "react-icons/bi";
import Listings from "../components/listings/Listings";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import ShopListings from "../components/listings/ShopListings";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  price_range_listing,
  yield_range_listing,
  query_listings,
  get_listings,
  expected_yields_units,
} from "../store/reducers/homeReducer";

import { useTranslation } from "react-i18next";

const Clusters = () => {
  const dispatch = useDispatch();
  const {
    categories,
    allListings,
    listings,
    totalListing,
    latestListings,
    priceRange,
    allYieldUnits,
    yieldRange,
    parPage,
  } = useSelector((state) => state.home);
  console.log(allListings);
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = useState(1);
  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
  const [category, setCategory] = useState("");
  // const [state, setState] = useState({values : [50,100]})
  const [rating, setRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortYield, setSortYield] = useState("");
  const [sortYieldUnit, setSortYieldUnit] = useState("");

  const [priceValues, setPriceValues] = useState([
    priceRange.low,
    priceRange.high,
  ]);
  const [yieldValues, setYieldValues] = useState([
    yieldRange.low,
    yieldRange.high,
  ]);

  useEffect(() => {
    dispatch(price_range_listing());
    dispatch(expected_yields_units());
    dispatch(yield_range_listing());
  }, []);


  useEffect(() => {
    setPriceValues([priceRange.low, priceRange.high]);
  }, [priceRange]);

  useEffect(() => {
    setYieldValues([yieldRange.low, yieldRange.high]);
  }, [yieldRange]);

  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };
  console.log(category);

  useEffect(() => {
    dispatch(
      query_listings({
        lowPrice: priceValues[0],
        highPrice: priceValues[1],
        lowYield: yieldValues[0],
        highYield: yieldValues[1],
        category,
        rating,
        sortPrice,
        pageNumber,
        sortYield,
        sortYieldUnit,
      })
    );
  }, [
    priceValues,
    yieldValues,
    category,
    rating,
    pageNumber,
    sortPrice,
    sortYield,
    dispatch,
    sortYieldUnit,
  ]);

  const rstRating = () => {
    setRating("");
    dispatch(
      query_listings({
        lowPrice: priceValues[0],
        highPrice: priceValues[1],
        lowYield: yieldValues[0],
        highYield: yieldValues[1],
        category,
        rating: "",
        sortPrice,
        pageNumber,
        sortYield,
        sortYieldUnit,
      })
    );
  };

  return (
    <div className="px-16 sm:px-0">
      <Headers />
      {/* <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' > */}
      <section
        className=" w-[85%] mx-auto h-[150px] mt-6 bg-cover bg-no-repeat relative bg-left md-lg:hidden"
        style={{ backgroundImage: "url('/images/banner/1.jpg')" }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
              <h2 className="text-4xl font-bold font-roboto italic">
                Harvestify.com{" "}
              </h2>
              <div className="flex justify-center items-center gap-1 text-xs w-full">
                <Link to="/">Home</Link>
                <span>
                  <FaAngleRight size="10px" />
                </span>
                <span>Listings</span>
                {/* <span><FaAngleRight size='10px'/></span> */}
                {/* <span>Mati Rice Farmers Association</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-accent text-white font-semibold"
            >
              Filter Listings
            </button>
          </div>
          <div className="w-full flex flex-wrap">
            <div
              className={`w-[20%] md-lg:w-3/12 md:w-full  ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <h2 className="text-sm font-bold mb-3 text-slate-600">
                {t("categories")}
              </h2>
              <div className="py-2">
                {categories.map((c, i) => (
                  <div
                    className="flex justify-start items-center gap-2 py-1 text-xs"
                    key={i}
                  >
                    <input
                      checked={category === c.name ? true : false}
                      onChange={(e) => queryCategory(e, c.name)}
                      className=""
                      type="checkbox"
                      id={c.name}
                    />
                    <label
                      className="text-slate-600 block cursor-pointer"
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
              {/* Price Range Filter */}
              <div className="flex flex-col">
                <h2 className="text-sm font-bold mb-3 text-slate-600">
                  {t("price")}
                </h2>
                <div className="flex justify-center items-start">
                  <Range
                    step={1}
                    min={priceRange.low}
                    max={priceRange.high}
                    values={priceValues}
                    onChange={(values) => setPriceValues(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-11/12 h-[4px] bg-slate-200 rounded-full cursor-default"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        className="w-[10px] h-[10px] bg-blue-500 rounded-full"
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="flex mt-1">
                  <span className="text-accent text-xs font-semibold flex justify-start gap-1 items-center">
                    <span>{Math.floor(priceValues[0])}</span>
                    <span className="font-bold text-xs">&#8369;</span>
                    <span> - </span>
                    <span>{Math.floor(priceValues[1])}</span>
                    <span className="font-bold text-xs">&#8369;</span>
                  </span>
                </div>
              </div>

              {/* Yield Range Filter */}
              <div className="flex flex-col justify-center mt-2">
                <h2 className="text-sm font-bold mb-3 text-slate-600">
                  {t("expectedYield")} - {sortYieldUnit}
                </h2>
                <div className="flex justify-center">
                  <Range
                    step={1}
                    min={yieldRange.low}
                    max={yieldRange.high}
                    values={yieldValues}
                    onChange={(values) => setYieldValues(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-11/12 h-[4px] bg-slate-200 rounded-full cursor-default"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        className="w-[10px] h-[10px] bg-blue-500 rounded-full"
                        {...props}
                      />
                    )}
                  />
                </div>

                <div className="flex text-xs text-end">
                  <span className="text-accent text-xs font-semibold text-start pt-1.5">
                    {Math.floor(yieldValues[0])} {sortYieldUnit} -{" "}
                    {Math.floor(yieldValues[1])}
                  </span>
                  <select
                    onChange={(e) => setSortYieldUnit(e.target.value)}
                    className="outline-none p-1 border-none text-slate-600 font-semibold rounded-sm bg-transparent"
                    disabled={allYieldUnits.length === 1}
                  >
                    <option value="">Unit</option>
                    {allYieldUnits.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="py-2 flex flex-col">
                <h2 className="text-sm font-bold mb-3 text-slate-600">
                  {t("sellerRating")}
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(2)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(1)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiSolidCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                  </div>
                  <div
                    onClick={rstRating}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                    <span>
                      <BiCheckShield />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[80%] sm:w-full md-lg:w-9/12 md:w-[80%]">
              <div className="pl-8 md:pl-0">
                <div className="py-1 mb-10 px-3 rounded-md flex justify-between items-center text-center border ">
                  <h2 className="visible md:invisible text-sm font-semibold text-slate-600 text-center ">
                    {totalListing} listings
                  </h2>
                  <div className="flex justify-center items-center gap-3 text-sm">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="outline-none p-1 border-0 outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm text-xs"
                      name=""
                      id=""
                    >
                      <option value="">Price</option>
                      <option value="low-to-high">Low to High</option>
                      <option value="high-to-Low">High to Low</option>
                    </select>
                    <select
                      onChange={(e) => setSortYield(e.target.value)}
                      className="outline-none p-1 border-0 outline-0 text-slate-600 font-semibold md-lg:w-[100px] w-[200px] rounded-sm text-xs  "
                      name=""
                      id=""
                    >
                      <option value="">Quantity</option>
                      <option value="low-to-high">Low to High</option>
                      <option value="high-to-Low">High to Low</option>
                    </select>
                    <div className="flex justify-center items-start gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-1 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <IoGrid size="15px" />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-1 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList size="15px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-8">
                  <ShopListings listings={listings} styles={styles} />
                </div>
                <div className="">
                  {totalListing > parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalListing}
                      parPage={parPage}
                      showItem={Math.floor(totalListing / parPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Clusters;
