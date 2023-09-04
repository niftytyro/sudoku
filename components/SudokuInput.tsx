import { range } from "@/utils/utils";
import React from "react";
import EditIcon from "../icons/edit.svg";
import Image from "next/image";
import { InputMode } from "@/utils/grid";

interface SudokuInputProps {
  inputMode: InputMode;
  onInput: (input: number) => void;
  toggleNotes: () => void;
}

const SudokuInput: React.FC<SudokuInputProps> = ({
  inputMode,
  onInput,
  toggleNotes,
}) => {
  return (
    <div className="w-full flex justify-center space-x-4 items-stretch mt-7 text-4xl text-lightBlack font-handwriting font-medium">
      {range(1, 10).map((i) => (
        <button
          key={i}
          onClick={() => onInput(i)}
          className="border-[0.5px] border-darkGray aspect-square flex justify-center items-center rounded-lg pr-1 pb-1"
        >
          {i}
        </button>
      ))}
      <button
        onClick={toggleNotes}
        className={`border-[0.5px] border-darkGray w-16 h-16 flex justify-center items-center rounded-lg ${
          inputMode === "notes" ? "bg-yellow" : ""
        }`}
      >
        <Image src={EditIcon} alt="edit" className="" />
      </button>
    </div>
  );
};

export default SudokuInput;
