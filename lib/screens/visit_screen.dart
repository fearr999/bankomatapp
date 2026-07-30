import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

import '../models/models.dart';
import '../services/location_service.dart';
import '../services/db_service.dart';
import '../services/auth_service.dart';
import '../services/sync_service.dart';
import 'sku_report_screen.dart';
import 'checklist_screen.dart';
import 'photo_screen.dart';

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
      // Если координаты точки не заданы (пока не проставлены в Stores) —
      // проверку расстояния пропускаем, чтобы не блокировать check-in.
      final hasCoords = widget.task.lat != 0 || widget.task.lng != 0;
      final distance = hasCoords
          ? LocationService.haversineMeters(
              loc.lat, loc.lng, widget.task.lat, widget.task.lng)
          : 0.0;
      final radius = widget.task.allowedRadiusMeters;

      if (loc.isMocked) {
        setState(() {
          _error =
              'Обнаружены фейковые GPS-координаты. Отключите Mock Location в настройках разработчика.';
        });
      }

      if (hasCoords && distance > radius) {
        setState(() {
          _error =
              'Слишком далеко от точки (${distance.toStringAsFixed(0)} м, допустимо ${radius.toStringAsFixed(0)} м)';
          _distance = distance;
          _isMocked = loc.isMocked;
        });
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

      SyncService.syncNow();
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _busy = false);
    }
  }

  bool get _isCycle => widget.business.taskMode == 'cycle';

  Future<void> _goToReport() async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => widget.business.isMerch
            ? SkuReportScreen(visitLocalId: _localVisitId!)
            : ChecklistScreen(
                visitLocalId: _localVisitId!, business: widget.business),
      ),
    );
    if (result != true) return;
    // Для цикловых бизнесов (банкоматы) отчёт уже включает фото —
    // отдельный шаг "Фотоотчёт" не нужен, сразу переходим к check-out.
    setState(() => _step = _isCycle ? _Step.photosDone : _Step.reportDone);
  }

  Future<void> _goToPhotos() async {
    final result = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => PhotoScreen(
            visitLocalId: _localVisitId!,
            businessId: widget.business.businessId),
      ),
    );
    if (result == true) setState(() => _step = _Step.photosDone);
  }

  Future<void> _doCheckOut() async {
    final commentController = TextEditingController();
    final comment = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Завершить визит'),
        content: TextField(
          controller: commentController,
          decoration: const InputDecoration(
              labelText: 'Комментарий (необязательно)'),
          maxLines: 3,
        ),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Отмена')),
          FilledButton(
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
    final scheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.task.storeName),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Divider(height: 1, color: scheme.outlineVariant),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 20, 16, 32),
        children: [
          // Store info card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Icon(Icons.location_on_rounded,
                            color: color, size: 20),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          widget.task.address,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ),
                    ],
                  ),
                  if (_distance != null) ...[
                    const SizedBox(height: 10),
                    Divider(color: scheme.outlineVariant, height: 1),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Icon(
                          _isMocked == true
                              ? Icons.warning_amber_rounded
                              : Icons.my_location_rounded,
                          size: 16,
                          color: _isMocked == true
                              ? scheme.error
                              : Colors.green.shade600,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'GPS: ${_distance!.toStringAsFixed(0)} м от точки'
                          '${_isMocked == true ? " · Mock Location!" : ""}',
                          style: TextStyle(
                            fontSize: 13,
                            color: _isMocked == true
                                ? scheme.error
                                : Colors.green.shade700,
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),

          if (_error != null) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: scheme.errorContainer,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.error_outline_rounded,
                      color: scheme.onErrorContainer, size: 20),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(_error!,
                        style:
                            TextStyle(color: scheme.onErrorContainer)),
                  ),
                ],
              ),
            ),
          ],

          const SizedBox(height: 24),

          // Steps
          Text('Этапы визита',
              style: Theme.of(context)
                  .textTheme
                  .labelLarge
                  ?.copyWith(color: scheme.onSurfaceVariant)),
          const SizedBox(height: 12),

          _StepTile(
            number: 1,
            label: 'GPS Check-in',
            sublabel: 'Подтвердите местоположение',
            icon: Icons.my_location_rounded,
            state: _step.index > _Step.intro.index
                ? _StepState.done
                : _step == _Step.intro
                    ? _StepState.active
                    : _StepState.locked,
            accentColor: color,
            onTap: _step == _Step.intro && !_busy ? _doCheckIn : null,
          ),
          _StepTile(
            number: 2,
            label: widget.business.isMerch
                ? 'Учёт товаров (SKU)'
                : _isCycle
                    ? 'Отчёт'
                    : 'Чек-лист',
            sublabel: widget.business.isMerch
                ? 'Заполните данные по SKU'
                : _isCycle
                    ? 'Статус, комментарий и фото'
                    : 'Пройдите по пунктам чек-листа',
            icon: widget.business.isMerch
                ? Icons.inventory_2_rounded
                : Icons.checklist_rounded,
            state: _step.index > _Step.checkedIn.index
                ? _StepState.done
                : _step == _Step.checkedIn
                    ? _StepState.active
                    : _StepState.locked,
            accentColor: color,
            onTap: _step == _Step.checkedIn && !_busy ? _goToReport : null,
          ),
          if (!_isCycle)
            _StepTile(
              number: 3,
              label: 'Фотоотчёт',
              sublabel: 'Снимки до и после работы',
              icon: Icons.camera_alt_rounded,
              state: _step.index > _Step.reportDone.index
                  ? _StepState.done
                  : _step == _Step.reportDone
                      ? _StepState.active
                      : _StepState.locked,
              accentColor: color,
              onTap: _step == _Step.reportDone && !_busy ? _goToPhotos : null,
            ),
          _StepTile(
            number: _isCycle ? 3 : 4,
            label: 'Check-out',
            sublabel: 'Завершите визит',
            icon: Icons.flag_rounded,
            state: _step == _Step.done
                ? _StepState.done
                : _step == _Step.photosDone
                    ? _StepState.active
                    : _StepState.locked,
            accentColor: color,
            onTap:
                _step == _Step.photosDone && !_busy ? _doCheckOut : null,
            isLast: true,
          ),

          if (_step == _Step.done) ...[
            const SizedBox(height: 28),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.green.shade50,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.green.shade200),
              ),
              child: Column(
                children: [
                  Icon(Icons.check_circle_rounded,
                      color: Colors.green.shade600, size: 48),
                  const SizedBox(height: 12),
                  Text('Визит завершён!',
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.green.shade700)),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton.icon(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.arrow_back_rounded),
                      label: const Text('К маршруту'),
                      style: FilledButton.styleFrom(
                          backgroundColor: Colors.green.shade600),
                    ),
                  ),
                ],
              ),
            ),
          ],

          if (_busy) ...[
            const SizedBox(height: 24),
            const Center(child: CircularProgressIndicator()),
          ],
        ],
      ),
    );
  }
}

enum _StepState { locked, active, done }

class _StepTile extends StatelessWidget {
  final int number;
  final String label;
  final String sublabel;
  final IconData icon;
  final _StepState state;
  final Color accentColor;
  final VoidCallback? onTap;
  final bool isLast;

  const _StepTile({
    required this.number,
    required this.label,
    required this.sublabel,
    required this.icon,
    required this.state,
    required this.accentColor,
    this.onTap,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final isDone = state == _StepState.done;
    final isActive = state == _StepState.active;
    final isLocked = state == _StepState.locked;

    final circleColor = isDone
        ? Colors.green.shade600
        : isActive
            ? accentColor
            : scheme.onSurface.withOpacity(0.2);

    final contentColor = isLocked
        ? scheme.onSurface.withOpacity(0.35)
        : scheme.onSurface;

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Timeline column
          Column(
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: isDone
                      ? Colors.green.shade50
                      : isActive
                          ? accentColor.withOpacity(0.12)
                          : scheme.surfaceContainerHighest,
                  shape: BoxShape.circle,
                  border: Border.all(color: circleColor, width: 2),
                ),
                child: Center(
                  child: isDone
                      ? Icon(Icons.check_rounded,
                          color: Colors.green.shade600, size: 18)
                      : Text(
                          '$number',
                          style: TextStyle(
                            color: isActive
                                ? accentColor
                                : scheme.onSurface.withOpacity(0.4),
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                ),
              ),
              if (!isLast)
                Expanded(
                  child: Container(
                    width: 2,
                    margin: const EdgeInsets.symmetric(vertical: 4),
                    decoration: BoxDecoration(
                      color: isDone
                          ? Colors.green.shade200
                          : scheme.outlineVariant,
                      borderRadius: BorderRadius.circular(1),
                    ),
                  ),
                ),
            ],
          ),

          const SizedBox(width: 14),

          // Content
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 0 : 20),
              child: Card(
                margin: EdgeInsets.zero,
                color: isActive
                    ? accentColor.withOpacity(0.04)
                    : null,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                  side: BorderSide(
                    color: isActive
                        ? accentColor.withOpacity(0.3)
                        : scheme.outlineVariant,
                  ),
                ),
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                  onTap: onTap,
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        Icon(icon, color: contentColor, size: 22),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(label,
                                  style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      color: contentColor,
                                      fontSize: 15)),
                              const SizedBox(height: 2),
                              Text(sublabel,
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: contentColor.withOpacity(0.6))),
                            ],
                          ),
                        ),
                        if (isActive)
                          FilledButton(
                            onPressed: onTap,
                            style: FilledButton.styleFrom(
                              backgroundColor: accentColor,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 16, vertical: 10),
                              textStyle: const TextStyle(fontSize: 13),
                            ),
                            child: const Text('Начать'),
                          )
                        else if (isDone)
                          Icon(Icons.check_circle_rounded,
                              color: Colors.green.shade600, size: 22)
                        else
                          Icon(Icons.lock_outline_rounded,
                              color: scheme.onSurface.withOpacity(0.25),
                              size: 20),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
