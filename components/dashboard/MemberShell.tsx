"use client";

import { ReactNode } from "react";

interface MemberShellProps {
  children: ReactNode;
}

export default function MemberShell({
  children,
}: MemberShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}