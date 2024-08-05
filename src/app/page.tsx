import * as React from "react";
import type { Metadata } from "next";

import { config } from "../config";
import { IdleGuard } from "../components/auth/idle-guard";
import LandingPageTemplate from "../components/landing-page/template";

export const metadata = { title: `Elevate My Resume` } satisfies Metadata;

export default function Login(): React.JSX.Element {
  return (
    <IdleGuard>
      <LandingPageTemplate />
    </IdleGuard>
  );
}
