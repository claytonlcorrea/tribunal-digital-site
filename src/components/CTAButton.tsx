"use client";

import type { ReactNode } from "react";
import { useCTAModal } from "./CTAModalProvider";

export default function CTAButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useCTAModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
