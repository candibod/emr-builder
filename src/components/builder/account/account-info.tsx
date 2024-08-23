"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function AccountInfo(): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar sx={{ height: "80px", width: "80px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{typeof window !== "undefined" ? localStorage.getItem("user_full_name") : "User"}</Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {typeof window !== "undefined" ? localStorage.getItem("user_email") : "User"}
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth disabled={true} variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
