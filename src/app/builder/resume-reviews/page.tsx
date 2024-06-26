import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { ResumeReviews } from "../../../components/builder/reviews/resume-reviews";

export const metadata = { title: `Resume Reviews | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <ResumeReviews />;
}
