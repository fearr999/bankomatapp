import 'dart:math';
import 'package:geolocator/geolocator.dart';

class LocationResult {
  final double lat;
  final double lng;
  final bool isMocked;
  LocationResult({required this.lat, required this.lng, required this.isMocked});
}

class LocationService {
  /// Запрашивает разрешения и возвращает текущие координаты.
  /// Кидает исключение с понятным текстом, если геолокация недоступна.
  static Future<LocationResult> getCurrentLocation() async {
    final serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception('Включите геолокацию (GPS) на устройстве');
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw Exception('Нет разрешения на использование геолокации');
      }
    }
    if (permission == LocationPermission.deniedForever) {
      throw Exception(
          'Доступ к геолокации заблокирован навсегда. Включите его в настройках приложения');
    }

    final position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    // Geolocator на Android прокидывает Location.isFromMockProvider() через isMocked.
    // На iOS такого системного признака нет — поле будет всегда false.
    final isMocked = position.isMocked;

    return LocationResult(
      lat: position.latitude,
      lng: position.longitude,
      isMocked: isMocked,
    );
  }

  /// Формула Haversine — расстояние между двумя точками на сфере, в метрах.
  static double haversineMeters(
      double lat1, double lng1, double lat2, double lng2) {
    const earthRadius = 6371000.0; // метров
    final dLat = _deg2rad(lat2 - lat1);
    final dLng = _deg2rad(lng2 - lng1);
    final a = sin(dLat / 2) * sin(dLat / 2) +
        cos(_deg2rad(lat1)) *
            cos(_deg2rad(lat2)) *
            sin(dLng / 2) *
            sin(dLng / 2);
    final c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return earthRadius * c;
  }

  static double _deg2rad(double deg) => deg * (pi / 180);
}
