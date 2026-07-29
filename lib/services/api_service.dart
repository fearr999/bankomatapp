import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http/io_client.dart';

import '../config/app_config.dart';

/// Единая точка обращения к Apps Script backend.
/// Все запросы — POST на один и тот же URL с полем `action` в теле,
/// как описано в ТЗ (doPost диспетчер).
class ApiService {
  // Google Apps Script /exec всегда делает промежуточный 302-редирект.
  // Стандартный http.post() не следует за редиректами при POST,
  // поэтому используем IOClient с явным followRedirects.
  static http.Client _makeClient() {
    final inner = HttpClient()
      ..followRedirects = true
      ..maxRedirects = 5;
    return IOClient(inner);
  }

  static Future<Map<String, dynamic>> _post(Map<String, dynamic> body) async {
    final payload = {
      ...body,
      'apiKey': AppConfig.apiKey, // проверяется в Code.gs
    };

    final client = _makeClient();
    try {
      final response = await client
          .post(
            Uri.parse(AppConfig.apiBaseUrl),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(payload),
          )
          .timeout(AppConfig.httpTimeout);

      if (response.statusCode != 200) {
        throw Exception('Сервер вернул ошибку: ${response.statusCode}');
      }

      final decoded = jsonDecode(response.body) as Map<String, dynamic>;
      if (decoded['status'] == 'error') {
        throw Exception(decoded['message'] ?? 'Неизвестная ошибка сервера');
      }
      return decoded;
    } finally {
      client.close();
    }
  }

  static Future<Map<String, dynamic>> login(String pin) {
    return _post({'action': 'login', 'pin': pin});
  }

  static Future<Map<String, dynamic>> getBusinesses(String token) {
    return _post({'action': 'getBusinesses', 'token': token});
  }

  static Future<Map<String, dynamic>> getTasks(
      String userId, String token, String businessId) {
    return _post({
      'action': 'getTasks',
      'userId': userId,
      'token': token,
      'businessId': businessId,
    });
  }

  static Future<Map<String, dynamic>> submitCheckIn({
    required String userId,
    required String token,
    required String storeId,
    required String checkInTime,
    required double lat,
    required double lng,
    required double distanceError,
    required bool isMockLocation,
    required String localId,
    String? businessId,
  }) {
    return _post({
      'action': 'submitCheckIn',
      'userId': userId,
      'token': token,
      'storeId': storeId,
      'checkInTime': checkInTime,
      'lat': lat,
      'lng': lng,
      'distanceError': distanceError,
      'isMockLocation': isMockLocation,
      'localId': localId, // сервер эхом вернёт его — так клиент сматчит logId
      'businessId': businessId,
    });
  }

  static Future<Map<String, dynamic>> submitCheckOut({
    required String token,
    required String logId,
    required String checkOutTime,
    required String comment,
  }) {
    return _post({
      'action': 'submitCheckOut',
      'token': token,
      'logId': logId,
      'checkOutTime': checkOutTime,
      'comment': comment,
    });
  }

  static Future<Map<String, dynamic>> submitReport({
    required String token,
    required String logId,
    required List<Map<String, dynamic>> items,
  }) {
    return _post({
      'action': 'submitReport',
      'token': token,
      'logId': logId,
      'items': items,
    });
  }

  /// Генерик-отчёт для не-мерч бизнесов (например, чек-лист банкомата) —
  /// answers — произвольная карта {fieldId: значение}, схему полей
  /// определяет Business.checklistSchema.
  static Future<Map<String, dynamic>> submitChecklist({
    required String token,
    required String logId,
    required String businessId,
    required Map<String, dynamic> answers,
  }) {
    return _post({
      'action': 'submitChecklist',
      'token': token,
      'logId': logId,
      'businessId': businessId,
      'answers': answers,
    });
  }

  /// Фото уходит base64-строкой в JSON-теле (см. лимит 50MB/запрос у Apps Script
  /// URL Fetch/doPost — сжатое фото ~200-400KB, это далеко не предел).
  static Future<Map<String, dynamic>> uploadPhoto({
    required String token,
    required String logId,
    required String type, // Before | After
    required File file,
    required String timestamp,
  }) async {
    final bytes = await file.readAsBytes();
    final base64Data = base64Encode(bytes);
    return _post({
      'action': 'uploadPhoto',
      'token': token,
      'logId': logId,
      'type': type,
      'timestamp': timestamp,
      'fileBase64': base64Data,
      'mimeType': 'image/jpeg',
    });
  }

  static Future<Map<String, dynamic>> getAdminStatus(String token) {
    return _post({'action': 'getAdminStatus', 'token': token});
  }

  /// Сводка по всем цикловым бизнесам (например банкоматам) — прогресс
  /// каждой бригады/работника и список ещё не закрытых устройств.
  static Future<Map<String, dynamic>> getCycleOverview(String token) {
    return _post({'action': 'getCycleOverview', 'token': token});
  }
}
