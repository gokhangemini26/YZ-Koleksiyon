---
description: Adım 4 — sync'i 5 dakikada bir otomatik çalıştır, sunucuyu açılışta başlat
---

3d-dashboard skill'indeki kurallara uy.

Dashboard'u kendi kendine çalışır hale getir:
- Sync script'i her 5 dakikada bir çalıştır ve yerel sunucuyu ayakta tut.
- İkisini de bilgisayar açılınca otomatik başlat (Mac'te arka plan işi / launchd, Windows'ta zamanlanmış görev, Linux'ta systemd/cron). İşletim sistemini önce tespit et.
- Her sync'i `sync.log`'a yaz. Sync başarısız olursa **son iyi rakamları koru**, dashboard'da son başarılı sync zamanını göster ve bir sonraki turda tekrar dene.
- Sade Türkçe bir `README.md` yaz: dashboard nasıl açılır, nasıl durdurulur/yeniden başlatılır, çalıştığı nasıl kontrol edilir.

Sonra her şeyi bundan sonra çalışacağı şekilde yeniden başlat ve çalıştığını göster. Kullanıcıya şunu kontrol ettir: LIVE etiketi 5 dk'da bir sıfırlanıyor mu; kaynakta bir sayı değişince kart yenilemeden güncelleniyor mu; bilgisayar yeniden başladıktan sonra hâlâ güncelleniyor mu. Daha sık istenirse 1 dakikaya düşürülebilir.
