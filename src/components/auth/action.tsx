"use client";

import * as React from "react";
import { z as zod } from "zod";
import { paths } from "../../paths";
import { authClient } from "../../lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const schema = zod.object({ password: zod.string().min(8, { message: "Password should be at least 8 characters" }) });

type Values = zod.infer<typeof schema>;

const defaultValues = { password: "" } satisfies Values;

export default function AuthAction(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();
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

    if (mode === "verifyEmail") {
      fetchMyAPI();
    } else if (mode === "resetPassword") {
      // Do nothing
    } else {
      window.alert("Invalid Request, Please check the URL");
      setTimeout(function () {
        router.replace(paths.builder.newJob);
      }, 500);
    }
  }, [mode, router, searchParams]);

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const data: any = {
        mode: searchParams.get("mode"),
        oobCode: searchParams.get("oobCode"),
        apiKey: searchParams.get("apiKey"),
        password: values.password,
      };

      const { error } = await authClient.updatePassword(data);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      } else {
        setDisplaySuccessMessage(true);
        setTimeout(function () {
          router.replace(paths.auth.signIn);
        }, 5000);
      }
    },
    [router, searchParams, setError]
  );

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
      {mode === "verifyEmail" && (
        <Box>
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
      )}
      {mode === "resetPassword" && (
        <Stack spacing={4} sx={{ maxWidth: "450px", width: "100%" }}>
          <Typography variant="h5">Reset Account Password</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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
              {errors.root && !displaySuccessMessage ? (
                <Alert severity="error" color="error">
                  {errors.root.message}
                </Alert>
              ) : null}
              {displaySuccessMessage && <Alert severity="success">Password reset successful, This page will automatically redirect to the login in 5sec..</Alert>}
              <Button disabled={isPending} type="submit" variant="contained">
                Reset Password
              </Button>
            </Stack>
          </form>
        </Stack>
      )}
    </Box>
  );
}
