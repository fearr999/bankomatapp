import 'dart:io';
import 'package:flutter/material.dart';
import '../services/photo_service.dart';
import '../services/location_service.dart';
import '../services/db_service.dart';

class PhotoScreen extends StatefulWidget {
  final String visitLocalId;
  final String businessId;
  const PhotoScreen(
      {super.key, required this.visitLocalId, required this.businessId});

  @override
  State<PhotoScreen> createState() => _PhotoScreenState();
}

class _PhotoScreenState extends State<PhotoScreen> {
  File? _before;
  File? _after;
  bool _busy = false;
  String? _error;

  Future<void> _capture(String type) async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final raw = await PhotoService.takePhoto();
      if (raw == null) return; // пользователь отменил съёмку
      final loc = await LocationService.getCurrentLocation();
      final watermarked = await PhotoService.watermarkAndCompress(
        source: raw,
        lat: loc.lat,
        lng: loc.lng,
      );
      final ts = DateTime.now().toIso8601String();
      await DbService.instance.queuePhoto(
          widget.visitLocalId, type, watermarked.path, ts,
          businessId: widget.businessId);
      setState(() {
        if (type == 'Before') {
          _before = watermarked;
        } else {
          _after = watermarked;
        }
      });
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final canFinish = _before != null && _after != null;
    return Scaffold(
      appBar: AppBar(title: const Text('Фотоотчёт До / После')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    child: _PhotoSlot(
                      label: 'ДО',
                      file: _before,
                      busy: _busy,
                      onTap: () => _capture('Before'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _PhotoSlot(
                      label: 'ПОСЛЕ',
                      file: _after,
                      busy: _busy,
                      onTap: () => _capture('After'),
                    ),
                  ),
                ],
              ),
            ),
            if (_error != null)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Text(_error!, style: const TextStyle(color: Colors.red)),
              ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: canFinish ? () => Navigator.pop(context, true) : null,
                child: const Text('Готово'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PhotoSlot extends StatelessWidget {
  final String label;
  final File? file;
  final bool busy;
  final VoidCallback onTap;
  const _PhotoSlot(
      {required this.label, required this.file, required this.busy, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: busy ? null : onTap,
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade400),
          borderRadius: BorderRadius.circular(8),
        ),
        child: file == null
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.camera_alt, size: 40),
                  const SizedBox(height: 8),
                  Text(label),
                ],
              )
            : ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    Image.file(file!, fit: BoxFit.cover),
                    Positioned(
                      top: 4,
                      left: 4,
                      child: Chip(
                        label: Text(label),
                        backgroundColor: Colors.black54,
                        labelStyle: const TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
