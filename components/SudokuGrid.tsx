"use client";

import { calculateSubGrids } from "@/utils/grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const GRID_COLUMNS = 9;
const GRID_ROWS = 9;

interface SudokuGridProps {
  grid: string;
}

interface SudokuSubGridProps {
  initialGrid: string;
  subGrid: string;
  index: number;
  selectedCell: { row: number; column: number };
}

interface SudokuGridCellProps {
  value?: string;
  isEditable: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid: _grid }) => {
  const [grid, setGrid] = useState(_grid);
  const [selectedCellRow, setSelectedCellRow] = useState(0);
  const [selectedCellColumn, setSelectedCellColumn] = useState(0);
  const subGrids = useMemo(() => calculateSubGrids(grid), [grid]);

  const updateGrid = useCallback((index: number, newValue: string) => {
    setGrid((grid) => {
      const newGrid = grid.slice(0, index) + newValue + grid.slice(index + 1);
      return newGrid;
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
          const index = selectedCellRow * 9 + selectedCellColumn;
          if (e.key.match(/^[1-9]$/g) && _grid[index] === ".") {
            updateGrid(index, e.key);
          }
          break;
      }
    },
    [_grid, selectedCellColumn, selectedCellRow, updateGrid]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="grid grid-rows-3 grid-cols-3 h-5/6 aspect-square gap-0.5 bg-black border-[5px] border-black">
      {Array.from({ length: 9 }).map((_, index) => (
        // TODO what if subGrids is empty array or less than 9?
        <SudokuSubGrid
          initialGrid={_grid}
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
  initialGrid,
  subGrid,
  index: subGridIndex,
  selectedCell,
}) => {
  const initialSubGrid = calculateSubGrids(initialGrid)[subGridIndex];

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
            isEditable={initialSubGrid[index] === "."}
            isSelected={
              column === selectedCell.column && row === selectedCell.row
            }
            isHighlighted={
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
  value,
  isEditable,
  isSelected,
  isHighlighted,
}) => {
  return (
    <div
      className={`flex justify-center items-center font-bold text-5xl ${
        isSelected
          ? "bg-yellow"
          : isHighlighted
          ? "bg-gray"
          : isEditable
          ? "bg-white"
          : "bg-white"
      } ${isEditable ? "font-handwriting text-lightBlack" : ""}`}
    >
      {value}
    </div>
  );
};

export default SudokuGrid;
