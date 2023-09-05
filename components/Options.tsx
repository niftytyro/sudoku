"use client";

import React from "react";
import Button from "./Button";
import Timer from "./Timer";

interface OptionsProps {
  time: string;
}

const Options: React.FC<OptionsProps> = ({ time }) => {
  return (
    <div className="flex-1 flex xl:flex-col justify-between xl:justify-center items-center xl:pb-48 my-4">
      <Timer time={time} />
      <Button
        onClick={() => {
          // Yes, I took a shortcut here hehe
          location.reload();
        }}
      >
        New Game
      </Button>
    </div>
  );
};

export default Options;
