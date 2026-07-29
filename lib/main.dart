import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'services/auth_service.dart';
import 'services/sync_service.dart';
import 'screens/login_screen.dart';
import 'screens/route_list_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // На десктопе (Windows/Linux/macOS) стандартный sqflite не работает —
  // подключаем FFI-реализацию поверх системного sqlite3.
  if (!kIsWeb && (Platform.isWindows || Platform.isLinux || Platform.isMacOS)) {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  }

  SyncService.start(); // фоновая синхронизация каждые N секунд, см. AppConfig
  runApp(const MerchandiserApp());
}

class MerchandiserApp extends StatelessWidget {
  const MerchandiserApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Полевой контроль',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.indigo,
        useMaterial3: true,
      ),
      home: const _StartupGate(),
    );
  }
}

class _StartupGate extends StatelessWidget {
  const _StartupGate();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: AuthService.isLoggedIn(),
      builder: (context, snap) {
        if (!snap.hasData) {
          return const Scaffold(
              body: Center(child: CircularProgressIndicator()));
        }
        return snap.data! ? const RouteListScreen() : const LoginScreen();
      },
    );
  }
}
