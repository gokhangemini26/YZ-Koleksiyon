---
description: Adım 5 (opsiyonel) — dashboard'u şifreli olarak yayınla ve günlük özet ekle
---

3d-dashboard skill'indeki kurallara uy. Bu adım dışarıya yayın içerir: **kullanıcı onayı almadan deploy etme.**

**Yayınlama**
- Dashboard'u ekibin her yerden açabilmesi için çevrimiçi yayınla. Ücretsiz/düşük maliyetli bir host öner (Vercel veya Netlify) ve maliyetini söyle.
- Anahtarları sadece host'un özel ortam ayarlarında tut; sayfaya veya koda asla koyma.
- Bilgisayardaki zamanlayıcı yerine, sayfa istediğinde taze rakamları çek (2 dakika önbellekli).
- Şifre koruması ekle. Hesabı kullanıcı kendisi açar; adım adım yol göster. Link ve şifre sadece ekiple paylaşılmalı (sayfa gerçek geliri gösterir).

**Günlük özet (opsiyonel)**
- Her sabah 07:00'de çalışan zamanlanmış görev kur: bugünkü `data.json`'ı son 7 günle karşılaştır, neyin değiştiğini ve olağandışı şeyleri 3 satırda `summary.json`'a yaz.
- Dashboard'un üstünde ince bir banner olarak göster. Her günün rakamlarının kopyasını sakla.
- Her çalışma Claude kullanımından küçük pay alır; günlük yeterli.
