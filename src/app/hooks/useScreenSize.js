"use client";
import { useEffect, useState } from "react";

const useScreenSize = (breakpoint) => {
  const [screenSize, setScreenSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return screenSize;
};

export default useScreenSize;
