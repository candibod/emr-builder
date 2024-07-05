"use client";

import * as React from "react";
import { z as zod } from "zod";
import { authClient } from "../../lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

const schema = zod.object({ email: zod.string().min(1, { message: "Email is required" }).email() });

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "" } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.resetPassword(values.email);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      } else {
        setDisplaySuccessMessage(true);
      }
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root && !displaySuccessMessage ? (
            <Alert severity="error" color="error">
              {errors.root.message}
            </Alert>
          ) : null}
          {displaySuccessMessage && <Alert severity="success">Password reset request is successful, Please check your email to reset password.</Alert>}
          <Button disabled={isPending} type="submit" variant="contained">
            Send recovery link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
