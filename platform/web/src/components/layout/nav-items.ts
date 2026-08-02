import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Map,
  MapPinned,
  Users,
  UsersRound,
  Camera,
  ListChecks,
  Wrench,
  Warehouse,
  Building2,
  BarChart3,
  Bell,
  Plug,
  Landmark,
  Sparkles,
  Kanban,
  Route,
  SprayCan,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/context";

export interface NavItem {
  href: string;
  labelKey: keyof Dictionary["nav"];
  icon: LucideIcon;
  live: boolean;
  // Виден в ограниченном "кабинете подрядчика" — только разделы из ТЗ:
  // Мои заявки/Карта объектов/Фотоотчёты/Чек-листы/Уведомления.
  contractorVisible?: boolean;
}

// Порядок и состав — по разделам ТЗ. `live: false` — заготовка страницы,
// модуль ещё не реализован (следующие этапы), но уже виден в архитектуре.
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard, live: true },
  { href: "/projects", labelKey: "projects", icon: Kanban, live: true },
  { href: "/work-orders", labelKey: "workOrders", icon: ClipboardList, live: true, contractorVisible: true },
  { href: "/dispatch", labelKey: "dispatch", icon: Map, live: true },
  { href: "/employees", labelKey: "employees", icon: Users, live: true },
  { href: "/teams", labelKey: "teams", icon: UsersRound, live: true },
  { href: "/territories", labelKey: "territories", icon: Route, live: true },
  { href: "/photo-reports", labelKey: "photoReports", icon: Camera, live: true, contractorVisible: true },
  { href: "/checklists", labelKey: "checklists", icon: ListChecks, live: true, contractorVisible: true },
  { href: "/map", labelKey: "map", icon: MapPinned, live: true, contractorVisible: true },
  { href: "/equipment", labelKey: "equipment", icon: Wrench, live: true },
  { href: "/warehouse", labelKey: "warehouse", icon: Warehouse, live: true },
  { href: "/crm", labelKey: "crm", icon: Building2, live: true },
  { href: "/organizations", labelKey: "organizations", icon: Building2, live: true },
  { href: "/analytics", labelKey: "analytics", icon: BarChart3, live: true },
  { href: "/notifications", labelKey: "notifications", icon: Bell, live: true, contractorVisible: true },
  { href: "/integrations", labelKey: "integrations", icon: Plug, live: false },
  { href: "/atm-service", labelKey: "atmService", icon: Landmark, live: true },
  { href: "/cleaning-cycles", labelKey: "cleaningCycles", icon: SprayCan, live: true },
  { href: "/ai", labelKey: "ai", icon: Sparkles, live: true },
];
