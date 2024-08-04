import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { AppliedJobsList } from "../../../components/scraper/job-tracker/applied-jobs-list";

export const metadata = { title: `Job Scraper - Job Tracker | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <AppliedJobsList />;
}
