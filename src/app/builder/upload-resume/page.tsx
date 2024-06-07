import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { UploadResume } from "../../../components/builder/resume/upload";

export const metadata = { title: `Account | Resume Upload | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <UploadResume></UploadResume>;
}
