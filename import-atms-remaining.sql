-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов (остаток полного списка, 623 адреса, финальная сборка).
-- 1) Сначала выполните этот запрос и найдите id вашей организации:
--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;
-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.
BEGIN;

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_98716ae0-9ba7-4fb7-bbef-8ff9d7b65d29', 'Korzinka Гунча', 'г. Ташкент, Алмазарский район, массив Беруний, Б-1, дом 1Б', 41.330617, 69.223568, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3f3a8e8f-00d7-498a-b471-f57997c8ed90', 'Банкомат 1001', '1001', 'operational', 'atm', 'site_98716ae0-9ba7-4fb7-bbef-8ff9d7b65d29', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_382c59e1-90a6-4c06-9e34-88520af251c8', 'Пункт выдачи Uzum Market', 'г. Ташкент, Сергелийский район, массив Сергели-7, д. 2', 41.2148562, 69.2675659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_73ccfcd1-4cbb-453c-915f-cc5b331a7214', 'Банкомат 1002', '1002', 'operational', 'atm', 'site_382c59e1-90a6-4c06-9e34-88520af251c8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_46b3a14a-5a5a-4ccb-9bdf-01d7399d1107', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирзо-Улугбекский район, массив Буюк Ипак Йули, д. 31', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0ddda4ab-b7bb-4d97-b19b-27c81d78d691', 'Банкомат 1003', '1003', 'operational', 'atm', 'site_46b3a14a-5a5a-4ccb-9bdf-01d7399d1107', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6d3b3637-7e64-4a95-970a-b12bd2bb9f1f', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирабадский район, улица Абу Сулеймана Банокати, д. 175 А', 41.2767764, 69.2870486, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f51faceb-1a11-4c21-afb6-e299a79c4e32', 'Банкомат 1006', '1006', 'operational', 'atm', 'site_6d3b3637-7e64-4a95-970a-b12bd2bb9f1f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_251ce985-7ff8-43ac-aedc-c4b81d70e0c7', 'Пункт выдачи Uzum Market', 'г. Ташкент, Сергелийский район, Куйлюк 5-массив', 41.2488249, 69.3015965, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_18a14c85-eacb-4453-b6da-b0dc9a6a4f7e', 'Банкомат 1008', '1008', 'operational', 'atm', 'site_251ce985-7ff8-43ac-aedc-c4b81d70e0c7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cf64b211-4685-451a-a230-650f5d75389c', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирзо Улугбекский район, улица Феруза, д. 27', 41.3547299, 69.3642976, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d4328d94-4cc4-4e0f-b223-74e1eb8cf646', 'Банкомат 1009', '1009', 'operational', 'atm', 'site_cf64b211-4685-451a-a230-650f5d75389c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e51740b-38e9-43ca-a074-3ca8e0eeb3b2', 'Пункт выдачи Uzum Market', 'г. Ташкент, Шайхантахурский район, массив Ибн Сино 2, д. 9', 41.3357536, 69.1744844, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2befde6-5e03-4ef8-8cae-072708a32bf9', 'Банкомат 1010', '1010', 'operational', 'atm', 'site_2e51740b-38e9-43ca-a074-3ca8e0eeb3b2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a6d313c2-29b0-432a-99b1-77ac2589cf1a', 'OLMA', 'г. Ташкент, Алмазарский р-н, махалля Ислом-ота, массив Каракамыш 1/2, торговый центр', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_401dee92-3886-433d-850c-4ea4184cb6d5', 'Банкомат 1013', '1013', 'operational', 'atm', 'site_a6d313c2-29b0-432a-99b1-77ac2589cf1a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e9f4932b-496a-45d6-abff-929d0d223ec2', 'OLMA', 'г. Ташкент, Бектимир р-он, Икбол МФЙ, квартал Водник, дом 12а', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_aadd119a-0a6c-4985-a20e-7efca81d5ede', 'Банкомат 1015', '1015', 'operational', 'atm', 'site_e9f4932b-496a-45d6-abff-929d0d223ec2', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_432979c3-d429-4ee4-ac60-eec67f8186d8', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирабадский район, ул. Таллимаржон, д. 10', 41.2764227, 69.3020179, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0e909f7d-972a-4e9d-8019-719530e03c93', 'Банкомат 1017', '1017', 'operational', 'atm', 'site_432979c3-d429-4ee4-ac60-eec67f8186d8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_864e6729-fd44-45f1-bf97-bcc763c6646e', 'ТЦ Alfraganus', 'г. Ташкент, Мирабадский район, ул. Кучкуприк, дом 30', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_be3a145b-8472-4ee5-b983-75d2641a292b', 'Банкомат 1019', '1019', 'operational', 'atm', 'site_864e6729-fd44-45f1-bf97-bcc763c6646e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5bd6a365-1dcf-4521-861a-3a73b28949ff', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яшнабадский район, улица Махтумкули, д. 117', 41.3049143, 69.3267539, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f7d205be-784f-483e-828b-bde844bb4142', 'Банкомат 1021', '1021', 'operational', 'atm', 'site_5bd6a365-1dcf-4521-861a-3a73b28949ff', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_95d26ae4-01d9-4e82-8223-746ad3e8a89c', 'OLMA', 'г. Ташкент,, Алмазарский район, махалля Олимпия, массив Олимпийский, д.16', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5e8b2272-c2a9-4a1f-abbe-29eedb4aa378', 'Банкомат 1022', '1022', 'operational', 'atm', 'site_95d26ae4-01d9-4e82-8223-746ad3e8a89c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_409ed637-a507-40cd-9ebc-63c586a3df6e', 'ТЦ HIGH TOWN MALL', 'г. Ташкент, Юнусабадский район, ул. Янгишахар 6-й проезд, 65Б стр', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2f2c3ecd-c355-4ce6-8b3b-3378e0fd694f', 'Банкомат 1024', '1024', 'operational', 'atm', 'site_409ed637-a507-40cd-9ebc-63c586a3df6e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c71c93a1-1f21-409a-aeb1-041c07242212', 'Международный аэропорт Ташкента имени Ислама Каримова', 'г. Ташкент, Сергелийский район, ул. Кумарык, 13', 41.2571263, 69.2765778, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c40b5516-fb37-4417-9897-44ed6e197c6c', 'Банкомат 1025', '1025', 'operational', 'atm', 'site_c71c93a1-1f21-409a-aeb1-041c07242212', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a398fbac-8f23-4c31-a718-7d64652bd6c7', 'ТЦ Yangi Ibn-Sino', 'г.Ташкент, Шайхантахурский район, массив Ибн Сина-2', 41.3373595, 69.1677644, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f6c00af2-e9ab-45de-937f-8c7cc3680e14', 'Банкомат 1026', '1026', 'operational', 'atm', 'site_a398fbac-8f23-4c31-a718-7d64652bd6c7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7a44d517-27c0-431f-8996-c3cae59c537c', 'OLMA', 'г. Ташкент, Янгихайот район, ул. Турсунзода, дом – 21', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_05a9e2fc-4990-4b2e-8119-4b4e3cea8111', 'Банкомат 1027', '1027', 'operational', 'atm', 'site_7a44d517-27c0-431f-8996-c3cae59c537c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2eb33d24-ff89-4a34-9a15-8b4db6a89294', 'Chorsu Gold Center', 'г. Ташкент, Шайхантахурский район, ул. Сакичмон, 1/39', 41.3251846, 69.2316723, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bdf5fa36-e5bb-4605-a1ba-9a060e3d4c44', 'Банкомат 1028', '1028', 'operational', 'atm', 'site_2eb33d24-ff89-4a34-9a15-8b4db6a89294', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3a004a0c-2897-4ba0-a6a7-77019fdf29cf', 'OLMA', 'г. Ташкент, Янгихаетский район, махалля Ташаббус, строительный объект №2, д. 13-а', 41.2246108, 69.2027897, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cbf7955b-6cee-4519-8f8e-0bf56335f076', 'Банкомат 1029', '1029', 'operational', 'atm', 'site_3a004a0c-2897-4ba0-a6a7-77019fdf29cf', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5950376b-081b-408a-a11e-6d9d8deeda4b', 'ТРЦ Golden Life', 'г. Ташкент, Сергелиский район,ул. Мирзы Турсунзаде, 14', 41.226906, 69.2207172, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fc965e69-9ac4-4e11-9670-dd7c5e50b387', 'Банкомат 1030', '1030', 'operational', 'atm', 'site_5950376b-081b-408a-a11e-6d9d8deeda4b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_290046cc-8dc4-405a-b257-1c2a946736ed', 'ТЦ Rivera', 'г. Ташкент, Алмазарский район, ул. Нодиры, 4', 41.362149, 69.2266019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_aae9d2b9-4636-4e6f-ab0f-d14d58de4e41', 'Банкомат 1031', '1031', 'operational', 'atm', 'site_290046cc-8dc4-405a-b257-1c2a946736ed', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0258fab9-8206-435d-8941-1662d9d0f59b', 'Eco Bazar беруни', 'г. Ташкент, Алмазарский район, ул. Беруни, 47, метро Беруни.', 41.3273631, 69.228411, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_57d4d32e-cfb4-4211-9fa9-ec8f829e4a2a', 'Банкомат 1036', '1036', 'operational', 'atm', 'site_0258fab9-8206-435d-8941-1662d9d0f59b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a5534994-17b4-42b9-95f1-3a2fb1da61af', 'ТЦ Sampi', 'г. Ташкент, Юнусабадский район, ул. Богишамол, 260', 41.3524955, 69.3313487, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0088dc0d-9b94-4b3d-8977-666e807a807d', 'Банкомат 1041', '1041', 'operational', 'atm', 'site_a5534994-17b4-42b9-95f1-3a2fb1da61af', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_758a7384-2881-4fe1-9381-03ad87ed33ed', 'ТЦ Chigatoy', 'г. Ташкент, Алмазарский район, обводная ул. Нурафшон, 7', 41.3378992, 69.2231056, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2827b048-5250-49d0-9189-73dd6ccf999c', 'Банкомат 1047', '1047', 'operational', 'atm', 'site_758a7384-2881-4fe1-9381-03ad87ed33ed', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f25b8eb1-be31-4abd-9bb2-9b0863f9d59c', 'Атлас мебел беруни', 'г. Ташкент, Алмазарский район, ул. Беруни, 47, метро Беруни.', 41.3273631, 69.228411, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fcf6216d-eb78-436b-9640-1cdfd288635c', 'Банкомат 1129', '1129', 'operational', 'atm', 'site_f25b8eb1-be31-4abd-9bb2-9b0863f9d59c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_14f35d60-9c21-4b4d-9f63-52f35d710f92', 'OLMA', 'г. Ташкент, Мирзо Улугбекский район, МФЙ Хабиба Абдуллаева, массив Ялангоч', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_763c8985-e17f-402f-bc26-091eb8fbf4fd', 'Банкомат 1130', '1130', 'operational', 'atm', 'site_14f35d60-9c21-4b4d-9f63-52f35d710f92', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_038da4c3-55a4-4927-ba21-274420056769', 'OLMA', 'г. Ташкент, Юнусабадский район, 16-й квартал, 19, массив Юнусабад,', 41.3765255, 69.2774072, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_86d5181d-e5ab-40b0-bb38-99fe1f887404', 'Банкомат 1133', '1133', 'operational', 'atm', 'site_038da4c3-55a4-4927-ba21-274420056769', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_632f9647-1603-415c-9003-f4157c7258ae', 'Baraka Market', 'г. Ташкент, Юнусабадский район, 4-й квартал, 61Б', 41.3754355, 69.2767418, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9837f44b-2eeb-40a0-a5c2-b5d2c699f6ce', 'Банкомат 1053', '1053', 'operational', 'atm', 'site_632f9647-1603-415c-9003-f4157c7258ae', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_180aa107-7117-4287-aa9a-408cf6b21f70', 'OLMA', 'г. Ташкент, Мирабадский район, Чинор МФЙ, ул. Мунис, дом 80а', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_61fd3478-2981-4cd4-83ad-540f2e8cfdb7', 'Банкомат 1037', '1037', 'operational', 'atm', 'site_180aa107-7117-4287-aa9a-408cf6b21f70', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c9cdc930-3a48-476c-813c-d944569adc5b', 'Korzinka Курувчи, 51-53', 'г. Ташкент, Сергелийский район, МСГ «Курувчилар», массив Курувчи, 51-53', 41.215345, 69.262346, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9462480d-9147-49a1-94ff-a2a22d809272', 'Банкомат 1060', '1060', 'operational', 'atm', 'site_c9cdc930-3a48-476c-813c-d944569adc5b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b8133010-061f-42ce-afe5-74dcea2e27ee', 'OLMA', 'г.Ташкент, Мирабадский район, Ул. Хамал д. 29/3', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3c80a658-d689-4f18-b809-93d569c7f45e', 'Банкомат 1089', '1089', 'operational', 'atm', 'site_b8133010-061f-42ce-afe5-74dcea2e27ee', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4d731ec9-d2eb-494c-8167-01dc6e02f4ba', 'OLMA', 'г. Ташкент, Шайхантахурский район, махалля Катта Джарарык, массив Джарарык', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ea8093a2-7c37-462a-b38d-c678d94f01a7', 'Банкомат 1085', '1085', 'operational', 'atm', 'site_4d731ec9-d2eb-494c-8167-01dc6e02f4ba', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d2374cd3-0cf9-4efb-b9c9-a34c5281fb22', 'OLMA', 'г. Ташкент, Мирзо Улугбекский район, массив Хумаюн, 96', 41.3432163, 69.3882682, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_be18ede4-a0c1-434e-a0b0-69c4c39209c8', 'Банкомат 1110', '1110', 'operational', 'atm', 'site_d2374cd3-0cf9-4efb-b9c9-a34c5281fb22', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_13f403b9-7fd2-471b-8e35-f5097ef22a6a', 'OLMA', 'г. Ташкент, Мирзо-Улугбекский район, махаллинский сход граждан Богимайдан,', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_631e8adb-57a1-42b0-871f-586942280036', 'Банкомат 1120', '1120', 'operational', 'atm', 'site_13f403b9-7fd2-471b-8e35-f5097ef22a6a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1cb4eacb-4b70-445d-817c-4b8aaa0f424a', 'OLMA', 'г. Ташкент, Мирзо-Улугбекский район, махалля Хамида Олимжана, ул Аккурган, д.43-А', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_219edf4c-941b-41e1-bdd1-7fbb78dcb858', 'Банкомат 1122', '1122', 'operational', 'atm', 'site_1cb4eacb-4b70-445d-817c-4b8aaa0f424a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c48e1b26-3515-4672-9f82-568049fd2b4a', 'OLMA', 'г. Ташкент, Алмазарский район, квартал 1/1, 20А, массив Каракамыш,', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5338ea88-d24a-4114-89b3-7d8aae9a8d52', 'Банкомат 1113', '1113', 'operational', 'atm', 'site_c48e1b26-3515-4672-9f82-568049fd2b4a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3921eda2-4408-4f0a-9d5d-b6bf297b4356', 'OLMA', 'г. Ташкент, Юнусабадский район, 7-й квартал, массив Юнусабад,', 41.375228, 69.2760797, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_17097ee8-6420-403d-bf49-4301a8a2d9ab', 'Банкомат 1101', '1101', 'operational', 'atm', 'site_3921eda2-4408-4f0a-9d5d-b6bf297b4356', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c0a2d5ab-d630-4bc2-8d88-80f1cc42edfb', 'OLMA', 'г. Ташкент, Янгихаетский район, махалля Янги турмуш, ул. Турсунзода, д. 7', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eeb5648f-0ba8-477e-ae28-07b50447085b', 'Банкомат 1117', '1117', 'operational', 'atm', 'site_c0a2d5ab-d630-4bc2-8d88-80f1cc42edfb', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fadf4e6d-7bc6-433f-be1b-33d4ea5f8255', 'OLMA', 'г. Ташкент, Янгихаитский район, массив Спутник 7, дом 5', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_34054442-dfdb-4361-acfa-7aa1de2e3df1', 'Банкомат 1105', '1105', 'operational', 'atm', 'site_fadf4e6d-7bc6-433f-be1b-33d4ea5f8255', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7c7ebdb2-c74f-4db8-8027-6fab4ebf0851', 'OLMA', 'г. Ташкент, Алмазарский район, махалля Ачаобод, ул. Сагбан берк-30, д. 79', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4e59767c-f002-4d09-b771-3be40f3cfa00', 'Банкомат 1092', '1092', 'operational', 'atm', 'site_7c7ebdb2-c74f-4db8-8027-6fab4ebf0851', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d77a216a-b91b-4c94-b0f4-0a234d0c947f', 'OLMA', 'г Ташкент, Янгихаетский район махалля Чоштепа, ул. Чоштепа, д. 74-А', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_01dc166d-753b-4763-aa0c-adeee35ad875', 'Банкомат 1091', '1091', 'operational', 'atm', 'site_d77a216a-b91b-4c94-b0f4-0a234d0c947f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bf0e73fb-3a02-4278-9eac-e2cbb5dc22cd', 'OLMA', 'г. Ташкент, Яшнабадский район, махалля Маърифат, ул. Ахсикат, д.176', 41.29391, 69.3157705, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a8eb4e2f-a734-43c3-9dea-ac6f8c7c289c', 'Банкомат 1098', '1098', 'operational', 'atm', 'site_bf0e73fb-3a02-4278-9eac-e2cbb5dc22cd', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_84abc3b6-8b20-4cf9-94e3-75faec79d60f', 'OLMA', 'г. Ташкент, Яшнабадский район, 58А военный городок, дом 70', 41.2817219, 69.3707949, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_190b0d9b-753c-47d6-a71e-0899533527c7', 'Банкомат 1038', '1038', 'operational', 'atm', 'site_84abc3b6-8b20-4cf9-94e3-75faec79d60f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8da4faa1-2b41-47d7-8855-dc5d7f03a10a', 'OLMA', 'г. Ташкент, Мирзо-Улугбекский район, 4-й массив Карасу, 2', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2527679-0d8b-4692-8a23-ce04e578242e', 'Банкомат 1121', '1121', 'operational', 'atm', 'site_8da4faa1-2b41-47d7-8855-dc5d7f03a10a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_24d7641c-d9d1-4c8a-8dc4-3ad2456b5bdd', 'OLMA', 'Ташкентская обл., Кибрайский р-н, махалля Фаровон, ТашГРЕС, д. 338', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_63c59c0a-af85-4be0-b3d5-72986c3b2dfb', 'Банкомат 1145', '1145', 'operational', 'atm', 'site_24d7641c-d9d1-4c8a-8dc4-3ad2456b5bdd', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_552c4370-2636-49d5-91b3-84c9ec025e58', 'OLMA', 'г. Ташкент, Янгихаётский район, махалля Янги Дархан, ул. Навруз, д. 40', 41.2241328, 69.1960664, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d326aa90-489e-443c-981b-f37c385256bf', 'Банкомат 1059', '1059', 'operational', 'atm', 'site_552c4370-2636-49d5-91b3-84c9ec025e58', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4939cc0c-9125-420a-baa0-b6ac7eeb6790', 'OLMA', 'г. Ташкент, Яшнабадский район, махалля Олмос, Ахангаранское шоссе, д. 105', 41.2756506, 69.3711679, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_24743337-f53d-4c0f-a941-570498ea8842', 'Банкомат 1082', '1082', 'operational', 'atm', 'site_4939cc0c-9125-420a-baa0-b6ac7eeb6790', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1e82a857-9bb1-423b-ab01-425ca70228dc', 'OLMA', 'г. Ташкент, Юнусабадский район, махалля Богишамол, 11-квартал, д.61', 41.3395545, 69.2896137, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ef8ed9d9-312d-4636-9cd7-2105366bc5b3', 'Банкомат 1033', '1033', 'operational', 'atm', 'site_1e82a857-9bb1-423b-ab01-425ca70228dc', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a7b91dc0-ae51-44cb-b337-1c4ffd504e65', 'ТЦ Qorasuv Plaza', 'г. Ташкент, 1-й квартал, 24В, массив Карасу, Мирзо-Улугбекский район,', 41.3582534, 69.22066, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cbc7d5be-bfd7-4ac1-a540-149d46ac47a1', 'Банкомат 1056', '1056', 'operational', 'atm', 'site_a7b91dc0-ae51-44cb-b337-1c4ffd504e65', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1775af3d-4d84-4c24-a242-5e73dad434c6', 'ТЦ Атриум', 'г. Ташкент, Яшнабадский район, 2-й проезд ул. Тараккиет, 1, метро Машиностроителей,', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d7c4b03b-a802-4d60-91c9-f5604ce6f092', 'Банкомат 1062', '1062', 'operational', 'atm', 'site_1775af3d-4d84-4c24-a242-5e73dad434c6', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9e6320f8-108b-4cfb-8dbe-42f225cfbe5b', 'Fix Price V030', 'Ташкентская область, г. Чирчик, МФЙ «Химик», А. Ул. Тимура, 69', 41.4726109, 69.5896266, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a6829b86-5f12-4555-81ce-4de510b5bf18', 'Банкомат 1126', '1126', 'operational', 'atm', 'site_9e6320f8-108b-4cfb-8dbe-42f225cfbe5b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5bd47948-358b-42c3-a00c-57e74e99a86e', 'Baraka Market Супермаркет', 'г. Ташкент, Яшнабадский район, 1-й Авиасозлар (Городок Авиастроителей м-н) квартал, 58 городок, 30/1', 41.3111895, 69.2231797, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f522fa75-5deb-4001-8b20-3f64175747dc', 'Банкомат 1099', '1099', 'operational', 'atm', 'site_5bd47948-358b-42c3-a00c-57e74e99a86e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7d18b787-f42d-4fac-8b60-562b8981a1dc', 'Fayzi Market', 'г. Ташкент, Сергелийский район, ул. Обихаёт, 1', 41.215669, 69.2379275, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_280120f6-aeeb-40f0-9273-98dc7c7e3bb5', 'Банкомат 1057', '1057', 'operational', 'atm', 'site_7d18b787-f42d-4fac-8b60-562b8981a1dc', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d9bb764f-a197-481d-a8dd-7e237806f312', 'ТЦ CHUQURSAY', 'г. Ташкент, Алмазарский район, ул. Уста Ширин, 125', 41.3546938, 69.2460232, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3c0e91b2-d4de-4cd2-8a8e-d15f7e891ada', 'Банкомат 1084', '1084', 'operational', 'atm', 'site_d9bb764f-a197-481d-a8dd-7e237806f312', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3bcdfca2-3acf-4499-8882-30ebf530af87', 'Корзинка Келес', 'Ташкентская об., г.Келес, МФЙ «Окибат», ул. Келес йўли', 41.4023967, 69.2042193, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ee73c21d-c250-4a84-9000-d51479670031', 'Банкомат 1090', '1090', 'operational', 'atm', 'site_3bcdfca2-3acf-4499-8882-30ebf530af87', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_78c1a72a-a0d4-4530-94c7-4c0ca84942e4', 'Корзинка Куйлюк центр', 'г. Ташкент, Яшнабадский район, Ташкентская кольцевая автомобильная дорога.', 41.2404111, 69.3338024, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9ea5db07-fcc9-4230-b891-b61d7d93cc10', 'Банкомат 1058', '1058', 'operational', 'atm', 'site_78c1a72a-a0d4-4530-94c7-4c0ca84942e4', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5400ed3d-eade-4c81-a411-410aa8685a1c', 'Корзинка Ипакчи', 'г. Ташкент, Шайхантахурский район, улица Ипакчи', 41.3290781, 69.1828248, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2292a787-6338-4fc7-90a5-6013e3a3dd8a', 'Банкомат 1115', '1115', 'operational', 'atm', 'site_5400ed3d-eade-4c81-a411-410aa8685a1c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ee14dc98-7d36-4d81-875f-057754f9cd34', 'Корзинка КораКамыш 2/5', 'г. Ташкент, Алмазарский район, махалля Шодиёна, улица Каракамыш-2, дом 17', 41.3753261, 69.2215177, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3ea53398-8355-4e6b-8cbb-5793379333e2', 'Банкомат 1094', '1094', 'operational', 'atm', 'site_ee14dc98-7d36-4d81-875f-057754f9cd34', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2a83508d-7b4a-45f8-8d41-7ed0715565db', 'Корзинка Сергели 8', 'г.Ташкент, Сергелийский район, ул. Янги Сергели, 8-й квартал', 41.2507989, 69.2649879, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_33b0ceb0-082e-49fd-899a-3f6f1f4d39e2', 'Банкомат 1103', '1103', 'operational', 'atm', 'site_2a83508d-7b4a-45f8-8d41-7ed0715565db', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d061db56-24c8-440a-b1d6-a1ea2ae62af8', 'Корзинка София', 'г. Ташкент, Юнусабадский район, на пересечении Малой кольцевой дороги и улицы Адхама Рахмата, 12-й дом', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_62e7412e-9aac-48e1-a633-8a18467af7bb', 'Банкомат 1045', '1045', 'operational', 'atm', 'site_d061db56-24c8-440a-b1d6-a1ea2ae62af8', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_37e902e1-5ddb-442b-824c-a39b3875d651', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирзо-Улугбекский район, МСГ Темурийлар, ул. Амир Темур, 15Г/1', 41.321927, 69.372273, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_72f944c9-4898-4d74-9b28-f838514655db', 'Банкомат 1095', '1095', 'operational', 'atm', 'site_37e902e1-5ddb-442b-824c-a39b3875d651', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b6fee203-1202-42b8-958b-0d7e4d8e4cae', 'Baraka Market Магазин 025', 'г. Ташкент, Яшнабадский район, ул. Оханграбо, дом № 82', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4595841b-1620-4b75-97bd-5a4bfbe15aa7', 'Банкомат 1066', '1066', 'operational', 'atm', 'site_b6fee203-1202-42b8-958b-0d7e4d8e4cae', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ab1021fd-bb8c-4098-8c5f-f7b5cbf9e0a2', 'Белорусская косметика', 'г.Ташкент, Яшнабадский район, массив Городок Авиастроителей, 2-й квартал, 65', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e3aa3df9-8978-43e1-8da9-27259f42447b', 'Банкомат 1068', '1068', 'operational', 'atm', 'site_ab1021fd-bb8c-4098-8c5f-f7b5cbf9e0a2', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dfeea8a3-04d1-490d-a767-adb11eeafbff', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яшнабадский район, улица Паркент, дом 3А', 41.3037433, 69.3419915, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5c35c5bb-37f7-4c4e-865a-6f59679a459e', 'Банкомат 1081', '1081', 'operational', 'atm', 'site_dfeea8a3-04d1-490d-a767-adb11eeafbff', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fb757930-0797-48fe-8d63-4277c7887409', 'Пункт выдачи Uzum Market', 'г. Ташкент, Юнусабадский район, улица Осиё, дом 16', 41.3273593, 69.2871392, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_11657e67-e180-49d8-a1d1-5298b6c0ae07', 'Банкомат 1080', '1080', 'operational', 'atm', 'site_fb757930-0797-48fe-8d63-4277c7887409', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e369941d-a6b0-4ef4-9996-bfb3a98a3453', 'Пункт выдачи Uzum Market', 'г. Ташкент, Юнусабадский район, квартал -14, улица А. Дониша (Korzinka)', 41.3787159, 69.2776242, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fd47d258-1090-435f-bfd7-49acefd85db6', 'Банкомат 1086', '1086', 'operational', 'atm', 'site_e369941d-a6b0-4ef4-9996-bfb3a98a3453', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_71588536-e4a2-480a-924a-dfe4ac75b898', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яшнабадский район, улица Хосият, дом 15А', 41.2794764, 69.3468706, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0534cf41-3037-42aa-8298-fa95922e3cd2', 'Банкомат 1087', '1087', 'operational', 'atm', 'site_71588536-e4a2-480a-924a-dfe4ac75b898', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_602e0ca6-a44f-4982-a540-c0c08f065570', 'Пункт выдачи Uzum Market', 'г. Ташкент, Юнусабадский район, массив Юнусабад, 9-ый квартал, дом 12', 41.3736506, 69.2773562, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f5522c60-d39e-4fd6-8c1e-9e405efc68bd', 'Банкомат 1093', '1093', 'operational', 'atm', 'site_602e0ca6-a44f-4982-a540-c0c08f065570', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_87065e36-af24-44f1-8f67-6e39bea43350', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирзо Улугбекский район, улица Буюк Ипак Йули, дом 137', 41.3550102, 69.3918776, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1e97030b-b0f0-4792-a7a7-c0a279c96c12', 'Банкомат 1102', '1102', 'operational', 'atm', 'site_87065e36-af24-44f1-8f67-6e39bea43350', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4a4917fe-18b7-4a6e-a253-d5d4cdbb153f', 'Станция метро Гафура Гуляма', 'г. Ташкент, Шайхонтохурский район, улица Себзара', 41.329667, 69.2471595, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4efb4a98-36de-4ad4-8cb7-6d8f7cfbce88', 'Банкомат 1104', '1104', 'operational', 'atm', 'site_4a4917fe-18b7-4a6e-a253-d5d4cdbb153f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_804ccda9-59dc-44de-89ff-9578fd0dfc4f', 'Станция метро Тинчлик', 'г. Ташкент, Шайхонтохурский район, улица Беруни', 41.3278998, 69.2266963, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b9d862c9-885e-403d-9637-f6a38bf941eb', 'Банкомат 1116', '1116', 'operational', 'atm', 'site_804ccda9-59dc-44de-89ff-9578fd0dfc4f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6ffab034-4147-4b04-9f41-0f41f2f55aff', 'Станция метро Узбекистанская', 'г. Ташкент, Шайхонтохурский район, улица Батыра Закирова', 41.3161482, 69.2539178, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9e9b6a3a-17c2-4eed-8e0b-45fd82b423bd', 'Банкомат 1118', '1118', 'operational', 'atm', 'site_6ffab034-4147-4b04-9f41-0f41f2f55aff', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ddbc619b-b2f4-4546-9b2a-924344e693da', 'Станция метро Беруний', 'г. Ташкент, Шайхонтохурский район, улица Беруни', 41.3278998, 69.2266963, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7b03fa8f-43e6-4941-9a78-1371ba463faf', 'Банкомат 1123', '1123', 'operational', 'atm', 'site_ddbc619b-b2f4-4546-9b2a-924344e693da', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6b968fc0-2de8-4316-b750-e5f97c6ca8a1', 'Станция метро Туркестан', 'г. Ташкент, Юнусабадский район, улица Ахмада Дониша', 41.347707, 69.2613287, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5d44e87c-2991-4503-a831-fe61747eb1a5', 'Банкомат 1128', '1128', 'operational', 'atm', 'site_6b968fc0-2de8-4316-b750-e5f97c6ca8a1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7bb4aaf0-5245-4c0f-a1ff-e1e57498eaac', 'Станция метро Шахристан', 'г. Ташкент, Юнусабадский район, проспект Амира Темура', 41.3179973, 69.282545, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8b71f553-5a95-46c6-a029-bb37d1d3517e', 'Банкомат 1131', '1131', 'operational', 'atm', 'site_7bb4aaf0-5245-4c0f-a1ff-e1e57498eaac', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cda0df37-b982-443a-aad6-db5684519d8b', 'Станция метро Юнусабад', 'г. Ташкент, Юнусабадский район, улица Ахмада Дониша', 41.347707, 69.2613287, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_879494ba-26a2-48f0-a1f7-3bae74f3a48f', 'Банкомат 1134', '1134', 'operational', 'atm', 'site_cda0df37-b982-443a-aad6-db5684519d8b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d424b6c5-5e18-4944-9419-6cd2e4f8d54a', 'Пункт выдачи Uzum Market', 'г. Ташкент, Алмазарский район, Карасарайская улица, дом 249/2', 41.3450353, 69.2415981, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7e99d3da-b994-4062-9f23-ab49922fc2de', 'Банкомат 1136', '1136', 'operational', 'atm', 'site_d424b6c5-5e18-4944-9419-6cd2e4f8d54a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_eb5c439d-dff1-4d5e-a1ba-d60cf4ace5a9', 'Пункт выдачи Uzum Market', 'Ташкент, Мирзо Улугбекский район, улица Ялангач, дом 2', 41.3447694, 69.3339858, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_69a045d6-9e24-4d88-a8e8-682c6d964b35', 'Банкомат 1138', '1138', 'operational', 'atm', 'site_eb5c439d-dff1-4d5e-a1ba-d60cf4ace5a9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e3950f89-cc54-41d9-8a7e-f2703fd53bbf', 'Пункт выдачи Uzum Market', 'г. Ташкент, Алмазарский район, массив Кара-Камыш 1/4, дом 28 (напротив Автосалона)', 41.362149, 69.2266019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6e0e09dc-fee7-4016-8630-2446b50cde7d', 'Банкомат 1139', '1139', 'operational', 'atm', 'site_e3950f89-cc54-41d9-8a7e-f2703fd53bbf', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_66c06ca2-9985-4f20-a256-7faf8c0a11df', 'Станция метро Дустлик 2', 'г. Ташкент, Яшнабадский район, улица Эльбека', 41.2993545, 69.296602, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c764f6b3-91f6-4a27-97f5-fc5e39e805e1', 'Банкомат 1143', '1143', 'operational', 'atm', 'site_66c06ca2-9985-4f20-a256-7faf8c0a11df', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0c5dcc50-fab2-4d0b-be59-4760ff87f34d', 'Станция метро Машинастроительный', 'г. Ташкент, Яшнабадский район, улица Эльбека', 41.2993545, 69.296602, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f6d74b07-1616-4608-bf9b-40a300ef2045', 'Банкомат 1144', '1144', 'operational', 'atm', 'site_0c5dcc50-fab2-4d0b-be59-4760ff87f34d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ffa5b67f-442b-45ab-becf-5b3804e092be', 'Станция метро Пушкинская', 'г. Ташкент, Мирзо-Улугбекский район, проспект Мустакиллик', 41.322955, 69.3153342, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b855da4b-adf4-48d4-b3a2-4de368858027', 'Банкомат 1147', '1147', 'operational', 'atm', 'site_ffa5b67f-442b-45ab-becf-5b3804e092be', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5603c702-5fc3-4c8c-90ab-313a1c942ab5', 'Станция метро Хамида Алимджана', 'г. Ташкент, Мирзо-Улугбекский район, проспект Мустакиллик', 41.322955, 69.3153342, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_857ad65c-933b-4536-8dae-a8fcda3da378', 'Банкомат 1150', '1150', 'operational', 'atm', 'site_5603c702-5fc3-4c8c-90ab-313a1c942ab5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5d72236e-ee92-4420-9c93-5d800ea24fb9', 'ТЦ NURAFSHAN', 'Самаркандская обл., г. Самарканд, улица Амира Темура, 37', 39.647542, 66.9122343, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d1495b6e-6c66-47de-86cb-af770e0ac861', 'Банкомат 1149', '1149', 'operational', 'atm', 'site_5d72236e-ee92-4420-9c93-5d800ea24fb9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e5440269-31d8-469f-b7c3-a16be8068e64', 'ТЦ Compass', 'Ташкент, Бектемирский район, улица Большая кольцевая дорога, 17, метро Куйлюк,', 41.2548876, 69.3740922, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0fc104d1-1484-4468-9b3b-94441876edb5', 'Банкомат 1151', '1151', 'operational', 'atm', 'site_e5440269-31d8-469f-b7c3-a16be8068e64', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9b245d5b-f8d0-464e-894d-cbda13dfae1c', 'OXY Med
(Универсам 2)', 'г.Ташкент,
Юнусабадский район, Акбаробод МФЙ, улица Амир Темур, дом 24д.', 41.3675665, 69.292164, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dfbc5854-a23e-4b9f-b4ac-88fe3480a296', 'Банкомат 1163', '1163', 'operational', 'atm', 'site_9b245d5b-f8d0-464e-894d-cbda13dfae1c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3935be86-157c-4c12-9eb0-7f91ba0c0a0f', 'Ипак йули', 'Ташкент, Мирзо-Улугбекский район, Буюк Ипак Йули, 4 Элобод ж/м', 41.3260763, 69.3285423, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c8d4266f-efd9-4fc9-bc27-9866ab8168e0', 'Банкомат 1165', '1165', 'operational', 'atm', 'site_3935be86-157c-4c12-9eb0-7f91ba0c0a0f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2730c3b2-7e88-4eb4-a532-3912b3179d68', 'Daily Supermarket (BI 1) - Ганга', 'Ташкент, Шайхонтохурский район, ул: Г.Гуляма (Себзор) Дом 7.', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8191e9fe-f443-44f2-9c40-fe577b670769', 'Банкомат 1164', '1164', 'operational', 'atm', 'site_2730c3b2-7e88-4eb4-a532-3912b3179d68', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9a94361b-b7d2-4acd-b654-6719313388b5', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирабадский район, улица Миробадская 60а', 41.29284, 69.269451, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_46978a5e-520b-42e5-87b2-bbb12ae72f78', 'Банкомат 1173', '1173', 'operational', 'atm', 'site_9a94361b-b7d2-4acd-b654-6719313388b5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cbcc659b-e104-43f0-b356-ee06681350c3', 'Shox Med', 'Ташкент,Сергелийский район, Чаштепа 9-й тупик 45​', 41.3586944, 69.2896766, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fc68be25-d8f1-4b2e-8f71-2013cd750102', 'Банкомат 1166', '1166', 'operational', 'atm', 'site_cbcc659b-e104-43f0-b356-ee06681350c3', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d0f466ec-5690-4f5f-9a15-fa3381bd3871', 'O''rikzor Market', 'Ташкент, Сергелийский район, массив Сергели-VIII, 83', 41.2464509, 69.2369048, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9e983ecc-5f46-413c-b520-3a0aa163335e', 'Банкомат 1169', '1169', 'operational', 'atm', 'site_d0f466ec-5690-4f5f-9a15-fa3381bd3871', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8a6b88de-f2bb-47be-9241-5affeb60244f', 'OLMA', 'Ташкентская обл., Зангиатинский р-н, Шодлик МСГ, ул. Инок, д. 10', 41.3530915, 69.2897074, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_394cf7d4-50ab-4be0-921d-20a687b37fc3', 'Банкомат 1161', '1161', 'operational', 'atm', 'site_8a6b88de-f2bb-47be-9241-5affeb60244f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a65a7cac-82d0-4731-a685-60fd279abb1d', 'БЦ UzBoom', 'Ташкент, Яшнободский район, махаллинский сход граждан Ширинобод', 41.2933191, 69.3377671, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d8d204f6-ed9e-47a8-9aba-667c0173910c', 'Банкомат 1170', '1170', 'operational', 'atm', 'site_a65a7cac-82d0-4731-a685-60fd279abb1d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_240119ae-8e02-4d91-8221-bff334db2585', 'Monday', 'Ташкент, Шайхантахурский район, улица Укчи, 3', 41.3147669, 69.2442699, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4112fcf8-f44b-4c12-b756-75831b94616d', 'Банкомат 1171', '1171', 'operational', 'atm', 'site_240119ae-8e02-4d91-8221-bff334db2585', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7787c584-9e61-4872-8948-3382b166ccd4', 'Finalndiya', 'Ташкент, Мирабадский район, ул. Темирйулчилар, 79', 41.282709, 69.2795033, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ad213bf4-7104-4625-a1f9-805955990c9a', 'Банкомат 1174', '1174', 'operational', 'atm', 'site_7787c584-9e61-4872-8948-3382b166ccd4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_68951eb3-b882-4440-af5a-695648fe2d44', 'Fix Price V005', 'Ташкент, Мирзо Улугбекский район, ул. Буюк Ипак Йули, д. 298/1', 41.3550102, 69.3918776, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ec6faf66-2483-4de9-abcc-79dcff93aadb', 'Банкомат 1184', '1184', 'operational', 'atm', 'site_68951eb3-b882-4440-af5a-695648fe2d44', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_424c504a-a8b3-4f84-8989-f3f1b1acf34b', 'Fix Price V015', 'Ташкент, Яшнабадский район, 3-й проезд Авиасозлар, д. 3б', 41.2561645, 69.3401444, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_87ae4c1a-c925-4393-a9fc-f7899f3079a8', 'Банкомат 1187', '1187', 'operational', 'atm', 'site_424c504a-a8b3-4f84-8989-f3f1b1acf34b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_17c9ec9b-de61-4095-a171-8e04e81d8b8f', 'Fix Price V003', 'г. Ташкент, Юнусабадский район, проспект Амира Темура, 10', 41.3179427, 69.2833758, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e466abcd-c72e-4cd4-8940-9b53f41c2175', 'Банкомат 1195', '1195', 'operational', 'atm', 'site_17c9ec9b-de61-4095-a171-8e04e81d8b8f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ce1320c2-429e-4504-96e1-076b1ae03dc4', 'Fix Price V016', 'Ташкент, Янгихаетский район, ул. Кургантепа, д. 11', 41.2188387, 69.1977159, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff5237be-60fa-402d-9177-bc1f55dd2c39', 'Банкомат 1188', '1188', 'operational', 'atm', 'site_ce1320c2-429e-4504-96e1-076b1ae03dc4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_51a861fa-7d26-4e44-b7a0-3b9261c2ec67', 'Пункт выдачи Uzum Market', 'Ташкент, Сергелийский район, массив Курувчи, д. 23', 41.2170625, 69.2639586, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3d654b56-9042-4f06-8458-e1fc9ea467c3', 'Банкомат 1197', '1197', 'operational', 'atm', 'site_51a861fa-7d26-4e44-b7a0-3b9261c2ec67', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c868a11b-bdeb-4c0f-be00-67b3884b1da3', 'Пункт выдачи Uzum Market', 'Ташкент, Сергелийский район, массив Куйлюк, 7-й квартал, д. 2А', 41.2443387, 69.2934952, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_88e2430d-dec0-477c-8bea-8bb566e241ee', 'Банкомат 1196', '1196', 'operational', 'atm', 'site_c868a11b-bdeb-4c0f-be00-67b3884b1da3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_863bfabd-ad46-49b8-a25d-33a25922a74c', 'Пункт выдачи Uzum Market', 'Ташкент, Сергелийский район, улица Шокирарык, д.97', 41.2464509, 69.2369048, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b40e9e12-de08-4624-aee9-37c3855ca071', 'Банкомат 1198', '1198', 'operational', 'atm', 'site_863bfabd-ad46-49b8-a25d-33a25922a74c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e26bbd6a-5b5c-43a7-9b6e-2e6c7a402daa', 'Пункт выдачи Uzum Market', 'Ташкент, Янгихаётский район, 8 строительный участок, дом 20', 41.1888603, 69.2152403, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_66600cf5-4933-4c71-b388-aa69a20a8470', 'Банкомат 1199', '1199', 'operational', 'atm', 'site_e26bbd6a-5b5c-43a7-9b6e-2e6c7a402daa', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d5faed2d-209a-425a-b9f3-6ea1bba92b65', 'Пункт выдачи Uzum Market', 'Ташкент, Янгихаётский район, массив Сергели-Vа, 85', 41.1888603, 69.2152403, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b1bd4c3b-b5f1-4c53-bafd-e145f0ed1135', 'Банкомат 1200', '1200', 'operational', 'atm', 'site_d5faed2d-209a-425a-b9f3-6ea1bba92b65', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5dbef3c3-d745-44d7-ab80-26193af32ced', 'Пункт выдачи Uzum Market', 'г. Ташкент, ул. Чиланзар, 82', 41.280081, 69.218642, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1e97a327-970e-4b21-a587-b9c53e48ac95', 'Банкомат 1183', '1183', 'operational', 'atm', 'site_5dbef3c3-d745-44d7-ab80-26193af32ced', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fc838a09-ae4a-486e-aa7d-64b2c28e356a', 'Корзинка Mercato', 'Ташкент, Шайхантахурский район, махаллинский сход граждан Кукча, Малая кольцевая дорога, 57', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_688193f9-ca60-4a49-a0ed-0c077c1265e6', 'Банкомат 1210', '1210', 'operational', 'atm', 'site_fc838a09-ae4a-486e-aa7d-64b2c28e356a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1956f211-41b7-4fe0-b69e-7e15885b3856', 'Корзинка Сайрам', 'Ташкент, Юнусабадский район,ул. Юнусата, 15', 41.3727055, 69.3112557, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5f40dc23-e3c0-4c2f-bf7d-3b2967439815', 'Банкомат 1211', '1211', 'operational', 'atm', 'site_1956f211-41b7-4fe0-b69e-7e15885b3856', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c9fb224-b104-42f4-9fb7-1409911a0679', 'Korzinka Янгиюль 2', 'г. Янгиюль, Мезон МСГ, ул. Самарканд, д. 145', 41.119735, 69.060634, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_893b2d49-208e-4137-a803-e805422d5ae2', 'Банкомат 1159', '1159', 'operational', 'atm', 'site_6c9fb224-b104-42f4-9fb7-1409911a0679', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e13f2daa-1796-4747-a93e-8cd7cddf0acb', 'Dunyo', 'Ташкентская обл., г. Янгиюль, Самаркандская ул., 155', 41.118244, 69.058855, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e9ede634-8eb1-49be-92cb-ae3e563fac81', 'Банкомат 1160', '1160', 'operational', 'atm', 'site_e13f2daa-1796-4747-a93e-8cd7cddf0acb', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9675376c-a2fa-418d-b627-85eb3e4c2961', 'OLMA А-23', 'Ташкентская обл, Уртачирчикский р-н, Учокли МСГ, ул. Яшнаобод, дом 103', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c3f85d1f-f2dc-4302-9ef7-d7e2dca53b02', 'Банкомат 1167', '1167', 'operational', 'atm', 'site_9675376c-a2fa-418d-b627-85eb3e4c2961', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fd21c302-4338-4ce3-a2cf-600061667668', 'Makro m146', 'г. Ташкент, Юнусабадский район, массив Юнусабад, 9-й квартал, 27', 41.379152, 69.28103, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_588f283f-d2d7-4263-b428-2f3961118a36', 'Банкомат 1231', '1231', 'operational', 'atm', 'site_fd21c302-4338-4ce3-a2cf-600061667668', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6ffba5cf-91f3-4d58-9726-6459d0b04cb0', 'Legion МАГАЗИН Бочка', 'Ташкентская область, Бостанлыкский район, городской посёлок Чарвак, улица Ходжикент', 41.630408, 69.939218, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4bc849de-2344-402b-ad6e-ee722091ce03', 'Банкомат 1229', '1229', 'operational', 'atm', 'site_6ffba5cf-91f3-4d58-9726-6459d0b04cb0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b3ba6391-f76f-494a-86bc-6b4eeb8df254', 'Гостиница XONSAROY', 'г.Ташкент, Сергелийский район, махаллинский сход граждан Кубайтепа', 41.2464509, 69.2369048, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6c3ff659-7d9a-40a2-9d40-82ecdb8e2834', 'Банкомат 1237', '1237', 'operational', 'atm', 'site_b3ba6391-f76f-494a-86bc-6b4eeb8df254', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ea67e662-d15e-42ee-a1aa-e19b03ef1a0f', 'OXY Med (Юнусабад) 207', 'Ташкент Юнусабадский район, Октепа МФЙ, улица Октепа, 65-дом.', 41.3587398, 69.2767762, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b846349b-e67d-4334-8853-b92230bc1ae8', 'Банкомат 1235', '1235', 'operational', 'atm', 'site_ea67e662-d15e-42ee-a1aa-e19b03ef1a0f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e42ca3b4-e4f4-4026-a6ac-a08f05dc8f64', 'Белорусская косметика', 'г.Ташкент, Шайхонтохурский район, массив Хадра, 1', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e516c964-dc39-4e4e-9317-0287bad2ad16', 'Банкомат 1236', '1236', 'operational', 'atm', 'site_e42ca3b4-e4f4-4026-a6ac-a08f05dc8f64', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e7e87bb8-27b4-4c44-850f-8c6b9d4ff08b', 'Анхор Локомотив', '​г. Ташкент, Шайхонтохурский район Улица Лабзак, 14/1', 41.3271811, 69.2682411, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4afcc1c8-fe7c-4e8b-a0b0-5eec357f59b5', 'Банкомат 1251', '1251', 'operational', 'atm', 'site_e7e87bb8-27b4-4c44-850f-8c6b9d4ff08b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cb8d47a6-5d6e-4fe2-b33d-77adb4c2fc18', 'Пункт выдачи Uzum Market', 'Ташкент , Мирзо Улугбекский район, массив Городок Тракторостроителей, 2 квартал, д. 22', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_51d27449-d586-4998-a915-08202eed078d', 'Банкомат 1203', '1203', 'operational', 'atm', 'site_cb8d47a6-5d6e-4fe2-b33d-77adb4c2fc18', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_22ad4ef0-db91-4725-a026-c9fc815021c5', 'Olma', 'г. Ташкент, Юнусобадский р-н, Кулолкурган МСГ , проспект Амира Темура, дом 29', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ee6487fb-bdd8-45d0-92b2-10d1a89f9f6a', 'Банкомат 1240', '1240', 'operational', 'atm', 'site_22ad4ef0-db91-4725-a026-c9fc815021c5', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_92cc1a61-2e5f-4e5c-938a-9e9d011b9cf2', 'Пункт выдачи Uzum Market', 'Ташкент, Яшнабадский район, улица Ахангаран Йули, д.70', 41.2897825, 69.3586792, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b6ccb56e-2ee5-4eb5-9e7c-b80ceae68c77', 'Банкомат 1194', '1194', 'operational', 'atm', 'site_92cc1a61-2e5f-4e5c-938a-9e9d011b9cf2', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0abbfed-4a57-4356-961a-e5a4cc72d4ae', 'OXY Med (М.Горький)', 'Ташкент, Мирзо-Улугбекский р-н,, ул. Буюк Ипак Йули, 60', 41.3532121, 69.387638, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_213cd9f1-3131-4f5f-b791-373b138fe161', 'Банкомат 1233', '1233', 'operational', 'atm', 'site_b0abbfed-4a57-4356-961a-e5a4cc72d4ae', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5047bf82-a441-4023-a30e-90dacd379f5f', 'Tammadum', 'Бекабад, ул. Истикбол, 20', 40.2133607, 69.2725799, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e94fbf73-ebbc-4801-9321-9fc2f6fbaeff', 'Банкомат 1230', '1230', 'operational', 'atm', 'site_5047bf82-a441-4023-a30e-90dacd379f5f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b09cfdb0-ae5c-495f-8316-b8f2042a851e', 'Корзинка Фергана', 'Ферганская обл.,г. Фергана, улица Юксалиш 53.', 40.3730473, 71.7870121, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4eb85a76-4354-46a0-a1b5-ddc30eebfaa4', 'Банкомат 1182', '1182', 'operational', 'atm', 'site_b09cfdb0-ae5c-495f-8316-b8f2042a851e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8c262a3f-600c-4b1f-970b-2e916e539446', 'Korzinka K248', 'Ферганская область, Кувасай, махаллинский сход граждан Хамид Алимджан', 40.291865, 72.000574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ebe0b303-7c67-464f-a08d-54d2bd0bfa3a', 'Банкомат 1223', '1223', 'operational', 'atm', 'site_8c262a3f-600c-4b1f-970b-2e916e539446', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7236a1dc-d82f-48b5-9ff5-f8b3a32dcb01', 'Единое Окно', 'Фергансакая обл., Ферганский район, Маргиланский МФЮ, улица Маргилана, 72', 40.485414, 71.755687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fb997cd2-8c45-47e2-a31a-f7ebeb718e02', 'Банкомат 1226', '1226', 'operational', 'atm', 'site_7236a1dc-d82f-48b5-9ff5-f8b3a32dcb01', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4fb0ad40-aea4-46d7-9e0e-10c6252eefbe', 'Пункт выдачи Uzum Market', 'Фергана, махаллинский сход граждан Мададкор, ул. Юксалиш, 28', 40.3777006, 71.8014092, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c99648a4-fc14-44f2-9a1d-6f19d01ae535', 'Банкомат 1177', '1177', 'operational', 'atm', 'site_4fb0ad40-aea4-46d7-9e0e-10c6252eefbe', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e9a7da9-32ca-4911-9a2b-47cbfb52c25e', 'Пункт выдачи Uzum Market', 'Хива, улица Нажмиддин Кубро', 41.384191, 60.3587037, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_81f01f7e-127a-46c7-b2d6-cf8ca7507b8e', 'Банкомат 1219', '1219', 'operational', 'atm', 'site_2e9a7da9-32ca-4911-9a2b-47cbfb52c25e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dcbdbd26-7b13-4350-809f-2447ec341428', 'Пункт выдачи Uzum Market', 'Хива, улица Амира Темура, дом 50', 41.378037, 60.3707031, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0e720b5b-3a5d-49c9-b5ec-890dca891f5d', 'Банкомат 1220', '1220', 'operational', 'atm', 'site_dcbdbd26-7b13-4350-809f-2447ec341428', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c8759098-6f66-4a50-8814-b30ac9bb21f2', 'ISHONCH(Xiva)', 'Хива, Хорезмская область,улица Феруз, 12', 41.3861369, 60.3615019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_18893a08-340e-4d15-bfda-e7c6c487f2ef', 'Банкомат 1227', '1227', 'operational', 'atm', 'site_c8759098-6f66-4a50-8814-b30ac9bb21f2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fa3d4c5b-095d-4a70-ba07-7eb8767712f4', 'Karavan Hotel', 'Ургенч, улица Ханка, 154', 41.5461924, 60.6190505, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_95d5d9c2-a2e9-4f7b-a3a7-ada511072c94', 'Банкомат 1331', '1331', 'operational', 'atm', 'site_fa3d4c5b-095d-4a70-ba07-7eb8767712f4', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c8eefc2-976a-426c-98e3-d9cc05d75c95', 'NAFFA BOUTIQUE', 'Ургенч, улица Гурлан, 360', 41.5649478, 60.6086435, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5f71784b-da17-4fbe-9b21-265660389648', 'Банкомат 1332', '1332', 'operational', 'atm', 'site_6c8eefc2-976a-426c-98e3-d9cc05d75c95', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9347b885-cdeb-4a8c-939e-913bc0314734', 'Korzinka K213 Саттепо 84I', 'г. Самарканд, МСГ «Хофиза Шерози», массив Саттепо, 84', 39.634556, 66.914419, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2911dad7-a1ae-4f9f-ada4-f0b15a408032', 'Банкомат 1335', '1335', 'operational', 'atm', 'site_9347b885-cdeb-4a8c-939e-913bc0314734', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d96fb5ef-b5dd-4e06-984a-cf6051387421', 'Единое Окно', 'Самаркандская обл., Самаркандский район, город Гулобод', 39.581049, 66.96822, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_de1decdf-9356-4ede-8e95-9e62ab74332c', 'Банкомат 1338', '1338', 'operational', 'atm', 'site_d96fb5ef-b5dd-4e06-984a-cf6051387421', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_57665d36-f7ac-4c46-a1af-f923fee1e537', 'UZUM MARKET', 'Ташкент, Сергелийский р-н, населённый пункт Казахаул', 41.3707991, 69.2656001, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_be31e224-0ff8-473b-b19b-8cf5a79b46e7', 'Банкомат 1350', '1350', 'operational', 'atm', 'site_57665d36-f7ac-4c46-a1af-f923fee1e537', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_21e25da8-0ad0-4df5-9edc-d807cf13501f', 'UZUM MARKET', 'Ташкент, Сергелийский р-н, населённый пункт Казахаул', 41.3707991, 69.2656001, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5c4977c3-c71e-4cb1-b7f7-90367afc7a56', 'Банкомат 1351', '1351', 'operational', 'atm', 'site_21e25da8-0ad0-4df5-9edc-d807cf13501f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_62fe0242-f35e-439d-988b-7c91ee3c4074', 'OXY Med (Тахтапуль)', 'Ташкент, Шайхантахурский р-н, махаллинский сход граждан Кукча, Малая кольцевая дорога, 3Б', 41.3436548, 69.2629692, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_245ab9e0-332e-42c5-bd66-bd56b320f48d', 'Банкомат 1232', '1232', 'operational', 'atm', 'site_62fe0242-f35e-439d-988b-7c91ee3c4074', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f54ae4a0-fa6c-484a-8da7-0927bfb77bb6', 'Olma', 'г. Ташкент, Алмазарский р-н, Мискин МСГ, ул. Янги Олмазор, д. 3а', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4b71fc84-7f28-4c7e-abe0-efd80cdf011a', 'Банкомат 1238', '1238', 'operational', 'atm', 'site_f54ae4a0-fa6c-484a-8da7-0927bfb77bb6', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ec09fd50-70b1-4e9c-b6a6-d4dc169ec929', 'ISHONCH(Zangiota)', 'Ташкентская обл., Зангиатинский район, село Зангиота, МФЙ Урта, ул. Амира Темура', 41.25, 69.083333, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2707f13-729a-4ff6-8e03-2d4c496d1a7d', 'Банкомат 1247', '1247', 'operational', 'atm', 'site_ec09fd50-70b1-4e9c-b6a6-d4dc169ec929', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_92b4327d-b79c-45f7-aeeb-925ce885aa24', 'OXY Med (Ташкентская обл.) 123', 'Ташкентская область, Зангиатинский район, улица Кичкина Каъни, 34, махаллинский сход граждан Асл.', 41.3642719, 69.333227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f7e00b72-647c-4536-a148-61a281094e20', 'Банкомат 1254', '1254', 'operational', 'atm', 'site_92b4327d-b79c-45f7-aeeb-925ce885aa24', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6807057e-1e7b-4418-9cf2-2d265624eec5', 'OXY Med
(Саракулька)', 'г.Ташкент,
Мирабадский р-н, ул. Мехржон, 45', 41.2875392, 69.2854282, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c4779555-556e-4647-83df-5ec3d5979027', 'Банкомат 1264', '1264', 'operational', 'atm', 'site_6807057e-1e7b-4418-9cf2-2d265624eec5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_db9fd8a0-153b-4d60-82fc-aa03ad6090bf', 'Pharmacosmos C-51 УЧКАХРАМОН', 'Ташкент, Юнусабадский район, 6-й пр. Кулолкургон, 28', 41.3794854, 69.2928582, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_54b00139-09d7-41f5-a4c9-1e9ede6e4d83', 'Банкомат 1277', '1277', 'operational', 'atm', 'site_db9fd8a0-153b-4d60-82fc-aa03ad6090bf', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_72ce993e-51f0-4d92-83cf-d8ffb8fe1a93', 'Pharmacosmos C-71 РИСОВЫЙ', 'Ташкент, Мирабадский район, ул. Абдурауфа Фитрата, 2/1', 41.2716484, 69.306489, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dc60a1cf-4d77-4fe8-b0b0-444086d40139', 'Банкомат 1282', '1282', 'operational', 'atm', 'site_72ce993e-51f0-4d92-83cf-d8ffb8fe1a93', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5fcb14b6-ffba-4ac8-8997-032c2b7f8d95', 'Pharmacosmos C-72 ЯНГИ КОРАСУВ', 'Ташкент, Мирабадский район, улица Шукура Бурханова', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6fea900f-941b-4e52-81b2-6e41d7a3d1f6', 'Банкомат 1283', '1283', 'operational', 'atm', 'site_5fcb14b6-ffba-4ac8-8997-032c2b7f8d95', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b29d6bdc-6c3c-453b-9ee3-750ef8c1f20e', 'AYLIN', 'г. Ташкент, Сергелийский район, массив Сергели-V, 6А', 41.2197188, 69.2551763, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_731bf97a-1499-49bb-b39a-9a32886cc55b', 'Банкомат 1286', '1286', 'operational', 'atm', 'site_b29d6bdc-6c3c-453b-9ee3-750ef8c1f20e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dfa785ac-49bb-41e0-8e9a-9372d11e1fcc', 'Pharmacosmos С-93 Кора-Камиш Кушбозор', 'Ташкент, Алмазарский район, массив Каракамыш, квартал 2/5, 17', 41.3710384, 69.2054794, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f046521c-1dae-413c-bd38-6cecd15f5d0a', 'Банкомат 1287', '1287', 'operational', 'atm', 'site_dfa785ac-49bb-41e0-8e9a-9372d11e1fcc', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0a71d8b5-f6f8-40ba-8900-9fd8ff1e4c93', 'Pharmacosmos С-95 Тошми-2', 'Ташкент, Шайхонтохурский район, ул. Фараби, 17', 41.3452652, 69.206653, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_34ea4ccc-1a46-4345-bd96-65fdd833482a', 'Банкомат 1288', '1288', 'operational', 'atm', 'site_0a71d8b5-f6f8-40ba-8900-9fd8ff1e4c93', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2b301b74-1242-4c4d-b17f-2ed3318c0490', 'Pharmacosmos C-103 Tarakanchik', 'Ташкент, Мирзо-Улугбекский район, массив Буз-2, 25', 41.3326691, 69.3305289, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_87ce6105-9a47-497f-82f6-e45e0e0280dd', 'Банкомат 1289', '1289', 'operational', 'atm', 'site_2b301b74-1242-4c4d-b17f-2ed3318c0490', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_58a73485-9cdc-4c35-bed4-be6b8f198003', 'Pharmacosmos C-104 Uchxo''z', 'Ташкент, Мирзо-Улугбекский район, улица Миллий Бог', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b25de932-0d1b-4d10-ae12-bfe8b834d8b5', 'Банкомат 1290', '1290', 'operational', 'atm', 'site_58a73485-9cdc-4c35-bed4-be6b8f198003', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9415ec52-eb10-4208-8452-4e199471aba4', 'Pharmacosmos C-105 Chimboy chorraxa', 'Ташкент, Алмазарский район, ул. 1-й проезд Умид, 62Б', 41.362149, 69.2266019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a178f04f-79ce-4974-8ef9-0fe0b67af5eb', 'Банкомат 1292', '1292', 'operational', 'atm', 'site_9415ec52-eb10-4208-8452-4e199471aba4', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d6c777d4-a63c-4f3e-a3d4-a3daafd7a81c', 'Pharmacosmos C-114 Ahmad Yugnakiy', 'Ташкент, Мирзо-Улугбекский район, массив Ахмада Югнаки, 12А', 41.3455955, 69.3811066, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_28378263-1e13-4ee4-b463-d09d74cf9519', 'Банкомат 1294', '1294', 'operational', 'atm', 'site_d6c777d4-a63c-4f3e-a3d4-a3daafd7a81c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8a258bac-b9f9-4794-b2a8-9a097f82f6d9', 'Korzinka Шахристан', 'г. Ташкент, Юнусабадский район, проспект Амира Темура, 112-й дом', 41.350742, 69.288378, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_930a1669-71d7-41b5-9f0b-977370c45746', 'Банкомат 1298', '1298', 'operational', 'atm', 'site_8a258bac-b9f9-4794-b2a8-9a097f82f6d9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7cbed49d-4fa1-434a-b283-4c883e1ffc26', 'Pharmacosmos C-31 ПОЧТА', 'Ташкентская область, Зангиатинский район, махаллинский сход граждан Киргузар, улица Назарбек, 19A', 41.25, 69.083333, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f411b9f7-57ac-4392-99f8-a221213863de', 'Банкомат 1300', '1300', 'operational', 'atm', 'site_7cbed49d-4fa1-434a-b283-4c883e1ffc26', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_264b6251-7aff-4f22-bb7c-3f67b44ebd16', 'Единое окно', 'Самаркандская обл., Булунгурский район, Мехржон МФЮ, улица Октепа, 101', 39.761291, 67.269017, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ed2c394a-0cb0-4b4d-a486-185e6d32b4bb', 'Банкомат 1325', '1325', 'operational', 'atm', 'site_264b6251-7aff-4f22-bb7c-3f67b44ebd16', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fdebd960-76c0-4f7d-966f-71129dbd36e3', 'Единое Окно', 'Самаркандская обл., Иштиханский район, улица Навруз, 2', 39.96394, 66.497863, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0aba6f15-a4f3-4576-8876-b47c572e89eb', 'Банкомат 1328', '1328', 'operational', 'atm', 'site_fdebd960-76c0-4f7d-966f-71129dbd36e3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c9e986ca-4f03-4257-abd3-3e9705885d02', 'Единое Окно', 'Самаркандская область, Пастдаргамский район, город Джума, улица Нодирабегим, 66', 39.710825, 66.669175, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_811ca7cf-86d4-4a0d-9486-1f778a963c7e', 'Банкомат 1336', '1336', 'operational', 'atm', 'site_c9e986ca-4f03-4257-abd3-3e9705885d02', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ce1602de-bcdd-4724-a677-43f2b353b24b', 'Fix Price V028', 'Ташкентская область, г. Чирчик, ул. Шарафа Рашидова, 33', 41.4726109, 69.5896266, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cd4a489e-ef6d-452c-adbd-b76e6f5992b6', 'Банкомат 1193', '1193', 'operational', 'atm', 'site_ce1602de-bcdd-4724-a677-43f2b353b24b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dd67ba40-73c6-46b5-a840-db1920575150', 'OXY Med (Сергели Янгихаёт) 144', 'Ташкент, Сергелийский район, массив Сергели-VI, 71', 41.2197188, 69.2551763, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b322d805-7fe1-4c37-82ae-87ab6d5b1a33', 'Банкомат 1234', '1234', 'operational', 'atm', 'site_dd67ba40-73c6-46b5-a840-db1920575150', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d670a661-278c-4728-938f-37344690c3cb', 'ISHONCH(Bo''ka)', 'Ташкентская обл., Букинский район, МФЙ Янги Хаёт, ул. Марказий, дом 35', 40.75, 69.166667, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ba1bad76-4ec5-4ad2-85a6-c569a0e2f8d1', 'Банкомат 1241', '1241', 'operational', 'atm', 'site_d670a661-278c-4728-938f-37344690c3cb', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8a693744-2202-498d-81f7-889a1e10d74e', 'Daily Supermarket (BI 1) - Ик-ота', 'Ташкент, Бектимирский район,махаллинский сход граждан Абай, жилой комплекс Мусаффо Маскан,', 41.2281105, 69.3205686, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b4b68d68-20c1-423a-ab15-ce310b335af6', 'Банкомат 1262', '1262', 'operational', 'atm', 'site_8a693744-2202-498d-81f7-889a1e10d74e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_caa32083-8b17-4fe1-90da-fffced4d3228', 'Daily Supermarket (BI 1) - Куйлук', 'Ташкент, Яшнабадский район, махаллинский сход граждан Катта Куйлик, ул.Тантана', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1006838d-194f-46c3-bf2b-c38504273798', 'Банкомат 1263', '1263', 'operational', 'atm', 'site_caa32083-8b17-4fe1-90da-fffced4d3228', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f6b3b4dc-2582-4a49-b6c2-ffcc9c35ec82', 'Makro - 083', 'г. Ташкент, ул. Янги Куйлюк, 16Б', 41.251884, 69.308215, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a809e405-2a14-4aa5-bcae-1d13601c61dc', 'Банкомат 1265', '1265', 'operational', 'atm', 'site_f6b3b4dc-2582-4a49-b6c2-ffcc9c35ec82', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7d178d3c-062c-4c7e-b17a-ffe8645cfbb5', 'Ayva Market', 'Ташкент, Бектемирский район, махаллинский сход граждан Абай', 41.2548876, 69.3740922, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_be74819f-bf29-46e2-8a3c-e490ff0ec95a', 'Банкомат 1267', '1267', 'operational', 'atm', 'site_7d178d3c-062c-4c7e-b17a-ffe8645cfbb5', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d180f817-c731-45b1-9f14-97cedf597c6c', 'Pharmacosmos C-06 СЕЛЬХОЗ', 'Ташкент, Кибрайский район, ул. Тимура Малика, 1', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fd488478-1334-4358-a6d5-7f35470adf5d', 'Банкомат 1269', '1269', 'operational', 'atm', 'site_d180f817-c731-45b1-9f14-97cedf597c6c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_05663037-dbf0-467c-af40-2894c2b25e5f', 'OLMA A-25', 'Ташкентская обл., Уртачирчикский р-н, Фаровон МСГ, ул. Ташкент йули 1, дом 129', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_033b07f0-fea3-485e-bf63-b009938aecb6', 'Банкомат 1299', '1299', 'operational', 'atm', 'site_05663037-dbf0-467c-af40-2894c2b25e5f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5242066b-0ddf-498c-b8df-7d7c8acc4916', 'Korzinka Буин (Кибрай)', 'Ташкентская область, Кибрайский район, населённый пункт Гулистан', 41.411273, 69.308918, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b87b41ea-1d23-442e-b355-2f33db621e4d', 'Банкомат 1301', '1301', 'operational', 'atm', 'site_5242066b-0ddf-498c-b8df-7d7c8acc4916', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_db8791fb-ac69-43dc-9e1a-fa67973caa6d', 'Pharmacosmos C-81 Газалкент', 'Ташкентская область, Бостанлыкский район, махаллинский сход граждан, улица Абу-Райхон Беруний', 41.666667, 70, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_13b9b6c6-c847-4a27-aa36-c92cab5c92e5', 'Банкомат 1307', '1307', 'operational', 'atm', 'site_db8791fb-ac69-43dc-9e1a-fa67973caa6d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4c672da3-4497-4da8-aa09-27d0adc25ef8', 'Пункт выдачи Uzum Market', 'Бухара, улица Мустакиллик, 12', 40.1216494, 64.4944438, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a0e859b2-e12c-4e82-b1ad-fbaa10a7e439', 'Банкомат 1309', '1309', 'operational', 'atm', 'site_4c672da3-4497-4da8-aa09-27d0adc25ef8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0bfd3b2-fb5b-4d04-aa11-4b2836b88a9c', 'Пункт выдачи Uzum Market', 'Бухара, 5А микрорайон', 39.7443596, 64.4194459, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f3208cfe-650a-4c7f-a2ab-2eb6a72b141f', 'Банкомат 1310', '1310', 'operational', 'atm', 'site_b0bfd3b2-fb5b-4d04-aa11-4b2836b88a9c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3fee8aca-8af2-49fa-a5a8-c55baf257c59', 'Пункт выдачи Uzum Market', 'Бухара, улица Ислама Каримова, 2', 39.779306, 64.4302213, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ea155fed-9a4f-4057-9ed1-26d89118b554', 'Банкомат 1311', '1311', 'operational', 'atm', 'site_3fee8aca-8af2-49fa-a5a8-c55baf257c59', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_82854878-9171-4b0e-9b94-09a543465c46', 'Пункт выдачи Uzum Market', 'Бухара, улица Пиридастгир, 308', 39.7502341, 64.4398156, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3b23e9f7-82eb-4957-bbd9-d3e48fb26406', 'Банкомат 1312', '1312', 'operational', 'atm', 'site_82854878-9171-4b0e-9b94-09a543465c46', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ed22cf40-b2b4-4059-9a4a-07e35419fe25', 'Korzinka K239', 'г. Бухара, ул. Намозгох, 111', 39.750914, 64.406287, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eea1f5a1-c853-45a5-855d-624ed65c0373', 'Банкомат 1313', '1313', 'operational', 'atm', 'site_ed22cf40-b2b4-4059-9a4a-07e35419fe25', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8c45283f-f7c9-4663-9c49-2438726ebf56', 'Пункт выдачи Uzum Market', 'Бухара, улица Каюма Муртазаева, 4Б', 39.7566643, 64.4288149, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a374db97-ba27-4e8f-916e-1ea09b0a674f', 'Банкомат 1314', '1314', 'operational', 'atm', 'site_8c45283f-f7c9-4663-9c49-2438726ebf56', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_28bcfbd4-2958-40b7-9187-0768a58de20f', 'Пункт выдачи Uzum Market', 'Бухара, улица Самарканд, 86', 39.7768178, 64.4203797, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_624c5c2c-5239-43be-954c-50b1953284ef', 'Банкомат 1315', '1315', 'operational', 'atm', 'site_28bcfbd4-2958-40b7-9187-0768a58de20f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8a0c6976-a067-4d8c-9486-05b4173d9a4b', 'Пункт выдачи Uzum Market', 'Бухара, улица Амир Темура, 37', 39.7304717, 64.5632303, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_772fbfe0-6f88-4013-b68d-4d95b03bf5dc', 'Банкомат 1316', '1316', 'operational', 'atm', 'site_8a0c6976-a067-4d8c-9486-05b4173d9a4b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bbb9c843-41a9-4c2e-938b-8eca9cef5238', 'ISHONCH(Galaosiyo)', 'Бухарская обл., Бухарский район, г. Галаасийо, МФЙ Дустлик, ул. Великий Шелковый путь', 41.3328211, 69.2883843, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7844e36f-be1f-4625-9fb2-984c0a5ebd60', 'Банкомат 1317', '1317', 'operational', 'atm', 'site_bbb9c843-41a9-4c2e-938b-8eca9cef5238', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_44661f66-d277-4b3e-b429-0a7de7670054', 'OXY Med (Бухара)2\1', 'Бухара, массив Шарк-1', 39.7610636, 64.4494431, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_749c2625-d618-4ec5-bb9a-555fa38d2dd9', 'Банкомат 1319', '1319', 'operational', 'atm', 'site_44661f66-d277-4b3e-b429-0a7de7670054', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e3c468f1-7853-4ebd-8322-f15a94b15d27', 'Сулаймонобод', 'г. Бухара Зарафшанский тракт, 7', 40.1568072, 64.7496662, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ffb9ad5a-034c-4630-9af6-0e100934c62a', 'Банкомат 1320', '1320', 'operational', 'atm', 'site_e3c468f1-7853-4ebd-8322-f15a94b15d27', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0fc8bd31-cc82-4dba-a2f7-abfbb12e8c34', 'Orzutech Computers', 'Бухара, ул. Мухаммада Икбала, 64', 39.7628309, 64.4299891, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_16917267-4b83-497c-9f47-cdde60bc38ea', 'Банкомат 1321', '1321', 'operational', 'atm', 'site_0fc8bd31-cc82-4dba-a2f7-abfbb12e8c34', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4bac0804-bfc2-4d55-8599-26024e2d0718', 'Единое окно', 'Самаркандская обл., Ургутский район, МФЮ «Дустлик», проспект Навои', 39.427761, 67.239341, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0e89cc76-bd59-41c1-88cb-3853b0bc6b18', 'Банкомат 1327', '1327', 'operational', 'atm', 'site_4bac0804-bfc2-4d55-8599-26024e2d0718', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_74189c01-67c2-4398-93c0-dbaccb889028', 'OOO "NAVBAHOR APTEKA" №19', 'Ташкент, Юнусабадский район, ул. Богишамол, 120', 41.3592883, 69.3376992, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d4b753ab-6fbc-4dc4-9d4b-72d023ac4b4c', 'Банкомат 1334', '1334', 'operational', 'atm', 'site_74189c01-67c2-4398-93c0-dbaccb889028', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_07d3ccfa-edf2-437a-aba9-d11b90feeca4', 'Korzinka Махалля -Сарикул', 'г. Ташкент, Яшнабадский район, улица Абдурауфа Фитрата, 33', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b98f64fa-e551-4861-82c7-045670f251b4', 'Банкомат 1284', '1284', 'operational', 'atm', 'site_07d3ccfa-edf2-437a-aba9-d11b90feeca4', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fd100e1f-e953-4a2d-bc09-08f7d24a8bc0', 'Korzinka Махалля Ахилабад', 'Ташкент, Юнусабадский район, 13-й квартал, МСГ «Севинч», 36а', 41.371757, 69.29999, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7ff1541f-627b-4d19-ae5e-ea295a4e8feb', 'Банкомат 1341', '1341', 'operational', 'atm', 'site_fd100e1f-e953-4a2d-bc09-08f7d24a8bc0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c16a7ffe-5ef9-468b-a354-a0fc84992be8', 'OOO "NAVBAHOR APTEKA" №70', 'Ташкент, Яшнабадский район, Авиасозлар 4-й квартал, 2', 41.2932642, 69.3560016, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_44447bb8-9596-4e4c-9505-222105508cff', 'Банкомат 1340', '1340', 'operational', 'atm', 'site_c16a7ffe-5ef9-468b-a354-a0fc84992be8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f0d16ca6-fed0-45ee-aead-68975aa34bea', 'OLMA М-153', 'Ташкент, Мирза-Улугбекский р-н,МСГ Сайрам, ул.Сайрам ,дом 20', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_50fe6cf2-4a2f-4e8b-8895-d3c5f3737a0c', 'Банкомат 1345', '1345', 'operational', 'atm', 'site_f0d16ca6-fed0-45ee-aead-68975aa34bea', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ba97f2e3-734e-4daa-b02c-cb270866fe6e', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яшнабадский район, улица Корасу, дом 17 (Авиасозлар)', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_79271454-3c86-4882-bfcc-83d55205d891', 'Банкомат 1367', '1367', 'operational', 'atm', 'site_ba97f2e3-734e-4daa-b02c-cb270866fe6e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9271e68b-ca83-46e0-a1b3-b3ef84c58b8b', 'ATLAS Сергили', 'Ташкент, Сергелийский район, ул. Янги Сергели 110', 41.2263529, 69.2208328, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6054750d-d264-4ef4-a9d6-ec5df76e0178', 'Банкомат 1333', '1333', 'operational', 'atm', 'site_9271e68b-ca83-46e0-a1b3-b3ef84c58b8b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4f1ba6e2-8637-4bc2-8a89-6809a833d129', 'OLMA-С-1', 'Ташкентская обл., г. Чирчик, 3-й микрорайон, 32', 41.4938227, 69.5775209, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_953fa3ef-b3eb-4e85-905f-7f70380769ac', 'Банкомат 1153', '1153', 'operational', 'atm', 'site_4f1ba6e2-8637-4bc2-8a89-6809a833d129', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a45fdb2c-bd69-44ad-9439-98eac2fbe188', 'ATLAS Максим Горький', 'Ташкент, Мирзо-Улугбекский район, ул. Буюк Ипак Йули, 111-117', 41.353232, 69.3878531, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_de2d73c9-1f35-4a09-a9b5-9db50643b104', 'Банкомат 1342', '1342', 'operational', 'atm', 'site_a45fdb2c-bd69-44ad-9439-98eac2fbe188', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_41967557-8b34-4f3e-84ff-982323abbec4', 'OLMA С-11', 'Ташкентская обл., Бостанлыкский р-н, махалля Марказий, ул. Амира Темура, д. 39', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_564486d3-694a-4167-99d9-10ddad127189', 'Банкомат 1157', '1157', 'operational', 'atm', 'site_41967557-8b34-4f3e-84ff-982323abbec4', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2fe6a5ec-3550-4b3e-9943-3b0525331e37', 'OLMA М-11', 'Ташкент, Мирзо Улугбекский район, улица Мирзо Улугбека, 142-дом', 41.3245411, 69.3246302, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_45c8a996-cc0f-4702-bf1e-739e334b19c2', 'Банкомат 1225', '1225', 'operational', 'atm', 'site_2fe6a5ec-3550-4b3e-9943-3b0525331e37', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f7819002-6439-4a13-85c1-2d37701616f5', 'Aziya Market', 'Ташкентская область, г. Бекабад,14-й микрорайон, 76,', 40.2294765, 69.2554858, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cefb0628-270a-4ba8-98e2-7a035be0d149', 'Банкомат 1259', '1259', 'operational', 'atm', 'site_f7819002-6439-4a13-85c1-2d37701616f5', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a8356e4a-c538-4b2d-95c2-2a0199e97d85', 'Pharmacosmos C-39 Буюк ипак Йули', 'Ташкент, Мирзо-Улугбекский район, ул. Мирзо Улугбека, 69', 41.3303248, 69.3290207, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dab861b9-4d10-468f-8e41-adfbccfbcd55', 'Банкомат 1274', '1274', 'operational', 'atm', 'site_a8356e4a-c538-4b2d-95c2-2a0199e97d85', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1674aa6a-9202-468e-bdf2-b0e15975bfdc', 'Pharmacosmos C-52 ТТЗ-1', 'Ташкент, Мирзо-Улугбекский район, массив Городок Тракторостроителей, 1-й квартал, 4', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b8bc9b51-d8de-463f-9430-bf61af284934', 'Банкомат 1278', '1278', 'operational', 'atm', 'site_1674aa6a-9202-468e-bdf2-b0e15975bfdc', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d62c3838-7d0f-4d49-b8b4-17aa4df9fee6', 'Pharmacosmos C-126 Labzak', 'Ташкент, Шайхантахурский район, ул. Лабзак, 76', 41.3303561, 69.2635638, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c6fc393c-2f73-42b0-985b-15da61862ee0', 'Банкомат 1297', '1297', 'operational', 'atm', 'site_d62c3838-7d0f-4d49-b8b4-17aa4df9fee6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7c439a8a-afdf-459f-8d85-ff5446fdbd03', 'Единое Окно', 'Самаркандская обл., Окдарёский район, город Лоиш, улица Амира Темура, дом 1', 39.869356, 66.76733, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_13c26c46-2f02-491f-b725-085f2757a92d', 'Банкомат 1330', '1330', 'operational', 'atm', 'site_7c439a8a-afdf-459f-8d85-ff5446fdbd03', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f7936efe-1982-40dc-92ff-de7aa344afd3', 'Пункт выдачи Uzum Market', 'Фергана, ул. Алишера Навои, 74', 40.3616675, 71.7820478, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f380545f-a1fb-40c3-bdbd-1b738f4a8284', 'Банкомат 1353', '1353', 'operational', 'atm', 'site_f7936efe-1982-40dc-92ff-de7aa344afd3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ce3dcaea-01bc-4894-958c-fc5596933b66', 'Пункт выдачи Uzum Market', 'Ферганская область, Маргилан, махаллинский сход граждан Истиклол', 40.4342805, 71.7154302, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_73bb31bd-da4b-4474-9c5e-c34673bdee59', 'Банкомат 1361', '1361', 'operational', 'atm', 'site_ce3dcaea-01bc-4894-958c-fc5596933b66', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7d68a0ce-1a30-4d4b-9c4f-f5ae088ddca7', 'Пункт выдачи Uzum Market', 'г. Ташкент, Сергелийский район, массив Куйлюк, 6-й квартал, дом 15', 41.2443429, 69.2889369, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8038e02a-4ce1-46a5-b6da-86adf0a1b29b', 'Банкомат 1364', '1364', 'operational', 'atm', 'site_7d68a0ce-1a30-4d4b-9c4f-f5ae088ddca7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f7642878-91dd-4b1a-be7f-10d650fcc93b', 'Пункт выдачи Uzum Market', 'г. Бекабад, 12-й микрорайон, дом 45', 40.2294765, 69.2554858, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cecd56b9-046f-41b3-be91-06dfcfc29260', 'Банкомат 1393', '1393', 'operational', 'atm', 'site_f7642878-91dd-4b1a-be7f-10d650fcc93b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4f007de9-51e7-40dc-bae0-88b14c196c3f', 'Единое Окно', 'Фергансакая обл., Город Коканд А.Ул. Навои, дом 205-а', 40.539062, 70.976242, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c0d199a8-c73a-4b45-b501-9ce56ce93999', 'Банкомат 1399', '1399', 'operational', 'atm', 'site_4f007de9-51e7-40dc-bae0-88b14c196c3f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d771f6f6-f6e5-4d22-921b-c221a63eb3a0', 'ATLAS Фергана', 'г. Фергана,, улица Тарона, 16', 40.4778416, 71.7194939, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0087bccc-c268-4e08-b4de-2e65d15756c1', 'Банкомат 1402', '1402', 'operational', 'atm', 'site_d771f6f6-f6e5-4d22-921b-c221a63eb3a0', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d47cb960-5adc-4cb0-bcf7-06445d2ba436', 'Makro m138', 'г Коканд, Мукими, Олтин водий МСГ, улица Мовароуннахр, д.3/2', 40.5375903, 70.9361849, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1b77491e-9ceb-4965-ad57-06cff4899087', 'Банкомат 1405', '1405', 'operational', 'atm', 'site_d47cb960-5adc-4cb0-bcf7-06445d2ba436', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0031ee4-ab76-4b52-ad06-6ae16a974940', 'Узум маркет', 'г. Ташкент, Сергелийский район, ул. Нулуфар 77/7', 41.3707991, 69.2656001, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_187be3da-d0a3-4ba0-835e-719564c7e8cd', 'Банкомат 1408', '1408', 'operational', 'atm', 'site_b0031ee4-ab76-4b52-ad06-6ae16a974940', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_748723fb-413c-4ff5-be09-24a92ffedfaf', 'Международный аэропорт Фергана', 'г. Фергана, ул. Аэропорт, 16', 40.3583628, 71.7510007, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6d9d8a6d-01a0-40c8-bdc8-d4f5c946acac', 'Банкомат 1410', '1410', 'operational', 'atm', 'site_748723fb-413c-4ff5-be09-24a92ffedfaf', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d8f0b2d4-6dc9-4b94-8dd9-cb98105efd63', 'Ayman Farm', 'г. Наманган, 7-й микрорайон', 40.9956903, 71.6032165, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e5201d0a-c4d9-4152-bd76-dafed81053f0', 'Банкомат 1411', '1411', 'operational', 'atm', 'site_d8f0b2d4-6dc9-4b94-8dd9-cb98105efd63', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_37a5b997-904f-40c4-b569-05f4dda1adf2', 'Sportzone', 'г. Наманган, махаллинский сход граждан Маргилан, ул. Маргилон, 12A', 40.9936532, 71.6699213, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_61a0787f-b115-4899-928d-a55bb542aa61', 'Банкомат 1412', '1412', 'operational', 'atm', 'site_37a5b997-904f-40c4-b569-05f4dda1adf2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fdb94910-a76e-4ae9-9a71-8cf8e8504a3e', 'Istiqlol', 'г. Наманган, улица Хуррият', 40.9956422, 71.5888611, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9f324f69-63d4-40cd-954a-5774294a521f', 'Банкомат 1415', '1415', 'operational', 'atm', 'site_fdb94910-a76e-4ae9-9a71-8cf8e8504a3e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_24174681-0357-4fb4-83d6-2bf6df8f0cca', 'Shedevr Plaza', 'г. Наманган, махаллинский сход граждан Бобуршох, ул. Бобуршох, 8', 40.9934378, 71.6777811, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_10dbabd8-d645-4b0d-8224-e411a6351a5e', 'Банкомат 1416', '1416', 'operational', 'atm', 'site_24174681-0357-4fb4-83d6-2bf6df8f0cca', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c7bd3a8a-4927-447c-b7a8-7671b895e523', 'Пункт выдачи Uzum Market', 'г. Карши, 4 микрорайон, 2 дом', 38.8283663, 65.787013, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_72da8ae6-cce2-45a7-8b3a-19dd704ef24d', 'Банкомат 1426', '1426', 'operational', 'atm', 'site_c7bd3a8a-4927-447c-b7a8-7671b895e523', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e741bac-ae5f-4c9e-9eb9-55cb2b8b5b19', 'Пункт выдачи Uzum Market', 'г.Карши, 5 микрорайон, Насаф кучаси, дом 4/156', 38.841171, 65.8026852, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d59c92f5-21f3-4f14-a5db-81d8fc647861', 'Банкомат 1427', '1427', 'operational', 'atm', 'site_2e741bac-ae5f-4c9e-9eb9-55cb2b8b5b19', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_23a8ff01-d692-4ef1-b8d5-dece590d6f8f', 'Пункт выдачи Uzum Market', 'г. Карши, 1 микрорайон , 35 дом', 38.8409241, 65.801704, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_470fe4c9-6391-441f-9dfd-7bb57a7a60a4', 'Банкомат 1429', '1429', 'operational', 'atm', 'site_23a8ff01-d692-4ef1-b8d5-dece590d6f8f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7b29af32-c332-41cb-8206-b7e0028bda11', 'Mega Nukus', 'г. Нукус, ул. Ерназара Алакоза, 60A', 42.4716047, 59.6030332, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a5d273e5-3485-44ed-8099-bd6112a6c7cc', 'Банкомат 1453', '1453', 'operational', 'atm', 'site_7b29af32-c332-41cb-8206-b7e0028bda11', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8509e337-7967-4d23-8fa6-42400353a069', 'Корзинка Карши Атлас', 'город Карши, улица Ислама Каримова, 17', 38.8735913, 65.8065645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3f78296e-dd95-4004-8eb5-c9edde3d1a86', 'Банкомат 1457', '1457', 'operational', 'atm', 'site_8509e337-7967-4d23-8fa6-42400353a069', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c8d7cb9-07f7-46e0-849b-14c1bd7fed52', 'Станция метро Алишера Навои', 'Ташкент, Шайхонтохурский район, улица Батыра Закирова', 41.3137517, 69.2538045, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eb32a79c-cb9c-4582-8056-e4b43d92a9cf', 'Банкомат 1064', '1064', 'operational', 'atm', 'site_6c8d7cb9-07f7-46e0-849b-14c1bd7fed52', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5aeed7f8-05cb-4495-886b-afc6a80b8eb7', 'OLMA C-7', 'Ташкентская обл., Бостанлыкский р-н, махалля Бостон, ул. Бирлик, д.74', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bcf2a74c-dc64-4f2f-9d03-35939762e34c', 'Банкомат 1155', '1155', 'operational', 'atm', 'site_5aeed7f8-05cb-4495-886b-afc6a80b8eb7', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_672d75e5-2306-4483-9636-1c49de91691f', 'ISHONCH(Keles)', 'Ташкентская обл., Ташкентский район, МФЙ Файзиобод, ул. Келес Йули', 41.3935257, 69.2073641, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7ef5f5ee-14d0-42e6-a8ad-35cc805c998b', 'Банкомат 1245', '1245', 'operational', 'atm', 'site_672d75e5-2306-4483-9636-1c49de91691f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d9f76f92-8bc8-42ba-ae77-eb64891ad17f', 'ISHONCH(Yuqori Chirchiq)', 'Ташкентская обл., Юкоричирчикский район, ул. Мустакиллик (Независимости)', 41.3125498, 69.5400391, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_857ed74b-7f5a-401e-add3-5c2159bb6626', 'Банкомат 1246', '1246', 'operational', 'atm', 'site_d9f76f92-8bc8-42ba-ae77-eb64891ad17f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5bf89f2b-cb5c-4a34-8802-0ad22109a7bb', 'OLMA К-4', 'Ташкентская обл., г. Паркентский, ул. Мафтункор, 107, махаллинский сход граждан Марказий', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a7b68e37-6050-49c7-917a-f5340f6e6aa5', 'Банкомат 1255', '1255', 'operational', 'atm', 'site_5bf89f2b-cb5c-4a34-8802-0ad22109a7bb', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_71660f03-c5ae-4316-a5eb-5c88173ffe6c', 'Афсона маркет', 'Ташкентская обл. г. Бекабад, 13-й микрорайон, 21', 40.2317083, 69.2615016, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_00e93653-796a-4778-a466-b79cfc90a3cb', 'Банкомат 1261', '1261', 'operational', 'atm', 'site_71660f03-c5ae-4316-a5eb-5c88173ffe6c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_db356396-f5fa-4d39-ad08-51b5ae9f3330', 'Pharmacosmos C-124 НовоМосковский', 'Ташкент, Мирзо-Улугбекский район, ул. Аккурган, 35', 41.3325991, 69.3033156, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3fc99f2f-1ffb-4dd3-b98c-3f6a4b6f80f9', 'Банкомат 1296', '1296', 'operational', 'atm', 'site_db356396-f5fa-4d39-ad08-51b5ae9f3330', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e7bb2a71-d474-45f3-83af-a6712227b679', 'Пункт выдачи Uzum Market', 'г. Андижан, 2 микрорайон, дом 16А', 40.7489616, 72.3431072, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_474c16aa-ace6-4a87-99b0-0d434ff91066', 'Банкомат 1377', '1377', 'operational', 'atm', 'site_e7bb2a71-d474-45f3-83af-a6712227b679', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3eccbd51-e263-42c0-910a-16416aae76a0', 'Пункт выдачи Uzum Market', 'г. Газалкент, Бостанлыкский район, Навруз МФЙ, улица А. Эсанов, дом 42', 41.5621762, 69.7662202, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d185652c-9c35-4bba-ab50-6547c6b74dc4', 'Банкомат 1397', '1397', 'operational', 'atm', 'site_3eccbd51-e263-42c0-910a-16416aae76a0', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_54da2040-d9a1-455c-81c3-0789896eb5fe', 'Korzinka Андижан Амир Темур', 'Андижанская область, г. Андижан, проспект Амира Темура, 35б', 40.750354, 72.337845, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_865e50cb-1228-4902-a715-ef8eba31b242', 'Банкомат 1400', '1400', 'operational', 'atm', 'site_54da2040-d9a1-455c-81c3-0789896eb5fe', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7e6a0e47-c776-4f59-b111-c37d64f202ab', 'Единое Окно', 'г. Андижан, ул. А. Темура, дом 35', 40.763667, 72.354466, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c93b6e47-8e78-478a-a5b4-4e856371cdcf', 'Банкомат 1401', '1401', 'operational', 'atm', 'site_7e6a0e47-c776-4f59-b111-c37d64f202ab', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aa5b23af-0e94-4099-bf0f-f0909c26e15f', 'Bellissimo Namangan 2 Шодлик', 'г. Наманган, Шодлик МСГ, ул.Туракургон, дом 138', 40.992395, 71.649259, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ec48b552-da82-4d0d-bd88-e6c9a3de0a5a', 'Банкомат 1403', '1403', 'operational', 'atm', 'site_aa5b23af-0e94-4099-bf0f-f0909c26e15f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_af3378c2-a1b9-46c6-96d4-7f4e1a7b5188', 'Makro m022', 'Андижанская область, г. Асака, ул. Умид, 724', 40.648559, 72.23535, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_069b7966-d0c8-41dd-b61e-42366b2179ad', 'Банкомат 1404', '1404', 'operational', 'atm', 'site_af3378c2-a1b9-46c6-96d4-7f4e1a7b5188', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b4c40dea-c254-450b-9d67-27740bdd803c', 'Navruz Mall', 'г. Андижан, улица Машраба, 62', 40.7516004, 72.3631255, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e7084cfc-95be-4980-90eb-c0b88c131718', 'Банкомат 1409', '1409', 'operational', 'atm', 'site_b4c40dea-c254-450b-9d67-27740bdd803c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_88122a6b-cd1f-4fad-876f-ab0da0dceb91', 'Пункт выдачи Uzum Market', 'г. Навои, 9 микрорайон, ул. Дружбы народов', 40.120897, 65.3679819, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9676049a-ba1a-45b1-84dd-4f1e08f21dd3', 'Банкомат 1441', '1441', 'operational', 'atm', 'site_88122a6b-cd1f-4fad-876f-ab0da0dceb91', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9e9520a3-420c-4cca-83d5-d929d4910e8c', 'Zarafshan Grand Hotel', 'г. Навои, 8-й микрорайон, 418', 40.1120452, 65.3609612, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_697cd39c-c4ad-4965-922f-9110a0b429f5', 'Банкомат 1454', '1454', 'operational', 'atm', 'site_9e9520a3-420c-4cca-83d5-d929d4910e8c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_35a4feef-a1ae-4ee2-bf86-bb93e2df4617', 'Korzinka K197 Джаркурган', 'г. Ташкент, Яшнабадский район, ул. Джаркурган, 39', 41.270067, 69.326679, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0f3d643f-0ec2-492c-bf8c-fb4ad519fe40', 'Банкомат 1456', '1456', 'operational', 'atm', 'site_35a4feef-a1ae-4ee2-bf86-bb93e2df4617', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_03a9b5ae-52c5-4631-8520-9d879528b6fd', 'Единое окно', 'г. Гулистан, махаллинский сход граждан Тараккиёт', 40.5185013, 68.7689209, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a6421970-76da-4676-a2e2-d9af9c0b1081', 'Банкомат 1458', '1458', 'operational', 'atm', 'site_03a9b5ae-52c5-4631-8520-9d879528b6fd', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_47dc0d5e-8ffe-4bba-bba5-37ac3d2a928f', 'ISHONCH(Guliston)', 'г. Гулистан, ул. Узбекистан', 40.4844374, 68.7755499, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_853b68fd-be67-428f-a098-6c083e690968', 'Банкомат 1459', '1459', 'operational', 'atm', 'site_47dc0d5e-8ffe-4bba-bba5-37ac3d2a928f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1459c8da-7a71-48d1-85ed-3cff63b18b7b', 'ISHONCH(Termiz)', 'г. Термез, ул. Навои, дом 48х', 37.2139763, 67.2736506, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9f3c7a5c-0f56-4357-bb7f-9e9829f32af4', 'Банкомат 1460', '1460', 'operational', 'atm', 'site_1459c8da-7a71-48d1-85ed-3cff63b18b7b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2dd5cde5-d88f-4b62-9d7a-0d71a52f2313', 'ISHONCH(Jizzax)', 'Джизакская обл., г. Джизак, ул. Рашидова', 40.1269015, 67.8262887, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_50861b43-ef76-4213-b509-82d036b1b8e2', 'Банкомат 1461', '1461', 'operational', 'atm', 'site_2dd5cde5-d88f-4b62-9d7a-0d71a52f2313', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e25528a3-cdf6-4686-b47e-0ee952119e81', 'PURE MILKY', 'Самаркандская область, Тайлакский район, населённый пункт Курганча', 39.619652, 67.075687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c8efe091-0c69-4553-b97c-35d34c3eea15', 'Банкомат 1466', '1466', 'operational', 'atm', 'site_e25528a3-cdf6-4686-b47e-0ee952119e81', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4e82d4ed-d0a8-43f5-b01c-5f03ad827196', 'АЗС 8 марта', 'г. Самарканд просп. Навои, 27А', 39.667054, 66.944391, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6c06f4c8-d5e1-42b7-8d2f-b8e2c64e2458', 'Банкомат 1467', '1467', 'operational', 'atm', 'site_4e82d4ed-d0a8-43f5-b01c-5f03ad827196', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_67a7d21b-ff99-4dd0-aead-581c1c8c4816', 'Пункт выдачи Uzum market', 'г. Самарканд, массив Карасу, 158', 39.723151, 66.924819, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2f3fa0b0-a6e0-4a02-b84e-93dce47d7756', 'Банкомат 1468', '1468', 'operational', 'atm', 'site_67a7d21b-ff99-4dd0-aead-581c1c8c4816', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a166570d-af8e-4524-b209-e1a918753c53', 'IDEAL SARI', 'г. Ургенч, ул. Тинчлик, 111', 41.5602861, 60.6227936, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6770e791-0935-4142-abc2-61969446beeb', 'Банкомат 1470', '1470', 'operational', 'atm', 'site_a166570d-af8e-4524-b209-e1a918753c53', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d66a36f3-2970-46cc-bcb5-972d02fc2307', 'Eco Park', 'г. Ташкент, Мирзо-Улугбекский район,улица Хамида Алимджана, махаллинский сход граждан Нур', 41.313203, 69.2935649, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_76cc51af-3066-46e2-9f63-a171447c8680', 'Банкомат 1514', '1514', 'operational', 'atm', 'site_d66a36f3-2970-46cc-bcb5-972d02fc2307', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4d69b45b-96e0-43c3-9428-a461acfc50c8', 'MARKA super market', 'г. Карши улица Ислама Каримова, 216', 38.8735913, 65.8065645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_71ac1466-c58d-4958-a7c1-6ac334a7fd0f', 'Банкомат 1508', '1508', 'operational', 'atm', 'site_4d69b45b-96e0-43c3-9428-a461acfc50c8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_83b91302-003c-475f-9be7-7e460b6ddbde', 'Bellissimo O`rda parki', 'Джизакская область, Шараф-Рашидовский район,МСГ Кушкуприк, улица Урдакли, 93', 40.153702, 67.822414, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_327be519-c7cd-4e4f-ace5-0e0fee02ae60', 'Банкомат 1473', '1473', 'operational', 'atm', 'site_83b91302-003c-475f-9be7-7e460b6ddbde', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6453ce64-d21b-4b4e-9dbd-90e9085165db', 'ALIBAZAR MARKET', 'г. Джизак, микрорайон 3/1', 40.1171257, 67.8573573, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b3516103-4da6-4b91-a6bc-6564f4d81006', 'Банкомат 1474', '1474', 'operational', 'atm', 'site_6453ce64-d21b-4b4e-9dbd-90e9085165db', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_097997e1-e648-4067-a34b-dd5ff277286c', 'KO''K SAROY', 'г. Джизак, махаллинский сход граждан Заргарлик, ул. Шарофа Рашидова, 78', 40.1053791, 67.837164, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5558a9d5-b5c8-48eb-a6cd-25d45b9b3d46', 'Банкомат 1476', '1476', 'operational', 'atm', 'site_097997e1-e648-4067-a34b-dd5ff277286c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_37379dd3-2970-431c-885e-44bbcf36c765', 'Olma S-15 ( Самарканд )', 'г. Самарканд,МСГ Баходир Ялангтуш,ул.Ифтихор ,дом 135', 39.719043, 66.938137, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_77ec5035-8337-48be-824b-0f2daa329ff0', 'Банкомат 1477', '1477', 'operational', 'atm', 'site_37379dd3-2970-431c-885e-44bbcf36c765', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b48092b4-59ed-4e61-8286-fd41d8aa1fe0', 'Единое окно', 'Самаркандская обл., район Тайлок, МФЮ Чарогбон, Янги Тойлок 1', 39.608544, 67.083898, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dc31bfd3-45b7-4c0d-96bd-b3ed48050922', 'Банкомат 1478', '1478', 'operational', 'atm', 'site_b48092b4-59ed-4e61-8286-fd41d8aa1fe0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6524c5e9-2df6-4dc9-93d0-f038c8723dcc', 'ATLAS Самарканд', 'Самаркандская обл.,г. Самарканд, ул. Буюк Ипак Йули, 131Б', 39.6458719, 66.9241645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a1fd580a-bed2-48f7-9d8a-914f96cf7ca8', 'Банкомат 1479', '1479', 'operational', 'atm', 'site_6524c5e9-2df6-4dc9-93d0-f038c8723dcc', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4cc6a2ab-6297-4d63-8d88-ff239f6dce43', 'OXY Med (Северный алмазар) 175', 'г. Ташкент, улица Шимолий Олмазор, 15', 41.3496509, 69.2537235, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b7d5e768-55b8-4713-ad71-2c96110b8dbc', 'Банкомат 1481', '1481', 'operational', 'atm', 'site_4cc6a2ab-6297-4d63-8d88-ff239f6dce43', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d78ba596-8656-4bd1-a842-729981f7b02d', 'OXY Med (Кадышева)14', 'г. Ташкент, Яшнабадский район, массив Городок Авиастроителей, 2-й квартал, 41', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_44ccafc6-c30b-48ff-8616-4bc8e3ad5f18', 'Банкомат 1482', '1482', 'operational', 'atm', 'site_d78ba596-8656-4bd1-a842-729981f7b02d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_72307b55-8fe5-4609-92f0-2c3da7c3daf5', 'Франшиза ПВЗ Uzum Market', 'г. Ташкент, Мирзо Улугбексикй район, ул. Льва Толстого, 65', 41.319441, 69.297469, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_95995282-c6bb-4cf3-a423-7df179efe755', 'Банкомат 1484', '1484', 'operational', 'atm', 'site_72307b55-8fe5-4609-92f0-2c3da7c3daf5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cb9983bc-ac92-46b5-a2e1-61741b8b3dbf', 'Legion МАГАЗИН Россия', 'г. Ташкент, Яшнабадский район, массив Городок Авиастроителей, 2-й квартал, 56А', 41.283801, 69.348377, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d381b424-5208-4943-b6f0-0ed19e280e8a', 'Банкомат 1485', '1485', 'operational', 'atm', 'site_cb9983bc-ac92-46b5-a2e1-61741b8b3dbf', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cc90245c-f693-4caa-8dd5-68af86e15fab', 'OXY Med (Эндокринология2)', 'г.Ташкент, Мирзо-Улугбекский р-н, ул. Муминова, 12', 41.3392074, 69.3389445, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f7444444-5c0a-4bf7-bcbd-fecaa65f9cce', 'Банкомат 1486', '1486', 'operational', 'atm', 'site_cc90245c-f693-4caa-8dd5-68af86e15fab', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_115c9ebe-9e5e-4feb-81a4-cd72434b879a', 'OXY Med (Паркент)', 'г.Ташкент, Яшнабадский район, ул. Паркент, 30В', 41.3108622, 69.333974, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b225c53a-8dd2-45f8-beee-cf5aee56a223', 'Банкомат 1487', '1487', 'operational', 'atm', 'site_115c9ebe-9e5e-4feb-81a4-cd72434b879a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_95e892ef-3529-4586-89e4-45be3559ef1e', 'OXY Med (Юнус-Абад) 98', 'г. Ташкент, Юнусабадский район, махаллинский сход граждан Нурмакон', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_93d1bf27-5c2e-4584-b7ca-1aa513fe81ba', 'Банкомат 1489', '1489', 'operational', 'atm', 'site_95e892ef-3529-4586-89e4-45be3559ef1e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b792217b-f72b-4e70-81e0-3999b6dde9d4', 'OXY Med (Юнус-Абад Универсам)', 'г.Ташкент, Юнусабадский р-н, 2 квартал, д.7Б', 41.3687382, 69.2941266, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_21a486dc-9c7d-4edb-b7eb-bc1de8a518d1', 'Банкомат 1490', '1490', 'operational', 'atm', 'site_b792217b-f72b-4e70-81e0-3999b6dde9d4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aefcd22f-205f-4dc4-9176-c86c17a276d0', 'OXY Med (геникология)', 'г. Ташкент, Мирзо-Улугбекский район, Камолот МФЙ, улица Мирзо-Улугбека, 134а-дом', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f155eb60-947c-4337-ac76-7a603b23a0ad', 'Банкомат 1491', '1491', 'operational', 'atm', 'site_aefcd22f-205f-4dc4-9176-c86c17a276d0', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_72764ac1-f617-4849-8f59-bb9fffdaeed2', 'Legion МАГАЗИН Бектимирский', 'г. Ташкент, Бектимирский район, просп. Бектемир, 126А', 41.222623, 69.333731, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_020df126-dbf2-475f-83af-3414078dd257', 'Банкомат 1492', '1492', 'operational', 'atm', 'site_72764ac1-f617-4849-8f59-bb9fffdaeed2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_601d3676-53be-46be-8e6c-d688002dc959', 'Olma М-167', 'Ташкентская обл.,Кибрайский р-н,МСГ Файзобод,ул. Зиёкорлар,дом 222', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_25044211-29dd-4c3c-ad19-f141bac94039', 'Банкомат 1493', '1493', 'operational', 'atm', 'site_601d3676-53be-46be-8e6c-d688002dc959', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8559d6f1-dafd-47ae-a36d-cd7261400e19', 'Olma С-19', 'Ташкентская обл. населённый пункт имени Абдурахманова, улица Мингтерак, 32A,', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1db657f6-55c7-4b6f-9d71-a86b5965f1d3', 'Банкомат 1497', '1497', 'operational', 'atm', 'site_8559d6f1-dafd-47ae-a36d-cd7261400e19', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fd0eeb98-2440-4b34-91d2-09354a3eb15d', 'Olma С-29', 'Ташкентская область, Кибрайский район, городской посёлок Салар, Oʻqituvchi koʻchasi', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_284d3402-26fc-4a05-8181-4fe44ef93c7d', 'Банкомат 1498', '1498', 'operational', 'atm', 'site_fd0eeb98-2440-4b34-91d2-09354a3eb15d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_36a93eb5-b013-4ec6-abd7-cf3457e2cffd', 'Olma С-30', 'Ташкентская область, Кибрайский район, махаллинский сход граждан Алишер Навоий', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_de0f5e72-7480-4acc-a7a6-4039007de586', 'Банкомат 1499', '1499', 'operational', 'atm', 'site_36a93eb5-b013-4ec6-abd7-cf3457e2cffd', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_67c5e464-b06b-43e7-8658-95b9ab4d4fcb', 'OXY Med (САМПИ)', 'Ташкентская обл.,Кибрайский р-н, городской посёлок Салар, ул. Гулимамур, 7А', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_23d13b6c-d944-4985-aadb-ae0227b12bb4', 'Банкомат 1500', '1500', 'operational', 'atm', 'site_67c5e464-b06b-43e7-8658-95b9ab4d4fcb', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2dd4b30b-e6c2-46fe-bf7f-02137ccf232a', 'Olma С-23', 'Ташкентская обл. махаллинский сход граждан Мустакиллик, улица Чимкент Йули, 190', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cdcacf92-1d35-493c-a05d-d4e395a473f0', 'Банкомат 1501', '1501', 'operational', 'atm', 'site_2dd4b30b-e6c2-46fe-bf7f-02137ccf232a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_30a603bd-b3a3-4edd-aaea-6821c979d659', 'OLMA К-08', 'Ташкентская обл. Юкоричирчикский р-н, МСГ Миробод, ул.Юртдош, дом-51а', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dd79ec4d-15f5-408e-9f25-becc4ea42bd3', 'Банкомат 1502', '1502', 'operational', 'atm', 'site_30a603bd-b3a3-4edd-aaea-6821c979d659', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2faf56cc-d5a3-457d-932a-5334a2be5081', 'Olma А-37', 'Ташкентская область, Юкоричирчикский район, населённый пункт Навруз', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f6ffbe4f-0e24-44d7-aed1-4353ce71c111', 'Банкомат 1503', '1503', 'operational', 'atm', 'site_2faf56cc-d5a3-457d-932a-5334a2be5081', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_811b9209-4fc2-41e2-8c61-4d28833f9946', 'Франшиза ПВЗ маркет', 'г. Ташкент, Мирзо улугбек район улица Дурмон йули, 20', 41.3279016, 69.3567172, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_14a5c929-6f27-444b-8a26-f0b5c0750af8', 'Банкомат 1504', '1504', 'operational', 'atm', 'site_811b9209-4fc2-41e2-8c61-4d28833f9946', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_96dac591-f92f-4c5a-aaf7-8a25d497faba', 'TEXNO PLANET', 'г. Навои, просп. Победы, , 17Б', 40.1118337, 65.3779095, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eac06cf2-1de5-4c74-bf1b-220122bf81ba', 'Банкомат 1510', '1510', 'operational', 'atm', 'site_96dac591-f92f-4c5a-aaf7-8a25d497faba', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_394fdd70-4c69-41a5-8c50-98eea6f7af75', 'Regal Hotel by Grand', 'г. Навои, ул. Алишера Навои, 1', 40.1470298, 65.3458931, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_829774ad-c8b5-4c13-a84a-a8269ee68aa1', 'Банкомат 1511', '1511', 'operational', 'atm', 'site_394fdd70-4c69-41a5-8c50-98eea6f7af75', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2f048a09-0a6d-4d5e-bb94-bc277de61611', 'Korzinka Maxalla', 'г. Ташкент, Мирзо-Улугбекский район, массив Ахмада Югнаки, 24A', 41.3447749, 69.3934825, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1ddeb84b-99c2-487b-b680-2b74b377b23a', 'Банкомат 1515', '1515', 'operational', 'atm', 'site_2f048a09-0a6d-4d5e-bb94-bc277de61611', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_983242e0-36ff-470e-b529-501aaae4fa8b', 'Ресторан ляби хауз', 'г. Бухара, ул. Мехтар Анбар, 100', 39.7735615, 64.4180516, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f5bb94ed-8361-463e-a4e8-4f887be3eca3', 'Банкомат 1516', '1516', 'operational', 'atm', 'site_983242e0-36ff-470e-b529-501aaae4fa8b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7f7d217e-a1bb-4c27-ae9b-6c70e3990d17', 'Makon Mall', 'г. Самарканд,ул. Шахруха Мирзы, 17', 39.6549222, 66.9570334, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_01d84640-ffd7-4a00-8bfa-8af989bebd2b', 'Банкомат 1521', '1521', 'operational', 'atm', 'site_7f7d217e-a1bb-4c27-ae9b-6c70e3990d17', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_178bab14-562a-467f-9536-37532f70db67', 'Белорусская косметика', 'г.Ташкент, Мирзо-Улугбекский район, ул. Мингбулок, Карасу 2, 4', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d76dd401-5ca0-4b60-bea1-4e7e5d78e53e', 'Банкомат 1525', '1525', 'operational', 'atm', 'site_178bab14-562a-467f-9536-37532f70db67', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_92e5ea7e-4d59-4bf3-82bb-c0e8eb10cc02', 'Darital Supermarket', 'г. Ургенч, улица Янги Шовот Йули, 3', 41.5599534, 60.607474, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b51b9f09-5fa4-4666-b377-c69d924f2f7b', 'Банкомат 1527', '1527', 'operational', 'atm', 'site_92e5ea7e-4d59-4bf3-82bb-c0e8eb10cc02', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1c38dcc0-0b4b-4483-b8d2-39ba16d9efcd', 'Urganch Univermagi', 'Ургенчский район, махаллинский сход граждан Мевазор, улица Мустакиллик, 22/7', 41.5667534, 60.6313332, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_61058057-c01c-4b4d-b9b5-a1904bda8aa5', 'Банкомат 1529', '1529', 'operational', 'atm', 'site_1c38dcc0-0b4b-4483-b8d2-39ba16d9efcd', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_395fcf2b-0561-4b32-912e-02c98da9d4e7', 'Korzinka K236 Саноатчилар 3', 'Бухарская область, г. Бухара, МСГ «Бунёдкор», улица Саноатчилар, 3', 39.7562, 64.437521, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b4485bf2-ce8f-47ed-80ce-2aa0b10f204f', 'Банкомат 1532', '1532', 'operational', 'atm', 'site_395fcf2b-0561-4b32-912e-02c98da9d4e7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_eab62f70-cb01-4fd6-adab-adf7250a7eaf', 'Korzinka Джиззак', 'г. Джизак, просп. Шарафа Рашидова, 7', 40.1272524, 67.8276157, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d3ff2c8e-5290-41ce-92d1-8b2a85d7c677', 'Банкомат 1535', '1535', 'operational', 'atm', 'site_eab62f70-cb01-4fd6-adab-adf7250a7eaf', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_380cace4-cc44-4da7-847b-07c844851a05', 'Единое окно', 'Самаркандская область, Пайарыкский район, поселок Гозал, улица Чулпон', 39.984212, 66.851592, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bca7dfa7-4db9-4826-8f54-f5ca2500aaa2', 'Банкомат 1539', '1539', 'operational', 'atm', 'site_380cace4-cc44-4da7-847b-07c844851a05', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_54cf7bf9-aaa8-4bd0-86f1-c5378d786531', 'Korzinka (Гагарина)', 'г. Самарканд, ул. Гагарина, 86', 39.6584793, 66.9357285, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_255c50a3-47f4-4827-a426-18de3cef4498', 'Банкомат 1540', '1540', 'operational', 'atm', 'site_54cf7bf9-aaa8-4bd0-86f1-c5378d786531', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_06b13832-58df-4302-abf1-06f324538e68', 'Единое окно', 'Самаркандская область, Джомбойский район, Ташкентский МФЮ, улица Ташкентская', 39.69568, 67.089212, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1955522d-6d9f-43ea-bb9b-7fe59ea6b4fd', 'Банкомат 1541', '1541', 'operational', 'atm', 'site_06b13832-58df-4302-abf1-06f324538e68', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c069a40-61f2-4f00-812f-5ee02506c60c', 'Baraka Market Магазин 100', 'г. Ташкент, Юнусабадский район, Богиравон, 27а стр', 41.3490162, 69.2698308, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c22b8e29-3517-4029-8370-52c5cab6a1bc', 'Банкомат 1548', '1548', 'operational', 'atm', 'site_6c069a40-61f2-4f00-812f-5ee02506c60c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_97d760f0-c65a-43d3-b461-89bb39667f49', 'Olma М -122 ( Ташкент )', 'г. Ташкент, Сергелийский р-н, Садокат МСГ, ул.Хонобод,4-проезд, дом 2', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b5089adf-2476-4cc1-bc67-b6e2382ff637', 'Банкомат 1549', '1549', 'operational', 'atm', 'site_97d760f0-c65a-43d3-b461-89bb39667f49', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a08a32d0-1e39-45cc-954c-e8a69da41ea6', 'ПВЗ ФРАНШИЗА FrTash226', 'г. Ташкент, Шайхантахурский район, улица Лабзак, 28А', 41.3352874, 69.2648156, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1fa2f096-51ec-46a6-a9db-74dc76b009cc', 'Банкомат 1551', '1551', 'operational', 'atm', 'site_a08a32d0-1e39-45cc-954c-e8a69da41ea6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f1e577c8-2286-4a63-99b0-8b6e1afe7c4d', 'Brs Gaz Метан заправка', 'г. Ташкент, Яшнабадский р-н, махаллинский сход граждан Олмос', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c2d07506-b5c7-4921-b75f-2811ea8f051a', 'Банкомат 1552', '1552', 'operational', 'atm', 'site_f1e577c8-2286-4a63-99b0-8b6e1afe7c4d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_532fcc14-b6da-4cfe-8899-0125927e31da', 'Olma М-118 ( Ташкент )', 'г. Ташкент, Сергелийский р-н, Кипчак МСГ, ул. Сергили 4-квартал, дом 13-А', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4a4251a4-325b-4ffe-87df-7e62932f1eaa', 'Банкомат 1554', '1554', 'operational', 'atm', 'site_532fcc14-b6da-4cfe-8899-0125927e31da', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_617d494b-f1bc-429c-b02b-529016e551a0', 'Olma М-179 ( Ташкент )', 'г. Ташкент, Яшнабадский р-н, МСГ Асалабад, массив Асалабад-2, дом-3', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_533821f9-c45b-4851-8cd3-24d460666893', 'Банкомат 1555', '1555', 'operational', 'atm', 'site_617d494b-f1bc-429c-b02b-529016e551a0', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9d4d687d-20ac-4979-b6f0-c4cb710c366a', 'Olma М-183 ( Ташкент )', 'г. Ташкент, Мирабадский р-н, МСГ Ок уй, ул.Ок Билол, дом 41', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1bbcdf03-554f-46a0-9a39-75fc5dea5168', 'Банкомат 1556', '1556', 'operational', 'atm', 'site_9d4d687d-20ac-4979-b6f0-c4cb710c366a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_19a9f36b-b75e-4c7d-89df-037de171366c', 'Olma М-188 ( Ташкент )', 'г. Ташкент, Мирзо -Улугбекский р-н, МСГ Минглола, массив Карасу-6, д. 16-Б', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_62071967-96b6-435c-97bd-a5d3547d9288', 'Банкомат 1557', '1557', 'operational', 'atm', 'site_19a9f36b-b75e-4c7d-89df-037de171366c', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_eaa39373-2c60-4308-9c4f-06c50a6a9bab', 'Корзинка Карасу', 'г. Ташкент, Мирзо-Улугбекский район, массив Карасу,ул. Ш. Бурханова, 2-й квартал, 23', 41.3165884, 69.3555452, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2439e4f3-1922-4ac3-90f5-672cf78fc1b5', 'Банкомат 1558', '1558', 'operational', 'atm', 'site_eaa39373-2c60-4308-9c4f-06c50a6a9bab', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e5e8d10-4df7-4c87-89ff-6a6de7e0a318', 'Korzinka Ависозлар', 'г. Ташкент, Яшнабадский район, квартал Авиасозлар', 41.285561, 69.3466911, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5ebaf5fa-f7bd-49eb-bd6d-5b66186da230', 'Банкомат 1561', '1561', 'operational', 'atm', 'site_2e5e8d10-4df7-4c87-89ff-6a6de7e0a318', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0596e289-186f-4796-858f-f83c35fe875a', 'Korzinka Абай', 'г. Ташкент, Шайхантахурский район, массив Джангох, 13', 41.3259409, 69.2545989, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cfd885c4-051e-4ada-8314-db06ab9e7c26', 'Банкомат 1562', '1562', 'operational', 'atm', 'site_0596e289-186f-4796-858f-f83c35fe875a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7228b6f5-1588-47c7-b564-b33fd70c0ae3', 'Korzinka Луначарский', 'г. Ташкент, Мирзо-Улугбекский район, 2-й тупик Жасорат, 9', 41.341898, 69.3581286, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2dcbcc79-9066-4c59-982b-d7f22d956acb', 'Банкомат 1563', '1563', 'operational', 'atm', 'site_7228b6f5-1588-47c7-b564-b33fd70c0ae3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c24e14f6-a5bc-4c03-ad1f-2e7fa5c7b1b7', 'Korzinka Югнакий', 'Ташкент, улица Ахмада Югнаки', 41.3478477, 69.3818569, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fc2f67cf-ae3a-4e1a-aaa0-6018bb9782d1', 'Банкомат 1564', '1564', 'operational', 'atm', 'site_c24e14f6-a5bc-4c03-ad1f-2e7fa5c7b1b7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4e80b8ed-3544-4773-8507-ae4ae5221dc7', 'Korzinka Назарбек', 'Ташкентская обл., Зангиотинский район, проспект Назарбека, 12.', 41.3060098, 69.1299287, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fb05afda-5cbc-48ba-b63d-ee8ab214fe49', 'Банкомат 1566', '1566', 'operational', 'atm', 'site_4e80b8ed-3544-4773-8507-ae4ae5221dc7', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_118ff2fe-371d-48f4-aa2f-cd266b7fb717', 'REGISTON MARKET', 'Хорезмская область, Ургенчский район, махалля Шерматлар,4-й проезд Тафаккур', 41.5667534, 60.6313332, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ee20e7ea-fd4e-4b5a-8401-6e84c020f383', 'Банкомат 1568', '1568', 'operational', 'atm', 'site_118ff2fe-371d-48f4-aa2f-cd266b7fb717', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_794d2ea2-d2b3-4669-918a-2bf5f032b6b8', 'Сергели Авто рынок', 'махаллинский сход граждан Янги Бунёдобод, Сергелийский район,', 41.2464509, 69.2369048, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_25b3ab28-a7a9-46e1-a9b3-149a0108185e', 'Банкомат 1543', '1543', 'operational', 'atm', 'site_794d2ea2-d2b3-4669-918a-2bf5f032b6b8', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bb9081a1-8aa8-472f-be1f-f98cc9542e60', 'Лукойл', 'г. Ташкент, Мирзо-Улугбекский район,махаллинский сход граждан Кухна Мевазар', 41.3106899, 69.3469959, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7d1fd96d-a561-40b9-adb9-0f82c10cfa86', 'Банкомат 1545', '1545', 'operational', 'atm', 'site_bb9081a1-8aa8-472f-be1f-f98cc9542e60', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2866350d-0fd3-4510-92ce-d3e637ae4080', 'Единое окно', 'г. Ташкент., Бектемирский район, ул. Байгара, д. 43)', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b4fd4242-7e06-4d3f-9306-799747e22608', 'Банкомат 1573', '1573', 'operational', 'atm', 'site_2866350d-0fd3-4510-92ce-d3e637ae4080', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8d8ef9d2-d826-4a10-9968-3c5dad75b7a3', 'Единое окно', 'г. Ташкент.. Мирзо Улугбекский район, улица Каландар, дом 2', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9993e040-9185-410d-98a0-f6a0acafd1f4', 'Банкомат 1575', '1575', 'operational', 'atm', 'site_8d8ef9d2-d826-4a10-9968-3c5dad75b7a3', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_eac5a624-4ce9-4bb3-b811-ce8aec332a1b', 'Единое окно', 'г. Ташкент.. Алмазарский район, улица Талабалар, 54', 41.3474617, 69.2146815, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e7efb971-9ad3-42eb-a403-730b32e2ea0b', 'Банкомат 1576', '1576', 'operational', 'atm', 'site_eac5a624-4ce9-4bb3-b811-ce8aec332a1b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_498d5874-0849-4988-81e9-2c0d566f6111', 'Единое окно', 'г. Ташкент.. Сергелийский район, улица Обихайот, 3а)', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a900d1e5-b6a0-4fee-af19-6555b06e4993', 'Банкомат 1577', '1577', 'operational', 'atm', 'site_498d5874-0849-4988-81e9-2c0d566f6111', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e85354d6-eb72-4f15-9407-085ce2cbca5a', 'Единое окно', 'г. Ташкент , площадь Чорсу д. 2', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3d0d6c08-8e70-4235-b707-6a541a08de5a', 'Банкомат 1580', '1580', 'operational', 'atm', 'site_e85354d6-eb72-4f15-9407-085ce2cbca5a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ee3c4327-de48-486d-9b30-24e5cd1cda63', 'Единое окно', 'г. Ташкент.. Юнусабадский район, улица Осиё, 4а', 41.3272115, 69.2857356, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c3ababd6-0abf-442c-832e-df7e665693a3', 'Банкомат 1581', '1581', 'operational', 'atm', 'site_ee3c4327-de48-486d-9b30-24e5cd1cda63', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_091f924a-6be9-440f-bf7b-f6b5177b84aa', 'Единое окно', 'г. Ташкент.. Яшнабадский район, 1-й переулок Авиасозлар, 7а', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9ba6b053-1e83-4fb5-b976-417aab204b21', 'Банкомат 1582', '1582', 'operational', 'atm', 'site_091f924a-6be9-440f-bf7b-f6b5177b84aa', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_88592530-09ba-439b-8d77-ea3335d682e9', 'Единое окно', 'г. Ташкент.. Янгихаётский район, улица Бирлик, 70', 41.2089568, 69.2113487, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8c5143cd-6762-4ef9-a465-ed631baf4eaa', 'Банкомат 1583', '1583', 'operational', 'atm', 'site_88592530-09ba-439b-8d77-ea3335d682e9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_019ecac8-0388-4100-81ee-aef5050391a1', 'Korzinka Зангиота', 'Ташкентская область,Зангиатинский район, махалля Гульбаг, ул. А.Темура 48', 41.3360516, 69.1753693, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7f81d172-0bd6-4607-aed5-94d079dcdc13', 'Банкомат 1586', '1586', 'operational', 'atm', 'site_019ecac8-0388-4100-81ee-aef5050391a1', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aae9d52b-fe72-4f96-87f1-efb2f045689f', 'Единое окно', 'Ташкентская обл. город Газалкент , Бостанлыкский район , улица Узгариш 20', 41.5621762, 69.7662202, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7550c866-4e03-43b2-9e4b-b531864c301e', 'Банкомат 1588', '1588', 'operational', 'atm', 'site_aae9d52b-fe72-4f96-87f1-efb2f045689f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_93a34ddc-bced-41f9-8851-39c1102adf3b', 'Единое окно', 'Ташкентская обл. Махаллинский сход граждан Олдинводий , Бекабадский район , улица Зафара', 40.298611, 69.17, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2ea335ae-60d5-404b-8179-94ad6542d3fc', 'Банкомат 1590', '1590', 'operational', 'atm', 'site_93a34ddc-bced-41f9-8851-39c1102adf3b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d583476f-6846-4f1f-b086-ae45192024ff', 'Единое окно', 'Ташкентская обл., Букинский район, город Бука, улица Узбекистанская, дом 7', 40.8169357, 69.1998496, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_acb38ff7-9d44-4342-9cec-150e8ee641bf', 'Банкомат 1591', '1591', 'operational', 'atm', 'site_d583476f-6846-4f1f-b086-ae45192024ff', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2d0e8872-d00e-43e9-8549-caf314d4bd5f', 'Единое окно', 'Ташкентская обл., Чиназский район, ш.Ул. Рашидова, д. 12', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ad1e1134-3b30-45e4-9e91-ab95efa96d64', 'Банкомат 1595', '1595', 'operational', 'atm', 'site_2d0e8872-d00e-43e9-8549-caf314d4bd5f', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8a62c816-7cfc-4d4d-9082-aab84ee17e0a', 'Единое окно', 'Ташкентская обл., город Чирчик, улица Юсупова, 2А', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_caef6b45-eb9d-4778-9b20-03b6568ce9b3', 'Банкомат 1596', '1596', 'operational', 'atm', 'site_8a62c816-7cfc-4d4d-9082-aab84ee17e0a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f3f59408-1186-462f-8ae5-eacd1edab746', 'Единое окно', 'Ташкентская обл., Ортачирчикский район, улица Ёшлик', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0371fa86-93ad-4b2a-b8de-2f5cfb0e103f', 'Банкомат 1597', '1597', 'operational', 'atm', 'site_f3f59408-1186-462f-8ae5-eacd1edab746', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_005263c5-3b89-434a-9a38-2ac8774fa363', 'Единое окно', 'Ташкентская обл., Юкоричирчикский район, поселок Янгибазар, улица Мустакиллик, 78', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6488b435-032c-481a-b5aa-71c60d895767', 'Банкомат 1598', '1598', 'operational', 'atm', 'site_005263c5-3b89-434a-9a38-2ac8774fa363', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7b21d81f-74be-4891-bdc5-784093dba2ed', 'Единое окно', 'Ташкентская обл., Кибрайский район, улица Зебинисо, 1А', 41.3821639, 69.4442088, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7a266653-b948-497d-a957-c47899553653', 'Банкомат 1605', '1605', 'operational', 'atm', 'site_7b21d81f-74be-4891-bdc5-784093dba2ed', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_20fbf6e3-0a49-46a6-b06b-a47a9790adcd', 'Единое окно', 'Ташкентская обл.,Куйичирчикский район , г. Дустабад улица Мухамедкулова, 60A', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b01af0b7-5d62-4275-99bc-1e91b1050769', 'Банкомат 1606', '1606', 'operational', 'atm', 'site_20fbf6e3-0a49-46a6-b06b-a47a9790adcd', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aa4116ce-abdd-4db3-bb98-e10fa0876f64', 'Единое окно', 'Ташкентская обл., Аккурганский район, улица Ойбека, 332', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3bd424d4-056f-4aa7-889d-9a6fad8b7c26', 'Банкомат 1607', '1607', 'operational', 'atm', 'site_aa4116ce-abdd-4db3-bb98-e10fa0876f64', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d79ab9c7-37c3-4dc6-8393-ee28df0e5f0a', 'Единое окно', 'Ташкентская область, Пискент улица Бобур Мирзо, 37, МСГ Митан', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e4c8b676-69f4-42c2-bb3b-edaa446baae1', 'Банкомат 1608', '1608', 'operational', 'atm', 'site_d79ab9c7-37c3-4dc6-8393-ee28df0e5f0a', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5416cb87-d969-4ee4-9aa8-7fb4bbf9094b', 'Makro - 078', 'г. Ташкент, Шайхантахурский район, массив Джангох, 34', 41.3275034, 69.2646448, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a9afdb80-bb84-47bf-b58a-598bb8dcae8c', 'Банкомат 1603', '1603', 'operational', 'atm', 'site_5416cb87-d969-4ee4-9aa8-7fb4bbf9094b', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_53302cce-0911-439b-ba35-cef1db9cebd2', 'Tashkent supermarket', 'г. Ташкент, Юнусабадский район улица Юнусата, 6Б,', 41.2711495, 69.2792626, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_88df236d-5be4-445f-b15d-df3ec63ec027', 'Банкомат 1611', '1611', 'operational', 'atm', 'site_53302cce-0911-439b-ba35-cef1db9cebd2', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1878deb6-4757-4619-bac0-85f14fc09cce', 'ТЦ Park in MALL', 'г. Ташкент, Шайхантахурский район, махаллинский сход граждан Укчи.', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8e00fcd6-c0a6-4be4-87e7-5368d6058081', 'Банкомат 1609', '1609', 'operational', 'atm', 'site_1878deb6-4757-4619-bac0-85f14fc09cce', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_67c7c73d-a3a1-489c-b635-f8f112992de2', 'ТЦ Park in MALL', 'г. Ташкент, Шайхантахурский район, махаллинский сход граждан Укчи.', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f778cdd1-7199-49ca-a4db-3833e3892e21', 'Банкомат 1610', '1610', 'operational', 'atm', 'site_67c7c73d-a3a1-489c-b635-f8f112992de2', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ef2e8ee5-d492-4aca-ab0c-d3f6ef37f2a8', 'Korzinka Фаргона', 'Ферганская область, город Фергана, улица Абдулла Кадыри, 37а', 40.3752554, 71.8082719, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f61e41d0-d6c3-4333-b9d4-5f74f19ccdb1', 'Банкомат 1615', '1615', 'operational', 'atm', 'site_ef2e8ee5-d492-4aca-ab0c-d3f6ef37f2a8', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_59e6d9bf-c390-4b10-8927-aff94832775e', 'Bellissimo Aviasozlar', 'г. Ташкент, Яшнабадский район, ул. Авиасозлар 3', 41.2961592, 69.334377, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e11557fb-3025-4258-9eaf-4d4ebcd6f4c7', 'Банкомат 1616', '1616', 'operational', 'atm', 'site_59e6d9bf-c390-4b10-8927-aff94832775e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3e0413a1-a867-4371-8d7d-ec269661629e', 'Корзинка Махалля — Илтифот', 'г. Ташкент, Яшнабадский район, махаллинский сход граждан Илтифот', 41.280403, 69.355584, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8648ed1a-2dc8-40b0-b236-8f4ce81e3e78', 'Банкомат 1621', '1621', 'operational', 'atm', 'site_3e0413a1-a867-4371-8d7d-ec269661629e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c9158e27-e7f1-4309-add2-e5e09049fe9f', 'Korzinka Махалля — Бустон', 'г. Ташкент, Шайхантахурский район, махаллинский сход граждан Зафарабад, ул. Зафаробод, 12/1', 41.337871, 69.190226, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e3a879cb-6e1f-48f2-88f4-ea7773d7c94d', 'Банкомат 1624', '1624', 'operational', 'atm', 'site_c9158e27-e7f1-4309-add2-e5e09049fe9f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fa19bded-7735-44dc-a83d-63034c9eb77d', 'Bellissimo Parkentskiy', 'г. Ташкент, Мирзо-Улугбекский р-н, улица Паркент, 131А', 41.3150179, 69.3291538, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_67ec40b6-0276-4587-b6b4-bc7594c633b2', 'Банкомат 1626', '1626', 'operational', 'atm', 'site_fa19bded-7735-44dc-a83d-63034c9eb77d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8cd82d5c-4aec-49d9-a8b1-71cea15ad06e', 'Bellissimo Kuylyuk', 'г.Ташкент, Яшнабадский р-н, пересечение улиц Фергана Йули и Тантана, дом 2', 41.2894572, 69.3002841, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8a6ff7c0-0039-49fe-987f-1858b3db8533', 'Банкомат 1630', '1630', 'operational', 'atm', 'site_8cd82d5c-4aec-49d9-a8b1-71cea15ad06e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7a7899dc-4cde-4dd0-9e8f-0d10979e0936', 'Bellissimo Korzinka yangiabad', 'г. Ташкент,Яшнабадский район,Шахимарданская улица, 84', 41.2882137, 69.3308651, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b5f77727-6001-4d1c-9a2b-bedb5699b6b7', 'Банкомат 1634', '1634', 'operational', 'atm', 'site_7a7899dc-4cde-4dd0-9e8f-0d10979e0936', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c8a6bd15-be13-4768-a694-7a48d29d5bd3', 'Korzinka Авторынок Сергели', 'г. Ташкент, Сергелийский район, ул. Янги Сергели, 27', 41.236293, 69.213378, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_19fc9f9c-b550-40bc-b945-e127c510137f', 'Банкомат 1635', '1635', 'operational', 'atm', 'site_c8a6bd15-be13-4768-a694-7a48d29d5bd3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c7c81d70-e79c-4d3e-b9c3-8ddd437fb7b0', 'Legion Магазин №14 Саракулька', 'г. Ташкент, Яшнабадский район, ул. Сарыкуль, 34', 41.273399, 69.293544, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3c842d75-0af9-4548-9bd5-3b0637cffe11', 'Банкомат 1640', '1640', 'operational', 'atm', 'site_c7c81d70-e79c-4d3e-b9c3-8ddd437fb7b0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_70d48a55-eea8-42f9-ab47-c46f69b992d2', 'Korzinka H072 Ипакчи 2', 'г. Ташкент, Шайхантахурский район, улица Ипакчи, 14', 41.33033, 69.183383, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_19244a34-4549-4667-ac78-c9be35cdd08c', 'Банкомат 1641', '1641', 'operational', 'atm', 'site_70d48a55-eea8-42f9-ab47-c46f69b992d2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ac0dd1dc-4340-4850-aebf-490a53659760', 'Bellissimo TTZ Diadora', 'г.Ташкент, Мирзо-Улугбекский р-н, ул. Юзрабод (Белоножка), дом 1', 41.358466, 69.386257, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2f1e3342-2d8a-44ff-89cc-c0f06cadebe4', 'Банкомат 1642', '1642', 'operational', 'atm', 'site_ac0dd1dc-4340-4850-aebf-490a53659760', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4aa43590-5820-433a-9e6b-ae8056e8dd59', 'Станция метро Чорсу', 'Ташкент, Шайхонтохурский район, махаллинский сход граждан Гульбазар', 41.325631, 69.23717, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5db31f7f-e943-492f-aba0-aeccccc3dc60', 'Банкомат 1612', '1612', 'operational', 'atm', 'site_4aa43590-5820-433a-9e6b-ae8056e8dd59', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7c1e4769-5b57-499b-963b-eeb82813b51c', 'Legion Магазин №28 Телевышка', 'г. Ташкент, Юнусабадский район, ул. Ифтихор, 1A', 41.347987, 69.285307, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7786d81c-e666-44ca-9841-c753ec720022', 'Банкомат 1618', '1618', 'operational', 'atm', 'site_7c1e4769-5b57-499b-963b-eeb82813b51c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_be0bfde7-510f-44f1-85bb-08fabe891aa2', 'Bellissimo M.Gorkiy', 'г. Ташкент, ул. Буюк Ипак Йули, дом 123', 41.327327, 69.337844, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d814a196-10c2-489a-bc50-c3b25c11b8e9', 'Банкомат 1619', '1619', 'operational', 'atm', 'site_be0bfde7-510f-44f1-85bb-08fabe891aa2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a5c231ac-da52-4eb8-9099-6abf5fa8b54e', 'Bellissimo C1', 'г. Ташкент, ул. Узбекистон овози 21', 41.31214, 69.291091, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_050eeb6c-0c5d-4baf-8d62-33f33499ac16', 'Банкомат 1622', '1622', 'operational', 'atm', 'site_a5c231ac-da52-4eb8-9099-6abf5fa8b54e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8af60f15-a067-4006-8f47-5e87df4b50d3', 'Bellissimo Yunusobod Setor', 'Ташкент,улица Уч Кахрамон, 12А', 41.375925, 69.279997, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a72db7b6-3c08-46cd-956a-c1fbba4b2760', 'Банкомат 1625', '1625', 'operational', 'atm', 'site_8af60f15-a067-4006-8f47-5e87df4b50d3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f25825f3-e75e-4e95-bded-2a01ef1bdbf8', 'Bellissimo Beltepa', 'г. Ташкент, улица Фараби, 463', 41.348962, 69.179107, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2fc86cc5-d095-4507-b55d-860370d1f692', 'Банкомат 1627', '1627', 'operational', 'atm', 'site_f25825f3-e75e-4e95-bded-2a01ef1bdbf8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_764b5a63-d288-4009-847f-6fbb1693b201', 'Bellissimo kristal ( buddy burger)', 'г. Ташкент, ул.Юнусота МФЙ 14', 41.373588, 69.304704, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ee01a5e9-a4af-40e0-b3f7-345342138613', 'Банкомат 1628', '1628', 'operational', 'atm', 'site_764b5a63-d288-4009-847f-6fbb1693b201', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dfa2c8c5-3fb2-4170-98af-61d08195bf40', 'Bellissimo Buz bazar', 'г. Ташкент, Мирзо-Улугбекский район,улица Сайрам, 1Б', 41.327519, 69.32477, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5ee651d4-1c12-46ae-ab28-b420fd292c84', 'Банкомат 1633', '1633', 'operational', 'atm', 'site_dfa2c8c5-3fb2-4170-98af-61d08195bf40', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_100d9b35-cce6-42ad-ad20-9cf2cd4b5d55', 'Bellissimo Drujba', 'г. Ташкент, улица Ислама Каримова, 8/1', 41.311178, 69.245215, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_19a7ddd5-16b7-4b7c-b4a3-4cc65e7545e3', 'Банкомат 1636', '1636', 'operational', 'atm', 'site_100d9b35-cce6-42ad-ad20-9cf2cd4b5d55', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5d97ccdf-8a61-4a45-84b8-d8416ea39368', 'Legion МАГАЗИН №53 КОРАКАМЫШ', 'Ташкент, Алмазарский район, массив Каракамыш, квартал 2/4, 19Б', 41.364676, 69.214286, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2f814ed-baf8-4792-a760-fa5528daf2f9', 'Банкомат 1637', '1637', 'operational', 'atm', 'site_5d97ccdf-8a61-4a45-84b8-d8416ea39368', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f75754e2-0383-49eb-99e4-af02548cbba1', 'Bellissimo Marhabo', 'г. Самарканд, улица Буюк Ипак Йули, 69А', 39.64845, 66.924348, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_22bdf891-37bb-48e7-91b5-8a6fc565a744', 'Банкомат 1643', '1643', 'operational', 'atm', 'site_f75754e2-0383-49eb-99e4-af02548cbba1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7641977d-c3e2-480a-a6d1-27c0589896d5', 'Bellissimo Orzu Makhmudova', 'Самарканд, ул. Орзу Махмудов, 10', 39.645092, 66.954539, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8a85292b-9824-44bd-b1e5-3a558804a7d0', 'Банкомат 1644', '1644', 'operational', 'atm', 'site_7641977d-c3e2-480a-a6d1-27c0589896d5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_78119fe3-6554-4cbe-98f2-fb4fae3a1929', 'Korzinka Самаркад Туркистон', 'г. Самарканд, МСГ «Саъдий Шерозий», улица Туркистон, 148б', 39.637088, 66.919233, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_37be0f41-8c4c-4d27-87d3-f902f4b82bdc', 'Банкомат 1645', '1645', 'operational', 'atm', 'site_78119fe3-6554-4cbe-98f2-fb4fae3a1929', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_41f07571-6052-4123-94f7-f38f763a29ac', 'Bellissimo Samakqand gilyon 5', 'г. Самарканд,улица Ибн Сины, 25А', 39.673246, 66.969429, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3dd6f4a9-846a-4ffd-8639-17e7a6a52eb3', 'Банкомат 1646', '1646', 'operational', 'atm', 'site_41f07571-6052-4123-94f7-f38f763a29ac', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bf363e8f-f949-4c8c-8cb8-6f587b47a611', 'Bellissimo Registon', 'г.Самарканд, ул. Регистан 7', 39.652921, 66.972746, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3f43de04-abaa-4f95-9e2e-c3a9cc482405', 'Банкомат 1647', '1647', 'operational', 'atm', 'site_bf363e8f-f949-4c8c-8cb8-6f587b47a611', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ae2b3adb-19eb-450d-8668-65eb9665b809', 'Korzinka Янги Узбекистон, 189', 'Ташкентская область, Бостанлыкский район, МСГ «Коронкул», улица Янги Узбекистон, 189', 41.602812, 69.886172, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_76f8a4e7-8351-4d7d-a544-386ec247ad79', 'Банкомат 1649', '1649', 'operational', 'atm', 'site_ae2b3adb-19eb-450d-8668-65eb9665b809', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e31ddfae-3415-433c-90a3-9c1b07b8292a', 'Max fit', 'г. Карши улица Насаф, 4/173', 38.869768, 65.800481, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7a812aea-6fd2-4c95-9d22-010fd09dcee7', 'Банкомат 1650', '1650', 'operational', 'atm', 'site_e31ddfae-3415-433c-90a3-9c1b07b8292a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_be352774-523b-4abd-af1a-066c513a4aaa', 'Metro Mall', 'г. Карши, махаллинский сход граждан Навоий, ул. Жайхун, 5', 38.849046, 65.818679, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f55c6da7-85fc-4025-a2e9-c07868233d79', 'Банкомат 1651', '1651', 'operational', 'atm', 'site_be352774-523b-4abd-af1a-066c513a4aaa', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_44bd3d65-e443-4d40-a3e4-00ada0903795', 'Zor market', 'г. Нукус проспект Ходжейли, 15', 42.467053, 59.59376, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff81d003-0d2b-409d-a88f-27e348534fda', 'Банкомат 1652', '1652', 'operational', 'atm', 'site_44bd3d65-e443-4d40-a3e4-00ada0903795', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5e46419d-2453-44e9-b4df-491c7ddc134c', 'Uzbekistan Hotel', 'г. Ургенч улица Ал-Хоразмий, 90/4', 41.566632, 60.631344, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2d9cd52-61ad-4326-90ac-c6bdacabad0a', 'Банкомат 1653', '1653', 'operational', 'atm', 'site_5e46419d-2453-44e9-b4df-491c7ddc134c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0ed52ee0-316f-4637-ab46-80ac306bc918', 'Cosmo Park', 'г. Ургенч улица Фарход, 33/68', 41.570949, 60.646413, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_552596ae-4d81-48fe-92d5-0bcfaa4732b3', 'Банкомат 1654', '1654', 'operational', 'atm', 'site_0ed52ee0-316f-4637-ab46-80ac306bc918', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_51c6552a-5d9c-41d5-9dd0-198c2098f141', 'Legion Магазин №61 Бетонка', 'Ташкентский район, населённый пункт Тутзар', 41.379374, 69.320447, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b919016e-af48-4736-81c8-5d382e617fbb', 'Банкомат 1655', '1655', 'operational', 'atm', 'site_51c6552a-5d9c-41d5-9dd0-198c2098f141', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e58ab1a4-8743-4708-86cd-8a530283a207', 'Legion Магазин№53 Водник', 'г. Ташкент, Бектимирский район, ул. Хусейна Байкары, 29Г', 41.254509, 69.373961, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e060208b-a240-4165-8a4b-2732fcd3bfe7', 'Банкомат 1656', '1656', 'operational', 'atm', 'site_e58ab1a4-8743-4708-86cd-8a530283a207', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_93fd5c2c-6fc6-40e4-8be6-28b6648c8d55', 'Legion МАГАЗИН № 10 ЦИАЛКОВСКИЙ', 'г. Ташкент, Мирзо-Улугбекский район, ул. Олтинтепа, 259', 41.318716, 69.341224, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_df431983-bc7c-49d9-bc8c-0825cdd2e4ad', 'Банкомат 1657', '1657', 'operational', 'atm', 'site_93fd5c2c-6fc6-40e4-8be6-28b6648c8d55', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_112ea04c-e4c8-4e3b-ade2-8a2a23765e20', 'Makro - 147', 'Ташкентская область, Бостанлыкский район, городской посёлок Чарвак', 41.637404, 69.939007, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_86777b10-a5aa-453b-a762-ce9c58dd68b2', 'Банкомат 1658', '1658', 'operational', 'atm', 'site_112ea04c-e4c8-4e3b-ade2-8a2a23765e20', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e71d65b0-11b8-4cc2-b7fa-11490d4d3740', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Ташкент, Юнусабадский район, махаллинский сход граждан Хасанбай, ул. Барака, 106А', 41.383121, 69.266765, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_211627bf-258f-461a-b2f3-085085d169f4', 'Банкомат 1659', '1659', 'operational', 'atm', 'site_e71d65b0-11b8-4cc2-b7fa-11490d4d3740', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e50d25df-e1f0-41d7-8b16-77898b117b27', 'Makro - 140', 'г. Ташкент, Шайхантахурский район, ул. Талабалар, 25г.', 41.355487, 69.208197, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_666adabe-ec4c-4483-bbc9-9deb5eea332e', 'Банкомат 1660', '1660', 'operational', 'atm', 'site_e50d25df-e1f0-41d7-8b16-77898b117b27', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b33edc13-b558-4da6-9ea1-6d530e972cfd', 'Korzinka Чирчик Парк', 'г. Чирчик, МФЙ Бирлик, ул.А.Навои, дом 447', 41.478387, 69.592166, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff023b69-570c-405a-8007-7ed52dcc65aa', 'Банкомат 1661', '1661', 'operational', 'atm', 'site_b33edc13-b558-4da6-9ea1-6d530e972cfd', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8fba3bb8-5691-4250-9707-ac78c8fd1774', 'Makro - 144', 'Ташкентская область, г. Нурафшан, махаллинский сход граждан Нурафшон, улица Тошкент Йули, 52', 41.011967, 69.360243, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7a34877e-51f9-4982-9096-b148fdd22bbc', 'Банкомат 1662', '1662', 'operational', 'atm', 'site_8fba3bb8-5691-4250-9707-ac78c8fd1774', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c88b92b-1d9b-4582-82c4-26d72bb46519', 'Makro - 071', 'г. Ташкент, Мирзо-Улугбекский район, улица Миллий Бог.', 41.332878, 69.413386, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_09bf3af7-8db0-4b5e-8f7c-6301e152fe75', 'Банкомат 1648', '1648', 'operational', 'atm', 'site_6c88b92b-1d9b-4582-82c4-26d72bb46519', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_504e1e54-45f6-4482-af69-34e693cf6c6f', 'OLMA А-41', 'Ташкентская область, г. Алмалык, МСГ Кимёгар, ул.Эхтиром, д-10-д', 40.797227, 69.573921, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c33f5eb7-020e-4f78-bf6d-3b492fe0595d', 'Банкомат 1663', '1663', 'operational', 'atm', 'site_504e1e54-45f6-4482-af69-34e693cf6c6f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6e93d8b3-9c40-4eb3-9dbc-aa4dca43293a', 'OLMA А-45', 'Ташкентская область, г. Ангрен, МСГ Навбахор,12 массив, дом-1', 41.049759, 70.086532, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c3d8fcec-f896-4601-ae88-22897c6eea6a', 'Банкомат 1664', '1664', 'operational', 'atm', 'site_6e93d8b3-9c40-4eb3-9dbc-aa4dca43293a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f129af1e-9ce1-470f-a3c3-132377ce0e1e', 'Buxoro Savdo Majmuasi', 'Бухара, улица Мустакиллик', 39.767488, 64.431924, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a74edf7d-b851-436f-956e-fa4edf9ec67c', 'Банкомат 1665', '1665', 'operational', 'atm', 'site_f129af1e-9ce1-470f-a3c3-132377ce0e1e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a952f04d-dbee-455f-8a77-1eab89186ad5', 'Единое окно', 'г. Бухара, улица Б. Накшбанди, 168 дом.', 39.771229, 64.440645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ea0abbd0-bf0e-45bd-8084-6999bc2a66da', 'Банкомат 1666', '1666', 'operational', 'atm', 'site_a952f04d-dbee-455f-8a77-1eab89186ad5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_348e01ba-0864-4fc7-8d2f-a5f2f717d048', 'SofGO 2', 'г. Карши, улица Тукмангит, 5', 38.901989, 65.795391, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_575ff76a-2a38-49df-bcea-9136eb4b7f49', 'Банкомат 1667', '1667', 'operational', 'atm', 'site_348e01ba-0864-4fc7-8d2f-a5f2f717d048', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_47499e1e-ef3b-4ef2-b979-c6ed58626702', 'Единое окно', 'г. Нукус, улица Дослык каналы, 183/2', 42.469759, 59.599042, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2af73d63-b5b9-4a9f-82d7-d7298c89ad78', 'Банкомат 1669', '1669', 'operational', 'atm', 'site_47499e1e-ef3b-4ef2-b979-c6ed58626702', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f7598566-541f-4882-8e70-21b99252c2fa', 'Единое окно', 'Сырдарьинская область, Сырдарьинский район, улица Узбекистан, микрорайон Ёшлик, дом 98а', 40.84554, 68.668577, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b453a569-1aa5-4b4a-99b0-aa61e3ce10f1', 'Банкомат 1670', '1670', 'operational', 'atm', 'site_f7598566-541f-4882-8e70-21b99252c2fa', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ba59be79-90e7-4064-b5f5-66f394c61e69', 'Korzinka Сергели-4 станция', 'г.Ташкент, Янгихаетский район, махалля Ибрат, 71-й дом', 41.21137, 69.21513, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_db0fca15-121c-4ad8-802d-6997eee4a5f7', 'Банкомат 1671', '1671', 'operational', 'atm', 'site_ba59be79-90e7-4064-b5f5-66f394c61e69', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6b4780b4-2717-4a7f-b822-97bd965b41a2', 'Корзинка Файзабад', 'г. Ташкент, Мирабадский район, улица Янги Куйлюк, 2А', 41.256603, 69.319733, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c69b2f6a-9b2d-4e59-bb22-74b30b2cf60f', 'Банкомат 1672', '1672', 'operational', 'atm', 'site_6b4780b4-2717-4a7f-b822-97bd965b41a2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dfff5e32-9170-4f2c-a911-2ba026dce3b1', 'Legion Магазин №40', 'г. Ташкент, Сергелийский район, ул. Абдурауфа Фитрата, 159А', 41.270514, 69.28704, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_37867466-7c08-4efa-adeb-08b05e7d708b', 'Банкомат 1676', '1676', 'operational', 'atm', 'site_dfff5e32-9170-4f2c-a911-2ba026dce3b1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a39a568b-b8d9-4c34-814b-686e1f856782', 'Nura Store', 'г. Термез, махаллинский сход граждан Саховат', 37.23143, 67.258325, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b60683bf-4827-48a4-b891-ce7aecc1986c', 'Банкомат 1678', '1678', 'operational', 'atm', 'site_a39a568b-b8d9-4c34-814b-686e1f856782', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a75a1fa0-a768-4738-be23-98b151191b04', 'Единое окно', 'г.Термез, А.Ул. Навои, 41 " з " - дом', 37.2452, 67.306972, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1e77d703-09ac-4d39-89d0-065cfe188869', 'Банкомат 1679', '1679', 'operational', 'atm', 'site_a75a1fa0-a768-4738-be23-98b151191b04', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_26d608ae-8a4b-404e-9616-bf3ce0597116', 'Единое окно', 'Хореземская обл., Ургенчский район, улица Янги Шавот', 41.56132, 60.601782, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d97dc7c8-fc5f-488b-836d-c093e1c6f8c8', 'Банкомат 1680', '1680', 'operational', 'atm', 'site_26d608ae-8a4b-404e-9616-bf3ce0597116', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e5e7e92-3f89-4fc5-9d65-989f6bbe0d0f', 'Единое окно', 'Хореземская обл., г. Ургенч, улица Ханка, дом 9/1', 41.544954, 60.623708, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2c0ba21d-6afe-4492-be03-281a056342f9', 'Банкомат 1681', '1681', 'operational', 'atm', 'site_2e5e7e92-3f89-4fc5-9d65-989f6bbe0d0f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1e65b4a7-093e-4cec-9ffd-cc24390a2a79', 'Единое окно', 'Хореземская обл., город Хива, улица Буюк Йул, 34', 41.397308, 60.37132, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d02d2e19-5c7d-4f88-9378-f92838fcdc33', 'Банкомат 1682', '1682', 'operational', 'atm', 'site_1e65b4a7-093e-4cec-9ffd-cc24390a2a79', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1d3ce931-a853-4e67-80ac-e670b39a42d5', 'Korzinka Мотрид', 'г. Самарканд, массив Карасу, 70Б', 39.717242, 66.933165, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_119d4a4d-b6ab-4413-97e7-e98611062a61', 'Банкомат 1569', '1569', 'operational', 'atm', 'site_1d3ce931-a853-4e67-80ac-e670b39a42d5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9d4663a7-a2f1-46e0-887b-f29a5d0966bd', 'Korzinka Самарканд Сити', 'г. Самарканд, ул. Амира Темура, 83', 39.648594, 66.941846, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3351f3ad-2801-4fda-90cd-ae364a7facf3', 'Банкомат 1570', '1570', 'operational', 'atm', 'site_9d4663a7-a2f1-46e0-887b-f29a5d0966bd', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6e8f546d-eea4-4118-b6f9-91d2c7475676', 'Пункт выдачи Uzum Market', 'г. Карши, проспект Мустакиллик, 50', 38.835099, 65.77451, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d2081d59-a165-44e6-b508-8cd0621ed3ee', 'Банкомат 1685', '1685', 'operational', 'atm', 'site_6e8f546d-eea4-4118-b6f9-91d2c7475676', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ffb81145-faff-4bb3-945d-8c884cd6f87c', 'Пункт выдачи Uzum Market', 'г. Карши, улица Шибаева, 7А', 38.841808, 65.781654, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6db450c7-3514-4cc7-83a8-8f0ed6d68cb8', 'Банкомат 1686', '1686', 'operational', 'atm', 'site_ffb81145-faff-4bb3-945d-8c884cd6f87c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d667988b-0a37-406f-9948-7dba4fbecee5', 'Korzinka Янгиюль 1', 'г. Янгиюль, р-н Нурафшан, Навруз РМС, ул. Олимжона.', 41.115441, 69.057107, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_19ce748b-583e-40fe-8fd4-26f8da82d4ea', 'Банкомат 1694', '1694', 'operational', 'atm', 'site_d667988b-0a37-406f-9948-7dba4fbecee5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cb92e650-be6f-4b23-bce4-97d325600969', 'Пункт выдачи Uzum Market', 'г. Ургенч, махалля Ок-Ариклар', 41.586476, 60.619388, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a535b9e6-9ce4-4d4e-87cd-0e794effc144', 'Банкомат 1691', '1691', 'operational', 'atm', 'site_cb92e650-be6f-4b23-bce4-97d325600969', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4c2632ff-a3db-4e3a-a1cd-0e74272c45d4', 'Пункт выдачи Uzum Market', 'г. Ургенч, улица Учкун, 1/1', 41.585427, 60.587911, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c8c6043f-140e-4d7d-9308-e65e06956c0e', 'Банкомат 1690', '1690', 'operational', 'atm', 'site_4c2632ff-a3db-4e3a-a1cd-0e74272c45d4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9524af71-b1b5-46f1-9c74-599d3803e681', 'Пункт выдачи Uzum Market', 'Ургенч, улица Янги Шовот, 15', 41.564607, 60.591106, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3a4f2597-18d0-4513-b9d2-c0f9aed78454', 'Банкомат 1689', '1689', 'operational', 'atm', 'site_9524af71-b1b5-46f1-9c74-599d3803e681', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ad6f3736-9d33-4f1f-85fa-fcdc0f5eb450', 'Bellissimo Kokand 2 Турон кучаси', 'г. Коканд, МСГ (махалля) «Гиштли масжид», улица Турон, дом 10.', 40.533914, 70.927771, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_264d67df-2836-40b7-a205-41b33d2010ec', 'Банкомат 1668', '1668', 'operational', 'atm', 'site_ad6f3736-9d33-4f1f-85fa-fcdc0f5eb450', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_767975ac-63e3-41ba-9192-24c5688a4e8d', 'Единое окно', 'Фергансакая обл., Маргилан, Улица Мустакиллик, 378', 40.477278, 71.72051, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eb437a2c-1894-43d3-a40a-f81685f9c178', 'Банкомат 1683', '1683', 'operational', 'atm', 'site_767975ac-63e3-41ba-9192-24c5688a4e8d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c2296382-4707-4e36-baee-578f5903c921', 'Пункт выдачи Uzum Market', 'г. Ургенч, улица Абдульгази Бахадырхана, 109', 41.543078, 60.643403, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_998569a9-3761-4ea6-a04f-93de1b361aa2', 'Банкомат 1684', '1684', 'operational', 'atm', 'site_c2296382-4707-4e36-baee-578f5903c921', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4c3927b4-c06b-4968-9c3a-f94db5b75513', 'Korzinka Навои 45-Б', 'Навои, МСГ Бунёдкор улица Алишер Навоий, 11G,', 40.110843, 65.36556, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c9c4c557-13d3-4953-b1b0-53af7efa63f5', 'Банкомат 1687', '1687', 'operational', 'atm', 'site_4c3927b4-c06b-4968-9c3a-f94db5b75513', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1d08fadb-1760-4eee-958a-05f4e0480702', 'Пункт выдачи Uzum Market', 'г. Ургенч, улица Ислама Каримова, 122', 41.551241, 60.625636, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_911559c9-c1c3-426c-a707-6fe7dd6f64b7', 'Банкомат 1688', '1688', 'operational', 'atm', 'site_1d08fadb-1760-4eee-958a-05f4e0480702', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ce8eb571-86a1-4d13-beeb-62a20ebbe8cb', 'Korzinka Навои К072', 'г. Навои, Карманинский район, старый город.( 8-й микрорайон, просп. Ислама Каримова, 105)', 40.124833, 65.362774, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8276c012-b984-4ff3-a77b-34b3ef0c6ff3', 'Банкомат 1692', '1692', 'operational', 'atm', 'site_ce8eb571-86a1-4d13-beeb-62a20ebbe8cb', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6a0e2da6-aa7a-44ea-93c3-ce861e49c732', 'Korzinka Фергана Миндонобод', 'г. Фергана, населённый пункт Миндонобод, ул. Мустакиллик Шукронаси, 124Д', 40.315885, 71.772506, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e3c168bd-157b-4258-9af6-e119e3994095', 'Банкомат 1693', '1693', 'operational', 'atm', 'site_6a0e2da6-aa7a-44ea-93c3-ce861e49c732', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7609b109-79dd-4655-b65a-736c78825d9f', 'БЦ Galleon', 'Ташкент, Мирзо-Улугбекский район, переулок Пушкина, д.7', 41.318174, 69.299041, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bb4d1975-753b-4686-9add-46aa747050af', 'Банкомат 1748', '1748', 'operational', 'atm', 'site_7609b109-79dd-4655-b65a-736c78825d9f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3b08f945-28ea-4c69-883b-5f6826135ba3', 'Пункт выдачи Uzum Market', 'г. Ташкент, ул. Сагбан, 52', 41.331055, 69.235374, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f782f126-1353-49d9-b811-ec07d7e18dad', 'Банкомат 1119', '1119', 'operational', 'atm', 'site_3b08f945-28ea-4c69-883b-5f6826135ba3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_65ea28cf-9339-4942-a6c6-0b7c78f4762e', 'Korzinka Сагбан, 40', 'г. Ташкент, Алмазарский район, МСГ «Хафиза Кухакий», улица Сагбан, 40', 41.330081, 69.235866, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b73246c8-4c96-4dcc-b971-4c788cc6b371', 'Банкомат 1674', '1674', 'operational', 'atm', 'site_65ea28cf-9339-4942-a6c6-0b7c78f4762e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8b46b879-95a5-4d07-8dfc-be784ab68262', 'Olma-C9', 'Ташкентская область, Бостанлыкский район, городской посёлок Чарвак, улица Ходжикент', 41.640429, 69.93875, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dbf2528c-c9a9-4935-850f-918bc317820e', 'Банкомат 1677', '1677', 'operational', 'atm', 'site_8b46b879-95a5-4d07-8dfc-be784ab68262', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7f2946f4-724a-4103-bd77-07735f09c60d', 'Пункт выдачи Uzum Market', 'г. Самарканд, Термезкая улица', 39.644892, 66.968117, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cae795a8-b096-492d-b2d9-eda068e3b378', 'Банкомат 1695', '1695', 'operational', 'atm', 'site_7f2946f4-724a-4103-bd77-07735f09c60d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_da11b7bf-e952-4afc-91c5-dc0b96391ad0', 'Шахзодбек маркет', 'г. Самарканд улица Нодирабегим, 24', 39.656647, 66.928289, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_51555446-2cb1-4813-878d-143329414305', 'Банкомат 1697', '1697', 'operational', 'atm', 'site_da11b7bf-e952-4afc-91c5-dc0b96391ad0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_52175290-e0d3-406a-87a1-3b9d42bf276a', 'Dilmurod market', 'г. Самарканд, улица Мирзо Улугбека, 78А', 39.660979, 66.939572, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3fb71404-d91d-4884-9cc8-1ad649fb1510', 'Банкомат 1698', '1698', 'operational', 'atm', 'site_52175290-e0d3-406a-87a1-3b9d42bf276a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ff95d952-f4a2-41c3-a639-615059cbe3b7', 'Автострахование Самарканд', 'г. Самарканд, улица Рудаки, 187', 39.675968, 66.949273, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9d27553c-9c54-48ee-97d8-638d8223120d', 'Банкомат 1699', '1699', 'operational', 'atm', 'site_ff95d952-f4a2-41c3-a639-615059cbe3b7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_06011458-05e3-49f9-9df6-22bb6ee6b717', 'ТЦ Euro Plaza', 'г.Самарканд, улица Махмуда Ходжи Бехбуди, 2', 39.661861, 66.996884, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_178f8b82-2bbe-4de4-b04e-8efe0ca04273', 'Банкомат 1700', '1700', 'operational', 'atm', 'site_06011458-05e3-49f9-9df6-22bb6ee6b717', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_43497d0d-2c6f-4c00-9d66-3736ace94845', 'Bellissimo Angren', 'Ташкентская область,Ангрен,Bunyodkor ko''chasi, 2', 41.012744, 70.086672, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_039f7cf0-9b7c-4df7-b244-319da9b6b7e5', 'Банкомат 1701', '1701', 'operational', 'atm', 'site_43497d0d-2c6f-4c00-9d66-3736ace94845', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2c3fd0ec-3dda-4e58-9676-94137244b5c7', 'Bellissimo Karshi', 'г. Карши,улица Амира Тимура, 118А', 38.858409, 65.80558, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a6783e3a-7b2b-43b8-9143-03885739adfa', 'Банкомат 1703', '1703', 'operational', 'atm', 'site_2c3fd0ec-3dda-4e58-9676-94137244b5c7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e6afdfd6-0438-4b9b-ba67-e0062bc49c41', 'Bellissimo Urgench', 'г. Ургенч, махалля “Феруз, улица ”Пахлавон Махмуд”, дом 59/1, кв1', 41.559521, 60.619222, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dce3f5d0-8e6b-4956-ba13-b103c2a8bced', 'Банкомат 1704', '1704', 'operational', 'atm', 'site_e6afdfd6-0438-4b9b-ba67-e0062bc49c41', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4f2e3844-2b86-4585-ac37-05b130c1044a', 'Bellissimo Bekabad', 'Ташкентская область, г. Бекабад, Нурли йул МФИ, ул. Буюк ипак йули, дом 337', 40.212245, 69.264055, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3c7b68b2-c847-40be-a070-a02ceda6816d', 'Банкомат 1705', '1705', 'operational', 'atm', 'site_4f2e3844-2b86-4585-ac37-05b130c1044a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6b41ada3-cdcc-42e4-8ae8-da8b929e5460', 'Bellissimo Fargona 1', 'г. Фергана, улица Сайилгох, 58', 40.386698, 71.789485, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_810750a0-622e-47e7-8ca5-73b1fbaa7c1b', 'Банкомат 1706', '1706', 'operational', 'atm', 'site_6b41ada3-cdcc-42e4-8ae8-da8b929e5460', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3e1d649a-aebd-4eb4-9740-496910a0cfe0', 'Bellissimo Fargona 2 (flagman)', 'г. Фергана, улица Мустақиллик шох, дом 65б', 40.378113, 71.777503, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cdbfa5db-8754-49cf-960e-e2a7d76181dd', 'Банкомат 1707', '1707', 'operational', 'atm', 'site_3e1d649a-aebd-4eb4-9740-496910a0cfe0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_210646ad-41c7-4dd8-9d01-286b3ba6992a', 'Bellissimo Fargona 3 (yumma)', 'г. Фергана, махаллинский сход граждан Навруз, улица Саккокий, 77', 40.388016, 71.768573, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7a2d1c73-6382-4e33-96c2-f9e89ac9f8c9', 'Банкомат 1708', '1708', 'operational', 'atm', 'site_210646ad-41c7-4dd8-9d01-286b3ba6992a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0385b649-6ab0-4444-9fa9-d3798f97ead3', 'Bellissimo Nukus', 'г.Нукус,улица Аллаяра Досназарова, 60', 42.457454, 59.622449, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_74caf624-9835-472b-b49d-89c3884275f0', 'Банкомат 1702', '1702', 'operational', 'atm', 'site_0385b649-6ab0-4444-9fa9-d3798f97ead3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_93b4df2b-f977-4bdf-a3b2-bcf40cf64b13', 'Charos hotel', 'Ташкентская область, Бостанлыкский район, н.п. Юсупхана', 41.622077, 70.04641, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff860d15-db11-45a6-a923-16c71ad2b476', 'Банкомат 1709', '1709', 'operational', 'atm', 'site_93b4df2b-f977-4bdf-a3b2-bcf40cf64b13', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d11d6643-d2b7-4178-916a-26dd5ee5c997', 'Огни Сеул', 'г. Ташкент, Сергелийский район, массив Куйлюк, 7-й квартал, 1Б', 41.24498, 69.283723, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_68a4c361-7d7a-4dfd-806c-2055d7cd93cd', 'Банкомат 1710', '1710', 'operational', 'atm', 'site_d11d6643-d2b7-4178-916a-26dd5ee5c997', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d67df329-689a-4c5f-82fa-eb64c15478c6', 'Sohil Market 1', 'г. Ташкент, Ферганское ш., 222/5', 41.282246, 69.305273, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9a18c8d1-016a-43fe-88dd-b075b0b23c18', 'Банкомат 1711', '1711', 'operational', 'atm', 'site_d67df329-689a-4c5f-82fa-eb64c15478c6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_16a4d1aa-6bb7-4081-898c-76dbf9957a2f', 'Korzinka Каракамыш 1/3', 'г. Ташкент, Каракамыш 1/3, улица Сагбан, 35А.', 41.359521, 69.226602, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_055e78e0-ed53-4ae6-86de-5c58d615b3ed', 'Банкомат 1714', '1714', 'operational', 'atm', 'site_16a4d1aa-6bb7-4081-898c-76dbf9957a2f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8cd29b45-3a5b-4446-91f2-1c576259f1b0', 'Пирамиды', 'Ташкентская область, Бостанлыкский район', 41.608648, 70.017548, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a89b3e76-96a9-495b-8c4d-13b6f0362c8f', 'Банкомат 1715', '1715', 'operational', 'atm', 'site_8cd29b45-3a5b-4446-91f2-1c576259f1b0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b5475a3b-ecab-4f82-8dda-51787d934c26', 'Единое окно', 'г. Самарканд, улица А.Тимура, 152', 39.647314, 66.933742, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2093a23f-4093-478e-a439-405a4c304e75', 'Банкомат 1717', '1717', 'operational', 'atm', 'site_b5475a3b-ecab-4f82-8dda-51787d934c26', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_80ad351b-42b3-4f53-b99a-26d2da1b7576', 'Olma S-23 ( Самарканд )', 'г.Самарканд,МСГ Хунармандлар,ул.Спитаменшох,д-11', 39.667981, 66.924987, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9eced41b-5056-4a33-8001-0152bc312495', 'Банкомат 1718', '1718', 'operational', 'atm', 'site_80ad351b-42b3-4f53-b99a-26d2da1b7576', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4ed3dba7-33f3-4a46-a95d-aa07fa77314c', 'Исроил маркет', 'г. Самарканд, проспект Навои, 6', 39.665944, 66.946956, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_214ec293-8240-4f64-bed3-51cfb1eac194', 'Банкомат 1719', '1719', 'operational', 'atm', 'site_4ed3dba7-33f3-4a46-a95d-aa07fa77314c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_287bd62b-0eef-49b6-9537-dbb0f5e04fc7', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Термез, улица Ислама Каримова, 140', 37.224968, 67.28591, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_afdfd3b8-f4a1-4863-b417-840f39ce86c8', 'Банкомат 1720', '1720', 'operational', 'atm', 'site_287bd62b-0eef-49b6-9537-dbb0f5e04fc7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8daf8c81-b813-43cd-b314-0d1ea541b542', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Термез, улица Истиклол, 3', 37.212843, 67.271275, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d81dccb5-89d2-4c33-9b39-70229ad44865', 'Банкомат 1721', '1721', 'operational', 'atm', 'site_8daf8c81-b813-43cd-b314-0d1ea541b542', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c8ce6086-df9d-4ac7-8e9a-f9d8af770b3a', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Термез, улица Ислама Каримова, 172', 37.235039, 67.302111, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a1bb18cc-3d30-47c0-80f9-79bfd1e82019', 'Банкомат 1722', '1722', 'operational', 'atm', 'site_c8ce6086-df9d-4ac7-8e9a-f9d8af770b3a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5621034c-64e0-40cd-8f6c-a792f5b57ba1', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Нукус, улица Халыклар Бирлиги, 12A', 42.390945, 59.626603, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_caf4b5dc-3e62-46e0-9bc1-46915d7c205f', 'Банкомат 1723', '1723', 'operational', 'atm', 'site_5621034c-64e0-40cd-8f6c-a792f5b57ba1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0b1db30-2f5c-47d4-9b5a-0fbb0eca8609', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Нукус, автомагистраль Нукус - Чимбай, 25A', 42.525598, 59.621904, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3971589b-59e1-47e3-9726-a80de92065eb', 'Банкомат 1724', '1724', 'operational', 'atm', 'site_b0b1db30-2f5c-47d4-9b5a-0fbb0eca8609', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e84a97ff-c653-472d-86f5-f9331d07af38', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Нукус, улица К. Мамбетова, 56V', 42.468681, 59.637281, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_41e033b6-e91f-432f-b876-19871227e5ae', 'Банкомат 1725', '1725', 'operational', 'atm', 'site_e84a97ff-c653-472d-86f5-f9331d07af38', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_99e8ad49-fa90-4ddc-8eeb-9f1a4132653d', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Карши, улица Мазхаб, 1/147', 38.821598, 65.779663, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_10cef89b-da39-4d13-a966-8042569e2438', 'Банкомат 1726', '1726', 'operational', 'atm', 'site_99e8ad49-fa90-4ddc-8eeb-9f1a4132653d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1d5e461f-2e53-409d-9396-f654441e9fd2', 'Гостиница ASL', 'Бухара, махаллинский сход граждан Жалол Икромий, ул. Бахоуддина Накшбанда, 100', 39.772685, 64.421429, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_029018d0-4c48-491f-b592-2af3b85e9dcd', 'Банкомат 1727', '1727', 'operational', 'atm', 'site_1d5e461f-2e53-409d-9396-f654441e9fd2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_730afcf5-1126-4e06-be6f-a78c906a44e4', 'Nam global farm', 'г. Наманган, махаллинский сход граждан Истикбол, улица Узумзор, 81', 41.018941, 71.675274, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1a8c4ea0-b5c6-454f-8266-ae5d9f295742', 'Банкомат 1728', '1728', 'operational', 'atm', 'site_730afcf5-1126-4e06-be6f-a78c906a44e4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_716bcdd3-f05f-4d0f-84cb-c1db2912f25b', 'Единое окно', 'город Фергана, село Ёшлар, улица Мурабилар, дом 2', 40.389627, 71.780989, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8fb23330-e0dd-401a-b12c-4bf6037bbc09', 'Банкомат 1729', '1729', 'operational', 'atm', 'site_716bcdd3-f05f-4d0f-84cb-c1db2912f25b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9cd542f7-830f-45ae-ba3f-befe8b76c723', 'Uzum Market франшиза', 'г. Ургенч, улица Абдульгази Бахадырхана, 152V', 41.559706, 60.639774, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dd30a202-955d-4a85-ac65-8c2c384ff068', 'Банкомат 1730', '1730', 'operational', 'atm', 'site_9cd542f7-830f-45ae-ba3f-befe8b76c723', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6511d65c-bd96-4277-8a7b-61c7bd289afd', 'VOHA', 'г. Хива, Kelajak Sari koʻchasi, 41А', 41.397014, 60.359584, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_09f780a1-9515-4230-92a9-d3dec7f60887', 'Банкомат 1731', '1731', 'operational', 'atm', 'site_6511d65c-bd96-4277-8a7b-61c7bd289afd', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5c67c855-66e1-40ae-9d60-77a010357cd5', 'Olma М-196  ( Ташкент )', 'г. Ташкент, Янгихаётский р-н,МСГ Чорбог квартал Спутник-1,д, 33 b', 41.1999, 69.212534, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bd7d294f-5364-439b-a437-2be57a2a98f4', 'Банкомат 1732', '1732', 'operational', 'atm', 'site_5c67c855-66e1-40ae-9d60-77a010357cd5', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2cec746f-da86-4a64-a530-109d5d9e96a4', 'Olma М-200  ( Ташкент )', 'г. Ташкент, Мирабадский р-н,Толарик, Куйлюк-4,д 32-а', 41.247899, 69.308537, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b72cf835-bf1b-451a-a7a2-af4045e747b0', 'Банкомат 1733', '1733', 'operational', 'atm', 'site_2cec746f-da86-4a64-a530-109d5d9e96a4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7ebbb8f2-f84a-4200-ae1a-fc995ccb76ec', 'Станция метро Дружба Народов', 'г. Ташкент, Шайхонтохурский район, улица Ислама Каримова', 41.311369, 69.242745, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1ff151ee-2ace-4c94-a03f-f4f017a1b880', 'Банкомат 1735', '1735', 'operational', 'atm', 'site_7ebbb8f2-f84a-4200-ae1a-fc995ccb76ec', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_07d6d866-b68b-4a27-94fd-b85b7861e1cf', 'Станция метро Дустлик 2', 'г. Ташкент, Яшнабадский район, улица Эльбека жд салар', 41.293454, 69.322674, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_67dfa502-6069-48d1-868a-27881d1bad43', 'Банкомат 1739', '1739', 'operational', 'atm', 'site_07d6d866-b68b-4a27-94fd-b85b7861e1cf', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_78a19354-2fd4-4304-ae45-36e0fdaf5eec', 'Станция метро Пахтакор', 'г. Ташкент, Шайхонтохурский район, махаллинский сход граждан Урда', 41.31745, 69.257038, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e8371689-8665-4908-aff1-e3ec7cb78610', 'Банкомат 1740', '1740', 'operational', 'atm', 'site_78a19354-2fd4-4304-ae45-36e0fdaf5eec', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5eeac2e9-b6be-471f-a16d-3ce0686a24b4', 'Станция метро Алишера Навои', 'г. Ташкент, Шайхонтохурский район, улица Батыра Закирова', 41.319637, 69.254879, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_950e2ef8-faf1-4309-a2f9-ccfd19ec19c8', 'Банкомат 1741', '1741', 'operational', 'atm', 'site_5eeac2e9-b6be-471f-a16d-3ce0686a24b4', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5f81bb39-41b4-478b-923d-dee4f59590f2', 'Makro m016', 'г. Андижан, просп. Бабура, 8', 40.751157, 72.358208, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4b3f00c4-85c3-4b80-97a0-23d5b32c4650', 'Банкомат 1742', '1742', 'operational', 'atm', 'site_5f81bb39-41b4-478b-923d-dee4f59590f2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_41853316-c646-4b9d-9755-babdd7113aa7', 'Makro m020', 'г. Андижан, ул. Амир Умархан, 24', 40.764911, 72.355721, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1c407c4a-c8e9-4318-b8cc-1c86e8be0729', 'Банкомат 1743', '1743', 'operational', 'atm', 'site_41853316-c646-4b9d-9755-babdd7113aa7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f2695e53-fbdf-4501-be24-52afa4f18497', 'Makro m024', 'г. Коканд, ул. Истиклол, 4', 40.537612, 70.936131, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_78c5a467-eb56-4162-90a2-06191da64df3', 'Банкомат 1744', '1744', 'operational', 'atm', 'site_f2695e53-fbdf-4501-be24-52afa4f18497', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0ca2c2f6-ee4e-4417-80c9-f49084c24dea', 'Korzinka K221', 'г. Бухара, махаллинский сход граждан Дилкушо', 39.782689, 64.436744, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_33768d78-8fbd-4501-aced-83c7c79bad08', 'Банкомат 1745', '1745', 'operational', 'atm', 'site_0ca2c2f6-ee4e-4417-80c9-f49084c24dea', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aba70d35-ec19-42c6-9108-32fe910c0fec', 'Global International Hospital', 'г. Ташкент, Сергелийский район, ул. Янги Сергели, 100', 41.217345, 69.225448, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4367bfed-fd84-4b21-bc54-657e00c1e50e', 'Банкомат 1747', '1747', 'operational', 'atm', 'site_aba70d35-ec19-42c6-9108-32fe910c0fec', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_262e929c-397d-4032-a715-9d26f4614c33', 'OLMA', 'г. Ташкент, Янгиюльский район, Янгидарханский МФК,улица Навруз', 41.1047429, 69.0109019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_56cffd38-ed61-4cf8-9105-be4537bd17ba', 'Банкомат 1039', '1039', 'operational', 'atm', 'site_262e929c-397d-4032-a715-9d26f4614c33', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e6ce074-12c3-4f80-9a2d-f301541e176c', 'Пункт выдачи Uzum Market', 'г. Ташкент, Шайхантахурский районул.Укчи,3А', 41.3140159, 69.2490968, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_01523a5c-0dfe-468d-aa5f-6117d04bdb96', 'Банкомат 1067', '1067', 'operational', 'atm', 'site_2e6ce074-12c3-4f80-9a2d-f301541e176c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_816f88ea-d9a9-4c5a-9d71-938f7940b9a6', 'Пункт выдачи Uzum Market', 'г. Самарканд , улица Амира Темура, 103 Б дом', 39.647542, 66.9122343, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_66eaf42f-ebf8-4d11-b09c-cbf670cd3b24', 'Банкомат 1108', '1108', 'operational', 'atm', 'site_816f88ea-d9a9-4c5a-9d71-938f7940b9a6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a9c0ea01-c675-4e1f-bff5-857a61640859', 'Пункт выдачи Uzum Market', 'г. Самарканд, улица Амира Темура, дом 202', 39.647542, 66.9122343, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c1b9ee3d-ce78-4bad-ba64-5e29643020ea', 'Банкомат 1072', '1072', 'operational', 'atm', 'site_a9c0ea01-c675-4e1f-bff5-857a61640859', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_46ed0818-2fe0-4e9d-b4c8-eec9afd5f882', 'ТЦ Самсунг', 'Самаркандская обл., г. Самарканд,,ул. Мирзо Улугбека, 105 А/1', 39.6467232, 66.9599303, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_02a221cd-ae49-4d3e-9edd-5fc81bcee0a7', 'Банкомат 1111', '1111', 'operational', 'atm', 'site_46ed0818-2fe0-4e9d-b4c8-eec9afd5f882', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9ffde4a4-ea1b-498a-908e-5a4287047bac', 'ТЦ Anor', 'Самаркандская обл., г. Самарканд,ул. Шахруха Мирзы, 20, напротив бывшего ГУМа.', 39.6467232, 66.9599303, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_522b171c-0ea3-4f2f-ae87-d76aeda12d3c', 'Банкомат 1141', '1141', 'operational', 'atm', 'site_9ffde4a4-ea1b-498a-908e-5a4287047bac', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_57bd021c-076f-40ea-a112-4b8d15c08f97', 'Fix Price V027', 'Ташкентская область, г. Янгиюль, Самаркандская улица, 145', 41.119597, 69.0586519, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_436fb838-c146-4066-8f5e-d306eb2b47b3', 'Банкомат 1192', '1192', 'operational', 'atm', 'site_57bd021c-076f-40ea-a112-4b8d15c08f97', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6595b30f-53f0-435a-8b45-21525502e62b', 'OLMA-А-13', 'Ташкентская обл., г.Алмалык, Хожа Ахмад Яссавий МСГ, ул. Туркистон, д. 35', 40.8480696, 69.6014659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_df8134e7-7094-4ea1-9b2f-422c94f53501', 'Банкомат 1152', '1152', 'operational', 'atm', 'site_6595b30f-53f0-435a-8b45-21525502e62b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3ccf8135-8ac1-4ea1-82d3-acc16edb98a0', 'OLMA А-24', 'Ташкентская обл.,город. Ангрен, Мустакиллик МСГ, ул. Ахангаран, д.28', 41.0182995, 70.0978737, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7acac0b0-0c4e-4514-b9d3-3a481047e947', 'Банкомат 1168', '1168', 'operational', 'atm', 'site_3ccf8135-8ac1-4ea1-82d3-acc16edb98a0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e3c5d712-ad21-4834-aab1-4b670aed3827', 'Пункт выдачи Uzum Market', 'Фергана, улица Аль-Фергани, дом 62', 40.3844258, 71.7832354, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ae9b4b23-08ab-4d1a-98e4-53ee5ae2da75', 'Банкомат 1179', '1179', 'operational', 'atm', 'site_e3c5d712-ad21-4834-aab1-4b670aed3827', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6f106057-ebdd-4b55-b5dc-e34f91eccf46', 'Пункт выдачи Uzum Market', 'Фергана, Маргиланская улица, дом 50 А', 40.4488998, 71.7634977, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_72f28931-2753-4ca5-afa1-792ba20bde8c', 'Банкомат 1180', '1180', 'operational', 'atm', 'site_6f106057-ebdd-4b55-b5dc-e34f91eccf46', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d93362d9-27e3-4323-97a4-ba85a72c581c', 'Пункт выдачи Uzum Market', 'Ургенч, улица Узбекистан, дом 27, квартира 1-Б', 41.5535206, 60.6325273, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3c3e45c1-6381-4afd-8db9-af2dd21e22c9', 'Банкомат 1212', '1212', 'operational', 'atm', 'site_d93362d9-27e3-4323-97a4-ba85a72c581c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2bf35de7-67cb-4307-8042-32306605b5b6', 'Пункт выдачи Uzum Market', 'Ургенч, ул. Марифатчилар, дом 172', 41.5551477, 60.6041592, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2e9a6556-b1bb-487f-bf4c-256fef56e24b', 'Банкомат 1213', '1213', 'operational', 'atm', 'site_2bf35de7-67cb-4307-8042-32306605b5b6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fcc1d810-efbd-44f9-93e4-7f88341d8ff8', 'Пункт выдачи Uzum Market', 'Ургенч, улица Гурлан, дом 111 А', 41.5662697, 60.6150386, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8d0478c6-1940-46fc-9a4f-1a638bb20cd7', 'Банкомат 1214', '1214', 'operational', 'atm', 'site_fcc1d810-efbd-44f9-93e4-7f88341d8ff8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_244920c7-eb76-404f-b5a3-8dea1de569c3', 'Пункт выдачи Uzum Market', 'Ургенч, Жайхун улица, дом 34/1', 41.5504694, 60.6657656, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b49525b0-3de7-4657-840f-567249251e37', 'Банкомат 1215', '1215', 'operational', 'atm', 'site_244920c7-eb76-404f-b5a3-8dea1de569c3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_58809e4c-d75c-47e9-93b6-ab0a9260690d', 'Saltanat', 'Самаркандская обл.,г. Самарканд, ул. Ифтихор, 2Б', 39.6467232, 66.9599303, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bbb383ff-4d63-4952-b4d0-9c2a7d9ae95d', 'Банкомат 1326', '1326', 'operational', 'atm', 'site_58809e4c-d75c-47e9-93b6-ab0a9260690d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8bc902bc-dbd9-4c75-9180-80eef163b301', 'OLMA-С-3', 'Ташкентская обл., г. Чирчик, махалля Хумо, 8-кичик нохия', 41.4581653, 69.5641383, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f498ce0b-47e7-4974-bdab-3dca9a5032dd', 'Банкомат 1154', '1154', 'operational', 'atm', 'site_8bc902bc-dbd9-4c75-9180-80eef163b301', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bb877e78-004d-4775-9f62-711b08ff543a', 'OLMA С-10', 'Ташкентская обл., г. Чирчик, Куёш МСГ, ул. 1-кичик нохия, д.13-в', 41.4581653, 69.5641383, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d821f346-f1ea-4c8b-9b9a-aff01756462f', 'Банкомат 1156', '1156', 'operational', 'atm', 'site_bb877e78-004d-4775-9f62-711b08ff543a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5ee8b8b0-88ae-4dee-ade4-674fb52a8c65', 'Fix Price V026', 'Ташкентская область, г. Алмалык, ул. Эхтиром, д. 11', 40.8480696, 69.6014659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5af23aa7-f6a7-482d-bad7-e7f369e2e71f', 'Банкомат 1191', '1191', 'operational', 'atm', 'site_5ee8b8b0-88ae-4dee-ade4-674fb52a8c65', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2ab9c8ad-635a-4a5a-960a-84431676dc73', 'Dorixona diabet', 'Ташкентская область, г. Янгиюль, улица Камолот', 41.119597, 69.0586519, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_767ab3ca-0572-4454-a6ee-4b14e7894109', 'Банкомат 1250', '1250', 'operational', 'atm', 'site_2ab9c8ad-635a-4a5a-960a-84431676dc73', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_80b62518-58d8-4b24-87f9-52ad6f15cc17', 'ISHONCH(Olmaliq)', 'Ташкентская обл., г. Алмалык, ул. Амира Темура', 40.8480696, 69.6014659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f2a352e3-910a-46a5-b28f-bdc26d7d87a8', 'Банкомат 1242', '1242', 'operational', 'atm', 'site_80b62518-58d8-4b24-87f9-52ad6f15cc17', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bfc30674-2580-48b5-83ca-2be012b68d54', 'ISHONCH(Chiqchiq)', 'Ташкентская обл., г. Чирчик, МФЙ Навруз, 36-й махалля, ул. Заковат', 41.4581653, 69.5641383, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ec577dd3-8a03-4f37-98ba-13f260c30eb8', 'Банкомат 1244', '1244', 'operational', 'atm', 'site_bfc30674-2580-48b5-83ca-2be012b68d54', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8d56c1fd-b310-43ab-8e7f-9df61ae12e3f', 'Dorixona diabet', 'Ташкентская область, г. Янгиюль, улица Беруни', 41.119597, 69.0586519, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_50c29499-173c-469d-be27-ffa29b28cb00', 'Банкомат 1249', '1249', 'operational', 'atm', 'site_8d56c1fd-b310-43ab-8e7f-9df61ae12e3f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9079b678-4c71-42e2-bb4c-0f984b498370', 'Pharmacosmos C-75 Chirchiq-Makro', 'Ташкентская область, г. Чирчик, улица Юсупова', 41.4387851, 69.5483652, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_57045e02-e2d4-47e9-84cc-35ef31c77210', 'Банкомат 1303', '1303', 'operational', 'atm', 'site_9079b678-4c71-42e2-bb4c-0f984b498370', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_840240b2-7dc8-416a-95b9-32985bc39b8e', 'Pharmacosmos C-101 Чирчик октябрь', 'Ташкентская область, г. Чирчик, просп. Амира Темура, 138', 41.4387851, 69.5483652, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0d62ffc5-4f8a-4300-836c-814147aeca57', 'Банкомат 1306', '1306', 'operational', 'atm', 'site_840240b2-7dc8-416a-95b9-32985bc39b8e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f8dd699a-64ea-400d-a46c-61d268219aa8', 'ISHONCH(Kogon)', 'Бухарская область, г. Каган, улица Дустлик, 150', 39.7201425, 64.5435518, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ea53a19e-91bf-4466-b2c0-3533b7f6c5c1', 'Банкомат 1318', '1318', 'operational', 'atm', 'site_f8dd699a-64ea-400d-a46c-61d268219aa8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_14b7137c-3877-4077-bede-af7d1ff95e55', 'OLMA А-35', 'Ташкентская область,Нурафшан,махаллинский сход граждан Навруз, улица Ташкент Йули, 199', 41.027688, 69.3460572, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fee9383c-fd92-42dc-9a07-152918b35d49', 'Банкомат 1346', '1346', 'operational', 'atm', 'site_14b7137c-3877-4077-bede-af7d1ff95e55', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ba921901-7e0c-4421-9c1f-a2891770d897', 'OLMA А-29', 'Ташкентская область,Ахангаранский район,махаллинский сход граждан Ёнарик,улица Нуробод Кургони, 158', 41, 70, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_09b50257-83fd-4c22-9185-505f6778bd7d', 'Банкомат 1348', '1348', 'operational', 'atm', 'site_ba921901-7e0c-4421-9c1f-a2891770d897', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_937e969d-4a7b-44ef-a1cb-eb5edf2d02f6', 'Pharmacosmos C-61 ЧИРЧИК БАЗАР', 'Ташкентская область, г. Чирчик, ул. Юсупова, 22', 41.4387851, 69.5483652, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_066cb21e-6448-45bc-9f7a-5900dcc5f3f8', 'Банкомат 1302', '1302', 'operational', 'atm', 'site_937e969d-4a7b-44ef-a1cb-eb5edf2d02f6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8dc3efa3-f967-4be9-baad-7785e612fa71', 'OLMA С-14', 'Ташкентская обл., г. Чирчик, МСГ Мирзо-Улугбек, ул. Спортчилар, дом 42V', 41.4581653, 69.5641383, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ee9be542-3cde-492d-a6cb-8f65dad02441', 'Банкомат 1158', '1158', 'operational', 'atm', 'site_8dc3efa3-f967-4be9-baad-7785e612fa71', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f8127100-f12b-42d5-8c20-2c9835636c7f', 'Пункт выдачи Uzum Market', 'Фергана, улица Абдуллы Кадыри, дом 82', 40.3573837, 71.8500058, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1aa1fa71-dd1c-4e2d-9a24-c9e543b5830e', 'Банкомат 1352', '1352', 'operational', 'atm', 'site_f8127100-f12b-42d5-8c20-2c9835636c7f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_563f78e5-1f4b-4bf9-9d57-dc3f58c8d3f9', 'Пункт выдачи Uzum Market', 'Маргилан, улица Мустакиллик, дом 236', 40.4455822, 71.720927, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5be3916b-434c-4d7b-9f7f-6260845b8c1c', 'Банкомат 1360', '1360', 'operational', 'atm', 'site_563f78e5-1f4b-4bf9-9d57-dc3f58c8d3f9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1c368c59-2763-4c29-bcf1-874c24a92ddb', 'Пункт выдачи Uzum Market', 'г. Наманган, улица Алишера Навои, дом 8', 40.9936532, 71.6699213, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6edb87fc-e1ef-46d8-95ba-e56fc0626d14', 'Банкомат 1369', '1369', 'operational', 'atm', 'site_1c368c59-2763-4c29-bcf1-874c24a92ddb', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_45f7544f-18ca-456f-901a-e214de60b7b7', 'Пункт выдачи Uzum Market', 'г. Янгиюль, Самаркандская улица, дом 301', 41.1087076, 69.0486182, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_964be90d-32d6-4043-baac-41aeb867aafa', 'Банкомат 1386', '1386', 'operational', 'atm', 'site_45f7544f-18ca-456f-901a-e214de60b7b7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b630ddfa-c049-4c3b-af64-7e68b75b5d0c', 'Reikartz Hotel', 'г. Наманган, ул. Н. Намангани, 12', 41.2479705, 71.5426955, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0d7c14da-4d12-4f42-a807-a9b4596a8a3e', 'Банкомат 1418', '1418', 'operational', 'atm', 'site_b630ddfa-c049-4c3b-af64-7e68b75b5d0c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8f867a61-c78d-4ac4-a907-eaf8597add7b', 'Medilife qoqon kocha', 'г. Наманган, махаллинский сход граждан Марифат, улица Кукон, 82', 40.9861349, 71.6694555, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_89f9ea32-acff-4af9-a69c-76a3050054f8', 'Банкомат 1419', '1419', 'operational', 'atm', 'site_8f867a61-c78d-4ac4-a907-eaf8597add7b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_96a39076-a688-4a6e-814d-d98b84e6ffb1', 'Пункт выдачи Uzum Market', 'г. Карши, улица Ислама Каримова, дом 20', 38.8735913, 65.8065645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2dca5a55-d5e9-4c16-9ae1-14249a00f1f2', 'Банкомат 1431', '1431', 'operational', 'atm', 'site_96a39076-a688-4a6e-814d-d98b84e6ffb1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6fb04e6d-8d6b-4370-ba19-504c2da8ca16', 'Пункт выдачи Uzum Market', 'г. Термез, улица Навбахор, дом 29-Г', 37.2446767, 67.2849417, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_17ade80a-e7d9-42b7-8931-8ca3ab44d569', 'Банкомат 1434', '1434', 'operational', 'atm', 'site_6fb04e6d-8d6b-4370-ba19-504c2da8ca16', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_32dcb520-038b-401f-9302-358e57ec7980', 'Пункт выдачи Uzum Market', 'г. Навои, улица Кармана, дом 94', 40.1417756, 65.3642645, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_21d1b50c-0c96-4f96-a504-43235c955f65', 'Банкомат 1448', '1448', 'operational', 'atm', 'site_32dcb520-038b-401f-9302-358e57ec7980', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dfc0f45c-31ba-4db2-a0ef-c1fa3096f709', 'Тц Поворот Mobile House', 'Самаркандская обл., г. Самарканд, ул. Мирзо Улугбека, 105', 39.6467232, 66.9599303, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_86ca5b0d-1adf-473e-9f72-f5f3a7291ce6', 'Банкомат 1464', '1464', 'operational', 'atm', 'site_dfc0f45c-31ba-4db2-a0ef-c1fa3096f709', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2d2a1359-3b8a-4096-82fb-3261002e5e62', 'ISHONCH(Parkent)', 'Ташкентская обл., Паркентский район, МФЙ Ойбек, ул. Алишера Навои, дом 18-А', 41.3, 69.666667, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_41e83451-9c9f-46d7-82cc-e1afead30f3c', 'Банкомат 1248', '1248', 'operational', 'atm', 'site_2d2a1359-3b8a-4096-82fb-3261002e5e62', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3c021fb8-5f19-43ff-b3ca-9f9a046ad109', 'OLMA A-30', 'Ташкентская обл.,г.Ангрен, Дорилфунун МСГ ,квартал 5/5, дом 384', 41.0555281, 70.0864643, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7d8b7c63-f808-487c-ac1c-db71200756d2', 'Банкомат 1257', '1257', 'operational', 'atm', 'site_3c021fb8-5f19-43ff-b3ca-9f9a046ad109', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2f70dc2d-9648-4abe-a868-22605d8ad23f', 'OLMA А-34', 'Ташкентская обл.,г. Ангрен, МСГ Карвон, улица Абу Али Инб Сино, 14', 41.0555281, 70.0864643, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_78aba710-dc6e-4ff6-b648-c48692fc96ef', 'Банкомат 1347', '1347', 'operational', 'atm', 'site_2f70dc2d-9648-4abe-a868-22605d8ad23f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b7b3a87e-0bbf-45a7-9a6e-019c035d31aa', 'Пункт выдачи Uzum Market', 'г. Андижан, улица Узбекистан, дом 206', 40.7694608, 72.3634251, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b328a8b6-bcba-4543-94d5-3faa217d6a3b', 'Банкомат 1380', '1380', 'operational', 'atm', 'site_b7b3a87e-0bbf-45a7-9a6e-019c035d31aa', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_16df9653-7320-4e4d-b575-7efb0b746b8f', 'Пункт выдачи Uzum Market', 'г. Гулистан, проспект Узбекистан, дом 119', 40.4931588, 68.7782534, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_589943c1-20f9-4aef-b84b-2903610d9154', 'Банкомат 1424', '1424', 'operational', 'atm', 'site_16df9653-7320-4e4d-b575-7efb0b746b8f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d1ef8d04-fde7-4272-9bb8-807828b27a41', 'Пункт выдачи Uzum Market', 'г. Навои, улица Узбекистан, 12 дом', 40.1318243, 65.374681, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_68158803-4a4f-4f79-b940-1f2560cdf6ee', 'Банкомат 1445', '1445', 'operational', 'atm', 'site_d1ef8d04-fde7-4272-9bb8-807828b27a41', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cc521997-174f-482e-ac9f-c3300d0ec706', 'Пункт выдачи Uzum Market', 'г. Навои, проспект Галаба, дом 133', 40.1279956, 65.368068, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3130d11f-227f-4507-ab9e-0ffa93561b9f', 'Банкомат 1447', '1447', 'operational', 'atm', 'site_cc521997-174f-482e-ac9f-c3300d0ec706', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e8e02b4-9912-4902-96a4-4bb5f93bcd92', 'Пункт выдачи Uzum Market', 'г. Навои, проспект Ислама Каримова, дом 64', 40.0945777, 65.3789349, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d44d026f-4886-4535-a2ba-b96de695ef40', 'Банкомат 1449', '1449', 'operational', 'atm', 'site_2e8e02b4-9912-4902-96a4-4bb5f93bcd92', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7aff26e2-2c63-4fa8-a9ec-d4dab3c9d0f6', 'Пункт выдачи Uzum Market', 'г. Навои, улица Алишера Навои, дом 38В', 40.141571, 65.3461431, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c992f2df-c55c-4ab9-8766-58ef1985b890', 'Банкомат 1450', '1450', 'operational', 'atm', 'site_7aff26e2-2c63-4fa8-a9ec-d4dab3c9d0f6', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4b2815a2-5534-4c58-8d16-882d31bc3bf7', 'Пункт выдачи Uzum Market', 'г. Навои, проспект Галаба, дом 164В', 40.1279956, 65.368068, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4513662c-5fc6-4257-a83a-37572104df3d', 'Банкомат 1451', '1451', 'operational', 'atm', 'site_4b2815a2-5534-4c58-8d16-882d31bc3bf7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5f95301a-1a92-46c2-a4a6-60f8fa11b406', 'Memorial Hospital', 'Хорезмская область,г. Ургенч, парк культуры и отдыха имени Амира Темура', 41.5467109, 60.6028559, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_35772a1b-9c0a-4cb0-b3d2-dc805b3ab20a', 'Банкомат 1469', '1469', 'operational', 'atm', 'site_5f95301a-1a92-46c2-a4a6-60f8fa11b406', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d5f5b5c1-8a4f-4ce2-a2bd-01643ed00171', 'AYLIN MARKET', 'Хорезмская область, г. Ургенч, махаллинский сход граждан Машъал', 41.5467109, 60.6028559, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_65575cff-d402-416a-b0d4-3dd704587aa2', 'Банкомат 1472', '1472', 'operational', 'atm', 'site_d5f5b5c1-8a4f-4ce2-a2bd-01643ed00171', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0e2b9923-df81-48e3-ad29-aa0afca8cd62', 'Olma А-26', 'Ташкентская область, Ахангаранский район, махаллинский сход граждан Ёнарик, улица Нуробод Кургони', 41, 70, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_29712260-9eb6-4a5e-87c0-32d03605d947', 'Банкомат 1495', '1495', 'operational', 'atm', 'site_0e2b9923-df81-48e3-ad29-aa0afca8cd62', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_09b49344-2df8-4db8-af7f-328e5ea0b87f', 'Olma В -11', 'Ташкентская область, г. Бука, ул. Марказий, 4/1', 40.812743, 69.1937034, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_370ad5ef-4e9c-41f5-9703-0106ed0bc8bc', 'Банкомат 1496', '1496', 'operational', 'atm', 'site_09b49344-2df8-4db8-af7f-328e5ea0b87f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2894c727-b839-48fd-b4ea-e3e2a100bb73', 'ISHONCH(Buxoro)', 'Бухарская обл., г. Бухара, ул. Хавзи Нав, дом 21', 39.7732185, 64.4394507, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4b7112b7-0eec-4064-ace8-3292aea6a2c5', 'Банкомат 1505', '1505', 'operational', 'atm', 'site_2894c727-b839-48fd-b4ea-e3e2a100bb73', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4cf34be6-9986-475b-b428-c81728e19691', 'Namangan zargarlik klasteri', 'г. Наманган, махаллинский сход граждан Юкори Гирвон, улица Хамид Олимжон, 153', 41.0078336, 71.6098791, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_be326ee4-b7cb-47d1-8715-5aa709ce23b1', 'Банкомат 1512', '1512', 'operational', 'atm', 'site_4cf34be6-9986-475b-b428-c81728e19691', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c77ed1dd-f144-4043-b152-61907f35ec1e', 'Sobit Ota Stamotologiya', 'г. Наманган, махаллинский сход граждан Озод, ул. улица Намангансай', 41.0062921, 71.6833584, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5eca4950-c2af-4fb1-8102-3c07abaac8c4', 'Банкомат 1513', '1513', 'operational', 'atm', 'site_c77ed1dd-f144-4043-b152-61907f35ec1e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_add5b6f2-3d5a-49b7-ad4a-be3b567d8978', 'Best pharm dorixona', 'г. Наманган, махаллинский сход граждан Давлатобод, ул. Кукумбой, 131', 40.9956405, 71.6238254, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3f90423f-0dcd-48e1-b506-1f4b506e53e2', 'Банкомат 1520', '1520', 'operational', 'atm', 'site_add5b6f2-3d5a-49b7-ad4a-be3b567d8978', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2b3f4be2-39c4-4c43-9acc-1ec44d892aa1', 'Korzinka Каган', 'Бухарская обл., г Каган, махаллинский сход граждан Мирзо Улугбек, ул. Дустлик, 171', 39.7201425, 64.5435518, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4a26c75a-335f-4b28-b020-9b913bb220b6', 'Банкомат 1531', '1531', 'operational', 'atm', 'site_2b3f4be2-39c4-4c43-9acc-1ec44d892aa1', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b62ec8e8-d452-4dd3-80bd-9fd484178e16', 'Лукойл', 'Ташкентская обл., г. Янгиюль, ул.Дустлик, МФЙ Нуробод, дом 85', 41.119597, 69.0586519, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c9ad5e1d-3b9c-4a4a-8650-567b605f118b', 'Банкомат 1546', '1546', 'operational', 'atm', 'site_b62ec8e8-d452-4dd3-80bd-9fd484178e16', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6d1e6b0f-d0be-4a50-9a57-cef6726a9148', 'Лукойл', 'Ташкентская обл., г. Янгиюль, ул.Дустлик, МФЙ Нуробод, дом 58', 41.119597, 69.0586519, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5f5461c8-46b6-43cc-93f8-e001aae533c3', 'Банкомат 1547', '1547', 'operational', 'atm', 'site_6d1e6b0f-d0be-4a50-9a57-cef6726a9148', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_24332a29-3e4d-4e48-ab4c-8124dfb01d8d', 'Единое окно', 'Ташкентская обл., Город Бекабад,.Улица Гулам 365', 40.2320291, 69.2531407, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8837e4f2-d03c-4140-ab64-7e0ad52a09a3', 'Банкомат 1589', '1589', 'operational', 'atm', 'site_24332a29-3e4d-4e48-ab4c-8124dfb01d8d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7e50d8f0-d50a-474b-99cf-1b13756f7af9', 'Единое окно', 'Ташкентская обл., Ахангаранский район, улица Файз, 7А', 41, 70, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f62acb97-c13a-481c-90eb-71b28071b7ed', 'Банкомат 1599', '1599', 'operational', 'atm', 'site_7e50d8f0-d50a-474b-99cf-1b13756f7af9', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b00c5aff-153c-45b6-b8ef-d2668c9eb208', 'Единое окно', 'Ташкентская обл., Паркентский район, А.Улица Навои', 41.3, 69.666667, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_21592d2a-54c6-4e97-bae6-c33d866d9305', 'Банкомат 1602', '1602', 'operational', 'atm', 'site_b00c5aff-153c-45b6-b8ef-d2668c9eb208', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1bcc6180-6db9-4c32-9bf1-6769e27a58b6', 'Пункт выдачи Uzum Market', 'Ташкент, Шайхонтохуркский район улица Зульфияханум, дом 18', 41.3446895, 69.1968332, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0010f713-3c35-44b8-8bc8-091b61d757f6', 'Банкомат 1135', '1135', 'operational', 'atm', 'site_1bcc6180-6db9-4c32-9bf1-6769e27a58b6', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2ec82866-288b-4860-a328-65fe00e8240d', 'Белорусская косметика', 'г. Алмалык, ул. Фурката, 1', 40.8480696, 69.6014659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c5464a0e-ac88-4cb4-92f4-dd213d235eda', 'Банкомат 1526', '1526', 'operational', 'atm', 'site_2ec82866-288b-4860-a328-65fe00e8240d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — точка найдена по названию/району, а не точному адресу, уточните вручную', now());

COMMIT;