"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export interface LoaderProps {
  isLoading?: boolean;
}

export function FullPageLoader({ isLoading = false }: LoaderProps): React.JSX.Element {
  const handleClose = () => {
    // Do Nothing
  };

  console.log("is OPen", isLoading);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
