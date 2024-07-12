import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../../config";
import { JobList } from "../../../../components/scraper/jobs/job-list";

export const metadata = { title: `Scraper Jobs | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <JobList />;
}
