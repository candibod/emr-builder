"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { usePopover } from "../../../hooks/use-popover";

import { MobileNav } from "./mobile-nav";
import { UserPopover } from "./user-popover";
import { Typography } from "@mui/material";

export function MainNav(): React.JSX.Element {
  let pathname = usePathname();
  if (pathname.startsWith("/builder")) {
    pathname = "Resume";
  } else if (pathname.startsWith("/scraper")) {
    pathname = "Scraper";
  } else if (pathname.startsWith("/Tools")) {
    pathname = "Tools";
  } else {
    pathname = "";
  }

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid var(--mui-palette-divider)",
          backgroundColor: "var(--mui-palette-background-paper)",
          position: "sticky",
          top: 0,
          zIndex: "var(--mui-zIndex-appBar)",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", minHeight: "64px", px: 2 }}>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4">{pathname}</Typography>
          </Stack>
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            <Avatar onClick={userPopover.handleOpen} ref={userPopover.anchorRef} sx={{ cursor: "pointer" }} />
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
