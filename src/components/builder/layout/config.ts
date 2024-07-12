import type { NavItemConfig } from "../../../types/nav";
import { paths } from "../../../paths";

export const navItems = [
  {
    key: "Resume",
    title: "Resume",
    href: "#",
    icon: "description",
    items: [
      { key: "New Job", title: "New Job", href: paths.builder.newJob, icon: "new-note" },
      { key: "Resume Reviews", title: "Resume Reviews", href: paths.builder.resumeReviews, icon: "reviews" },
      { key: "Upload Resume", title: "Upload Resume", href: paths.builder.uploadResume, icon: "upload-file" },
    ],
  },
  {
    key: "Job Scraper",
    title: "Job Scraper",
    href: "#",
    icon: "scraper",
    items: [
      { key: "Logs", title: "Logs", href: paths.scraper.logs, icon: "logs" },
      { key: "Jobs", title: "Jobs", href: paths.scraper.jobs, icon: "jobs" },
    ],
  },
  {
    key: "Quick Tools",
    title: "Quick Tools",
    href: "#",
    icon: "quick-tools",
    items: [
      { key: "Get Keywords", title: "Get Keywords", href: "#", icon: "get-keywords" },
      { key: "Job Match Score", title: "Job Match Score", href: "#", icon: "match-score" },
    ],
  },
  { key: "account", title: "Account", href: paths.builder.account, icon: "user" },
] satisfies NavItemConfig[];
