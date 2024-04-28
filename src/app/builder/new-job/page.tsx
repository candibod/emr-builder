import * as React from "react";
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { config } from "../../../config";
import { NewJob } from "../../../components/builder/resume/new-job";
import { NewJobStats } from "../../../components/builder/resume/new-job-stats";

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function ResumeReviews(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flex: { xs: "none", lg: "1 1 auto" },
          flexBasis: { xs: "auto", lg: "50%" },
          background: "white",
          justifyContent: "center",
          p: 3,
          margin: { xs: "10px 10px 0 10px", lg: "10px 0 10px 10px" },
          borderRadius: "30px",
        }}
      >
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <NewJob />
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          margin: "10px",
          borderRadius: "30px",
          background: "white",
          color: "var(--mui-palette-common-white)",
          display: { xs: "flex", lg: "flex" },
          flexBasis: "50%",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <NewJobStats />
          {/* <Stack spacing={1}>
            <Typography align="center" variant="subtitle1" sx={{ color: "#8b8b8b" }}>
              Add job description to get the resume matching stats
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" alt="Widgets" src="/assets/file-empty.png" sx={{ height: "auto", width: "100%", maxWidth: "200px" }} />
          </Box> */}
        </Stack>
      </Box>
    </Box>
  );
}
