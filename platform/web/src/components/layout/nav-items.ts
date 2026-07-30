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
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  live: boolean;
}

// Порядок и состав — по разделам ТЗ. `live: false` — заготовка страницы,
// модуль ещё не реализован (следующие этапы), но уже виден в архитектуре.
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, live: true },
  { href: "/work-orders", label: "Заявки", icon: ClipboardList, live: true },
  { href: "/dispatch", label: "Диспетчерский центр", icon: Map, live: true },
  { href: "/employees", label: "Сотрудники", icon: Users, live: true },
  { href: "/teams", label: "Бригады", icon: UsersRound, live: true },
  { href: "/photo-reports", label: "Фотоотчёты", icon: Camera, live: true },
  { href: "/checklists", label: "Чек-листы", icon: ListChecks, live: true },
  { href: "/map", label: "Карта", icon: MapPinned, live: true },
  { href: "/equipment", label: "Оборудование", icon: Wrench, live: true },
  { href: "/warehouse", label: "Склад", icon: Warehouse, live: true },
  { href: "/crm", label: "CRM", icon: Building2, live: true },
  { href: "/analytics", label: "Аналитика", icon: BarChart3, live: true },
  { href: "/notifications", label: "Уведомления", icon: Bell, live: true },
  { href: "/integrations", label: "Интеграции", icon: Plug, live: false },
  { href: "/atm-service", label: "Обслуживание банкоматов", icon: Landmark, live: true },
  { href: "/ai", label: "AI-модуль", icon: Sparkles, live: true },
];
