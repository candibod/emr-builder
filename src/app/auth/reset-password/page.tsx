import * as React from "react";
import type { Metadata } from "next";

import { config } from "../../../config";
import { Layout } from "../../../components/auth/layout";
import { ResetPasswordForm } from "../../../components/auth/reset-password-form";
import { IdleGuard } from "../../../components/auth/idle-guard";

export const metadata = { title: `Reset password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <IdleGuard>
      <Layout>
        <ResetPasswordForm />
      </Layout>
    </IdleGuard>
  );
}
