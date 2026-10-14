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
  };
  architecture: {
    kicker: string;
    title: string;
    viewRepo: string;
    treeTitle: string;
    treeSubtitle: string;
    tabLayers: string;
    tabTree: string;
    tabTools: string;
    layersHeading: string;
    toolsHeading: string;
    treeHeading: string;
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
    kicker: 'Senior Flutter Engineer · Tác giả Pub.dev · Open Source',
    greeting: 'Xin chào, tôi là',
    role: 'Senior Flutter Engineer & Tác giả mã nguồn mở',
    bio: 'Kỹ sư phần mềm di động chuyên sâu Flutter & Dart. Tác giả của 3 package chính thức trên Pub.dev: dynamic_logger (^0.5.0), http_security_pinning (^2.0.0), refresh_sticky (^0.1.2), tác giả kiến trúc flutter-monorepo-codebase (Pub Workspaces bản địa & đa hệ MVVM+Provider/BLoC) và trực tiếp đóng góp kỹ thuật cho Google flutter/packages.',
    highlight1: '3 Thư viện phát hành chính thức trên Pub.dev: dynamic_logger, http_security_pinning, refresh_sticky',
    highlight2: 'Tác giả flutter-monorepo-codebase: Micro-packages Clean Architecture, Dart native Pub Workspaces, BLoC & Provider',
    highlight3: 'Đóng góp kỹ thuật trực tiếp cho Google Flutter core repositories (flutter/packages)',
    btnPackages: '3 Packages trên Pub.dev',
    btnContributions: 'Kiến trúc Monorepo & Core Tools',
    btnContact: 'Kênh liên hệ chính thức',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    snippetTitle: 'Mã nguồn thực tế: http_security_pinning: ^2.0.0',
  },
  packages: {
    kicker: '01 · Thư viện chính thức trên Pub.dev',
    title: 'Các Package đã phát hành trên Pub.dev',
    subtitle: 'Thư viện mã nguồn mở chuyên dụng cho Flutter & Dart được xây dựng với tiêu chuẩn nghiêm ngặt về an ninh TLS/SPKI, trích xuất log hiệu năng cao và hiệu ứng cuộn 120 FPS.',
    viewOnPubDev: 'Xem trên Pub.dev',
    viewCode: 'Xem mã nguồn Dart',
    close: 'Đóng',
    openPubDev: 'Mở trang Pub.dev',
  },
  architecture: {
    kicker: '02 · Kiến trúc chuẩn công nghiệp',
    title: 'flutter-monorepo-codebase',
    viewRepo: 'Xem kho mã nguồn GitHub',
    treeTitle: 'Cấu trúc thư mục Monorepo thực tế',
    treeSubtitle: 'Dart Native Pub Workspaces · Clean Architecture · Đa hệ MVVM & BLoC',
    tabLayers: '5 Tầng C4 Architecture',
    tabTree: 'Cây thư mục vật lý',
    tabTools: 'Bộ công cụ CLI Developer',
    layersHeading: 'Phân tách 5 tầng hệ thống (Workspace C4 Model)',
    toolsHeading: 'Bộ công cụ dòng lệnh (Developer CLI Toolset)',
    treeHeading: 'Cây thư mục vật lý chuẩn xác',
    pillar1Title: 'Kiến trúc Micro-packages & Clean Architecture',
    pillar1Detail: 'Phân rã nghiêm ngặt Host App Shell (app/) ➔ Features ➔ Domain (Pure Dart, 0 phụ thuộc) ➔ Data (Drift DAO & Cache) ➔ Core (11 micro-packages hạ tầng).',
    pillar2Title: 'Pub Workspaces bản địa của Dart',
    pillar2Detail: 'Sử dụng cấu hình pub workspace native của Dart, liên kết và quản lý phụ thuộc nội bộ đa package mượt mà không cần công cụ trung gian bên thứ ba.',
    pillar3Title: 'Đa hệ State Management: MVVM + Provider & BLoC',
    pillar3Detail: 'Hỗ trợ đồng thời cả BaseProvider (ViewStateModel) và BaseBloc / BaseCubit (BlocViewState), dữ liệu luồng 1 chiều dự đoán được và kiểm thử tuyệt đối.',
    pillar4Title: 'Bộ công cụ CLI tự động hóa & Android 15 16KB Ready',
    pillar4Detail: 'Tích hợp script kiểm tra tương thích bộ nhớ 16KB Page Size (Android 15+), review code AI với Gemini, CLI sinh module tự động và Version Catalog tập trung.',
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
    totalStats: 'Pull Requests đã merge & Issues kỹ thuật cốt lõi',
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
    headline: 'Senior Flutter Engineer chuyên sâu về kiến trúc hệ thống, an ninh ứng dụng và công cụ mã nguồn mở cho hệ sinh thái Dart/Flutter.',
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
    kicker: 'Senior Flutter Engineer · Pub.dev Author · Open Source',
    greeting: "Hi, I'm",
    role: 'Senior Flutter Engineer & Open-Source Author',
    bio: 'Mobile software engineer based in Vietnam specializing in high-performance Flutter & Dart. Author of 3 published packages on Pub.dev: dynamic_logger (^0.5.0), http_security_pinning (^2.0.0), refresh_sticky (^0.1.2), architect of flutter-monorepo-codebase (native Dart Pub Workspaces & dual MVVM+Provider/BLoC), and contributor to Google flutter/packages.',
    highlight1: 'Author of 3 verified packages on pub.dev: dynamic_logger, http_security_pinning, refresh_sticky',
    highlight2: 'Architect of flutter-monorepo-codebase: Micro-packages Clean Architecture, Dart native Pub Workspaces, BLoC & Provider',
    highlight3: 'Direct code and architectural contributions to Google Flutter core repositories (flutter/packages)',
    btnPackages: '3 Pub.dev Packages',
    btnContributions: 'Monorepo Architecture & Core Tools',
    btnContact: 'Official Contact Channels',
    copy: 'Copy',
    copied: 'Copied',
    snippetTitle: 'Production Code: http_security_pinning: ^2.0.0',
  },
  packages: {
    kicker: '01 · Official Pub.dev Registry',
    title: 'Published Packages on Pub.dev',
    subtitle: 'Battle-tested open-source libraries for Dart & Flutter, engineered with strict standards for TLS/SPKI mobile security, zero-overhead structured diagnostics, and 120 FPS sliver physics.',
    viewOnPubDev: 'View on Pub.dev',
    viewCode: 'View Dart Code',
    close: 'Close',
    openPubDev: 'Open Pub.dev Page',
  },
  architecture: {
    kicker: '02 · Enterprise Architecture',
    title: 'flutter-monorepo-codebase',
    viewRepo: 'View GitHub Repository',
    treeTitle: 'Authentic Monorepo File Hierarchy',
    treeSubtitle: 'Native Dart Pub Workspaces · Clean Architecture · Dual MVVM & BLoC',
    tabLayers: '5-Tier C4 Architecture',
    tabTree: 'Physical Folder Tree',
    tabTools: 'Developer CLI Suite',
    layersHeading: '5-Tier System Decomposition (Workspace C4 Model)',
    toolsHeading: 'Command-Line Automation Toolset (Developer CLI)',
    treeHeading: 'Exact Physical Directory Tree',
    pillar1Title: 'Micro-packages & Clean Architecture',
    pillar1Detail: 'Strict unidirectional dependency flow: Host App Shell (app/) ➔ Features ➔ Domain (Pure Dart, 0 dependencies) ➔ Data (Drift DAO & Cache) ➔ Core (11 infrastructure micro-packages).',
    pillar2Title: 'Native Dart Pub Workspaces',
    pillar2Detail: 'Leverages Dart native workspace configuration, seamlessly linking and managing interdependent micro-packages without third-party tooling.',
    pillar3Title: 'Dual State Management: MVVM + Provider & BLoC',
    pillar3Detail: 'Architectural support for both BaseProvider (ViewStateModel) and BaseBloc / BaseCubit (BlocViewState), deterministic unidirectional data flows, and full testability.',
    pillar4Title: 'Developer CLI Suite & Android 15 16KB Page Size Ready',
    pillar4Detail: 'Includes mandatory 16KB Page Size compliance checks for Android 15+, automated Gemini AI code reviews, module generators, and centralized version catalog.',
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
    totalStats: 'Merged Pull Requests & Core Technical Issues',
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
