import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { Layout } from "../../../components/auth/layout";
import AuthAction from "../../../components/auth/action";
import { IdleGuard } from "../../../components/auth/idle-guard";

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function Action(): React.JSX.Element {
  return (
    <IdleGuard>
      <Layout>
        <AuthAction />
      </Layout>
    </IdleGuard>
  );
}
