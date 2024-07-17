import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";

export const metadata = { title: `Scraper Jobs | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <p>Please select a Log Report in Logs, to fetch jobs</p>;
}
