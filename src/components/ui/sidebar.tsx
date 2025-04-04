"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// Create context for sidebar state
const SidebarContext = createContext({
  isOpen: true,
  setIsOpen: (value: boolean) => {},
  isMobile: false,
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile on component mount
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-screen flex-col w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 transition-all duration-200",
        !isOpen && "w-0 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-4 border-b border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 overflow-auto p-4", className)}>{children}</div>
  );
}

export function SidebarFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-4 border-t border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="9" y1="3" y2="21" />
      </svg>
    </button>
  );
}

export function SidebarMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn("space-y-2", className)}>{children}</ul>;
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={cn("", className)}>{children}</li>;
}

export function SidebarMenuButton({
  children,
  className,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  [key: string]: any;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
