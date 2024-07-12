"use client";

import * as React from "react";

export interface IdleGuardProps {
  children: React.ReactNode;
}

export function IdleGuard({ children }: IdleGuardProps): React.JSX.Element | null {
  const [isChecking, setIsChecking] = React.useState<boolean>(false);

  if (isChecking) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
