import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:connectivity_plus/connectivity_plus.dart';

import 'api_service.dart';
import 'db_service.dart';
import 'auth_service.dart';
import '../config/app_config.dart';

/// Пробегает по локальной очереди (визиты -> отчёты -> фото) и
/// пытается отправить всё, что ещё не подтверждено сервером.
/// Запускается таймером и вручную (например, кнопкой "Синхронизировать").
class SyncService {
  static Timer? _timer;

  static void start() {
    _timer?.cancel();
    _timer = Timer.periodic(
      Duration(seconds: AppConfig.syncIntervalSeconds),
      (_) => syncNow(),
    );
  }

  static void stop() => _timer?.cancel();

  static Future<bool> _hasConnection() async {
    final result = await Connectivity().checkConnectivity();
    return !result.contains(ConnectivityResult.none);
  }

  /// Основная точка входа. Безопасно вызывать многократно —
  /// уже синхронизированные записи пропускаются.
  static Future<SyncSummary> syncNow() async {
    final summary = SyncSummary();
    if (!await _hasConnection()) {
      summary.skippedNoConnection = true;
      return summary;
    }

    final token = await AuthService.getToken();
    if (token == null) {
      summary.skippedNoAuth = true;
      return summary;
    }

    final db = DbService.instance;

    // 1. Визиты (check-in), у которых ещё нет serverLogId
    final visits = await db.unsyncedVisits();
    for (final v in visits) {
      try {
        final res = await ApiService.submitCheckIn(
          userId: v['userId'],
          token: token,
          storeId: v['storeId'],
          checkInTime: v['checkInTime'],
          lat: v['checkInLat'],
          lng: v['checkInLng'],
          distanceError: v['distanceErrorMeters'],
          isMockLocation: v['isMockLocation'] == 1,
          localId: v['localId'],
          businessId: v['businessId'] as String?,
        );
        final logId = res['logId'] as String;
        await db.markVisitSynced(v['localId'], serverLogId: logId);
        summary.visitsSynced++;

        // Если визит уже закрыт локально (checkOutTime заполнен) — сразу отправим checkout
        if (v['checkOutTime'] != null &&
            (v['checkOutTime'] as String).isNotEmpty) {
          await ApiService.submitCheckOut(
            token: token,
            logId: logId,
            checkOutTime: v['checkOutTime'],
            comment: v['comment'] ?? '',
          );
        }
      } catch (e) {
        if (e.toString().contains('уже отмечено в текущем цикле')) {
          // Не настоящая ошибка — устройство уже закрыто (например,
          // с другого захода). Останавливаем бесконечные повторы.
          await db.markVisitSynced(v['localId']);
        } else {
          summary.errors.add('Визит ${v['localId']}: $e');
        }
      }
    }

    // 2. Отчёты по товарам — привязаны к visitLocalId, шлём только если
    //    у визита уже есть serverLogId
    final reports = await db.unsyncedReports();
    for (final r in reports) {
      final visit = await db.getVisit(r['visitLocalId']);
      final logId = visit?['serverLogId'];
      if (logId == null) continue; // сначала должен синхнуться сам визит
      try {
        final items =
            (jsonDecode(r['payloadJson']) as List).cast<Map<String, dynamic>>();
        await ApiService.submitReport(token: token, logId: logId, items: items);
        await db.markReportSynced(r['id']);
        summary.reportsSynced++;
      } catch (e) {
        summary.errors.add('Отчёт #${r['id']}: $e');
      }
    }

    // 3. Генерик-чек-листы (не-мерч бизнесы, например банкоматы)
    final checklists = await db.unsyncedChecklists();
    for (final c in checklists) {
      final visit = await db.getVisit(c['visitLocalId']);
      final logId = visit?['serverLogId'];
      if (logId == null) continue;
      try {
        final answers =
            jsonDecode(c['payloadJson']) as Map<String, dynamic>;
        await ApiService.submitChecklist(
          token: token,
          logId: logId,
          businessId: c['businessId'],
          answers: answers,
        );
        await db.markChecklistSynced(c['id']);
        summary.reportsSynced++;
      } catch (e) {
        summary.errors.add('Чек-лист #${c['id']}: $e');
      }
    }

    // 4. Фото
    final photos = await db.unsyncedPhotos();
    for (final p in photos) {
      final visit = await db.getVisit(p['visitLocalId']);
      final logId = visit?['serverLogId'];
      if (logId == null) continue;
      try {
        final file = File(p['filePath']);
        if (!await file.exists()) {
          await db.markPhotoSynced(p['id']); // файл потерян — не блокируем очередь
          continue;
        }
        await ApiService.uploadPhoto(
          token: token,
          logId: logId,
          type: p['type'],
          file: file,
          timestamp: p['timestamp'],
        );
        await db.markPhotoSynced(p['id']);
        summary.photosSynced++;
      } catch (e) {
        summary.errors.add('Фото #${p['id']}: $e');
      }
    }

    return summary;
  }
}

class SyncSummary {
  int visitsSynced = 0;
  int reportsSynced = 0;
  int photosSynced = 0;
  bool skippedNoConnection = false;
  bool skippedNoAuth = false;
  List<String> errors = [];

  bool get hasWork => visitsSynced + reportsSynced + photosSynced > 0;
}
