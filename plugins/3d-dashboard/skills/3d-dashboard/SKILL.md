---
name: 3d-dashboard
description: İşletmenin canlı verileriyle çalışan interaktif 3D (Three.js) dashboard kurma rehberi. Kullanıcı "3D dashboard", "canlı iş dünyası", "Stripe/Square/Shopify/Google Sheets verisini 3D göster" gibi bir şey istediğinde veya /3d-dashboard:* komutları çalıştığında kullan.
---

# 3D Dashboard — Canlı İşletme Dünyası

Sonuç: Müşterilerin, ürünlerin, teslimatların ve gelirin birer nesne olduğu animasyonlu 3D bir dünya. Nesneye tıklayınca parlar ve gerçek rakamları gösteren buzlu cam kart açılır. Rakamlar kendiliğinden yenilenir.

## Üç parçalı döngü
1. **Sync script** — Stripe/Square/Shopify/Sheets'ten her 5 dk'da son rakamları çeker.
2. **`data.json`** — rakamları tutar (değer, dönem, kaynak, sync zamanı).
3. **3D dashboard** — `data.json`'ı her 60 sn okur, kartları günceller.

## Akış (aynı oturum, aynı klasör)
`/3d-dashboard:setup` → `connect-data` → `design-world` → `build` → `go-live` → (ops.) `share`. Sorun için `fix`, ekstralar için `upgrade`.

## Ön koşullar
Claude Code (ücretli plan), en güçlü model (en yeni Opus), boş proje klasörü, verilere **salt-okunur** erişim, opsiyonel işletme fotoğrafı. Eksik araç (Node.js vb.) için önce sor, sonra kur.

## Veri kaynakları
| Kaynak | Ne verir | Salt-okunur erişim |
|---|---|---|
| Stripe | Gelir, ödemeler, iadeler, müşteriler, ürünler | Dashboard → Developers → API keys → Create restricted key, gereken her şeyi **Read** yap |
| Square | Satışlar, ürünler, stok, müşteriler | Developer Console → uygulama oluştur → Credentials → production access token |
| Shopify | Siparişler, ürünler, stok | Admin → Settings → Apps and sales channels → Develop apps → salt-okunur scope (orders, products, inventory) → yükle, token'ı kopyala |
| Google Sheets | Stok, teslimat, rezervasyon, hedef | Sheet → File → Share → Publish to web → CSV linki |
| Diğer | Teslimat, rezervasyon, personel | API varsa kullan; yoksa Google Sheet'e aktar |

Tek uygulama her şeyi vermez (ör. Stripe'ta stok/teslimat yok) → ikinci kaynak gerekir.

## Değişmez kurallar
- Anahtarlar **parola gibidir**: sohbete, ekran görüntüsüne, dashboard'a veya koda asla yazılmaz; sadece `.env`'de (`.gitignore`'da) durur. Kullanıcıdan sohbete anahtar yapıştırmasını isteme; `.env`'i kendisinin doldurmasını sağla. Anahtarları asla yazdırma/loglama.
- Sadece **toplamlar ve sayılar** kaydedilir. Müşteri adı, e-posta, adres, kart bilgisi `data.json`'a girmez.
- Tüm erişim **salt-okunur**; hiçbir şey değiştirilmez, para hareketi yapılmaz.
- Kartlardaki **hiçbir sayı koda gömülmez**; hepsi `data.json`'dan gelir. Her istatistik gerçek bir sayıya bağlı olmalı.
- **Three.js** kullan (düz grafik sayfası değil): derinlik, gölge, hareket, nesne bazlı tıklama.
- Sayfayı yerel sunucudan sun; `file://` ile data dosyası okunamaz.
- 6-10 tıklanabilir nesne yeterli; fazlası kalabalık ve yavaş.
- Dışarı yayın (Adım 5) ve zamanlanmış görev kurulumu kullanıcı onayıyla yapılır; hesabı kullanıcı kendisi açar. Yayında anahtarlar host'un ortam değişkenlerinde, sayfa şifreli olur.
- Sync hata verirse son iyi rakamlar korunur, son başarılı sync zamanı gösterilir, sonraki turda tekrar denenir. Veri 30 dk'dan eskiyse LIVE noktası gri.

## Sorun giderme
| Görülen | Yapılacak |
|---|---|
| Boş sayfa / hata | Sayfayı aç, hatayı bul, düzelt, gerisini aynı bırak (sunucu çalışıyor mu kontrol et) |
| Sayılar güncellenmiyor (LIVE gri) | `sync.log`'u oku, nedenini bul, düzelt, aynı şekilde tekrarlanmasını engelle |
| Anahtar/izin hatası | Hangi okuma izninin eksik olduğunu adım adım söyle |
| Yanlış sayı | Sync hesabını kontrol et (dönem!), düzelt, yeni değeri kullanıcının uygulamasıyla yan yana göster |
| Tıklayınca bir şey olmuyor | Küçük parçalar dahil her plan nesnesini tıklanabilir yap |
| Kart nesneyi kapatıyor / ekran dışına taşıyor | Kartı ekran içinde, nesnenin yanında tut |
| Düz/sade görünüyor | Daha yumuşak gölge, yuvarlak kenar, daha fazla detay, zengin palet |
| İşletmeye benzemiyor | Yeni fotoğraf ekle; tıklanabilir nesneleri ve canlı sayıları koruyarak benzet |
| Telefonda yavaş | Küçük nesnelerde daha az gölge, uzaktakilerde sade model |

## Yükseltmeler
- **Uyarılar:** stok 20'nin altına düşünce raf kırmızı yanıp sönsün, kartta uyarı çıksın.
- **Trendler:** her sync'in geçmişini sakla, her karta son 7 günlük sparkline ekle.
- **Toplam çubuğu:** üstte bugünkü gelir, sipariş, yeni müşteri.
- **Satış kutlaması:** yeni sipariş gelince depodan araç çıksın, üstünde küçük "+₺" belirsin.
- **TV modu:** tam ekran; kamera nesneden nesneye uçsun, her kart 5 sn açık kalsın.

## İşletme türüne göre fikirler
| İşletme | Dünya | Tıklayınca |
|---|---|---|
| E-ticaret | Depo, palet, kargo araçları, müşteri evleri | Gelir/sipariş; ürün başı stok; yoldaki paketler; yeni/geri dönen müşteri |
| Kafe | Tezgâh, kahve makinesi, masalar, kuyruk | Bugünkü satış; yapılan içecek; en çok satanlar; yoğun saat; ort. sipariş |
| Restoran | Salon, mutfak, bar, kurye motorları | Akşam kuvertü; masa devir süresi; top yemekler; paket siparişler |
| Spor salonu/stüdyo | Stüdyo odaları, resepsiyon, gelen üyeler | Bugünkü giriş; ders rezervasyonu; yeni üye; iptaller |
| Kuaför/klinik | Koltuklar/odalar, resepsiyon, bekleme | Bugünkü randevu; koltuk başı gelir; tekrar rezervasyon; gelmeyenler |
| Ajans/hizmet | Ofis katları, müşteri başı masa, proje panosu | Zamanında projeler; saat/bütçe; vadesi gelen faturalar; pipeline |
| Usta (inşaat, tesisat) | Depo, yoldaki araçlar, şantiyeler | Bugünkü işler; bekleyen teklifler; bu ay rezerve; gelir |
| Emlak | Satılık/satıldı tabelalı ev sokağı | Aktif ilan; planlanan gezme; teklifler; piyasada kalma süresi |
