// Двуязычные (ru/uz) шаблоны для истории заявок/задач и уведомлений.
// Свободный текст (комментарии, названия чек-листов, заголовки заявок)
// не переводится — только неизменная "рамка" шаблона вокруг него.

export interface Bilingual {
  ru: string;
  uz: string;
}

const WORK_ORDER_STATUS_LABELS: Record<string, Bilingual> = {
  NEW: { ru: "Новая", uz: "Yangi" },
  ASSIGNED: { ru: "Назначена", uz: "Tayinlangan" },
  EN_ROUTE: { ru: "В пути", uz: "Yo'lda" },
  ARRIVED: { ru: "Прибыл", uz: "Yetib keldi" },
  IN_PROGRESS: { ru: "В работе", uz: "Jarayonda" },
  WAITING_MATERIALS: { ru: "Ожидает материалы", uz: "Materiallar kutilmoqda" },
  WAITING_APPROVAL: { ru: "Требуется согласование", uz: "Tasdiqlash talab qilinadi" },
  COMPLETED: { ru: "Завершена", uz: "Yakunlandi" },
  CLOSED: { ru: "Закрыта", uz: "Yopildi" },
  CANCELLED: { ru: "Отменена", uz: "Bekor qilindi" },
};

const ISSUE_STATUS_LABELS: Record<string, Bilingual> = {
  BACKLOG: { ru: "Бэклог", uz: "Backlog" },
  TODO: { ru: "К выполнению", uz: "Bajarilishi kerak" },
  IN_PROGRESS: { ru: "В работе", uz: "Jarayonda" },
  IN_REVIEW: { ru: "На проверке", uz: "Tekshiruvda" },
  DONE: { ru: "Готово", uz: "Tayyor" },
};

function workOrderStatusLabel(status: string): Bilingual {
  return WORK_ORDER_STATUS_LABELS[status] ?? { ru: status, uz: status };
}

function issueStatusLabel(status: string): Bilingual {
  return ISSUE_STATUS_LABELS[status] ?? { ru: status, uz: status };
}

export const workOrderMessages = {
  created: (): Bilingual => ({ ru: "Заявка создана", uz: "Ariza yaratildi" }),
  createdAutoMaintenance: (): Bilingual => ({
    ru: "Заявка создана автоматически (плановое ТО)",
    uz: "Ariza avtomatik yaratildi (rejali texnik xizmat)",
  }),
  createdAutoCleaning: (cycleNumber: number | string): Bilingual => ({
    ru: `Заявка создана автоматически (цикл уборки №${cycleNumber})`,
    uz: `Ariza avtomatik yaratildi (tozalash tsikli №${cycleNumber})`,
  }),
  emergencyCallCreated: (): Bilingual => ({
    ru: "Аварийный вызов создан",
    uz: "Avariya chaqiruvi yaratildi",
  }),
  statusChanged: (status: string): Bilingual => {
    const label = workOrderStatusLabel(status);
    return { ru: `Статус изменён на «${label.ru}»`, uz: `Holat «${label.uz}» ga o'zgartirildi` };
  },
  qrArrivalConfirmed: (): Bilingual => ({
    ru: "Прибытие подтверждено сканированием QR-кода объекта",
    uz: "Yetib kelish obyekt QR-kodini skanerlash orqali tasdiqlandi",
  }),
  assigned: (): Bilingual => ({
    ru: "Заявка назначена исполнителю",
    uz: "Ariza ijrochiga tayinlandi",
  }),
  photoAdded: (): Bilingual => ({ ru: "Добавлена фотография", uz: "Foto qo'shildi" }),
  signatureAdded: (): Bilingual => ({
    ru: "Клиент подписал акт",
    uz: "Mijoz aktni imzoladi",
  }),
  checklistFilled: (templateName: string): Bilingual => ({
    ru: `Заполнен чек-лист «${templateName}»`,
    uz: `«${templateName}» cheklisti to'ldirildi`,
  }),
  slaEscalation: (): Bilingual => ({
    ru: "SLA просрочен — эскалация",
    uz: "SLA muddati o'tdi — eskalatsiya",
  }),
};

export const issueMessages = {
  created: (): Bilingual => ({ ru: "Задача создана", uz: "Vazifa yaratildi" }),
  statusChanged: (oldStatus: string, newStatus: string): Bilingual => {
    const oldLabel = issueStatusLabel(oldStatus);
    const newLabel = issueStatusLabel(newStatus);
    return {
      ru: `Статус изменён: ${oldLabel.ru} → ${newLabel.ru}`,
      uz: `Holat o'zgartirildi: ${oldLabel.uz} → ${newLabel.uz}`,
    };
  },
  assignmentChanged: (): Bilingual => ({
    ru: "Изменён исполнитель",
    uz: "Ijrochi o'zgartirildi",
  }),
  attachmentAdded: (): Bilingual => ({
    ru: "Добавлено вложение",
    uz: "Ilova qo'shildi",
  }),
};

export const notificationMessages = {
  workOrderAssigned: (number: string, title: string): { title: Bilingual; message: Bilingual } => ({
    title: { ru: "Новая заявка", uz: "Yangi ariza" },
    message: {
      ru: `Вам назначена заявка ${number}: ${title}`,
      uz: `Sizga ${number} arizasi tayinlandi: ${title}`,
    },
  }),
  slaEscalation: (number: string, title: string): { title: Bilingual; message: Bilingual } => ({
    title: { ru: "Просрочен SLA", uz: "SLA muddati o'tdi" },
    message: {
      ru: `Заявка ${number} «${title}» просрочена по SLA — требуется внимание`,
      uz: `${number} «${title}» arizasi SLA muddatidan o'tdi — e'tibor talab qilinadi`,
    },
  }),
  emergencyCall: (title: string, number: string): { title: Bilingual; message: Bilingual } => ({
    title: { ru: "Аварийный вызов", uz: "Avariya chaqiruvi" },
    message: {
      ru: `${title} — заявка ${number} создана и требует назначения исполнителя`,
      uz: `${title} — ${number} arizasi yaratildi va ijrochi tayinlashni talab qiladi`,
    },
  }),
};
