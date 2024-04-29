import React, { useState } from "react";
import styles from "./index.module.scss";
import { Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import classnames from "classnames";
import qs from "qs";
import { useRequest } from "ahooks";
import { getCaseDetail } from "../../services/caseService";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

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
        return <NestedSection data={item} key={index} level={level + 1}></NestedSection>;
      })}
    </>
  );
};

const NestedSection = ({ data, level }: { data: TreeNode; level: number }) => {
  const [open, setOpen] = useState(!data.style?.collapse);
  const highlight = data.style?.highlight || false;
  const inlineStyle = (
    typeof data.values === "string" ? { display: "inline-block" } : undefined
  ) as React.CSSProperties;
  return (
    <div className={classnames({ [styles.highlightContent]: highlight })} data-testid={data.key}>
      <span>{data.key}</span>
      {data.style?.collapse && (
        <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
      <Collapse in={open} timeout="auto" unmountOnExit style={inlineStyle}>
        <NestedContent data={data} level={level} />
      </Collapse>
    </div>
  );
};

const theme = {
  green: {
    "--title-background": "#91C4A3",
    "--sub-title-color": "#91C4A3",
    "--card-background": "#EDF8F1",
  },
  blue: {
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
    return theme.green;
  }
  if (index % 3 === 2) {
    return theme.blue;
  }
  return theme.default;
}

const Card = ({ data, index }: { data: TreeNode; index: number }) => {
  const [open, setOpen] = useState(!data.style?.collapse);
  const highlight = data.style?.highlight || false;
  return (
    <div
      data-testid={data.key}
      className={classnames(styles.card, { [styles.highlightContent]: highlight })}
      style={{ top: index === 0 ? "-1rem" : "", marginBottom: index === 0 ? 0 : "" }}
    >
      <div className={classnames(styles.subTitle, { [styles.subTitleHighlight]: highlight })}>
        {data.key}
        {data.style?.collapse && (
          <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        )}
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
    <div style={style} data-testid={data.key}>
      <div className={`${styles.title}`}>{data.key}</div>
      {(data.values as TreeNode[]).map((item, index) => (
        <Card data={item} key={index} index={index}></Card>
      ))}
    </div>
  );
};

const useGetCaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { search } = useLocation();
  const configId = qs.parse(search, { ignoreQueryPrefix: true }).config as string;
  if (!caseId) {
    throw new Error("caseId not in path");
  }
  const { loading, data } = useRequest(() => getCaseDetail(caseId, configId));
  return { loading, response: data?.data };
};

const CasePage = () => {
  const { loading, response } = useGetCaseDetail();
  const data: TreeNode[] = response?.data || [];
  return (
    <Loading loading={loading}>
      <div className={styles.app}>
        {data.map((item, index) => (
          <Section data={item} key={index} index={index}></Section>
        ))}
      </div>
    </Loading>
  );
};

export default CasePage;
