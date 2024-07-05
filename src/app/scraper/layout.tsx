import * as React from "react";
import Box from "@mui/material/Box";

import { AuthGuard } from "../../components/auth/auth-guard";
import { MainNav } from "../../components/builder/layout/main-nav";
import { SideNav } from "../../components/builder/layout/side-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
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
