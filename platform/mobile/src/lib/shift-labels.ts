// Подпись главной кнопки в нижней навигации зависит от направления
// сотрудника (executorType) — у каждой контрагентской организации она своя.
export const SHIFT_LABELS: Record<string, { start: string; active: string }> = {
  STAFF: { start: "Начать рабочий день", active: "Рабочий день начат" },
  SERVICE_ENGINEER: { start: "Начать смену", active: "Смена начата" },
  CLEANING: { start: "Начать уборку", active: "Уборка начата" },
  CASH_COLLECTOR: { start: "Начать инкассацию", active: "Инкассация начата" },
  LOGISTICIAN: { start: "Начать маршрут", active: "Маршрут начат" },
  SECURITY: { start: "Заступить на пост", active: "На посту" },
  CONTRACTOR: { start: "Начать рабочий день", active: "Рабочий день начат" },
  OTHER: { start: "Начать рабочий день", active: "Рабочий день начат" },
};

export function shiftLabel(executorType: string | undefined, active: boolean): string {
  const labels = SHIFT_LABELS[executorType ?? "STAFF"] ?? SHIFT_LABELS.STAFF;
  return active ? labels.active : labels.start;
}
