"use client";

import * as React from "react";
import { z as zod } from "zod";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { signInWithGoogle, onAuthStateChanged } from "./firebase-auth";

import { paths } from "../../paths";
import { authClient } from "../../lib/client";
import { useUser } from "../../hooks/use-user";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "", password: "" } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  function useUserSession(initialUser: any) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = React.useState(initialUser);
    const router = useRouter();

    React.useEffect(() => {
      const unsubscribe = onAuthStateChanged((authUser: any) => {
        setUser(authUser);
      });

      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      onAuthStateChanged((authUser: any) => {
        if (user === undefined) return;

        // refresh when user changed to ease testing
        if (user?.email !== authUser?.email) {
          router.refresh();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return user;
  }

  useUserSession({});

  async function handleGoogleSignIn() {
    setIsPending(true);
    const res: any = await signInWithGoogle();
    if (Object.keys(res).length >= 0) {
      handleSignIn(res?.user?.email, res?._tokenResponse?.idToken);
    }
    setIsPending(false);
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  async function handleSignIn(email: any, token: any) {
    setIsPending(true);

    const { error } = await authClient.signInWithProvider(email, token, "google");

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    // Refresh the auth state
    await checkSession?.();

    // UserProvider, for this case, will not refresh the router
    // After refresh, GuestGuard will handle the redirect
    router.refresh();
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{" "}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
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
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? (
            <Alert severity="error" color="error">
              {errors.root.message}
            </Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
          <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
              - Or -<br></br>
              <Button variant="outlined" onClick={handleGoogleSignIn}>
                <Box component="img" alt="Widgets" src="/assets/google-icon.svg" sx={{ height: "auto", width: "100%", maxWidth: "20px" }} />
                &nbsp; Sign In with Google
              </Button>
            </Box>
          </>
        </Stack>
      </form>
    </Stack>
  );
}
