"use client";

import * as React from "react";
import { paths } from "../../paths";
import { authClient } from "../../lib/client";
import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function AuthAction(): React.JSX.Element {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchMyAPI() {
      const values: any = {
        mode: searchParams.get("mode"),
        oobCode: searchParams.get("oobCode"),
        apiKey: searchParams.get("apiKey"),
      };
      const { error } = await authClient.verifyEmail(values);

      if (error) {
        setErrorMsg(error);
        return;
      } else {
        setDisplaySuccessMessage(true);
        setTimeout(function () {
          router.replace(paths.builder.newJob);
        }, 6000);
      }
    }

    fetchMyAPI();
  }, [router, searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      <Stack spacing={1} sx={{ mt: 3, fontSize: "1.5rem" }}>
        <p>Verifying Email</p>
      </Stack>
      {!displaySuccessMessage && !errorMsg && <CircularProgress />}
      {errorMsg && !displaySuccessMessage && (
        <Alert severity="error" color="error">
          {errorMsg}
        </Alert>
      )}
      {displaySuccessMessage && <Alert severity="success">Account verification done, This page will automatically redirect to the dashboard in 5sec..</Alert>}
    </Box>
  );
}
