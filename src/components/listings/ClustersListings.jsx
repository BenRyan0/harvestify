import React from 'react'
import Ratings from '../Ratings';
import {Link} from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BiSolidMessageDots } from "react-icons/bi";
import { BiSolidCheckShield } from "react-icons/bi";
import { PiFarmFill } from "react-icons/pi";
import { GiMeat } from "react-icons/gi";
import { FaFishFins } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { GiFruitBowl } from "react-icons/gi";
import { RiLeafFill } from "react-icons/ri";

const Clusters = [
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '1', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '2', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '3', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '5', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '6', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},
  {id : 1, cluster_name: 'Mati Unified Farmers Association', location: 'Mati,Davao Oriental', Image: '7', listingsNum: 10, cluster_image: 'MatiUnifiedFarmersAssociation.jpg', cluster_phon: '09758975701'},

]

const ClustersListings = ({styles}) => {
  return (
    <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-1'} gap-3`}>
      {
       Clusters.map((c,i)=>
        <div className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-center':'justify-start items-center  md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
            <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden':'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full bg-red-400 object-cover' src={`/images/Cluster/${c.cluster_image}`} alt="listing images" />
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                      <FaHeart size='13px'/>
                    </li>
                    <Link className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                        <FaEye />
                    </Link>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                      <BiSolidMessageDots />
                    </li>
                    <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                      <FaHandshake />
                    </li>
                  </ul>
            </div>
            <div className="py-3 text-slate-600 px-2 ">
                    <div className="flex justify-between border-b-2 my-1 py-1">
                      <div className="flex gap-1 text-lg ">
                       <PiFarmFill />
                       <GiMeat />
                       <FaFishFins />
                       <BiSolidPackage />
                       <GiFruitBowl />
                       <RiLeafFill />
                      </div>
                        <div className="flex gap-3 text-xl border-l-2 px-2">
                            <span><FaTruckLoading /></span>
                            <span><FaTruck /></span>
                        </div>
                    </div>
                  
                  <div className="flex gap-2">
                    <div className="h-[70px] w-[100px] ">
                      <div className="relative">
                           <span className='absolute top-[7px] -right-[6px] bg-white rounded-full p-[1px] border-2 border-accent'><BiSolidCheckShield size='25px'/></span>
                      </div>
                 
                    <img className='h-[70px] w-[70px] rounded-full border-2 border-accent' src={`/images/Cluster/${c.cluster_image}`} alt="" />
                    
                    </div>
                    <div className="w-full text-start justify-center items-center">
                        <h1 className='text-sm font-semibold'>{c.cluster_name}</h1>
                        <div className="flex">
                          <Ratings ratings={4.5}/>
                        </div>
                    </div>
                  </div>
                 
                  <div className="flex flex-col my-1 justify-center gap-1 py-1 items-end text-start">
                    <div className="flex gap-2 items-center w-full">
                      <span><MdPhone size='20px'/></span>
                      <span className='text-xs'>{c.cluster_phon}</span>
                    </div>
                    <div className="flex gap-2 items-center w-full">
                      <span className=''><IoLocationSharp size='20px' /></span>
                      <span className='text-xs'>{c.location}</span>
                    </div>
                  </div>

                  <div className="bg-red-600">
                    <button className='bg-accent w-full rounded-sm font-semibold text-sm p-2 text-white'>
                      <Link to='cluster'>View Cluster Profile</Link>
                    </button>
                  </div>
                </div>
        </div>
       )}
    </div>
  )
}

export default ClustersListings