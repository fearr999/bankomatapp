import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/db_service.dart';
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
  String? _syncStatus;
  bool _syncOk = false;
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
    setState(() {
      _syncStatus = 'Синхронизация...';
      _syncOk = false;
    });
    final summary = await SyncService.syncNow();
    if (!mounted) return;
    if (summary.skippedNoConnection) {
      setState(() {
        _syncStatus = 'Нет подключения к сети';
        _syncOk = false;
      });
    } else if (summary.errors.isNotEmpty) {
      setState(() {
        _syncStatus = 'Частично: ${summary.errors.length} ошибок';
        _syncOk = false;
      });
    } else if (summary.hasWork) {
      setState(() {
        _syncStatus =
            'Отправлено: визиты ${summary.visitsSynced}, отчёты ${summary.reportsSynced}';
        _syncOk = true;
      });
    } else {
      setState(() {
        _syncStatus = 'Всё синхронизировано';
        _syncOk = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _business?.materialColor;
    final scheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: _business != null
            ? Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(_business!.icon,
                      style: const TextStyle(fontSize: 20)),
                  const SizedBox(width: 8),
                  Text(_business!.name),
                ],
              )
            : const Text('Мой маршрут'),
        actions: [
          if (_isAdmin)
            IconButton(
              icon: const Icon(Icons.bar_chart_rounded),
              tooltip: 'Обзор по бригадам',
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (_) => const AdminOverviewScreen()),
              ),
            ),
          IconButton(
            icon: const Icon(Icons.sync_rounded),
            tooltip: 'Синхронизировать',
            onPressed: _manualSync,
          ),
          PopupMenuButton(
            icon: const Icon(Icons.more_vert_rounded),
            itemBuilder: (_) => [
              PopupMenuItem(
                onTap: _switchBusiness,
                child: const Row(
                  children: [
                    Icon(Icons.swap_horiz_rounded),
                    SizedBox(width: 12),
                    Text('Сменить направление'),
                  ],
                ),
              ),
              PopupMenuItem(
                onTap: () async {
                  await AuthService.logout();
                  if (mounted) {
                    Navigator.of(context).popUntil((r) => r.isFirst);
                  }
                },
                child: Row(
                  children: [
                    Icon(Icons.logout_rounded,
                        color: scheme.error),
                    const SizedBox(width: 12),
                    Text('Выйти',
                        style: TextStyle(color: scheme.error)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : CustomScrollView(
                slivers: [
                  if (_cycleInfo != null &&
                      (_cycleInfo!['total'] as int) > 0)
                    SliverToBoxAdapter(
                      child: _CycleBanner(
                          cycleInfo: _cycleInfo!, color: color ?? scheme.primary),
                    ),
                  if (_syncStatus != null)
                    SliverToBoxAdapter(
                      child: _StatusBanner(
                          message: _syncStatus!, isOk: _syncOk),
                    ),
                  if (_error != null)
                    SliverToBoxAdapter(
                      child: Container(
                        color: scheme.tertiaryContainer,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 10),
                        child: Row(
                          children: [
                            Icon(Icons.cloud_off_rounded,
                                size: 18,
                                color: scheme.onTertiaryContainer),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                _error!,
                                style: TextStyle(
                                    color: scheme.onTertiaryContainer,
                                    fontSize: 13),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  if (_tasks.isEmpty && !_loading)
                    SliverFillRemaining(
                      child: _EmptyState(cycleInfo: _cycleInfo),
                    )
                  else
                    SliverPadding(
                      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                      sliver: SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (ctx, i) => Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: _TaskCard(
                              task: _tasks[i],
                              accentColor: color ?? scheme.primary,
                              onTap: () async {
                                if (_business == null) return;
                                await Navigator.of(context).push(
                                  MaterialPageRoute(
                                      builder: (_) => VisitScreen(
                                          task: _tasks[i],
                                          business: _business!)),
                                );
                                _load();
                              },
                            ),
                          ),
                          childCount: _tasks.length,
                        ),
                      ),
                    ),
                ],
              ),
      ),
    );
  }
}

class _CycleBanner extends StatelessWidget {
  final Map<String, dynamic> cycleInfo;
  final Color color;
  const _CycleBanner({required this.cycleInfo, required this.color});

  @override
  Widget build(BuildContext context) {
    final done = (cycleInfo['done'] as int?) ?? 0;
    final total = (cycleInfo['total'] as int?) ?? 0;
    final cycleNum = (cycleInfo['cycleNumber'] as int?) ?? 1;
    final progress = total > 0 ? done / total : 0.0;

    return Container(
      color: color.withOpacity(0.08),
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.loop_rounded, size: 16, color: color),
              const SizedBox(width: 6),
              Text(
                'Цикл №$cycleNum',
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: color,
                    fontSize: 13),
              ),
              const Spacer(),
              Text(
                '$done / $total',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: color,
                    fontSize: 14),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: color.withOpacity(0.15),
              valueColor: AlwaysStoppedAnimation<Color>(color),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusBanner extends StatelessWidget {
  final String message;
  final bool isOk;
  const _StatusBanner({required this.message, required this.isOk});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final color = isOk ? Colors.green.shade700 : scheme.primary;
    final bg = isOk ? Colors.green.shade50 : scheme.primaryContainer;
    return Container(
      color: bg,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Icon(
            isOk ? Icons.check_circle_rounded : Icons.sync_rounded,
            size: 16,
            color: color,
          ),
          const SizedBox(width: 8),
          Text(message, style: TextStyle(color: color, fontSize: 13)),
        ],
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  final Map<String, dynamic>? cycleInfo;
  const _EmptyState({this.cycleInfo});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final noAssignment =
        cycleInfo != null && (cycleInfo!['total'] as int?) == 0;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              noAssignment ? Icons.person_off_outlined : Icons.task_alt_rounded,
              size: 64,
              color: scheme.onSurfaceVariant.withOpacity(0.35),
            ),
            const SizedBox(height: 16),
            Text(
              noAssignment
                  ? 'Нет закреплённых устройств'
                  : 'На сегодня задач нет',
              style: Theme.of(context)
                  .textTheme
                  .titleMedium
                  ?.copyWith(color: scheme.onSurfaceVariant),
            ),
            if (noAssignment) ...[
              const SizedBox(height: 8),
              Text(
                'Обратитесь к администратору',
                style: TextStyle(
                    color: scheme.onSurfaceVariant.withOpacity(0.6),
                    fontSize: 13),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _TaskCard extends StatelessWidget {
  final StoreTask task;
  final Color accentColor;
  final VoidCallback onTap;
  const _TaskCard(
      {required this.task, required this.onTap, required this.accentColor});

  Color _statusColor(ColorScheme scheme) {
    switch (task.status) {
      case 'Completed':
        return Colors.green.shade600;
      case 'In_Progress':
        return Colors.orange.shade700;
      default:
        return accentColor;
    }
  }

  String _statusLabel() {
    switch (task.status) {
      case 'Completed':
        return 'Выполнен';
      case 'In_Progress':
        return 'В работе';
      default:
        return 'Ожидает';
    }
  }

  IconData _statusIcon() {
    switch (task.status) {
      case 'Completed':
        return Icons.check_circle_rounded;
      case 'In_Progress':
        return Icons.pending_rounded;
      default:
        return Icons.radio_button_unchecked_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final sc = _statusColor(scheme);
    final isDone = task.status == 'Completed';

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: isDone ? null : onTap,
        child: IntrinsicHeight(
          child: Row(
            children: [
              Container(width: 5, color: sc),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 14, vertical: 14),
                  child: Row(
                    children: [
                      Icon(_statusIcon(), color: sc, size: 28),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              task.storeName,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 15,
                                color: isDone
                                    ? scheme.onSurface.withOpacity(0.5)
                                    : scheme.onSurface,
                              ),
                            ),
                            if (task.address.isNotEmpty) ...[
                              const SizedBox(height: 3),
                              Text(
                                task.address,
                                style: TextStyle(
                                  fontSize: 13,
                                  color: scheme.onSurfaceVariant,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: sc.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _statusLabel(),
                          style: TextStyle(
                            color: sc,
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
