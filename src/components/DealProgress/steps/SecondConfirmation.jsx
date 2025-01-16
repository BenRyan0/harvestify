import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { Link, useLocation } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdd ,messageClear} from '../../../store/reducers/transactionReducer';
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";
import toast from 'react-hot-toast';

const SecondConfirmation = () => {
  return (
    <div>SecondConfirmation</div>
  )
}

export default SecondConfirmation