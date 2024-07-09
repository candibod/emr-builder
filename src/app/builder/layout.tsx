import * as React from "react";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";

import { AuthGuard } from "../../components/auth/auth-guard";
import { MainNav } from "../../components/builder/layout/main-nav";
import { SideNav } from "../../components/builder/layout/side-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "56px",
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100%",
        }}
      >
        <SideNav />
        <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column", pl: { lg: "var(--SideNav-width)" }, backgroundColor: "#f4f5f7" }}>
          <MainNav />
          <Box sx={{ display: "flex", flexGrow: 1, maxWidth: "2560px" }}>{children}</Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}
