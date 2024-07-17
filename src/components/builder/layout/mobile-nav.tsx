"use client";

import * as React from "react";
import RouterLink from "next/link";

import { navItems } from "./config";
import { paths } from "../../../paths";
import { navIcons } from "./nav-icons";
import { usePathname } from "next/navigation";
import { Logo } from "../../../components/core/logo";
import type { NavItemConfig } from "../../../types/nav";
import { isNavItemActive } from "../../../lib/is-nav-item-active";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Drawer
      PaperProps={{
        sx: {
          "--MobileNav-background": "var(--mui-palette-neutral-950)",
          "--MobileNav-color": "var(--mui-palette-common-white)",
          "--NavItem-color": "var(--mui-palette-neutral-300)",
          "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
          "--NavItem-active-background": "var(--mui-palette-primary-main)",
          "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
          "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
          "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
          "--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
          "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
          bgcolor: "var(--MobileNav-background)",
          color: "var(--MobileNav-color)",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          scrollbarWidth: "none",
          width: "var(--MobileNav-width)",
          zIndex: "var(--MobileNav-zIndex)",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: "inline-flex" }}>
          <Logo color="light" height={32} width={122} />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: "var(--mui-palette-neutral-700)" }} />
      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#121621" }} component="nav" aria-labelledby="nested-list-subheader">
          {renderNavItems({ pathname, items: navItems })}
        </List>
      </Box>
    </Drawer>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<MuiListNavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends NavItemConfig {
  pathname: string;
}

function omit(key: any, obj: any) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

function MuiListNavItem({ disabled, external, href, icon, matcher, pathname, title, items }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: 1,
          p: "4px 8px",
          mt: 0.2,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          "&:hover": {
            backgroundColor: active ? "var(--NavItem-active-background)" : "#ffffff12",
          },
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
        <List dense={true} sx={{ m: "0 0 0 20px", p: 0 }}>
          {items.map((item: NavItemConfig, index: any) => (
            <MuiListNavItem key={index} pathname={pathname} {...omit("key", { ...item })} />
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
