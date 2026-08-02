"use client";

import { useLocale } from "@/lib/i18n/context";

// Порядок типов заявки — независим от локали, подписи берутся из словаря
// через useRequestTypeLabels().
export const REQUEST_TYPES = [
  "REPAIR",
  "MAINTENANCE",
  "CLEANING",
  "CASH_COLLECTION",
  "DELIVERY",
  "EQUIPMENT_MOVE",
  "INSTALLATION",
  "DECOMMISSION",
  "INSPECTION",
  "AUDIT",
  "OTHER",
];

export function useRequestTypeLabels() {
  return useLocale().t.requestType;
}
