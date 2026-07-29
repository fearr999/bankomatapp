import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:intl/intl.dart';

import '../config/app_config.dart';

class PhotoService {
  static final ImagePicker _picker = ImagePicker();

  /// На телефоне — снимок с камеры устройства.
  /// На десктопе (Windows/Linux/macOS) у image_picker нет реализации камеры,
  /// поэтому там открывается обычный диалог выбора файла (галерея/проводник) —
  /// это единственный способ протестировать поток без телефона.
  static bool get _isDesktop =>
      !kIsWeb && (Platform.isWindows || Platform.isLinux || Platform.isMacOS);

  static Future<File?> takePhoto() async {
    final XFile? shot = await _picker.pickImage(
      source: _isDesktop ? ImageSource.gallery : ImageSource.camera,
      imageQuality: 90, // финальное сжатие делаем сами ниже, здесь просто не раздувать RAM
    );
    if (shot == null) return null;
    return File(shot.path);
  }

  /// Накладывает водяной знак (дата/время/координаты) и сжимает фото
  /// до параметров из AppConfig перед отправкой на сервер.
  static Future<File> watermarkAndCompress({
    required File source,
    required double lat,
    required double lng,
  }) async {
    final bytes = await source.readAsBytes();
    img.Image? original = img.decodeImage(bytes);
    if (original == null) {
      throw Exception('Не удалось прочитать изображение');
    }

    // Ресайз, если превышает максимум
    if (original.width > AppConfig.photoMaxWidth ||
        original.height > AppConfig.photoMaxHeight) {
      original = img.copyResize(
        original,
        width: original.width >= original.height ? AppConfig.photoMaxWidth : null,
        height: original.height > original.width ? AppConfig.photoMaxHeight : null,
      );
    }

    final timestamp = DateFormat('dd.MM.yyyy HH:mm:ss').format(DateTime.now());
    final label = '$timestamp\nGPS: ${lat.toStringAsFixed(6)}, ${lng.toStringAsFixed(6)}';

    // Полупрозрачная плашка снизу фото + текст поверх
    final barHeight = (original.height * 0.09).clamp(40, 140).toInt();
    final bar = img.fillRect(
      original,
      x1: 0,
      y1: original.height - barHeight,
      x2: original.width,
      y2: original.height,
      color: img.ColorRgba8(0, 0, 0, 140),
    );

    img.drawString(
      bar,
      label,
      font: img.arial14,
      x: 12,
      y: original.height - barHeight + 8,
      color: img.ColorRgb8(255, 255, 255),
    );

    final jpg = img.encodeJpg(bar, quality: AppConfig.photoQuality);

    final dir = await getTemporaryDirectory();
    final outPath =
        '${dir.path}/wm_${DateTime.now().millisecondsSinceEpoch}.jpg';
    final outFile = File(outPath);
    await outFile.writeAsBytes(jpg);
    return outFile;
  }
}
