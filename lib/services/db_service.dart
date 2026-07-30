import 'dart:convert';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

/// Локальная SQLite-БД устройства.
/// Здесь живёт офлайн-очередь: визиты, отчёты по товарам и фото,
/// которые ещё не подтверждены сервером (Apps Script).
class DbService {
  DbService._();
  static final DbService instance = DbService._();
  Database? _db;

  Future<Database> get db async {
    _db ??= await _init();
    return _db!;
  }

  Future<Database> _init() async {
    final path = join(await getDatabasesPath(), 'merchandiser_local.db');
    return openDatabase(
      path,
      version: 4,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE visits (
            localId TEXT PRIMARY KEY,
            serverLogId TEXT,
            userId TEXT,
            storeId TEXT,
            businessId TEXT,
            checkInTime TEXT,
            checkOutTime TEXT,
            checkInLat REAL,
            checkInLng REAL,
            distanceErrorMeters REAL,
            isMockLocation INTEGER,
            comment TEXT,
            status TEXT,
            synced INTEGER
          )
        ''');
        await db.execute('''
          CREATE TABLE report_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visitLocalId TEXT,
            payloadJson TEXT,
            synced INTEGER
          )
        ''');
        await db.execute('''
          CREATE TABLE photo_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visitLocalId TEXT,
            businessId TEXT,
            type TEXT,
            filePath TEXT,
            timestamp TEXT,
            synced INTEGER
          )
        ''');
        await db.execute('''
          CREATE TABLE cached_tasks (
            taskId TEXT PRIMARY KEY,
            payloadJson TEXT,
            fetchedAt TEXT
          )
        ''');
        await db.execute('''
          CREATE TABLE cached_businesses (
            businessId TEXT PRIMARY KEY,
            payloadJson TEXT,
            fetchedAt TEXT
          )
        ''');
        await db.execute('''
          CREATE TABLE checklist_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visitLocalId TEXT,
            businessId TEXT,
            payloadJson TEXT,
            synced INTEGER
          )
        ''');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 4) {
          await db.execute(
              'ALTER TABLE photo_queue ADD COLUMN businessId TEXT DEFAULT ""');
        }
        if (oldVersion < 3) {
          await db.execute(
              'ALTER TABLE visits ADD COLUMN businessId TEXT DEFAULT ""');
        }
        if (oldVersion < 2) {
          await db.execute('''
            CREATE TABLE IF NOT EXISTS cached_businesses (
              businessId TEXT PRIMARY KEY,
              payloadJson TEXT,
              fetchedAt TEXT
            )
          ''');
          await db.execute('''
            CREATE TABLE IF NOT EXISTS checklist_queue (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              visitLocalId TEXT,
              businessId TEXT,
              payloadJson TEXT,
              synced INTEGER
            )
          ''');
        }
      },
    );
  }

  // ---------- Visits ----------
  Future<void> upsertVisit(Map<String, dynamic> visit) async {
    final d = await db;
    await d.insert('visits', visit,
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Map<String, dynamic>>> unsyncedVisits() async {
    final d = await db;
    return d.query('visits', where: 'synced = 0');
  }

  Future<Map<String, dynamic>?> getVisit(String localId) async {
    final d = await db;
    final rows = await d.query('visits',
        where: 'localId = ?', whereArgs: [localId], limit: 1);
    return rows.isEmpty ? null : rows.first;
  }

  // ---------- Report queue ----------
  Future<void> queueReport(String visitLocalId, String payloadJson) async {
    final d = await db;
    await d.insert('report_queue', {
      'visitLocalId': visitLocalId,
      'payloadJson': payloadJson,
      'synced': 0,
    });
  }

  Future<List<Map<String, dynamic>>> unsyncedReports() async {
    final d = await db;
    return d.query('report_queue', where: 'synced = 0');
  }

  Future<void> markReportSynced(int id) async {
    final d = await db;
    await d.update('report_queue', {'synced': 1},
        where: 'id = ?', whereArgs: [id]);
  }

  // ---------- Photo queue ----------
  Future<void> queuePhoto(String visitLocalId, String type, String filePath,
      String ts, {String businessId = ''}) async {
    final d = await db;
    await d.insert('photo_queue', {
      'visitLocalId': visitLocalId,
      'businessId': businessId,
      'type': type,
      'filePath': filePath,
      'timestamp': ts,
      'synced': 0,
    });
  }

  Future<List<Map<String, dynamic>>> unsyncedPhotos() async {
    final d = await db;
    return d.query('photo_queue', where: 'synced = 0');
  }

  Future<void> markPhotoSynced(int id) async {
    final d = await db;
    await d.update('photo_queue', {'synced': 1},
        where: 'id = ?', whereArgs: [id]);
  }

  Future<void> markVisitSynced(String localId, {String? serverLogId}) async {
    final d = await db;
    final values = <String, dynamic>{'synced': 1};
    if (serverLogId != null) values['serverLogId'] = serverLogId;
    await d.update('visits', values,
        where: 'localId = ?', whereArgs: [localId]);
  }

  // ---------- Cached tasks (для просмотра маршрута офлайн) ----------
  Future<void> cacheTasks(List<Map<String, dynamic>> tasks) async {
    final d = await db;
    final batch = d.batch();
    batch.delete('cached_tasks');
    final now = DateTime.now().toIso8601String();
    for (final t in tasks) {
      batch.insert('cached_tasks', {
        'taskId': t['taskId'].toString(),
        'payloadJson': jsonEncode(t),
        'fetchedAt': now,
      });
    }
    await batch.commit(noResult: true);
  }

  /// Возвращает закэшированные задачи маршрута (для просмотра офлайн)
  Future<List<Map<String, dynamic>>> getCachedTasks() async {
    final d = await db;
    final rows = await d.query('cached_tasks');
    return rows
        .map((r) => jsonDecode(r['payloadJson'] as String) as Map<String, dynamic>)
        .toList();
  }

  // ---------- Businesses (кэш для офлайн-выбора бизнеса) ----------
  Future<void> cacheBusinesses(List<Map<String, dynamic>> businesses) async {
    final d = await db;
    final batch = d.batch();
    batch.delete('cached_businesses');
    final now = DateTime.now().toIso8601String();
    for (final b in businesses) {
      batch.insert('cached_businesses', {
        'businessId': b['businessId'].toString(),
        'payloadJson': jsonEncode(b),
        'fetchedAt': now,
      });
    }
    await batch.commit(noResult: true);
  }

  Future<List<Map<String, dynamic>>> getCachedBusinesses() async {
    final d = await db;
    final rows = await d.query('cached_businesses');
    return rows
        .map((r) => jsonDecode(r['payloadJson'] as String) as Map<String, dynamic>)
        .toList();
  }

  // ---------- Checklist queue (генерик-отчёты для не-мерч бизнесов) ----------
  Future<void> queueChecklist(
      String visitLocalId, String businessId, String payloadJson) async {
    final d = await db;
    await d.insert('checklist_queue', {
      'visitLocalId': visitLocalId,
      'businessId': businessId,
      'payloadJson': payloadJson,
      'synced': 0,
    });
  }

  Future<List<Map<String, dynamic>>> unsyncedChecklists() async {
    final d = await db;
    return d.query('checklist_queue', where: 'synced = 0');
  }

  Future<void> markChecklistSynced(int id) async {
    final d = await db;
    await d.update('checklist_queue', {'synced': 1},
        where: 'id = ?', whereArgs: [id]);
  }
}
