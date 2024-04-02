import React from "react";
import styles from "./index.module.scss";
import { useMount, useRequest } from "ahooks";
import CaseCard from "../../components/CaseCard";
import { getCaseList } from "../../services/caseService";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ICase } from "../../types/case";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

const useGetCaseList = () => {
  const { loading, runAsync, data } = useRequest(getCaseList, {
    manual: true,
  });
  return { loading, getCaseList: runAsync, cases: data?.data };
};

const ExampleHomePage = () => {
  const { getCaseList, loading } = useGetCaseList();
  const [dataSource, setDataSource] = React.useState<ICase[] | null>(null);

  useMount(() => {
    getList();
  });

  const getList = () => {
    getCaseList()
      .then((response) => {
        const newData = response?.data || [];
        setDataSource(newData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.app}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Pending Cases</span>
      </div>
      {loading && dataSource === null ? (
        <Box className={`${styles.loading} ${styles.centered}`}>
          <CircularProgress />
        </Box>
      ) : !loading && dataSource?.length === 0 ? (
        <div className={styles.empty}>
          <AssignmentLateIcon className={styles.icon} />
          <span>
            There is no available tasks for you now. <a href="mailto:dhep.lab@gmail.com">dhep.lab@gmail.com</a> to get
            new tasks. Or try to refresh the page.
          </span>
        </div>
      ) : (
        <div className={styles.pendingCasesContainer}>
          {dataSource?.map((item) => <CaseCard key={item.id} patientCase={item} />)}
        </div>
      )}
    </div>
  );
};

export default ExampleHomePage;
