import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Answer from ".";
import path from "../../routes/path";

it("Answer page snapshot test", () => {
  expect(
    render(
      <MemoryRouter initialEntries={["/answer/1"]}>
        <Routes>
          <Route path={path.answer} element={<Answer />} />
        </Routes>
      </MemoryRouter>,
    ),
  ).toMatchSnapshot();
});
