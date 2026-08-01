export const REQUEST_TYPE_LABELS: Record<string, string> = {
  REPAIR: "Ремонт",
  MAINTENANCE: "Плановое обслуживание",
  CLEANING: "Уборка",
  CASH_COLLECTION: "Инкассация",
  DELIVERY: "Доставка",
  EQUIPMENT_MOVE: "Перемещение оборудования",
  INSTALLATION: "Монтаж",
  DECOMMISSION: "Демонтаж",
  INSPECTION: "Инспекция",
  AUDIT: "Проверка",
  OTHER: "Другое",
};

export const REQUEST_TYPES = Object.keys(REQUEST_TYPE_LABELS);
