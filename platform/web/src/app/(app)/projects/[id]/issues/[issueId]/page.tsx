"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Paperclip, Trash2, X, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch, API_BASE } from "@/lib/api";
import {
  ISSUE_TYPES,
  ISSUE_TYPE_LABELS,
  ISSUE_TYPE_COLORS,
  ISSUE_STATUSES,
  ISSUE_STATUS_LABELS,
  ISSUE_PRIORITIES,
  ISSUE_PRIORITY_LABELS,
} from "@/lib/issue-labels";

interface IssueDetail {
  id: string;
  number: number;
  type: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  labels: string[];
  storyPoints: number | null;
  dueDate: string | null;
  project: { id: string; name: string; key: string };
  assignee: { id: string; name: string } | null;
  reporter: { id: string; name: string };
  epic: { id: string; number: number; title: string } | null;
  parent: { id: string; number: number; title: string; status: string } | null;
  subtasks: Array<{ id: string; number: number; title: string; status: string; assignee: { id: string; name: string } | null }>;
  epicChildren: Array<{ id: string; number: number; title: string; status: string; type: string }>;
  sprint: { id: string; name: string; status: string } | null;
  attachments: Array<{ id: string; url: string; createdAt: string; uploadedBy: { name: string } | null }>;
  events: Array<{ id: string; type: string; message: string; createdAt: string; user: { name: string } | null }>;
}

interface UserOption {
  id: string;
  name: string;
}

export default function IssueDetailPage() {
  const params = useParams<{ id: string; issueId: string }>();
  const router = useRouter();
  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [epics, setEpics] = useState<Array<{ id: string; title: string }>>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [descDraft, setDescDraft] = useState("");
  const [editingDesc, setEditingDesc] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    try {
      const [i, e, u] = await Promise.all([
        apiFetch<IssueDetail>(`/issues/${params.issueId}`),
        apiFetch<Array<{ id: string; title: string }>>(`/projects/${params.id}/issues?type=EPIC`),
        apiFetch<UserOption[]>("/users"),
      ]);
      setIssue(i);
      setDescDraft(i.description ?? "");
      setEpics(e.filter((ep) => ep.id !== params.issueId));
      setUsers(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.issueId]);

  async function patch(data: Record<string, unknown>) {
    await apiFetch(`/issues/${params.issueId}`, { method: "PATCH", body: JSON.stringify(data) });
    await load();
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    await apiFetch(`/issues/${params.issueId}/comments`, { method: "POST", body: JSON.stringify({ message: comment }) });
    setComment("");
    await load();
  }

  async function addLabel(e: React.FormEvent) {
    e.preventDefault();
    if (!labelInput.trim() || !issue) return;
    await patch({ labels: [...issue.labels, labelInput.trim()] });
    setLabelInput("");
  }

  async function removeLabel(label: string) {
    if (!issue) return;
    await patch({ labels: issue.labels.filter((l) => l !== label) });
  }

  async function addSubtask(e: React.FormEvent) {
    e.preventDefault();
    if (!subtaskTitle.trim()) return;
    await apiFetch(`/projects/${params.id}/issues`, {
      method: "POST",
      body: JSON.stringify({ title: subtaskTitle, parentId: params.issueId }),
    });
    setSubtaskTitle("");
    await load();
  }

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      await apiFetch(`/issues/${params.issueId}/attachments`, { method: "POST", body: form });
      await load();
    } finally {
      setUploading(false);
    }
  }

  async function deleteIssue() {
    if (!confirm("Удалить задачу без возможности восстановления?")) return;
    await apiFetch(`/issues/${params.issueId}`, { method: "DELETE" });
    router.push(`/projects/${params.id}`);
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!issue) return <PageLoader />;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex items-center gap-2">
          <Link href={`/projects/${params.id}`} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </Link>
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${ISSUE_TYPE_COLORS[issue.type]}`}>
            {ISSUE_TYPE_LABELS[issue.type]}
          </span>
          <span className="text-sm text-muted-foreground">
            {issue.project.key}-{issue.number}
          </span>
          <Button variant="ghost" className="ml-auto text-red-500" onClick={deleteIssue}>
            <Trash2 size={16} />
          </Button>
        </div>

        <h1 className="text-xl font-semibold tracking-tight">{issue.title}</h1>

        {issue.parent && (
          <p className="text-sm text-muted-foreground">
            Подзадача{" "}
            <Link href={`/projects/${params.id}/issues/${issue.parent.id}`} className="underline">
              {issue.project.key}-{issue.parent.number} {issue.parent.title}
            </Link>
          </p>
        )}
        {issue.epic && (
          <p className="text-sm text-muted-foreground">
            Эпик:{" "}
            <Link href={`/projects/${params.id}/issues/${issue.epic.id}`} className="underline">
              {issue.project.key}-{issue.epic.number} {issue.epic.title}
            </Link>
          </p>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Описание</CardTitle>
          </CardHeader>
          <CardContent>
            {editingDesc ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="min-h-24 w-full rounded-md border bg-transparent p-2 text-sm"
                  value={descDraft}
                  onChange={(e) => setDescDraft(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={async () => {
                      await patch({ description: descDraft });
                      setEditingDesc(false);
                    }}
                  >
                    Сохранить
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingDesc(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <p
                className="cursor-text whitespace-pre-wrap text-sm text-muted-foreground"
                onClick={() => setEditingDesc(true)}
              >
                {issue.description || "Нажмите, чтобы добавить описание..."}
              </p>
            )}
          </CardContent>
        </Card>

        {issue.type === "EPIC" && (
          <Card>
            <CardHeader>
              <CardTitle>Задачи эпика ({issue.epicChildren.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5">
              {issue.epicChildren.map((c) => (
                <Link
                  key={c.id}
                  href={`/projects/${params.id}/issues/${c.id}`}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
                >
                  <span>
                    {issue.project.key}-{c.number} {c.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{ISSUE_STATUS_LABELS[c.status]}</span>
                </Link>
              ))}
              {issue.epicChildren.length === 0 && <EmptyState icon={ListChecks} title="Пока нет задач" size="sm" bordered={false} />}
            </CardContent>
          </Card>
        )}

        {issue.type !== "SUBTASK" && (
          <Card>
            <CardHeader>
              <CardTitle>Подзадачи ({issue.subtasks.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {issue.subtasks.map((s) => (
                <Link
                  key={s.id}
                  href={`/projects/${params.id}/issues/${s.id}`}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
                >
                  <span>
                    {issue.project.key}-{s.number} {s.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {s.assignee?.name ?? "—"} · {ISSUE_STATUS_LABELS[s.status]}
                  </span>
                </Link>
              ))}
              <form onSubmit={addSubtask} className="flex gap-2 pt-1">
                <Input
                  placeholder="Новая подзадача..."
                  value={subtaskTitle}
                  onChange={(e) => setSubtaskTitle(e.target.value)}
                />
                <Button type="submit">Добавить</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Вложения</CardTitle>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                <Paperclip size={16} /> {uploading ? "Загружаем..." : "Прикрепить"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(file);
                  e.target.value = "";
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {issue.attachments.map((a) => (
              <a
                key={a.id}
                href={`${API_BASE}${a.url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
              >
                <span>{a.url.split("/").pop()}</span>
                <span className="text-xs text-muted-foreground">{a.uploadedBy?.name ?? "—"}</span>
              </a>
            ))}
            {issue.attachments.length === 0 && <p className="text-sm text-muted-foreground">Вложений нет</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Комментарии и история</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {issue.events.map((e) => (
              <div key={e.id} className="border-b pb-2 text-sm last:border-0">
                <div className="flex items-center justify-between">
                  <span>{e.message}</span>
                  <span className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString("ru-RU")}</span>
                </div>
                <span className="text-xs text-muted-foreground">{e.user?.name ?? "система"}</span>
              </div>
            ))}
            <form onSubmit={addComment} className="flex gap-2 pt-2">
              <Input placeholder="Добавить комментарий..." value={comment} onChange={(e) => setComment(e.target.value)} />
              <Button type="submit">Отправить</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Детали</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Статус</label>
            <select
              className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
              value={issue.status}
              onChange={(e) => patch({ status: e.target.value })}
            >
              {ISSUE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {ISSUE_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Тип</label>
            <select
              className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
              value={issue.type}
              onChange={(e) => patch({ type: e.target.value })}
            >
              {ISSUE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ISSUE_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Приоритет</label>
            <select
              className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
              value={issue.priority}
              onChange={(e) => patch({ priority: e.target.value })}
            >
              {ISSUE_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {ISSUE_PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Исполнитель</label>
            <select
              className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
              value={issue.assignee?.id ?? ""}
              onChange={(e) => patch({ assigneeId: e.target.value || null })}
            >
              <option value="">Без исполнителя</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          {issue.type !== "EPIC" && issue.type !== "SUBTASK" && (
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Эпик</label>
              <select
                className="h-9 w-full rounded-md border bg-transparent px-2 text-sm"
                value={issue.epic?.id ?? ""}
                onChange={(e) => patch({ epicId: e.target.value || null })}
              >
                <option value="">Без эпика</option>
                {epics.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Story points</label>
            <Input
              type="number"
              defaultValue={issue.storyPoints ?? ""}
              onBlur={(e) => patch({ storyPoints: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Срок</label>
            <Input
              type="date"
              defaultValue={issue.dueDate ? issue.dueDate.slice(0, 10) : ""}
              onBlur={(e) => patch({ dueDate: e.target.value ? new Date(e.target.value).toISOString() : null })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Метки</label>
            <div className="mb-1.5 flex flex-wrap gap-1">
              {issue.labels.map((l) => (
                <span key={l} className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                  {l}
                  <button
                    onClick={() => removeLabel(l)}
                    aria-label="Удалить метку"
                    className="transition-colors hover:text-red-500"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={addLabel} className="flex gap-1.5">
              <Input
                placeholder="Новая метка..."
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                className="h-8 text-xs"
              />
              <Button type="submit" size="sm">
                +
              </Button>
            </form>
          </div>
          <div className="border-t pt-2 text-xs text-muted-foreground">
            <p>Автор: {issue.reporter.name}</p>
            {issue.sprint && <p>Спринт: {issue.sprint.name}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
