import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { LogList } from "../../../components/scraper/logs/log-list";

export const metadata = { title: `Scraper Logs | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <LogList />;
}
