import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, "../../assets/fonts");

/// pdfkit-встроенные шрифты (Helvetica и т.п.) не поддерживают кириллицу —
/// без регистрации своего TTF русский/узбекский текст в PDF выходит
/// нечитаемыми символами (WinAnsi-транслитерация вместо кириллицы).
export function registerCyrillicFonts(doc: PDFKit.PDFDocument) {
  doc.registerFont("Regular", path.join(FONTS_DIR, "DejaVuSans.ttf"));
  doc.registerFont("Bold", path.join(FONTS_DIR, "DejaVuSans-Bold.ttf"));
  doc.font("Regular");
}
