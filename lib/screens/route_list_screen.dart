import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/db_service.dart';
import '../services/location_service.dart';
import '../services/sync_service.dart';
import 'business_select_screen.dart';
import 'visit_screen.dart';
import 'admin_overview_screen.dart';

class RouteListScreen extends StatefulWidget {
  const RouteListScreen({super.key});
  @override
  State<RouteListScreen> createState() => _RouteListScreenState();
}

class _RouteListScreenState extends State<RouteListScreen> {
  List<StoreTask> _tasks = [];
  Business? _business;
  bool _loading = true;
  String? _error;
  String _syncStatus = '';
  Map<String, dynamic>? _cycleInfo;
  bool _isAdmin = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final role = await AuthService.getRole();
      _isAdmin = role == 'Admin';
      final businessJson = await AuthService.getSelectedBusinessJson();
      if (businessJson == null) {
        // Бизнес не выбран (например, после logout/login заново) — отправляем выбрать
        if (mounted) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (_) => const BusinessSelectScreen()),
          );
        }
        return;
      }
      final business = Business.fromJson(jsonDecode(businessJson));
      _business = business;

      final userId = await AuthService.getUserId();
      final token = await AuthService.getToken();
      final res =
          await ApiService.getTasks(userId!, token!, business.businessId);
      final list = (res['tasks'] as List)
          .map((e) => StoreTask.fromJson(e as Map<String, dynamic>))
          .toList();
      await DbService.instance
          .cacheTasks(list.map((t) => _taskToMap(t)).toList());
      setState(() {
        _tasks = list;
        _cycleInfo = res['cycleInfo'] as Map<String, dynamic>?;
      });
    } catch (e) {
      // Нет сети — пробуем показать закэшированный маршрут
      final cached = await DbService.instance.getCachedTasks();
      if (cached.isNotEmpty) {
        setState(() {
          _tasks = cached.map((m) => StoreTask.fromJson(m)).toList();
          _error = 'Офлайн-режим: показан сохранённый маршрут';
        });
      } else {
        setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
      }
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _switchBusiness() async {
    await AuthService.clearSelectedBusiness();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const BusinessSelectScreen()),
    );
  }

  Map<String, dynamic> _taskToMap(StoreTask t) => {
        'taskId': t.taskId,
        'storeId': t.storeId,
        'storeName': t.storeName,
        'address': t.address,
        'lat': t.lat,
        'lng': t.lng,
        'allowedRadiusMeters': t.allowedRadiusMeters,
        'status': t.status,
        'scheduledDate': t.scheduledDate,
      };

  Future<void> _manualSync() async {
    setState(() => _syncStatus = 'Синхронизация...');
    final summary = await SyncService.syncNow();
    if (!mounted) return;
    if (summary.skippedNoConnection) {
      setState(() => _syncStatus = 'Нет подключения к сети');
    } else if (summary.errors.isNotEmpty) {
      setState(() => _syncStatus =
          'Синхронизировано частично: ${summary.errors.length} ошибок');
    } else if (summary.hasWork) {
      setState(() => _syncStatus =
          'Отправлено: визиты ${summary.visitsSynced}, отчёты ${summary.reportsSynced}, фото ${summary.photosSynced}');
    } else {
      setState(() => _syncStatus = 'Всё уже синхронизировано');
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _business?.materialColor;
    return Scaffold(
      appBar: AppBar(
        title: Text(_business != null
            ? '${_business!.icon} ${_business!.name}'
            : 'Мой маршрут'),
        backgroundColor: color,
        actions: [
          if (_isAdmin)
            IconButton(
              icon: const Icon(Icons.bar_chart),
              tooltip: 'Обзор по бригадам',
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const AdminOverviewScreen()),
              ),
            ),
          IconButton(
            icon: const Icon(Icons.swap_horiz),
            tooltip: 'Сменить бизнес',
            onPressed: _switchBusiness,
          ),
          IconButton(
            icon: const Icon(Icons.sync),
            tooltip: 'Синхронизировать очередь',
            onPressed: _manualSync,
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await AuthService.logout();
              if (mounted) Navigator.of(context).popUntil((r) => r.isFirst);
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : ListView(
                children: [
                  if (_cycleInfo != null && (_cycleInfo!['total'] as int) > 0)
                    Container(
                      width: double.infinity,
                      color: color?.withOpacity(0.12) ?? Colors.grey.shade100,
                      padding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 12),
                      child: Text(
                        'Цикл №${_cycleInfo!['cycleNumber']} · '
                        'убрано ${_cycleInfo!['done']} из ${_cycleInfo!['total']}',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: color,
                        ),
                      ),
                    ),
                  if (_syncStatus.isNotEmpty)
                    Container(
                      width: double.infinity,
                      color: Colors.blue.shade50,
                      padding: const EdgeInsets.all(8),
                      child: Text(_syncStatus, textAlign: TextAlign.center),
                    ),
                  if (_error != null)
                    Container(
                      width: double.infinity,
                      color: Colors.orange.shade50,
                      padding: const EdgeInsets.all(8),
                      child: Text(_error!, textAlign: TextAlign.center),
                    ),
                  if (_tasks.isEmpty && !_loading)
                    Padding(
                      padding: const EdgeInsets.all(32),
                      child: Center(
                        child: Text(
                          _cycleInfo != null && (_cycleInfo!['total'] as int) == 0
                              ? 'За вами пока не закреплено ни одного устройства — обратитесь к администратору'
                              : 'На сегодня задач нет',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ..._tasks.map((t) => _TaskCard(
                        task: t,
                        color: color,
                        onTap: () async {
                          if (_business == null) return;
                          await Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (_) => VisitScreen(
                                    task: t, business: _business!)),
                          );
                          _load();
                        },
                      )),
                ],
              ),
      ),
    );
  }
}

class _TaskCard extends StatelessWidget {
  final StoreTask task;
  final Color? color;
  final VoidCallback onTap;
  const _TaskCard({required this.task, required this.onTap, this.color});

  Color _statusColor() {
    switch (task.status) {
      case 'Completed':
        return Colors.green;
      case 'In_Progress':
        return Colors.orange;
      default:
        return color ?? Colors.grey;
    }
  }

  String _statusLabel() {
    switch (task.status) {
      case 'Completed':
        return 'Завершен';
      case 'In_Progress':
        return 'В работе';
      default:
        return 'Ожидает';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: _statusColor(),
          child: const Icon(Icons.store, color: Colors.white),
        ),
        title: Text(task.storeName,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(task.address),
        trailing: Chip(
          label: Text(_statusLabel()),
          backgroundColor: _statusColor().withOpacity(0.15),
        ),
        onTap: onTap,
      ),
    );
  }
}
