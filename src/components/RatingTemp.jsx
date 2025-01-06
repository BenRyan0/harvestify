import React from 'react'
import { BiSolidCheckShield } from "react-icons/bi";
import { BiCheckShield } from "react-icons/bi";
import { BiShield } from "react-icons/bi";

const RatingTemp = ({rating}) => {
 if(rating === 5){
    return(
       <div className="flex flex-row">
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
       </div>
    )
 }else if(rating === 4){
    return (
       <div className="flex flex-row">
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-slate-500'><BiShield/></span>
       </div>
    )
 }else if(rating === 3){
    return (
       <div className="flex flex-row">
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>      
       </div>
    )
 }else if(rating === 2){
    return (
       <div className="flex flex-row">
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>
       </div>
    )
 }else if(rating === 1){
    return (
       <div className="flex flex-row">
            <span className='text-primary'><BiSolidCheckShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>
            <span className='text-slate-500'><BiShield/></span>
       </div>
    )
 }else{
    return (
        <div className="flex flex-row">
             <span className='text-slate-500'><BiShield/></span>
             <span className='text-slate-500'><BiShield/></span>
             <span className='text-slate-500'><BiShield/></span>
             <span className='text-slate-500'><BiShield/></span>
             <span className='text-slate-500'><BiShield/></span>
        </div>
     )

 }
}

export default RatingTemp;
