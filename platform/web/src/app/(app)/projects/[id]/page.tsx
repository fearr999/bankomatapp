"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Plus, Play, Check, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";
import {
  ISSUE_TYPES,
  ISSUE_TYPE_COLORS,
  ISSUE_STATUSES,
  ISSUE_PRIORITIES,
  ISSUE_PRIORITY_COLORS,
  useIssueTypeLabels,
  useIssueStatusLabels,
  useIssuePriorityLabels,
} from "@/lib/issue-labels";

interface IssueRow {
  id: string;
  number: number;
  type: string;
  title: string;
  status: string;
  priority: string;
  labels: string[];
  sprintId: string | null;
  epicId: string | null;
  assignee: { id: string; name: string } | null;
}

interface SprintRow {
  id: string;
  name: string;
  goal: string | null;
  status: "PLANNED" | "ACTIVE" | "COMPLETED";
  _count: { issues: number };
}

interface ProjectDetail {
  id: string;
  name: string;
  key: string;
  description: string | null;
}

interface UserOption {
  id: string;
  name: string;
}

function IssueCard({ issue, projectId }: { issue: IssueRow; projectId: string }) {
  const typeLabels = useIssueTypeLabels();
  const priorityLabels = useIssuePriorityLabels();
  return (
    <Link
      href={`/projects/${projectId}/issues/${issue.id}`}
      className="flex flex-col gap-1.5 rounded-md border bg-card p-2.5 text-sm hover:border-primary"
    >
      <div className="flex items-center gap-1.5">
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${ISSUE_TYPE_COLORS[issue.type]}`}>
          {typeLabels[issue.type as keyof typeof typeLabels]}
        </span>
        <span className="text-[10px] text-muted-foreground">{issue.number}</span>
      </div>
      <p className="leading-snug">{issue.title}</p>
      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {issue.labels.map((l) => (
            <span key={l} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-0.5">
        <span className={`text-[10px] font-medium ${ISSUE_PRIORITY_COLORS[issue.priority]}`}>
          {priorityLabels[issue.priority as keyof typeof priorityLabels]}
        </span>
        {issue.assignee && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-medium">
            {issue.assignee.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    </Link>
  );
}

interface Filters {
  type: string;
  priority: string;
  assigneeId: string;
  label: string;
  search: string;
}

function applyFilters(issues: IssueRow[], f: Filters) {
  return issues.filter(
    (i) =>
      (!f.type || i.type === f.type) &&
      (!f.priority || i.priority === f.priority) &&
      (!f.assigneeId || i.assignee?.id === f.assigneeId) &&
      (!f.label || i.labels.includes(f.label)) &&
      (!f.search || i.title.toLowerCase().includes(f.search.toLowerCase()))
  );
}

function FiltersBar({
  filters,
  setFilters,
  users,
  labels,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  users: UserOption[];
  labels: string[];
}) {
  const { t } = useLocale();
  const typeLabels = useIssueTypeLabels();
  const priorityLabels = useIssuePriorityLabels();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t.projects.search}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-48 pl-7"
        />
      </div>
      <select
        className="h-9 rounded-md border bg-transparent px-2 text-sm"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">{t.projects.allTypes}</option>
        {ISSUE_TYPES.map((ty) => (
          <option key={ty} value={ty}>
            {typeLabels[ty]}
          </option>
        ))}
      </select>
      <select
        className="h-9 rounded-md border bg-transparent px-2 text-sm"
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">{t.projects.allPriorities}</option>
        {ISSUE_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {priorityLabels[p]}
          </option>
        ))}
      </select>
      <select
        className="h-9 rounded-md border bg-transparent px-2 text-sm"
        value={filters.assigneeId}
        onChange={(e) => setFilters({ ...filters, assigneeId: e.target.value })}
      >
        <option value="">{t.projects.allAssignees}</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      {labels.length > 0 && (
        <select
          className="h-9 rounded-md border bg-transparent px-2 text-sm"
          value={filters.label}
          onChange={(e) => setFilters({ ...filters, label: e.target.value })}
        >
          <option value="">{t.projects.allLabels}</option>
          {labels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

function CreateIssueForm({
  onCreate,
  users,
  busy,
}: {
  onCreate: (data: { title: string; type: string; priority: string; assigneeId?: string }) => void;
  users: UserOption[];
  busy: boolean;
}) {
  const { t } = useLocale();
  const typeLabels = useIssueTypeLabels();
  const priorityLabels = useIssuePriorityLabels();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("TASK");
  const [priority, setPriority] = useState("MEDIUM");
  const [assigneeId, setAssigneeId] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onCreate({ title, type, priority, assigneeId: assigneeId || undefined });
        setTitle("");
      }}
      className="flex flex-wrap items-center gap-2 rounded-md border border-dashed p-2"
    >
      <select className="h-8 rounded-md border bg-transparent px-1.5 text-xs" value={type} onChange={(e) => setType(e.target.value)}>
        {ISSUE_TYPES.filter((ty) => ty !== "SUBTASK").map((ty) => (
          <option key={ty} value={ty}>
            {typeLabels[ty]}
          </option>
        ))}
      </select>
      <Input
        placeholder={t.projects.taskTitlePlaceholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-8 flex-1 text-sm"
      />
      <select className="h-8 rounded-md border bg-transparent px-1.5 text-xs" value={priority} onChange={(e) => setPriority(e.target.value)}>
        {ISSUE_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {priorityLabels[p]}
          </option>
        ))}
      </select>
      <select
        className="h-8 rounded-md border bg-transparent px-1.5 text-xs"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
      >
        <option value="">{t.projects.noAssignee}</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <Button type="submit" size="sm" disabled={busy}>
        <Plus size={14} /> {t.projects.add}
      </Button>
    </form>
  );
}

export default function ProjectDetailPage() {
  const { t } = useLocale();
  const statusLabels = useIssueStatusLabels();
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [issues, setIssues] = useState<IssueRow[]>([]);
  const [sprints, setSprints] = useState<SprintRow[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [tab, setTab] = useState<"board" | "backlog">("board");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [filters, setFilters] = useState<Filters>({ type: "", priority: "", assigneeId: "", label: "", search: "" });

  async function load() {
    try {
      const [p, i, s, u] = await Promise.all([
        apiFetch<ProjectDetail>(`/projects/${params.id}`),
        apiFetch<IssueRow[]>(`/projects/${params.id}/issues`),
        apiFetch<SprintRow[]>(`/projects/${params.id}/sprints`),
        apiFetch<UserOption[]>("/users"),
      ]);
      setProject(p);
      setIssues(i);
      setSprints(s);
      setUsers(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.projects.loadError);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const activeSprint = sprints.find((s) => s.status === "ACTIVE") ?? null;
  const plannedSprints = sprints.filter((s) => s.status === "PLANNED");

  const filteredIssues = useMemo(() => applyFilters(issues, filters), [issues, filters]);
  const allLabels = useMemo(() => Array.from(new Set(issues.flatMap((i) => i.labels))).sort(), [issues]);

  async function createIssue(sprintId: string | undefined, data: { title: string; type: string; priority: string; assigneeId?: string }) {
    setBusy(true);
    try {
      await apiFetch(`/projects/${params.id}/issues`, {
        method: "POST",
        body: JSON.stringify({ ...data, sprintId }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.projects.createError);
    } finally {
      setBusy(false);
    }
  }

  async function createSprint() {
    setBusy(true);
    try {
      await apiFetch(`/projects/${params.id}/sprints`, {
        method: "POST",
        body: JSON.stringify({ name: `${t.projects.sprintName} ${sprints.length + 1}` }),
      });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function startSprint(id: string) {
    setError(null);
    try {
      await apiFetch(`/sprints/${id}/start`, { method: "POST" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.projects.startSprintError);
    }
  }

  async function completeSprint(id: string) {
    await apiFetch(`/sprints/${id}/complete`, { method: "POST" });
    await load();
  }

  async function onDragEnd(result: DropResult) {
    const { destination, draggableId } = result;
    if (!destination) return;

    if (tab === "board") {
      const newStatus = destination.droppableId;
      setIssues((prev) => prev.map((i) => (i.id === draggableId ? { ...i, status: newStatus } : i)));
      await apiFetch(`/issues/${draggableId}`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) });
    } else {
      const newSprintId = destination.droppableId === "backlog" ? null : destination.droppableId;
      setIssues((prev) => prev.map((i) => (i.id === draggableId ? { ...i, sprintId: newSprintId } : i)));
      await apiFetch(`/issues/${draggableId}`, { method: "PATCH", body: JSON.stringify({ sprintId: newSprintId }) });
    }
  }

  if (error && !project) return <p className="text-sm text-red-500">{error}</p>;
  if (!project) return <PageLoader />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
          <p className="text-xs text-muted-foreground">{project.key}</p>
        </div>
        <div className="flex gap-2">
          {(["board", "backlog"] as const).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`h-9 rounded-full px-4 text-sm transition-all duration-150 active:scale-95 ${
                tab === tabKey ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {tabKey === "board" ? t.projects.board : t.projects.backlog}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <FiltersBar filters={filters} setFilters={setFilters} users={users} labels={allLabels} />

      <DragDropContext onDragEnd={onDragEnd}>
        {tab === "board" ? (
          activeSprint ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {ISSUE_STATUSES.map((status) => {
                const columnIssues = filteredIssues.filter(
                  (i) => i.sprintId === activeSprint.id && i.status === status
                );
                return (
                  <Droppable droppableId={status} key={status}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                        <p className="px-1 text-xs font-medium text-muted-foreground">
                          {statusLabels[status]} ({columnIssues.length})
                        </p>
                        <div className="flex min-h-[80px] flex-col gap-2 rounded-lg bg-muted/30 p-2">
                          {columnIssues.map((issue, idx) => (
                            <Draggable draggableId={issue.id} index={idx} key={issue.id}>
                              {(dragProvided) => (
                                <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                  <IssueCard issue={issue} projectId={project.id} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <p className="text-sm text-muted-foreground">{t.projects.noActiveSprint}</p>
                <Button variant="outline" onClick={() => setTab("backlog")}>
                  {t.projects.goToBacklog}
                </Button>
              </CardContent>
            </Card>
          )
        ) : (
          <div className="flex flex-col gap-4">
            {sprints
              .filter((s) => s.status !== "COMPLETED")
              .map((sprint) => {
                const sprintIssues = filteredIssues.filter((i) => i.sprintId === sprint.id);
                return (
                  <Card key={sprint.id}>
                    <CardContent className="flex flex-col gap-2 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{sprint.name}</span>
                          {sprint.status === "ACTIVE" && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-600">
                              {t.projects.active}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">{sprintIssues.length} {t.projects.tasksCount}</span>
                        </div>
                        {sprint.status === "PLANNED" ? (
                          <Button size="sm" variant="outline" onClick={() => startSprint(sprint.id)}>
                            <Play size={14} /> {t.projects.startSprint}
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => completeSprint(sprint.id)}>
                            <Check size={14} /> {t.projects.completeSprint}
                          </Button>
                        )}
                      </div>
                      <Droppable droppableId={sprint.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="flex min-h-[40px] flex-col gap-1.5">
                            {sprintIssues.map((issue, idx) => (
                              <Draggable draggableId={issue.id} index={idx} key={issue.id}>
                                {(dragProvided) => (
                                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                    <IssueCard issue={issue} projectId={project.id} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CreateIssueForm onCreate={(d) => createIssue(sprint.id, d)} users={users} busy={busy} />
                    </CardContent>
                  </Card>
                );
              })}

            <Card>
              <CardContent className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t.projects.backlog}</span>
                  <Button size="sm" variant="outline" onClick={createSprint} disabled={busy}>
                    <Plus size={14} /> {t.projects.createSprint}
                  </Button>
                </div>
                <Droppable droppableId="backlog">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex min-h-[40px] flex-col gap-1.5">
                      {filteredIssues
                        .filter((i) => i.sprintId === null)
                        .map((issue, idx) => (
                          <Draggable draggableId={issue.id} index={idx} key={issue.id}>
                            {(dragProvided) => (
                              <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                <IssueCard issue={issue} projectId={project.id} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <CreateIssueForm onCreate={(d) => createIssue(undefined, d)} users={users} busy={busy} />
              </CardContent>
            </Card>

            {plannedSprints.length === 0 && sprints.every((s) => s.status === "COMPLETED") && sprints.length > 0 && (
              <p className="text-xs text-muted-foreground">{t.projects.allSprintsCompleted}</p>
            )}
          </div>
        )}
      </DragDropContext>
    </div>
  );
}
