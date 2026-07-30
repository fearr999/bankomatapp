# Corpi

Field Service Management платформа: диспетчерский центр, заявки с полным
жизненным циклом, сотрудники и бригады, карта в реальном времени — см.
[`platform/README.md`](platform/README.md) для стека, что уже готово и
дорожную карту оставшихся модулей.

Старая пилотная версия (Flutter-приложение мерчендайзинга поверх Google
Apps Script/Sheets) удалена из репозитория — вся разработка идёт в
`platform/`. История старого кода осталась в git, при необходимости
восстановить: `git log --diff-filter=D --summary | grep -A5 "delete mode"`
покажет коммит удаления, откатить можно через `git revert`.

## Быстрый старт

```bash
cd platform/api
cp .env.example .env      # DATABASE_URL + JWT_SECRET
npm install
npm run prisma:migrate
npm run seed
npm run dev                # http://localhost:4000

cd ../web
cp .env.local.example .env.local
npm install
npm run dev                # http://localhost:3000
```

Тестовый вход: `admin@fsm.local` / `password123`.
