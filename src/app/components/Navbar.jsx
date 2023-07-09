"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth } from "../Firebase/firebase";
import { logoutUser } from "../store/slices/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: logoutUser.type });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center bg-purple-900 h-16 mt-5 px-4 justify-between text-green-100">
      <span className="font-bold text-sm hidden lg:block">Chat App</span>
      {user?.email ? (
        <div className="flex justify-around items-center gap-4">
          <img
            src={user.photoURL}
            className="h-6 w-6 rounded-full object-cover"
            alt="User Profile"
          />
          <span className="text-xs lg:text-normal">
            {user.username.split(" ")[0]}
          </span>
          <button
            className="bg-green-700 text-green-100 text-xs px-2 py-1 rounded cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span>{"Guest User"}</span>
          <button
            className="bg-green-700 text-green-100 text-xs px-2 py-1 rounded cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
