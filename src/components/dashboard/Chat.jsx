import React, { useEffect, useRef, useState } from 'react'
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FaThList } from "react-icons/fa";

import { RiMessage3Fill } from "react-icons/ri";
import {add_friend, send_message, messageClear, updateMessage} from '../../store/reducers/ChatReducer'
import {socket} from '../../utils/utils'
import toast, { Toaster } from 'react-hot-toast';




const Chat = () => {

  const {sellerId} = useParams()
  const dispatch =  useDispatch()
  const scrollRef = useRef()
  const [recieverMessage,setRecieverMessage ] = useState('')
  const [activeSeller, setActiveSeller] = useState([])
  
  const [receiverMessage, setReceiverMessage] = useState('');
  
  const {userInfo} = useSelector(state=>state.auth)
  const {my_connections, currentConnection,my_messages,successMessage } = useSelector(state=>state.chat);

  const [text, setText] = useState('')


  useEffect(()=>{
    socket.emit('add_user', userInfo.id, userInfo)
  },[])

  // console.log("_________________ >")
  console.log(sellerId)
  console.log(userInfo.id)
  const userID = userInfo.id

  useEffect(()=>{
    if(sellerId){
      dispatch(add_friend({
        sellerId : sellerId || "",
        userId : userInfo.id,
      }))
    }else{
      dispatch(add_friend({
        sellerId : sellerId || "",
        userId : userInfo.id,
      }))
    }
  },[sellerId,userID])
 
  const sendMessage =()=>{
    if(text){
      dispatch(send_message({
        userId : userInfo.id,
        text,
        sellerId,
        name : userInfo.name
      }))
      setText('')
    }

  }

  console.log(userInfo.name)

  // useEffect(()=>{ 
  //     dispatch(add_friend({
  //       sellerId : sellerId || "",
  //       userId : userInfo.id
  //     }))
  // },[sellerId])

  useEffect(() => {
    socket.on('seller_message_', msg => {
      setReceiverMessage(msg)
    })
    socket.on('activeSeller', (sellers) => {
      setActiveSeller(sellers)
     
    })
}, [])
console.log(activeSeller)

  useEffect(() => {
    if (successMessage) {
        socket.emit('send_customer_message', my_messages[my_messages.length - 1])
        dispatch(messageClear())
    }
}, [successMessage])



useEffect(() => {
  console.log(receiverMessage)
  if (receiverMessage) {
      if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
          dispatch(updateMessage(receiverMessage))
      } else {
          toast.success(receiverMessage.senderName + " " + "sent a message")
          dispatch(messageClear())
      }
  }
}, [receiverMessage])

useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Scroll only within the container
  }
}, [my_messages]);

const [show, setShow] = useState(false)

  return (
    <div className='bg-white p-3 rounded-md'>
      <div className="w-full flex relative">
        <div className={`w-[230px] md-lg:absolute bg-white md-lg:h-full z-50 transition-all duration-200 ${show ? 'left-0' : '-left-[350px]'} `}>
          <div className="flex justify-center gap-3 items-center text-slate-500 text-base h-[50px]">
            <span><BiSolidMessageSquareDetail /></span>
            <span className='font-semibold text-sm'>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
              {my_connections.length > 0 ? (
        my_connections.map((f, i) => (
                  <Link onClick={()=>setShow(!show)} to={`/dashboard/chat/${f.fdId}`}
                    key={i}
                    className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
                  >
                    <div className="w-[35px] h-[35px] rounded-full relative">
                      {
                         activeSeller.some(c=>c.sellerId === f.fdId) && 
                         <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-white"></div>
                       }
                    
                      <img
                        className="h-full w-full rounded-full"
                        src={f.image}
                        alt={f.name || "Profile"}
                      />
                    </div>
                    <span className="font-semibold text-sm">{f.name}</span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No connections available</p>
              )}
          </div>
        </div>
        <div className='w-[calc(100%-230px)] md-lg:w-full md-lg:h-full md-lg:-ml-35'>
              {
                currentConnection ? 
                <div className="w-full h-full">
                  <h2>{currentConnection.id}</h2>
                <div className="flex justify-between items-center text-slate-600 text-xl h-[50px]">
                       <div className="flex ">
                          <div className="w-[35px] h-[35px] rounded-full relative">
                              {
                                activeSeller.some(c=>c.sellerId === currentConnection.fdId) && 
                                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-white"></div>
                              }
                              
                              <img className='h-full w-full rounded-full' src={currentConnection.image} alt="" />
                          </div>
                          <span className='font-semibold text-sm'>{currentConnection.name}</span>
                       </div>
                       <div onClick={()=>setShow(!show)} className="hidden md-lg:flex w-[30px] h-[30px] bg-[#338B6D] justify-center items-center text-slate-100 rounded-sm cursor-pointer">
                         <span className=''><FaThList /></span>
                       </div>
                </div>
                <div className="h-[400px] w-full bg-slate-100 px-1 py-2 rounded-md">
                    <div className="w-full h-full overflow-y-auto flex flex-col gap-1 " ref={scrollRef}>
                      {
                         my_messages.map((m,i) =>{
                          if(currentConnection?.fdId !== m.receiverId){
                            return(
                              <div   className="w-full flex gap-2 justify-start items-center text-[14px] px-2 py-1">
                                <img className='rounded-full h-[40px] w-[40px] border border-slate-500' src={currentConnection.image} alt="" />
                                <div className="px-2 py-1 bg-slate-500 text-white rounded-sm">
                                <span>{m.message}</span>
                                </div>
                              </div>

                            )

                          }else{
                            return(
                              <div    className="w-full flex gap-2 justify-end items-center text-[14px] px-2 py-1">
                                {/* <img className='rounded-full h-[40px] w-[40px]' src="http://localhost:3001/images/farmers/Farmer.jpg" alt="" /> */}
                                <div className="px-2 py-1 bg-primaryDark/80 text-white rounded-sm">
                                  <span>{m.message}</span>
          
                                </div>
                              </div>

                            )  
                          }
                         })
                      }
                       
                     
                    </div>
                </div>
    
  
                <div className="flex px-2 py-3 justify-between items-center w-full ">
                  <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                    <label className='cursor-pointer' htmlFor=""><AiOutlinePlusSquare /></label>
                    <input className='hidden' type="file" />
                  </div>
    
                  <div className="border h-[40px] p-0 ml-2 w-[calc(100%-60px)] rounded-full relative text-center flex justify-center items-center">
                      <input value={text} onChange={(e)=> setText(e.target.value)} type="text" className='w-full bg-transparent h-fill outline-none p-3 text-sm text-slate-600'  placeholder='Input Message'/>
                      <div className="text-slate-600 right-2 top-2 absolute cursor-pointer">
                        <MdEmojiEmotions size={20} />
                      </div>
                  </div>
                  <div className="w-[40px] p-2 justify-center items-center rounded-full">
                        <div onClick={sendMessage} className="text-2xl cursor-pointer text-slate-600">
                           <IoIosSend />
                        </div>
                      </div>
                </div>
    
              </div> 
              : 
              <div onClick={()=>setShow(!show)} className="w-full gap-1 flex justify-center items-center text-xl font-bold text-slate-500 h-[400px]">
                <span className='text-lg'>Select Seller </span>
                <span><RiMessage3Fill /></span>
              </div>
              }
        </div>

      </div>

    </div>
  )
}

export default Chat