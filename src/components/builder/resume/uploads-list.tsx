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
import Grid from "@mui/material/Unstable_Grid2";

import getFormattedTime from "../../../lib/utils";
import { resumeClient } from "../../../lib/client";

import { useRouter } from "next/navigation";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function UploadsList(): React.JSX.Element {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [resumeUploadsData, setResumeUploadsData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [resume, setResumeData] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);

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

  async function fetchResume(resume_id = "") {
    setIsPending(true);
    const { data, error }: any = await resumeClient.fetchResume(resume_id);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      return;
    }

    if (data) {
      setIsPending(false);
      setResumeData(data["formatted_data"]);
      setOpen(true);
    }
  }

  const saveJobApply = (e: any) => {
    const resume_id = e.currentTarget.getAttribute("data-id");

    let text = "Delete this Resume?";
    if (confirm(text) == true) {
      deleteResume(resume_id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function get_split_element_in_string(element: string, index: number): string {
    return element.split(",")[index];
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
                    <Button variant="contained" size="small" onClick={() => fetchResume(row.uuid)}>
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
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent>
          {Object.keys(resume).length > 0 && (
            <Box sx={{ margin: "5px 0", padding: "0 8px 0 8px" }}>
              <Box>
                <Box>
                  <Typography align="center" variant="h6" component="div" sx={{ mt: 2, fontSize: "1.2rem" }}>
                    <b>{resume.name}</b>
                  </Typography>
                  <Typography align="center" variant="body1" component="div" sx={{ fontSize: "0.8rem" }}>
                    <span>Fairfax, VA | </span>
                    <span>{resume.mobile_number} | </span>
                    <a href="mailto:{resume.email}">{resume.email}</a>
                    <span> | </span>
                    <a target="_blank" href="{ resume.url }">
                      {resume.url}
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box>
                  <b>Education</b>
                </Box>
                {resume.education &&
                  resume.education.map((education: any, index: number) => (
                    <Box key={"education" + index}>
                      <Grid container justifyContent="space-between" direction="row">
                        <Box>
                          <span>{get_split_element_in_string(education.name, 0)}, </span>
                          <b>{get_split_element_in_string(education.name, 1)}, </b>
                          <b>{get_split_element_in_string(education.name, 2)}</b>
                        </Box>
                        <Box>{education.timeline}</Box>
                      </Grid>
                    </Box>
                  ))}
              </Box>
              <hr></hr>
              <Box>
                <Box>
                  <b>Skills</b>
                </Box>
                <ul>
                  {resume.skills.map((skills: any, index: number) => (
                    <li key={"skills" + index}>
                      <b>{skills.category}</b>:&nbsp;<span>{skills.skills.join(", ")}</span>
                    </li>
                  ))}
                </ul>
              </Box>
              <hr></hr>
              <Box>
                <Box>
                  <Box sx={{ mb: 1, mt: 1 }}>
                    <b>Experience</b>
                  </Box>
                  <Box>
                    {resume.experience &&
                      resume.experience.map((experience: any, exp_index: any) => (
                        <Box key={"exp_bullets" + exp_index}>
                          <Box>
                            <Grid container justifyContent="space-between" direction="row">
                              <Box>
                                <b>{get_split_element_in_string(experience.name, 0)}, </b>
                                <b>{get_split_element_in_string(experience.name, 1)},</b>
                                <span>{get_split_element_in_string(experience.name, 2)}</span>
                              </Box>
                              <Box>{experience.timeline}</Box>
                            </Grid>
                          </Box>
                          <Box className="resume-bullets" sx={{ textAlign: "justify" }}>
                            {experience.bullets.map((bullet: any, index: any) => (
                              <p key={index}>{bullet}</p>
                            ))}
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <hr></hr>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ mb: 1, mt: 1 }}>
                    <b>Projects</b>
                  </Box>
                  <Box>
                    {resume.projects &&
                      resume.projects.map((project: any, proj_index: any) => (
                        <Box key={project.name}>
                          <Box>
                            <Grid container justifyContent="space-between" direction="row">
                              <Box>
                                <b>{get_split_element_in_string(project.name, 0)}, </b>
                                <b>{get_split_element_in_string(project.name, 1)},</b>
                                <span>{get_split_element_in_string(project.name, 2)}</span>
                              </Box>
                            </Grid>
                          </Box>
                          <Box className="resume-bullets" sx={{ textAlign: "justify" }}>
                            {project.bullets.map((bullet: any) => (
                              <p key={bullet}>{bullet}</p>
                            ))}
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
