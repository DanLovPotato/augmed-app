import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import CaseCard from "../../components/CaseCard";
import { getCaseList } from "../../services/caseService";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ErrorTwoTone, UpcomingTwoTone } from "@mui/icons-material";

const useGetCaseList = () => {
  const { loading, runAsync, data } = useRequest(getCaseList, {
    manual: false,
  });
  return { loading, getCaseList: runAsync, cases: data?.data };
};

const HomePage = () => {
  const { loading, cases } = useGetCaseList();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Pending Cases</span>
      </div>
      {loading ? (
        <Box className={styles.centered}>
          <CircularProgress />
        </Box>
      ) : cases?.length === 0 ? (
        <div className={styles.empty}>
          <UpcomingTwoTone className={styles.icon} />
          <span className={styles.emptyText}>
            There is no available task for you now. Please contact{" "}
            <a href="mailto:dhep.lab@gmail.com">dhep.lab@gmail.com</a> to get new tasks. Or try to refresh the page.
          </span>
        </div>
      ) : cases === undefined ? (
        <div className={styles.empty}>
          <ErrorTwoTone className={styles.icon} />
          <span className={styles.emptyText}>
            There is an unexpected error. Please check your internet and try again.
          </span>
        </div>
      ) : (
        <div className={styles.pendingCasesContainer}>
          {cases?.map((item) => <CaseCard className={"caseCard"} key={item.id} patientCase={item} />)}
        </div>
      )}
    </div>
  );
};

export default HomePage;
