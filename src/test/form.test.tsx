import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../components/Form";
import { expect } from "vitest";

/*
 * This test requires internet connection to work. It will try to connect to the firebase database.
 */

describe("Form render correct", () => {
  it("Rendered", () => {
    render(<Form goToDestination={() => {}} />);
    expect(screen.getByText("Destinasjons Navn:")).toBeInTheDocument();
    expect(screen.getByText("YrID:")).toBeInTheDocument();
    expect(screen.getByText("BILDE URL:")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toHaveTextContent("");
    expect(screen.getByTestId("input-description")).toHaveTextContent("");
  });
});

describe("Error messages check forname input", () => {
  it("Name should have minimum 2 char", () => {
    render(<Form goToDestination={() => {}} />);
    const submitButton = screen.getByTestId("submit-button");

    changeInput("input-name", "h");
    fireEvent.click(submitButton);
    expect(screen.getByTestId("error-message-text")).toHaveTextContent(
      "Navn er for kort, minimum 2 tegn"
    );
    changeInput("input-name", "tromso");
    fireEvent.click(submitButton);
    expect(screen.getByTestId("error-message-text")).not.toHaveTextContent(
      "Navn er for kort, minimum 2 tegn"
    );
  });
});

describe("Create a valid destination", () => {
  const changeInput = (testId: string, value: string | number) => {
    fireEvent.change(screen.getByTestId(testId), { target: { value } });
  };
  it("Should show no error message", () => {
    render(<Form goToDestination={() => {}} />);
    const submitButton = screen.getByTestId("submit-button");

    changeInput("input-name", "Test name");
    changeInput("input-region", "Test region");
    changeInput("input-price", 5);
    changeInput("input-yrId", "1-55ddd");
    changeInput("input-picture-url", "test-url");
    changeInput("input-description", "Tromsø, dette er TEST");

    fireEvent.click(submitButton);
    expect(screen.getByTestId("error-message-text")).toHaveTextContent("");
  });
});

const changeInput = (testId: string, value: string | number) => {
  fireEvent.change(screen.getByTestId(testId), { target: { value } });
};
