import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'business_select_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  String _pin = '';
  bool _loading = false;
  String? _error;
  late AnimationController _shakeCtrl;
  late Animation<double> _shakeAnim;

  static const _maxPin = 6;

  @override
  void initState() {
    super.initState();
    _shakeCtrl = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 400));
    _shakeAnim = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _shakeCtrl, curve: Curves.elasticOut),
    );
  }

  @override
  void dispose() {
    _shakeCtrl.dispose();
    super.dispose();
  }

  void _onDigit(String d) {
    if (_pin.length >= _maxPin || _loading) return;
    setState(() {
      _pin += d;
      _error = null;
    });
    if (_pin.length == _maxPin) _submit();
  }

  void _onDelete() {
    if (_pin.isEmpty || _loading) return;
    setState(() => _pin = _pin.substring(0, _pin.length - 1));
  }

  Future<void> _submit() async {
    if (_pin.isEmpty || _loading) return;
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      await AuthService.loginWithPin(_pin);
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const BusinessSelectScreen()),
      );
    } catch (e) {
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
        _pin = '';
      });
      _shakeCtrl.forward(from: 0);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Scaffold(
      backgroundColor: scheme.surface,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(height: 16),
                  _Logo(color: scheme.primary,
                      containerColor: scheme.primaryContainer),
                  const SizedBox(height: 24),
                  Text('Рабочее место',
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 6),
                  Text('Введите ваш PIN-код',
                      style: Theme.of(context)
                          .textTheme
                          .bodyMedium
                          ?.copyWith(color: scheme.onSurfaceVariant)),
                  const SizedBox(height: 36),
                  AnimatedBuilder(
                    animation: _shakeAnim,
                    builder: (_, child) => Transform.translate(
                      offset: Offset(
                          8 * (0.5 - (_shakeAnim.value % 1)).abs() *
                              (_shakeCtrl.isAnimating ? 1 : 0),
                          0),
                      child: child,
                    ),
                    child: _PinDots(
                        current: _pin.length,
                        max: _maxPin,
                        hasError: _error != null,
                        scheme: scheme),
                  ),
                  const SizedBox(height: 16),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 200),
                    child: _error != null
                        ? Container(
                            key: ValueKey(_error),
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16, vertical: 10),
                            decoration: BoxDecoration(
                              color: scheme.errorContainer,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              _error!,
                              textAlign: TextAlign.center,
                              style:
                                  TextStyle(color: scheme.onErrorContainer),
                            ),
                          )
                        : const SizedBox(height: 44),
                  ),
                  const SizedBox(height: 8),
                  if (_loading)
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 32),
                      child: CircularProgressIndicator(),
                    )
                  else
                    _Keypad(
                      onDigit: _onDigit,
                      onDelete: _onDelete,
                      onConfirm: _pin.isNotEmpty ? _submit : null,
                    ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Logo extends StatelessWidget {
  final Color color;
  final Color containerColor;
  const _Logo({required this.color, required this.containerColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 88,
      height: 88,
      decoration: BoxDecoration(
        color: containerColor,
        borderRadius: BorderRadius.circular(28),
      ),
      child: Icon(Icons.badge_rounded, size: 48, color: color),
    );
  }
}

class _PinDots extends StatelessWidget {
  final int current;
  final int max;
  final bool hasError;
  final ColorScheme scheme;
  const _PinDots(
      {required this.current,
      required this.max,
      required this.hasError,
      required this.scheme});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(max, (i) {
        final filled = i < current;
        final errorColor = scheme.error;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          curve: Curves.easeOut,
          margin: const EdgeInsets.symmetric(horizontal: 7),
          width: filled ? 18 : 14,
          height: filled ? 18 : 14,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: hasError
                ? (filled ? errorColor : Colors.transparent)
                : (filled ? scheme.primary : Colors.transparent),
            border: Border.all(
              color: hasError
                  ? errorColor
                  : (filled ? scheme.primary : scheme.outlineVariant),
              width: 2,
            ),
          ),
        );
      }),
    );
  }
}

class _Keypad extends StatelessWidget {
  final void Function(String) onDigit;
  final VoidCallback onDelete;
  final VoidCallback? onConfirm;

  const _Keypad(
      {required this.onDigit,
      required this.onDelete,
      required this.onConfirm});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        _row(context, ['1', '2', '3']),
        const SizedBox(height: 10),
        _row(context, ['4', '5', '6']),
        const SizedBox(height: 10),
        _row(context, ['7', '8', '9']),
        const SizedBox(height: 10),
        _row(context, ['confirm', '0', 'delete']),
      ],
    );
  }

  Widget _row(BuildContext context, List<String> keys) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: keys
          .map((k) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: _Key(
                  value: k,
                  onDigit: onDigit,
                  onDelete: onDelete,
                  onConfirm: onConfirm,
                ),
              ))
          .toList(),
    );
  }
}

class _Key extends StatelessWidget {
  final String value;
  final void Function(String) onDigit;
  final VoidCallback onDelete;
  final VoidCallback? onConfirm;

  const _Key(
      {required this.value,
      required this.onDigit,
      required this.onDelete,
      required this.onConfirm});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    const size = 76.0;

    if (value == 'confirm') {
      return SizedBox(
        width: size,
        height: size,
        child: onConfirm != null
            ? Material(
                color: scheme.primary,
                borderRadius: BorderRadius.circular(22),
                child: InkWell(
                  borderRadius: BorderRadius.circular(22),
                  onTap: onConfirm,
                  child: const Icon(Icons.check_rounded,
                      color: Colors.white, size: 28),
                ),
              )
            : const SizedBox(),
      );
    }

    if (value == 'delete') {
      return SizedBox(
        width: size,
        height: size,
        child: Material(
          color: scheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(22),
          child: InkWell(
            borderRadius: BorderRadius.circular(22),
            onTap: onDelete,
            onLongPress: onDelete,
            child: Icon(Icons.backspace_outlined,
                color: scheme.onSurfaceVariant, size: 22),
          ),
        ),
      );
    }

    return SizedBox(
      width: size,
      height: size,
      child: Material(
        color: scheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(22),
        child: InkWell(
          borderRadius: BorderRadius.circular(22),
          onTap: () => onDigit(value),
          child: Center(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.w500,
                color: scheme.onSurface,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
