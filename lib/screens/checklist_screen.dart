import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/db_service.dart';
import '../services/photo_service.dart';
import '../services/location_service.dart';

/// Генерик-чек-лист: набор полей рисуется динамически из
/// Business.checklistSchema (приходит с сервера, лист Businesses).
/// Используется для всех бизнесов кроме merch (у него отдельный SKU-экран).
class ChecklistScreen extends StatefulWidget {
  final String visitLocalId;
  final Business business;
  const ChecklistScreen(
      {super.key, required this.visitLocalId, required this.business});

  @override
  State<ChecklistScreen> createState() => _ChecklistScreenState();
}

class _ChecklistScreenState extends State<ChecklistScreen> {
  final Map<String, dynamic> _answers = {};
  String? _error;
  File? _photo;
  bool _photoBusy = false;

  bool get _isCycle => widget.business.taskMode == 'cycle';

  @override
  void initState() {
    super.initState();
    for (final f in widget.business.checklistSchema) {
      _answers[f.id] = f.type == 'checkbox' ? false : '';
    }
  }

  Future<void> _capturePhoto() async {
    setState(() {
      _photoBusy = true;
      _error = null;
    });
    try {
      final raw = await PhotoService.takePhoto();
      if (raw == null) return; // отменено
      final loc = await LocationService.getCurrentLocation();
      final watermarked = await PhotoService.watermarkAndCompress(
        source: raw,
        lat: loc.lat,
        lng: loc.lng,
      );
      final ts = DateTime.now().toIso8601String();
      await DbService.instance.queuePhoto(
          widget.visitLocalId, 'Report', watermarked.path, ts,
          businessId: widget.business.businessId);
      setState(() => _photo = watermarked);
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _photoBusy = false);
    }
  }

  bool _validate() {
    for (final f in widget.business.checklistSchema) {
      if (f.required && f.type != 'checkbox') {
        final v = _answers[f.id];
        if (v == null || v.toString().trim().isEmpty) {
          setState(() => _error = 'Заполните поле «${f.label}»');
          return false;
        }
      }
    }
    return true;
  }

  Future<void> _save() async {
    if (!_validate()) return;
    await DbService.instance.queueChecklist(
      widget.visitLocalId,
      widget.business.businessId,
      jsonEncode(_answers),
    );
    if (mounted) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    final color = widget.business.materialColor;
    final schema = widget.business.checklistSchema;
    return Scaffold(
      appBar: AppBar(
        title: Text(
            '${_isCycle ? "Отчёт" : "Чек-лист"}: ${widget.business.name}'),
        backgroundColor: color,
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _save,
        icon: const Icon(Icons.save),
        label: const Text('Сохранить'),
        backgroundColor: color,
      ),
      body: schema.isEmpty
          ? const Center(
              child: Padding(
                padding: EdgeInsets.all(24),
                child: Text(
                    'Для этого бизнеса чек-лист не настроен. Обратитесь к администратору.'),
              ),
            )
          : ListView(
              padding: const EdgeInsets.all(12),
              children: [
                if (_error != null)
                  Container(
                    width: double.infinity,
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(8),
                    color: Colors.red.shade50,
                    child: Text(_error!,
                        style: const TextStyle(color: Colors.red)),
                  ),
                ...schema.map((f) => _buildField(f, color)),
                if (_isCycle) _buildPhotoSection(color),
              ],
            ),
    );
  }

  Widget _buildPhotoSection(Color color) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            GestureDetector(
              onTap: _photoBusy ? null : _capturePhoto,
              child: Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.shade400),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: _photo == null
                    ? const Icon(Icons.camera_alt_outlined)
                    : ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.file(_photo!, fit: BoxFit.cover),
                      ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                _photo == null
                    ? 'Фото (необязательно)'
                    : 'Фото приложено',
                style: TextStyle(color: color),
              ),
            ),
            if (_photoBusy) const CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }

  Widget _buildField(ChecklistField f, Color color) {
    switch (f.type) {
      case 'checkbox':
        return Card(
          margin: const EdgeInsets.only(bottom: 8),
          child: SwitchListTile(
            title: Text(f.label),
            subtitle: f.required ? const Text('Обязательно') : null,
            value: _answers[f.id] == true,
            activeColor: color,
            onChanged: (v) => setState(() => _answers[f.id] = v),
          ),
        );
      case 'number':
        return Card(
          margin: const EdgeInsets.only(bottom: 8),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: TextFormField(
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: InputDecoration(
                labelText: f.label + (f.required ? ' *' : ''),
                border: InputBorder.none,
              ),
              onChanged: (v) => _answers[f.id] = v,
            ),
          ),
        );
      case 'text':
      default:
        return Card(
          margin: const EdgeInsets.only(bottom: 8),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: TextFormField(
              maxLines: f.id == 'comment' ? 3 : 1,
              decoration: InputDecoration(
                labelText: f.label + (f.required ? ' *' : ''),
                border: InputBorder.none,
              ),
              onChanged: (v) => _answers[f.id] = v,
            ),
          ),
        );
    }
  }
}
