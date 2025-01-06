import React from 'react'
import { BiSolidCheckShield } from "react-icons/bi";
import { BiCheckShield } from "react-icons/bi";
import { BiShield } from "react-icons/bi";

const Ratings = ({ratings}) => {
  return (
    <>
    {
        ratings >= 1 ? <span className='text-[#EDBB0E]'><BiSolidCheckShield /></span> : ratings >= .5 ? <span className='text-[#EDBB0E]'><BiCheckShield /></span> : <span className='text-slate-600'><BiShield /></span>
    }
    {
        ratings >= 2 ? <span className='text-[#EDBB0E]'><BiSolidCheckShield /></span> : ratings >= 1.5 ? <span className='text-[#EDBB0E]'><BiCheckShield /></span> : <span className='text-slate-600'><BiShield /></span>
    }
    {
        ratings >= 3 ? <span className='text-[#EDBB0E]'><BiSolidCheckShield /></span> : ratings >= 2.5 ? <span className='text-[#EDBB0E]'><BiCheckShield /></span> : <span className='text-slate-600'><BiShield /></span>
    }
    {
        ratings >= 4 ? <span className='text-[#EDBB0E]'><BiSolidCheckShield /></span> : ratings >= 3.5 ? <span className='text-[#EDBB0E]'><BiCheckShield /></span> : <span className='text-slate-600'><BiShield /></span>
    }
    {
        ratings >= 5 ? <span className='text-[#EDBB0E]'><BiSolidCheckShield /></span> : ratings >= 4.5 ? <span className='text-[#EDBB0E]'><BiCheckShield /></span> : <span className='text-slate-600'><BiShield /></span>
    }
</>
  )
}

export default Ratings