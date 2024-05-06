import React, { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import AppLayout from ".";
import path from "../../routes/path";
import { create } from "react-test-renderer";

const render = (element: ReactElement) => (
  <MemoryRouter initialEntries={[path.root]}>
    <Routes>
      <Route path={path.root} element={element} />
    </Routes>
  </MemoryRouter>
);

it("AppLayout match snapshot test", () => {
  expect(create(render(<AppLayout />)).toJSON()).toMatchSnapshot();
});
