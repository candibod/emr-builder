import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../../config";
import { ResumeReview } from "../../../../components/builder/review/resume-review";

export const metadata = { title: `Resume Reviews | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <ResumeReview />;
}
