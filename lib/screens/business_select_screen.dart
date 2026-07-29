import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/db_service.dart';
import 'route_list_screen.dart';

/// Показывается сразу после логина (и доступен повторно из "Мой маршрут"),
/// чтобы работник выбрал, с каким бизнесом сейчас работает —
/// у каждого свой набор точек и свой чек-лист.
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
    return Scaffold(
      appBar: AppBar(
        title: const Text('Выберите бизнес'),
        actions: [
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
                padding: const EdgeInsets.all(16),
                children: [
                  if (_error != null)
                    Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(8),
                      color: Colors.orange.shade50,
                      child: Text(_error!, textAlign: TextAlign.center),
                    ),
                  if (_businesses.isEmpty && !_loading)
                    const Padding(
                      padding: EdgeInsets.all(32),
                      child: Center(
                          child: Text(
                              'Бизнесы не настроены. Обратитесь к администратору.')),
                    ),
                  ..._businesses.map((b) => _BusinessCard(
                        business: b,
                        onTap: () => _select(b),
                      )),
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
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: color.withOpacity(0.25)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
          child: Row(
            children: [
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(14),
                ),
                alignment: Alignment.center,
                child: Text(business.icon, style: const TextStyle(fontSize: 28)),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  business.name,
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.w600),
                ),
              ),
              Icon(Icons.chevron_right, color: color),
            ],
          ),
        ),
      ),
    );
  }
}
