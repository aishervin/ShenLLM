# SHΞN™ LLM

مجموعهٔ سه موتور هوش مصنوعی نوشته‌شده با **NASM x86-64**؛ همراه با رابط وب SHΞN.

## سورس اسمبلی

کد موتور در [engine](https://github.com/alesha-pro/llm.asm/tree/48feccbfd57cb669440f31ff64958d95bb8b848e) نگهداری می‌شود و به‌صورت Git Submodule به همین نسخهٔ مشخص متصل است.

### 01 · Qwen3 Inference
موتور استنتاج Qwen3-0.6B برای Linux x86-64:
- [main.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/01-qwen3-inference/main.asm)
- [test_math.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/01-qwen3-inference/test_math.asm)

### 02 · Bare-Metal OS
هستهٔ قابل بوت بدون Linux؛ شامل راه‌اندازی پردازنده، درایورها، وقفه‌ها و SMP:
- [boot.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/02-baremetal-os/boot.asm)
- [kernel.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/02-baremetal-os/kernel.asm)
- [drivers.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/02-baremetal-os/drivers.asm)
- [smp.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/02-baremetal-os/smp.asm)
- [runtime.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/02-baremetal-os/runtime.asm)

### 03 · Mini-GPT Trainer
آموزش و اجرای Mini-GPT از صفر با اسمبلی:
- [main.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/03-minigpt-train/main.asm)
- [model.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/03-minigpt-train/model.asm)
- [kernels.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/03-minigpt-train/kernels.asm)
- [sgemm.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/03-minigpt-train/sgemm.asm)
- [tui.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/03-minigpt-train/tui.asm)

### هستهٔ مشترک
- [math.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/math.asm) — توابع ریاضی، RMSNorm، RoPE و Softmax
- [matmul.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/matmul.asm) — ضرب ماتریسی AVX2/FMA
- [transformer.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/transformer.asm) — Transformer و KV Cache
- [tokenizer.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/tokenizer.asm) — توکنایزر BPE
- [threads.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/threads.asm) — اجرای چندریسمانی
- [syscalls.asm](https://github.com/alesha-pro/llm.asm/blob/48feccbfd57cb669440f31ff64958d95bb8b848e/shared/syscalls.asm) — فراخوانی مستقیم Linux

## نصب و اجرا

```bash
git clone --recurse-submodules https://github.com/aishervin/ShenLLM.git
cd ShenLLM
npm install
npm run dev
```

ساخت موتور روی Linux x86-64:

```bash
sudo apt install nasm binutils make
cd engine
make all
```

نیازمندی موتور: x86-64 با AVX2، FMA و F16C. وزن‌های مدل جداگانه تهیه می‌شوند.

## وضعیت

رابط React در مخزن است؛ Chat و Playground هنوز به موتور وصل نیستند و خروجی آن‌ها شبیه‌سازی است.

## اعتبار

سورس اسمبلی از [alesha-pro/llm.asm](https://github.com/alesha-pro/llm.asm) با مجوز MIT است. اعتبار نویسندهٔ اصلی حفظ شده؛ رابط و بسته‌بندی SHΞN™ توسط [aishervin](https://github.com/aishervin) نگهداری می‌شود.