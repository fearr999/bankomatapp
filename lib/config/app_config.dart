/// Все настройки проекта собраны в одном месте — после деплоя
/// Apps Script впишите сюда свой URL и ключ.
class AppConfig {
  // URL, который выдаёт Google после деплоя Apps Script как Web App.
  // Пример: https://script.google.com/macros/s/AKfycb.../exec
  static const String apiBaseUrl =
      'https://script.google.com/macros/s/AKfycbz80IFObtihjGBt_ZJuc1XQQmEJwDySgui9QKXLhrcqJzItUWMQBEBJW4k6oCGzTmCeeg/exec';

  // Секретный ключ — совпадает с API_KEY в Script Properties бэкенда.
  static const String apiKey = 'zBnv0zhEoJwax7moJXgrTyqg_lTAA3LW';

  // Радиус допустимого GPS check-in по умолчанию (метры).
  // Реальное значение по каждой точке приходит с сервера (Stores.Allowed_Radius_Meters),
  // это just fallback, если сервер его не передал.
  static const double defaultCheckInRadiusMeters = 100;

  // Сжатие фото перед отправкой
  static const int photoMaxWidth = 1920;
  static const int photoMaxHeight = 1080;
  static const int photoQuality = 78;

  // Интервал автосинхронизации офлайн-очереди (секунды)
  static const int syncIntervalSeconds = 60;

  // Таймаут HTTP-запросов
  static const Duration httpTimeout = Duration(seconds: 30);
}
