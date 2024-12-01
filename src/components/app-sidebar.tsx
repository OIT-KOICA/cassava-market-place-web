"use client";

import * as React from "react";
import { Command } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./dashboard/nav-main";
import { NavUser } from "./dashboard/nav-user";
import { dashboardMenuLink } from "@/lib/data";
import { useGetCompany } from "@/domain/query/configuration-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { company } = useGetCompany(session?.accessToken);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {(company && company.name) ?? ""}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {company && company.serviceType === "PRODUCT_VENDOR" ? (
          <NavMain title="Outils" items={dashboardMenuLink.productNavMain} />
        ) : company?.serviceType === "SERVICE_VENDOR" ? (
          <NavMain title="Outils" items={dashboardMenuLink.serviceNavMain} />
        ) : (
          <NavMain title="Outils" items={dashboardMenuLink.supportNavMain} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
