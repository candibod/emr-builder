export const paths = {
  home: "/",
  auth: { signIn: "/auth/login", signUp: "/auth/signup", resetPassword: "/auth/reset-password" },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    settings: "/dashboard/settings",
  },
  builder: {
    newJob: "/builder/new-job",
    resumeReviews: "/builder/resume-reviews",
    resumeReview: "/builder/resume-review/",
    uploadResume: "/builder/upload-resume",
    account: "/builder/account",
  },
  scraper: {
    jobs: "/scraper/jobs",
    logs: "/scraper/logs",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
