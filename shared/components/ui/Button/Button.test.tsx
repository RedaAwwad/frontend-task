import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("handles click events", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("shows loader when isLoading is true and disables button", () => {
    const { container } = render(<Button isLoading>Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    // Check if the svg loader exists inside the button
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
