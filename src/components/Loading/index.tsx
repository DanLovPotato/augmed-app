import React from "react";
import { Box, CircularProgress } from "@mui/material";

import styles from "./index.module.scss";
import testId from "../../utils/testId";

const Loading = (props: React.PropsWithChildren<{ loading?: boolean }>) => {
  const { loading, children } = props;

  if (loading) {
    return (
      <Box className={styles.centered} {...testId("loading")}>
        <CircularProgress />
      </Box>
    );
  }
  return <>{children}</>;
};

export default Loading;
