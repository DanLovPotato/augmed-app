import React, { useState } from "react";
import styles from "./index.module.scss";
import { Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import classnames from "classnames";

export interface TreeNode {
  key: string;
  values?: string[] | TreeNode[] | string;
  style?: {
    collapse?: boolean;
    highlight?: boolean;
  };
}

function isAllString(values: (string | TreeNode)[]) {
  return values.every((item) => typeof item == "string");
}

const NestedContent = ({ data, level }: { data: TreeNode; level: number }) => {
  if (!data.values) {
    return <span>{level === 2 && "none"}</span>;
  }
  if (typeof data.values === "string") {
    return <span>{level === 2 ? data.values : " : " + data.values}</span>;
  }
  if (isAllString(data.values)) {
    return (
      <ul>
        {(data.values as string[]).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    );
  }
  return (
    <>
      {(data.values as TreeNode[]).map((item, index) => {
        const highlight = item.style?.highlight || false;
        return (
          // <div key={index} className={highlight ? styles.highlight: ''}>
          <div key={index} style={{ background: highlight ? "yellow" : "" }}>
            <span>{item.key}</span>
            <NestedContent data={item} level={level + 1} />
          </div>
        );
      })}
    </>
  );
};

const theme = {
  blue: {
    "--title-background": "#91C4A3",
    "--sub-title-color": "#91C4A3",
    "--card-background": "#EDF8F1",
  },
  green: {
    "--title-background": "#98D3CF",
    "--sub-title-color": "#98D3CF",
    "--card-background": "#E6F6F6",
  },
  default: {
    "--title-background": "#B1C7D1",
    "--sub-title-color": "#B1C7D1",
    "--card-background": "#EFF6F6",
  },
};

function getColorStyle(index: number) {
  if (index % 3 === 1) {
    return theme.blue;
  }
  if (index % 3 === 2) {
    return theme.green;
  }
  return theme.default;
}

const Card = ({ data, index }: { data: TreeNode; index: number }) => {
  const [open, setOpen] = useState(!data.style?.collapse);
  const highlight = data.style?.highlight || false;
  return (
    <div
      className={classnames(styles.card, { [styles.highlight]: highlight })}
      style={{ top: index === 0 ? "-1rem" : "", marginBottom: index === 0 ? 0 : "" }}
    >
      <div className={`${styles.subTitle}`}>
        {data.key}
        <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <div className={styles.content}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <NestedContent data={data} level={2} />
        </Collapse>
      </div>
    </div>
  );
};

const Section = ({ data, index }: { data: TreeNode; index: number }) => {
  const style = getColorStyle(index) as React.CSSProperties;
  return (
    <div style={style}>
      <div className={`${styles.title}`}>{data.key}</div>
      {(data.values as TreeNode[]).map((item, index) => (
        <Card data={item} key={index} index={index}></Card>
      ))}
    </div>
  );
};

const CasePage = ({ list }: { list: TreeNode[] }) => {
  return (
    <div className={styles.app}>
      {(list as TreeNode[]).map((item, index) => (
        <Section data={item} key={index} index={index}></Section>
      ))}
    </div>
  );
};

export default CasePage;
