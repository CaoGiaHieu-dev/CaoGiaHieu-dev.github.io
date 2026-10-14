import { Injectable } from '@angular/core';

export interface PubPackage {
  id: string;
  name: string;
  version: string;
  versionSpec: string;
  descriptionVi: string;
  descriptionEn: string;
  pubDevUrl: string;
  githubUrl: string;
  installCommand: string;
  tags: string[];
  dartSnippet: string;
}

export interface MonorepoLayer {
  name: string;
  roleVi: string;
  roleEn: string;
  badge: string;
  detailsVi: string;
  detailsEn: string;
  packages: string[];
}

export interface MonorepoTool {
  name: string;
  command: string;
  descVi: string;
  descEn: string;
  tag: string;
}

export interface MonorepoArchitecture {
  name: string;
  githubUrl: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  layers: MonorepoLayer[];
  tools: MonorepoTool[];
  structureTree: string;
}

export type ContributionCategory = 'flutter' | 'community';
export type ContributionType = 'pr' | 'issue' | 'discussion';

export interface OpenSourceContribution {
  id: string;
  category: ContributionCategory;
  type: ContributionType;
  repository: string;
  referenceNumber: string;
  title: string;
  url: string;
  descriptionVi: string;
  descriptionEn: string;
  status: 'Merged' | 'Open' | 'Resolved / Solution Provided' | 'Documented';
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioData {
  readonly profile = {
    name: 'Cao Gia Hiếu',
    handle: 'CaoGiaHieu-dev',
    title: 'Senior Flutter Engineer & Pub.dev Author',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationEn: 'Ho Chi Minh City, Vietnam',
    email: 'nhoklolshjn1234@gmail.com',
    secondaryEmail: 'caogiahieu99@gmail.com',
    github: 'https://github.com/CaoGiaHieu-dev',
    facebook: 'https://www.facebook.com/hieu.shjn/',
    verifiedPubDevUrl: 'https://pub.dev/packages/http_security_pinning',
  };

  // Exactly 3 verified published packages on Pub.dev
  readonly publishedPackages: PubPackage[] = [
    {
      id: 'dynamic-logger',
      name: 'dynamic_logger',
      version: '0.5.0',
      versionSpec: '^0.5.0',
      descriptionVi: 'Thư viện ghi log hiệu năng cao với cấu trúc định dạng ANSI màu sắc, phân cấp level (DEBUG, INFO, WARN, ERROR) và trích xuất call stack chính xác cho ứng dụng Flutter & Dart.',
      descriptionEn: 'High-performance structured logger with ANSI color formatting, log level tiers (DEBUG, INFO, WARN, ERROR), and zero-overhead call-stack inspection for Flutter & Dart.',
      pubDevUrl: 'https://pub.dev/packages/dynamic_logger',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/dynamic_logger',
      installCommand: 'flutter pub add dynamic_logger',
      tags: ['Logging', 'Diagnostics', 'ANSI Color', 'Developer Tools'],
      dartSnippet: `import 'package:dynamic_logger/dynamic_logger.dart';

void main() {
  // Khởi tạo logger với cấu hình filter level & timestamp
  final logger = DynamicLogger(
    tag: 'NetworkService',
    level: LogLevel.debug,
  );

  logger.info('Khởi tạo kết nối máy chủ...');
  logger.json({'endpoint': '/v1/auth', 'status': 200, 'durationMs': 142});
  logger.error('Lỗi timeout khi kết nối', stackTrace: StackTrace.current);
}`
    },
    {
      id: 'http-security-pinning',
      name: 'http_security_pinning',
      version: '2.0.0',
      versionSpec: '^2.0.0',
      descriptionVi: 'Giải pháp bảo mật mạng di động toàn diện: Ghim chứng chỉ SSL/TLS bằng mã băm SPKI SHA-256 trên tầng HttpClient, ngăn chặn triệt để tấn công trung gian (Man-In-The-Middle - MITM).',
      descriptionEn: 'Complete mobile network security solution: SSL/TLS certificate pinning via SPKI SHA-256 hashes on dart:io HttpClient, fully neutralizing Man-In-The-Middle (MITM) attacks.',
      pubDevUrl: 'https://pub.dev/packages/http_security_pinning',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/http_security_pinning',
      installCommand: 'flutter pub add http_security_pinning',
      tags: ['Security', 'SSL Pinning', 'SPKI SHA-256', 'TLS 1.3', 'Network'],
      dartSnippet: `import 'package:http_security_pinning/http_security_pinning.dart';

Future<void> sendSecureRequest() async {
  // Tạo HttpClient được bảo vệ bằng danh sách mã băm SPKI SHA-256
  final client = HttpCertificatePinning.createHttpClient(
    allowedPins: [
      'SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=',
      'SPKI:4a6cPehI7OG6cuDZka5NDZ7FR8a60d3aitaVQKNV73w=',
    ],
    timeout: const Duration(seconds: 15),
  );

  final request = await client.getUrl(Uri.parse('https://api.domain.com/v1/user'));
  final response = await request.close();
  // Dữ liệu chỉ được giải mã khi chứng chỉ hợp lệ 100%
}`
    },
    {
      id: 'refresh-sticky',
      name: 'refresh_sticky',
      version: '0.1.2',
      versionSpec: '^0.1.2',
      descriptionVi: 'Widget cuộn và kéo để làm mới (Pull-to-Refresh) với hiệu ứng ghim đầu trang (Sticky Header), tối ưu hóa luồng render cho trải nghiệm mượt mà 120 FPS trên iOS & Android.',
      descriptionEn: 'Pull-to-refresh sliver widget featuring a sticky header pin effect, maximizing frame render throughput for an ultra-smooth 120 FPS UX on iOS & Android.',
      pubDevUrl: 'https://pub.dev/packages/refresh_sticky',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/refresh_sticky',
      installCommand: 'flutter pub add refresh_sticky',
      tags: ['Sliver', 'Pull-to-Refresh', 'Sticky Header', '120 FPS', 'UI Component'],
      dartSnippet: `import 'package:flutter/material.dart';
import 'package:refresh_sticky/refresh_sticky.dart';

Widget buildFeedList() {
  return RefreshSticky(
    onRefresh: () async {
      await fetchLatestTimelineFeed();
    },
    child: ListView.builder(
      itemCount: feedItems.length,
      itemBuilder: (context, index) => TimelineCard(data: feedItems[index]),
    ),
  );
}`
    }
  ];

  // Sự thật chuẩn xác 100% về flutter-monorepo-codebase từ chính repository
  readonly monorepoArchitecture: MonorepoArchitecture = {
    name: 'flutter-monorepo-codebase',
    githubUrl: 'https://github.com/CaoGiaHieu-dev/flutter-monorepo-codebase',
    taglineVi: 'Hệ thống kiến trúc Flutter Monorepo chuẩn công nghiệp · Dart Pub Workspaces bản địa · Đa hệ State Management (MVVM + Provider & BLoC)',
    taglineEn: 'Industrial-grade Flutter Monorepo Architecture · Native Dart Pub Workspaces · Dual State Management (MVVM + Provider & BLoC)',
    descriptionVi: 'Dự án kiến trúc ứng dụng Flutter công nghiệp quy mô lớn, thiết kế theo mô hình Micro-packages Monorepo kết hợp nghiêm ngặt nguyên lý Clean Architecture, SOLID và hỗ trợ đồng thời cả MVVM + Provider lẫn BLoC / Cubit. Sử dụng Pub Workspaces bản địa của Dart và bộ công cụ CLI tự động hóa toàn diện.',
    descriptionEn: 'An enterprise-scale industrial Flutter application architecture designed around the Micro-packages Monorepo model. Strictly enforces Clean Architecture, SOLID, and supports dual state management (MVVM + Provider and BLoC). Powered by native Dart Pub Workspaces and an automated developer CLI toolset.',
    layers: [
      {
        name: 'Host App Shell (app/)',
        roleVi: 'Vỏ ứng dụng chính, lắp ráp và khởi động toàn bộ hệ thống',
        roleEn: 'Main Application Shell, assembling & bootstrapping the app',
        badge: 'app/',
        detailsVi: 'Chứa entrypoint (main.dart), quản lý boot lifecycle (main_scope.dart), cấu hình đa môi trường Flavors (dev, staging, prod), điểm đăng ký DI trung tâm (injection.dart), và GoRouter assembly.',
        detailsEn: 'Contains entrypoint (main.dart), boot lifecycle (main_scope.dart), multi-flavor configurations (dev, staging, prod), central DI hub (injection.dart), and GoRouter navigation assembly.',
        packages: ['app/lib/config', 'app/lib/di', 'app/lib/presentation/navigation', 'app/lib/presentation/providers']
      },
      {
        name: 'Feature Presentation (packages/features/*)',
        roleVi: 'Các gói tính năng độc lập, giao tiếp qua Domain use cases',
        roleEn: 'Independent feature packages communicating via Domain use cases',
        badge: 'features/',
        detailsVi: 'Mỗi tính năng được module hóa thành một package độc lập, chứa UI Screens, ViewModels/Cubit, và điều phối routing nội bộ.',
        detailsEn: 'Each feature is decoupled into a dedicated package, encompassing UI screens, ViewModels/Cubits, and internal feature routing.',
        packages: ['splash', 'onboarding', 'auth', 'dashboard', 'home', 'settings']
      },
      {
        name: 'Domain Layer (packages/domain/*)',
        roleVi: 'Nghiệp vụ Pure Dart — Tuyệt đối 0 phụ thuộc Flutter SDK',
        roleEn: 'Pure Dart Business Logic — ZERO Flutter SDK dependencies',
        badge: 'domain/',
        detailsVi: 'Trái tim của hệ thống. Hoàn toàn là mã Dart thuần, không phụ thuộc bất kỳ package nào trong workspace và không chứa Flutter SDK. Khai báo Result<T>, AppFailure, Entities và Repository contracts.',
        detailsEn: 'The core heart of the system. Pure Dart with ZERO workspace dependencies and NO Flutter SDK. Defines Result<T>, AppFailure, BaseEntity, BaseUseCase, and abstract Repository contracts.',
        packages: ['domain_core (Result<T>, AppFailure)', 'domain_auth (Entities, UseCases)', 'domain_language (Multi-language)']
      },
      {
        name: 'Data Layer (packages/data/*)',
        roleVi: 'Triển khai tích hợp, lưu trữ cơ sở dữ liệu và Remote API',
        roleEn: 'Integration implementation, database storage & remote APIs',
        badge: 'data/',
        detailsVi: 'Hiện thực hóa các Repository interface từ Domain. Sở hữu SQLite CacheDatabase bằng Drift DAO, Dio HTTP client, Retrofit API services và cơ chế cache nhiều tầng.',
        detailsEn: 'Implements repository contracts defined by Domain. Owns SQLite CacheDatabase via Drift DAOs, Dio HTTP client, Retrofit API services, and multi-tier caching.',
        packages: ['data_core (IBaseRepository + CacheDatabase)', 'data_auth (RepositoryImpl, DataSources)', 'data_language']
      },
      {
        name: 'Core Infrastructure (packages/core/*)',
        roleVi: '11 Micro-packages hạ tầng dùng chung — CHỈ CƠ CHẾ, không chứa feature data',
        roleEn: '11 Shared infrastructure micro-packages — MECHANISM ONLY, never feature data',
        badge: 'core/',
        detailsVi: 'Cung cấp cơ chế nền tảng dùng chung cho toàn bộ workspace: theme & l10n (base_ui), BLoC state, Provider state, logging, network & SSL pinning, storage, database, responsive layout, push notifications và shared UI kit.',
        detailsEn: 'Foundational cross-cutting mechanisms: theme & l10n (base_ui), BLoC state, Provider state, logging, network with SSL pinning, storage, database, responsive scaling, notifications, and UI kit.',
        packages: [
          'core_base_ui', 'bloc_state_management', 'provider_state_management',
          'core_common', 'core_database', 'core_di', 'core_network',
          'core_notifications', 'core_responsive', 'core_storage', 'core_ui_kit'
        ]
      }
    ],
    tools: [
      {
        name: 'Android 16KB Page Size Compliance',
        command: 'dart tools/android_compliance/check.dart',
        descVi: 'Kiểm tra tính tương thích bộ nhớ trang 16KB bắt buộc trên Android 15+ (Google Play Store compliance).',
        descEn: 'Validates mandatory 16KB memory page size alignment for Android 15+ (Google Play requirement).',
        tag: 'Android 15+'
      },
      {
        name: 'Automated Code Review AI',
        command: 'dart tools/code_review/code_review.dart --all',
        descVi: 'Tự động kiểm tra chất lượng mã nguồn, quy tắc kiến trúc và bảo mật tích hợp Gemini AI.',
        descEn: 'Automated architectural and security review powered by Google Gemini AI.',
        tag: 'Gemini AI'
      },
      {
        name: 'CLI Module Generator',
        command: 'dart tools/module_generator/generate.dart [type] [name]',
        descVi: 'Tự động sinh mã khung cho Feature, Domain, Data hoặc Core package mới theo chuẩn Clean Architecture.',
        descEn: 'CLI generator scaffolding new Feature, Domain, Data, or Core micro-packages compliant with Clean Architecture.',
        tag: 'CLI Tool'
      },
      {
        name: 'Dependency Version Catalog Sync',
        command: 'dart tools/dependency_sync.dart',
        descVi: 'Đồng bộ toàn bộ phiên bản thư viện từ nguồn chân lý tập trung pubspec_dependencies.yaml.',
        descEn: 'Syncs all package dependencies across workspace from central pubspec_dependencies.yaml.',
        tag: 'Version Catalog'
      },
      {
        name: 'Workspace Setup & Build Automation',
        command: 'dart tools/workspace_setup/configure.dart',
        descVi: 'Thiết lập tự động toàn bộ workspace: pub get, build_runner và sinh mã đa ngôn ngữ l10n trên mọi nền tảng.',
        descEn: 'One-shot multi-platform workspace setup: pub get, code generation build_runner, and l10n synthesis.',
        tag: 'Automation'
      },
      {
        name: 'Check Outdated Pub.dev Packages',
        command: 'dart tools/check_outdated.dart',
        descVi: 'Quét toàn bộ micro-packages trong workspace và báo cáo các thư viện đã lỗi thời trên Pub.dev.',
        descEn: 'Scans all micro-packages in workspace and flags outdated dependencies on Pub.dev.',
        tag: 'Audit'
      }
    ],
    structureTree: `flutter-monorepo-codebase/
├── .github/workflows/
│   └── fastlane.yml               # CI Github Action running Fastlane automatically
├── app/                           # Host Application (Vỏ ứng dụng chính)
│   ├── android/ & ios/            # Dự án Android & iOS native
│   ├── lib/
│   │   ├── config/                # Môi trường Flavors: dev, staging, prod
│   │   ├── di/injection.dart      # Điểm đăng ký DI trung tâm
│   │   ├── presentation/
│   │   │   ├── navigation/        # GoRouter assembly + shell widgets
│   │   │   └── providers/         # Global App Shell (AppProvider, DeeplinkProvider)
│   │   ├── main.dart              # Điểm chạy app chính (entrypoint)
│   │   └── main_scope.dart        # Quản lý Boot Lifecycle (Splash → RootApp)
│   └── pubspec.yaml               # Host App config (liên kết sub-packages)
├── packages/                      # Thư mục Micro-packages độc lập
│   ├── core/                      # Hạ tầng dùng chung (11 micro-packages)
│   │   ├── base_ui/               # Theme, LanguageProvider, design tokens (0 widget)
│   │   ├── bloc_state_management/ # BaseBloc, BaseCubit, BlocViewState<T>
│   │   ├── provider_state_management/ # BaseProvider, executeOperation, ViewStateModel
│   │   ├── common/                # Enums, ErrorHandler, AppConfig, extensions
│   │   ├── database/              # Cơ chế Drift SQLite: IDatabaseHandle, migrations
│   │   ├── di/                    # DI Hub — mọi contract xuyên package
│   │   ├── network/               # Dio + Retrofit factory, SSL pinning SPKI
│   │   ├── notifications/         # Module quản lý thông báo đẩy (Push Notification)
│   │   ├── responsive/            # Scale theo design size gắn với BuildContext
│   │   ├── storage/               # StorageManager + StorageValue<T>
│   │   └── ui_kit/                # core_ui_kit — widget dùng chung cho mọi feature
│   ├── domain/                    # Micro-packages nghiệp vụ Pure Dart (0 PHỤ THUỘC)
│   │   ├── core/                  # Result<T>, AppFailure, BaseEntity, BaseUseCase
│   │   ├── auth/                  # Entities, UseCases, Repository interfaces cho Auth
│   │   └── language/              # Entities, UseCases cho đa ngôn ngữ
│   ├── data/                      # Micro-packages triển khai tích hợp
│   │   ├── core/                  # IBaseRepository + CacheDatabase (Drift DAO)
│   │   ├── auth/                  # Models, DataSources, RepositoryImpl cho Auth
│   │   └── language/              # RepositoryImpl cho đa ngôn ngữ
│   └── features/                  # Các gói tính năng độc lập (Feature Packages)
│       ├── splash/                # Feature Splash screen
│       ├── onboarding/            # Onboarding hướng dẫn người dùng mới
│       ├── auth/                  # Authentication (Login, Register, Forgot Password)
│       ├── dashboard/             # Chrome shell Bottom Tab host
│       ├── home/                  # Feature Home Tab
│       └── settings/              # Feature Settings Tab (tách riêng khỏi Home)
├── tools/                         # Bộ công cụ dòng lệnh (Developer CLI)
│   ├── android_compliance/        # Kiểm tra tính tương thích 16KB Page Size (Android 15+)
│   ├── code_review/               # Công cụ review mã nguồn tự động với Gemini AI
│   ├── module_generator/          # CLI tạo Feature/Domain/Data/Core package mới
│   ├── dependency_sync.dart       # Đồng bộ phiên bản thư viện từ catalog tập trung
│   ├── barrel_generator/          # Script tự động tạo barrel files cho packages
│   ├── workspace_setup/           # Script thiết lập workspace đa nền tảng
│   ├── theme_generator/           # Tự động sinh Splash Screen & App Icons
│   ├── unused_checker/            # Phân tích & dọn dẹp file, assets, bản dịch dư thừa
│   └── check_outdated.dart        # Kiểm tra thư viện lỗi thời trên pub.dev
├── pubspec.yaml                   # File cấu hình Pub Workspace (workspace: [...])
├── pubspec_dependencies.yaml      # Nguồn chân lý phiên bản thư viện (Version Catalog)
└── README.md                      # Master Technical Manual`
  };

  // Đóng góp thực tế cho Flutter Framework & Packages
  readonly contributions: OpenSourceContribution[] = [
    {
      id: 'pigeon-equals-hash',
      category: 'flutter',
      type: 'pr',
      repository: 'flutter/packages',
      referenceNumber: 'Pull Request / Merged',
      title: '[pigeon] Auto-generating equals and hashCode methods on Pigeon generated data classes',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Đóng góp mã nguồn và commit xử lý việc tự động tạo phương thức so sánh bằng (equals) và mã băm (hashCode) cho các lớp dữ liệu sinh ra bởi công cụ Pigeon trong flutter/packages.',
      descriptionEn: 'Code contribution and commit addressing auto-generation of equals and hashCode methods on Pigeon data classes in flutter/packages.',
      status: 'Merged'
    },
    {
      id: 'go-router-builder-fromstate',
      category: 'flutter',
      type: 'issue',
      repository: 'flutter/packages',
      referenceNumber: 'Issue / Architecture',
      title: '[go_router_builder] RouteExtension._fromState should be public to prevent non-const widgets from previous routes rebuilding',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Đề xuất kiến trúc và báo cáo issue trên flutter/packages về việc RouteExtension._fromState nên được công khai (public) nhằm ngăn chặn việc các widget non-const của các route trước đó bị rebuild không cần thiết, tối ưu hóa hiệu năng điều hướng.',
      descriptionEn: 'Architectural proposal and issue on flutter/packages suggesting RouteExtension._fromState be made public to prevent non-const widgets from previous routes from unnecessary rebuilding during navigation.',
      status: 'Open'
    },
    {
      id: 'go-router-builder-slash',
      category: 'flutter',
      type: 'issue',
      repository: 'flutter/packages',
      referenceNumber: 'Issue / Regression',
      title: '[go_router_builder] Generated location difference for route path with or without slash since go_router: 14.2.9',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Phát hiện và báo cáo lỗi sai lệch generated location giữa các đường dẫn route có hoặc không có dấu gạch chéo (slash) kể từ bản go_router: 14.2.9.',
      descriptionEn: 'Identified and reported regression issue where generated location differed for route paths with or without a trailing slash starting in go_router: 14.2.9.',
      status: 'Resolved / Solution Provided'
    },
    {
      id: 'go-router-builder-subroute',
      category: 'flutter',
      type: 'issue',
      repository: 'flutter/packages',
      referenceNumber: 'Issue / DX',
      title: '[go_router_builder] Needs to declare field on sub-route data',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Báo cáo vấn đề yêu cầu khai báo field trên sub-route data trong trình tạo mã go_router_builder và đề xuất cải thiện trải nghiệm lập trình viên.',
      descriptionEn: 'Reported issue regarding required field declarations on sub-route data in go_router_builder code generator and proposed DX improvements.',
      status: 'Resolved / Solution Provided'
    }
  ];
}
