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

export interface Resume {
  certifications: null;
  name: string;
  mobile_number: string;
  email: string;
  url: string;
  education: Array<{ name: string; timeline: string }>;
  skills: Array<{ category: string; skills: Array<string> }>;
  experience: Array<{ name: string; timeline: string; bullets: Array<string> }>;
  projects: Array<{ name: string; timeline: string; bullets: Array<string> }>;
}

export interface JobStatsData {
  builder_id: string;
  company_name: string;
  company_role: string;
  job_description: string;
  job_role: string;
  job_url: string;
  match_percent: number;
  matched_skills: string;
  unmatched_skills: string;
  resume: Resume;
}

export interface ApiResponse {
  ok?: boolean;
  message?: string;
  data?: object;
  errors?: object;
}

async function apiRequestHandler(url: string, method: string, body?: object, headers?: object): Promise<ApiResponse> {
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

async function apiFileRequestHandler(url: string, method: string, body?: object, headers?: object) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_HOST_URL + url, {
    method: method,
    credentials: "include",
    body: body,
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
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem("emr-auth-token");

    if (!token) {
      return { data: null };
    }

    return { data: { id: token } };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem("emr-auth-token");
    return apiRequestHandler("auth/logout", "POST")
      .then((response) => {
        if (response.ok) {
          return {};
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }
}

export interface GetMatchStatsParams {
  job_description: string;
  job_role: string;
  job_url: string;
  company_name: string;
}

export interface UpdateMatchStatsParams {
  resume_id: string;
  builder_id: string;
}

export interface GenerateTextParams {
  experience: string;
  activity: string;
  result: string;
  keywords: string;
}

export interface EditResumeParams {
  index?: string;
  bullet_id?: string;
  data?: any;
}

export interface ResumeResponse {
  ok?: boolean;
  message?: string;
  data?: { resume: Resume; matched_skills: string; unmatched_skills: string; match_percent: number; relevant_bullets: Array<string>; builder_id: string };
  errors?: object;
}

class ResumeClient {
  async uploadResume(params: { file: Blob; role: string }): Promise<{ data?: ApiResponse; error?: string }> {
    const { file, role } = params;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_role", role);

    return apiFileRequestHandler("resume/uploads", "POST", formData)
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async getMatchStats(params: GetMatchStatsParams): Promise<{ data?: ApiResponse; error?: string }> {
    const { job_description, job_role, job_url, company_name } = params;

    return apiRequestHandler("resume/job-details", "POST", { job_description: job_description, job_role: job_role, job_url: job_url, company_name: company_name })
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async updateResumeForBuilder(params: UpdateMatchStatsParams): Promise<{ data?: ApiResponse; error?: string }> {
    const { resume_id, builder_id } = params;

    return apiRequestHandler("resume/job-details", "PUT", { resume_uuid: resume_id, builder_uuid: builder_id })
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async getResumeReviews(): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("resume/resume-reviews", "GET")
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async getResumeReview(id: string): Promise<{ data?: ResumeResponse; error?: string }> {
    return apiRequestHandler("resume/resume-review/" + id, "GET")
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async getRelevantBullets(skills_concatenated: string): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("resume/relevant-bullets", "POST", { skills: skills_concatenated })
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async updateResume(builder_uuid: string, action: string, resume_data: EditResumeParams): Promise<{ data?: ApiResponse; error?: string }> {
    console.log("params", action, resume_data);
    const payload = { builder_uuid: builder_uuid, action: action, action_data: { index: resume_data.index, bullet_id: resume_data.bullet_id, data: resume_data.data } };

    return apiRequestHandler("resume/update-resume", "POST", payload)
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async generateText(params: GenerateTextParams): Promise<{ data?: ApiResponse; error?: string }> {
    const { experience, activity, result, keywords } = params;

    return apiRequestHandler("resume/generate-text", "POST", { experience: experience, activity: activity, result: result, skills: keywords })
      .then((response) => {
        if (response.ok) {
          return { data: response.data };
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }
}

export const authClient = new AuthClient();
export const resumeClient = new ResumeClient();
