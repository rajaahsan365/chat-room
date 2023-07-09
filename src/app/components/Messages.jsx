"use client";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { db } from "../Firebase/firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const data = useSelector((state) => state.chat);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub;
    };
  }, [data.chatId]);

  return (
    <div className="messages bg-purple-200 p-2 h-[calc(100%-3rem)] overflow-y-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
