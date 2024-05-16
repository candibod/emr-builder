"use client";

import type { User } from "../types/user";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: "google" | "discord";
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface ErrorResponse {
  status?: boolean;
  message?: string;
  errors?: object;
  detail?: object;
}

export interface ApiResponse {
  ok?: boolean;
  message?: string;
  data?: object;
  errors?: object;
}

async function apiRequestHandler(url: string, method: string, body?: object, headers?: object) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_HOST_URL + url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  let api_response = {
    ok: false,
    message: "An Error Occurred!, Please try again",
    data: {},
    errors: {},
  };

  if (!response.ok) {
    return response.json().then((res: ErrorResponse) => {
      api_response["message"] = "Something went wrong, Please reload the page and try again.";

      if (res.message) {
        api_response["message"] = res.message;
      }
      if (res.errors) {
        api_response["errors"] = res.errors;
      }

      return api_response;
    });
  }

  const res = await response.json();

  api_response["ok"] = true;
  api_response["message"] = res.message;
  api_response["data"] = res.data;

  return api_response;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem("emr-auth-token", token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    return apiRequestHandler("auth/signin", "POST", { email: email, password: password })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          const token = generateToken();
          localStorage.setItem("emr-auth-token", token);
          return {};
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });

    // const response: ApiResponse = apiRequestHandler("auth/signin", "POST", { email: email, password: password });
    // console.log("final");
    // console.log(response);

    // if (response.ok) {
    //   const token = generateToken();
    //   localStorage.setItem("emr-auth-token", token);
    //   return {};
    // } else return { error: response.message };

    // return fetch(process.env.NEXT_PUBLIC_API_HOST_URL + "auth/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({ email: email, password: password }),
    // })
    //   .then((response: Response) => {
    //     if (response.ok) {
    //       const token = generateToken();
    //       localStorage.setItem("emr-auth-token", token);
    //       return {};
    //     }

    //     return response.json().then((res: ErrorResponse) => {
    //       if (Object.keys(res).indexOf("message") > -1) {
    //         return { error: res.message };
    //       }
    //       return { error: "Something went wrong, Please reload the page and try again." };
    //     });
    //   })
    //   .catch((error) => {
    //     // Log the error -> error.message
    //     return { error: "Something went wrong, Please try again after some time." };
    //   });
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem("emr-auth-token");

    if (!token) {
      return { data: null };
    }

    return { data: { id: token } };
  }

  async signOut(): Promise<{ error?: string }> {
    return fetch(process.env.NEXT_PUBLIC_API_HOST_URL + "auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response: Response) => {
        if (response.ok) {
          localStorage.removeItem("emr-auth-token");
          return {};
        }

        return { error: "Something went wrong, Please reload the page and try again." };
      })
      .catch((error) => {
        // Log the error -> error.message
        return { error: "Something went wrong, Please try again after some time." };
      });

    return {};
  }
}

export interface GetMatchStatsParams {
  job_description: string;
  job_role: string;
  job_url: string;
}

class ResumeClient {
  async getMatchStats(params: GetMatchStatsParams): Promise<{ data?: User | null; error?: string }> {
    const { job_description, job_role, job_url } = params;

    return fetch(process.env.NEXT_PUBLIC_API_HOST_URL + "resume/job-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ job_description: job_description, job_role: job_role, job_url: job_url }),
    })
      .then((response: Response) => {
        if (response.ok) {
          console.log(response);
          console.log(response.json());
          return {};
        }

        return response.json().then((res: ErrorResponse) => {
          if (Object.keys(res).indexOf("message") > -1) {
            return { error: res.message };
          }
          return { error: "Something went wrong, Please reload the page and try again." };
        });
      })
      .catch((error) => {
        // Log the error -> error.message
        return { error: "Something went wrong, Please try again after some time." };
      });

    return { data: { id: "test" } };
  }
}

export const authClient = new AuthClient();
export const resumeClient = new ResumeClient();
