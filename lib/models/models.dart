/// Модели данных приложения. Все поля соответствуют колонкам
/// листов Google Sheets, описанным в backend/SHEETS_SETUP.md
import 'package:flutter/material.dart' show Color;

/// Одно поле динамического чек-листа (для бизнесов кроме merch,
/// у которого свой отдельный экран учёта SKU).
class ChecklistField {
  final String id;
  final String label;
  final String type; // checkbox | text | number
  final bool required;

  ChecklistField({
    required this.id,
    required this.label,
    required this.type,
    this.required = false,
  });

  factory ChecklistField.fromJson(Map<String, dynamic> j) => ChecklistField(
        id: j['id']?.toString() ?? '',
        label: j['label']?.toString() ?? '',
        type: j['type']?.toString() ?? 'text',
        required: j['required'] == true,
      );
}

/// Сфера бизнеса, выбираемая после логина (мерч, банкоматы, и т.д.)
class Business {
  final String businessId;
  final String name;
  final String icon; // эмодзи
  final String color; // hex '#RRGGBB'
  final List<ChecklistField> checklistSchema;

  Business({
    required this.businessId,
    required this.name,
    required this.icon,
    required this.color,
    required this.checklistSchema,
  });

  /// merch — единственный бизнес со своим отдельным экраном учёта SKU
  /// вместо генерик-чек-листа.
  bool get isMerch => businessId == 'merch';

  Color get materialColor {
    final hex = color.replaceFirst('#', '');
    final value = int.tryParse('FF$hex', radix: 16) ?? 0xFF3F51B5;
    return Color(value);
  }

  factory Business.fromJson(Map<String, dynamic> json) => Business(
        businessId: json['businessId']?.toString() ?? '',
        name: json['name']?.toString() ?? '',
        icon: json['icon']?.toString() ?? '📋',
        color: json['color']?.toString() ?? '#3F51B5',
        checklistSchema: ((json['checklistSchema'] as List?) ?? [])
            .map((e) => ChecklistField.fromJson(e as Map<String, dynamic>))
            .toList(),
      );

  Map<String, dynamic> toJson() => {
        'businessId': businessId,
        'name': name,
        'icon': icon,
        'color': color,
        'checklistSchema': checklistSchema
            .map((f) => {
                  'id': f.id,
                  'label': f.label,
                  'type': f.type,
                  'required': f.required,
                })
            .toList(),
      };
}

class AppUser {
  final String userId;
  final String name;
  final String role; // 'Admin' | 'Worker'
  final String token;

  AppUser({
    required this.userId,
    required this.name,
    required this.role,
    required this.token,
  });

  factory AppUser.fromJson(Map<String, dynamic> json) => AppUser(
        userId: json['userId'] ?? '',
        name: json['name'] ?? '',
        role: json['role'] ?? 'Worker',
        token: json['token'] ?? '',
      );

  Map<String, dynamic> toJson() => {
        'userId': userId,
        'name': name,
        'role': role,
        'token': token,
      };
}

class StoreTask {
  final String taskId;
  final String storeId;
  final String storeName;
  final String address;
  final double lat;
  final double lng;
  final double allowedRadiusMeters;
  final String status; // Pending | In_Progress | Completed
  final String scheduledDate;

  StoreTask({
    required this.taskId,
    required this.storeId,
    required this.storeName,
    required this.address,
    required this.lat,
    required this.lng,
    required this.allowedRadiusMeters,
    required this.status,
    required this.scheduledDate,
  });

  factory StoreTask.fromJson(Map<String, dynamic> json) => StoreTask(
        taskId: json['taskId']?.toString() ?? '',
        storeId: json['storeId']?.toString() ?? '',
        storeName: json['storeName'] ?? '',
        address: json['address'] ?? '',
        lat: (json['lat'] ?? 0).toDouble(),
        lng: (json['lng'] ?? 0).toDouble(),
        allowedRadiusMeters: (json['allowedRadiusMeters'] ?? 100).toDouble(),
        status: json['status'] ?? 'Pending',
        scheduledDate: json['scheduledDate'] ?? '',
      );
}

class ProductItem {
  final String productId;
  final String category;
  final String skuName;
  final String barcode;
  final double price;

  ProductItem({
    required this.productId,
    required this.category,
    required this.skuName,
    required this.barcode,
    required this.price,
  });

  factory ProductItem.fromJson(Map<String, dynamic> json) => ProductItem(
        productId: json['productId']?.toString() ?? '',
        category: json['category'] ?? '',
        skuName: json['skuName'] ?? '',
        barcode: json['barcode']?.toString() ?? '',
        price: (json['price'] ?? 0).toDouble(),
      );
}

/// Один пункт заполненного отчёта по товару (заполняется на устройстве)
class ReportEntry {
  String productId;
  String skuName;
  bool isAvailable;
  int stockQty;
  int facingQty;
  double actualPrice;

  ReportEntry({
    required this.productId,
    required this.skuName,
    this.isAvailable = true,
    this.stockQty = 0,
    this.facingQty = 0,
    this.actualPrice = 0,
  });

  Map<String, dynamic> toJson() => {
        'productId': productId,
        'skuName': skuName,
        'isAvailable': isAvailable,
        'stockQty': stockQty,
        'facingQty': facingQty,
        'actualPrice': actualPrice,
      };

  factory ReportEntry.fromJson(Map<String, dynamic> j) => ReportEntry(
        productId: j['productId'],
        skuName: j['skuName'] ?? '',
        isAvailable: j['isAvailable'] ?? true,
        stockQty: j['stockQty'] ?? 0,
        facingQty: j['facingQty'] ?? 0,
        actualPrice: (j['actualPrice'] ?? 0).toDouble(),
      );
}

/// Запись визита — хранится локально пока идёт визит, потом уходит в очередь синхронизации
class VisitRecord {
  String localId; // uuid, генерируется на устройстве
  String? serverLogId; // приходит после успешного submitCheckIn
  String userId;
  String storeId;
  String businessId;
  String checkInTime;
  String? checkOutTime;
  double checkInLat;
  double checkInLng;
  double distanceErrorMeters;
  bool isMockLocation;
  String comment;
  String status; // In_Progress | Completed
  bool synced;

  VisitRecord({
    required this.localId,
    this.serverLogId,
    required this.userId,
    required this.storeId,
    this.businessId = '',
    required this.checkInTime,
    this.checkOutTime,
    required this.checkInLat,
    required this.checkInLng,
    required this.distanceErrorMeters,
    required this.isMockLocation,
    this.comment = '',
    this.status = 'In_Progress',
    this.synced = false,
  });

  Map<String, dynamic> toMap() => {
        'localId': localId,
        'serverLogId': serverLogId,
        'userId': userId,
        'storeId': storeId,
        'businessId': businessId,
        'checkInTime': checkInTime,
        'checkOutTime': checkOutTime,
        'checkInLat': checkInLat,
        'checkInLng': checkInLng,
        'distanceErrorMeters': distanceErrorMeters,
        'isMockLocation': isMockLocation ? 1 : 0,
        'comment': comment,
        'status': status,
        'synced': synced ? 1 : 0,
      };

  factory VisitRecord.fromMap(Map<String, dynamic> m) => VisitRecord(
        localId: m['localId'],
        serverLogId: m['serverLogId'],
        userId: m['userId'],
        storeId: m['storeId'],
        businessId: m['businessId'] ?? '',
        checkInTime: m['checkInTime'],
        checkOutTime: m['checkOutTime'],
        checkInLat: m['checkInLat'],
        checkInLng: m['checkInLng'],
        distanceErrorMeters: m['distanceErrorMeters'],
        isMockLocation: m['isMockLocation'] == 1,
        comment: m['comment'] ?? '',
        status: m['status'] ?? 'In_Progress',
        synced: m['synced'] == 1,
      );
}
