import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Test loading component", () => {
  const Test = <div data-testid="content">test</div>;

  it("should render loading when loading is ture", () => {
    render(<Loading loading={true}>{Test}</Loading>);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).toBe(null);
  });

  it("should render children content when loading is false", () => {
    render(<Loading loading={false}>{Test}</Loading>);

    expect(screen.queryByTestId("loading")).toBe(null);
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
