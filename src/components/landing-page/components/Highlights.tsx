import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CategoryIcon from "@mui/icons-material/Category";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import TuneIcon from "@mui/icons-material/Tune";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import DashboardIcon from "@mui/icons-material/Dashboard";

const items = [
  {
    icon: <ContactMailIcon />,
    title: "Contact Recruiter",
    description: "Easily connect and communicate directly with recruiters with pre-filled templates.",
  },
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    description: "A dashboard to display job application metrics and summarize results for actionable insights.",
  },
  {
    icon: <CategoryIcon />,
    title: "Categorize Skills",
    description: "Efficiently organize skills into distinct technical and non-technical categories.",
  },
  {
    icon: <AdsClickIcon />,
    title: "One click Enhance",
    description: "Instantly improve and optimize your resume with just one click.",
  },
  {
    icon: <TuneIcon />,
    title: "Custom Scraper",
    description: "Create a customized scraper tailored to match your specific job requirements.",
  },
  {
    icon: <FileCopyIcon />,
    title: "Additional Templates/Roles",
    description: "Gain access to a variety of resume templates designed for different roles.",
  },
  {
    icon: <ModelTrainingIcon />,
    title: "Upgrade Scraping using ML",
    description: "Enhance the effectiveness of scraping by utilizing machine learning techniques.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="roadmap"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Great Things Are Coming
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            {
              "I'm a tech enthusiast who whipped this up to lighten the load during job searches. There are so many upgrades bouncing around in my head, and a few are already in the works(mentioned below)."
            }
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography textAlign="center" color="text.secondary" sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}>
            If you have something similar in mind or any ideas to enhance the product, Feel free reach out to me!.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} alignSelf="center" spacing={1} useFlexGap sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}>
            <Button variant="contained" color="primary" target="_blank" href="https://candibod.in/#contact">
              Msg Feedback
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
