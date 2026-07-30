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
  { href: "/dispatch", label: "Диспетчерский центр", icon: Map, live: false },
  { href: "/employees", label: "Сотрудники", icon: Users, live: false },
  { href: "/teams", label: "Бригады", icon: UsersRound, live: false },
  { href: "/photo-reports", label: "Фотоотчёты", icon: Camera, live: false },
  { href: "/checklists", label: "Чек-листы", icon: ListChecks, live: false },
  { href: "/map", label: "Карта", icon: MapPinned, live: false },
  { href: "/equipment", label: "Оборудование", icon: Wrench, live: false },
  { href: "/warehouse", label: "Склад", icon: Warehouse, live: false },
  { href: "/crm", label: "CRM", icon: Building2, live: false },
  { href: "/analytics", label: "Аналитика", icon: BarChart3, live: false },
  { href: "/notifications", label: "Уведомления", icon: Bell, live: false },
  { href: "/integrations", label: "Интеграции", icon: Plug, live: false },
  { href: "/atm-service", label: "Обслуживание банкоматов", icon: Landmark, live: false },
  { href: "/ai", label: "AI-модуль", icon: Sparkles, live: false },
];
