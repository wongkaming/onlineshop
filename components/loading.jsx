import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center px-[5%] pt-12 lg:pb-10 pb-14 absolute top-0 left-0 right-0 bottom-0">
      <iframe
        src="https://giphy.com/embed/wvmZeC7Yrf984PDDa3"
        width="100"
        height="100"
        className="flex w-full justify-center"
        allowFullScreen
      ></iframe>
      <p className="text-lg text-white font-semibold flex w-full justify-center">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
