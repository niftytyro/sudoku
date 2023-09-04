"use client";

import React from "react";
import Timer from "./Timer";
import Button from "./Button";

const SideBar = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center pb-48">
      <Timer />
      <Button
        onClick={() => {
          // Yes, I took a shortcut here hehe
          location.reload();
        }}
      >
        <span className="text-2xl leading-none mr-2">+</span> New Game
      </Button>
    </div>
  );
};

export default SideBar;
