-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов/картоматов бригады А.
-- 1) Сначала выполните этот запрос и найдите id вашей организации:
--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;
-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.
BEGIN;

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_02854cca-34fb-4d46-a605-13670b602756', 'Бц Platform', 'г. Ташкент, Мирабадский район, ул. Туркистан, 12А', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7ee3b091-0f9a-4908-9430-b1834be28c0d', 'Банкомат 1004', '1004', 'operational', 'atm', 'site_02854cca-34fb-4d46-a605-13670b602756', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f809ffe9-9ce0-426e-aa93-06cacbca2cda', 'Пункт выдачи Uzum Market', 'г. Ташкент, Мирабадский район, улица Мирабад, д. 27/11', 41.2939738, 69.2699995, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a850646c-0b3c-4aac-ba5a-c58733154bfa', 'Банкомат 1005', '1005', 'operational', 'atm', 'site_f809ffe9-9ce0-426e-aa93-06cacbca2cda', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f6280620-9e5d-4f8f-ab9d-4b24a00918b5', 'Пункт выдачи Uzum Market', 'г. Ташкент, Чиланзарский район, 1-квартал, д. 14', 41.2878734, 69.2285121, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a4ae26cc-ae2d-4388-89de-b2e799759b4f', 'Банкомат 1007', '1007', 'operational', 'atm', 'site_f6280620-9e5d-4f8f-ab9d-4b24a00918b5', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c467b1a6-de5b-4f77-af7f-bd39b08d6bdd', 'Пункт выдачи Uzum Market', 'г. Ташкент, Учтепинский район, массив Чиланзар, квартал Г9а, д. 3', 41.2737958, 69.1869906, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_74da39cd-7bcb-424e-a2d0-853e8bccd210', 'Банкомат 1011', '1011', 'operational', 'atm', 'site_c467b1a6-de5b-4f77-af7f-bd39b08d6bdd', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_408aac46-2f9a-4761-a75e-8b09b01462ee', 'БЦ Uzum Market', 'г.Ташкент, Яккасарайский район, ул. Кичик Бешагач, 132А', 41.2786905, 69.2706676, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_875be527-6c52-48d1-8743-273124f55724', 'Банкомат 1012', '1012', 'operational', 'atm', 'site_408aac46-2f9a-4761-a75e-8b09b01462ee', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a1be3e84-461a-48e6-be63-a8fc860e42de', 'ТЦ Seoul Mun', 'г. Ташкент, Шайхантохурский район, ул.Сеульская 7/2', 41.2999119, 69.2307137, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d7f1c650-3e23-439b-bd37-b06f1a7ff417', 'Банкомат 1014', '1014', 'operational', 'atm', 'site_a1be3e84-461a-48e6-be63-a8fc860e42de', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8737f230-8ddf-4d8a-81d2-5c7c8b0bf3c9', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яккасарайский район, ул. Кичик Бешагач, д. 70', 41.2778721, 69.27288, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_42876b49-6a33-4747-8ba6-3acdbf827a6a', 'Банкомат 1016', '1016', 'operational', 'atm', 'site_8737f230-8ddf-4d8a-81d2-5c7c8b0bf3c9', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ad7aa3e7-69f7-42fd-840a-546508fc523e', 'ТЦ Vega Centr', 'г. Ташкент, Яккасарайский район, ул. Шота Руставели, 150', 41.2781735, 69.2453777, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8a6d2d0d-a307-46f6-bab8-25f3f4f48e5a', 'Банкомат 1018', '1018', 'operational', 'atm', 'site_ad7aa3e7-69f7-42fd-840a-546508fc523e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9f567667-e964-4fb4-ad0b-bc204624b4b6', 'Автовокзал Ташкент', 'г. Ташкент, Чиланзарский район, проспект Бунёдкор, 7, метро Алмазар', 41.286704, 69.2153405, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e79ec874-18a3-49f3-a437-c7b6f76d2766', 'Банкомат 1020', '1020', 'operational', 'atm', 'site_9f567667-e964-4fb4-ad0b-bc204624b4b6', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bc6a8bbe-7320-4a4c-96a1-d1edb158222e', 'Humo Arena', 'г. Ташкент, Алмазарский район, ул. Бешёгоч, 28Б', 41.3079595, 69.2519354, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fc1257bf-4240-4ee0-acdc-2fa035eb30e9', 'Банкомат 1023', '1023', 'operational', 'atm', 'site_bc6a8bbe-7320-4a4c-96a1-d1edb158222e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_83057f69-573f-453f-8665-c03636231390', 'Станция метро Мирза Улугбек', 'г. Ташкент, Чиланзарский район, улица Чапаната', 41.2897385, 69.2013333, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_14ec871c-659f-4f4d-b131-48bfa045c16e', 'Банкомат 1032', '1032', 'operational', 'atm', 'site_83057f69-573f-453f-8665-c03636231390', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_894dec89-0264-4dfe-94d7-fea1930ce7e0', 'Алайский базар', 'г. Ташкент, ​Мирабадский район, проспект Амира Темура, 40н', 41.305855, 69.282424, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cb2c005b-a3b8-4787-b584-9c5aabf1ee41', 'Банкомат 1042', '1042', 'operational', 'atm', 'site_894dec89-0264-4dfe-94d7-fea1930ce7e0', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4f26f899-d909-488e-aff9-751d14731eca', 'ТЦ Oazis City Centre', 'г. Ташкент, Учтепинский район, ул. Лутфи, 21А', 41.2858778, 69.1859597, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cfa69c53-97a9-4ef6-a8bf-655b70309a80', 'Банкомат 1043', '1043', 'operational', 'atm', 'site_4f26f899-d909-488e-aff9-751d14731eca', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e3bb4a44-37ec-4241-9176-4f6dfb47d27a', 'OLMA', 'г. Ташкент, Яккасарайский район, Бобур МФЙ, ул. Бобур, д. 73б', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a7ab8cc6-e163-492d-b142-a447d06f8533', 'Банкомат 1046', '1046', 'operational', 'atm', 'site_e3bb4a44-37ec-4241-9176-4f6dfb47d27a', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_315aec77-6369-4749-b74f-afb4b01f88df', 'ТЦ Parus', 'г. Ташкент, Чиланзарский район, ул. Катартал, 60 А/1', 41.2712769, 69.1923531, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c52c85a0-0978-45a6-844d-bae20cc690a1', 'Банкомат 1048', '1048', 'operational', 'atm', 'site_315aec77-6369-4749-b74f-afb4b01f88df', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8802a0a8-37ba-420a-bfe1-be567a3531f0', 'ТЦ Globus Mall', 'г. Ташкент, Учтепинский район, ул. Заргарлик, 10А', 41.2739836, 69.1877427, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d20fbe13-91d0-4ba1-b189-2faf7de22ce6', 'Банкомат 1049', '1049', 'operational', 'atm', 'site_8802a0a8-37ba-420a-bfe1-be567a3531f0', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_02ba3762-7c11-46f4-af8d-f925b09d5125', 'ТЦ «ДЕПО Mall»', 'г. Ташкент, Учтепинский район, ул. Лутфи, 34', 41.2865776, 69.1859122, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c64840c2-ec18-46f9-8c39-2138d74de5a2', 'Банкомат 1050', '1050', 'operational', 'atm', 'site_02ba3762-7c11-46f4-af8d-f925b09d5125', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7dc4dc46-36ae-40a7-b85e-ba3808c125ce', 'Станция метро Алмазар', 'г. Ташкент, Чиланзарский район, махаллинский сход граждан Яккабог', 41.2544056, 69.1970624, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b35f7219-e923-4a06-ba88-b575089a26e0', 'Банкомат 1051', '1051', 'operational', 'atm', 'site_7dc4dc46-36ae-40a7-b85e-ba3808c125ce', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7f043779-56ef-4e04-9ecd-708180e5f998', 'ТЦ Chilonzor', 'г. Ташкент, Чиланзарский район, ул. Чиланзар, 55', 41.2894928, 69.2337076, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_eed2093d-5d89-4564-babf-370a80566bc3', 'Банкомат 1052', '1052', 'operational', 'atm', 'site_7f043779-56ef-4e04-9ecd-708180e5f998', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ea4d3bdb-444d-48ac-b183-849630aa846c', 'Станция метро Чиланзар', 'г. Ташкент, Чиланзарский район, проспект Бунёдкор (дублёр)', 41.2567657, 69.1928161, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_decbf2d1-cb83-4b4a-bc7f-1556c0cf5917', 'Банкомат 1054', '1054', 'operational', 'atm', 'site_ea4d3bdb-444d-48ac-b183-849630aa846c', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aba217dc-efd0-4496-b419-a9e1b5bca74e', 'Станция метро Новза', 'г. Ташкент, Чиланзарский район, улица Мукими', 41.2952457, 69.2184807, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_adb44f03-1b54-4a10-8a96-064d5e9525d4', 'Банкомат 1055', '1055', 'operational', 'atm', 'site_aba217dc-efd0-4496-b419-a9e1b5bca74e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_923877b7-b273-4aac-9178-2deca30c8a18', 'Станция метро Национальный парк', 'г. Ташкент, Шайхонтохурский район, проспект Бунёдкор', 41.3035238, 69.2349204, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7976e9b6-61ad-4176-aa34-e7a8f586ae76', 'Банкомат 1063', '1063', 'operational', 'atm', 'site_923877b7-b273-4aac-9178-2deca30c8a18', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_449c6e3a-c64a-441f-afd1-14ff8662aa7c', 'OLMA', 'г. Ташкент, Яккасарайский район, махалля Армугон, ул. Кичик Халка Йули', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e6f4840a-1604-4aff-836a-3be43a26608b', 'Банкомат 1065', '1065', 'operational', 'atm', 'site_449c6e3a-c64a-441f-afd1-14ff8662aa7c', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0172709e-1a75-463f-9772-56a9335295a1', 'OLMA', 'г. Ташкент, Чиланзарский район, Бахористон МСГ, м. Гулистан, д.56а', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f8312da7-cb9d-4498-9e0b-9c43193b2d04', 'Банкомат 1069', '1069', 'operational', 'atm', 'site_0172709e-1a75-463f-9772-56a9335295a1', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0b6f711-b790-47d3-9b9e-2816c751909e', 'Shox Med', 'г. Ташкент, Яккасарайский район, Малая кольцевая дорога, 70', 41.262969, 69.2334994, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_998b42f9-b478-4b7b-94b3-2bce889c8556', 'Банкомат 1070', '1070', 'operational', 'atm', 'site_b0b6f711-b790-47d3-9b9e-2816c751909e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e5aaadce-41bd-44b7-b6a7-9ca99f3b7d68', 'OLMA', 'г. Ташкент, Учтепинский район, махалля Тепакурган, 11-квартал, д. 59-А', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d1196b40-eee3-4fc8-8b78-bd353e7089ef', 'Банкомат 1071', '1071', 'operational', 'atm', 'site_e5aaadce-41bd-44b7-b6a7-9ca99f3b7d68', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_12977bb2-72cf-478c-b15d-b1dae994b3db', 'OLMA', 'г. Ташкент, Чиланзарский р-н, махалли Днер, 8-квартал, ул. Катартал', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4bcd787a-b8d1-41dd-a9b5-3eb93727ac3a', 'Банкомат 1073', '1073', 'operational', 'atm', 'site_12977bb2-72cf-478c-b15d-b1dae994b3db', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_da52e1fd-4643-49c9-9335-ff293ada7594', 'OLMA', 'г. Ташкент, Учтепинский район, махалля Янгиюль, 31-квартал, д. 45-Д', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_79cbceee-2852-49fa-ac3d-0d8601bea004', 'Банкомат 1074', '1074', 'operational', 'atm', 'site_da52e1fd-4643-49c9-9335-ff293ada7594', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_08660da3-7bb0-4281-8f88-8337570b8644', 'OLMA', 'г. Ташкент, Чиланзарский район, м.19, д. 33/1', 41.2687144, 69.2128433, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_77d77454-cddf-4613-be61-27df3048119d', 'Банкомат 1075', '1075', 'operational', 'atm', 'site_08660da3-7bb0-4281-8f88-8337570b8644', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5cacc893-fb59-4f66-84e0-1d218896df24', 'OLMA', 'г. Ташкент, Учтепинский район, 30 квартал, дом 25А', 41.2808671, 69.1728111, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c794ddc1-dbe1-488b-8143-2bb7d672de4e', 'Банкомат 1076', '1076', 'operational', 'atm', 'site_5cacc893-fb59-4f66-84e0-1d218896df24', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_47dc5ca1-6251-4450-82c4-fb964bcccba1', 'OLMA М-147', 'Ташкент, Учтепинский р-н, МСГ Бирлик,21-квартал, ул. Фархадская,дом 7', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff04e15d-930a-47d3-bbf0-5f84ef4e8028', 'Банкомат 1077', '1077', 'operational', 'atm', 'site_47dc5ca1-6251-4450-82c4-fb964bcccba1', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7966e26c-a96c-4d26-afd1-78cfdc4097fc', 'Monday royal Hotel', 'г. Ташкент, Юнусабадский район, Киёт жилмассив (Ц-5), 81а​,', 41.3238573, 69.2760968, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_abbd8f62-e801-4b41-9456-64877ded901a', 'Банкомат 1078', '1078', 'operational', 'atm', 'site_7966e26c-a96c-4d26-afd1-78cfdc4097fc', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f138ce21-2a1d-4482-8c30-3d647844abae', 'Courtyard by Marriott Tashkent', 'г. Ташкент, Яккасарайский район, ул. Кичик Бешагач, 128', 41.2815526, 69.2677262, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_703b5a25-f635-480c-a032-924b895e70fe', 'Банкомат 1079', '1079', 'operational', 'atm', 'site_f138ce21-2a1d-4482-8c30-3d647844abae', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_31feacb7-6cd6-4d11-9b21-8dda801815d8', 'OLMA', 'г. Ташкент, Чиланзарский район, 7-й квартал, 58, массив Чиланзор,', 41.2874791, 69.2261718, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1012d3e6-56cf-4e6b-9a55-5c272c08018c', 'Банкомат 1088', '1088', 'operational', 'atm', 'site_31feacb7-6cd6-4d11-9b21-8dda801815d8', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_86c3db2f-814b-4009-830d-5579117b1ba6', 'OLMA', 'г. Ташкент, Чиланзарский район, махалля Лутфий, ул. Богистон, д. 111', 41.2972681, 69.200372, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b0df9b2f-2c1e-43dd-944f-3ca47af284fd', 'Банкомат 1096', '1096', 'operational', 'atm', 'site_86c3db2f-814b-4009-830d-5579117b1ba6', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c7da7259-aa21-4722-a53a-07f5f400d2ba', 'Пункт выдачи Uzum Market', 'г. Ташкент, Юнусабадский район, улица Богишамол, дом 3 (ТУИТ)', 41.3546958, 69.3340005, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_89d1289e-c3d7-4bcf-8930-66fd38832acd', 'Банкомат 1097', '1097', 'operational', 'atm', 'site_c7da7259-aa21-4722-a53a-07f5f400d2ba', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1e88af28-463a-455e-9dec-b6919feb821a', 'OLMA', 'г. Ташкент, Яккасарайский район, ул Кушбеги, д 11', 41.2735387, 69.2451952, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b94cc7ab-e161-4d84-8ad9-2bae73245c1e', 'Банкомат 1107', '1107', 'operational', 'atm', 'site_1e88af28-463a-455e-9dec-b6919feb821a', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d78e9562-a15e-4441-a397-1ba09129b73b', 'OLMA', 'г. Ташкент, Чиланзарский район, махалля Шарк, массив Кизил Шарк, д. 32', 41.2661267, 69.1655858, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7bbecf8b-c059-4005-ace5-9ba3fa44ac77', 'Банкомат 1112', '1112', 'operational', 'atm', 'site_d78e9562-a15e-4441-a397-1ba09129b73b', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2b90b5c3-f347-4508-9bb9-73d98ba7cf30', 'Станция метро Космонавтов', 'г. Ташкент, Мирабадский район, улица Афросиаб', 41.2994717, 69.2718483, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b06bd694-fcb2-4bfa-a58b-b9ccedb3d980', 'Банкомат 1114', '1114', 'operational', 'atm', 'site_2b90b5c3-f347-4508-9bb9-73d98ba7cf30', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ff61b30f-cadc-42ae-9acb-bead4ac7da34', 'Станция метро Бадамзар', 'г. Ташкент, Юнусабадский район, улица Бадамзар', 41.3415056, 69.2916249, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_94b01b91-add2-4873-ad0a-6db486031d6b', 'Банкомат 1124', '1124', 'operational', 'atm', 'site_ff61b30f-cadc-42ae-9acb-bead4ac7da34', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_96de091d-6cb3-4db0-a193-191fc5aa7d59', 'Станция метро Минор', 'г. Ташкент, Юнусабадский район, проспект Амира Темура', 41.3675226, 69.2856628, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_86fee6e0-d8fe-444d-853e-b1c048866242', 'Банкомат 1125', '1125', 'operational', 'atm', 'site_96de091d-6cb3-4db0-a193-191fc5aa7d59', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_75ca24f4-8de6-40d4-8e67-c595726c0553', 'Станция метро Сквер Амира Тимура', 'г. Ташкент, Юнусабадский район, проспект Мустакиллик', 41.3132242, 69.2777656, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1e8cf008-bd6c-4edb-a19a-748d8187bea7', 'Банкомат 1127', '1127', 'operational', 'atm', 'site_75ca24f4-8de6-40d4-8e67-c595726c0553', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8b1a090e-9b88-41f5-86b1-db5d5215e4f7', 'Shoxjaxon Hotel', 'г. Ташкент, Яккасарайский район, ул. Шох-Жахон, 15А', 41.2845603, 69.2529828, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_372f99eb-65cc-46fe-be7f-63818dc281b1', 'Банкомат 1132', '1132', 'operational', 'atm', 'site_8b1a090e-9b88-41f5-86b1-db5d5215e4f7', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d544ae71-1931-43fc-985b-94df4a82168c', 'Пункт выдачи Uzum Market', 'г. Ташкент, Чиланзарский район 17 квартал, дом 37', 41.2873414, 69.2026143, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b5c9eb23-6913-4c87-9659-621cd62d96b0', 'Банкомат 1137', '1137', 'operational', 'atm', 'site_d544ae71-1931-43fc-985b-94df4a82168c', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fa442665-d58f-4132-be58-580ac4c143d6', 'Пункт выдачи Uzum Market', 'г. Ташкент, Учтепинский район, улица Кукча Дарвоза, дом 581', 41.3097243, 69.1693062, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e7fe8009-d16c-465e-9541-1488c417eda2', 'Банкомат 1140', '1140', 'operational', 'atm', 'site_fa442665-d58f-4132-be58-580ac4c143d6', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bb8dd0b1-21d8-4ccd-847c-907225107dfd', 'OLMA', 'г. Ташкент, Учтепинский район, махалля Богобод, 15-квартал, 25-а', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a13b2d2a-266e-44b2-b2fd-f271839ea48d', 'Банкомат 1142', '1142', 'operational', 'atm', 'site_bb8dd0b1-21d8-4ccd-847c-907225107dfd', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4c026251-79b1-4a65-b15d-954eaa75becf', 'Станция метро Мингурюк', 'г. Ташкент, Мирабадский район, улица Шахрисабз', 41.2965456, 69.2699053, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8c01800a-a3a2-4601-8596-d478c4145800', 'Банкомат 1146', '1146', 'operational', 'atm', 'site_4c026251-79b1-4a65-b15d-954eaa75becf', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f090ce2e-61ee-4d4f-9442-a7cfdd89bdff', 'Станция метро Ташкент', 'г. Ташкент, Мирабадский район, улица Туркистан', 41.2929342, 69.2879876, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f5c80c66-cd7c-47ff-8452-09872a684aac', 'Банкомат 1148', '1148', 'operational', 'atm', 'site_f090ce2e-61ee-4d4f-9442-a7cfdd89bdff', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b7ab5c8a-fd2b-4ef4-8a96-1ecb064deabb', 'Grand Shosh Hotel', 'Ташкент, Яккасарайский район, улица Кушбеги, 30Б', 41.2664054, 69.2462314, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_535515c6-f81f-4f57-a263-d5a984896b36', 'Банкомат 1162', '1162', 'operational', 'atm', 'site_b7ab5c8a-fd2b-4ef4-8a96-1ecb064deabb', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_bd34c93f-0105-4940-9717-84b44d68ad33', 'Faxr Miliy Taomalri', 'Ташкент, Чиланзарский район, просп. Бунёдкор, 6a', 41.2374754, 69.1665773, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_49c9e2c2-9751-4604-89c6-7758ba4aab15', 'Банкомат 1175', '1175', 'operational', 'atm', 'site_bd34c93f-0105-4940-9717-84b44d68ad33', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f6a804e5-2019-4b77-90d4-14a51406ce6e', 'Fix Price V007', 'Ташкент, Мирабадский район, ул. Авлие-Ота, д. 11, рядом с рынком "Миробод"', 41.2910693, 69.2774547, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a52083d7-564b-4c9e-881f-b49c28c5efd4', 'Банкомат 1185', '1185', 'operational', 'atm', 'site_f6a804e5-2019-4b77-90d4-14a51406ce6e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ec1913ba-56e0-4c47-81db-2c2bda9188cc', 'Fix Price V009', 'Ташкент, Яккасарайский район, ул. Мукимий, д. 1а', 41.2702043, 69.2611374, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_678f2d25-d20b-4a28-8ae3-b8f96209b3a8', 'Банкомат 1186', '1186', 'operational', 'atm', 'site_ec1913ba-56e0-4c47-81db-2c2bda9188cc', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2518a5b0-95be-48cf-87db-8e50c90234ad', 'Fix Price V018', 'Ташкент, Яккасарайский район, микрорайон Кушбеги, ул. Кушбеги, д. 30Б', 41.2821266, 69.2210888, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_06c8fc3e-27c6-489a-a13c-f4a4753512f2', 'Банкомат 1189', '1189', 'operational', 'atm', 'site_2518a5b0-95be-48cf-87db-8e50c90234ad', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_19498b45-cb1b-4f77-9162-c736786dfa65', 'Fix Price V020', 'Ташкент, Учтепинский район, квартал Чиланзар Г9А, ул. Фархадская, 6а/4', 41.2896487, 69.1942401, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d94a1c16-6d37-4cd6-afc9-45942050681c', 'Банкомат 1190', '1190', 'operational', 'atm', 'site_19498b45-cb1b-4f77-9162-c736786dfa65', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a4742c73-b311-46ff-ba6e-701f0ce26ca8', 'Пункт выдачи Uzum Market', 'Ташкент, Чиланзарский район 20 квартал, д.23', 41.2870692, 69.2014564, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8cf2664c-c1ef-4517-b83a-d115ceffe62c', 'Банкомат 1201', '1201', 'operational', 'atm', 'site_a4742c73-b311-46ff-ba6e-701f0ce26ca8', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_26a996da-08bf-47d4-a37a-47502970573e', 'Пункт выдачи Uzum Market', 'Ташкент, Юнусабадский район, массив Кашгар, д.1', 41.3217161, 69.2779808, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_aaea4ed9-1253-438d-aa9f-96ca7e313547', 'Банкомат 1202', '1202', 'operational', 'atm', 'site_26a996da-08bf-47d4-a37a-47502970573e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b87feadf-c23b-43ff-9e0b-075efb9bf2be', 'Пункт выдачи Uzum Market', 'Ташкент, Учтепинский район, 14 квартал , д.11', 41.2785631, 69.1760397, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2f698a52-8d85-4627-9270-ca9949da015d', 'Банкомат 1204', '1204', 'operational', 'atm', 'site_b87feadf-c23b-43ff-9e0b-075efb9bf2be', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e53dca25-2c27-4da3-8b3f-34caee1421ca', 'Единое окно', 'г. Ташкент.. Яккасарайский район, улица Шота Руставели, дом 85', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_108499a2-d67e-44db-a154-e4fb7eea3baa', 'Банкомат 1205', '1205', 'operational', 'atm', 'site_e53dca25-2c27-4da3-8b3f-34caee1421ca', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3ca6df72-f169-49ca-a3c7-ecc749e35994', 'Пункт выдачи Uzum Market', 'Ташкент, Учтепинский район, улица Фазылтепа, д. 17А', 41.2981449, 69.1903572, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9c4f9ede-7018-4b45-8ae2-c12f255cad29', 'Банкомат 1206', '1206', 'operational', 'atm', 'site_3ca6df72-f169-49ca-a3c7-ecc749e35994', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8f1a68ec-dfd0-431f-9ed3-b026b0cdc2e7', 'ТЦ Scopus Mall', 'Ташкент, Учтепинский район, ул. Фархадская, Г30 блок 15', 41.2862938, 69.1861875, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ed506dcc-ce85-4676-8be9-2647913f3536', 'Банкомат 1207', '1207', 'operational', 'atm', 'site_8f1a68ec-dfd0-431f-9ed3-b026b0cdc2e7', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_527673a6-b4d9-45c4-abcd-beef20a42dbe', 'Корзинка Шедевр', 'Ташкент, Юнусабадский район, ул. Алишера Навои, 11В', 41.3199609, 69.2673277, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_82563f7c-880b-4e21-8585-838b307249ec', 'Банкомат 1208', '1208', 'operational', 'atm', 'site_527673a6-b4d9-45c4-abcd-beef20a42dbe', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7a0c7ef6-acd5-49b1-a1d5-08dba67dd599', 'Корзинка Кохинур', 'Ташкент, Чиланзарский район, массив Чиланзар, 10-й квартал массива Чиланзар, 20/1', 41.267626, 69.183007, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5736f590-ecc7-4b41-8e67-14edfe5f1924', 'Банкомат 1209', '1209', 'operational', 'atm', 'site_7a0c7ef6-acd5-49b1-a1d5-08dba67dd599', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_71a9494f-1b47-4eba-848b-9b454d7918b8', 'OXY Med (ЦУМ)', 'Ташкент, Мирабадский р-н, ул. Буюк Турон, 73', 41.3074157, 69.2689136, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_3332cd10-63be-4bdd-a157-1f22a14706d6', 'Банкомат 1228', '1228', 'operational', 'atm', 'site_71a9494f-1b47-4eba-848b-9b454d7918b8', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8cc95c88-b26f-4d0b-adc2-77b68cd0b261', 'Olma', 'г.Ташкент, Юнусабадский район, МСГ Буйюк Турон, ул. Ниёзбек йули,дом 2', 41.288597, 69.2065227, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_389f1eef-8da5-4ce2-ad62-f0d55f11042e', 'Банкомат 1239', '1239', 'operational', 'atm', 'site_8cc95c88-b26f-4d0b-adc2-77b68cd0b261', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_59d645ca-e8e0-4ad1-b797-c6644931e955', 'Мирабадский рынок', 'г. Ташкент, Мирабадский район, ул. Мирабад, 43, метро «Айбек»', 41.2907237, 69.2742065, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2740aead-8d38-40ec-adee-a66a303b3a6c', 'Банкомат 1252', '1252', 'operational', 'atm', 'site_59d645ca-e8e0-4ad1-b797-c6644931e955', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_aa0ceae1-17f8-4e4f-8612-0dd804a56bb6', 'Мирабадский рынок', 'г. Ташкент, Мирабадский район, ул. Мирабад, 43, метро «Айбек»', 41.2907237, 69.2742065, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ac8b83b3-1874-4148-84e0-93baf80c870a', 'Банкомат 1253', '1253', 'operational', 'atm', 'site_aa0ceae1-17f8-4e4f-8612-0dd804a56bb6', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c5463afc-24f4-4427-ad7d-321efb693a44', 'Бизнесс-Центр Gross', 'Ташкент, Мирабадский район, улица Тараса Шевченко, 21А', 41.2971168, 69.2813743, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2b6101b6-982e-4744-aafb-2a9367c87219', 'Банкомат 1266', '1266', 'operational', 'atm', 'site_c5463afc-24f4-4427-ad7d-321efb693a44', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a05ffc37-f4a4-4804-b055-f732438cc130', 'Korzinka Октепа Чилинзор', 'г. Ташкент, Чиланзарский район, 7 квартал, махалля «Октепа», 28', 41.2658334, 69.1906894, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ce0db92d-8449-4682-85be-da39fea374e8', 'Банкомат 1268', '1268', 'operational', 'atm', 'site_a05ffc37-f4a4-4804-b055-f732438cc130', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_656fbe94-f6e0-41d3-9cd0-9490824429eb', 'Pharmacosmos C-07 БИСЁР', 'Ташкент, улица Ковунчи', 41.2597977, 69.1563533, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ca86e6c1-6fbe-4ba0-a3d0-6734a320f42f', 'Банкомат 1270', '1270', 'operational', 'atm', 'site_656fbe94-f6e0-41d3-9cd0-9490824429eb', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d0046909-49eb-4483-909b-090799a58e1c', 'Pharmacosmos C-13 УЧТЕПА', 'Ташкент, Учтепинский район, ул. Замахшари, 2', 41.30137, 69.1741284, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_983040e9-f669-4bf7-9c46-a66b6b932979', 'Банкомат 1271', '1271', 'operational', 'atm', 'site_d0046909-49eb-4483-909b-090799a58e1c', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c4277271-05b3-4505-a1aa-443f795f84a5', 'Pharmacosmos C-41 Эхинацея', 'Ташкент, Учтепинский район, ул. Кукча Дарвоза, 568', 41.3123906, 69.1794593, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ec87dc69-128f-4238-abd0-a113a34500b5', 'Банкомат 1275', '1275', 'operational', 'atm', 'site_c4277271-05b3-4505-a1aa-443f795f84a5', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_24d6b683-3934-45ae-a706-d475d1efa619', 'Pharmacosmos C-47 ОНА БОЛА', 'Ташкент, Алмазарский район, ул. Бешкайрагач, 286', 41.362149, 69.2266019, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_39a64c17-20c8-4222-9887-04aa1aabfdc9', 'Банкомат 1276', '1276', 'operational', 'atm', 'site_24d6b683-3934-45ae-a706-d475d1efa619', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e97b0bdb-4907-40eb-894c-37fb6e65df08', 'Pharmacosmos C-53 ЛИТЕРАТУРНЫЙ', 'Ташкент, Учтепинский район, махаллинский сход граждан Кукча-Актепа, ул. Заковат, 47', 41.3043648, 69.1603134, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_89072c77-2bc2-4a07-894c-d3879a77e382', 'Банкомат 1279', '1279', 'operational', 'atm', 'site_e97b0bdb-4907-40eb-894c-37fb6e65df08', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_613d1e13-9b5c-432a-97ba-96439c72c573', 'Pharmacosmos C-54 ХОКИМИЯТ', 'Ташкент, Учтепинский район, ул. Фазылтепа, 10А', 41.2981449, 69.1903572, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c663f77b-5a73-4480-b513-597c0bd2e694', 'Банкомат 1280', '1280', 'operational', 'atm', 'site_613d1e13-9b5c-432a-97ba-96439c72c573', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fce86a04-6409-4215-9516-e7d2c31ab232', 'Pharmacosmos C-69 ИППОДРОМ', 'Ташкент, проспект Бунёдкор (дублёр)', 41.255787, 69.1932069, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_acb56475-6553-44df-8fde-57cb7d855b05', 'Банкомат 1281', '1281', 'operational', 'atm', 'site_fce86a04-6409-4215-9516-e7d2c31ab232', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_12c5f075-1502-41f7-aab0-2c9e20006c89', 'Pharmacosmos C-74 Birinchi-Gor bolnitsa', 'Ташкент, Шайхантахурский район, махаллинский сход граждан Сархумдон, ул. Уйгур, 6', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_98238522-def0-487e-9b14-58c154327b9b', 'Банкомат 1285', '1285', 'operational', 'atm', 'site_12c5f075-1502-41f7-aab0-2c9e20006c89', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c5d995cc-ac68-49bf-979f-0ab91e22c9cc', 'Pharmacosmos C-108 Bodomzor', 'Ташкент, Юнусабадский район, ул. Чингиза Айтматова, 1', 41.3336951, 69.2917552, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1e73d935-3dcd-4d99-b6c5-fec9f23a1575', 'Банкомат 1291', '1291', 'operational', 'atm', 'site_c5d995cc-ac68-49bf-979f-0ab91e22c9cc', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f6562c37-cfff-4fee-af12-6ec89c7a0206', 'Pharmacosmos C-110 Beshqayrag''och', 'Ташкент, Шайхантахурский район, 3-й пр. Бешкайрагач, 35А', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_477631f6-d832-47a8-87c7-409a835a305a', 'Банкомат 1293', '1293', 'operational', 'atm', 'site_f6562c37-cfff-4fee-af12-6ec89c7a0206', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5a690e02-6dcf-4aee-81ce-76d61bad5445', 'Pharmacosmos C-127 Ц Квартал МедиаПарк', 'Ташкент, Чиланзарский район ул. Катартал, 28', 41.2699231, 69.1987057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b887a4f6-eb5e-4b0e-bf7a-9f916918332a', 'Банкомат 1295', '1295', 'operational', 'atm', 'site_5a690e02-6dcf-4aee-81ce-76d61bad5445', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b7ffb82f-69c8-4ef7-9e8b-e585e8f6a9b1', 'Pharmacosmos С-79 Олимполвон-2', 'Ташкентская область, Зангиатинский район, городской посёлок Эркин, 8-й проезд Комолиддин Бехзод, 69', 41.25, 69.083333, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_707ea144-4071-4d2b-854b-1421421723d4', 'Банкомат 1304', '1304', 'operational', 'atm', 'site_b7ffb82f-69c8-4ef7-9e8b-e585e8f6a9b1', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_472bf64f-f196-4430-b811-4a879f74ab37', 'Pharmacosmos C-87 Олимполвон карзинка', 'Ташкентская область, Зангиатинский район, городской посёлок Эркин', 41.25, 69.083333, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f30f511c-c8d7-4143-a1a4-1c9158397269', 'Банкомат 1305', '1305', 'operational', 'atm', 'site_472bf64f-f196-4430-b811-4a879f74ab37', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7f41d9c7-c0df-4e81-aea1-8a53acf2dfd9', 'ATLAS Караташ', 'Ташкент, Шайхантахурский район, пр. Коратош, 11А', 41.3188398, 69.2347, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b1a5d627-dcb7-4552-ad3b-76bfe9c963fb', 'Банкомат 1337', '1337', 'operational', 'atm', 'site_7f41d9c7-c0df-4e81-aea1-8a53acf2dfd9', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_25b707bf-a111-45be-8787-2c7de5cd3ad4', 'OOO "NAVBAHOR APTEKA" №66', 'Ташкент, Яккасарайский район, улица Шота Руставели, 53', 41.2781735, 69.2453777, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2b7e298e-07ea-4c38-81fd-ce2039aa18fc', 'Банкомат 1339', '1339', 'operational', 'atm', 'site_25b707bf-a111-45be-8787-2c7de5cd3ad4', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cc1f0f02-1b84-443e-a76e-ad30f6030645', 'OLMA М-139', 'Ташкент, Чиланзарский р-н, Дилобод МСГ, 6-квартал, дом 50', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_016f4e6c-5d58-40f4-a160-dec62f1dcc8e', 'Банкомат 1344', '1344', 'operational', 'atm', 'site_cc1f0f02-1b84-443e-a76e-ad30f6030645', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f9287238-32f2-4e12-9cbc-99720797d160', 'Корзинка OAZIS', 'Ташкент, Учтепинский район, улица Лутфи, 21А', 41.2858778, 69.1859597, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a6a11c2a-3795-4c01-86ce-399a3223b265', 'Банкомат 1349', '1349', 'operational', 'atm', 'site_f9287238-32f2-4e12-9cbc-99720797d160', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6ad21576-0ec5-45a9-8f78-132960a6c42e', 'Пункт выдачи Uzum Market', 'г. Ташкент, Учтепинский район, махалля Фаход, дом 7 Б', 41.3043648, 69.1603134, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8afd832b-db2f-4717-af0c-ebfbe7a4c2ee', 'Банкомат 1363', '1363', 'operational', 'atm', 'site_6ad21576-0ec5-45a9-8f78-132960a6c42e', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e950962d-abfc-4906-97dc-db7358f9a4b7', 'Пункт выдачи Uzum Market', 'г. Ташкент, Яккасарайский район, улица Имама ат-Термези, дом 51', 41.290943, 69.2415856, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_03992365-d0ac-4d99-8e25-80ead04ba955', 'Банкомат 1365', '1365', 'operational', 'atm', 'site_e950962d-abfc-4906-97dc-db7358f9a4b7', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cde80255-b99f-4fa6-8b39-ddec1bfbe955', 'Пункт выдачи Uzum Market', 'г. Ташкент, Юнусабадский район, проспект Амира Темура, дом 70', 41.3675226, 69.2856628, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_01be2e7a-cdfa-4516-9d20-99f297771248', 'Банкомат 1366', '1366', 'operational', 'atm', 'site_cde80255-b99f-4fa6-8b39-ddec1bfbe955', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0bf2240e-188c-468d-8c5d-a8d06a936273', 'Пункт выдачи Uzum Market', 'г. Ташкент, Учтепинский район, массив Чиланзар, 11 квартал, дом 34', 41.2737958, 69.1869906, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cce5b16f-794e-4519-afad-ff9891e7cb63', 'Банкомат 1368', '1368', 'operational', 'atm', 'site_0bf2240e-188c-468d-8c5d-a8d06a936273', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_056bb854-41a7-4cc0-b204-2ad699c292ad', 'OXY Med (Дружба) 169', 'г.Тошкент, Шайхантахурский район, ул.Бунёдкор 4а', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f35a074c-244c-4a65-a7b2-8d01a9f251c9', 'Банкомат 1480', '1480', 'operational', 'atm', 'site_056bb854-41a7-4cc0-b204-2ad699c292ad', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_db582d97-b8e9-4f97-8181-5f9225205f3e', 'Mix Podarok', 'г. Ташкент, ул. Алишера Навои, 30А', 41.3220822, 69.2474658, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_043ac297-a1b6-4a38-8f06-56e35fd7898e', 'Банкомат 1483', '1483', 'operational', 'atm', 'site_db582d97-b8e9-4f97-8181-5f9225205f3e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_13fc0c43-d1b8-40da-ad32-b07e8d9a0035', 'Бизнес-центр Inco', 'г. Ташкент, Мирабадский район, ул. Фидокор, 32', 41.2942609, 69.2719553, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_28bc8ee9-4834-4d29-a5d2-a5e5bd51f1d0', 'Банкомат 1550', '1550', 'operational', 'atm', 'site_13fc0c43-d1b8-40da-ad32-b07e8d9a0035', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6a919d32-6f46-4b72-ad1d-37c97bfffef0', 'ТРЦ Scopus Mall 2', 'г. Ташкент, Учтепинский район, ул. Фархадская, Г30 блок 15', 41.2862938, 69.1861875, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5aa56ac5-fc2d-47b2-b88c-d443947296dc', 'Банкомат 1553', '1553', 'operational', 'atm', 'site_6a919d32-6f46-4b72-ad1d-37c97bfffef0', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e2790c69-8ce1-4254-858a-65c1df7edaa5', 'Корзинка Учтепа', 'г.Ташкент, Учтепинский р-н,, ул. Фазылтепа, 93', 41.2929293, 69.170285, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_cf6c81f2-c007-4ef5-a39d-be69bd029f82', 'Банкомат 1559', '1559', 'operational', 'atm', 'site_e2790c69-8ce1-4254-858a-65c1df7edaa5', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cfdc2f79-bf22-421c-be0f-73747ae012d5', 'Korzinka Бешкайрагоч', 'г. Ташкент, ул. Кукча Дарвоза, 628', 41.3079501, 69.1618477, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_307f59a4-b8f1-4497-8331-d561ef2f9aa4', 'Банкомат 1560', '1560', 'operational', 'atm', 'site_cfdc2f79-bf22-421c-be0f-73747ae012d5', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_dd7f0d70-86d6-4cbc-a614-168f0bf63253', 'Korzinka Амор Мия', 'г. Ташкент, ул. Садыка Азимова, 51', 41.3007946, 69.2838547, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b27efe02-af21-4868-b68a-9866c154f522', 'Банкомат 1565', '1565', 'operational', 'atm', 'site_dd7f0d70-86d6-4cbc-a614-168f0bf63253', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5623874d-c862-41b9-81fa-9e94539b091b', 'Единое окно', 'г. Ташкент.. Мирабадский район А.Проспект Тимура, 31', 41.3020502, 69.2805659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_129d9fe9-b37a-411c-9f86-08a06f97ca61', 'Банкомат 1574', '1574', 'operational', 'atm', 'site_5623874d-c862-41b9-81fa-9e94539b091b', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_95f422e9-bc9d-4ac5-9664-4806c2e1634e', 'Единое окно', 'г. Ташкент.. Учтепинский район, улица Фархода, 21', 41.2837605, 69.1409013, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_11167771-cb96-49e5-ae51-6db3adb47293', 'Банкомат 1578', '1578', 'operational', 'atm', 'site_95f422e9-bc9d-4ac5-9664-4806c2e1634e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_27b1f919-335f-4b57-aec8-1dd31d9a7fef', 'Единое окно', 'г. Ташкент.. Чиланзарский район, улица Бунёдкор, 7 Г', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_561d2ede-4522-4298-be5b-eb84b5687727', 'Банкомат 1579', '1579', 'operational', 'atm', 'site_27b1f919-335f-4b57-aec8-1dd31d9a7fef', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_43d3fbc2-55c5-41f2-a78a-701c00f80865', 'ТРЦ Samarqand Darvoza', 'г. Ташкент, Шайхантахурский район, ул. Коратош, 5А', 41.3188398, 69.2347, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_af8a52df-b377-4fc3-97b0-798514b3876b', 'Банкомат 1585', '1585', 'operational', 'atm', 'site_43d3fbc2-55c5-41f2-a78a-701c00f80865', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b0010b33-6938-4cca-b4de-850d7333a552', 'Единое окно', 'Ташкентская обл., Зангиатинский район, курган Эшонгузар, улица Ойбека, дом 8', 41.4687176, 69.5850268, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c6ac4efb-7416-44ec-b33b-5706a9725459', 'Банкомат 1592', '1592', 'operational', 'atm', 'site_b0010b33-6938-4cca-b4de-850d7333a552', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_145a0521-93a1-4e48-a389-1e5a000090cc', 'Bellissimo Kukcha', 'г. Ташкент, ул. Кукча Дарвоза, дом 488', 41.3131649, 69.1822815, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_890d9df7-1a57-4e3b-808f-0271382dfa54', 'Банкомат 1617', '1617', 'operational', 'atm', 'site_145a0521-93a1-4e48-a389-1e5a000090cc', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_996562dc-54e6-4ce0-abc1-e37d177f664e', 'Legion Учтепа РОВД', 'Ташкент, Учтепинский район, массив Чиланзар, 22-й квартал, 30А', 41.2737958, 69.1869906, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9c93d283-96ed-40ab-9b54-621b2e49b20a', 'Банкомат 1620', '1620', 'operational', 'atm', 'site_996562dc-54e6-4ce0-abc1-e37d177f664e', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b236792d-0f0b-40e0-8e05-5dc649925a83', 'Bellissimo Chilonzor 19', 'г. Ташкент, Чиланзарский район, квартал 19 дом1 (ул.Аль Хорезми дом 66/9)', 41.2701462, 69.191342, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7676c128-5c9e-4225-94fd-cc4b09351328', 'Банкомат 1623', '1623', 'operational', 'atm', 'site_b236792d-0f0b-40e0-8e05-5dc649925a83', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c7794d45-4e73-4002-aa88-827261de56e6', 'Legion МАГАЗИН № 21 АЛЬ ХОРЕЗМИ', 'г. Ташкент, Учтепинский район, массив Чиланзар, 11-й квартал, 4', 41.2737958, 69.1869906, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ff47d373-ca1d-4305-ab47-ed2b83c4a53a', 'Банкомат 1629', '1629', 'operational', 'atm', 'site_c7794d45-4e73-4002-aa88-827261de56e6', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8685eeb0-7f71-4a36-83bb-6c9e5b16e043', 'Bellissimo Oybek metro', 'г.Ташкент, Мирабадский р-н, (Ойбек-2) Афросиёб шох кучаси', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fa2d1f53-cc90-42f6-9565-97d688fdb22c', 'Банкомат 1631', '1631', 'operational', 'atm', 'site_8685eeb0-7f71-4a36-83bb-6c9e5b16e043', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_670c26fe-015c-4d79-a93c-18c519c5be81', 'Bellissimo Ganga', 'г. Ташкент, Шайхантахурский район, массив Хадра, 7', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_184d88fd-3f65-4ff5-a8d9-4df3d1839faf', 'Банкомат 1632', '1632', 'operational', 'atm', 'site_670c26fe-015c-4d79-a93c-18c519c5be81', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f07b9c80-10f1-45dd-8e94-59c7a4655064', 'Bellissimo Gagarina', 'г. Ташкент., Чиланзарский р-н, ул. Чиланзарская', 41.2771054, 69.2158637, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_475a3580-77f7-40a3-a380-1eb6e221ac60', 'Банкомат 1639', '1639', 'operational', 'atm', 'site_f07b9c80-10f1-45dd-8e94-59c7a4655064', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cd574094-ba2b-42cb-b5f2-55250a7ff35e', 'БЦ Diamond', 'Ташкент, Юнусабадский район, ул. Абдуллы Кадыри, 39', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_fe8a4f87-7033-4b17-978a-1f33b97a3ea4', 'Банкомат 1673', '1673', 'operational', 'atm', 'site_cd574094-ba2b-42cb-b5f2-55250a7ff35e', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5a9f90fd-6eec-4265-9adf-bb49ab522798', 'Пункт выдачи Uzum Market', 'г. Ташкент, улица Кукча Дарвоза, 544', 41.3052547, 69.1580441, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9d2fc7b3-6026-4b4c-a383-2973467c188f', 'Банкомат 1675', '1675', 'operational', 'atm', 'site_5a9f90fd-6eec-4265-9adf-bb49ab522798', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e8f12d8-1b6f-4246-bf23-eefcfd43ac13', 'БЦ Diamond', 'Ташкент, Юнусабадский район, ул. Абдуллы Кадыри, 39', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2e792c75-9b09-4bd2-8888-0bd918fb3a11', 'Банкомат 1696', '1696', 'operational', 'atm', 'site_2e8f12d8-1b6f-4246-bf23-eefcfd43ac13', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6d14038e-1de3-4eda-869e-139a3e6652d0', 'Korzinka Dombirobod', 'г. Ташкент, Чиланзарский район, ул.Чиланзарская, дом 88', 41.2771054, 69.2158637, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1ed0c032-e20d-47ce-a87b-af80425f4676', 'Банкомат 1713', '1713', 'operational', 'atm', 'site_6d14038e-1de3-4eda-869e-139a3e6652d0', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_75946447-ef3a-4cd3-ae19-c9a66964464b', 'ПВЗ УЗУМ МАРКЕТ (франшиза)', 'г. Ташкент, улица Али Кушчи', 41.30704, 69.1883718, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_41eebd91-cdb7-4ccd-a285-1e758952b931', 'Банкомат 1716', '1716', 'operational', 'atm', 'site_75946447-ef3a-4cd3-ae19-c9a66964464b', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9fc8aab9-3216-4646-8acd-2fb45b257e8a', 'Olma М-126  ( Ташкент )', 'г. Ташкент, Учтепинский р-н, Чаманзор МСГ, ул.Учтепа', 41.6352718, 69.9405574, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0bb2c992-f6d7-4df9-bfce-191a2a1800ac', 'Банкомат 1734', '1734', 'operational', 'atm', 'site_9fc8aab9-3216-4646-8acd-2fb45b257e8a', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6b0afca0-0a13-4874-b229-116f06f1135b', 'Станция метро Площадь Мустакиллик', 'г. Ташкент, Юнусабадский район, махаллинский сход граждан Кашгар', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_7cf70d34-d4dc-433b-ba2a-afe103117252', 'Банкомат 1736', '1736', 'operational', 'atm', 'site_6b0afca0-0a13-4874-b229-116f06f1135b', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3c4e35bc-afc3-44ed-960b-064ee64aa326', 'Станция метро Айбека', 'г. Ташкент, Мирабадский район, улица Афросиаб д.41', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0c9686d7-aedd-4e1e-a701-c96b07c9a3b2', 'Банкомат 1737', '1737', 'operational', 'atm', 'site_3c4e35bc-afc3-44ed-960b-064ee64aa326', 'ORG_ID_HERE', 'Бригада А; ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1be5067c-20d1-4e1c-a63c-e2250e88633b', 'Станция метро Абдуллы Кадыри', 'г. Ташкент, Юнусабадский район, проспект Амира Темура', 41.3675226, 69.2856628, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_94ab6947-0018-4cd2-a5cc-28a020560a55', 'Банкомат 1738', '1738', 'operational', 'atm', 'site_1be5067c-20d1-4e1c-a63c-e2250e88633b', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_34fdf8c3-5255-4c0d-9fe0-89c68d96ab0a', 'Станция метро Абдуллы Кадыри', 'г. Ташкент, Юнусабадский район, проспект Амира Темура', 41.3675226, 69.2856628, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a8819770-54d7-45a1-93f2-c10a395e65e8', 'Банкомат 1746', '1746', 'operational', 'atm', 'site_34fdf8c3-5255-4c0d-9fe0-89c68d96ab0a', 'ORG_ID_HERE', 'Бригада А', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_49db47bd-ed41-4252-a62c-9e0af1615948', 'БЦ Uzum Market', 'Ташкент, Яккасарайский район, ул. Кичик Бешагач, 132А', 41.2786905, 69.2706676, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_357e9a51-c91f-44dd-842b-43bc3dfd04a6', 'Банкомат 1749', '1749', 'operational', 'atm', 'site_49db47bd-ed41-4252-a62c-9e0af1615948', 'ORG_ID_HERE', 'Бригада А', now());

COMMIT;