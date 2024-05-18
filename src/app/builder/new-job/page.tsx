import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { NewJob } from "../../../components/builder/resume/new-job";

export const metadata = { title: `Match Stats | ${config.site.name}` } satisfies Metadata;

export default function ResumeReviews(): React.JSX.Element {
  return <NewJob />;
}
