"use client";

import * as React from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
// import LogoCollection from "./components/LogoCollection";
import Highlights from "./components/Highlights";
// import Pricing from "./components/Pricing";
import Features from "./components/Features";
// import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import getLPTheme from "./getLPTheme";

export default function LandingPageTemplate() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        {/* <Pricing /> */}
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
