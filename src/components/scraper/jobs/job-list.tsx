"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import DialogContentText from "@mui/material/DialogContentText";

import { scraperClient } from "../../../lib/client";

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
      {visibleRows.length > 0 ? (
        <TableContainer sx={{ maxHeight: "calc(100vh - 140px)" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Info</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell onClick={() => handleSort("posted_date", "desc")}>Posted Date</TableCell>
                <TableCell onClick={() => handleSort("applicant_count", "desc")}>Application count</TableCell>
                <TableCell>Relevance score</TableCell>
                <TableCell onClick={() => handleSort("match_percent", "desc")}>Match Percent</TableCell>
                <TableCell align="center" onClick={() => handleSort("index", "asc")}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row: any) => (
                <TableRow key={row.job_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <b>{row.company_name}</b>
                    <br />
                    {row.company_category}
                    <br />
                    {row.company_emp_count} employees
                  </TableCell>
                  <TableCell>{row.job_title}</TableCell>
                  <TableCell>{row.posted_date}</TableCell>
                  <TableCell>{row.applicant_count}</TableCell>
                  <TableCell>{row.relevance_score}</TableCell>
                  <TableCell>{row.match_percent}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup size="small" aria-label="Small button group">
                      <Button target="_blank" href={row.linkedin_url}>
                        View
                      </Button>
                      {appliedJobs.indexOf(row.job_id) >= 0 || row.is_applied ? (
                        <></>
                      ) : (
                        <Button data-id={row.job_id} sx={{ whiteSpace: "nowrap" }} onClick={saveJobApply}>
                          Mark Applied
                        </Button>
                      )}
                      <Button data-id={row.job_id} sx={{ whiteSpace: "nowrap" }} onClick={() => ShowStatsModel(row)}>
                        Skills Stats
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={1}>
          <Typography align="center" variant="subtitle1" sx={{ p: 4, color: "#8b8b8b" }}>
            Fetching Jobs...
          </Typography>
        </Stack>
      )}
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
