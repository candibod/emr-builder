"use client";

import * as React from "react";

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
import Box from "@mui/material/Box";

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { resumeClient } from "../../../lib/client";
import CustomTextArea from "../../../lib/textarea";
import { NewJobStats } from "../../../components/builder/resume/new-job-stats";

const schema = zod.object({
  job_description: zod.string().min(1, { message: "Job Description is required" }),
  job_role: zod.string().min(1, { message: "Job Description is required" }),
  job_url: zod.string(),
  company_name: zod.string(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { job_description: "", job_role: "", job_url: "", company_name: "" } satisfies Values;

export function NewJob(): React.JSX.Element {
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
              <Typography variant="h4">Tailor your Resume for New Job</Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="job_description"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl error={Boolean(errors.job_description)}>
                      <CustomTextArea minRows={7} maxRows={12} placeholder="Enter job description" error={error ? true : false} onChange={onChange} value={value} />
                      <FormHelperText>
                        Add Roles, Duties, Responsibilities, Qualifications to increase accuracy, leave sections like About Us, Company information, Compensation and Benefits
                      </FormHelperText>
                      {errors.job_description ? <FormHelperText>{errors.job_description.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="job_role"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.job_role)}>
                      <InputLabel>Job Role</InputLabel>
                      <Select label="Job Role" {...field}>
                        <MenuItem value={"SDE"}>SDE</MenuItem>
                        <MenuItem value={"20"}>FRONTEND</MenuItem>
                        <MenuItem value={"BACKEND"}>BACKEND</MenuItem>
                        <MenuItem value={"SDE2"}>SDE2</MenuItem>
                        <MenuItem value={"SR_SDE"}>SR_SDE</MenuItem>
                        <MenuItem value={"REACT"}>REACT</MenuItem>
                        <MenuItem value={"FULL_STACK"}>FULL_STACK</MenuItem>
                        <MenuItem value={"DATA_ANALYTICS"}>DATA_ANALYTICS</MenuItem>
                      </Select>
                      {errors.job_role ? <FormHelperText>{errors.job_role.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="job_url"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.job_url)}>
                      <InputLabel>URL (optional)</InputLabel>
                      <OutlinedInput {...field} label="URL (optional)" type="text" />
                      {errors.job_url ? <FormHelperText>{errors.job_url.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="company_name"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.company_name)}>
                      <InputLabel>Company Name (optional)</InputLabel>
                      <OutlinedInput {...field} label="Company Name (optional)" type="text" />
                      {errors.company_name ? <FormHelperText>{errors.company_name.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
                {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                <Button disabled={isPending} type="submit" variant="contained">
                  Get Stats
                </Button>
              </Stack>
            </form>
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
        <Stack spacing={3}>
          <NewJobStats jobStatsData={jobStatsData} />
        </Stack>
      </Box>
    </Box>
  );
}
