import { LayoutGrid, Loader2, Plus, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { SidebarFooterComponent } from "./sidebar-footer";
import { Suspense } from "react";
import ThreadsLists from "./threads-list";
import { cn } from "@/lib/utils";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#171717] border-none text-sidebar-foreground transition-all duration-300 ease-in-out"
      {...props}
    >
      <SidebarHeader className="px-2 pt-3.5">
        <div className="flex justify-between group-data-[collapsible=icon]:justify-center items-center">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={30}
              height={30}
              className="rounded-lg shrink-0"
              priority
            />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <SidebarTrigger className="hover:bg-[#2f2f2f] w-8 h-8 text-[#b4b4b4] transition-colors" />
          </div>
        </div>
      </SidebarHeader>

      {/* REMOVED group-data-[collapsible=icon]:hidden from SidebarContent */}
      <SidebarContent className="mt-2 px-1">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-0">
            {[
              { title: "New chat", icon: Plus, href: "/" },
              { title: "Search", icon: Search, href: "/" },
              {
                title: "Images",
                icon: LayoutGrid,
                href: "/",
              },
            ].map((item) => (
              <SidebarMenuItem
                key={item.title}
                className="relative flex justify-cente"
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "data-[state=open]:bg-[#2f2f2f] hover:bg-[#2f2f2f] h-9 text-[#ececec] transition-colors",
                    // Centering logic for collapsed state
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
                  )}
                >
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden ml-3 font-normal text-[14px]">
                    {item.title}
                  </span>
                  <Link
                    href={item.href}
                    className="absolute inset-0 cursor-pointer"
                  ></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* <Suspense fallback={<Loader2 />}> */}
        <ThreadsLists />
        {/* </Suspense> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterComponent />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
