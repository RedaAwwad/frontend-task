import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders correctly with placeholder", () => {
    render(<Input placeholder="Enter username" />);
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("renders label and associates it with the input", () => {
    render(<Input label="Password Field" />);
    // The accessible name of the input should be its label text
    expect(screen.getByLabelText("Password Field")).toBeInTheDocument();
  });

  it("displays error message below the input", () => {
    render(<Input error="This field is required" placeholder="Email" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("forwards ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
