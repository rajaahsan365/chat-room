"use client";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const data = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`flex ${
        message.senderId === currentUser.uid ? "flex-row-reverse" : "flex-row"
      } mb-4`}
    >
      <div className="flex flex-col items-center text-gray-500 text-sm mx-2">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-10 h-10 rounded-full object-cover md:w-8 md:h-8"
        />
        <span className="text-xs">just now</span>
      </div>
      <div className="max-w-80 flex flex-col gap-2">
        <p
          className={`rounded-lg px-4 py-2 w-52 ${
            message.senderId === currentUser.uid
              ? "bg-green-700 text-white"
              : "bg-white self-end"
          }`}
        >
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="" className="w-1/2 self-end" />}
      </div>
    </div>
  );
};

export default Message;
