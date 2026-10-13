# Cao Gia Hieu — Verified Flutter Developer Portfolio

An authentic, production-grade developer portfolio for **Cao Gia Hiếu** (`CaoGiaHieu-dev`), constructed strictly from verified public data across **Pub.dev** and **GitHub**, replacing all placeholder/fabricated content with real packages, genuine pull requests, and verified contact channels.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> All information in this plan is grounded directly in live queries to GitHub API (`CaoGiaHieu-dev`) and the official Pub.dev package registry for publisher `caogiahieu99@gmail.com`.

- **Confirmed Role**: "Flutter Developer" (as specified by user, avoiding exaggerated corporate jargon).
- **Confirmed Primary Email**: `caogiahieu99@gmail.com` (verified across git commits and Pub.dev copyright declarations).
- **Confirmed Pub.dev Packages**:
  1. `http_security_pinning` (v2.0.0) — SPKI SHA-256 certificate pinning for Flutter `dart:io` `HttpClient` and Ed25519 signature validation.
  2. `mobile_scanner_custom` (v6.0.12) — MLKit-based universal barcode & QR scanner utilizing CameraX on Android and AVFoundation on iOS.
  3. `refresh_sticky` (v0.1.2) — Custom sticky refresh indicator package for Flutter scrollable widgets.
  4. `dynamic_logger` (v0.5.0) — Structured, extensible logger for Dart applications.
- **Confirmed Key Repositories & Architecture**:
  - `flutter-monorepo-codebase` — Clean Architecture, Pub Workspaces, Dependency Injection, and Multi-layer state management.
  - `camera_android_x` / `caogiahieu-my_camera_android_x` / `ekyc_camera` — CameraX native integration for electronic Know-Your-Customer (eKYC) mobile workflows.
  - `background-ios` — Native Swift background processing routines.
  - `wallet_app_api` — High-performance backend in Rust for financial wallet applications.
- **Confirmed Open-Source Contributions**: Pull requests and issue contributions for `app_version_update`, `infitio/flutter_socket_io`, `santa112358/detectable_text_field`, and `kwado-tech/l10n_mapper`.
- **Verified Channels**: GitHub `github.com/CaoGiaHieu-dev`, Facebook `facebook.com/hieu.shjn`, direct email `caogiahieu99@gmail.com`.

---

## 1. Overview & Core Concept

- **What It Delivers**: A fast, zoneless Angular 21 developer website highlighting Cao Gia Hiếu's real track record as a Flutter developer and package author.
- **Audience**: Engineering leaders, recruiters, clients, and fellow open-source developers seeking a Flutter engineer with proven expertise in mobile security, native platform bridges (CameraX/iOS), and scalable architecture.
- **Core Value**: 100% factual credibility. Every link points to an active package on Pub.dev, an authentic GitHub repository, or real pull requests.

---

## 2. User Experience & Visual Design

Following the *Universal Frontend Design Constitution* (anti-AI slop, zero pill capsules, clean unboxed metadata, measured contrast):

```
┌────────────────────────────────────────────────────────────────────────┐
│ [GH] Cao Gia Hiếu          Packages   Architecture   Open Source   Contact │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   Cao Gia Hiếu · Flutter Developer                                     │
│   Ho Chi Minh City, Vietnam                                            │
│                                                                        │
│   Building secure mobile applications and published Flutter plugins.   │
│   Author of http_security_pinning & mobile_scanner_custom on Pub.dev.  │
│                                                                        │
│   [View Pub.dev Packages]   [Explore Monorepo Architecture]   [Email]  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ 01. PUBLISHED PACKAGES ON PUB.DEV                                      │
│                                                                        │
│  http_security_pinning v2.0.0        mobile_scanner_custom v6.0.12     │
│  SPKI SHA-256 certificate pinning    Universal QR/Barcode with CameraX │
│  Pub.dev · Dart · Security           Pub.dev · CameraX · MLKit         │
│                                                                        │
│  refresh_sticky v0.1.2               dynamic_logger v0.5.0             │
│  Sticky scroll refresh indicator     Structured Dart logging engine    │
│  Pub.dev · UI Component              Pub.dev · Core Utility            │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ 02. ARCHITECTURE & NATIVE BRIDGES                                      │
│  · Clean Architecture Flutter Monorepo (Pub Workspaces + DI)           │
│  · CameraX & eKYC Native Modules (Android Java/Kotlin + iOS Swift)     │
│  · Rust Wallet API backend (wallet_app_api)                            │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ 03. OPEN SOURCE CONTRIBUTIONS & VERIFIED CHANNELS                      │
│  · Verified Pull Requests (app_version_update, l10n_mapper)            │
│  · caogiahieu99@gmail.com  ·  github.com/CaoGiaHieu-dev                │
│  · Google Search Console verification preserved                        │
└────────────────────────────────────────────────────────────────────────┘
```

- **Visual Direction**:
  - Dark slate/zinc background (`#09090b`), sharp hairline dividers (`border-zinc-800`), refined typography (`Plus Jakarta Sans` + `JetBrains Mono` for versions and code).
  - No fake scoreboards, no floating stat pills, no pulsing green dots on static cards.
  - Live clickable badges leading directly to `pub.dev/packages/<name>` and `github.com/CaoGiaHieu-dev/<repo>`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removal of All Fabricated Stats & Placeholder Projects**
  - *Chosen Approach*: Completely strip fictional projects (e.g. Pulse Fitness, OmniMarket) and fabricated metrics (100k users, fake star counts). Replace with the 4 real packages published on Pub.dev and actual GitHub projects.
  - *Why*: Eliminates all falsehoods, aligns strictly with user request and public verification.
- **Decision 2: Direct Pub.dev Package Deep Dives**
  - *Chosen Approach*: Highlight `http_security_pinning` with real Dart code showing SPKI pin validation, and `mobile_scanner_custom` showing CameraX configuration.
  - *Why*: Demonstrates real-world engineering depth and actual published code.
- **Decision 3: Contact Channels Alignment**
  - *Chosen Approach*: Primary contact set to `caogiahieu99@gmail.com` with one-click copy and prefilled mailto; GitHub link to `CaoGiaHieu-dev`; Facebook link to `facebook.com/hieu.shjn`.
  - *Why*: Direct, verified channels declared by the author in their official repositories.

---

## 4. Technical Architecture & Component Mapping

```
                 ┌─────────────────────────────────┐
                 │       App (app.ts)              │
                 └────────────────┬────────────────┘
                                  │
    ┌──────────────┬──────────────┼──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼
┌────────┐   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐
│ Header │   │   Hero    │  │ Packages  │  │Architecture│ │ Contact  │
│        │   │(Authentic)│  │ (Pub.dev) │  │  (Native) │  │ (Email)  │
└────────┘   └───────────┘  └───────────┘  └───────────┘  └──────────┘
```

- **Component Mapping**:
  - `Header`: Clean text navigation, real GitHub profile link, direct email link.
  - `Hero`: Authentic headline: "Cao Gia Hiếu", "Flutter Developer", location "Ho Chi Minh City, Vietnam", real Pub.dev publisher summary.
  - `Packages` (replacing Projects): Dedicated cards for `http_security_pinning`, `mobile_scanner_custom`, `refresh_sticky`, `dynamic_logger` with live Pub.dev links, verified version badges, and real package descriptions.
  - `Architecture & Native`: Showcasing `flutter-monorepo-codebase`, CameraX eKYC, and Rust API.
  - `Contributions`: Highlighting verified pull requests and ecosystem work (`app_version_update`, `l10n_mapper`, `detectable_text_field`, `flutter_socket_io`).
  - `Contact`: Direct mailto to `caogiahieu99@gmail.com`, copy-to-clipboard, GitHub profile, and preserved Google Search Console verification.
