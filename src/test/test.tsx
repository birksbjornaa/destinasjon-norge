import { render, fireEvent } from "@testing-library/react";
import Form, { FormProps } from "../components/Form";

// Define mock props for testing
const mockProps: FormProps = {
  goToDestination: jest.fn(), // Mock function for goToDestination prop
};

test("Form should render", () => {
  const { getByText } = render(<Form {...mockProps} />);
});
