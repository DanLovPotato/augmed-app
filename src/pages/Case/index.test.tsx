import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CasePage, { TreeNode } from "./index";
import styles from "./index.module.scss";
import homeStyles from "../Home/index.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { useRequest } from "ahooks";

jest.mock("ahooks", () => ({
  ...jest.requireActual("ahooks"),
  useRequest: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Case review page elements test", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ caseId: "1" });
    (useLocation as jest.Mock).mockReturnValue({ config: "1" });
  });

  test("render basic display of section and card", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: "text",
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const header = screen.getByText("Case Review");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(styles.header);

    const section = screen.getByTestId("BACKGROUND");
    const title = screen.getByText("BACKGROUND");
    expect(section).toBeInTheDocument();
    expect(title).toHaveClass(styles.title);
    expect(section).toContainElement(title);

    const card = screen.getByTestId("Patient Demographics");
    const subTitle = screen.getByText("Patient Demographics");
    expect(subTitle).toHaveClass(styles.subTitle);
    expect(card).toHaveClass(styles.card);
    expect(card).toContainElement(subTitle);
    expect(section).toContainElement(card);

    const content = screen.getByText("text");
    expect(card).toContainElement(content);
  });

  test("show none when the value of card key is undefined", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("none");
    expect(card).toContainElement(content);
  });

  test("only show key when the value is undefined and key inner card", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "nothing",
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("nothing");
    expect(card).toContainElement(content);
  });

  test("show text when the value of card key is a string", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: "text",
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("text");
    expect(card).toContainElement(content);
  });

  test("show value with colon when the value is a string and key inner card", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "key",
                      values: "value",
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const keyContent = screen.getByText("key");
    const valueContent = screen.getByText(": value");
    expect(card).toContainElement(keyContent);
    expect(card).toContainElement(valueContent);
  });

  test("show a ul list when the value is list string", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "key",
                      values: ["value"],
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const ulContent = screen.getByRole("list");
    const liContent = screen.getByRole("listitem");
    expect(card).toContainElement(ulContent);
    expect(liContent).toContainHTML("value");
  });

  test("show nested node when value is list object", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "key",
                      values: [
                        {
                          key: "nestedKey",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const firstNode = screen.getByTestId("key");
    expect(firstNode).toBeInTheDocument();
    const nestedNode = screen.getByTestId("nestedKey");
    expect(firstNode).toContainElement(nestedNode);
  });

  test("show different theme when multi sections", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "Section1",
              values: [
                {
                  key: "Patient Demographics",
                  values: "Normal",
                },
              ],
            },
            {
              key: "Section2",
              values: [
                {
                  key: "Medical history",
                  values: "Normal",
                },
              ],
            },
            {
              key: "Section3",
              values: [
                {
                  key: "Family history",
                  values: "Normal",
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const section1 = screen.getByTestId("Section1");
    const section2 = screen.getByTestId("Section2");
    const section3 = screen.getByTestId("Section3");
    expect(section1).toHaveStyle({
      "--title-background": "#B1C7D1",
      "--sub-title-color": "#B1C7D1",
      "--card-background": "#EFF6F6",
    });
    expect(section2).toHaveStyle({
      "--title-background": "#91C4A3",
      "--sub-title-color": "#91C4A3",
      "--card-background": "#EDF8F1",
    });
    expect(section3).toHaveStyle({
      "--title-background": "#98D3CF",
      "--sub-title-color": "#98D3CF",
      "--card-background": "#E6F6F6",
    });
  });

  test("render error when api failed", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      error: {
        code: "001",
      },
    });

    render(<CasePage />);

    const errorContent = screen.getByText("There is an unexpected error. Please check your internet and try again.");
    expect(errorContent).toBeInTheDocument();
    expect(errorContent).toHaveClass(homeStyles.emptyText);
  });
});

describe("Display configuration test", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ caseId: "1" });
    (useLocation as jest.Mock).mockReturnValue({ config: "1" });
  });

  test("collapse card by configure collapse of key", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: "text",
                  style: {
                    collapse: true,
                  },
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    expect(screen.queryByText("text")).not.toBeInTheDocument();
    const keyboardArrowDownIcon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(keyboardArrowDownIcon).toBeInTheDocument();
  });

  test("should expand card when click on expand button when configure collapse of key", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: "text",
                  style: {
                    collapse: true,
                  },
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);
    const expandButton = screen.getByLabelText("expand");
    fireEvent.click(expandButton);

    expect(screen.getByText("text")).toBeInTheDocument();
    expect(screen.queryByTestId("KeyboardArrowDownIcon")).not.toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowUpIcon")).toBeInTheDocument();
  });

  test("Highlight card when configure highlight of card key", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: "text",
                  style: {
                    highlight: true,
                  },
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toHaveClass(styles.highlightContent);
  });

  test("highlight content when configure highlight of key", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "key",
                      style: {
                        highlight: true,
                      },
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    const content = screen.getByTestId("key");
    expect(content).toHaveClass(styles.highlightContent);
  });

  test("collapse nested content by configure collapse of field", () => {
    (useRequest as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        data: {
          status: 200,
          data: [
            {
              key: "BACKGROUND",
              values: [
                {
                  key: "Patient Demographics",
                  values: [
                    {
                      key: "Age",
                      values: "32",
                      style: {
                        collapse: true,
                      },
                    },
                  ],
                },
              ],
            },
          ] as TreeNode[],
        },
      },
    });

    render(<CasePage />);

    expect(screen.queryByText("32")).not.toBeInTheDocument();
    const keyboardArrowDownIcon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(keyboardArrowDownIcon).toBeInTheDocument();
  });
});
