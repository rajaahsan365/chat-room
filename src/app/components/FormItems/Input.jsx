import React from "react";

const Input = ({ name, label, ...otherProps }) => {
  return (
    <div className="relative mb-1 mx-auto w-max">
      <input
        className="peer m-0 block h-[58px] w-full rounded border border-solid border-green-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-green-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-green-700 focus:outline-none peer-focus:text-primary dark:border-green-600 dark:text-green-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
        id={name}
        name={name}
        placeholder={name}
        {...otherProps}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-green-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-green-200 dark:peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
