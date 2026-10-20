---
description: 3D dashboard kurulumunu başlatır ve 5 adımlık akışı yönetir
---

3d-dashboard skill'ini yükle ve kurulumu yönet.

1. Kullanıcıya şunları kontrol ettir: Claude Code, en güçlü model (en yeni Opus), boş bir proje klasörü, verisine **salt-okunur** erişim. Eksik araç (ör. Node.js) varsa söyle ve kurmadan önce sor.
2. Sırayla şu komutları öner ve her adımın sonunda kullanıcının onayını bekle:
   `/3d-dashboard:setup` → `/3d-dashboard:connect-data` → `/3d-dashboard:design-world` → `/3d-dashboard:build` → `/3d-dashboard:go-live` → (opsiyonel) `/3d-dashboard:share`
3. Sorun olursa `/3d-dashboard:fix`, iyileştirmeler için `/3d-dashboard:upgrade`.

Tüm adımlar aynı oturumda, aynı klasörde yapılır. Anahtarları asla sohbete yapıştırtma.
