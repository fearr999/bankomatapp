"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

interface ClientDetail {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  sites: Array<{
    id: string;
    name: string;
    address: string | null;
    equipment: Array<{ id: string; name: string; status: string }>;
  }>;
  workOrders: Array<{ id: string; number: string; title: string; status: string; updatedAt: string }>;
  contracts: Array<{ id: string; number: string; startDate: string | null; endDate: string | null }>;
  interactions: Array<{
    id: string;
    type: string;
    message: string;
    createdAt: string;
    user?: { name: string } | null;
  }>;
}

const INTERACTION_LABELS: Record<string, string> = {
  call: "Звонок",
  meeting: "Встреча",
  email: "Письмо",
  note: "Заметка",
};

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contractNumber, setContractNumber] = useState("");
  const [interactionType, setInteractionType] = useState("call");
  const [interactionMsg, setInteractionMsg] = useState("");

  async function load() {
    try {
      setClient(await apiFetch<ClientDetail>(`/clients/${params.id}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function addContract(e: React.FormEvent) {
    e.preventDefault();
    if (!contractNumber.trim()) return;
    await apiFetch(`/clients/${params.id}/contracts`, {
      method: "POST",
      body: JSON.stringify({ number: contractNumber }),
    });
    setContractNumber("");
    await load();
  }

  async function addInteraction(e: React.FormEvent) {
    e.preventDefault();
    if (!interactionMsg.trim()) return;
    await apiFetch(`/clients/${params.id}/interactions`, {
      method: "POST",
      body: JSON.stringify({ type: interactionType, message: interactionMsg }),
    });
    setInteractionMsg("");
    await load();
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!client) return <PageLoader />;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <h1 className="text-2xl font-semibold tracking-tight">{client.name}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Контакты</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Телефон: {client.phone ?? "—"}</span>
            <span className="text-muted-foreground">Email: {client.email ?? "—"}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Объекты и оборудование</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {client.sites.map((s) => (
              <div key={s.id} className="rounded-md border p-3 text-sm">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.address}</div>
                {s.equipment.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {s.equipment.map((e) => (
                      <Link
                        key={e.id}
                        href={`/equipment/${e.id}`}
                        className="rounded bg-muted px-2 py-0.5 text-xs hover:underline"
                      >
                        {e.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {client.sites.length === 0 && (
              <p className="text-sm text-muted-foreground">Объектов пока нет</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Заявки</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {client.workOrders.map((o) => (
              <Link
                key={o.id}
                href={`/work-orders/${o.id}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40"
              >
                <span>
                  <span className="font-medium">{o.number}</span>{" "}
                  <span className="text-muted-foreground">{o.title}</span>
                </span>
                <Badge status={o.status} />
              </Link>
            ))}
            {client.workOrders.length === 0 && (
              <p className="text-sm text-muted-foreground">Заявок пока нет</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>История взаимодействий</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {client.interactions.map((i) => (
              <div key={i.id} className="border-b pb-2 text-sm last:border-0">
                <div className="flex items-center justify-between">
                  <span>
                    <span className="font-medium">{INTERACTION_LABELS[i.type] ?? i.type}:</span>{" "}
                    {i.message}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(i.createdAt).toLocaleString("ru-RU")}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{i.user?.name ?? "—"}</span>
              </div>
            ))}
            <form onSubmit={addInteraction} className="flex gap-2 pt-2">
              <select
                className="h-9 rounded-md border bg-transparent px-2 text-sm"
                value={interactionType}
                onChange={(e) => setInteractionType(e.target.value)}
              >
                {Object.entries(INTERACTION_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Что обсудили..."
                value={interactionMsg}
                onChange={(e) => setInteractionMsg(e.target.value)}
              />
              <Button type="submit">Добавить</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Договоры</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {client.contracts.map((c) => (
            <div key={c.id} className="rounded-md border p-2 text-sm">
              <div className="font-medium">{c.number}</div>
              <div className="text-xs text-muted-foreground">
                {c.startDate ? new Date(c.startDate).toLocaleDateString("ru-RU") : "—"} —{" "}
                {c.endDate ? new Date(c.endDate).toLocaleDateString("ru-RU") : "бессрочно"}
              </div>
            </div>
          ))}
          {client.contracts.length === 0 && (
            <p className="text-sm text-muted-foreground">Договоров пока нет</p>
          )}
          <form onSubmit={addContract} className="flex gap-2 pt-2">
            <Input
              placeholder="№ договора"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
            />
            <Button type="submit">+</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
