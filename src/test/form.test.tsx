import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/Form";

describe("Create destination form test", () => {
  it("Should have filed names", () => {
    render(<Form goToDestination={() => {}} />);
    expect(screen.getByText("YrID:")).toBeInTheDocument();
    expect(screen.getByText("BILDE URL:")).toBeInTheDocument();
  });
});

describe("Create a destination and store it", () => {
  it("Create destination", () => {
    render(<Form goToDestination={() => {}} />);
    const name = screen.getByTestId("input-name");
    fireEvent.change(name, { target: { value: "Tromsø" } });
    screen.debug();
  });
});
