import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'api_service.dart';

class AuthService {
  static const _storage = FlutterSecureStorage();
  static const _kToken = 'auth_token';
  static const _kUserId = 'auth_user_id';
  static const _kName = 'auth_name';
  static const _kRole = 'auth_role';
  static const _kBusinessId = 'selected_business_id';
  static const _kBusinessJson = 'selected_business_json';

  static Future<Map<String, dynamic>> loginWithPin(String pin) async {
    final res = await ApiService.login(pin);
    await _storage.write(key: _kToken, value: res['token']);
    await _storage.write(key: _kUserId, value: res['userId']);
    await _storage.write(key: _kName, value: res['name']);
    await _storage.write(key: _kRole, value: res['role']);
    return res;
  }

  static Future<String?> getToken() => _storage.read(key: _kToken);
  static Future<String?> getUserId() => _storage.read(key: _kUserId);
  static Future<String?> getName() => _storage.read(key: _kName);
  static Future<String?> getRole() => _storage.read(key: _kRole);

  static Future<bool> isLoggedIn() async => (await getToken()) != null;

  /// Бизнес (сфера), выбранный на экране после логина — сохраняется как
  /// сырой JSON, чтобы модель Business можно было восстановить целиком
  /// (включая checklistSchema) без лишнего похода на сервер.
  static Future<void> setSelectedBusiness(String businessId, String businessJson) async {
    await _storage.write(key: _kBusinessId, value: businessId);
    await _storage.write(key: _kBusinessJson, value: businessJson);
  }

  static Future<String?> getSelectedBusinessId() => _storage.read(key: _kBusinessId);
  static Future<String?> getSelectedBusinessJson() => _storage.read(key: _kBusinessJson);

  static Future<void> clearSelectedBusiness() async {
    await _storage.delete(key: _kBusinessId);
    await _storage.delete(key: _kBusinessJson);
  }

  static Future<void> logout() async {
    await _storage.deleteAll();
  }
}
