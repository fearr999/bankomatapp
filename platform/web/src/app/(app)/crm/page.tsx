"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface ClientRow {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  sitesCount: number;
  workOrdersCount: number;
}

export default function CrmPage() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    try {
      setClients(await apiFetch<ClientRow[]>("/clients"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await apiFetch("/clients", { method: "POST", body: JSON.stringify({ name, phone, email }) });
    setName("");
    setPhone("");
    setEmail("");
    setShowCreate(false);
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">CRM</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={16} /> Новый клиент
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {showCreate && (
        <Card>
          <CardContent className="pt-5">
            <form onSubmit={create} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Название</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Телефон</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button type="submit">Создать</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <Link key={c.id} href={`/crm/${c.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardContent className="flex flex-col gap-1.5 p-4">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.phone ?? "—"}</span>
                <span className="text-xs text-muted-foreground">{c.email ?? "—"}</span>
                <span className="text-xs text-muted-foreground">
                  {c.sitesCount} объект(ов) · {c.workOrdersCount} заявок
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
        {clients.length === 0 && <p className="text-sm text-muted-foreground">Клиентов пока нет.</p>}
      </div>
    </div>
  );
}
