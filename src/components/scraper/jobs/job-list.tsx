"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import TableContainer from "@mui/material/TableContainer";
import DialogContentText from "@mui/material/DialogContentText";

import { scraperClient } from "../../../lib/client";
import { DataGrid, GridColDef, GridAutosizeOptions, GridValueGetter } from "@mui/x-data-grid";

import { useParams } from "next/navigation";
import { FullPageLoader } from "../../core/loaders";

export function JobList(): React.JSX.Element {
  const params = useParams();
  const { slog } = params;

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobsListData, setJobsListData] = React.useState<any>([]);
  const [appliedJobs, setAppliedJobs] = React.useState<string[]>([]);
  const [order, setOrder] = React.useState<string>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("index");
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      if (slog !== undefined) {
        setIsPending(true);
        const { data, error }: any = await scraperClient.getJobsFromLogs(slog);

        if (error) {
          console.log("error", error);
          setIsPending(false);
          return;
        }

        setIsPending(false);
        let updated_data: any = [];
        data.forEach((job: any, index: any) => {
          let temp = job;
          temp["index"] = index;
          updated_data.push(temp);
        });
        if (data) setJobsListData(updated_data);
      }
    }

    fetchMyAPI();
  }, [slog]);

  async function jobApply(job_id = "") {
    setIsPending(true);
    const { data, error }: any = await scraperClient.saveJobApply(slog, job_id);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      return;
    }

    if (data) {
      let updated_jobs_list = appliedJobs;
      updated_jobs_list.push(job_id);
      setAppliedJobs(updated_jobs_list);
      setIsPending(false);
    }

    setIsPending(false);
  }

  const saveJobApply = (e: any) => {
    const job_id = e.currentTarget.getAttribute("data-id");
    jobApply(job_id);
  };

  const handleSort = (orderBy: any, order: any) => {
    setOrder(order);
    setOrderBy(orderBy);
  };

  const ShowStatsModel = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(order: string, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const visibleRows = React.useMemo(() => stableSort(jobsListData, getComparator(order, orderBy)), [jobsListData, order, orderBy]);

  let rows: any = React.useMemo(() => {
    return jobsListData;
  }, [jobsListData]);

  function getRowId(row: any) {
    return row.job_id;
  }

  const getRawRowData: GridValueGetter<(typeof rows)[number], unknown> = (value, row) => {
    return row;
  };

  function renderCompanyInfoCol(params: any) {
    return (
      <>
        <b>{params.value?.company_name}</b>
        <br />
        <span>{params.value?.company_category}</span>
        <br />
        <span>{params.value?.company_emp_count} employees</span>
      </>
    );
  }

  function renderActionButtons(params: any) {
    return (
      <>
        <Button size="small" variant="outlined" sx={{ p: "7px", m: 0.5, lineHeight: "14px" }} target="_blank" href={params.value?.linkedin_url}>
          View
        </Button>
        {appliedJobs.indexOf(params.value?.job_id) >= 0 || params.value?.is_applied ? (
          <></>
        ) : (
          <Button size="small" variant="outlined" sx={{ p: "7px", m: 0.5, lineHeight: "14px", whiteSpace: "nowrap" }} data-id={params.value?.job_id} onClick={saveJobApply}>
            Apply
          </Button>
        )}
        <Button size="small" variant="outlined" sx={{ p: "7px", m: 0.5, lineHeight: "14px", whiteSpace: "nowrap" }} data-id={params.value?.job_id} onClick={() => ShowStatsModel(params.value)}>
          Stats
        </Button>
      </>
    );
  }

  function renderHRInfo(params: any) {
    return params.value?.hiring_manager_name ? (
      <>
        {params.value?.hiring_manager_name}
        <a href={params.value?.hiring_manager_url || "#"} style={{ lineHeight: "1px" }} target="_blank">
          <NorthEastIcon fontSize="small" />
        </a>
      </>
    ) : null;
  }

  const valuesCompare = (v1: any, v2: any) => {
    return v1.hiring_manager_name.localeCompare(v2.hiring_manager_name);
  };

  const columns: GridColDef[] = [
    {
      field: "info",
      headerName: "Company Info",
      valueGetter: getRawRowData,
      renderCell: renderCompanyInfoCol,
      minWidth: 170,
      flex: 1,
      resizable: false,
      sortable: false,
    },
    { field: "job_title", headerName: "Job Title", minWidth: 160, flex: 1, display: "flex", resizable: false },
    {
      field: "hr",
      headerName: "HR",
      valueGetter: getRawRowData,
      renderCell: renderHRInfo,
      minWidth: 125,
      flex: 1,
      display: "flex",
      resizable: false,
      sortComparator: valuesCompare,
      filterOperators: [
        {
          label: "Not Empty",
          value: "notEmpty",
          requiresFilterValue: false,
          getApplyFilterFn: (filterItem: any, column: GridColDef) => {
            return (row) => {
              return row.hiring_manager_name.length > 0;
            };
          },
        },
      ],
    },
    { field: "posted_date", headerName: "Posted Date", minWidth: 120, flex: 1, display: "flex", resizable: false },
    { field: "applicant_count", headerName: "Application Count", minWidth: 140, flex: 1, display: "flex", resizable: false },
    { field: "relevance_score", headerName: "Relevance Score", minWidth: 130, flex: 1, display: "flex", resizable: false },
    { field: "match_percent", headerName: "Match Percent", minWidth: 125, flex: 1, display: "flex", resizable: false },
    { field: "actions", headerName: "Actions", valueGetter: getRawRowData, renderCell: renderActionButtons, minWidth: 250, align: "center", sortable: false, resizable: false },
  ];

  const autosizeOptions: GridAutosizeOptions = {
    includeOutliers: true,
    includeHeaders: true,
    outliersFactor: 1,
    expand: true,
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        overflowY: "scroll",
        background: "white",
        p: 3,
        margin: "10px 10px 10px 10px",
        borderRadius: "30px",
      }}
    >
      <Box sx={{ width: "100%", height: "calc(100vh - 140px)" }}>
        <DataGrid rows={rows} columns={columns} getRowId={getRowId} getRowHeight={() => "auto"} autosizeOnMount={true} autosizeOptions={autosizeOptions} />
      </Box>
      <FullPageLoader isLoading={isPending}></FullPageLoader>
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Skills Match Stats</DialogTitle>
        <DialogContent>
          <DialogContentText>Matched Skills</DialogContentText>
          <Typography variant="body2" color="green">
            {selectedRow.matched_skills ? selectedRow.matched_skills.join(", ") : <>No Matching Records.</>}
          </Typography>
          <DialogContentText sx={{ mt: 3 }}>Unmatched Skills</DialogContentText>
          <Typography variant="body2" color="orange">
            {selectedRow.unmatched_skills ? selectedRow.unmatched_skills.join(", ") : <>No Matching Records.</>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
