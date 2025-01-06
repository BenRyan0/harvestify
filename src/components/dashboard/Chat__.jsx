import React, { useEffect, useRef, useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { RiMessage3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import {
  add_friend,
  send_message,
  messageClear,
  updateMessage,
} from "../../store/reducers/ChatReducer";
import { socket } from "../../utils/utils";

const Chat = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const [receiverMessage, setReceiverMessage] = useState("");
  const [text, setText] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { my_connections, currentConnection, my_messages, successMessage } =
    useSelector((state) => state.chat);

  // Emit the user when the component mounts
  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, [userInfo.id]);

  // Add a friend if `sellerId` exists
  useEffect(() => {
    if (sellerId) {
      dispatch(
        add_friend({
          sellerId,
          userId: userInfo.id,
        })
      );
    }
  }, [sellerId, userInfo.id, dispatch]);

  // Send a message
  const sendMessage = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  // Handle socket events for receiving messages and active sellers
  useEffect(() => {
    socket.on("seller_message_", (msg) => {
      setReceiverMessage(msg);
    });

    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  // Update messages and show toast notifications
  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo.id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(`${receiverMessage.senderName} sent a message`);
        dispatch(messageClear());
      }
    }
  }, [receiverMessage, sellerId, userInfo.id, dispatch]);

  // Emit new messages through the socket
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_customer_message",
        my_messages[my_messages.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, my_messages, dispatch]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [my_messages]);

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        {/* Left Sidebar: Connections */}
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-500 text-base h-[50px]">
            <BiSolidMessageSquareDetail />
            <span className="font-semibold text-sm">Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 overflow-y-auto">
            {my_connections.length > 0 ? (
              my_connections.map((f, i) => (
                <Link
                  to={`/dashboard/chat/${f.fdId}`}
                  key={i}
                  className="flex gap-2 justify-start items-center pl-2 py-[5px]"
                >
                  <div className="w-[35px] h-[35px] rounded-full relative">
                    {activeSeller.some((c) => c.sellerId === f.fdId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-white"></div>
                    )}
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

        {/* Right Panel: Chat Section */}
        <div className="w-[calc(100%-230px)]">
          {currentConnection ? (
            <div className="w-full h-full">
              {/* Chat Header */}
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="w-[35px] h-[35px] rounded-full relative">
                  {activeSeller.some(
                    (c) => c.sellerId === currentConnection.fdId
                  ) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-white"></div>
                  )}
                  <img
                    className="h-full w-full rounded-full"
                    src={currentConnection.image}
                    alt={currentConnection.name}
                  />
                </div>
                <span className="font-semibold text-sm">
                  {currentConnection.name}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="h-[400px] w-full bg-slate-100 px-1 py-2 rounded-md">
                <div
                  className="w-full h-full overflow-y-auto flex flex-col gap-1"
                  ref={scrollRef}
                >
                  {my_messages.length > 0 ? (
                    my_messages.map((m, i) => (
                      <div
                        key={i}
                        className={`w-full flex gap-2 ${
                          currentConnection?.fdId === m.receiverId
                            ? "justify-end"
                            : "justify-start"
                        } items-center text-[14px] px-2 py-1`}
                      >
                        <img
                          className="rounded-full h-[40px] w-[40px] border border-slate-500"
                          src={
                            currentConnection?.fdId === m.receiverId
                              ? "http://localhost:3001/images/farmers/Farmer.jpg"
                              : currentConnection.image
                          }
                          alt=""
                        />
                        <div
                          className={`px-2 py-1 rounded-sm ${
                            currentConnection?.fdId === m.receiverId
                              ? "bg-primaryDark/80 text-white"
                              : "bg-slate-500 text-white"
                          }`}
                        >
                          <span>{m.message}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center mt-10">
                      No messages yet. Start the conversation!
                    </p>
                  )}
                </div>
              </div>

              {/* Input Section */}
              <div className="flex px-2 py-3 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="file-upload">
                    <AiOutlinePlusSquare />
                  </label>
                  <input id="file-upload" className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-60px)] rounded-full relative text-center flex justify-center items-center">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    className="w-full bg-transparent h-full outline-none p-3 text-sm text-slate-600"
                    placeholder="Type a message"
                  />
                  <div className="text-slate-600 right-2 top-2 absolute cursor-pointer">
                    <MdEmojiEmotions size={20} />
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div
                    onClick={sendMessage}
                    className="text-2xl cursor-pointer text-slate-600"
                  >
                    <IoIosSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full gap-1 flex justify-center items-center text-xl font-bold text-slate-500">
              <span className="text-lg">Select a Seller</span>
              <RiMessage3Fill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
