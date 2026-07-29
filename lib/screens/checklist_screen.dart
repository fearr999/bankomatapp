import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/db_service.dart';

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

  @override
  void initState() {
    super.initState();
    for (final f in widget.business.checklistSchema) {
      _answers[f.id] = f.type == 'checkbox' ? false : '';
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
        title: Text('Чек-лист: ${widget.business.name}'),
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
              ],
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
