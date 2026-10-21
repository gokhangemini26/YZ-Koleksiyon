---
description: Adım 1b — sync script'i yaz, verileri çek, data.json'a kaydet ve doğrulat
---

3d-dashboard skill'indeki kurallara uy.

`.env`'deki kaynaklardan (salt-okunur) işletme verisini okuyan bir sync script yaz ve en güncel rakamları `data.json`'a kaydet.
- Gruplar: müşteriler, ürünler ve stok, siparişler ve gelir, teslimatlar, bulduğun diğer şeyler.
- Her rakam için: değer, dönem (bugün / bu hafta / bu ay) ve kaynak. Ayrıca sync zamanını kaydet.
- **Sadece toplamlar ve sayılar.** Müşteri adı, e-posta, adres, kart bilgisi asla kaydedilmez. Anahtarlar asla yazdırılmaz.

Bir kez çalıştır. Her rakamı dönem ve kaynağıyla tablo olarak göster; tam tablo için neyin eksik olduğunu ve nereden alınabileceğini söyle.

Sonra kullanıcıdan 2-3 rakamı kendi uygulamasıyla (ör. bu ayın geliri, bugünkü siparişler) ve dönemleriyle karşılaştırmasını iste. Hata/eksik varsa düzeltip sync'i yeniden çalıştır. Doğrulanmadan sonraki adıma geçme.
