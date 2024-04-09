import React from "react";
import { render } from "@testing-library/react";
import CaseExample from "./index";

it("AppLayout match snapshot test", () => {
  expect(render(<CaseExample />)).toMatchSnapshot();
});
