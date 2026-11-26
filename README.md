# SHΞN™ LLM
### موتور هوش مصنوعی اسمبلی | SHΞN™ Assembly Intelligence

<p align="center">
  <strong>هوش مصنوعی در پایین‌ترین لایه؛ بدون وابستگی به کتابخانه‌های زمان اجرا</strong>
</p>

<p align="center">
  <a href="https://github.com/aishervin/ShenLLM">مخزن SHΞN™</a> ·
  <a href="https://github.com/alesha-pro/llm.asm">پروژهٔ پایه</a>
</p>

---

## معرفی

**SHΞN™ LLM** نسخهٔ بازبرندسازی‌شده و توسعه‌یافتهٔ پروژهٔ متن‌باز
[llm.asm](https://github.com/alesha-pro/llm.asm) است؛ مجموعه‌ای از ابزارهای
اجرای مدل زبانی و آموزش شبکهٔ عصبی که هستهٔ محاسباتی آن با اسمبلی خالص
**x86-64 NASM** نوشته شده است.

هدف این پروژه ارائهٔ یک پیاده‌سازی کوچک، قابل بررسی و کم‌وابستگی از اجرای
مدل زبانی روی پردازنده است؛ از اجرای مدل در Linux تا راه‌اندازی مستقیم روی
سخت‌افزار سازگار، بدون نیاز به یک سیستم‌عامل میزبان.

> این مخزن بر پایهٔ کد پروژهٔ اصلی ساخته می‌شود. تغییر نام و هویت بصری،
> به معنی ادعای مالکیت بر کد اصلی نیست؛ حقوق پدیدآورنده و مجوز اصلی محفوظ است.

## سه بخش اصلی

| بخش | توضیح |
|---|---|
| **01 · Qwen3 Inference** | موتور استنتاج Qwen3-0.6B در قالب ELF ایستای Linux با گفت‌وگوی چندمرحله‌ای و KV Cache |
| **02 · Bare-Metal OS** | هستهٔ قابل بوت برای اجرای Qwen3 بدون Linux یا Windows، با ورودی صفحه‌کلید و خروجی VGA/Serial |
| **03 · Mini-GPT Trainer** | پیاده‌سازی آموزش و نمونه‌گیری Mini-GPT از صفر، همراه با نمایش زندهٔ روند آموزش در ترمینال |

### فناوری‌ها

- اسمبلی خالص x86-64 با NASM
- محاسبات برداری AVX2، FMA و F16C
- هسته‌های ماتریسی GEMM/GEMV و مکانیزم توجه GQA
- توکنایزر BPE و اجرای Transformer
- مدیریت چندریسمانی سطح پایین در Linux و SMP در حالت Bare Metal
- آموزش Mini-GPT با پس‌انتشار و AdamW

## وضعیت سازگاری

این پروژه برای **پردازنده‌های x86-64** طراحی شده است و به پشتیبانی
دستورالعمل‌های AVX2، FMA و F16C نیاز دارد.

- اجرای بخش استنتاج و آموزش: Linux روی x86-64
- اجرای نسخهٔ Bare Metal: سخت‌افزار سازگار یا ماشین مجازی x86-64
- ابزار ساخت: NASM و GNU Binutils
- ساخت ISO بوتیبل: ابزارهای GRUB و xorriso
- اندروید، Termux و پردازنده‌های ARM در نسخهٔ اصلی پشتیبانی مستقیم ندارند.

## شروع سریع

پس از قرار گرفتن سورس کامل پروژه در این مخزن، ساخت همهٔ بخش‌ها از ریشهٔ
پروژه با دستورهای زیر انجام می‌شود:

```bash
sudo apt update
sudo apt install -y nasm binutils make
make all
```

برای جزئیات دانلود وزن‌های مدل، ساخت هر بخش و اجرای آن، راهنماهای تخصصی
هر زیرپروژه را ببینید:

- `01-qwen3-inference/README.md`
- `02-baremetal-os/README.md`
- `03-minigpt-train/README.md`

### اجرای موتور استنتاج

پس از آماده‌سازی فایل وزن مدل و ساخت برنامه:

```bash
./build/asm-llm -m models/qwen3-0.6b-q8_0.asmbin --chat -t 16
```

### اجرای سیستم Bare Metal در QEMU

```bash
make os FAST_Q8=1
make os-run MODEL=models/qwen3-0.6b-q8_0.asmbin SMP=16
```

### آموزش Mini-GPT

```bash
make train
./build/asm-gpt-train --data data/tinyshakespeare.txt --steps 400 --seq 128 -t 16
```

> فرمان‌ها و مسیرهای بالا مطابق ساختار پروژهٔ مرجع هستند؛ اجرای آن‌ها منوط
> به حضور فایل‌های سورس، ابزارهای لازم و وزن‌های مدل است.

## ساختار مورد انتظار مخزن

```text
ShenLLM/
├── 01-qwen3-inference/
├── 02-baremetal-os/
├── 03-minigpt-train/
├── shared/
├── scripts/
├── assets/
├── Makefile
├── LICENSE
└── README.md
```

## اعتبار و منشأ پروژه

- **نام نسخهٔ بازبرندسازی‌شده:** SHΞN™ LLM
- **نگهدارندهٔ این نسخه:** [aishervin](https://github.com/aishervin)
- **پروژهٔ پایه:** [alesha-pro/llm.asm](https://github.com/alesha-pro/llm.asm)
- **پدیدآورندهٔ پروژهٔ پایه:** Alexey Fateev (alesha-pro)
- **مجوز کد اصلی:** MIT

این مخزن یک بازبرندسازی مستقل از پروژهٔ پایه است. هرگونه تغییر در کد،
مستندات و بسته‌بندی نسخهٔ SHΞN باید در کنار حفظ اعلان حق نشر و شرایط
مجوز MIT انجام شود.

## سلب مسئولیت

این نرم‌افزار بدون هیچ‌گونه ضمانت ارائه می‌شود. اعداد عملکرد و نتایج
بنچمارک، در صورت ذکر، گزارش پروژهٔ پایه هستند و لزوماً روی سخت‌افزار
یا محیط اجرای شما تکرار نمی‌شوند.

---

<p align="center">
  <strong>SHΞN™</strong><br>
  <sub>Assembly Intelligence · Built from the metal up</sub>
</p>
