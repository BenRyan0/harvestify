import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdd ,messageClear,cancel_transaction_due_to_dispute_by_trader,resend_deposit_proof,resendReset} from '../../../store/reducers/transactionReducer';
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
import { MdOutlinePendingActions } from "react-icons/md"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdHand } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import { GiCycle } from "react-icons/gi";
import { FaFistRaised } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";

const FirstConfirmation = () => {
  const dispatch = useDispatch()
   const { resendSuccess,errorMessage,successMessage } = useSelector(
          (state) => state.transaction
        );
   const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
     console.log(currentTransaction)
     console.log(resendSuccess)
     console.log("currentTransaction YAWA")

  useEffect(()=>{
        if(resendSuccess){
          window.location.reload();
            // toast.error(resendSuccess)
            dispatch(resendReset())
            
        }
        },[resendSuccess])

     
const [openModal, setOpenModal] = useState("")
const [openResendModal, setOpenResendModal] = useState("")

 const [imageShow, setImageShow] = useState([])
    const [images, setImages] = useState([])

    const submitCancellation = () => {
      dispatch(cancel_transaction_due_to_dispute_by_trader({
        transactionId: currentTransaction[0]?._id,
        traderId: currentTransaction[0]?.trader
      }));
    };
    const submitResendProof = () => {
  if (!images || !traderReason || !currentTransaction[0]?._id) {
    toast.error("All fields are required before submitting.");
    return;
  }

  const imageFile = Array.isArray(images) ? images[0] : images;

  console.log(imageFile)
  console.log(traderReason)
  console.log(currentTransaction[0]._id)

  dispatch(resend_deposit_proof({
    imageFile,
    proofMessage: traderReason,
    transactionId: currentTransaction[0]._id,
  }));
};


 




       const changeImage = (img, index)=>{
            if(img){
                let tempUrl = imageShow
                let tempImages = images

                tempImages[index] = img
                tempUrl[index] = {url: URL.createObjectURL(img)}
                setImageShow([...tempUrl])
                setImages([...tempImages])
            }
        }

          const removeImage = (i)=>{
            const filterImage = images.filter((img, index)=>index !== i)
            const filterImageUrl = imageShow.filter((img, index)=>index !== i)

            setImages(filterImage)
            setImageShow(filterImageUrl)
            
        }


        const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = images.length + files.length;

    if (totalImages > 1) {
        const allowedFiles = files.slice(0, 3 - images.length);
        alert("You can only upload up to 3 images.");
        
        let imageUrl = allowedFiles.map(file => ({ url: URL.createObjectURL(file) }));

        setImages(prev => [...prev, ...allowedFiles]);
        setImageShow(prev => [...prev, ...imageUrl]);
    } else {
        let imageUrl = files.map(file => ({ url: URL.createObjectURL(file) }));

        setImages(prev => [...prev, ...files]);
        setImageShow(prev => [...prev, ...imageUrl]);
    }
};
const [traderReason, setTraderReason] = useState("");
 const handTraderInput = (e) => setTraderReason(e.target.value);
  return (
    <div className='w-full text-center text-primaryDark py-10 flex justify-center items-center gap-2 '>

     {currentTransaction[0]?.dispute[0]?.status === "In-Dispute" ? (
      <div className="">
          {currentTransaction[0]?.deposit?.resubmittedProofs?.length ? (
          <div className="">
             <h2 className='font-bold text-xl uppercase'>Seller Has Not Confirmed Your Payment Yet</h2>
          </div>
        ) : (
          <div className="">
              <div className="w-full">
          <div className="">
            <div className="w-full">
              <h2 className='font-bold text-lg flex justify-center items-center gap-1 text-center px-10 mb-5 rounded bg-primaryDark text-slate-100 py-2 w-fit '>SELLER HAS RAISED A DISPUTE <MdReportProblem size={28} className='mb-1 ml-1'/></h2>
            </div>
            <div className="flex flex-row md:flex-col h-fit gap-3 bg-slate-400 rounded-md p-3">
                {currentTransaction[0]?.dispute?.[0]?.proofUrl?.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[280px] w-full group cursor-pointer"
                    onClick={(e) => {
                      const imgEl = e.currentTarget.querySelector('img');
                      if (imgEl?.requestFullscreen) {
                        imgEl.requestFullscreen();
                      } else if (imgEl?.webkitRequestFullscreen) {
                        imgEl.webkitRequestFullscreen();
                      } else if (imgEl?.msRequestFullscreen) {
                        imgEl.msRequestFullscreen();
                      }
                    }}
                  >
                    <img
                      src={img}
                      alt="Dispute proof"
                      className="w-full h-full object-cover rounded-md pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold">Click to view</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-9 px-3 w-full 2xl:w-6/12 3xl:w-10/12 2xl:bg-red-700 3xl:bg-green-900 xs:bg-blue-800">
                <div className="relative ">
                    <div className="font-bold text-white absolute py-1 px-3 -top-4 -left-3 bg-primaryDark flex gap-2 justify-center items-center">
                      <MdReportProblem size={24}/>
                      {currentTransaction[0]?.dispute[0]?.issue}</div>
                    <div className="text-slate-500 bg-[#F1F5F9] shadow-xl px-7 py-5  rounded text-wrap ">
                      {currentTransaction[0]?.dispute[0]?.reason}
                    </div>
                    <div className="">
                      <button onClick={() => setOpenModal(!openModal)} className='bg-primaryDark text-white px-4 py-1 font-bold flex justify-center items-center absolute -top-4 right-2'>RESPOND <FaChevronRight /></button>
                    </div>
                </div>
              </div>

          </div>
        </div>
          </div>
        )}
      </div>

        

      
      
      ) :currentTransaction[0]?.dispute[0]?.status === "Resolved" ? (
          <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <h2 className='font-bold text-lg flex justify-center items-center gap-1 text-center px-10 mb-5 rounded bg-green-600 text-white py-2 w-fit'>
                DISPUTE HAS BEEN RESOLVED
              </h2>
              <p>{currentTransaction[0]?.status}</p>
            </div>
            {/* Optionally include resolved content here, e.g., reason or summary */}
          </div>
        ) :currentTransaction[0]?.dispute[0]?.status === "Escalated-to-Admin" ? (
          <div className="w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <h2 className='font-bold text-lg flex justify-center items-center gap-2 text-center px-10 mb-5 rounded bg-green-600 text-slate-100 py-2 w-fit'>
                DISPUTE HAS ESCALATED TO ADMIN 
                <GiInjustice size={25} className='mb-1' />
              </h2>
              <p className='text-sm'>please wait for the admin's decision...</p>
            </div>
            {/* Optionally include resolved content here, e.g., reason or summary */}
          </div>
        ):
         (
        <div>
          <h2 className='font-bold text-xl uppercase'>Seller Has Not Confirmed Your Payment Yet</h2>
        </div>
      )
      
      }

  {openModal ? (
          <div
            className="absolute inset-0  flex justify-center items-center bg-slate-800 pb-[100px] bg-opacity-30 transition-opacity duration-900 ease-in-out z-[9999999]"
            onClick={() => setOpenModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-md bg-[#F1F5F9] h-[160px] md-lg:h-[210px] ml-[280px] md-lg:ml-0 w-8/12 md-lg:w-11/12 relative transform transition-all duration-900 ease-in-out scale-100 opacity-100 shadow-lg"
            >
              <div className="p-4 text-white pt-7">
                <div className="font-extrabold text-primaryDark text-xl">PLEASE SELECT A CHOICE OF ACTION</div>
                <div className="w-full flex justify-center items-center">
                  <div className=" grid grid-cols-3 gap-8 w-9/12 font-bold mt-6 sm:flex sm:flex-col sm:gap-2">
                    <button
                    onClick={submitCancellation}
                    className="flex justify-center items-center gap-1 bg-primary py-2 px-4 rounded uppercase text-white font-semibold transition duration-200 ease-in-out hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primaryDark"
                  >
                    Cancel
                    <TiCancel className='mb-[2px]' size={27}/>
                  </button>

                    <button onClick={() => setOpenResendModal(true)} 
                    className="flex justify-center items-center gap-1 bg-primary py-2 px-4 rounded uppercase text-white font-semibold transition duration-200 ease-in-out hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primaryDark">
                      Resend
                      <GiCycle className='mb-[2px]' size={20} />
                    </button>

                    <button className="flex justify-center items-center gap-1 bg-primary py-2 px-4 rounded uppercase text-white font-semibold transition duration-200 ease-in-out hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primaryDark">
                      Insist
                      <FaFistRaised className='mb-[2px]' size={20}  />
                    </button>

                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-primaryDark text-white gap-1 px-4 py-1 font-bold flex justify-center items-center absolute -top-4 right-2"
              >
                Close <IoIosCloseCircle size={22} />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute"></div>
        )}
  {openResendModal ? (
          <div
            className="absolute inset-0   flex justify-center items-center bg-blue-800 pb-[150px] bg-opacity-30 transition-opacity duration-900 ease-in-out z-[99999999999]"

            onClick={() => setOpenResendModal(!openResendModal)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="shadow-lg bg-[#F1F5F9] h-[500px] ml-[300px] md-lg:ml-0 w-8/12 md-lg:w-11/12 relative transform transition-all duration-900 ease-in-out scale-100 opacity-100 border-2 border-slate-500 rounded-md"

            >
              <div className="p-4 text-white w-full flex flex-col">
                <div className="font-bold text-primaryDark">RESEND A NEW PROOF</div>
                 <div className="flex flex-row justify-center pt-5 gap-3 mb-3 px-4">
                                    {
                                        imageShow.map((img,i)=>
                                        <div className="h-[280px] w-4/12 md-lg:w-10/12  relative">
                                            <label  htmlFor={i}>
                                                <img className='w-full h-full rounded-md object-cover' src={img.url} alt="selected images"  />
                                            </label>
                                            <input onChange={(e)=>changeImage(e.target.files[0], i)} type="file" name='' id={i} className='hidden' />
                                            <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-md'><CgClose /></span>
                                        </div>
                                        ) 
                                    }
                                    {imageShow.length < 1 && (
                                            <label htmlFor="image" className='w-4/12 md-lg:w-10/12 flex justify-center items-center flex-col h-[280px] cursor-pointer border-2 border-dashed border-gray-700 hover:border-accent text-gray-700'>
                                        <span><IoMdImages size='40px'/></span>
                                        <span>Select An Image</span>
                                    </label>
                                    )}
                                
                                    <input multiple onChange={imageHandler} className='hidden' type="file" name='image' id='image' />
                  </div>
                  <div className="">
                      <div className="w-full">
                                    <textarea
                                        onChange={handTraderInput}
                                        value={traderReason}
                                        className="w-full h-[70px] bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-500"
                                        placeholder="Trader Message"
                                        name="traderReason"
                                    />
                      </div>
                      <div className="flex justify-end">
                       <button onClick={submitResendProof} class="w-4/12 sm:w-full  bg-primaryDark text-white px-7 font-bold py-2 rounded-lg hover:bg-primary/90 transition duration-300 shadow ">
                        Submit
                      </button>

                      </div>
                  </div>
                  
              </div>
              <button
                onClick={() => setOpenResendModal(!openResendModal)}
                className="bg-primaryDark text-white gap-1 px-4 py-1 font-bold flex justify-center items-center absolute -top-4 right-2"
              >
                Close <IoIosCloseCircle size={22} />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute"></div>
        )}





     
    </div>
  )
}

export default FirstConfirmation