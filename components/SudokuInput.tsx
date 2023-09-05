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
    <div className="w-full grid grid-cols-5 md:grid-cols-10 justify-items-center mt-7 mb-12 text-3xl md:text-4xl text-lightBlack font-handwriting font-medium">
      {range(1, 10).map((i) => (
        <button
          key={i}
          onClick={() => onInput(i)}
          className="border-[0.5px] border-darkGray w-10 md:w-16 h-10 md:h-16 flex justify-center items-center rounded-lg pr-1 pb-1 mt-2"
        >
          {i}
        </button>
      ))}
      <button
        onClick={toggleNotes}
        className={`border-[0.5px] border-darkGray w-10 md:w-16 h-10 md:h-16 flex justify-center items-center rounded-lg mt-2 ${
          inputMode === "notes" ? "bg-yellow" : ""
        }`}
      >
        <Image src={EditIcon} alt="edit" className="w-6 md:w-9 h-6 md:h-9" />
      </button>
    </div>
  );
};

export default SudokuInput;
