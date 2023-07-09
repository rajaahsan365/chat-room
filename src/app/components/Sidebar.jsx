"use client";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import useScreenSize from "../hooks/useScreenSize";

const Sidebar = () => {
  const isMobileSize = useScreenSize(768);

  return (
    <div
      className={`flex-1 h-screen bg-purple-900 relative ${
        isMobileSize ? "w-full" : "md:w-2/5 min-w-100"
      }`}
    >
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
