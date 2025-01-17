import React from 'react'
import { MdOutlinePendingActions } from "react-icons/md"

const FirstConfirmation = () => {
  return (
    <div className='w-full text-center text-primaryDark py-10 flex justify-center items-center gap-2'>
        <h2 className='font-bold text-xl uppercase'>Seller Has Not Confirmed Your Payment Yet</h2>
        <MdOutlinePendingActions size={20}/>
    </div>
  )
}

export default FirstConfirmation