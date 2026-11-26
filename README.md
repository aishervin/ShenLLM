# SHΞN™ LLM
### موتور هوش مصنوعی اسمبلی | SHΞN™ Assembly Intelligence

<p align="center">
  <strong>یک رابط و محیط پژوهشی برای اجرای مدل‌های زبانی در پایین‌ترین لایهٔ نرم‌افزار</strong>
</p>

<p align="center">
  <a href="https://github.com/aishervin/ShenLLM">مخزن SHΞN™</a> ·
  <a href="https://github.com/alesha-pro/llm.asm">پروژهٔ مرجع llm.asm</a>
</p>

---

## دربارهٔ پروژه

**SHΞN™ LLM** بازبرندسازی و محیط توسعهٔ مبتنی بر پروژهٔ متن‌باز
[llm.asm](https://github.com/alesha-pro/llm.asm) است؛ پروژه‌ای که سه پیاده‌سازی
سطح‌پایین برای استنتاج مدل زبانی، اجرای Bare Metal و آموزش Mini-GPT را با
اسمبلی خالص **x86-64 NASM** ارائه می‌کند.

این مخزن همچنین یک رابط وب React/TypeScript برای نمایش مفاهیم، معماری و
آزمایش‌های تعاملی دارد. رابط وب و موتور اسمبلی دو بخش متفاوت‌اند:
**نمایشگر فعلی به‌تنهایی موتور واقعی استنتاج نیست و هنوز به باینری اجرایی
llm.asm متصل نشده است.**

هدف نسخهٔ SHΞN، حفظ هستهٔ فنی پروژهٔ مرجع، ارائهٔ مستندات فارسی دقیق،
هویت بصری مستقل و در ادامه اتصال رابط به موتور واقعی است؛ بدون نسبت دادن
قابلیت‌های شبیه‌سازی‌شده به اجرای واقعی مدل.

## قابلیت‌های پروژهٔ مرجع

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

## رابط وب فعلی SHΞN™

رابط فعلی شامل بخش‌های زیر است:

- **Chat Terminal:** رابط نمایشی گفت‌وگو؛ در وضعیت فعلی پاسخ‌ها شبیه‌سازی شده‌اند.
- **Assembly Playground:** نمایش و ویرایش نمونه‌کدهای اسمبلی؛ اجرای فعلی شبیه‌سازی است.
- **Bare Metal:** نمایش مفاهیم راه‌اندازی و ساختار سیستم Bare Metal.
- **Benchmarks:** بخش نمایش اطلاعات و مقایسهٔ عملکرد.
- **Trainer:** نمایش مفاهیم و روند آموزش.
- **Architecture Docs:** مستندات معماری.

هیچ‌کدام از اعداد سرعت، رجیسترها یا خروجی‌های تولیدشده توسط شبیه‌ساز رابط
نباید به‌عنوان اندازه‌گیری سخت‌افزاری یا پاسخ واقعی Qwen3 تلقی شوند.

## اجرای رابط وب

برای اجرای رابط فعلی به Node.js و npm نیاز دارید:

```bash
git clone https://github.com/aishervin/ShenLLM.git
cd ShenLLM
npm install
npm run dev
```

برای ساخت نسخهٔ انتشار:

```bash
npm run build
npm run preview
```

## اجرای موتور اسمبلی اصلی

موتور مرجع به Linux روی پردازندهٔ x86-64 نیاز دارد و برای اجرا به AVX2،
FMA و F16C وابسته است. ابزارهای ساخت اصلی NASM و GNU Binutils هستند.

راهنمای کامل و سورس اجرایی در مخزن اصلی نگهداری می‌شوند:
[alesha-pro/llm.asm](https://github.com/alesha-pro/llm.asm).

ساختار و فرمان‌های پروژهٔ مرجع:

```bash
git clone https://github.com/alesha-pro/llm.asm.git
cd llm.asm
sudo apt install nasm binutils make
make all
```

برای اجرای مدل، باید وزن‌های سازگار Qwen3-0.6B را طبق راهنمای پروژهٔ مرجع
آماده کنید. جزئیات هر بخش در مستندات اصلی آمده است:

- [راهنمای استنتاج Qwen3](https://github.com/alesha-pro/llm.asm/tree/main/01-qwen3-inference)
- [راهنمای سیستم Bare Metal](https://github.com/alesha-pro/llm.asm/tree/main/02-baremetal-os)
- [راهنمای آموزش Mini-GPT](https://github.com/alesha-pro/llm.asm/tree/main/03-minigpt-train)

> **محدودیت سازگاری:** هستهٔ مرجع x86-64 است. اجرای مستقیم روی Android،
> Termux یا پردازنده‌های ARM پشتیبانی‌شده نیست و به پورت و بازنویسی مستقل نیاز دارد.

## ساختار فعلی مخزن

```text
ShenLLM/
├── src/
│   ├── components/     # اجزای رابط وب
│   ├── data/           # داده‌ها و نمونه‌های نمایشی
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
```

## مسیر توسعه

1. نگهداری و تکمیل رابط وب با هویت بصری SHΞN™.
2. وارد کردن سورس واقعی موتور اسمبلی و حفظ ساختار و مجوز پروژهٔ پایه.
3. جایگزین کردن پاسخ‌ها و خروجی‌های ساختگی رابط با اتصال واقعی به موتور.
4. ارائهٔ وضعیت واقعی پردازنده، مدل بارگذاری‌شده، توکن‌های تولیدشده و زمان اجرا.
5. افزودن تست ساخت و بررسی سازگاری برای هر سه زیرپروژه.

## اعتبار و مجوز

- **نام و برند این نسخه:** SHΞN™ LLM
- **نگهدارندهٔ نسخهٔ بازبرندسازی‌شده:** [aishervin](https://github.com/aishervin)
- **پروژهٔ پایه:** [alesha-pro/llm.asm](https://github.com/alesha-pro/llm.asm)
- **پدیدآورندهٔ پروژهٔ پایه:** Alexey Fateev (alesha-pro)
- **مجوز کد پروژهٔ پایه:** MIT

این پروژه بازبرندسازی مستقل است، نه ادعای تألیف کد اصلی. اعلان حق نشر،
اعتبار پدیدآورنده و شرایط مجوز MIT باید همراه کد مشتق‌شده حفظ شوند.

---

<p align="center">
  <strong>SHΞN™</strong><br>
  <sub>Assembly Intelligence · Built from the metal up</sub>
</p>
