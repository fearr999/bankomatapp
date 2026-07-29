import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/db_service.dart';

class SkuReportScreen extends StatefulWidget {
  final String visitLocalId;
  const SkuReportScreen({super.key, required this.visitLocalId});

  @override
  State<SkuReportScreen> createState() => _SkuReportScreenState();
}

class _SkuReportScreenState extends State<SkuReportScreen> {
  List<ProductItem> _products = [];
  final Map<String, ReportEntry> _entries = {};
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadProducts();
  }

  Future<void> _loadProducts() async {
    try {
      final token = await AuthService.getToken();
      final userId = await AuthService.getUserId();
      // Каталог приходит вместе с задачами; для простоты запрашиваем ещё раз
      final res = await ApiService.getTasks(userId!, token!, 'merch');
      final products = (res['products'] as List? ?? [])
          .map((e) => ProductItem.fromJson(e as Map<String, dynamic>))
          .toList();
      setState(() {
        _products = products;
        for (final p in products) {
          _entries[p.productId] = ReportEntry(
            productId: p.productId,
            skuName: p.skuName,
            actualPrice: p.price,
          );
        }
      });
    } catch (e) {
      setState(() =>
          _error = 'Не удалось загрузить каталог: ${e.toString().replaceFirst("Exception: ", "")}');
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _save() async {
    final items = _entries.values.map((e) => e.toJson()).toList();
    await DbService.instance.queueReport(widget.visitLocalId, jsonEncode(items));
    if (mounted) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Учёт товаров (SKU)')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _save,
        icon: const Icon(Icons.save),
        label: const Text('Сохранить'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Text(_error!, textAlign: TextAlign.center)))
              : ListView.builder(
                  itemCount: _products.length,
                  itemBuilder: (ctx, i) {
                    final p = _products[i];
                    final e = _entries[p.productId]!;
                    return Card(
                      margin: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 6),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(p.skuName,
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold)),
                            Text(p.category,
                                style: TextStyle(
                                    color: Colors.grey.shade600, fontSize: 12)),
                            SwitchListTile(
                              contentPadding: EdgeInsets.zero,
                              title: const Text('В наличии'),
                              value: e.isAvailable,
                              onChanged: (v) =>
                                  setState(() => e.isAvailable = v),
                            ),
                            Row(
                              children: [
                                Expanded(
                                  child: TextFormField(
                                    initialValue: e.stockQty.toString(),
                                    keyboardType: TextInputType.number,
                                    decoration: const InputDecoration(
                                        labelText: 'Остаток'),
                                    onChanged: (v) =>
                                        e.stockQty = int.tryParse(v) ?? 0,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: TextFormField(
                                    initialValue: e.facingQty.toString(),
                                    keyboardType: TextInputType.number,
                                    decoration: const InputDecoration(
                                        labelText: 'Фейсинги'),
                                    onChanged: (v) =>
                                        e.facingQty = int.tryParse(v) ?? 0,
                                  ),
                                ),
                              ],
                            ),
                            TextFormField(
                              initialValue: e.actualPrice.toString(),
                              keyboardType:
                                  const TextInputType.numberWithOptions(decimal: true),
                              decoration:
                                  const InputDecoration(labelText: 'Цена на полке'),
                              onChanged: (v) =>
                                  e.actualPrice = double.tryParse(v) ?? 0,
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
