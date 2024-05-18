"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Chip from "@mui/material/Chip";

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { resumeClient } from "../../../lib/client";
import CustomTextArea from "../../../lib/textarea";
import { NewJobStats } from "../resume/new-job-stats";

const schema = zod.object({
  job_description: zod.string().min(1, { message: "Job Description is required" }),
  job_role: zod.string().min(1, { message: "Job Description is required" }),
  job_url: zod.string(),
  company_name: zod.string(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { job_description: "", job_role: "", job_url: "", company_name: "" } satisfies Values;

export function ResumeReview(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobStatsData, setJobStatsData] = React.useState({});

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { data, error } = await resumeClient.getMatchStats(values);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      if (data) setJobStatsData(data);
    },
    [setError]
  );

  function handleDelete() {}

  return (
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
          flexBasis: { xs: "auto", lg: "50%" },
          background: "white",
          p: 3,
          margin: "10px 10px 10px 10px",
          borderRadius: "30px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Missing Skills
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
          Technical
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack>
        <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
          Non Technical
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Matched Skills
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Chip Filled" />
          <Chip label="Chip Filled" />
        </Stack>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Generate Sentence
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
            Words Selected:
          </Typography>
          <Chip label="primary" color="primary" variant="outlined" />
          <Chip label="primary" color="primary" variant="outlined" />
        </Stack>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
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
        <Stack spacing={3}>
          <NewJobStats jobStatsData={jobStatsData} />
        </Stack>
      </Box>
    </Box>
  );
}
