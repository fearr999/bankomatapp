/// Автоматический подбор исполнителей: какие типы исполнителей допустимы
/// для каждого типа заявки. Пустой список — ограничений нет, показываются все.
export const ELIGIBLE_EXECUTOR_TYPES: Record<string, string[]> = {
  REPAIR: ["SERVICE_ENGINEER", "STAFF"],
  MAINTENANCE: ["SERVICE_ENGINEER", "STAFF"],
  CLEANING: ["CLEANING"],
  CASH_COLLECTION: ["CASH_COLLECTOR"],
  DELIVERY: ["LOGISTICIAN"],
  EQUIPMENT_MOVE: ["LOGISTICIAN", "STAFF"],
  INSTALLATION: ["SERVICE_ENGINEER", "STAFF"],
  DECOMMISSION: ["SERVICE_ENGINEER", "STAFF"],
  INSPECTION: ["STAFF", "SERVICE_ENGINEER"],
  AUDIT: ["STAFF"],
  OTHER: [],
};

export function eligibleExecutorTypes(requestType: string): string[] {
  return ELIGIBLE_EXECUTOR_TYPES[requestType] ?? [];
}
