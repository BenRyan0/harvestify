import { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineMail } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MdInstallMobile } from "react-icons/md";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageModule/LanguageDropdown";
import InstallPWAButton from "./PWA/InstallPWAButton ";

const Headers = ({ hideSBar, hideCBar }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.home);
  const { card_listings_count } = useSelector((state) => state.card);
  // for the translation module function
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/listings/search?category=${category}&&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate(`/card/`);
    } else {
      navigate(`/login`);
    }
  };

  const logo = "/images/Harvestify_logo_full.png";

  return (
    <div className="w-full">
      <div className="header-top  md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto bg-[#eeeeee]/50 px-3">
          <div className="flex w-ful justify-between items-center h-[30px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-[10px] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <HiOutlineMail />
                </span>
                <span>harvestifyph@gmail.com</span>
              </li>
              <span className="text-[10px] italic capitalize">{t("slogan")}</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="border-l border-slate-600 h-[18px] text-center flex justify-center items-center pl-5">
                  <Link
                    to={"https://harvestify-dashboard.vercel.app/register"}
                    className="text-[10px]"
                  >
                    {t("startSelling")}
                  </Link>
                </div>

                <div className="relative group flex items-center justify-center gap-1 text-sm text-slate-800 cursor-pointer before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[16px] after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                  <LanguageDropdown />
                </div>
                {userInfo ? (
                  <Link
                    className="flex items-center justify-center gap-3"
                    to="/dashboard"
                  >
                    <span>
                      <FaUserCircle />
                    </span>
                    <span className="text-[10px]">{userInfo.name}</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-4 relative text-[10px]">
                    <Link to="https://harvestify-dashboard.vercel.app/register">
                      Sign up
                    </Link>
                    <span className="relative flex items-center before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[10px] before:content-['']">
                      <Link to="/login">Log in</Link>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[90px] md-lg:h-[120px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex md-lg:justify-between justify-center items-center">
                <Link to="/">
                  {" "}
                  <img
                    className="w-[160px] md-lg:w-[120px]"
                    src={logo}
                    alt="logo"
                  />
                </Link>
                <div
                  className="flex justify-center items-center text-center w-[30px] h-[30px] bg-white text-slate-600 border-0 border-slate-600 rounded-sm
                            cursor-pointer lg:hidden md-lg:flex xl:hidden hidden transition-all duration-300 "
                  onClick={() => setShowSidebar(false)}
                >
                  <span className={`${showSidebar ? "block" : "hidden"}`}>
                    <FaList size="25px" color="#03872D" />
                  </span>
                </div>
              </div>
            </div>

            <div className="md-lg:w-full w-9/12 ">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8 ">
                <ul className="w-8/12 flex justify-center items-center gap-8 text-xs font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-primary" : "text-slate-600 "
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/listings"
                      className={`p-2 block ${
                        pathname === "/listings"
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      {t("products")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/clusters"
                      className={`p-2 block ${
                        pathname === "/clusters"
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      {t("sellers")}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/about-us"
                      className={`p-2 block ${
                        pathname === "/aboutUs"
                          ? "text-primary"
                          : "text-slate-600"
                      }`}
                    >
                      About us{" "}
                    </Link>
                  </li>
                </ul>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5 ">
                    <div
                      onClick={redirect_card_page}
                      className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-[#e2e2e2]/50"
                    >
                      <span className="text-bold text-primary">
                        <AiFillShopping size="14px" />
                      </span>
                      {card_listings_count !== 0 && (
                        <div className="w-[27px] h-[27px] absolute border-2 border-[#e2e2e2] bg-primary rounded-full text-white flex justify-center items-center -top-[5px] -right-[8px] text-[10px]">
                          {card_listings_count !== 0 && card_listings_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>

        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSidebar ? "-left-[300px] top-0" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <span
            onClick={() => setShowSidebar(true)}
            className={`absolute right-3 top-3 ${
              showSidebar ? "hidden" : "block"
            }`}
          >
            <IoClose size="28px" color="#03872D" />
          </span>
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img
                className="w-[300px] md-lg:w-[200px]"
                src="/images/Harvestify_logo_full.png"
                alt="logo"
              />
            </Link>
            <div className="flex justify-start items-center gap-10">
              <div className="relative group flex items-center justify-center gap-1 text-sm text-slate-800 cursor-pointer  after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <LanguageDropdown />
              </div>
              {userInfo ? (
                <Link
                  className="flex items-center justify-center gap-3"
                  to="/dashboard"
                >
                  <span>
                    <FaUserCircle />
                  </span>
                  <span className="text-[10px]">{userInfo.name}</span>
                </Link>
              ) : (
                <div className="flex items-center justify-center gap-4 relative text-[10px]">
                  <Link to="https://harvestify-dashboard.vercel.app/register">
                    Signup
                  </Link>
                  <span className="relative flex items-center before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[10px] before:content-['']">
                    <Link to="/login">Log in</Link>
                  </span>
                </div>
              )}
            </div>
            {/* MOBILE VIEW NAVS */}
            <ul className="flex flex-col justify-start items-start gap-3 text-md font-bold uppercase">
              <li>
                <Link
                  to="/"
                  className={`py-2 block ${
                    pathname === "/" ? "text-primary" : "text-slate-600 "
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/listings"
                  className={`py-2 block ${
                    pathname === "/listings" ? "text-primary" : "text-slate-600"
                  }`}
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/clusters"
                  className={`py-2 block ${
                    pathname === "/clusters" ? "text-primary" : "text-slate-600"
                  }`}
                >
                  {t("sellers")}
                </Link>
              </li>

              <li>
                <Link
                  to="/about-us"
                  className={`py-2 block ${
                    pathname === "/aboutUs" ? "text-primary" : "text-slate-600"
                  }`}
                >
                  About us
                </Link>
              </li>
            </ul>
            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[40px] h-[40px] rounded-md flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex justify-end flex-col ">
                <h2 className="text-sm font-medium text-slate-700">
                  +63 9758975701
                </h2>
                <span className="text-[10px]">support 33/45 time</span>
              </div>
            </div>
            <ul className="flex flex-col justify-start items-start gap-3">
              <li className="flex justify-start items-center gap-2 text-[#1c1c1c] text-sm">
                <span>
                  <IoMailOutline size="20px" />
                </span>
                <span>harvestifyph@gmail.com</span>
              </li>
              <span className="text-[10px]">{t("slogan")}</span>
            </ul>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full flex justify-center items-center">
              <div className=" px-2 py-1 rounded-sm text-slate-500 my-1 flex flex-row gap-1 items-center text-center font-bold text-sm">
                <InstallPWAButton /> <MdInstallMobile className="mb-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          {hideCBar ? (
            <div className=""></div>
          ) : (
            <div className="w-3/12 md-lg:w-full">
              <div className="bg-white relative">
                <div
                  onClick={() => setCategoryShow(!categoryShow)}
                  className="h-[40px] text-xs bg-primary rounded-md text-white justify-center md-lg:justify-between md-lg:px-6 flex items-center gap-3 font-bold text-md cursor-pointer"
                >
                  <div className="flex justify-center items-center gap-3">
                    <span>
                      {/* <FaList /> */}
                    </span>
                    <span>{t("categories")}</span>
                  </div>
                  <span>
                    <FaCaretDown />
                  </span>
                </div>
                <div
                  className={`${
                    categoryShow
                      ? "h-0 hidden"
                      : "h-[calc(100% + 10px)] mt-1 rounded-md"
                  } overflow-hidden transition-all md-lg:relative duration-700 absolute z-[9999] bg-white w-full border`}
                >
                  <ul className="p-y-2 text-slate-600 font-medium overflow-auto">
                    {categories.map((c, i) => {
                      return (
                        <li
                          key={i}
                          className="flex justify-start items-center gap-2 px-[24px] py-[6px] hover:text-primary hover:bg-slate-100"
                        >
                          <img
                            src={c.image}
                            className="w-[30px] h-[30px] rounded-full overflow-hidden"
                            alt=""
                          />
                          <Link
                            to={`/listings/search?category=${
                              c.name
                            }&&value=${""}`}
                            className="text-sm block font-semibold "
                          >
                            {c.name}
                          </Link>
                          {/* <Link to={`/listings?category=${c.name}`} className='text-sm block font-semibold '>{c.name}</Link> */}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {hideSBar ? (
            <div className=""></div>
          ) : (
            <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
              <div className="flex flex-wrap w-full justify-between items-start md-lg:gap-6">
                <div className="w-8/12 md-lg:w-full">
                  <div className="flex border h-[40px] items-center relative gap-5 rounded-md text-xs">
                    <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden ">
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        name=""
                        id=""
                        className="w-[200px] text-primaryDark font-semibold bg-transparent px-2  h-full outline-0 border-none"
                      >
                        <option className="" value="">
                          {t("selectCategory")}
                        </option>
                        {categories.map((c, i) => (
                          <option key={i} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      className="w-full relative bg-transparent text-primaryDark outline-0 pr-[150px] px-3 h-full"
                      onChange={(e) => setSearchValue(e.target.value)}
                      type="text"
                      name=""
                      id=""
                      placeholder="Search"
                    />
                    <button
                      onClick={search}
                      className="bg-primary right-0 absolute px-8 h-full font-semibold uppercase text-white"
                    >
                      {t("search")}
                    </button>
                  </div>
                </div>
                <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                  <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                    <div className="w-[40px] h-[40px] rounded-md flex bg-[#f5f5f5] justify-center items-center">
                      <span>
                        <FaPhoneAlt size="15px" />
                      </span>
                    </div>
                    <div className="flex justify-end flex-col text-xs items-start text-slate-700">
                      <h2 className="text-md font-medium ">
                        +63 9758975701
                      </h2>
                      <span className="">Available 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
                    <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
                        <div className="w-8/12 md-lg:w-full">
                            <div className="flex border h-[50px] items-center relative gap-5 rounded-md">
                                <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden ">
                                    <select onChange={(e)=>setCategory(e.target.value)} name="" id="" className='w-[180px] text-primaryDark font-semibold bg-transparent px-2  h-full outline-0 border-none'>
                                        <option className='' value="">Select Category</option>
                                        {
                                             categories.map((c,i)=>
                                                <option key={i} value={c.name}>{c.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <input className='w-full relative bg-transparent text-primaryDark outline-0 pr-[150px] px-3 h-full' onChange={(e)=>setSearchValue(e.target.value)}  type="text" name='' id='' placeholder='Search'/>
                                <button onClick={search} className='bg-primary right-0 absolute px-8 h-full font-semibold uppercase text-white'>Search</button>
                            </div>
                        </div>
                        <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                                <div className="w-[50px] h-[50px] rounded-md flex bg-[#f5f5f5] justify-center items-center">
                                    <span><FaPhoneAlt size='20px'/></span>
                                </div>
                                <div className="flex justify-end flex-col ">
                                    <h2 className='text-md font-medium text-slate-700'>+63 9758975701</h2>
                                    <span className='text-sm'>support 33/45 time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default Headers;
