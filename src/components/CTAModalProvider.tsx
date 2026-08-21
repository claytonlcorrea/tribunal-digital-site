"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import CTAModal from "./CTAModal";

const CTAModalContext = createContext<{ open: () => void } | null>(null);

export function CTAModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CTAModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <CTAModal open={isOpen} onClose={() => setIsOpen(false)} />
    </CTAModalContext.Provider>
  );
}

export function useCTAModal() {
  const ctx = useContext(CTAModalContext);
  if (!ctx) {
    throw new Error("useCTAModal precisa estar dentro de <CTAModalProvider>");
  }
  return ctx;
}
