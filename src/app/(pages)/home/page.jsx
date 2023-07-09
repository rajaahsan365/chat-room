'use client'
import { auth } from "@/app/Firebase/firebase";
import Chat from "@/app/components/Chat";
import Sidebar from "@/app/components/Sidebar";
import { setUser } from "@/app/store/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
      else{
        dispatch({
          type: setUser.type,
          payload: {
            username:user.displayName ,
            photoURL: user.photoURL,
            email: user.email,
            uid: user.uid,
          },
        });
      }
      return unsub;
    });
  }, []);
  return (
    <div className="bg-green-200 h-screen flex items-center justify-center">
      <div className="border-2 border-white rounded-2xl w-2/3 h-4/5 flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
