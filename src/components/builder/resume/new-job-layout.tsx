import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { paths } from "../../../paths";
import { DynamicLogo } from "../../core/logo";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
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
        <Box sx={{ maxWidth: "600px", width: "100%" }}>{children}</Box>
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
          <Stack spacing={1}>
            <Typography color="inherit" sx={{ fontSize: "24px", lineHeight: "32px", textAlign: "center" }} variant="h1">
              Welcome to{" "}
              <Box component="span" sx={{ color: "#15b79e" }}>
                Elevate My Resume
              </Box>
            </Typography>
            <Typography align="center" variant="subtitle1">
              Get Tailored Resume
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" alt="Widgets" src="/assets/auth-widgets.png" sx={{ height: "auto", width: "100%", maxWidth: "800px" }} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
