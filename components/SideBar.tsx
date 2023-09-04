"use client";

import React from "react";
import Button from "./Button";
import Timer from "./Timer";

interface SideBarProps {
  time: string;
  showRulesModal: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ showRulesModal, time }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center pb-48">
      <Timer time={time} />
      <Button
        onClick={() => {
          // Yes, I took a shortcut here hehe
          location.reload();
        }}
      >
        <span className="text-2xl leading-none mr-2">+</span> New Game
      </Button>

      <div className="cursor-pointer underline mt-4" onClick={showRulesModal}>
        How to play?
      </div>
    </div>
  );
};

export default SideBar;
