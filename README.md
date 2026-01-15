# AI-Powered Fashion ERP & Design Platform

**Version:** 0.1.0-alpha
**Status:** Phase 2 (Schema & RBAC Setup)

## Project Structure
This repository uses a Monorepo architecture.

```
/
├── apps/
│   ├── api/          # NestJS Backend (Hybrid Node/Python)
│   ├── web/          # React 19 Frontend (AG-UI)
│   └── worker/       # Python AI Workers (FastAPI)
├── packages/
│   ├── database/     # Prisma Schema & Migrations
│   ├── shared/       # Shared Types & RBAC Definitions
│   └── config/       # Environment & System Config
├── docs/             # Architecture Documentation
└── scripts/          # DevOps & Deployment Scripts
```

## Active Modules (Phase 2)
1.  **Core:** Users, Auth, RBAC
2.  **Mod 1-4:** Strategy, Trend, Collection, Theme
3.  **Mod 5:** Design (Visual Core)
4.  **Mod 6-10:** Execution & Analysis
5.  **Mod 11:** System Admin
