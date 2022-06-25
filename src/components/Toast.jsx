import React from "react";
import { GrCopy } from "react-icons/gr";

const Toast = ({ message, visible = false }) => {
  return (
    <div
      id="toast-default"
      className={`flex absolute ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity top-5 right-5 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
        <GrCopy />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;
