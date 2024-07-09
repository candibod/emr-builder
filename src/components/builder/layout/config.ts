import type { NavItemConfig } from "../../../types/nav";
import { paths } from "../../../paths";

export const navItems = [
  {
    key: "New Job",
    title: "New Job",
    href: paths.builder.newJob,
    icon: "new-note",
    items: [
      { key: "Resume 1", title: "Resume 1", href: paths.builder.resumeReviews, icon: "copy-all" },
      { key: "Resume 2", title: "Resume 2", href: paths.builder.resumeReviews, icon: "copy-all" },
    ],
  },
  { key: "Resume Reviews", title: "Resume Reviews", href: paths.builder.resumeReviews, icon: "copy-all" },
  { key: "Scraper Jobs", title: "Scraper Jobs", href: paths.scraper.jobs, icon: "copy-all" },
  { key: "Upload Resume", title: "Upload Resume", href: paths.builder.uploadResume, icon: "upload-file" },
  { key: "account", title: "Account", href: paths.builder.account, icon: "user" },
] satisfies NavItemConfig[];
