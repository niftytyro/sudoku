import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Body from "../components/Body";
import { act } from "react-dom/test-utils";

test("open rules modal", () => {
  render(<Body grid={"2".repeat(81)} />);

  const rulesModalLink = screen.getByTestId("rules-link");
  const rulesModal = screen.getByTestId("modal-rules");

  expect(rulesModal).toBeInTheDocument();
  expect(rulesModal).toHaveClass("hidden");

  act(() => {
    rulesModalLink.click();
  });

  expect(rulesModal).not.toHaveClass("hidden");
});
