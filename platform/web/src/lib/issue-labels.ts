export const ISSUE_TYPES = ["EPIC", "STORY", "TASK", "BUG", "SUBTASK"] as const;
export const ISSUE_STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;
export const ISSUE_PRIORITIES = ["LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST"] as const;

export const ISSUE_TYPE_LABELS: Record<string, string> = {
  EPIC: "Эпик",
  STORY: "История",
  TASK: "Задача",
  BUG: "Баг",
  SUBTASK: "Подзадача",
};

export const ISSUE_TYPE_COLORS: Record<string, string> = {
  EPIC: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  STORY: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  TASK: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  BUG: "bg-red-500/15 text-red-600 dark:text-red-400",
  SUBTASK: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
};

export const ISSUE_STATUS_LABELS: Record<string, string> = {
  BACKLOG: "Бэклог",
  TODO: "К выполнению",
  IN_PROGRESS: "В работе",
  IN_REVIEW: "На проверке",
  DONE: "Готово",
};

export const BOARD_STATUSES = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"] as const;

export const ISSUE_PRIORITY_LABELS: Record<string, string> = {
  LOWEST: "Низший",
  LOW: "Низкий",
  MEDIUM: "Средний",
  HIGH: "Высокий",
  HIGHEST: "Высший",
};

export const ISSUE_PRIORITY_COLORS: Record<string, string> = {
  LOWEST: "text-zinc-400",
  LOW: "text-blue-500",
  MEDIUM: "text-amber-500",
  HIGH: "text-orange-500",
  HIGHEST: "text-red-500",
};
