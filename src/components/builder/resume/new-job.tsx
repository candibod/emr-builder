"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "../../../paths";
import { authClient, resumeClient } from "../../../lib/client";
import CustomTextArea from "../../../lib/textarea";
import { useUser } from "../../../hooks/use-user";

const schema = zod.object({
  job_description: zod.string().min(1, { message: "Job Description is required" }),
  job_role: zod.string(),
  job_url: zod.string(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { job_description: "", job_role: "", job_url: "" } satisfies Values;

export function NewJob(): React.JSX.Element {
  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      console.log("enter");
      console.log(values);
      setIsPending(true);

      const { data, error } = await resumeClient.getMatchStats(values);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      console.log(data);
    },
    [setError]
  );

  return (
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
                <CustomTextArea minRows={7} maxRows={12} placeholder="Enter job description" error={error} onChange={onChange} value={value} />
                <FormHelperText>Add Roles, Duties, Responsibilities, Qualifications to increase accuracy, leave sections like About Us, Company information, Compensation and Benefits</FormHelperText>
                {errors.job_description ? <FormHelperText>{errors.job_description.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="job_role"
            render={({ field }) => (
              <FormControl error={Boolean(errors.job_role)}>
                <InputLabel>URL (optional)</InputLabel>
                <OutlinedInput {...field} label="URL (optional)" type="text" />
                {errors.job_role ? <FormHelperText>{errors.job_role.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="job_url"
            render={({ field }) => (
              <FormControl error={Boolean(errors.job_url)}>
                <InputLabel>Company Name (optional)</InputLabel>
                <OutlinedInput {...field} label="Company Name (optional)" type="text" />
                {errors.job_url ? <FormHelperText>{errors.job_url.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Next
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
