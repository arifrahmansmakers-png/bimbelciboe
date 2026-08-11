import { ReactNode } from "react";

import MemberShell from "@/components/dashboard/MemberShell";

interface Props {
  children: ReactNode;
}

export default function MemberLayout({
  children,
}: Props) {
  return (
    <MemberShell>
      {children}
    </MemberShell>
  );
}