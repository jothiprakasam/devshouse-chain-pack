"use client"

import type React from "react"

import { WagmiConfig } from "wagmi"
import { config } from "@/lib/wagmi"

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

