// eslint-disable-file testing-library/await-async-query
import React, { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { create } from "react-test-renderer";

import Layout from ".";
import path from "../../routes/path";

const render = (element: ReactElement) => (
  <MemoryRouter initialEntries={[path.root]}>
    <Routes>
      <Route path={path.root} element={element} />
    </Routes>
  </MemoryRouter>
);

describe("Test Layout on variable media point view port:", () => {
  const mockWindowInnerWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
  };

  it("should on mobile view port", async () => {
    mockWindowInnerWidth(420);

    const renderer = create(render(<Layout />));

    await renderer.root.findByProps({ className: "layout" });
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("should on PC view port", async () => {
    mockWindowInnerWidth(1680);

    const renderer = create(render(<Layout />));

    await renderer.root.findByProps({ className: "layout m" });
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

describe("Test Layout pass in classname", () => {
  it("Should have the default classname when no variables are passed in", async () => {
    const renderer = create(render(<Layout />));

    await renderer.root.findByProps({ className: "layout m" });
  });

  it("Should receive classname when the variables are passed in", async () => {
    const classes = "appLayout";

    const renderer = create(render(<Layout className={classes} />));

    await renderer.root.findByProps({ className: `layout m ${classes}` });
  });
});
