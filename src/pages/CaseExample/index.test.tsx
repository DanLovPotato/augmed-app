import React from "react";
import { render } from "@testing-library/react";
import CaseExample from "./index";
import { caseExample } from "./case-example";

it("AppLayout match snapshot test", () => {
  expect(render(<CaseExample list={caseExample} />)).toMatchSnapshot();
});
