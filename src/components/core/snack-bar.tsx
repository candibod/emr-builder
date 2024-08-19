"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

export interface NotiProps {
  open: number;
  message: string;
  severity?: any;
}

export function SnackBarNotification({ open, message = "", severity = "success" }: NotiProps): React.JSX.Element {
  const [internalOpen, setInternalOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalOpen(open > 0 ? true : false);
  }, [open]);

  const handleClose = () => {
    setInternalOpen(false);
  };

  const vertical = "top";
  const horizontal = "right";

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={internalOpen} autoHideDuration={10000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
