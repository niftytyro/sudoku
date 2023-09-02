import React, { useMemo } from "react";

interface SudokuGridProps {
  grid: string;
}

interface SudokuSubGridProps {
  subGrid: string;
}

interface SudokuGridCellProps {
  value?: string;
  selected: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid }) => {
  const subGrids = grid.match(/.{9}/g) ?? [];

  return (
    <div className="grid grid-rows-3 grid-cols-3 h-5/6 aspect-square gap-0.5 bg-black border-[5px] border-black">
      {Array.from({ length: 9 }).map((_, index) => (
        // TODO what if subGrids is empty array or less than 9?
        <SudokuSubGrid key={index} subGrid={subGrids[index]} />
      ))}
    </div>
  );
};

const SudokuSubGrid: React.FC<SudokuSubGridProps> = ({ subGrid }) => {
  return (
    <div className="grid grid-rows-3 grid-cols-3 gap-px bg-darkGray">
      {Array.from({ length: 9 }).map((_, index) => (
        <SudokuGridCell
          key={index}
          value={subGrid[index] === "." ? "" : subGrid[index]}
          selected={false}
        />
      ))}
    </div>
  );
};

const SudokuGridCell: React.FC<SudokuGridCellProps> = ({ value, selected }) => {
  return (
    <div className="bg-white flex justify-center items-center font-bold text-5xl">
      {value}
    </div>
  );
};

export default SudokuGrid;
