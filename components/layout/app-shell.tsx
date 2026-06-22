"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { MobileTopBar } from "./mobile-top-bar"
import { BottomNavigation } from "@/components/home/bottom-navigation"
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context"
import { cn } from "@/lib/utils"

// Pages that should NOT show the sidebar/navigation
const excludedPaths = ["/", "/login", "/onboarding", "/reset-password", "/checkout/success"]

interface AppShellProps {
  children: ReactNode
}

function AppShellInner({ children }: AppShellProps) {
  const pathname = usePathname()
  const { collapsed } = useSidebar()

  const isExcluded = excludedPaths.some((path) => pathname === path || (path !== "/" && pathname.startsWith(path)))

  if (isExcluded) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Top Bar */}
      <MobileTopBar />

      {/* Main Content — shifts with sidebar collapse state */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "xl:ml-[72px]" : "xl:ml-[260px]",
          "pb-20 xl:pb-0",
        )}
      >
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellInner>{children}</AppShellInner>
    </SidebarProvider>
  )
}
