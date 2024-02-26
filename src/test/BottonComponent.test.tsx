//import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("ButtonComponent", () => {
  test("renders a button", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
