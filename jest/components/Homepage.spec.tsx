import { render, screen } from "@testing-library/react";
import Homepage from "../../src/components/views/Home";

describe("Homepage", () => {
  it("should render p tag", () => {
    render(<Homepage/>);

    const text = screen.getByText(
      /Learn about Next.js in an interactive course with quizzes!/i
    );

    expect(text).toBeInTheDocument();
  });
});
