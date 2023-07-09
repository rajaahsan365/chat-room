import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../store/slices/chatSlice";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user: currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: changeUser.type, payload: { currentUser, u } });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            className="p-4 flex items-center gap-2 text-white cursor-pointer hover:bg-green-700"
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1].userInfo?.photoURL}
              alt=""
              className="w-8 h-8 rounded-full object-cover md:w-12 md:h-12"
            />
            <div className="">
              <span className="text-sm font-semibold md:text-xl">
                {chat[1].userInfo?.name}
              </span>
              <p className="text-xs text-gray-400 md:text-sm">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
