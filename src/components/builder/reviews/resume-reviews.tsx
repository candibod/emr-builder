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
import { resumeClient } from "../../../lib/client";

import { useRouter } from "next/navigation";
import { paths } from "../../../paths";

export function ResumeReviews(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [resumeReviewsData, setResumeReviewsData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      setIsPending(true);

      const { data, error }: any = await resumeClient.getResumeReviews();

      if (error) {
        console.log("error", error);
        alert(error);
        setIsPending(false);
        return;
      }

      if (data) setResumeReviewsData(data);
    }

    fetchMyAPI();
  }, []);

  function editResumeReview(e: any) {
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
      {resumeReviewsData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Details</TableCell>
                <TableCell align="right">Job Role</TableCell>
                <TableCell align="right">Match Percentage</TableCell>
                <TableCell align="right">Resume Name</TableCell>
                <TableCell align="right">Updated At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumeReviewsData.map((row: any) => (
                <TableRow key={row.review_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => setSelectedRow(row)}>
                  <TableCell component="th" scope="row">
                    <a href={row.job_url}>{row.company_name}</a>
                  </TableCell>
                  <TableCell align="right">{row.job_role}</TableCell>
                  <TableCell align="right">{row.match_percentage}</TableCell>
                  <TableCell align="right">{row.resume_name}</TableCell>
                  <TableCell align="right">{getFormattedTime(row.updated_at)}</TableCell>
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
