import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug();

    expect(screen.getByText("Destinasjon Norge")).toBeInTheDocument();
  });
});
