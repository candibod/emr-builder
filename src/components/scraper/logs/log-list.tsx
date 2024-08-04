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
import { scraperClient } from "../../../lib/client";

import { useRouter } from "next/navigation";
import { paths } from "../../../paths";

export function LogList(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobsListData, setJobsListData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});

  React.useEffect(() => {
    async function fetchMyAPI() {
      setIsPending(true);

      const { data, error }: any = await scraperClient.getLogs();

      if (error) {
        console.log("error", error);
        setIsPending(false);
        return;
      }

      if (data) setJobsListData(data);
    }

    fetchMyAPI();
  }, []);

  function showJobs(e: any) {
    const log_id = e.currentTarget.getAttribute("data-id");

    router.replace(paths.scraper.jobs + "/" + log_id);
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
                <TableCell>Scraped At</TableCell>
                <TableCell>Info</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsListData.map((row: any) => (
                <TableRow key={row.uuid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => setSelectedRow(row)}>
                  <TableCell component="th" scope="row">
                    {getFormattedTime(row.created_at)}
                  </TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" data-id={row.uuid} onClick={showJobs}>
                      Show Jobs
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
    </Box>
  );
}
