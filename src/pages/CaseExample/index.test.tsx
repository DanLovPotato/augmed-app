import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CaseExample, { TreeNode } from "./index";
import styles from "./index.module.scss";

describe("Case review page elements test", () => {
  test("render basic display of section and card", () => {
    const list = [
      {
        key: "BACKGROUND",
        values: [
          {
            key: "Patient Demographics",
            values: "text",
          },
        ],
      },
    ] as TreeNode[];

    render(<CaseExample list={list} />);

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
    const list = [
      {
        key: "BACKGROUND",
        values: [
          {
            key: "Patient Demographics",
          },
        ],
      },
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("none");
    expect(card).toContainElement(content);
  });

  test("only show key when the value is undefined and key inner card", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("nothing");
    expect(card).toContainElement(content);
  });

  test("show text when the value of card key is a string", () => {
    const list = [
      {
        key: "BACKGROUND",
        values: [
          {
            key: "Patient Demographics",
            values: "text",
          },
        ],
      },
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const content = screen.getByText("text");
    expect(card).toContainElement(content);
  });

  test("show value with colon when the value is a string and key inner card", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const keyContent = screen.getByText("key");
    const valueContent = screen.getByText(": value");
    expect(card).toContainElement(keyContent);
    expect(card).toContainElement(valueContent);
  });

  test("show a ul list when the value is list string", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toBeInTheDocument();
    const ulContent = screen.getByRole("list");
    const liContent = screen.getByRole("listitem");
    expect(card).toContainElement(ulContent);
    expect(liContent).toContainHTML("value");
  });

  test("show nested node when value is list object", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const firstNode = screen.getByTestId("key");
    expect(firstNode).toBeInTheDocument();
    const nestedNode = screen.getByTestId("nestedKey");
    expect(firstNode).toContainElement(nestedNode);
  });

  test("show different theme when multi sections", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

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
});

describe("Display configuration test", () => {
  test("collapse card by configure collapse of key", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    expect(screen.queryByText("text")).not.toBeInTheDocument();
    const keyboardArrowDownIcon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(keyboardArrowDownIcon).toBeInTheDocument();
  });

  test("should expand card when click on expand button when configure collapse of key", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);
    const expandButton = screen.getByLabelText("expand");
    fireEvent.click(expandButton);

    expect(screen.getByText("text")).toBeInTheDocument();
    expect(screen.queryByTestId("KeyboardArrowDownIcon")).not.toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowUpIcon")).toBeInTheDocument();
  });

  test("drop shadow card when configure highlight of card key", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const card = screen.getByTestId("Patient Demographics");
    expect(card).toHaveClass(styles.highlight);
  });

  test("highlight content when configure highlight of key", () => {
    const list = [
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
    ] as TreeNode[];

    render(<CaseExample list={list} />);

    const content = screen.getByTestId("key");
    expect(content).toHaveClass(styles.highlightContent);
  });
});
