"use client";

import * as React from "react";
import { z as zod } from "zod";
import RouterLink from "next/link";
import { paths } from "../../paths";
import { authClient } from "../../lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const schema = zod.object({
  fullName: zod.string().min(1, { message: "Full name is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(8, { message: "Password should be at least 8 characters" }),
  terms: zod.boolean().refine((value) => value, "You must accept the terms and conditions"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { fullName: "", email: "", password: "", terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>();
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

      const { error } = await authClient.signUp(values);

      if (error) {
        console.log("in");
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      } else {
        console.log("else");
        setDisplaySuccessMessage(true);
      }
    },
    [setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.fullName)}>
                <InputLabel>Full name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.fullName ? <FormHelperText>{errors.fullName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
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
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <VisibilityOutlinedIcon
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root && !displaySuccessMessage ? (
            <Alert severity="error" color="error">
              {errors.root.message}
            </Alert>
          ) : null}

          {displaySuccessMessage && <Alert severity="success">Thanks for signing up, We have sent an email to verify your email address and activate your account.</Alert>}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
