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
  theme: {
    toggle: string;
    light: string;
    dark: string;
    switchToLight: string;
    switchToDark: string;
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
    pinningTargetHost: string;
    pinningAllowedSpki: string;
    pinningAwaitingStatus: string;
    pinningSuccessTitle: string;
    pinningSuccessDesc: string;
    pinningBlockedTitle: string;
    pinningBlockedDesc: string;
    stickyTrigger: string;
    stickyReloading: string;
    stickyDone: string;
    stickyHeaderTitle: string;
    stickyItem1: string;
    stickyItem2: string;
    stickyItem3: string;
  };
  architecture: {
    kicker: string;
    title: string;
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
    viewOnGithub: string;
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
  theme: {
    toggle: 'Giao diện',
    light: 'Sáng',
    dark: 'Tối',
    switchToLight: 'Chuyển sang giao diện Sáng',
    switchToDark: 'Chuyển sang giao diện Tối',
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
    copied: 'Đã sao chép',
    snippetTitle: 'Mã nguồn thực tế: http_security_pinning: ^2.0.0',
  },
  packages: {
    kicker: '01 · Danh mục chính thức trên Pub.dev',
    title: 'Các Package đã phát hành trên Pub.dev',
    subtitle: 'Mã nguồn mở Dart và Flutter do Cao Gia Hiếu phát triển độc lập, giải quyết bài toán bảo mật mạng, giám sát nhật ký có cấu trúc và thanh chỉ số cuộn sticky.',
    viewOnPubDev: 'Xem trên Pub.dev',
    viewCode: 'Xem mã nguồn mẫu',
    close: 'Đóng',
    openPubDev: 'Mở trang Pub.dev',
    playgroundTitle: 'Bàn thử nghiệm tương tác 3 Package',
    playgroundSubtitle: 'Kiểm tra và tương tác trực tiếp cơ chế hoạt động thực tế của từng package ngay trên trình duyệt.',
    loggerTab: 'dynamic_logger (v0.5.0)',
    pinningTab: 'http_security_pinning (v2.0.0)',
    stickyTab: 'refresh_sticky (v0.1.2)',
    loggerTriggerInfo: 'Phát Log Info',
    loggerTriggerWarn: 'Phát Log Cảnh báo',
    loggerTriggerError: 'Phát Log Lỗi + Trace',
    loggerClear: 'Xóa màn hình Log',
    pinningTestValid: 'Kiểm tra SPKI Hợp lệ (Cho phép)',
    pinningTestInvalid: 'Giả lập tấn công MITM (Chặn TLS)',
    pinningReset: 'Đặt lại trạng thái',
    pinningTargetHost: 'Máy chủ đích:',
    pinningAllowedSpki: 'Khóa ghim SPKI hợp lệ:',
    pinningAwaitingStatus: 'Trạng thái: Đang chờ khởi tạo kết nối...',
    pinningSuccessTitle: 'Bắt tay TLS 1.3 Thành công · Đã xác minh SPKI SHA-256',
    pinningSuccessDesc: 'Mã băm SHA-256 khóa công khai của server khớp hoàn toàn với danh sách AllowedPins. Dữ liệu HTTP 200 OK được giải mã an toàn qua dart:io HttpClient.',
    pinningBlockedTitle: 'Đã chặn đứng tấn công MITM · HandshakeException: Pin Mismatch',
    pinningBlockedDesc: 'Phát hiện chứng chỉ giả mạo từ proxy can thiệp. http_security_pinning lập tức ngắt socket trước khi dữ liệu nhạy cảm được gửi đi.',
    stickyTrigger: 'Kích hoạt Kéo để làm mới',
    stickyReloading: 'Header đang được ghim sticky, tải dữ liệu mới...',
    stickyDone: 'Làm mới thành công ở tốc độ 120 FPS',
    stickyHeaderTitle: 'Thanh trạng thái ghim cố định (Sticky Header)',
    stickyItem1: 'Mục 1: Tải dữ liệu danh sách đồng bộ (Đã lưu cache)',
    stickyItem2: 'Mục 2: Giám sát đo lường mạng theo thời gian thực',
    stickyItem3: 'Mục 3: Cuộn mượt mà không giật khung hình (120 FPS)',
  },
  architecture: {
    kicker: '02 · Kiến trúc & Kho mã nguồn tiêu biểu',
    title: 'flutter-monorepo-codebase',
    viewRepo: 'Xem kho mã nguồn GitHub',
    treeTitle: 'Cấu trúc thư mục Monorepo chuẩn hóa',
    treeSubtitle: 'Dart Melos Workspace · Clean Architecture · BLoC đa tầng',
    pillar1Title: 'Kiến trúc sạch đa tầng (Clean Architecture)',
    pillar1Detail: 'Phân tách nghiêm ngặt Presentation, Domain, Data và Core layer. Domain layer hoàn toàn độc lập với Flutter SDK.',
    pillar2Title: 'Dart Pub Workspace & Melos',
    pillar2Detail: 'Quản lý nhiều package phụ thuộc nội bộ mà không cần publish lên Pub.dev trong quá trình phát triển tính năng.',
    pillar3Title: 'State Management BLoC / Cubit',
    pillar3Detail: 'Luồng dữ liệu một chiều dự đoán được, testable tuyệt đối với bloc_test, tích hợp dynamic_logger tự động.',
    pillar4Title: 'CI/CD & Chất lượng mã nguồn nghiêm ngặt',
    pillar4Detail: 'Quy chuẩn linter chặt chẽ, tự động hóa kiểm tra tĩnh (analyze), unit tests và build ma trận Android/iOS.',
  },
  contributions: {
    kicker: '03 · Hoạt động cộng đồng mã nguồn mở',
    title: 'Đóng góp cho Flutter Framework & Packages',
    subtitle: 'Các Pull Request đã được merge, Issue kỹ thuật sâu và thảo luận tại các repository cốt lõi của hệ sinh thái Flutter Google.',
    filterAll: 'Tất cả đóng góp',
    filterFlutter: 'Flutter Framework & Packages',
    filterCommunity: 'Cộng đồng & Mở rộng',
    viewOnGithub: 'Xem trên GitHub',
    typePr: 'Pull Request',
    typeIssue: 'Kỹ thuật / Issue',
    typeDiscussion: 'Thảo luận kiến trúc',
    statusMerged: 'ĐÃ MERGE',
    statusOpen: 'ĐANG MỞ',
    statusResolved: 'ĐÃ XỬ LÝ',
    totalStats: '3 PRs đã merge · 2 Issues kỹ thuật cốt lõi',
  },
  contact: {
    kicker: '04 · Kênh liên hệ và xác thực',
    title: 'Liên hệ trực tiếp với Cao Gia Hiếu',
    subtitle: 'Sẵn sàng trao đổi về cơ hội hợp tác phát triển Flutter, tư vấn kiến trúc Monorepo hoặc trao đổi kỹ thuật chuyên sâu.',
    primaryEmail: 'Kênh Email công việc chính thức',
    githubProfile: 'Hồ sơ kỹ sư trên GitHub',
    social: 'Trang cá nhân & kết nối trực tiếp',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    timezone: 'Múi giờ UTC+7 (Indochina Time)',
    copyEmail: 'Sao chép Email',
    copied: 'Đã sao chép Email!',
    openMail: 'Gửi Email trực tiếp',
    availableNote: 'Phản hồi trong vòng 24 giờ làm việc. Cam kết chỉ sử dụng thông tin liên lạc cho mục đích kỹ thuật và công việc.',
    reachOut: 'Kết nối qua các kênh',
  },
  footer: {
    headline: 'Flutter Developer chuyên sâu về kiến trúc hệ thống, an ninh ứng dụng và công cụ mã nguồn mở cho hệ sinh thái Dart/Flutter.',
    locationNote: 'Làm việc tại TP. Hồ Chí Minh, Việt Nam (UTC+7)',
    sectionsTitle: 'Điều hướng nhanh',
    channelsTitle: 'Kênh xác minh chính thức',
    googleVerified: 'Google Search Console Đã xác minh',
    rights: 'Bản quyền nội dung thuộc về Cao Gia Hiếu (@CaoGiaHieu-dev).',
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
  theme: {
    toggle: 'Theme',
    light: 'Light',
    dark: 'Dark',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
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
    pinningTargetHost: 'Target Host:',
    pinningAllowedSpki: 'Allowed SPKI Pin:',
    pinningAwaitingStatus: 'Status: Awaiting handshake initiation...',
    pinningSuccessTitle: 'TLS 1.3 Handshake Successful · SPKI SHA-256 Verified',
    pinningSuccessDesc: 'Server Public Key SHA-256 hash matches AllowedPins whitelist perfectly. HTTP 200 OK payload decrypted securely via dart:io HttpClient.',
    pinningBlockedTitle: 'MITM Attack Intercepted · HandshakeException: Pin Mismatch',
    pinningBlockedDesc: 'Untrusted/spoofed certificate detected from proxy or intermediary. http_security_pinning immediately terminates socket before transmitting sensitive data.',
    stickyTrigger: 'Trigger Pull-to-Refresh',
    stickyReloading: 'Header pinned sticky, fetching new records...',
    stickyDone: 'Refreshed successfully at 120 FPS',
    stickyHeaderTitle: 'Sticky Refresh Indicator',
    stickyItem1: 'Row 1: Synchronized list feed payload (Cached)',
    stickyItem2: 'Row 2: Real-time network telemetry snapshot',
    stickyItem3: 'Row 3: Smooth UI scroll without frame drops (120 FPS)',
  },
  architecture: {
    kicker: '02 · Featured Architecture & Repository',
    title: 'flutter-monorepo-codebase',
    viewRepo: 'View GitHub Repository',
    treeTitle: 'Standardized Monorepo File Hierarchy',
    treeSubtitle: 'Dart Melos Workspace · Clean Architecture · Multi-Tier BLoC',
    pillar1Title: 'Clean Layered Architecture',
    pillar1Detail: 'Strict boundary between Presentation, Domain, Data, and Core packages. Domain is purely Dart with zero SDK lock-in.',
    pillar2Title: 'Dart Pub Workspace & Melos',
    pillar2Detail: 'Seamlessly manages multiple co-dependent packages locally without needing pre-releases published on pub.dev.',
    pillar3Title: 'Predictable BLoC / Cubit State',
    pillar3Detail: 'Unidirectional data flows, deterministic state emission testable with bloc_test, and deep dynamic_logger hooks.',
    pillar4Title: 'Strict CI/CD & Static Analysis',
    pillar4Detail: 'Comprehensive lint rules, automated static analyzer pipelines, unit test suites, and Android/iOS build matrix.',
  },
  contributions: {
    kicker: '03 · Open Source Ecosystem Contributions',
    title: 'Contributions to Flutter Framework & Packages',
    subtitle: 'Merged Pull Requests, deep technical issues, and architectural discussions within Google Flutter core repositories.',
    filterAll: 'All Contributions',
    filterFlutter: 'Flutter Framework & Packages',
    filterCommunity: 'Ecosystem & Community',
    viewOnGithub: 'View on GitHub',
    typePr: 'Pull Request',
    typeIssue: 'Technical Issue',
    typeDiscussion: 'RFC / Discussion',
    statusMerged: 'MERGED',
    statusOpen: 'OPEN',
    statusResolved: 'RESOLVED',
    totalStats: '3 Merged PRs · 2 Core Technical Issues',
  },
  contact: {
    kicker: '04 · Verification & Inquiries',
    title: 'Contact Cao Gia Hiếu',
    subtitle: 'Available for technical discussions regarding Flutter engineering, monorepo architecture consulting, and open-source collaboration.',
    primaryEmail: 'Primary Official Email',
    githubProfile: 'GitHub Engineer Profile',
    social: 'Personal Profile & Direct Connection',
    location: 'Ho Chi Minh City, Vietnam',
    timezone: 'UTC+7 Timezone (Indochina Time)',
    copyEmail: 'Copy Email Address',
    copied: 'Email copied to clipboard!',
    openMail: 'Compose Direct Email',
    availableNote: 'Usually replies within 24 hours. Contact information is reserved for professional inquiries and technical collaborations.',
    reachOut: 'Direct Channels',
  },
  footer: {
    headline: 'Senior Flutter developer specializing in system architecture, network security, and developer productivity tooling.',
    locationNote: 'Based in Ho Chi Minh City, Vietnam (UTC+7)',
    sectionsTitle: 'Navigation',
    channelsTitle: 'Verified Channels',
    googleVerified: 'Google Search Console Verified',
    rights: 'Content and intellectual property of Cao Gia Hiếu (@CaoGiaHieu-dev).',
    backToTop: 'Back to Top ↑',
  },
};

@Injectable({
  providedIn: 'root',
})
export class Translation {
  readonly lang = signal<Language>(this.getInitialLanguage());
  readonly t = computed(() => this.lang() === 'vi' ? VI_TRANSLATIONS : EN_TRANSLATIONS);

  setLang(newLang: Language): void {
    this.lang.set(newLang);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('user_lang', newLang);
      } catch {}
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  }

  private getInitialLanguage(): Language {
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
