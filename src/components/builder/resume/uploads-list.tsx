"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import getFormattedTime from "../../../lib/utils";
import { resumeClient } from "../../../lib/client";

import { useRouter } from "next/navigation";

export function UploadsList(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [resumeUploadsData, setResumeUploadsData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      setIsPending(true);

      const { data, error }: any = await resumeClient.getUploadedResumes();

      if (error) {
        console.log("error", error);
        setIsPending(false);
        return;
      }

      if (data) setResumeUploadsData(data);
    }

    fetchMyAPI();
  }, []);

  async function deleteResume(resume_id = "") {
    setIsPending(true);
    const { data, error }: any = await resumeClient.deleteResume(resume_id);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      return;
    }

    if (data) {
      router.refresh();
    }

    setIsPending(false);
  }

  const saveJobApply = (e: any) => {
    const resume_id = e.currentTarget.getAttribute("data-id");

    let text = "Delete this Resume?";
    if (confirm(text) == true) {
      deleteResume(resume_id);
    }
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
      {resumeUploadsData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Uploaded At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumeUploadsData.map((row: any) => (
                <TableRow key={row.uuid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => setSelectedRow(row)}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.job_role}</TableCell>
                  <TableCell component="th" scope="row">
                    {getFormattedTime(row.created_at)}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" href={row.linkedin_url} disabled={true}>
                      View
                    </Button>
                    &nbsp;
                    <Button variant="outlined" size="small" color="error" data-id={row.uuid} onClick={saveJobApply} disabled={true}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={1}>
          <Typography align="center" variant="subtitle1" sx={{ p: 4, color: "#8b8b8b" }}>
            Fetching Resumes list...
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
