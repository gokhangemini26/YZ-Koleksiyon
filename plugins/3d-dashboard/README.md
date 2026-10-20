# 3d-dashboard (Claude Code plugin)

İşletmenizin canlı verileriyle çalışan animasyonlu 3D dünya kurar (Three.js). Nesneye tıkla → parlar, gerçek rakamlı kart açılır; rakamlar kendiliğinden yenilenir.

## Kurulum
```
/plugin marketplace add gokhangemini26/YZ-Koleksiyon
/plugin install 3d-dashboard@yz-koleksiyon-plugins
```
Sonra **boş bir klasörde**, en güçlü modelle Claude Code'u aç ve `/3d-dashboard:start` yaz.

## Komutlar
| Komut | Adım |
|---|---|
| `/3d-dashboard:start` | Akışı başlatır ve yönetir |
| `/3d-dashboard:setup` | 1a — `.env` ve `.gitignore` |
| `/3d-dashboard:connect-data` | 1b — sync script, `data.json`, doğrulama |
| `/3d-dashboard:design-world [tarif]` | 2 — `plan.md` (kod yok) |
| `/3d-dashboard:build` | 3 — Three.js dünyası |
| `/3d-dashboard:go-live` | 4 — 5 dk'lık otomatik sync + açılışta başlat |
| `/3d-dashboard:share` | 5 (ops.) — şifreli yayın + günlük özet |
| `/3d-dashboard:fix [sorun]` | Sorun giderme |
| `/3d-dashboard:upgrade [özellik]` | Uyarılar, trend, TV modu vb. |

## Güvenlik
Anahtarlar sadece `.env`'de, salt-okunur; sohbete yapıştırılmaz. `data.json`'da yalnızca toplamlar/sayılar bulunur (kişisel veri yok).
