import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';

/// Экран для руководителя: прогресс каждой бригады/работника по каждому
/// цикловому бизнесу (например, банкоматам) — сколько устройств закрыто
/// из скольких закреплено в текущем цикле, и что именно ещё не закрыто.
/// Дублирует то, что видно в веб-панели, но прямо внутри приложения.
class AdminOverviewScreen extends StatefulWidget {
  const AdminOverviewScreen({super.key});

  @override
  State<AdminOverviewScreen> createState() => _AdminOverviewScreenState();
}

class _AdminOverviewScreenState extends State<AdminOverviewScreen> {
  List<Map<String, dynamic>> _groups = [];
  bool _loading = true;
  String? _error;

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
      final token = await AuthService.getToken();
      final res = await ApiService.getCycleOverview(token!);
      final groups = (res['groups'] as List).cast<Map<String, dynamic>>();
      setState(() => _groups = groups);
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Обзор по бригадам')),
      body: RefreshIndicator(
        onRefresh: _load,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _error != null
                ? ListView(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(24),
                        child: Text(_error!,
                            style: const TextStyle(color: Colors.red)),
                      ),
                    ],
                  )
                : _groups.isEmpty
                    ? const Center(
                        child: Padding(
                          padding: EdgeInsets.all(32),
                          child: Text(
                              'Пока нет ни одной бригады с закреплёнными устройствами'),
                        ),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(12),
                        itemCount: _groups.length,
                        itemBuilder: (_, i) => _GroupCard(group: _groups[i]),
                      ),
      ),
    );
  }
}

class _GroupCard extends StatelessWidget {
  final Map<String, dynamic> group;
  const _GroupCard({required this.group});

  @override
  Widget build(BuildContext context) {
    final total = group['total'] as int;
    final done = group['done'] as int;
    final progress = total == 0 ? 0.0 : done / total;
    final pending =
        (group['pendingDevices'] as List).cast<Map<String, dynamic>>();
    final allDone = total > 0 && done == total;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        title: Text(
          '${group['userName']} — ${group['businessName']}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 6),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Цикл №${group['cycleNumber']} · закрыто $done из $total'),
              const SizedBox(height: 4),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: progress,
                  minHeight: 6,
                  backgroundColor: Colors.grey.shade300,
                  color: allDone ? Colors.green : Theme.of(context).primaryColor,
                ),
              ),
            ],
          ),
        ),
        children: pending.isEmpty
            ? [
                const Padding(
                  padding: EdgeInsets.all(12),
                  child: Text('✅ Всё закрыто в этом цикле',
                      style: TextStyle(color: Colors.green)),
                )
              ]
            : pending
                .map((s) => ListTile(
                      dense: true,
                      leading: const Icon(Icons.radio_button_unchecked,
                          color: Colors.orange),
                      title: Text(s['name']?.toString().isNotEmpty == true
                          ? s['name'].toString()
                          : s['storeId'].toString()),
                    ))
                .toList(),
      ),
    );
  }
}
