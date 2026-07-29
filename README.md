# Merchandiser App — тестовый пилот (Android, бесплатно)

Мобильное приложение мерчендайзинга: GPS check-in, учёт SKU, фотоотчёты
"До/После" (только с камеры), offline-очередь с автосинхронизацией.
Backend — Google Apps Script + Google Sheets + Google Drive (без единого
доллара расходов при 2-5 тестовых пользователях).

## Важно — что я не могу сделать в этом чате

У среды, где я собираю файлы, нет Android SDK и нет доступа к серверам
Google (maven/dl.google.com), поэтому **скомпилировать готовый .apk прямо
здесь я не могу**. Зато я подготовил всё так, чтобы вы получили рабочий
APK за 5-10 минут без установки Android Studio — через GitHub Actions
(бесплатно, см. Шаг 3 ниже).

## Структура проекта

```
merchandiser_app/
├── lib/                     # весь Dart/Flutter код приложения
│   ├── config/app_config.dart   # <-- сюда впишете URL backend и API-ключ
│   ├── models/models.dart
│   ├── services/                # API, БД, геолокация, фото, синхронизация
│   └── screens/                 # логин, маршрут, визит, SKU, фото
├── pubspec.yaml
├── backend/
│   ├── Code.gs               # backend на Google Apps Script
│   └── SHEETS_SETUP.md       # как настроить Google Sheets и задеплоить Code.gs
└── .github/workflows/build-apk.yml   # автосборка APK в облаке, бесплатно
```

## Шаг 1 — настройте backend (10-15 минут)

Следуйте `backend/SHEETS_SETUP.md` от начала до конца:
1. Создать Google Таблицу с листами `Users/Stores/Products/Tasks/...`.
2. Вставить `backend/Code.gs` в Apps Script, привязанный к таблице.
3. Задать Script Properties: `API_KEY`, `DRIVE_FOLDER_ID`.
4. Задеплоить как Web App, скопировать URL.

## Шаг 2 — впишите настройки в приложение

Откройте `lib/config/app_config.dart` и замените:
```dart
static const String apiBaseUrl = 'ВСТАВЬТЕ_СЮДА_URL_ВАШЕГО_APPS_SCRIPT_ДЕПЛОЯ';
static const String apiKey = 'CHANGE_ME_SECRET_KEY_2026';
```
на реальные значения из Шага 1 (тот же `API_KEY`, что в Script Properties).

## Шаг 3 — получите APK (бесплатно, без Android Studio)

**Вариант А — GitHub Actions (рекомендую):**
1. Создайте бесплатный репозиторий на github.com, залейте туда всю папку
   `merchandiser_app` (включая `.github/workflows/build-apk.yml`).
2. GitHub Actions запустится автоматически при пуше. Если нет — откройте
   вкладку **Actions** в репозитории -> workflow **Build Android APK** ->
   **Run workflow**.
3. Через 3-7 минут в этом же запуске появится **Artifacts** ->
   `merchandiser-app-apk` — скачайте zip, внутри `app-release.apk`.
4. Перекиньте APK на Android-телефон (через USB, Telegram себе, Google Drive
   и т.п.), включите "Установка из неизвестных источников" и установите.

Это использует бесплатные минуты GitHub Actions (публичные репозитории —
безлимитно; приватные — 2000 минут/мес бесплатно, сборка занимает ~5 минут).

**Вариант Б — локально, если у вас уже есть Flutter:**
```bash
flutter create --platforms=android .   # сгенерирует папку android/ рядом с lib/
flutter pub get
flutter build apk --release
# apk появится в build/app/outputs/flutter-apk/app-release.apk
```

## Права доступа приложения (Android)

Если собираете через **GitHub Actions (Вариант А)** — ничего делать не нужно,
workflow сам добавляет нужные разрешения (камера, геолокация, интернет) в
`AndroidManifest.xml` на этапе сборки.

Если собираете **локально (Вариант Б)** — после `flutter create` добавьте
вручную в `android/app/src/main/AndroidManifest.xml` перед `<application>`:
```xml
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.INTERNET"/>
```

## Как тестировать (2-5 мерчендайзеров)

1. В листе `Users` — по строке на каждого тестировщика с уникальным PIN.
2. В листе `Tasks` — на каждый день впишите, кому какую точку назначить
   (`Scheduled_Date` = сегодня).
3. Раздайте APK, каждый входит по своему PIN, видит только свои точки.
4. Проверяете результат прямо в Google Таблице — листы `Visits_Log`,
   `Report_Details`, `Photos` заполняются в реальном времени.
5. Для проверки офлайн-режима: включите авиарежим перед check-in — данные
   уйдут в локальную очередь и отправятся сами, когда сеть вернётся
   (или по кнопке синхронизации в правом верхнем углу).

## Известные ограничения текущей версии (осознанно, для скорости MVP)

- Экран администратора — минимальный (`getAdminStatus` в backend есть,
  экран под него в `lib/screens/` пока не добавлен — легко доращивается).
- Фоновый геотрекинг (раз в 10-15 минут) не реализован — в тесте на
  2-5 человек в нём нет необходимости, а для iOS он рискован с точки
  зрения App Store review, для Android съедает батарею. Основной метод
  контроля — check-in/check-out, он есть и работает.
- Блокировка Mock Location — определяется через `Position.isMocked`
  (Android), сервер также помечает такие визиты статусом
  `Mock_Location_Flagged`, но не блокирует их полностью — это сознательное
  решение для пилота, чтобы не терять полезные данные из-за ложных
  срабатываний; ужесточить логику легко в `handleSubmitCheckIn_`.
- iOS-сборка не входит в эту версию — только Android APK.

## Дальнейший рост (после теста)

Если тест пройдёт хорошо и команда вырастет за 15-20 человек — см.
рекомендацию миграции `Visits_Log/Report_Details/Photos` на Firebase
(Spark free tier), обсуждённую ранее. Каталоги (`Users/Stores/Products`)
можно оставить в Sheets — админ продолжит редактировать их в привычном
интерфейсе.
