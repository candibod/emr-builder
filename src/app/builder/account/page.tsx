import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { config } from "../../../config";
import { AccountDetailsForm } from "../../../components/builder/account/account-details-form";
import { AccountInfo } from "../../../components/builder/account/account-info";

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack width={"100%"} sx={{ p: 2 }}>
      <Grid direction="column" container spacing={2}>
        <Grid container justifyContent="center">
          <Grid md={4} xs={12}>
            <AccountInfo />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid md={8} xs={12}>
            <AccountDetailsForm />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
