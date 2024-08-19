import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { InputForm } from "../../../components/quick-tools/keywords/input-form";

export const metadata = { title: `Quick Tools - Get Keywords | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <InputForm />;
}
