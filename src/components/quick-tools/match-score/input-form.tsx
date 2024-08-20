"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { utilsClient } from "../../../lib/client";
import { extractTextFromPDF } from "../../../lib/utils";
import { FullPageLoader } from "../../core/loaders";
import { SnackBarNotification } from "../../core/snack-bar";

export function InputForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [textInput, setTextInput] = React.useState("");
  const [jobDesc, setJobDesc] = React.useState("");
  const [stats, setStats] = React.useState<any>({});
  const [noti, setNoti] = React.useState({ message: "", severity: "", open: 0 });

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    extractTextFromPDF(nextFile)
      .then((text) => setTextInput(text))
      .catch((error) => window.alert("Failed to extract text from pdf"));
  }

  function onChangeTextInput(e: any) {
    setTextInput(e.target.value);
  }

  function onChangeJobDesc(e: any) {
    setJobDesc(e.target.value);
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsPending(true);

    if (textInput.length == 0 || jobDesc.length == 0) {
      setIsPending(false);
      setNoti({ message: "Input fields cannot be empty", severity: "error", open: noti["open"] + 1 });
      return;
    }

    const { data, error }: any = await utilsClient.matchScore(textInput, jobDesc);

    if (error) {
      setIsPending(false);
      setNoti({ message: error, severity: "error", open: noti["open"] + 1 });
      return;
    }

    if (data) {
      setStats(data);
    }

    setIsPending(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: { xs: "none", lg: "1 1 auto" },
            flexBasis: { xs: "auto", lg: "50%" },
            background: "white",
            justifyContent: "center",
            p: 3,
            margin: { xs: "10px 10px 0 10px", lg: "10px 0 10px 10px" },
            borderRadius: "30px",
          }}
        >
          <Box sx={{ maxWidth: "600px", width: "100%" }}>
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Get Match Stats</Typography>
              </Stack>
              <Box>
                <Stack spacing={2}>
                  <TextField label="Job Description" multiline minRows={6} maxRows={12} onChange={onChangeJobDesc} value={jobDesc} />
                  <TextField label="Info" multiline minRows={6} maxRows={12} onChange={onChangeTextInput} value={textInput} />
                  <Box textAlign={"center"}>(OR)</Box>
                  <Box>
                    <label htmlFor="file">Load from file:</label> <input onChange={onFileChange} type="file" />
                  </Box>
                  <Button disabled={isPending} type="submit" onClick={onSubmit} variant="contained">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            margin: "10px",
            borderRadius: "30px",
            background: "white",
            color: "var(--mui-palette-common-white)",
            display: { xs: "flex", lg: "flex" },
            flexBasis: "50%",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Stack spacing={2}>
            <Typography textAlign={"center"} variant="button" color={"grey"}>
              Match Percent: {stats.match_percent}
            </Typography>
            <Typography color={"grey"}>Matched skills</Typography>
            {stats.found && stats.found.length > 0 ? (
              <Box>
                {stats.found.map((keyword: any, key: number) => (
                  <Chip key={key} sx={{ mt: 1, mr: 1 }} variant="filled" color="success" label={keyword} />
                ))}
              </Box>
            ) : (
              <Typography textAlign={"center"} color={"grey"} variant="caption">
                No Matched skills
              </Typography>
            )}
            <Typography sx={{ mt: 2 }} color={"grey"}>
              Un-Matched skills
            </Typography>
            {stats.not_found && stats.not_found.length > 0 ? (
              <Box>
                {stats.not_found.map((keyword: any, key: number) => (
                  <Chip key={key} sx={{ mt: 1, mr: 1 }} variant="filled" color="warning" label={keyword} />
                ))}
              </Box>
            ) : (
              <Typography textAlign={"center"} color={"grey"} variant="caption">
                No Un-Matched skills
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
      <FullPageLoader isLoading={isPending} />
      <SnackBarNotification message={noti["message"]} severity={noti["severity"]} open={noti["open"]} />
    </>
  );
}
