import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import 'package:intl/intl.dart';

import '../models/models.dart';
import '../services/location_service.dart';
import '../services/db_service.dart';
import '../services/auth_service.dart';
import '../services/sync_service.dart';
import 'sku_report_screen.dart';
import 'checklist_screen.dart';
import 'photo_screen.dart';

/// Один экран ведёт весь визит по шагам, как описано в ТЗ:
/// 1. GPS check-in -> 2. Отчёт (SKU для merch / чек-лист для остальных) -> 3. Фото До/После -> 4. Check-out
class VisitScreen extends StatefulWidget {
  final StoreTask task;
  final Business business;
  const VisitScreen({super.key, required this.task, required this.business});

  @override
  State<VisitScreen> createState() => _VisitScreenState();
}

enum _Step { intro, checkedIn, reportDone, photosDone, done }

class _VisitScreenState extends State<VisitScreen> {
  _Step _step = _Step.intro;
  bool _busy = false;
  String? _error;
  String? _localVisitId;
  double? _distance;
  bool? _isMocked;

  Future<void> _doCheckIn() async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final loc = await LocationService.getCurrentLocation();
      final distance = LocationService.haversineMeters(
          loc.lat, loc.lng, widget.task.lat, widget.task.lng);
      final radius = widget.task.allowedRadiusMeters;

      if (loc.isMocked) {
        setState(() {
          _error =
              'Обнаружены фейковые GPS-координаты (Mock Location). Отключите их в настройках разработчика, иначе визит будет помечен как нарушение.';
        });
      }

      if (distance > radius) {
        setState(() {
          _error =
              'Вы слишком далеко от точки (${distance.toStringAsFixed(0)} м, допустимо ${radius.toStringAsFixed(0)} м). '
              'Приблизьтесь к магазину, либо сообщите администратору о нарушении геопозиции.';
          _distance = distance;
          _isMocked = loc.isMocked;
        });
        // По ТЗ — блокировка при превышении радиуса. Не создаём визит.
        return;
      }

      final userId = await AuthService.getUserId();
      final localId = const Uuid().v4();
      final now = DateTime.now().toIso8601String();

      await DbService.instance.upsertVisit({
        'localId': localId,
        'serverLogId': null,
        'userId': userId,
        'storeId': widget.task.storeId,
        'businessId': widget.business.businessId,
        'checkInTime': now,
        'checkOutTime': null,
        'checkInLat': loc.lat,
        'checkInLng': loc.lng,
        'distanceErrorMeters': distance,
        'isMockLocation': loc.isMocked ? 1 : 0,
        'comment': '',
        'status': 'In_Progress',
        'synced': 0,
      });

      setState(() {
        _localVisitId = localId;
        _distance = distance;
        _isMocked = loc.isMocked;
        _step = _Step.checkedIn;
      });

      // Пробуем сразу отправить в фоне — если сети нет, останется в очереди
      SyncService.syncNow();
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _busy = false);
    }
  }

  Future<void> _goToReport() async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => widget.business.isMerch
            ? SkuReportScreen(visitLocalId: _localVisitId!)
            : ChecklistScreen(
                visitLocalId: _localVisitId!, business: widget.business),
      ),
    );
    if (result == true) setState(() => _step = _Step.reportDone);
  }

  Future<void> _goToPhotos() async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => PhotoScreen(visitLocalId: _localVisitId!),
      ),
    );
    if (result == true) setState(() => _step = _Step.photosDone);
  }

  Future<void> _doCheckOut() async {
    final commentController = TextEditingController();
    final comment = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Завершить визит'),
        content: TextField(
          controller: commentController,
          decoration: const InputDecoration(labelText: 'Комментарий (необязательно)'),
          maxLines: 3,
        ),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Отмена')),
          ElevatedButton(
              onPressed: () => Navigator.pop(ctx, commentController.text),
              child: const Text('Завершить')),
        ],
      ),
    );
    if (comment == null) return;

    setState(() => _busy = true);
    final visit = await DbService.instance.getVisit(_localVisitId!);
    if (visit != null) {
      await DbService.instance.upsertVisit({
        ...visit,
        'checkOutTime': DateTime.now().toIso8601String(),
        'comment': comment,
        'status': 'Completed',
        // synced оставляем как есть — sync_service доотправит checkout,
        // если сам check-in уже был подтверждён сервером (serverLogId != null)
      });
    }
    await SyncService.syncNow();
    setState(() {
      _busy = false;
      _step = _Step.done;
    });
  }

  @override
  Widget build(BuildContext context) {
    final color = widget.business.materialColor;
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.task.storeName),
        backgroundColor: color,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Text(widget.task.address,
                style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 16),
            if (_distance != null)
              Text(
                'Расстояние до точки: ${_distance!.toStringAsFixed(0)} м'
                '${_isMocked == true ? "  ⚠ Mock GPS" : ""}',
                style: TextStyle(
                  color: _isMocked == true ? Colors.red : Colors.black87,
                ),
              ),
            if (_error != null) ...[
              const SizedBox(height: 8),
              Text(_error!, style: const TextStyle(color: Colors.red)),
            ],
            const SizedBox(height: 24),
            _buildStepButton(
              label: '1. GPS Check-in',
              enabled: _step == _Step.intro && !_busy,
              done: _step.index > _Step.intro.index,
              onPressed: _doCheckIn,
            ),
            _buildStepButton(
              label: widget.business.isMerch
                  ? '2. Учёт товаров (SKU)'
                  : '2. Заполнить чек-лист',
              enabled: _step == _Step.checkedIn && !_busy,
              done: _step.index > _Step.checkedIn.index,
              onPressed: _goToReport,
            ),
            _buildStepButton(
              label: '3. Фотоотчёт До/После',
              enabled: _step == _Step.reportDone && !_busy,
              done: _step.index > _Step.reportDone.index,
              onPressed: _goToPhotos,
            ),
            _buildStepButton(
              label: '4. Check-out (завершить визит)',
              enabled: _step == _Step.photosDone && !_busy,
              done: _step == _Step.done,
              onPressed: _doCheckOut,
            ),
            if (_step == _Step.done) ...[
              const SizedBox(height: 24),
              const Center(
                child: Column(
                  children: [
                    Icon(Icons.check_circle, color: Colors.green, size: 56),
                    SizedBox(height: 8),
                    Text('Визит завершён'),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('К маршруту'),
              ),
            ],
            if (_busy) ...[
              const SizedBox(height: 24),
              const Center(child: CircularProgressIndicator()),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildStepButton({
    required String label,
    required bool enabled,
    required bool done,
    required VoidCallback onPressed,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: SizedBox(
        width: double.infinity,
        height: 50,
        child: ElevatedButton.icon(
          onPressed: enabled ? onPressed : null,
          icon: Icon(done ? Icons.check : Icons.circle_outlined),
          style: ElevatedButton.styleFrom(
            backgroundColor: done ? Colors.green.shade100 : null,
          ),
          label: Text(label),
        ),
      ),
    );
  }
}
