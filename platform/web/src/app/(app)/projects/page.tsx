"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Kanban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/context";

interface ProjectRow {
  id: string;
  name: string;
  key: string;
  description: string | null;
  _count: { issues: number };
}

export default function ProjectsPage() {
  const { t } = useLocale();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setProjects(await apiFetch<ProjectRow[]>("/projects"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t.projects.loadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await apiFetch("/projects", { method: "POST", body: JSON.stringify({ name, key, description }) });
      setName("");
      setKey("");
      setDescription("");
      setShowCreate(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.projects.createError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t.projects.title}</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> {t.projects.newProject}
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={create} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.projects.name}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{t.projects.key}</label>
                <Input
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  className="w-28 uppercase"
                  maxLength={10}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">{t.projects.description}</label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <Button type="submit" disabled={busy}>
                {busy ? t.projects.creating : t.projects.create}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading ? (
        <PageLoader />
      ) : projects.length === 0 ? (
        <EmptyState icon={Kanban} title={t.projects.empty} description={t.projects.emptyDescription} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Kanban size={16} />
                    </span>
                    <div>
                      <p className="font-medium leading-tight">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.key}</p>
                    </div>
                  </div>
                  {p.description && <p className="text-xs text-muted-foreground">{p.description}</p>}
                  <p className="text-xs text-muted-foreground">{p._count.issues} {t.projects.tasksCount}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
