"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { paths } from "../../../paths";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CardHeader from "@mui/material/CardHeader";
import { resumeClient } from "../../../lib/client";

export interface LayoutProps {
  children: React.ReactNode;
}

export function NewJobStats(props): React.JSX.Element {
  const router = useRouter();

  function handleButtonClick(e) {
    const resume_id = e.currentTarget.getAttribute("data-resume-id");
    const builder_id = e.currentTarget.getAttribute("data-builder-id");

    const { data, error } = resumeClient.updateResumeForBuilder({ resume_id: resume_id, builder_id: builder_id });

    if (error) {
      alert(error);
      return;
    }

    router.replace(paths.builder.resumeReviews);
  }

  return (
    <>
      {props.jobStatsData && Object.keys(props.jobStatsData).length > 0 ? (
        <List sx={{ width: "100%", maxHeight: "calc(100vh - 150px)", overflowX: "hidden", overflowY: "scroll", bgcolor: "background.paper" }}>
          {props.jobStatsData?.resume_match_stats.map((resume_stats, key: number) => (
            <Paper key={key} elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
              <Card variant="outlined">
                <CardHeader
                  action={
                    <Avatar sx={{ bgcolor: "#f0884d" }} aria-label="recipe">
                      {resume_stats.match_percent}%
                    </Avatar>
                  }
                  title={resume_stats.resume_name}
                  subheader={"Updated At: " + resume_stats.updated_at}
                />
                <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
                  {resume_stats.found.length > 0 ? (
                    <Box sx={{ mt: "10px" }}>
                      {resume_stats.found.map((keyword, key: number) => (
                        <Chip key={key} sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label={keyword} />
                      ))}
                    </Box>
                  ) : (
                    <></>
                  )}
                  {resume_stats.not_found.length > 0 ? (
                    <Box sx={{ mt: "10px" }}>
                      {resume_stats.not_found.map((keyword, key: number) => (
                        <Chip key={key} sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label={keyword} />
                      ))}
                    </Box>
                  ) : (
                    <></>
                  )}
                </CardContent>
                <CardActions>
                  <Button sx={{ marginRight: "auto", marginLeft: "0" }} size="small">
                    Download
                  </Button>
                  <Button
                    sx={{ marginRight: "0", marginLeft: "auto" }}
                    size="small"
                    data-builder-id={props.jobStatsData?.builder_uuid}
                    data-resume-id={resume_stats.resume_uuid}
                    onClick={handleButtonClick}
                  >
                    Edit this Resume
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          ))}
        </List>
      ) : (
        <>
          <Stack spacing={1}>
            <Typography align="center" variant="subtitle1" sx={{ color: "#8b8b8b" }}>
              Add job description to get the resume matching stats
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" alt="Widgets" src="/assets/file-empty.png" sx={{ height: "auto", width: "100%", maxWidth: "200px" }} />
          </Box>
        </>
      )}
    </>
  );
}
