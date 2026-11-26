# SHΞN™ LLM
### موتور هوش مصنوعی اسمبلی | SHΞN™ Assembly Intelligence

<p align="center">
  <strong>هوش مصنوعی در پایین‌ترین لایه؛ هستهٔ اسمبلی x86-64 در کنار رابط اختصاصی SHΞN™</strong>
</p>

<p align="center">
  <a href="https://github.com/aishervin/ShenLLM">مخزن SHΞN™</a> ·
  <a href="https://github.com/alesha-pro/llm.asm">پروژهٔ مرجع llm.asm</a>
</p>

---

## معرفی

**SHΞN™ LLM** نسخهٔ بازبرندسازی‌شده و محیط توسعهٔ اختصاصی بر پایهٔ
پروژهٔ متن‌باز [llm.asm](https://github.com/alesha-pro/llm.asm) است.
پروژهٔ مرجع شامل سه پیاده‌سازی سطح‌پایین برای استنتاج مدل زبانی، اجرای
Bare Metal و آموزش Mini-GPT است که با اسمبلی خالص **x86-64 NASM** نوشته شده‌اند.

کد موتور اصلی در مسیر `engine/` به‌صورت **Git Submodule** متصل شده و روی
یک commit مشخص از مخزن اصلی pin شده است؛ بنابراین سورس اصلی و تاریخچهٔ
آن بدون کپی‌سازی ناقص یا حذف اعتبار نویسنده حفظ می‌شود.

این مخزن علاوه بر موتور مرجع، یک رابط وب React/TypeScript اختصاصی دارد.
توجه کنید که رابط وب فعلی هنوز به باینری موتور متصل نیست و برخی خروجی‌های
ترمینال و محیط آزمایش آن شبیه‌سازی هستند؛ آن‌ها را نباید اجرای واقعی مدل
یا بنچمارک سخت‌افزاری تلقی کرد.

## سه بخش موتور

| بخش | عملکرد |
|---|---|
| **01 · Qwen3 Inference** | موتور استنتاج Qwen3-0.6B برای Linux x86-64، با گفت‌وگوی چندمرحله‌ای و KV Cache |
| **02 · Bare-Metal OS** | هستهٔ قابل بوت برای اجرای Qwen3 بدون Linux یا Windows، با VGA، صفحه‌کلید PS/2 و Serial |
| **03 · Mini-GPT Trainer** | آموزش و نمونه‌گیری Mini-GPT از صفر، همراه با نمایش زندهٔ روند آموزش در ترمینال |

### فناوری‌های هسته

- اسمبلی خالص x86-64 با NASM
- محاسبات برداری AVX2، FMA و F16C
- هسته‌های ماتریسی GEMM/GEMV
- توکنایزر BPE و اجرای Transformer
- مدیریت چندریسمانی سطح پایین و SMP
- آموزش Mini-GPT با پس‌انتشار و AdamW

## دریافت کامل مخزن

برای دریافت رابط SHΞN و سورس موتور اسمبلی با هم، حتماً از گزینهٔ
`--recurse-submodules` استفاده کنید:

```bash
git clone --recurse-submodules https://github.com/aishervin/ShenLLM.git
cd ShenLLM
```

اگر قبلاً مخزن را بدون submodule کلون کرده‌اید:

```bash
git submodule update --init --recursive
```

## اجرای رابط وب

نیازمندی: Node.js و npm

```bash
npm install
npm run dev
```

ساخت نسخهٔ انتشار:

```bash
npm run build
npm run preview
```

## ساخت موتور اسمبلی

موتور مرجع برای Linux روی پردازندهٔ x86-64 طراحی شده و به پشتیبانی
AVX2، FMA و F16C نیاز دارد. ابزارهای ساخت اصلی NASM و GNU Binutils هستند.

```bash
sudo apt update
sudo apt install -y nasm binutils make
cd engine
make all
```

برای اجرای مدل، باید وزن‌های سازگار Qwen3-0.6B را طبق راهنمای موتور آماده کنید.
فایل‌های حجیم مدل عمداً در Git نگهداری نمی‌شوند.

### راهنماهای تخصصی

- [استنتاج Qwen3](https://github.com/alesha-pro/llm.asm/tree/main/01-qwen3-inference)
- [سیستم Bare Metal](https://github.com/alesha-pro/llm.asm/tree/main/02-baremetal-os)
- [آموزش Mini-GPT](https://github.com/alesha-pro/llm.asm/tree/main/03-minigpt-train)

## رابط وب SHΞN™

رابط فعلی شامل Chat Terminal، Assembly Playground، Bare Metal، Benchmarks،
Trainer و Architecture Docs است.

**وضعیت اتصال:** چت و اجرای Playground در رابط فعلی نمایشی/شبیه‌سازی هستند.
اتصال واقعی به باینری موتور، دریافت خروجی واقعی مدل، اندازه‌گیری سرعت و
گزارش وضعیت سخت‌افزار در مسیر توسعه قرار دارند.

## سازگاری

- موتور اصلی: Linux روی x86-64
- نیازمندی پردازنده: AVX2 + FMA + F16C
- اجرای Bare Metal: سخت‌افزار سازگار یا ماشین مجازی x86-64
- Android، Termux و ARM در نسخهٔ اصلی پشتیبانی مستقیم ندارند و نیازمند پورت مستقل‌اند.

## ساختار مخزن

```text
ShenLLM/
├── engine/              # سورس اصلی llm.asm به‌صورت Git Submodule
├── src/
│   ├── components/      # اجزای رابط وب SHΞN
│   ├── data/            # داده‌ها و نمونه‌های نمایشی
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
├── .gitmodules
├── LICENSE
└── README.md
```

## مسیر توسعه

1. تکمیل هویت بصری و مستندات فارسی SHΞN™.
2. اتصال امن و واقعی رابط به موتور اسمبلی از طریق یک لایهٔ اجرایی مشخص.
3. جایگزینی پاسخ‌ها و خروجی‌های ساختگی با داده‌های واقعی موتور.
4. نمایش وضعیت مدل، پردازنده، توکن‌های تولیدشده و زمان اجرا بر اساس دادهٔ واقعی.
5. افزودن تست ساخت و بررسی سازگاری هر سه زیرپروژه.

## اعتبار و مجوز

- **نام نسخه:** SHΞN™ LLM
- **نگهدارندهٔ این نسخه:** [aishervin](https://github.com/aishervin)
- **پروژهٔ پایه:** [alesha-pro/llm.asm](https://github.com/alesha-pro/llm.asm)
- **پدیدآورندهٔ پروژهٔ پایه:** Alexey Fateev (alesha-pro)
- **مجوز کد موتور:** MIT

این مخزن بازبرندسازی مستقل است، نه ادعای تألیف کد اصلی. اعلان حق نشر،
اعتبار پدیدآورنده و شرایط مجوز MIT باید همراه کد مشتق‌شده حفظ شوند.
فایل `LICENSE` متن مجوز اصلی را نگه می‌دارد و submodule نیز به commit
مشخصی از پروژهٔ اصلی اشاره می‌کند.

---

<p align="center">
  <strong>SHΞN™</strong><br>
  <sub>Assembly Intelligence · Built from the metal up</sub>
</p>
