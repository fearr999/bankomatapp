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

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  live: boolean;
  // Виден в ограниченном "кабинете подрядчика" — только разделы из ТЗ:
  // Мои заявки/Карта объектов/Фотоотчёты/Чек-листы/Уведомления.
  contractorVisible?: boolean;
}

// Порядок и состав — по разделам ТЗ. `live: false` — заготовка страницы,
// модуль ещё не реализован (следующие этапы), но уже виден в архитектуре.
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, live: true },
  { href: "/projects", label: "Проекты", icon: Kanban, live: true },
  { href: "/work-orders", label: "Заявки", icon: ClipboardList, live: true, contractorVisible: true },
  { href: "/dispatch", label: "Диспетчерский центр", icon: Map, live: true },
  { href: "/employees", label: "Сотрудники", icon: Users, live: true },
  { href: "/teams", label: "Бригады", icon: UsersRound, live: true },
  { href: "/territories", label: "Территории", icon: Route, live: true },
  { href: "/photo-reports", label: "Фотоотчёты", icon: Camera, live: true, contractorVisible: true },
  { href: "/checklists", label: "Чек-листы", icon: ListChecks, live: true, contractorVisible: true },
  { href: "/map", label: "Карта объектов", icon: MapPinned, live: true, contractorVisible: true },
  { href: "/equipment", label: "Оборудование", icon: Wrench, live: true },
  { href: "/warehouse", label: "Склад", icon: Warehouse, live: true },
  { href: "/crm", label: "CRM", icon: Building2, live: true },
  { href: "/organizations", label: "Подрядчики", icon: Building2, live: true },
  { href: "/analytics", label: "Аналитика", icon: BarChart3, live: true },
  { href: "/notifications", label: "Уведомления", icon: Bell, live: true, contractorVisible: true },
  { href: "/integrations", label: "Интеграции", icon: Plug, live: false },
  { href: "/atm-service", label: "Обслуживание банкоматов", icon: Landmark, live: true },
  { href: "/cleaning-cycles", label: "Циклы уборки", icon: SprayCan, live: true },
  { href: "/ai", label: "AI-модуль", icon: Sparkles, live: true },
];
