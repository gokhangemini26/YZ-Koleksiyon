---
description: Adım 1a — projeyi kur, anahtarlar için güvenli .env ve .gitignore oluştur
---

3d-dashboard skill'indeki kurallara uy.

Bu klasörü canlı 3D dashboard projesi olarak kur:
- Boş yuvalarla özel bir `.env` oluştur: STRIPE_KEY, SQUARE_TOKEN, SHOPIFY_STORE, SHOPIFY_TOKEN, SHEET_CSV_URL (kullanıcının kullanmadıklarını çıkar; önce hangi kaynakları kullandığını sor).
- `.env`'in asla yüklenmediği/paylaşılmadığı bir `.gitignore` ekle (`.env`, `sync.log`, `node_modules`).
- Kullanıcıdan anahtarları bu sohbete yapıştırmasını **isteme**. `.env`'i kendisinin nasıl açıp dolduracağını anlat.
- Salt-okunur anahtar almak için kaynak tablosundan ilgili yolu göster (skill'deki "Veri kaynakları" bölümü).
