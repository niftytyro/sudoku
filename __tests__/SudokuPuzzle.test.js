import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Body from "../components/Body";
import { act } from "react-dom/test-utils";
import { calculateCellCoordinatesFromIndex } from "../utils/grid";

const puzzle =
  ".697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432";
const solution =
  "569784123382619547471253896937128654254976318816435279143892765625347981798561432";

function simulateKeyPress(key) {
  var event = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(event);
}

test("sudoku puzzle", () => {
  render(<Body grid={puzzle} />);

  const endGameModal = screen.getByTestId("modal-congratulations");
  expect(endGameModal).toBeInTheDocument();
  expect(endGameModal).toHaveClass("hidden");

  const toggleNotesButton = screen.getByTestId("btn-toggle-notes");

  let cell = screen.getByTestId("sudoku-cell-0-0");

  expect(cell).toBeInTheDocument();
  // test if cell is selected
  expect(cell).toHaveClass("bg-yellow");

  // test if subgrid, row and column are highlighted
  let adjacentCell = screen.getByTestId("sudoku-cell-1-0");
  expect(adjacentCell).toHaveClass("bg-gray");
  adjacentCell = screen.getByTestId("sudoku-cell-0-8");
  expect(adjacentCell).toHaveClass("bg-gray");
  adjacentCell = screen.getByTestId("sudoku-cell-1-2");
  expect(adjacentCell).toHaveClass("bg-gray");
  adjacentCell = screen.getByTestId("sudoku-cell-5-0");
  expect(adjacentCell).toHaveClass("bg-gray");

  // cell in position 2, 3 is not selected
  cell = screen.getByTestId("sudoku-cell-2-3");
  expect(cell).not.toHaveClass("bg-yellow");

  // click cell in 2, 3 and test if it is selected
  act(() => {
    cell.click();
  });
  expect(cell).toHaveClass("bg-yellow");

  // test keyboard event
  act(() => {
    simulateKeyPress("7");
  });
  let value = cell.querySelector("p").textContent;
  expect(value).toEqual("7");

  // test input row
  const inputButton3 = screen.getByTestId("btn-input-3");
  act(() => {
    inputButton3.click();
  });
  value = cell.querySelector("p").textContent;
  expect(value).toEqual("3");

  // click notes
  act(() => {
    toggleNotesButton.click();
  });
  expect(toggleNotesButton).toHaveClass("bg-yellow");

  // test if notes are working
  act(() => {
    inputButton3.click();
    simulateKeyPress("4");
  });
  const note_3 = screen.getByTestId("sudoku-cell-2-3-notes-3");
  const note_4 = screen.getByTestId("sudoku-cell-2-3-notes-4");
  expect(note_3).toBeInTheDocument();
  expect(note_3).not.toHaveClass("invisible");
  expect(note_4).toBeInTheDocument();
  expect(note_4).not.toHaveClass("invisible");

  // turn off notes
  act(() => {
    simulateKeyPress("n");
  });

  // solve the puzzle
  puzzle.split("").forEach((val, index) => {
    if (val === ".") {
      const { column, row } = calculateCellCoordinatesFromIndex(index);
      const cellId = `sudoku-cell-${column}-${row}`;

      cell = screen.getByTestId(cellId);
      act(() => {
        cell.click();
      });
      act(() => {
        simulateKeyPress(solution.charAt(index));
      });
    }
  });

  // test if end game modal appears
  expect(endGameModal).not.toHaveClass("hidden");
});
