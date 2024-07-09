"use client";

import * as React from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import type { NavItemConfig } from "../../../types/nav";
import { paths } from "../../../paths";
import { isNavItemActive } from "../../../lib/is-nav-item-active";
import { Logo } from "../../../components/core/logo";

import { navItems } from "./config";
import { navIcons } from "./nav-icons";

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        "--SideNav-background": "var(--mui-palette-neutral-950)",
        "--SideNav-color": "var(--mui-palette-common-white)",
        "--NavItem-color": "var(--mui-palette-neutral-300)",
        "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
        "--NavItem-active-background": "var(--mui-palette-primary-main)",
        "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
        "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
        "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
        "--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
        "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
        bgcolor: "var(--SideNav-background)",
        color: "var(--SideNav-color)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100%",
        left: 0,
        maxWidth: "100%",
        position: "fixed",
        scrollbarWidth: "none",
        top: 0,
        width: "var(--SideNav-width)",
        zIndex: "var(--SideNav-zIndex)",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: "inline-flex" }}>
          <Logo color="light" height={37} width={122} />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
      <Box>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "rgba(71, 98, 130, 0.2)" }} component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </List>
      </Box>

      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#121621" }} component="nav" aria-labelledby="nested-list-subheader">
          {renderNavItems({ pathname, items: navItems })}
        </List>
      </Box>
    </Box>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    // acc.push(<NavItem key={key} pathname={pathname} {...item} />);
    acc.push(<MuiListNavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends NavItemConfig {
  pathname: string;
}

function MuiListNavItem({ disabled, external, href, icon, matcher, pathname, title, items }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  console.log(items);

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: 1,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          ...(active && { bgcolor: "var(--NavItem-active-background)", color: "var(--NavItem-active-color)" }),
        }}
      >
        <ListItemText>
          <Box
            {...(href
              ? {
                  component: external ? "a" : RouterLink,
                  href,
                  target: external ? "_blank" : undefined,
                  rel: external ? "noreferrer" : undefined,
                }
              : { role: "button" })}
            sx={{
              alignItems: "center",
              borderRadius: 1,
              color: "var(--NavItem-color)",
              cursor: "pointer",
              display: "flex",
              flex: "0 0 auto",
              gap: 1,
              p: "6px 16px",
              position: "relative",
              textDecoration: "none",
              whiteSpace: "nowrap",
              ...(disabled && {
                bgcolor: "var(--NavItem-disabled-background)",
                color: "var(--NavItem-disabled-color)",
                cursor: "not-allowed",
              }),
              ...(active && { color: "var(--NavItem-active-color)" }),
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto" }}>{Icon ? <Icon /> : null}</Box>
            <Box sx={{ flex: "1 1 auto" }}>
              <Typography component="span" sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}>
                {title}
              </Typography>
            </Box>
          </Box>
        </ListItemText>
      </ListItemButton>
      {items && (
        <List>
          {items.map((item: NavItemConfig) => (
            <NavItem key={item.key} pathname={pathname} {...item} />
          ))}
        </List>
      )}
    </>
  );
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? "a" : RouterLink,
              href,
              target: external ? "_blank" : undefined,
              rel: external ? "noreferrer" : undefined,
            }
          : { role: "button" })}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          gap: 1,
          p: "6px 16px",
          position: "relative",
          textDecoration: "none",
          whiteSpace: "nowrap",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          ...(active && { bgcolor: "var(--NavItem-active-background)", color: "var(--NavItem-active-color)" }),
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto" }}>{Icon ? <Icon /> : null}</Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <Typography component="span" sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
