"use client";

import * as React from "react";
import { paths } from "../../../paths";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { resumeClient } from "../../../lib/client";

export function UploadResume(): React.JSX.Element {
  const [file, setFile] = React.useState(null);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { data, error } = await resumeClient.uploadResume({ file: file, role: "SDE" });

    if (error) {
      window.alert(error);
      return;
    }

    if (data) {
      window.alert("Resume Uploaded Successfully!");
      router.replace(paths.builder.uploadsList);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Card>
          <CardHeader subheader="Format allowed: pdf" title="Resume Upload" />
          <Divider />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              The algorithm to parse the resume is being written to handle certain type of resume formats, Additional patterns or algorithms will be implemented to improve the accuracy of information
              extraction.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Grid container spacing={3}>
                <TextField type="file" onChange={(e: any) => setFile(e.target.files[0])}></TextField>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
            </Button>
          </CardActions>
        </Card>
      </form>
      <Box width="100%">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid xs={6} sm={4} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  SDE - Entry Level
                </Typography>
                <Typography color="text.secondary">0 - 2 years</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" disabled={true}>
                  View
                </Button>
                <Button size="small" href="/assets/sde-entry.pdf" download="SDE-entry.pdf">
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={6} sm={4} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  SDE - Mid Level
                </Typography>
                <Typography color="text.secondary">2 - 6 years</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" disabled={true}>
                  View
                </Button>
                <Button size="small" disabled={true}>
                  Coming Soon..
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
