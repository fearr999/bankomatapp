-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов/картоматов.
-- 1) Сначала выполните этот запрос и найдите id вашей организации:
--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;
-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.
BEGIN;

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_10d926bb-af2f-4866-8266-130ff92c001a', 'Пункт выдачи Uzum Market', 'г. Самарканд, улица Нарпайская, 8 "Б" дом', 39.6635227, 66.9137201, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ad55a0b5-14de-4c0f-b105-ed247a1ce416', 'Банкомат 1034', '1034', 'operational', 'atm', 'site_10d926bb-af2f-4866-8266-130ff92c001a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7b981043-f174-4b16-8d7a-1c619a30f704', 'Pharmacosmos C-37 ОЛИМ ПОЛВОН', 'Ташкент, 6-й пр. Карвонсарой, 2', 41.3305732, 69.197221, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3dc10510-ca4e-42b4-8194-0f99b28eb0cb', 'Банкомат 1273', '1273', 'operational', 'atm', 'site_7b981043-f174-4b16-8d7a-1c619a30f704', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3a82f84d-1b3a-4034-b88c-8b3e776a455c', 'Тц Chinar Mall', 'Бухара, ул. Алпамыша, 3', 41.4591501, 69.2018091, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b542c238-a4c3-42ff-abc1-c073e92255b0', 'Банкомат 1324', '1324', 'operational', 'atm', 'site_3a82f84d-1b3a-4034-b88c-8b3e776a455c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f4ba2647-c4fa-41d4-a8f1-bb026bb26d39', 'Пункт выдачи Uzum Market', 'г.Коканд , 1 тупик Истиклол, дом 1', 40.9781331, 71.6634011, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cecd1fbb-d69b-470f-be9c-8ed5765d8f49', 'Банкомат 1354', '1354', 'operational', 'atm', 'site_f4ba2647-c4fa-41d4-a8f1-bb026bb26d39', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_68af9f4a-4906-467e-aeee-4f89eb5971ba', 'Пункт выдачи Uzum Market', 'г. Карши, ул. Хонобод', 41.3576349, 69.177363, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bb6f0bd0-4821-4be1-b5bf-8f5864631f2a', 'Банкомат 1428', '1428', 'operational', 'atm', 'site_68af9f4a-4906-467e-aeee-4f89eb5971ba', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_07fc200c-0100-4025-a8c2-37670c5233a8', 'Korzinka "Навои"', 'Навои, улица Махмуд Тараби, 122', 40.1074488, 65.3730227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cd98219e-be5f-4546-9aa5-d9241e748f53', 'Банкомат 1455', '1455', 'operational', 'atm', 'site_07fc200c-0100-4025-a8c2-37670c5233a8', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e836b56b-5791-400b-b0db-88dfbd8c4dca', 'Buyuk Ipak Yo''li Mehmonxonasi', 'г. Наманган, махаллинский сход граждан Тукувчи, ул. Дустлик, 9', 41.3267745, 69.3340529, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_839d5704-8be7-4469-a558-6fcca52a570a', 'Банкомат 1519', '1519', 'operational', 'atm', 'site_e836b56b-5791-400b-b0db-88dfbd8c4dca', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_64cf1adf-1978-42c4-be01-ebd9e1d7e4c5', 'Корзинка Бухара-2', 'г. Бухара, пересечение улиц Афросиаб и Ибн Сино.', 39.7067204, 66.6732286, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7a2934ea-14f8-4f2e-92c9-7fb162fe224f', 'Банкомат 1533', '1533', 'operational', 'atm', 'site_64cf1adf-1978-42c4-be01-ebd9e1d7e4c5', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d8e3b5e2-d212-4967-8941-0d76b6d6e0b9', 'Korzinka Depo', 'г. Ташкент, Учтепинский район. махаллинский сход граждан Хамдуст', 41.2912326, 69.2238265, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_25d5dc8d-ca0a-4b29-9157-24c2ac6f7a45', 'Банкомат 1712', '1712', 'operational', 'atm', 'site_d8e3b5e2-d212-4967-8941-0d76b6d6e0b9', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

COMMIT;