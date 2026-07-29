import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/db_service.dart';
import 'route_list_screen.dart';

class BusinessSelectScreen extends StatefulWidget {
  const BusinessSelectScreen({super.key});

  @override
  State<BusinessSelectScreen> createState() => _BusinessSelectScreenState();
}

class _BusinessSelectScreenState extends State<BusinessSelectScreen> {
  List<Business> _businesses = [];
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
      final res = await ApiService.getBusinesses(token!);
      final list = (res['businesses'] as List)
          .map((e) => Business.fromJson(e as Map<String, dynamic>))
          .toList();
      await DbService.instance
          .cacheBusinesses(list.map((b) => b.toJson()).toList());
      setState(() => _businesses = list);
    } catch (e) {
      final cached = await DbService.instance.getCachedBusinesses();
      if (cached.isNotEmpty) {
        setState(() {
          _businesses = cached.map((m) => Business.fromJson(m)).toList();
          _error = 'Офлайн-режим: показан сохранённый список';
        });
      } else {
        setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
      }
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _select(Business b) async {
    await AuthService.setSelectedBusiness(b.businessId, jsonEncode(b.toJson()));
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const RouteListScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Выбор направления'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            tooltip: 'Выйти',
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
            : CustomScrollView(
                slivers: [
                  if (_error != null)
                    SliverToBoxAdapter(
                      child: _Banner(
                        message: _error!,
                        color: scheme.tertiaryContainer,
                        textColor: scheme.onTertiaryContainer,
                        icon: Icons.cloud_off_rounded,
                      ),
                    ),
                  if (_businesses.isEmpty && !_loading)
                    SliverFillRemaining(
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(32),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.business_center_outlined,
                                  size: 64,
                                  color: scheme.onSurfaceVariant
                                      .withOpacity(0.4)),
                              const SizedBox(height: 16),
                              Text(
                                'Бизнесы не настроены',
                                style: Theme.of(context)
                                    .textTheme
                                    .titleMedium
                                    ?.copyWith(color: scheme.onSurfaceVariant),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Обратитесь к администратору',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium
                                    ?.copyWith(
                                        color: scheme.onSurfaceVariant
                                            .withOpacity(0.6)),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                  else
                    SliverPadding(
                      padding: const EdgeInsets.all(16),
                      sliver: SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (ctx, i) => Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: _BusinessCard(
                                business: _businesses[i],
                                onTap: () => _select(_businesses[i])),
                          ),
                          childCount: _businesses.length,
                        ),
                      ),
                    ),
                ],
              ),
      ),
    );
  }
}

class _BusinessCard extends StatelessWidget {
  final Business business;
  final VoidCallback onTap;
  const _BusinessCard({required this.business, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final color = business.materialColor;
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: IntrinsicHeight(
          child: Row(
            children: [
              Container(width: 6, color: color),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16, vertical: 18),
                  child: Row(
                    children: [
                      Container(
                        width: 52,
                        height: 52,
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        alignment: Alignment.center,
                        child: Text(business.icon,
                            style: const TextStyle(fontSize: 26)),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              business.name,
                              style: Theme.of(context)
                                  .textTheme
                                  .titleMedium
                                  ?.copyWith(fontWeight: FontWeight.w600),
                            ),
                            if (business.taskMode == 'cycle') ...[
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Icon(Icons.loop_rounded,
                                      size: 14,
                                      color: color.withOpacity(0.8)),
                                  const SizedBox(width: 4),
                                  Text('Цикловый режим',
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: color.withOpacity(0.8))),
                                ],
                              ),
                            ],
                          ],
                        ),
                      ),
                      Icon(Icons.chevron_right_rounded,
                          color: Theme.of(context)
                              .colorScheme
                              .onSurfaceVariant),
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

class _Banner extends StatelessWidget {
  final String message;
  final Color color;
  final Color textColor;
  final IconData icon;
  const _Banner(
      {required this.message,
      required this.color,
      required this.textColor,
      required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: color,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          Icon(icon, color: textColor, size: 18),
          const SizedBox(width: 10),
          Expanded(
              child: Text(message,
                  style: TextStyle(color: textColor, fontSize: 13))),
        ],
      ),
    );
  }
}
