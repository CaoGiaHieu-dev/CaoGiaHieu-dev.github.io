import { Injectable, computed, signal } from '@angular/core';

export type Language = 'vi' | 'en';

export interface Translations {
  nav: {
    packages: string;
    architecture: string;
    contributions: string;
    contact: string;
    pubDev: string;
    github: string;
  };
  hero: {
    kicker: string;
    greeting: string;
    role: string;
    bio: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    btnPackages: string;
    btnContributions: string;
    btnContact: string;
    copy: string;
    copied: string;
    snippetTitle: string;
  };
  packages: {
    kicker: string;
    title: string;
    subtitle: string;
    viewOnPubDev: string;
    viewCode: string;
    close: string;
    openPubDev: string;
    playgroundTitle: string;
    playgroundSubtitle: string;
    loggerTab: string;
    pinningTab: string;
    stickyTab: string;
    loggerTriggerInfo: string;
    loggerTriggerWarn: string;
    loggerTriggerError: string;
    loggerClear: string;
    pinningTestValid: string;
    pinningTestInvalid: string;
    pinningReset: string;
    stickyTrigger: string;
    stickyReloading: string;
    stickyDone: string;
  };
  architecture: {
    kicker: string;
    title: string;
    subtitle: string;
    viewRepo: string;
    treeTitle: string;
    treeSubtitle: string;
    pillar1Title: string;
    pillar1Detail: string;
    pillar2Title: string;
    pillar2Detail: string;
    pillar3Title: string;
    pillar3Detail: string;
    pillar4Title: string;
    pillar4Detail: string;
  };
  contributions: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFlutter: string;
    filterCommunity: string;
    viewLink: string;
    typePr: string;
    typeIssue: string;
    typeDiscussion: string;
    statusMerged: string;
    statusOpen: string;
    statusResolved: string;
    totalStats: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryEmail: string;
    githubProfile: string;
    social: string;
    location: string;
    timezone: string;
    copyEmail: string;
    copied: string;
    openMail: string;
    availableNote: string;
    reachOut: string;
  };
  footer: {
    headline: string;
    locationNote: string;
    sectionsTitle: string;
    channelsTitle: string;
    googleVerified: string;
    rights: string;
    backToTop: string;
  };
}

const VI_TRANSLATIONS: Translations = {
  nav: {
    packages: 'Pub.dev Packages',
    architecture: 'Kiến trúc Monorepo',
    contributions: 'Đóng góp Flutter',
    contact: 'Liên hệ chính thức',
    pubDev: 'pub.dev',
    github: 'GitHub',
  },
  hero: {
    kicker: 'Flutter Developer · TP. Hồ Chí Minh · Tác giả Pub.dev',
    greeting: 'Xin chào, tôi là',
    role: 'Flutter Developer & Tác giả mã nguồn mở.',
    bio: 'Lập trình viên chuyên sâu về Flutter & Dart tại Việt Nam. Tác giả của 3 package trên Pub.dev: dynamic_logger (^0.5.0), http_security_pinning (^2.0.0), refresh_sticky (^0.1.2) và tác giả của template kiến trúc flutter-monorepo-codebase.',
    highlight1: 'Tác giả 3 package chính thức trên registry pub.dev: dynamic_logger, http_security_pinning, refresh_sticky',
    highlight2: 'Tác giả flutter-monorepo-codebase: Clean Architecture kết hợp Dart Pub Workspaces và BLoC đa tầng',
    highlight3: 'Tác giả các Pull Request và Issue kỹ thuật đóng góp trực tiếp cho Google Flutter (flutter/flutter & flutter/packages)',
    btnPackages: '3 Packages trên Pub.dev',
    btnContributions: 'Đóng góp Flutter & Issues',
    btnContact: 'Kênh liên hệ chính thức',
    copy: 'Sao chép',
    copied: 'Đã chép',
    snippetTitle: 'Mã nguồn thực tế: http_security_pinning: ^2.0.0',
  },
  packages: {
    kicker: '01 · Pub.dev Registry chính thức',
    title: 'Các Package đã phát hành trên Pub.dev',
    subtitle: 'Các package Dart và Flutter do Cao Gia Hiếu phát triển, giải quyết bài toán bảo mật mạng, ghi log chuẩn mực và widget cuộn ghim giao diện.',
    viewOnPubDev: 'Xem trên Pub.dev',
    viewCode: 'Xem mã nguồn mẫu',
    close: 'Đóng',
    openPubDev: 'Mở trang Pub.dev',
    playgroundTitle: 'Bàn thử nghiệm tương tác 3 Packages',
    playgroundSubtitle: 'Kiểm tra trực quan cách thức hoạt động thực tế của từng package ngay trên trình duyệt.',
    loggerTab: 'dynamic_logger (v0.5.0)',
    pinningTab: 'http_security_pinning (v2.0.0)',
    stickyTab: 'refresh_sticky (v0.1.2)',
    loggerTriggerInfo: 'Ghi Log Info',
    loggerTriggerWarn: 'Ghi Log Warning',
    loggerTriggerError: 'Ghi Log Error + Trace',
    loggerClear: 'Xóa màn hình console',
    pinningTestValid: 'Kiểm tra SPKI Hợp lệ (Cho phép)',
    pinningTestInvalid: 'Mô phỏng MITM / Sai Pin (Chặn TLS)',
    pinningReset: 'Đặt lại trạng thái',
    stickyTrigger: 'Kích hoạt kéo làm mới (Pull-to-refresh)',
    stickyReloading: 'Đang ghim vị trí và tải dữ liệu mới...',
    stickyDone: 'Tải dữ liệu mới thành công (120 FPS)',
  },
  architecture: {
    kicker: '02 · Kiến trúc & Repository tiêu biểu',
    title: 'flutter-monorepo-codebase',
    subtitle: 'Bản mẫu Flutter Monorepo mở rộng chuẩn Clean Architecture, Pub Workspaces, Dependency Injection và quản lý state độc lập theo từng module tính năng.',
    viewRepo: 'Xem Repository trên GitHub',
    treeTitle: 'Sơ đồ cây thư mục Monorepo Workspace',
    treeSubtitle: 'Pub Workspaces + Clean Architecture Layers',
    pillar1Title: 'Pub Workspaces & Phân tách module độc lập',
    pillar1Detail: 'Ứng dụng tính năng Dart Pub Workspaces chính thức để chia nhỏ feature modules, design system và core utilities độc lập, tránh phụ thuộc chéo.',
    pillar2Title: 'Clean Architecture (Data - Domain - Presentation)',
    pillar2Detail: 'Phân tách rạch ròi giữa thực thể nghiệp vụ (pure Dart domain logic) và tầng hạ tầng mạng, đảm bảo 100% khả năng kiểm thử unit test độc lập.',
    pillar3Title: 'Dependency Injection & State đa tầng',
    pillar3Detail: 'Định tuyến dịch vụ qua get_it/injectable kết hợp BLoC/Cubit, đảm bảo luồng dữ liệu 1 chiều ổn định và không bao giờ nghẽn frame UI.',
    pillar4Title: 'CI/CD thống nhất & Kiểm định chất lượng',
    pillar4Detail: 'Bộ script phân tích cú pháp tĩnh và kiểm thử tự động đồng thời trên toàn bộ các package trong monorepo trước khi build.',
  },
  contributions: {
    kicker: '03 · Đóng góp mã nguồn mở',
    title: 'Đóng góp cho Flutter Framework & Packages',
    subtitle: 'Các Pull Request và Issue kỹ thuật do Cao Gia Hiếu đóng góp trực tiếp cho kho mã nguồn của Google (flutter/flutter, flutter/packages) và các package cộng đồng.',
    filterAll: 'Tất cả đóng góp',
    filterFlutter: 'Flutter Framework & Packages (Google)',
    filterCommunity: 'Package hệ sinh thái cộng đồng',
    viewLink: 'Xem trên GitHub',
    typePr: 'Pull Request / Commit',
    typeIssue: 'Technical Issue / Proposal',
    typeDiscussion: 'Kỹ thuật & Giải pháp',
    statusMerged: 'Đã Merged / Đóng góp chính thức',
    statusOpen: 'Đang mở (Open)',
    statusResolved: 'Đã giải quyết / Đưa ra giải pháp',
    totalStats: 'Đóng góp ghi nhận',
  },
  contact: {
    kicker: '04 · Kênh liên hệ chính thức',
    title: 'Kênh liên hệ chính thức với Cao Gia Hiếu',
    subtitle: 'Kênh kết nối chính thức phục vụ trao đổi kỹ thuật, hợp tác phát triển ứng dụng di động Flutter và bảo trì các package mã nguồn mở.',
    primaryEmail: 'Email liên hệ chính thức',
    githubProfile: 'Hồ sơ GitHub',
    social: 'Kênh Facebook',
    location: 'Địa điểm: TP. Hồ Chí Minh, Việt Nam',
    timezone: 'Múi giờ: UTC+7 (Indochina Time)',
    copyEmail: 'Sao chép Email',
    copied: 'Đã sao chép vào bộ nhớ tạm!',
    openMail: 'Gửi thư qua ứng dụng Mail',
    availableNote: 'Thường phản hồi trong vòng 24 giờ qua email chính thức.',
    reachOut: 'Bạn có dự án Flutter cần tối ưu hóa hoặc muốn trao đổi chuyên môn? Vui lòng gửi email trực tiếp:',
  },
  footer: {
    headline: 'Flutter Developer từ Việt Nam. Tác giả của dynamic_logger, http_security_pinning, refresh_sticky trên Pub.dev, tác giả flutter-monorepo-codebase và contributor cho Flutter framework.',
    locationNote: 'CaoGiaHieu-dev.github.io · TP. Hồ Chí Minh, Việt Nam',
    sectionsTitle: 'Danh mục',
    channelsTitle: 'Kênh xác thực',
    googleVerified: 'Google Search Console Đã xác thực',
    rights: 'Mọi quyền được bảo lưu.',
    backToTop: 'Về đầu trang ↑',
  },
};

const EN_TRANSLATIONS: Translations = {
  nav: {
    packages: 'Pub.dev Packages',
    architecture: 'Monorepo Architecture',
    contributions: 'Flutter Contributions',
    contact: 'Official Contact',
    pubDev: 'pub.dev',
    github: 'GitHub',
  },
  hero: {
    kicker: 'Flutter Developer · Ho Chi Minh City · Pub.dev Author',
    greeting: "Hi, I'm",
    role: 'Flutter Developer & Open-Source Author.',
    bio: 'Mobile software engineer based in Vietnam specializing in Flutter & Dart. Author of 3 published packages on Pub.dev: dynamic_logger (^0.5.0), http_security_pinning (^2.0.0), refresh_sticky (^0.1.2), and architect of flutter-monorepo-codebase.',
    highlight1: 'Author of 3 verified packages on pub.dev: dynamic_logger, http_security_pinning, refresh_sticky',
    highlight2: 'Architect of flutter-monorepo-codebase: Clean Architecture with Dart Pub Workspaces and BLoC',
    highlight3: 'Author of Pull Requests and technical Issues submitted directly to Google Flutter (flutter/flutter & flutter/packages)',
    btnPackages: '3 Pub.dev Packages',
    btnContributions: 'Flutter Contributions & Issues',
    btnContact: 'Official Contact Channels',
    copy: 'Copy',
    copied: 'Copied',
    snippetTitle: 'Production Code: http_security_pinning: ^2.0.0',
  },
  packages: {
    kicker: '01 · Official Pub.dev Registry',
    title: 'Published Packages on Pub.dev',
    subtitle: 'Open-source Dart and Flutter packages developed by Cao Gia Hiếu, addressing network security, structured diagnostics, and sticky scroll UI indicators.',
    viewOnPubDev: 'View on Pub.dev',
    viewCode: 'View Code Snippet',
    close: 'Close',
    openPubDev: 'Open Pub.dev Page',
    playgroundTitle: 'Interactive 3-Package Testbench',
    playgroundSubtitle: 'Inspect and test the actual runtime mechanics of each package directly in your browser.',
    loggerTab: 'dynamic_logger (v0.5.0)',
    pinningTab: 'http_security_pinning (v2.0.0)',
    stickyTab: 'refresh_sticky (v0.1.2)',
    loggerTriggerInfo: 'Emit Info Log',
    loggerTriggerWarn: 'Emit Warn Log',
    loggerTriggerError: 'Emit Error + Trace',
    loggerClear: 'Clear Console Screen',
    pinningTestValid: 'Verify Valid SPKI Pin (Allow)',
    pinningTestInvalid: 'Simulate MITM / Bad Pin (Reject TLS)',
    pinningReset: 'Reset State',
    stickyTrigger: 'Trigger Pull-to-Refresh',
    stickyReloading: 'Header pinned sticky, fetching new records...',
    stickyDone: 'Refreshed successfully at 120 FPS',
  },
  architecture: {
    kicker: '02 · Featured Architecture & Repository',
    title: 'flutter-monorepo-codebase',
    subtitle: 'An enterprise Flutter Monorepo blueprint built with Clean Architecture, modern Pub Workspaces, Dependency Injection, and feature-driven state coordination.',
    viewRepo: 'View Repository on GitHub',
    treeTitle: 'Monorepo Workspace Directory Blueprint',
    treeSubtitle: 'Pub Workspaces + Clean Architecture Layers',
    pillar1Title: 'Pub Workspaces & Modular Package Isolation',
    pillar1Detail: 'Leverages official Dart Pub Workspaces to split feature modules, design systems, and core utilities independently without circular dependencies.',
    pillar2Title: 'Clean Architecture (Data - Domain - Presentation)',
    pillar2Detail: 'Strict decoupling between pure Dart domain logic and infrastructure data sources, guaranteeing 100% isolated unit testability.',
    pillar3Title: 'Dependency Injection & Multi-Layer State',
    pillar3Detail: 'Service location via get_it/injectable combined with BLoC/Cubit for predictable unidirectional data flow with zero UI frame drops.',
    pillar4Title: 'Unified CI/CD & Automated Quality Gates',
    pillar4Detail: 'Monorepo-aware static analysis and automated test scripts executed across all workspace packages simultaneously prior to builds.',
  },
  contributions: {
    kicker: '03 · Open Source Contributions',
    title: 'Contributions to Flutter Framework & Packages',
    subtitle: 'Pull Requests and technical issues submitted directly by Cao Gia Hiếu to Google Flutter repositories (flutter/flutter, flutter/packages) and community packages.',
    filterAll: 'All Contributions',
    filterFlutter: 'Flutter Framework & Packages (Google)',
    filterCommunity: 'Ecosystem & Community Packages',
    viewLink: 'View on GitHub',
    typePr: 'Pull Request / Commit',
    typeIssue: 'Technical Issue / Proposal',
    typeDiscussion: 'Technical Fix / Discussion',
    statusMerged: 'Merged / Official Contribution',
    statusOpen: 'Open',
    statusResolved: 'Resolved / Solution Provided',
    totalStats: 'Recorded Contributions',
  },
  contact: {
    kicker: '04 · Official Channels',
    title: 'Official Channels & Direct Contact',
    subtitle: 'Direct communication channels for technical discussions, Flutter mobile collaborations, and open-source inquiries.',
    primaryEmail: 'Official Primary Email',
    githubProfile: 'GitHub Profile',
    social: 'Facebook Channel',
    location: 'Location: Ho Chi Minh City, Vietnam',
    timezone: 'Timezone: UTC+7 (Indochina Time)',
    copyEmail: 'Copy Email Address',
    copied: 'Copied to clipboard!',
    openMail: 'Open in Email Client',
    availableNote: 'Typically responds within 24 hours via official email.',
    reachOut: 'Have a Flutter project that needs architectural hardening or want to discuss technical collaboration? Reach out directly via email:',
  },
  footer: {
    headline: 'Flutter Developer from Vietnam. Author of dynamic_logger, http_security_pinning, refresh_sticky on Pub.dev, author of flutter-monorepo-codebase, and contributor to the Flutter framework.',
    locationNote: 'CaoGiaHieu-dev.github.io · Ho Chi Minh City, Vietnam',
    sectionsTitle: 'Navigation',
    channelsTitle: 'Verified Channels',
    googleVerified: 'Google Search Console Verified',
    rights: 'All rights reserved.',
    backToTop: 'Back to Top ↑',
  },
};

@Injectable({
  providedIn: 'root'
})
export class Translation {
  readonly lang = signal<Language>(this.detectInitialLanguage());

  readonly t = computed<Translations>(() => {
    return this.lang() === 'vi' ? VI_TRANSLATIONS : EN_TRANSLATIONS;
  });

  constructor() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.lang();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('languagechange', () => {
        let hasStoredPreference = false;
        try {
          hasStoredPreference = !!localStorage.getItem('user_lang');
        } catch {}

        if (!hasStoredPreference) {
          const detected = this.detectBrowserLanguage();
          this.setLang(detected, false);
        }
      });
    }
  }

  setLang(newLang: Language, storePreference = true): void {
    this.lang.set(newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
    if (storePreference && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('user_lang', newLang);
      } catch {}
    }
  }

  toggleLang(): void {
    const next: Language = this.lang() === 'vi' ? 'en' : 'vi';
    this.setLang(next, true);
  }

  private detectInitialLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('user_lang');
        if (stored === 'vi' || stored === 'en') {
          return stored;
        }
      } catch {}
    }
    return this.detectBrowserLanguage();
  }

  private detectBrowserLanguage(): Language {
    if (typeof navigator !== 'undefined') {
      const languages = navigator.languages || [navigator.language || ''];
      for (const lang of languages) {
        if (!lang) continue;
        const normalized = lang.toLowerCase();
        if (normalized.startsWith('vi')) {
          return 'vi';
        }
        if (normalized.startsWith('en')) {
          return 'en';
        }
      }
    }
    return 'vi';
  }
}
