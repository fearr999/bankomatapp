-- Автосгенерировано вручную (координаты со скриншотов GPS пользователя) — MS0032 и MS0068.
-- 1) Сначала выполните этот запрос и найдите id вашей организации:
--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;
-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id и выполните файл целиком.
BEGIN;

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_55da6fc3-826d-458c-ac69-27c45726ba05', 'Картомат MS0068', 'координаты по GPS-скриншоту (адрес не указан)', 41.15814, 69.0461, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a3753484-def0-49fc-9f83-7fee57921f46', 'Картомат MS0068', 'MS0068', 'operational', 'cardomat', 'site_55da6fc3-826d-458c-ac69-27c45726ba05', 'ORG_ID_HERE', 'Координаты по GPS-скриншоту пользователя, точный адрес неизвестен', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9cbffb3d-d050-4736-99ac-64e4c57065f7', 'Картомат MS0032', 'координаты по GPS-скриншоту (адрес не указан)', 41.337986, 69.166894, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e337aa62-be05-49a8-bede-9f33148f0b19', 'Картомат MS0032', 'MS0032', 'operational', 'cardomat', 'site_9cbffb3d-d050-4736-99ac-64e4c57065f7', 'ORG_ID_HERE', 'Координаты по GPS-скриншоту пользователя, точный адрес неизвестен', now());

COMMIT;
