"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

const GRID_COLUMNS = 9;
const GRID_ROWS = 9;

interface SudokuGridProps {
  grid: string;
}

interface SudokuSubGridProps {
  subGrid: string;
  index: number;
  selectedCell: { row: number; column: number };
}

interface SudokuGridCellProps {
  value?: string;
  selected: boolean;
  highlighted: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid }) => {
  const [selectedCellRow, setSelectedCellRow] = useState(0);
  const [selectedCellColumn, setSelectedCellColumn] = useState(0);
  const subGrids = useMemo(() => grid.match(/.{9}/g) ?? [], [grid]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setSelectedCellColumn((col) => Math.max(0, col - 1));
        break;
      case "ArrowRight":
        e.preventDefault();
        setSelectedCellColumn((col) => Math.min(GRID_COLUMNS - 1, col + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedCellRow((row) => Math.max(0, row - 1));
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedCellRow((row) => Math.min(GRID_ROWS - 1, row + 1));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="grid grid-rows-3 grid-cols-3 h-5/6 aspect-square gap-0.5 bg-black border-[5px] border-black">
      {Array.from({ length: 9 }).map((_, index) => (
        // TODO what if subGrids is empty array or less than 9?
        <SudokuSubGrid
          key={index}
          index={index}
          subGrid={subGrids[index]}
          selectedCell={{ column: selectedCellColumn, row: selectedCellRow }}
        />
      ))}
    </div>
  );
};

const SudokuSubGrid: React.FC<SudokuSubGridProps> = ({
  subGrid,
  index: subGridIndex,
  selectedCell,
}) => {
  return (
    <div className="grid grid-rows-3 grid-cols-3 gap-px bg-darkGray">
      {Array.from({ length: 9 }).map((_, index) => {
        const subGridColumn = subGridIndex % 3;
        const subGridRow = Math.floor(subGridIndex / 3);

        const column = subGridColumn * 3 + (index % 3);
        const row = subGridRow * 3 + Math.floor(index / 3);

        return (
          <SudokuGridCell
            key={index}
            value={subGrid[index] === "." ? "" : subGrid[index]}
            selected={
              column === selectedCell.column && row === selectedCell.row
            }
            highlighted={
              // TODO refactor
              selectedCell.row === row ||
              selectedCell.column === column ||
              (subGridColumn === Math.floor(selectedCell.column / 3) &&
                subGridRow === Math.floor(selectedCell.row / 3))
            }
          />
        );
      })}
    </div>
  );
};

const SudokuGridCell: React.FC<SudokuGridCellProps> = ({
  value: _value,
  selected,
  highlighted,
}) => {
  const [value, setValue] = useState(_value);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selected && _value === "" && e.key.match(/[1-9]/g)) {
        setValue(e.key);
      }
    },
    [_value, selected]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className={`bg-white flex justify-center items-center font-bold text-5xl ${
        selected ? "bg-yellow" : highlighted ? "bg-gray" : ""
      }`}
    >
      {value}
    </div>
  );
};

export default SudokuGrid;
