"use client";

import {
  InputMode,
  calculateCellCoordinatesInGrid,
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
import Notes1 from "../icons/1.svg";
import Notes2 from "../icons/2.svg";
import Notes3 from "../icons/3.svg";
import Notes4 from "../icons/4.svg";
import Notes5 from "../icons/5.svg";
import Notes6 from "../icons/6.svg";
import Notes7 from "../icons/7.svg";
import Notes8 from "../icons/8.svg";
import Notes9 from "../icons/9.svg";

const NotesIcons = [
  Notes1,
  Notes2,
  Notes3,
  Notes4,
  Notes5,
  Notes6,
  Notes7,
  Notes8,
  Notes9,
];

const GRID_COLUMNS = 9;
const GRID_ROWS = 9;

interface SudokuContainerProps {
  grid: string;
  onEndGame: () => void;
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
  initialSubGrid: string;
  subGrid: string;
  selectedCell: { row: number; column: number };
  errorIndices: number[];
  inputMode: InputMode;
  index: number;
  selectCell: (index: number) => void;
  setValue: (index: number, v: string | null) => void;
}

export interface SudokuGridCellProps {
  value?: string;
  isEditable: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
  inputMode: InputMode;
  testId: string;
  onUpdateNotes: () => void;
  selectCell: () => void;
}

const SudokuContainer: React.FC<SudokuContainerProps> = ({
  grid: initialGrid,
  onEndGame,
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

  const onInput = useCallback(
    (i: number) => {
      const index = selectedCellRow * 9 + selectedCellColumn;
      if (
        isValidSudokuInput(i.toString()) &&
        initialGrid[index] === "." &&
        inputMode === "input"
      ) {
        updateGrid(index, i.toString());
      } else {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: i.toString() })
        );
      }
    },
    [initialGrid, inputMode, selectedCellColumn, selectedCellRow, updateGrid]
  );

  useEffect(() => {
    if (grid.indexOf(".") < 0 && errorIndices.length === 0) {
      onEndGame();
    }
  }, [errorIndices.length, grid, onEndGame]);

  return (
    <div className="shrink-0 grow flex flex-col items-center max-w-3xl">
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
        onInput={onInput}
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
  const initialSubGrids = useMemo(
    () => calculateSubGrids(initialGrid),
    [initialGrid]
  );
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
    <div className="grid grid-rows-3 grid-cols-3 w-full xl:h-4/5 aspect-square gap-0.5 bg-black border-[5px] border-black">
      {Array.from({ length: 9 }).map((_, subGridIndex) => {
        const subGridColumn = subGridIndex % 3;
        const subGridRow = Math.floor(subGridIndex / 3);

        const selectedSubGridColumn =
          Math.floor(selectedCellColumn / 3) - subGridColumn;
        const relativeSelectedCellColumn =
          selectedSubGridColumn * 3 + (selectedCellColumn % 3);

        const selectedSubGridRow = Math.floor(selectedCellRow / 3) - subGridRow;
        const relativeSelectedCellRow =
          selectedSubGridRow * 3 + (selectedCellRow % 3);

        return (
          // TODO what if subGrids is empty array or less than 9?
          <SudokuSubGrid
            key={subGridIndex}
            index={subGridIndex}
            inputMode={inputMode}
            subGrid={subGrids[subGridIndex]}
            initialSubGrid={initialSubGrids[subGridIndex]}
            selectedCell={{
              column: relativeSelectedCellColumn,
              row: relativeSelectedCellRow,
            }}
            errorIndices={extrapolateIndicesForSubGrid(
              errorIndices,
              subGridIndex
            )}
            setValue={(cellIndex, value) =>
              updateGrid(
                calculateCellIndexInGrid(subGridIndex, cellIndex),
                value
              )
            }
            selectCell={(cellIndex) => {
              const { row, column } = calculateCellCoordinatesInGrid(
                subGridIndex,
                cellIndex
              );
              setSelectedCellColumn(column);
              setSelectedCellRow(row);
            }}
          />
        );
      })}
    </div>
  );
};

const SudokuSubGrid: React.FC<SudokuSubGridProps> = ({
  initialSubGrid,
  subGrid,
  selectedCell,
  errorIndices,
  inputMode,
  index: subGridIndex,
  setValue,
  selectCell,
}) => {
  return (
    <div className="grid grid-rows-3 grid-cols-3 gap-px bg-darkGray">
      {Array.from({ length: 9 }).map((_, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);

        const { column: columnInGrid, row: rowInGrid } =
          calculateCellCoordinatesInGrid(subGridIndex, index);

        const testId = `${columnInGrid}-${rowInGrid}`;

        return (
          <SudokuGridCell
            key={index}
            testId={testId}
            value={subGrid[index]}
            onUpdateNotes={() => setValue(index, null)}
            selectCell={() => selectCell(index)}
            inputMode={inputMode}
            isError={errorIndices.includes(index)}
            isEditable={initialSubGrid[index] === "."}
            isSelected={
              column === selectedCell.column && row === selectedCell.row
            }
            isHighlighted={
              selectedCell.row === row ||
              selectedCell.column === column ||
              (selectedCell.column >= 0 &&
                selectedCell.column < 3 &&
                selectedCell.row >= 0 &&
                selectedCell.row < 3)
            }
          />
        );
      })}
    </div>
  );
};

export const SudokuGridCell: React.FC<SudokuGridCellProps> = ({
  testId,
  value,
  isEditable,
  isSelected,
  isHighlighted,
  isError,
  inputMode,
  onUpdateNotes,
  selectCell,
}) => {
  const [notes, setNotes] = useState<number[]>([]);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    // If there is a new input, hide the notes
    setShowNotes(!isValidSudokuInput(value));
  }, [value]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        inputMode === "notes" &&
        isValidSudokuInput(e.key) &&
        isSelected &&
        isEditable
      ) {
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
        onUpdateNotes();
      }
    },
    [inputMode, isEditable, isSelected, onUpdateNotes]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      data-testid={`sudoku-cell-${testId}`}
      onClick={selectCell}
      className={`${
        showNotes ? "" : "flex justify-center items-center"
      } font-bold overflow-hidden ${
        isSelected
          ? "bg-yellow"
          : isHighlighted
          ? "bg-gray"
          : isEditable
          ? "bg-white"
          : "bg-white"
      } ${isEditable ? "font-handwriting text-lightBlack" : ""} ${
        showNotes ? "text-base" : "text-3xl sm:text-5xl"
      }`}
    >
      <Image
        className={`absolute ${isError ? "" : "hidden"} w-6 md:w-16`}
        src={ErrorMark}
        alt="error mark"
      />
      {showNotes ? (
        <div className="w-full h-full grid grid-rows-3 grid-cols-3 justify-items-center items-center text-lightBlack text-center md:p-2">
          {range(1, 10).map((i) => (
            <Image
              key={i}
              data-testid={`sudoku-cell-${testId}-notes-${i}`}
              src={NotesIcons[i - 1]}
              alt={`${i}`}
              className={`${notes.includes(i) ? "" : "invisible"} h-2/3`}
            />
          ))}
        </div>
      ) : value === "." ? (
        ""
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default SudokuContainer;
