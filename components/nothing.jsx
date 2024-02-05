import React from "react";

const Nothing = () => {
  return (
    <div className="flex flex-col justify-center px-[5%] pt-12 lg:pb-10 pb-14 absolute top-0 left-0 right-0 bottom-0 ">
      <div className="flex w-full justify-center">
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDVxbzZtOGJiZjZpd3dsZHBmenowb2JmcDM2bnk0ZmN4a2poeHF2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VwspZcjH412OMixzar/giphy.gif"          alt=""
          className="w-24 h-24 mb-2"
        />
      </div>
      <p className="text-lg text-white font-semibold flex w-full justify-center">
        Nothing found.
      </p>
    </div>
  );
};

export default Nothing;
