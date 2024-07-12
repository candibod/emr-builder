"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { resumeClient } from "../../../lib/client";

export function UploadResume(): React.JSX.Element {
  const [file, setFile] = React.useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { data, error } = await resumeClient.uploadResume({ file: file, role: "SDE" });

    if (error) {
      window.alert(error);
      return;
    }

    if (data) console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Card>
          <CardHeader subheader="Format allowed: pdf" title="Resume Upload" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <TextField type="file" onChange={(e: any) => setFile(e.target.files[0])}></TextField>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
