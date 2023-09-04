"use client";

import CrossIcon from "@/icons/cross.svg";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import Button from "./Button";

interface RulesModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface GameFinishedModalProps {
  time: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  showCloseButton = true,
  onClose,
}) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => onClose()}
        className="w-full h-full bg-lightBlack opacity-50"
      />
      <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black bg-white pt-6 pb-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <div />
          <h1 className="text-center text-2xl font-semibold">{title}</h1>
          {showCloseButton ? (
            <Image
              src={CrossIcon}
              alt="exit"
              className="cursor-pointer"
              onClick={() => onClose()}
            />
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="Rules">
      <p>
        {`Playing Sudoku is a brain-teasing puzzle game that's both fun and
        challenging. To get started, you'll need a 9x9 grid divided into nine
        3x3 regions. Your goal is to fill in the entire grid with numbers from 1
        to 9, making sure each row, column, and region contains all the numbers
        exactly once. Begin with the easier, more obvious placements and work
        your way to the trickier ones. Remember, there's only one solution to
        each puzzle, so use logic and deduction to crack it. And don't worry if
        you get stuck – Sudoku is all about patience and perseverance. So grab a
        pencil, keep those erasers handy (you don’t need those here though), and
        get ready to exercise your gray matter!`}
      </p>
    </Modal>
  );
};

export const GameFinishedModal: React.FC<GameFinishedModalProps> = ({
  time,
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Congratulations"
    >
      <p>You finished the game in {time}. Wanna play another game?</p>
      <div className="flex justify-center items-center space-x-8 mt-8">
        <Button onClick={() => location.reload()}>Yes, please</Button>
        <Button onClick={() => onClose()} type="secondary">
          No, thanks
        </Button>
      </div>
    </Modal>
  );
};

export default Modal;
