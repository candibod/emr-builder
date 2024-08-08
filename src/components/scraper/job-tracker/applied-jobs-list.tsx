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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import getFormattedTime from "../../../lib/utils";
import { scraperClient } from "../../../lib/client";

import { useRouter } from "next/navigation";

export function AppliedJobsList(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobsListData, setJobsListData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState<any>({});
  const [selectedJobStatus, setSelectedJobStatus] = React.useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [openJobStatusModel, setOpenJobStatusModel] = React.useState(false);

  async function fetchMyAPI() {
    setIsPending(true);

    const { data, error }: any = await scraperClient.getAppliedJobs();

    if (error) {
      console.log("error", error);
      setIsPending(false);
      return;
    }

    if (data) setJobsListData(data);
  }

  React.useEffect(() => {
    fetchMyAPI();
  }, []);

  const ShowUpdateStatusModel = (row: any) => {
    setSelectedRow(row);
    setOpenJobStatusModel(true);
  };

  const ShowStatsModel = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenJobStatusModel(false);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedJobStatus(event.target.value);
  };

  async function updateJobStatus() {
    setIsPending(true);
    const { data, error }: any = await scraperClient.updateJobStatus(selectedRow.job_id, selectedJobStatus);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      window.alert(error);
      return;
    }

    if (data) {
      setIsPending(false);
      setOpenJobStatusModel(false);
      fetchMyAPI();
    }
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
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Job Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied At</TableCell>
                <TableCell>Rejected At</TableCell>
                <TableCell>Match Percent</TableCell>
                <TableCell>Applicants Count</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsListData.map((row: any, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell>{row.job_role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell component="th" scope="row">
                    {getFormattedTime(row.applied_at)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {getFormattedTime(row.rejected_at)}
                  </TableCell>
                  <TableCell>{row.info?.match_percent}</TableCell>
                  <TableCell>{row.info?.app_count}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" data-id={row.job_id} onClick={() => ShowUpdateStatusModel(row)}>
                      Update Status
                    </Button>
                    &nbsp;
                    <Button variant="contained" size="small" data-id={index} onClick={() => ShowStatsModel(row)}>
                      Skills Stats
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
            Fetching logs list...
          </Typography>
        </Stack>
      )}
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Skills Match Stats</DialogTitle>
        <DialogContent>
          <DialogContentText>Matched Skills</DialogContentText>
          <Typography variant="body2" color="green">
            {selectedRow.info?.matched_skills ? selectedRow.info?.matched_skills.join(", ") : <>No Matching Records.</>}
          </Typography>
          <DialogContentText sx={{ mt: 3 }}>Unmatched Skills</DialogContentText>
          <Typography variant="body2" color="orange">
            {selectedRow.info?.unmatched_skills ? selectedRow.info?.unmatched_skills.join(", ") : <>No Matching Records.</>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth={true} maxWidth="md" open={openJobStatusModel} onClose={handleClose}>
        <DialogTitle>Job Status</DialogTitle>
        <DialogContent>
          <DialogContentText>select and option below to update the status of the selected job</DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
              pt: 3,
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select autoFocus value={selectedJobStatus} label="Status" autoWidth onChange={handleStatusChange}>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateJobStatus}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
