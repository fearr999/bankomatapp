"use client";

import { useLocale } from "@/lib/i18n/context";

export const ISSUE_TYPES = ["EPIC", "STORY", "TASK", "BUG", "SUBTASK"] as const;
export const ISSUE_STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;
export const ISSUE_PRIORITIES = ["LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST"] as const;

export const ISSUE_TYPE_COLORS: Record<string, string> = {
  EPIC: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  STORY: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  TASK: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  BUG: "bg-red-500/15 text-red-600 dark:text-red-400",
  SUBTASK: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
};

export const BOARD_STATUSES = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;

export const ISSUE_PRIORITY_COLORS: Record<string, string> = {
  LOWEST: "text-zinc-400",
  LOW: "text-blue-500",
  MEDIUM: "text-amber-500",
  HIGH: "text-orange-500",
  HIGHEST: "text-red-500",
};

export function useIssueTypeLabels() {
  return useLocale().t.issueType;
}

export function useIssueStatusLabels() {
  return useLocale().t.issueStatus;
}

export function useIssuePriorityLabels() {
  return useLocale().t.issuePriority;
}
