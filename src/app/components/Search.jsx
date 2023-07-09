"use client";
import React, { useRef, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../Firebase/firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { user: currentUser } = useSelector((state) => state);

  const inputRef = useRef(null);

  const handleSearch = async () => {
    setErr(false);
    setUser(null);
  
    if (!username) {
      setErr(true);
      return;
    }
  
    const q = query(collection(db, "users"), where("name", "==", username));
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (err) {
      setErr(true);
    }
  };
  

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleBlur = () => {
    setErr(false);
    setUsername("");
    setUser(null);
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.username,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="border-b border-gray-400">
      <div className="p-4">
        <input
          type="text"
          placeholder="Find a user"
          className="bg-transparent border-none text-white outline-none placeholder-lightgray"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          // onBlur={handleBlur}
          // ref={inputRef}
        />
      </div>
      {err && <span className="ms-3 ">User not found!</span>}
      {user && (
        <div
          className="p-4 flex items-center text-white cursor-pointer"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt=""
            className="w-12 h-12 rounded-full object-cover md:w-8 md:h-8"
          />
          <div className="ml-4">
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
