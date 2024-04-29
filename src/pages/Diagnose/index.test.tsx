import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Diagnose from ".";
import path from "../../routes/path";

it("Diagnose page snapshot test", () => {
  expect(
    render(
      <MemoryRouter initialEntries={["/diagnose/1"]}>
        <Routes>
          <Route path={path.diagnose} element={<Diagnose />} />
        </Routes>
      </MemoryRouter>,
    ),
  ).toMatchSnapshot();
});
