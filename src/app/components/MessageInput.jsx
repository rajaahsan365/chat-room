"use client";
import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../Firebase/firebase";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const data = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if(text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleAttachImage = () => {
    // Trigger click event of the hidden input element
    document.getElementById("file").click();
  };
  return (
    <div className="input h-12 absolute bottom-0 w-full px-10 bg-white p-5 flex items-center justify-between">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full border-none outline-none text-gray-700 lg:text-lg text-sm"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send flex items-center gap-2">
        <img
          src={"/images/attach.png"}
          alt=""
          className="h-6 cursor-pointer"
          onClick={handleAttachImage}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={"/images/img.png"} alt="" className="h-6 w-10 cursor-pointer" />
        </label>
        <button
          className="px-4 lg:text-normal text-xs py-2 text-white bg-green-700 rounded-md cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
