"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

import getFormattedTime from "../../../lib/utils";
import { scraperClient } from "../../../lib/client";

import { useParams } from "next/navigation";
import { FullPageLoader } from "../../core/loaders";

export function JobList(): React.JSX.Element {
  const params = useParams();
  const { slog } = params;

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobsListData, setJobsListData] = React.useState([]);
  const [appliedJobs, setAppliedJobs] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function fetchMyAPI() {
      if (slog !== undefined) {
        setIsPending(true);
        const { data, error }: any = await scraperClient.getJobs(slog);

        if (error) {
          console.log("error", error);
          setIsPending(false);
          return;
        }

        setIsPending(false);
        if (data) setJobsListData(data);
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

  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        background: "white",
        p: 3,
        margin: "10px 10px 10px 10px",
        borderRadius: "30px",
      }}
    >
      {jobsListData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>Company Info</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Posted Date</TableCell>
                <TableCell>Application count</TableCell>
                <TableCell>Relevance score</TableCell>
                <TableCell>Match Percent</TableCell>
                <TableCell>Matched Skills</TableCell>
                <TableCell>Unmatched Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsListData.map((row: any) => (
                <TableRow key={row.job_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">
                    <Stack alignItems="center" spacing={1}>
                      <Button variant="contained" size="small" href={row.linkedin_url}>
                        View
                      </Button>
                      <Button variant="contained" size="small" data-id={row.job_id} onClick={saveJobApply} disabled={row.is_applied || appliedJobs.indexOf(row.job_id) >= 0}>
                        Applied
                      </Button>
                    </Stack>
                  </TableCell>
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
                  <TableCell>
                    <Typography variant="body2" color="green">
                      {row.matched_skills.join(", ")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="orange">
                      {row.unmatched_skills.join(", ")}
                    </Typography>
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
    </Box>
  );
}
