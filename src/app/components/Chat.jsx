'use client'
import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";

const Chat = () => {
  const { user } = useSelector((state) => state.chat);
  const isMobileSize = useScreenSize(768);

  return (
    <div className={`w-full ${isMobileSize ? "h-screen" : "h-full"} relative`}>
      <div className="h-16 bg-purple-800 flex items-center justify-between px-4 text-gray-300">
        <span>{user?.name}</span>
        <div className="flex gap-4">
          <img
            src={"/images/cam.png"}
            alt=""
            className="h-6 w-6 cursor-pointer"
          />
          <img
            src={"/images/add.png"}
            alt=""
            className="h-6 w-6 cursor-pointer"
          />
          <img
            src={"/images/more.png"}
            alt=""
            className="h-6 w-6 cursor-pointer"
          />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
