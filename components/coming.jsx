"use client";
import React from 'react'
import Typewriter from "typewriter-effect";

const Coming = () => {
  return (
    <div className='flex flex-col justify-center'>
        <div className="flex w-full justify-center">
        <img 
            src="https://media1.giphy.com/media/QYjrEErMOccsWNwMOd/giphy.gif?cid=ecf05e476bzn8akk9pxyihdosr39ig06pl2weskvgbpf58gd&ep=v1_gifs_related&rid=giphy.gif&ct=s" 
            className="w-24 h-24"
        />
        </div>
        <h1 className="text-xl font-semibold flex w-full justify-center">
            <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString("Coming soon").start();
            }}
            />
        </h1>
    </div>
    
  )
}

export default Coming