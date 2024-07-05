"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import getFormattedTime from "../../../lib/utils";
import { scraperClient } from "../../../lib/client";

import { useRouter } from "next/navigation";
import { paths } from "../../../paths";

export function JobList(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobsListData, setJobsListData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      setIsPending(true);

      const { data, error } = await scraperClient.getJobs();

      if (error) {
        console.log("error", error);
        setIsPending(false);
        return;
      }

      if (data) setJobsListData(data);
    }

    fetchMyAPI();
  }, []);

  function editResumeReview(e) {
    const review_id = e.currentTarget.getAttribute("data-id");

    router.replace(paths.builder.resumeReview + review_id);
  }

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
                <TableCell align="right">Job Title</TableCell>
                <TableCell align="right">Posted Date</TableCell>
                <TableCell align="right">Application count</TableCell>
                <TableCell align="right">Relevance score</TableCell>
                <TableCell align="right">Match Percent</TableCell>
                <TableCell align="right">Matched Skills</TableCell>
                <TableCell align="right">Unmatched Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsListData.map((row) => (
                <TableRow key={row.job_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => setSelectedRow(row)}>
                  <TableCell align="right">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton aria-label="delete" size="small" data-id={row.review_id} onClick={editResumeReview}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <a href={row.linkedin_url}>
                      {row.company_name} - {row.company_category}
                    </a>
                    {row.job_id} - {row.company_emp_count} employees
                  </TableCell>
                  <TableCell>{row.job_title}</TableCell>
                  <TableCell>{row.posted_date}</TableCell>
                  <TableCell>{row.applicant_count}</TableCell>
                  <TableCell>{row.relevance_score}</TableCell>
                  <TableCell>{row.match_percent}</TableCell>
                  <TableCell>{row.matched_skills}</TableCell>
                  <TableCell>{row.unmatched_skills}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={1}>
          <Typography align="center" variant="subtitle1" sx={{ p: 4, color: "#8b8b8b" }}>
            Create a new job to start reviewing your resume
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
