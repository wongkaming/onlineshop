import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center px-[5%] pt-12 lg:pb-10 pb-14 absolute top-0 left-0 right-0 bottom-0">
      <div className="flex w-full justify-center">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXk3a3RyMWVmOXhvczlwcThvdzVxbTk5dXl4N2xjcnNlenJscXRnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/wvmZeC7Yrf984PDDa3/giphy.gif"
          alt=""
          className="w-24 h-24"
        />
      </div>
      <p className="text-lg text-white font-semibold flex w-full justify-center">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
