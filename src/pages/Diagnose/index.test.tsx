import React from "react";
import { render } from "@testing-library/react";

import Diagnose from ".";

it("Diagnose page snapshot test", () => {
  expect(render(<Diagnose />)).toMatchSnapshot();
});
