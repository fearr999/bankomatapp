-- Автосгенерировано scripts/geocode-devices.mjs — точки банкоматов/картоматов бригады А.
-- 1) Сначала выполните этот запрос и найдите id вашей организации:
--    SELECT id, name FROM "Organization" ORDER BY "createdAt" ASC;
-- 2) Замените ВСЕ вхождения ORG_ID_HERE ниже на реальный id (текстовый поиск-замена) и выполните файл целиком.
BEGIN;

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_598aca13-297e-42e6-af5c-ce11223a5110', 'БЦ "Modera Towers"', 'г. Ташкент', 41.3123363, 69.2787079, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_72e9ee33-aab5-467f-ba6f-4e759380c35e', 'Картомат MS0002', 'MS0002', 'operational', 'cardomat', 'site_598aca13-297e-42e6-af5c-ce11223a5110', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e35d1584-8019-4dee-aba2-661a29a930ad', 'ПВЗ ТАШ-10', 'г. Ташкент, Сергелийский район, массив Сергели-7, дом 2', 41.2148562, 69.2675659, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f5f38d85-b2fa-4253-86fe-b26adbf75faf', 'Картомат MS0009', 'MS0009', 'operational', 'cardomat', 'site_e35d1584-8019-4dee-aba2-661a29a930ad', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8158ea06-0a92-489c-bbeb-771133176161', 'МФЦ', 'Ташкент, Яшнабадский район, улица Махтумкули, 1/5', 41.3032774, 69.3190609, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_edde66c4-3af0-46df-b897-c77894fde3e3', 'Картомат MS0010', 'MS0010', 'operational', 'cardomat', 'site_8158ea06-0a92-489c-bbeb-771133176161', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b8337941-d0fa-4f3b-8d37-eae73362b85f', 'ПВЗ - Таш 7', 'г. Ташкент, Яшнабадский район, пересечение улиц Фаргона йули и ТКАД (Куйлюк)', 41.3123363, 69.2787079, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_42a9384f-5d5d-409b-87db-2df54a46d961', 'Картомат MS0014', 'MS0014', 'operational', 'cardomat', 'site_b8337941-d0fa-4f3b-8d37-eae73362b85f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f4012dc0-31b7-4707-9369-40ccfea0da3e', 'БЦ "Галлеон"', 'г. Ташкент, Мирзо-Улугбекский район, Махаллинский сход граждан Асака, 1-й пр. Дархан, 8A', 41.3331424, 69.3498882, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_22b16f48-bcf9-443f-8bbe-295a0a6e72fe', 'Картомат MS0015', 'MS0015', 'operational', 'cardomat', 'site_f4012dc0-31b7-4707-9369-40ccfea0da3e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_558a5067-27b6-41a2-9475-203471b3dbd5', 'ТЦ "Alfraganus"', 'г. Ташкент, Мирабадский район, ул. Кучкуприк, дом 30', 41.2826997, 69.2932512, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_ef236cec-c55c-4db9-bd82-1fc9d24b58d8', 'Картомат MS0034', 'MS0034', 'operational', 'cardomat', 'site_558a5067-27b6-41a2-9475-203471b3dbd5', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b52d8358-a6d7-4c1b-85ee-2b242af19d44', 'Склад маркета UZUM', 'г. Ташкент, ул. Ханабад 2/2', 41.2206225, 69.2586091, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dbef453a-1d39-4a3c-bac4-2785dac7327f', 'Картомат MS0045', 'MS0045', 'operational', 'cardomat', 'site_b52d8358-a6d7-4c1b-85ee-2b242af19d44', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_103d21db-2556-4019-b81d-54616adeeb91', 'Корзинка "Куйлюк"', 'г. Ташкент, Яшнабадский район, Ташкентская кольцевая автомобильная дорога', 41.2448519, 69.310903, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_26925e4d-d541-465c-938e-b993037ad889', 'Картомат MS0052', 'MS0052', 'operational', 'cardomat', 'site_103d21db-2556-4019-b81d-54616adeeb91', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_93064d06-c478-440b-872e-8aaf3689000c', 'ПВЗ ТАШ-23', 'г. Ташкент, Алмазарский район, Карасарайская улица, дом 249/2', 41.3647162, 69.2408165, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_47e98ba8-3758-400a-b936-428ff74e82e0', 'Картомат MS0024', 'MS0024', 'operational', 'cardomat', 'site_93064d06-c478-440b-872e-8aaf3689000c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_4a057010-4917-40d6-ae93-3d70f44f0561', 'ПВЗ ТАШ-72', 'г. Ташкент, Мирабадский район, улица Таллимаржон, дом 10', 41.2764227, 69.3020179, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_26deb20f-0c88-4227-82bf-c4a361e6572b', 'Картомат MS0026', 'MS0026', 'operational', 'cardomat', 'site_4a057010-4917-40d6-ae93-3d70f44f0561', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d29b4f24-c99f-47f0-9667-f56d0f3f19f3', 'ТРЦ Sampi', 'г. Ташкент, Юнусабадский район, улица Богишамол, 260', 41.3524955, 69.3313487, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a11510fa-7a8c-447a-8e49-35e1ade9ee6b', 'Картомат MS0003', 'MS0003', 'operational', 'cardomat', 'site_d29b4f24-c99f-47f0-9667-f56d0f3f19f3', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_34304df6-0cfb-428a-830e-80df271dc900', 'Корзинка "Авиасозлар"', 'г. Ташкент, Яшнабадский район, улица Авиасозлар', 41.2942625, 69.3434007, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_851a200f-efac-4522-aa5b-e3ccb737a5d2', 'Картомат MS0004', 'MS0004', 'operational', 'cardomat', 'site_34304df6-0cfb-428a-830e-80df271dc900', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_70e7a5a0-d0b7-4998-85b9-b801883418ca', 'Korzinka - Sayram', 'г. Ташкент, Юнусабадский район, ул. Юнусата, 15', 41.3725646, 69.3113831, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c6e9e8de-e881-4713-adbb-b9dadee90dec', 'Картомат MS0007', 'MS0007', 'operational', 'cardomat', 'site_70e7a5a0-d0b7-4998-85b9-b801883418ca', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_393c4954-9de1-46c7-bc5a-165ebf480990', 'Korzinka - Depo', 'г. Ташкент, Учтепинский район, махаллинский сход граждан Хамдуст', 41.3043648, 69.1603134, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_227ee927-653e-4225-b1d3-7b5dfca750c5', 'Картомат MS0008', 'MS0008', 'operational', 'cardomat', 'site_393c4954-9de1-46c7-bc5a-165ebf480990', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e87cd86e-18df-4a3a-a66a-f2ca8f85f8bc', 'Korzinka - Setor', 'г. Ташкент, Юнусабадский район, массив Юнусабад, 9-й квартал, 30A/1', 41.3777697, 69.2821021, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_38811ffa-0d41-4470-9a6d-1a252aa8cbd8', 'Картомат MS0013', 'MS0013', 'operational', 'cardomat', 'site_e87cd86e-18df-4a3a-a66a-f2ca8f85f8bc', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cd27fe2f-dad4-440e-b05d-a4ddfc414b7f', 'Korzinka - Qoraqamish', 'г. Ташкент, Алмазарский район, махалля Шодиёна, улица Каракамыш-2, дом 17', 41.3753261, 69.2215177, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f13fd960-4a14-4e0d-af3a-6014abea38a0', 'Картомат MS0016', 'MS0016', 'operational', 'cardomat', 'site_cd27fe2f-dad4-440e-b05d-a4ddfc414b7f', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_9a8a1984-2299-4a7f-a96f-1bc93e89f11d', 'Korzinka - High Town Mall', 'г. Ташкент, Юнусабадский район, ул. Янгишахар, 67, ТЦ High Town', 41.3566556, 69.3104183, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bd8a4ebd-f1b3-437b-a3c4-6121ce37da07', 'Картомат MS0023', 'MS0023', 'operational', 'cardomat', 'site_9a8a1984-2299-4a7f-a96f-1bc93e89f11d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6037e8f6-28c3-40d8-9630-667731dd686c', 'Korzinka - Next', 'г. Ташкент, Яккасарайский район, ул. Бабура, 6', 41.2786124, 69.2575121, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e9f87162-b70c-4bc2-9ffa-a046a1d2701b', 'Картомат MS0033', 'MS0033', 'operational', 'cardomat', 'site_6037e8f6-28c3-40d8-9630-667731dd686c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_936a057f-bcb9-4a74-8db6-23270c20f215', 'Korzinka - Fayzobod', 'г. Ташкент, Мирабадский район, ул. Янги Куйлюк, 2А', 41.2470125, 69.3017029, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e9f014bb-8071-4c99-848b-f0b7e99d94a8', 'Картомат MS0041', 'MS0041', 'operational', 'cardomat', 'site_936a057f-bcb9-4a74-8db6-23270c20f215', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3088162f-3fb8-4e1e-9aae-49cd591276da', 'Korzinka - Elbek', 'г. Ташкент, Яшнабадский район, улица Карасу 36', 41.3002457, 69.3433654, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_0e9aae1b-e8cd-4660-9f36-cf6201b09b7a', 'Картомат MS0042', 'MS0042', 'operational', 'cardomat', 'site_3088162f-3fb8-4e1e-9aae-49cd591276da', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d54d9897-146f-4f94-a1da-613091d6d1b8', 'Korzinka - Yugnakiy', 'г. Ташкент, Мирзо-Улугбекский район, улица Ахмада Югнаки', 41.3478477, 69.3818569, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c2f5ee13-7f86-44b7-ac3e-e8c8da21a65b', 'Картомат MS0055', 'MS0055', 'operational', 'cardomat', 'site_d54d9897-146f-4f94-a1da-613091d6d1b8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3ca70eca-6feb-462a-813f-9ed84703a98c', 'Korzinka - Dumbirobod', 'г. Ташкент, Чиланзарский район, ул. Чиланзарская, дом 88', 41.2789178, 69.2177756, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b79aa94a-dd01-480e-aa18-d21ff8c532d1', 'Картомат MS0056', 'MS0056', 'operational', 'cardomat', 'site_3ca70eca-6feb-462a-813f-9ed84703a98c', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_2e3c3698-b8df-4563-8554-db9441e88b68', 'Корзинка "Кушбеги"', 'г. Ташкент', 41.3123363, 69.2787079, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_84d18592-5d4b-4b28-a185-fd983736ad02', 'Картомат MS0060', 'MS0060', 'operational', 'cardomat', 'site_2e3c3698-b8df-4563-8554-db9441e88b68', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8dacb0e1-1424-4cf1-9e45-82de10c31189', 'Корзинка "УчТепа"', 'г. Ташкент, Учтепинский район, ул. Фазылтепа, 93', 41.2929293, 69.170285, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_61a65ab1-de7e-49c3-9465-1481bf7f268a', 'Картомат MS0061', 'MS0061', 'operational', 'cardomat', 'site_8dacb0e1-1424-4cf1-9e45-82de10c31189', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_55d1d4dc-4840-4c5f-85ca-e3d15317cd93', 'Корзинка - Тузель', 'г. Ташкент, Яшнабадский район, Tuzel 2-chi kvartal, 13Б/1', 41.2993442, 69.342156, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_6d12270a-a963-4e1b-820b-4035efbd9836', 'Картомат MS0062', 'MS0062', 'operational', 'cardomat', 'site_55d1d4dc-4840-4c5f-85ca-e3d15317cd93', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0850a3c4-6aa5-4383-826b-4eb41e490b53', 'Корзинка - Шедевр', 'г. Ташкент, Юнусабадский район, Кашгар (Ц-4) ж/м', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_60177928-ed1b-4c83-b847-d7065ad9761e', 'Картомат MS0064', 'MS0064', 'operational', 'cardomat', 'site_0850a3c4-6aa5-4383-826b-4eb41e490b53', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7cb0b862-c86d-4452-af68-3558ff4522be', 'Korzinka - Yunusobod_4', 'г. Ташкент, Юнусабадский район, ул. Майкурган, 77/1', 41.3714873, 69.2646143, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_58e4c632-106a-4ea9-8e1d-1b84d72bab4d', 'Картомат MS0066', 'MS0066', 'operational', 'cardomat', 'site_7cb0b862-c86d-4452-af68-3558ff4522be', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7be4c586-52a2-4e69-899c-17d8c7a8bea2', 'Korzinka - Qoyliq', 'г. Ташкент, Мирабадский район, массив Куйлюк, 1, 1-й квартал', 41.2452493, 69.3113445, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_546731de-38d2-4178-9b1e-7d73ede30a6c', 'Картомат MS0073', 'MS0073', 'operational', 'cardomat', 'site_7be4c586-52a2-4e69-899c-17d8c7a8bea2', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_432c51f7-ed9e-4fb6-9976-445c57694557', 'Станция метро "Бодомзор"', 'г. Ташкент, Юнусабадский район, улица Бадамзар', 41.341607, 69.297497, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_de141873-9772-4187-b672-b57651fb5bb7', 'Картомат MS0006', 'MS0006', 'operational', 'cardomat', 'site_432c51f7-ed9e-4fb6-9976-445c57694557', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cd232d58-245b-4f84-ad13-523058fe9f71', 'Станция метро "Беруни"', 'г. Ташкент, Шайхантахурский район, улица Беруни', 41.3250066, 69.2321258, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d733c879-7c43-415d-870f-5047448ac842', 'Картомат MS0020', 'MS0020', 'operational', 'cardomat', 'site_cd232d58-245b-4f84-ad13-523058fe9f71', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_79a25714-09d2-47db-8cc2-ee1ff6427430', 'Станция метро "Мирзо Улугбек"', 'г. Ташкент, Чиланзарский район, улица Чапаната', 41.2918674, 69.1992966, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_bdb160fa-ee3f-4445-bc75-fbb79e794624', 'Картомат MS0018', 'MS0018', 'operational', 'cardomat', 'site_79a25714-09d2-47db-8cc2-ee1ff6427430', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8701ff78-089e-403a-87e6-b9e0878b9785', 'Станция метро "Миллий Бог"', 'г. Ташкент, Шайхантахурский район, проспект Бунёдкор', 41.2996116, 69.2314647, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_72a259b8-d1e7-4a33-bc02-4426c3cb8909', 'Картомат MS0019', 'MS0019', 'operational', 'cardomat', 'site_8701ff78-089e-403a-87e6-b9e0878b9785', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_c9b5c650-1448-4e01-ab04-504f9c3e0b59', 'Станция метро "Минг Урик"', 'г. Ташкент, Мирабадский район, улица Шахрисабз', 41.2998725, 69.2748686, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_53512a36-161d-41d3-817f-432c77c0b209', 'Картомат MS0022', 'MS0022', 'operational', 'cardomat', 'site_c9b5c650-1448-4e01-ab04-504f9c3e0b59', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_3119ac9c-c9d8-44f6-ad2f-1b2297477b73', 'Станция метро "Хамид Алимджон"', 'г. Ташкент, Мирзо-Улугбекский район, проспект Мустакиллик', 41.322955, 69.3153342, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e8883109-f101-4446-8b90-1a84541ab4ce', 'Картомат MS0025', 'MS0025', 'operational', 'cardomat', 'site_3119ac9c-c9d8-44f6-ad2f-1b2297477b73', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_584f2dd0-3503-4123-870e-ef661a0b072d', 'Станция метро "Шахристон"', 'г. Ташкент, Юнусабадский район, проспект Амира Темура', 41.3179973, 69.282545, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b488b0d8-cb59-4fdc-a67e-3f23d60de849', 'Картомат MS0029', 'MS0029', 'operational', 'cardomat', 'site_584f2dd0-3503-4123-870e-ef661a0b072d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cb5d04c1-07f4-4373-bacf-0df4dff4df6a', 'Станция метро "Юнус Обод"', 'г. Ташкент, Юнусабадский район, улица Ахмада Дониша', 41.3818356, 69.2977681, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b454859d-a15e-47fd-8479-473232071ea7', 'Картомат MS0031', 'MS0031', 'operational', 'cardomat', 'site_cb5d04c1-07f4-4373-bacf-0df4dff4df6a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_7537984a-a580-4c24-81a1-f8e608af2ae8', 'Станция метро "Туркистон"', 'г. Ташкент, Юнусабадский район, улица Ахмада Дониша', 41.3818356, 69.2977681, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_e48c814b-cc57-4b3c-8f21-ffe49c42cc1d', 'Картомат MS0037', 'MS0037', 'operational', 'cardomat', 'site_7537984a-a580-4c24-81a1-f8e608af2ae8', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_46ceabfa-1b91-48ba-8d03-d67b07140177', 'Станция метро "Амир Темур Хиёбони"', 'г. Ташкент, Юнусабадский район, проспект Мустакиллик', 41.3132242, 69.2777656, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_334a3632-2ba9-4e43-8006-3b70bc432a99', 'Картомат MS0038', 'MS0038', 'operational', 'cardomat', 'site_46ceabfa-1b91-48ba-8d03-d67b07140177', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_99caeca9-81b7-4cda-a466-a83b23cadc77', 'Станция метро "Узбекистон"', 'г. Ташкент, Шайхантахурский район, улица Батыра Закирова', 41.3209576, 69.2545369, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_239410cb-ff9c-4e78-83f0-e32803115c18', 'Картомат MS0040', 'MS0040', 'operational', 'cardomat', 'site_99caeca9-81b7-4cda-a466-a83b23cadc77', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_8d51cc49-1837-4862-b226-b7bfc699b8b0', 'Станция метро "Чилонзор"', 'г. Ташкент, Чиланзарский район, проспект Бунёдкор (дублёр)', 41.2567657, 69.1928161, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_69307a87-3b27-4a46-a1b3-68ba637e683c', 'Картомат MS0043', 'MS0043', 'operational', 'cardomat', 'site_8d51cc49-1837-4862-b226-b7bfc699b8b0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_298dc698-ddc1-40b9-94b3-a74e1c590913', 'Станция метро "Гафур Гулом"', 'г. Ташкент, Шайхантахурский район, улица Себзара', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_db3b216b-fe73-4ef7-a357-dfd19959aaa1', 'Картомат MS0044', 'MS0044', 'operational', 'cardomat', 'site_298dc698-ddc1-40b9-94b3-a74e1c590913', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6c46170f-79c9-4937-9d89-623c23cd3238', 'Станция метро "Чорсу"', 'г. Ташкент, Шайхантахурский район, махаллинский сход граждан Гульбазар', 41.3269876, 69.2390499, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_2a41afc5-6d80-4724-8c3d-41e77a9d1342', 'Картомат MS0046', 'MS0046', 'operational', 'cardomat', 'site_6c46170f-79c9-4937-9d89-623c23cd3238', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ddf3f597-9750-4706-9a2f-92a313761fb0', 'Станция метро "Тинчлик"', 'г. Ташкент, Шайхантахурский район, улица Беруни', 41.3250066, 69.2321258, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_4fde4d78-7843-4692-b301-765b8e301357', 'Картомат MS0047', 'MS0047', 'operational', 'cardomat', 'site_ddf3f597-9750-4706-9a2f-92a313761fb0', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_05f8dbc0-2ccf-4fed-b878-e3a6fac02c7e', 'Станция метро "Машиносозлар"', 'г. Ташкент, Яшнабадский район, улица Эльбека', 41.2993545, 69.296602, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f484995a-13c5-4017-877c-9cdfe44848fe', 'Картомат MS0050', 'MS0050', 'operational', 'cardomat', 'site_05f8dbc0-2ccf-4fed-b878-e3a6fac02c7e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_10ea871c-402e-4cd8-8add-9730e7d3374b', 'Станция метро Пушкинская', 'г. Ташкент, Мирзо-Улугбекский район, проспект Мустакиллик', 41.322955, 69.3153342, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_84d878e2-3a1b-40f4-927a-87ebac68caf4', 'Картомат MS0054', 'MS0054', 'operational', 'cardomat', 'site_10ea871c-402e-4cd8-8add-9730e7d3374b', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_82c08468-3f63-42e5-8964-8ef7defd7b68', 'Станция метро "Космонавтлар"', 'г. Ташкент, Мирабадский район, улица Афросиаб', 41.2994717, 69.2718483, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9b52ef76-fe54-45c5-8c5d-f0a0dc8dffd9', 'Картомат MS0072', 'MS0072', 'operational', 'cardomat', 'site_82c08468-3f63-42e5-8964-8ef7defd7b68', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5f88e61c-e1b7-4145-a1c0-7cfbcc25690e', 'Станция метро "Тошкент"', 'г. Ташкент, Мирабадский район, улица Туркистан', 41.317731, 69.2543957, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_8d293fd7-c9ff-444c-b4b4-505dce8b7cfb', 'Картомат MS0074', 'MS0074', 'operational', 'cardomat', 'site_5f88e61c-e1b7-4145-a1c0-7cfbcc25690e', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_84b41fb7-8601-4f44-b060-d83cc0c1ee6d', 'Станция метро "Дустлик"', 'г. Ташкент, Яшнабадский район, улица Эльбека', 41.2993545, 69.296602, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_51b5ccf6-b026-48e6-9443-e73cc2c96659', 'Картомат MS0075', 'MS0075', 'operational', 'cardomat', 'site_84b41fb7-8601-4f44-b060-d83cc0c1ee6d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_a9883d41-f46d-4bcf-9074-3b9c3f123b01', 'БЦ Галлеон (тестовая точка, на парковке)', 'г. Ташкент', 41.3123363, 69.2787079, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b3c1f147-a736-49a8-ad5f-d67cb16f051d', 'Картомат MS0036', 'MS0036', 'operational', 'cardomat', 'site_a9883d41-f46d-4bcf-9074-3b9c3f123b01', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_889d858e-7ddd-449e-806f-da40839f8661', 'Riviera ТРЦ', 'г. Ташкент, Алмазарский район, ул. Нодиры, 4', 41.3398744, 69.2542116, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_99f95ed5-c00f-4393-b276-e6dbfe4d5c56', 'Картомат MS0001', 'MS0001', 'operational', 'cardomat', 'site_889d858e-7ddd-449e-806f-da40839f8661', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_32728afd-bdcc-49a2-8956-07afac517f93', 'Scopus Mall', 'г. Ташкент, Учтепинский район, ул. Фархадская, Г30 блок 15', 41.2862938, 69.1861875, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_d1c321a4-e7ad-483b-b5a6-84a98547b40c', 'Картомат MS0011', 'MS0011', 'operational', 'cardomat', 'site_32728afd-bdcc-49a2-8956-07afac517f93', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_45533f4e-0122-4759-8cea-06562c928cb7', 'Лукойл', 'Ташкентская обл., г. Янгиюль, ул. Дустлик, МФЙ Нуробод, дом 85', 41.3106899, 69.3469959, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_67487d43-3cd1-49c4-bd25-6514a0fd89d0', 'Картомат MS0017', 'MS0017', 'operational', 'cardomat', 'site_45533f4e-0122-4759-8cea-06562c928cb7', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_0286f0e5-cd29-4d99-99a9-b9896ad677ff', 'ТРЦ "Карасу-Плаза"', 'г. Ташкент, Яшнабадский район, улица Авиасозлар', 41.2942625, 69.3434007, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a738fe64-3d46-4f8c-a73f-0315070abbf4', 'Картомат MS0027', 'MS0027', 'operational', 'cardomat', 'site_0286f0e5-cd29-4d99-99a9-b9896ad677ff', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_e861a426-1c14-458e-8d73-2e7ef608afef', 'МФЦ на ул. Талабалар, 54', 'г. Ташкент, Алмазарский район, улица Талабалар, 54', 41.3474617, 69.2146815, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_241949bf-42d9-485d-99e5-1a0e492aa4a0', 'Картомат MS0028', 'MS0028', 'operational', 'cardomat', 'site_e861a426-1c14-458e-8d73-2e7ef608afef', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b1d48419-ad3d-4c43-ab63-ca6f24360775', 'Chigatoy', 'г. Ташкент, Алмазарский район, ул. Нурафшан, 7а', 41.33847, 69.2553748, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_f8c2eb02-4440-4a73-98f5-d2774ba316f5', 'Картомат MS0039', 'MS0039', 'operational', 'cardomat', 'site_b1d48419-ad3d-4c43-ab63-ca6f24360775', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_de1d033e-9afe-4d23-9290-cf3e52de7a4a', 'ATLAS Караташ', 'г. Ташкент, Шайхантахурский район, пр. Коратош, 11А', 41.3188398, 69.2347, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_68a51d45-468c-4cc6-8f7d-27f5da5d2df8', 'Картомат MS0048', 'MS0048', 'operational', 'cardomat', 'site_de1d033e-9afe-4d23-9290-cf3e52de7a4a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_d0d3932f-212d-4301-9fa6-37c7cb54e0fd', 'Makro - 007', 'г. Ташкент, Чиланзарский район, ул. Чиланзар, 55', 41.2894928, 69.2337076, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b9345117-3ccc-4c91-a1e8-dae3ae0a5617', 'Картомат MS0051', 'MS0051', 'operational', 'cardomat', 'site_d0d3932f-212d-4301-9fa6-37c7cb54e0fd', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_948009ee-daa8-4188-933d-b2c7848afa55', 'Mediapark Сергели', 'г. Ташкент, Сергели, Медиапарк, д.110', 41.2263529, 69.2208328, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_5dd6abc4-f0da-4158-9b8a-b025e8d86913', 'Картомат MS0053', 'MS0053', 'operational', 'cardomat', 'site_948009ee-daa8-4188-933d-b2c7848afa55', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_cd9b1ccb-451e-491c-86fc-1cd1dd8a1910', 'Media Park (Ц5)', 'г. Ташкент, Юнусабадский район, ул. Ш.Рашидова 16A', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c3f7d647-4801-43ac-bb22-ed45da283d6c', 'Картомат MS0057', 'MS0057', 'operational', 'cardomat', 'site_cd9b1ccb-451e-491c-86fc-1cd1dd8a1910', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f627d003-98db-4827-ae77-c01983aa7a89', 'м-в Катартал, 28', 'г. Ташкент', 41.3123363, 69.2787079, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_84bd9b4f-64c7-451f-9c70-8073c5f00180', 'Картомат MS0058', 'MS0058', 'operational', 'cardomat', 'site_f627d003-98db-4827-ae77-c01983aa7a89', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_39f0cd45-4f49-4d76-b3c2-69916560fb84', 'Лукойл', 'г. Ташкент, Мирзо-Улугбекский район, махаллинский сход граждан Кухна Мевазар', 41.3106899, 69.3469959, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_563be37a-c519-475e-b355-d17e32eb8167', 'Картомат MS0059', 'MS0059', 'operational', 'cardomat', 'site_39f0cd45-4f49-4d76-b3c2-69916560fb84', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_91e4af38-9cbc-4936-8557-5751dcddad27', 'Корзинка Mercato (Малика)', 'г. Ташкент, Шайхантахурский район, махаллинский сход граждан Кукча, Малая кольцевая дорога, 57', 41.3119437, 69.2534057, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_9dccae16-ce4d-45bc-a8b2-333913213ac3', 'Картомат MS0063', 'MS0063', 'operational', 'cardomat', 'site_91e4af38-9cbc-4936-8557-5751dcddad27', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_b686637e-fd83-4f09-9ecc-aa3bb6bc9ebc', 'Макро Махтумкули', 'г. Ташкент, Яшнабадский район, махаллинский сход граждан Фидойилар', 41.3038609, 69.3224516, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a6100af4-2e16-4c86-b4cb-15489bd3b318', 'Картомат MS0065', 'MS0065', 'operational', 'cardomat', 'site_b686637e-fd83-4f09-9ecc-aa3bb6bc9ebc', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_1f914773-69c7-4dea-a334-823f7c983604', 'Алайский "Gold Center"', 'г. Ташкент, Юнусабадский район, Алайский рынок, проспект Амира Темура, 40н', 41.3514862, 69.2989687, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b3909e73-7547-419e-8f2d-ca26fdc6147b', 'Картомат MS0069', 'MS0069', 'operational', 'cardomat', 'site_1f914773-69c7-4dea-a334-823f7c983604', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_6f0a1410-545d-47f0-b3e8-7ad8e83e737e', 'ТЦ "Compass"', 'г. Ташкент, Бектемирский район, улица Большая кольцевая дорога, 17, метро Куйлюк', 41.2548876, 69.3740922, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_b15d5da5-941e-4c1e-831e-80ad51582b37', 'Картомат MS0049', 'MS0049', 'operational', 'cardomat', 'site_6f0a1410-545d-47f0-b3e8-7ad8e83e737e', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_09e106ff-0691-4827-825d-47ca9b9f763a', 'VEGA CENTRE', 'г. Ташкент, Яккасарайский район, ул. Шота Руставели, 150', 41.2781735, 69.2453777, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_1385f596-2e56-41f0-9f4c-93a58cbddb7d', 'Картомат MS0005', 'MS0005', 'operational', 'cardomat', 'site_09e106ff-0691-4827-825d-47ca9b9f763a', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fd03e5ad-5c82-4ac4-88ca-7d419392548d', 'ТРЦ "Golden Life"', 'г. Ташкент, Сергелийский район, ул. Мирзы Турсунзаде, 14', 41.2464509, 69.2369048, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_36cea7d1-288b-4063-b85d-2613d2bf9236', 'Картомат MS0030', 'MS0030', 'operational', 'cardomat', 'site_fd03e5ad-5c82-4ac4-88ca-7d419392548d', 'ORG_ID_HERE', 'ПРИБЛИЗИТЕЛЬНО — не найден точный адрес, точка поставлена по центру района, уточните вручную', now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f90d326d-ce46-4c14-a6dd-408a1f538519', 'ПВЗ ТАШ-3 (Korzinka)', 'г. Ташкент, Юнусабадский район, квартал 14, улица Ахмада Дониша', 41.3704724, 69.2942674, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_c1de2f8e-6f68-4c6b-8175-f74a75ad261f', 'Картомат MS0035', 'MS0035', 'operational', 'cardomat', 'site_f90d326d-ce46-4c14-a6dd-408a1f538519', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_fda8c213-e649-4577-8673-ed37c1ec1f1d', 'МФЦ', 'Ташкент, Юнусабадский район, ул. Богишамол, 110', 41.3399821, 69.2956489, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_dc3d3bc9-17bc-4193-81f2-e8441940be31', 'Картомат MS0071', 'MS0071', 'operational', 'cardomat', 'site_fda8c213-e649-4577-8673-ed37c1ec1f1d', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_ce63c46a-3a5f-4bdb-8d6d-bf416fcd13ec', 'ТЦ "OAZIS CITY"', 'г. Ташкент, ул. Лутфи, 21А', 41.2858778, 69.1859597, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_44c9466a-4384-48cc-b27a-4380ee7cde82', 'Картомат MS0012', 'MS0012', 'operational', 'cardomat', 'site_ce63c46a-3a5f-4bdb-8d6d-bf416fcd13ec', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_5a24913d-8a69-49e3-8528-cab397fbed85', 'МФЦ', 'г. Ташкент, Чиланзарский район, улица Бунёдкор, 7 Г', 41.3118987, 69.2430959, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_62566e7c-9805-4ead-a320-07baa261dbd0', 'Картомат MS0067', 'MS0067', 'operational', 'cardomat', 'site_5a24913d-8a69-49e3-8528-cab397fbed85', 'ORG_ID_HERE', NULL, now());

INSERT INTO "Site" (id, name, address, lat, lng, "organizationId", "createdAt") VALUES ('site_f847717e-ce9d-44a9-bd12-6e77ff359ca3', 'МФЦ на Чорсу 2', 'г. Ташкент, площадь Чорсу', 41.322457, 69.2364951, 'ORG_ID_HERE', now());
INSERT INTO "Equipment" (id, name, "serialNumber", status, "deviceType", "siteId", "organizationId", notes, "createdAt") VALUES ('eq_a3f5c9d1-8b6e-4f2a-9c7d-1e5b8a4f6d2c', 'Картомат MS0021', 'MS0021', 'operational', 'cardomat', 'site_f847717e-ce9d-44a9-bd12-6e77ff359ca3', 'ORG_ID_HERE', NULL, now());

COMMIT;