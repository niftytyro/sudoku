"use client";

import {
  InputMode,
  calculateCellIndexInGrid,
  calculateSubGrids,
  extrapolateIndicesForSubGrid,
  isValidSudokuInput,
  validateSudokuGrid,
} from "@/utils/grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ErrorMark from "../icons/error-mark.svg";
import { range } from "@/utils/utils";
import SudokuInput from "./SudokuInput";

const GRID_COLUMNS = 9;
const GRID_ROWS = 9;

interface SudokuContainerProps {
  grid: string;
  onGameFinish: () => void;
}

interface SudokuGridProps {
  grid: string;
  initialGrid: string;
  errorIndices: number[];
  selectedCellRow: number;
  selectedCellColumn: number;
  inputMode: InputMode;
  setErrorIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setInputMode: React.Dispatch<React.SetStateAction<InputMode>>;
  setSelectedCellRow: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCellColumn: React.Dispatch<React.SetStateAction<number>>;
  updateGrid: (index: number, value: string | null) => void;
}

interface SudokuSubGridProps {
  initialGrid: string;
  subGrid: string;
  index: number;
  selectedCell: { row: number; column: number };
  errorIndices: number[];
  inputMode: InputMode;
  setValue: (index: number, v: string | null) => void;
}

interface SudokuGridCellProps {
  value?: string;
  setValue: (v: string | null) => void;
  isEditable: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
  inputMode: InputMode;
}

const SudokuContainer: React.FC<SudokuContainerProps> = ({
  grid: initialGrid,
  onGameFinish,
}) => {
  const [grid, setGrid] = useState(initialGrid);
  const [selectedCellRow, setSelectedCellRow] = useState(0);
  const [selectedCellColumn, setSelectedCellColumn] = useState(0);
  const [errorIndices, setErrorIndices] = useState<number[]>([]);
  const [inputMode, setInputMode] = useState<"notes" | "input">("input");

  const updateGrid = useCallback((index: number, newValue: string | null) => {
    setGrid((grid) => {
      const newGrid =
        grid.slice(0, index) + (newValue ?? ".") + grid.slice(index + 1);
      setErrorIndices((errorIndices) =>
        validateSudokuGrid(newGrid, errorIndices, index)
      );

      return newGrid;
    });
  }, []);

  useEffect(() => {
    if (grid.indexOf(".") < 0) {
      onGameFinish();
    }
  }, [grid, onGameFinish]);

  return (
    <div className="shrink-0 grow flex flex-col items-center">
      <SudokuGrid
        grid={grid}
        initialGrid={initialGrid}
        errorIndices={errorIndices}
        inputMode={inputMode}
        selectedCellColumn={selectedCellColumn}
        selectedCellRow={selectedCellRow}
        setErrorIndices={setErrorIndices}
        setInputMode={setInputMode}
        setSelectedCellColumn={setSelectedCellColumn}
        setSelectedCellRow={setSelectedCellRow}
        updateGrid={updateGrid}
      />
      <SudokuInput
        inputMode={inputMode}
        toggleNotes={() =>
          setInputMode(inputMode === "input" ? "notes" : "input")
        }
        onInput={(i) => {
          if (inputMode === "input") {
            updateGrid(selectedCellRow * 9 + selectedCellColumn, i.toString());
          } else {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: i.toString() })
            );
          }
        }}
      />
    </div>
  );
};

const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  initialGrid,
  errorIndices,
  inputMode,
  selectedCellColumn,
  selectedCellRow,
  setInputMode,
  setSelectedCellColumn,
  setSelectedCellRow,
  updateGrid,
}) => {
  const subGrids = useMemo(() => calculateSubGrids(grid), [grid]);

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
        case "n":
          e.preventDefault();
          setInputMode((mode) => (mode === "input" ? "notes" : "input"));
        default:
          if (inputMode === "input") {
            const index = selectedCellRow * 9 + selectedCellColumn;
            if (isValidSudokuInput(e.key) && initialGrid[index] === ".") {
              updateGrid(index, e.key);
            }
          }
          break;
      }
    },
    [
      initialGrid,
      inputMode,
      selectedCellColumn,
      selectedCellRow,
      setInputMode,
      setSelectedCellColumn,
      setSelectedCellRow,
      updateGrid,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="grid grid-rows-3 grid-cols-3 h-5/6 aspect-square gap-0.5 bg-black border-[5px] border-black">
      {Array.from({ length: 9 }).map((_, subGridIndex) => (
        // TODO what if subGrids is empty array or less than 9?
        <SudokuSubGrid
          initialGrid={initialGrid}
          key={subGridIndex}
          index={subGridIndex}
          inputMode={inputMode}
          subGrid={subGrids[subGridIndex]}
          selectedCell={{ column: selectedCellColumn, row: selectedCellRow }}
          errorIndices={extrapolateIndicesForSubGrid(
            errorIndices,
            subGridIndex
          )}
          setValue={(cellIndex, value) =>
            updateGrid(calculateCellIndexInGrid(subGridIndex, cellIndex), value)
          }
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
  errorIndices,
  inputMode,
  setValue,
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
            setValue={(value) => setValue(index, value)}
            inputMode={inputMode}
            isError={errorIndices.includes(index)}
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
  setValue,
  isEditable,
  isSelected,
  isHighlighted,
  isError,
  inputMode,
}) => {
  const [notes, setNotes] = useState<number[]>([]);
  let [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    setShowNotes(!isValidSudokuInput(value));
  }, [value]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (inputMode === "notes" && isValidSudokuInput(e.key) && isSelected) {
        const number = parseInt(e.key);
        setNotes((notes) => {
          const index = notes.indexOf(number);
          if (index > -1) {
            notes.splice(index, 1);
          } else {
            notes.push(number);
          }

          return [...notes];
        });

        setShowNotes(true);
        setValue(null);
      }
    },
    [inputMode, isSelected, setValue]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className={`flex justify-center items-center font-bold ${
        isSelected
          ? "bg-yellow"
          : isHighlighted
          ? "bg-gray"
          : isEditable
          ? "bg-white"
          : "bg-white"
      } ${isEditable ? "font-handwriting text-lightBlack" : ""} ${
        showNotes ? "text-base" : "text-5xl"
      }`}
    >
      <Image
        className={`absolute ${isError ? "" : "hidden"}`}
        src={ErrorMark}
        alt="error mark"
      />
      {showNotes ? (
        <div className="grid grid-rows-3 grid-cols-3 text-lightBlack text-center w-full p-2">
          {range(1, 10).map((i) => (
            <p key={i} className={`${notes.includes(i) ? "" : "invisible"}`}>
              {i}
            </p>
          ))}
        </div>
      ) : (
        value
      )}
    </div>
  );
};

export default SudokuContainer;
