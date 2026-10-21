---
description: Adım 3 — plan.md'deki dünyayı Three.js ile etkileşimli web sayfası olarak inşa et
---

3d-dashboard skill'indeki kurallara uy. Düz grafikli bir sayfa değil, **Three.js** ile gerçek bir 3D sahne kur.

`plan.md`'deki dünyayı etkileşimli bir web sayfası olarak inşa et.

**Dünya**
- Plandaki her nesne: yumuşak yuvarlak kenarlı low-poly 3D model, yumuşak ışık ve gölge, plandaki renk paleti.
- İzometrik tarzı kamera: sürükleyerek döndür, kaydırma/pinch ile yakınlaştır; başlangıçta tüm dünya görünür.
- Her şey hareketli: yürüyen insanlar, rotalarında giden araçlar, çalışan makineler. Hiçbir şey durmasın.

**Tıklama**
- Plandaki her nesne (küçük parçaları dahil) tıklanabilir. Üzerine gelince imleç değişir; tıklayınca parlar ve yanında buzlu cam istatistik kartı açılır. Boşluğa veya başka nesneye tıklayınca kart kapanır.
- Kart ekranın içinde kalır, nesnenin üstünü kapatmaz.

**Canlı veri**
- Her kartın her sayısı `data.json`'dan gelir. **Hiçbir sayıyı koda gömme.**
- `data.json`'ı her 60 saniyede yeniden oku, açık kartı yenilemeden güncelle, değişen sayıyı animasyonla göster.
- Küçük bir LIVE noktası ve sync zamanından "X dk önce güncellendi" göster. Veri 30 dakikadan eskiyse nokta gri olsun.

Laptop ve telefonda çalışsın. Yerel bir sunucu başlat (tarayıcılar `file://` ile data dosyasını okumayı engeller), tarayıcıda aç ve linki ver (ör. http://localhost:3000).

Sonra kullanıcıdan her nesneye tıklayıp kartları Adım 1'deki rakamlarla karşılaştırmasını iste. Değişiklik isteklerini aynı dosyalarda düzenleyerek yap, baştan başlama.
