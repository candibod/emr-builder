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
    uploadsList: "/builder/uploads-list",
    account: "/builder/account",
  },
  scraper: {
    jobs: "/scraper/jobs",
    logs: "/scraper/logs",
    jobTracker: "/scraper/job-tracker",
  },
  quickTools: {
    getKeywords: "/quick-tools/get-keywords",
    jobMatchScore: "/quick-tools/match-score",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
