import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { Layout } from "../../../components/auth/layout";
import { NewJob } from "../../../components/builder/resume/new-job";

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function ResumeReviews(): React.JSX.Element {
  return (
    <Layout>
      <NewJob />
    </Layout>
  );
}
