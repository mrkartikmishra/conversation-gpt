"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchThreads } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

type Thread = {
  title: string;
  id: string;
  createdAt: Date;
};

export function ThreadsLists() {
  const { data, isLoading, isError, error } = useQuery<Thread[]>({
    queryKey: ["threads"],
    queryFn: () => fetchThreads(),
  });

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <SidebarMenuItem
              key={item}
              className="group/item relative pointer-events-none"
            >
              <SidebarMenuButton
                className={cn(
                  "px-3 pr-10 rounded-lg h-9 transition-all cursor-pointer",
                  "hover:bg-transparent",
                )}
              >
                <Skeleton className="bg-[#212121] w-full h-full" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </>
    );
  }

  if (isError) {
    return (
      <span className="pl-3">{`Error loading threads: ${error.message}`}</span>
    );
  }

  const threadMenuContent = (
    <>
      {data?.length === 0 ? (
        <span className="pl-3">No old chat</span>
      ) : (
        data?.map((thread) => {
          return (
            <SidebarMenuItem
              key={thread.id}
              className="group/item relative pointer-events-none"
            >
              <SidebarMenuButton
                className={cn(
                  "px-3 pr-10 rounded-lg h-9 transition-all cursor-pointer",
                  "hover:bg-transparent",
                )}
              >
                <span>{thread.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })
      )}
    </>
  );

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
        <SidebarGroupLabel className="mt-4 mb-1 px-3 font-medium text-[#b4b4b4] text-[12px]">
          Recent
        </SidebarGroupLabel>
        <SidebarMenu className="gap-0.5">{threadMenuContent}</SidebarMenu>
      </SidebarGroup>
    </>
  );
}

export default ThreadsLists;
