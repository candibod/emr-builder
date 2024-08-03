import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { UploadsList } from "../../../components/builder/resume/uploads-list";

export const metadata = { title: `Match Stats | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <UploadsList />;
}
