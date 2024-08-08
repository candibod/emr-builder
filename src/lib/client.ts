"use client";

import type { User } from "../types/user";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface VerifyEmailParams {
  mode: string;
  oobCode: string;
  apiKey: string;
}

export interface UpdatePasswordParams {
  password: string;
  mode: string;
  oobCode: string;
  apiKey: string;
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

  api_response["ok"] = res.success;
  api_response["message"] = res.message;
  api_response["data"] = res.data;

  return api_response;
}

async function apiFileRequestHandler(url: string, method: string, body?: any, headers?: object) {
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
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const { fullName, email, password } = params;

    return apiRequestHandler("auth/signup", "POST", { name: fullName, email: email, password: password })
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

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    return apiRequestHandler("auth/signin", "POST", { email: email, password: password })
      .then((response) => {
        if (response.ok && response.data) {
          const token = generateToken();
          localStorage.setItem("emr-auth-token", token);
          let { name, email }: any = response.data;
          localStorage.setItem("user_full_name", name);
          localStorage.setItem("user_email", email);
          return {};
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async signInWithProvider(email: any, token: any, provider: any): Promise<{ error?: string }> {
    return apiRequestHandler("auth/signin/provider", "POST", { email: email, idToken: token, provider: provider })
      .then((response) => {
        if (response.ok && response.data) {
          const token = generateToken();
          localStorage.setItem("emr-auth-token", token);
          let { name, email }: any = response.data;
          localStorage.setItem("user_full_name", name);
          localStorage.setItem("user_email", email);
          return {};
        } else {
          return { error: response.message };
        }
      })
      .catch((error) => {
        return { error: error.message };
      });
  }

  async verifyEmail(params: VerifyEmailParams): Promise<{ error?: string }> {
    const { mode, oobCode, apiKey } = params;

    return apiRequestHandler("auth/action", "POST", { mode: mode, oobCode: oobCode, apiKey: apiKey })
      .then((response) => {
        if (response.ok) {
          const token = generateToken();
          localStorage.setItem("emr-auth-token", token);
          localStorage.setItem("user_full_name", token);
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

  async resetPassword(email: string): Promise<{ error?: string }> {
    return apiRequestHandler("auth/reset-password", "POST", { email: email })
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

  async updatePassword(params: UpdatePasswordParams): Promise<{ error?: string }> {
    const { password, mode, oobCode, apiKey } = params;

    return apiRequestHandler("auth/action", "POST", { password: password, mode: mode, oobCode: oobCode, apiKey: apiKey })
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

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem("emr-auth-token");

    if (!token) {
      return { data: null };
    }

    return {
      data: {
        id: token,
      },
    };
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
  async uploadResume(params: { file: any; role: string }): Promise<{ data?: ApiResponse; error?: string }> {
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

  async fetchResume(resume_id: string): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("resume/details/" + resume_id, "GET")
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

  async deleteResume(resume_id: string): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("resume/delete-resume", "DELETE", { resume_id: resume_id })
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

  async getUploadedResumes(): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("resume/uploads", "GET")
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

  async getResumeReview(id: any): Promise<{ data?: ApiResponse; error?: string }> {
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

class ScraperClient {
  async getLogs(): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("scraper/logs", "GET")
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

  async getJobsFromLogs(id: any): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("scraper/jobs/" + id, "GET")
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

  async getAppliedJobs(): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("scraper/applied-jobs", "GET")
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

  async saveJobApply(log_id: any, job_id: any): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("scraper/job-apply", "POST", { job_id: job_id, log_id: log_id[0] })
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

  async updateJobStatus(job_id: any, status: any): Promise<{ data?: ApiResponse; error?: string }> {
    return apiRequestHandler("scraper/job-status", "POST", { job_id: job_id, status: status })
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
export const scraperClient = new ScraperClient();
