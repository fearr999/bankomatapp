# Чек-лист: что сделать руками, чтобы всё заработало

Живой список. Пополняется по ходу разработки — сверяйтесь перед тем, как
объявлять проект готовым. Всё, что тут отмечено «опционально», не ломает
остальную систему, если не сделано — соответствующая фича просто выключена.

## 1. Деплой

- [ ] Убедиться, что автодеплой `platform/api` (Railway) подписан на ветку `main`
- [ ] Убедиться, что автодеплой `platform/web` подписан на ветку `main`
- [ ] Убедиться, что автодеплой `platform/landing` подписан на ветку `main`
- [ ] После **каждого** мержа, где есть новая папка в `platform/api/prisma/migrations/` —
      накатить её на продовую БД: `npx prisma migrate deploy` (через Railway
      Shell/CLI, или дать доступ к прод `DATABASE_URL`)
      - [ ] Сейчас как минимум одна неприменённая: `GoogleSheetIntegration`
            (см. раздел «Google Таблицы» ниже)

## 2. Обязательные переменные (`platform/api`, без них API не запустится)

- [ ] `DATABASE_URL`
- [ ] `JWT_SECRET` — длинная случайная строка

## 3. Опциональные интеграции — по одной галочке на переменную

**Telegram-уведомления о заявках**
- [ ] `TELEGRAM_BOT_TOKEN` (получить у @BotFather)

**Support-бот** (кнопка «Написать в Telegram» на экране истёкшего триала)
- [ ] `TELEGRAM_SUPPORT_BOT_TOKEN`
- [ ] `TELEGRAM_SUPPORT_ADMIN_CHAT_ID` (необязательно — без него бот отвечает клиенту, но не дублирует вам)

**Email-уведомления**
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

**Нативный push в мобильном приложении (FCM)**
- [ ] `FIREBASE_SERVICE_ACCOUNT` (JSON-ключ сервисного аккаунта Firebase, одной строкой)

**Web Push (браузер/PWA)**
- [ ] `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` — сгенерировать: `npx web-push generate-vapid-keys`
- [ ] `VAPID_SUBJECT` (mailto:... — необязательно, есть дефолт)

**Google Таблицы** (авто-трекер уборки банкоматов, раздел «Интеграции»)
- [ ] Создать проект в console.cloud.google.com
- [ ] Включить в нём Google Sheets API и Google Drive API
- [ ] Создать Service Account, скачать JSON-ключ
- [ ] `GOOGLE_SERVICE_ACCOUNT` — содержимое JSON-ключа одной строкой
- [ ] `API_PUBLIC_URL` (необязательно, но без него не будет превью фото в таблице) — публичный адрес самого API, например `https://api.thecorpi.com`
- [ ] Накатить миграцию `GoogleSheetIntegration` на прод БД (см. пункт 1)

**Панель владельца платформы** (`app.thecorpi.com/owner`)
- [ ] `PLATFORM_ADMIN_SECRET` — длинная случайная строка

**Безопасность (рекомендуется для прода)**
- [ ] `CORS_ORIGINS` — реальные домены фронтендов через запятую, например
      `https://thecorpi.com,https://app.thecorpi.com` (без этого CORS открыт для всех)

## 4. Мобильное приложение (нативный .apk)

- [ ] После дизайн-изменений в `platform/mobile` пересобрать APK:
      GitHub → **Actions → Build mobile APK → Run workflow**, указать боевой `api_url`
- [ ] Debug-сборка ставится через «разрешить установку из неизвестных источников»;
      для публикации в Google Play нужен отдельный release-ключ (сейчас не настроен)

## 5. Публичные адреса фронтендов (сверить, что прописаны верно)

- [ ] `platform/web`: `NEXT_PUBLIC_API_URL` → прод-адрес API
- [ ] `platform/mobile`: `NEXT_PUBLIC_API_URL` → прод-адрес API
- [ ] `platform/landing`: `NEXT_PUBLIC_APP_URL` → прод-адрес `app.thecorpi.com`

---

_Дальше буду дописывать сюда по ходу работы — не нужно спрашивать заново,_
_просто загляните в этот файл перед финальным запуском._
