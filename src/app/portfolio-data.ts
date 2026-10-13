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

export interface MonorepoArchitecture {
  name: string;
  descriptionVi: string;
  descriptionEn: string;
  githubUrl: string;
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
    title: 'Flutter Developer',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationEn: 'Ho Chi Minh City, Vietnam',
    email: 'caogiahieu99@gmail.com',
    secondaryEmail: 'nhoklolshjn1234@gmail.com',
    github: 'https://github.com/CaoGiaHieu-dev',
    facebook: 'https://www.facebook.com/hieu.shjn/',
    verifiedPubDevUrl: 'https://pub.dev/packages/http_security_pinning',
  };

  // Exactly the 3 packages specified on Pub.dev
  readonly publishedPackages: PubPackage[] = [
    {
      id: 'dynamic_logger',
      name: 'dynamic_logger',
      version: '0.5.0',
      versionSpec: '^0.5.0',
      descriptionVi: 'Trình ghi log đơn giản, có cấu trúc linh hoạt cho ứng dụng Dart/Flutter, hỗ trợ cấu hình đa cấp độ (debug, info, warn, error) và bộ định dạng output chuẩn xác.',
      descriptionEn: 'A structured and configurable logging utility for Dart/Flutter applications with configurable log levels, customizable output formatters, and clean developer console output.',
      pubDevUrl: 'https://pub.dev/packages/dynamic_logger',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/dynamic_logger',
      installCommand: 'flutter pub add dynamic_logger',
      tags: ['Dart Utility', 'Structured Logging', 'Diagnostics', 'Formatters'],
      dartSnippet: `import 'package:dynamic_logger/dynamic_logger.dart';

// Khởi tạo logger có cấu trúc cho ứng dụng Flutter
final logger = DynamicLogger(
  level: LogLevel.debug,
  prefix: '[AppKernel]',
);

logger.info('Khởi động pipeline mạng thành công');
logger.warn('Token sắp hết hạn trong 5 phút');
logger.error('Lỗi xác thực chứng chỉ TLS', error: err, stackTrace: st);`
    },
    {
      id: 'http_security_pinning',
      name: 'http_security_pinning',
      version: '2.0.0',
      versionSpec: '^2.0.0',
      descriptionVi: 'SPKI SHA-256 certificate pinning cho Flutter với HttpClient dart:io tích hợp sẵn, bảo vệ chống tấn công Man-In-The-Middle (MITM) và kiểm tra chữ ký số Ed25519 trên Flutter Web.',
      descriptionEn: 'SPKI SHA-256 certificate pinning for Flutter with a drop-in dart:io HttpClient to prevent Man-In-The-Middle (MITM) attacks, plus Ed25519 cryptographic signature checks on Flutter Web.',
      pubDevUrl: 'https://pub.dev/packages/http_security_pinning',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/http_security_pinning',
      installCommand: 'flutter pub add http_security_pinning',
      tags: ['Security', 'SSL Pinning', 'SPKI SHA-256', 'TLS Handshake', 'Ed25519'],
      dartSnippet: `import 'package:http_security_pinning/http_security_pinning.dart';

// Tạo HttpClient bảo mật cao chống nghe lén proxy MITM
final client = HttpCertificatePinning.createHttpClient(
  allowedPins: [
    'SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=',
  ],
  timeout: const Duration(seconds: 15),
);

final request = await client.getUrl(Uri.parse('https://api.yourdomain.com/v1/user'));
final response = await request.close();`
    },
    {
      id: 'refresh_sticky',
      name: 'refresh_sticky',
      version: '0.1.2',
      versionSpec: '^0.1.2',
      descriptionVi: 'Package tạo sticky refresh indicator cho Flutter, giữ header tải lại ghim cố định ở vị trí đầu thanh cuộn mượt mà trong quá trình fetch dữ liệu mới.',
      descriptionEn: 'A Flutter UI package providing a sticky refresh indicator widget that cleanly pins at the top of scrollable views during asynchronous pull-to-refresh actions.',
      pubDevUrl: 'https://pub.dev/packages/refresh_sticky',
      githubUrl: 'https://github.com/CaoGiaHieu-dev/refresh_sticky',
      installCommand: 'flutter pub add refresh_sticky',
      tags: ['UI Widget', 'Scrollable', 'Refresh Indicator', 'Sticky Header'],
      dartSnippet: `import 'package:refresh_sticky/refresh_sticky.dart';

// Gói danh sách widget cuộn trong RefreshSticky
RefreshSticky(
  onRefresh: () async {
    await fetchLatestFeed();
  },
  child: ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, index) => ListTile(
      title: Text(items[index].title),
    ),
  ),
)`
    }
  ];

  // Chỉ để flutter-monorepo-codebase
  readonly monorepoArchitecture: MonorepoArchitecture = {
    name: 'flutter-monorepo-codebase',
    descriptionVi: 'Bản mẫu Flutter Monorepo chuẩn doanh nghiệp sử dụng Clean Architecture, Pub Workspaces, Dependency Injection và điều phối state độc lập theo tính năng.',
    descriptionEn: 'An enterprise-grade Flutter Monorepo blueprint built with Clean Architecture, modern Pub Workspaces, Dependency Injection, and feature-driven state coordination.',
    githubUrl: 'https://github.com/CaoGiaHieu-dev/flutter-monorepo-codebase',
    structureTree: `flutter-monorepo-codebase/
├── pubspec.yaml                 # Root workspace manifest with pub workspaces
├── apps/
│   └── mobile_app/              # Main Flutter application entry point
│       └── lib/
│           ├── app/             # Application routing & theme configuration
│           └── main.dart        # Entry point with dependency injection boot
├── packages/
│   ├── core/                    # Pure Dart utilities, network client & logger
│   ├── design_system/           # Shared design tokens, widgets & icons
│   └── features/
│       ├── auth/                # Data, Domain & Presentation layers
│       ├── dashboard/           # Feature state & BLoC coordinators
│       └── profile/             # Domain use cases & repository contracts
└── tool/
    └── workspace_analyzer.sh    # Multi-package test & lint validation`
  };

  // Đóng góp cho Flutter Framework & Packages (bao gồm cả Pull Requests và các Issues đã mở)
  readonly contributions: OpenSourceContribution[] = [
    {
      id: 'go-router-builder-fromstate',
      category: 'flutter',
      type: 'issue',
      repository: 'flutter/packages',
      referenceNumber: 'Issue',
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
      referenceNumber: 'Issue',
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
      referenceNumber: 'Issue',
      title: '[go_router_builder] Needs to declare field on sub-route data',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Báo cáo vấn đề yêu cầu khai báo field trên sub-route data trong trình tạo mã go_router_builder và đề xuất cải thiện trải nghiệm lập trình viên.',
      descriptionEn: 'Reported issue regarding required field declarations on sub-route data in go_router_builder code generator and proposed DX improvements.',
      status: 'Resolved / Solution Provided'
    },
    {
      id: 'pigeon-equals-hash',
      category: 'flutter',
      type: 'pr',
      repository: 'flutter/packages',
      referenceNumber: 'Commit / PR',
      title: '[pigeon] Auto-generating equals and hashCode methods on Pigeon generated data classes',
      url: 'https://github.com/flutter/packages',
      descriptionVi: 'Đóng góp mã nguồn và commit xử lý việc tự động tạo phương thức so sánh bằng (equals) và mã băm (hashCode) cho các lớp dữ liệu sinh ra bởi công cụ Pigeon trong flutter/packages.',
      descriptionEn: 'Code contribution and commit addressing auto-generation of equals and hashCode methods on Pigeon data classes in flutter/packages.',
      status: 'Merged'
    },
    {
      id: 'flutter-android-mlkit',
      category: 'flutter',
      type: 'issue',
      repository: 'flutter/flutter',
      referenceNumber: 'Issue',
      title: 'Flutter Module in Android cannot use package google_mlkit_face_detector (MissingPluginException)',
      url: 'https://github.com/flutter/flutter',
      descriptionVi: 'Báo cáo lỗi tích hợp Flutter Module vào ứng dụng native Android khi gọi package google_mlkit_face_detector dẫn đến MissingPluginException trên engine.',
      descriptionEn: 'Reported Android add-to-app Flutter module issue where embedding google_mlkit_face_detector failed with MissingPluginException on the engine bridge.',
      status: 'Resolved / Solution Provided'
    },
    {
      id: 'flutter-google-maps-keyboard',
      category: 'flutter',
      type: 'discussion',
      repository: 'flutter/flutter',
      referenceNumber: '#102550',
      title: 'Flutter Google Maps resized when keyboard popup on Android',
      url: 'https://github.com/flutter/flutter/issues/102550',
      descriptionVi: 'Đóng góp giải pháp kỹ thuật cho issue #102550 trên flutter/flutter sử dụng AndroidGoogleMapsFlutter.useAndroidViewSurface để xử lý triệt để hiện tượng bản đồ Google Maps bị co giãn layout khi bàn phím ảo bật lên trên Android.',
      descriptionEn: 'Contributed verified technical fix to flutter/flutter issue #102550 utilizing AndroidGoogleMapsFlutter.useAndroidViewSurface to resolve map resizing glitches upon virtual keyboard activation on Android.',
      status: 'Resolved / Solution Provided'
    },
    {
      id: 'app-version-update-pr',
      category: 'community',
      type: 'pr',
      repository: 'kauemurakami/app_version_update',
      referenceNumber: 'PR v6.1.3',
      title: 'Update package_info_plus dependency for latest App Store & Play Store compatibility',
      url: 'https://github.com/CaoGiaHieu-dev/app_version_update',
      descriptionVi: 'Pull Request cập nhật dependency package_info_plus tương thích với các bản phát hành kho ứng dụng mới nhất, đã được merge chính thức vào bản release 6.1.3 của package.',
      descriptionEn: 'Pull Request upgrading package_info_plus dependency for up-to-date app store version check compatibility, successfully merged into official release v6.1.3.',
      status: 'Merged'
    },
    {
      id: 'inappwebview-dev',
      category: 'community',
      type: 'pr',
      repository: 'pichillilorenzo/inappwebview.dev',
      referenceNumber: 'Contributions',
      title: 'Documentation and issue contributions for flutter_inappwebview ecosystem',
      url: 'https://github.com/CaoGiaHieu-dev',
      descriptionVi: 'Ghi nhận 6 đóng góp kỹ thuật và tài liệu trên kho inappwebview.dev hỗ trợ hệ sinh thái webview mạnh mẽ nhất của Flutter.',
      descriptionEn: 'Recorded 6 technical contributions and documentation enhancements for inappwebview.dev supporting the leading Flutter webview plugin.',
      status: 'Merged'
    },
    {
      id: 'flutter-socket-io',
      category: 'community',
      type: 'issue',
      repository: 'infitio/flutter_socket_io',
      referenceNumber: 'Issue',
      title: 'Real-time WebSocket handshake and connection lifecycle diagnostics',
      url: 'https://github.com/CaoGiaHieu-dev',
      descriptionVi: 'Báo cáo và phân tích vòng đời kết nối WebSocket socket.io thời gian thực cho ứng dụng di động Flutter.',
      descriptionEn: 'Reported and analyzed real-time WebSocket socket.io connection lifecycle handling in mobile Flutter clients.',
      status: 'Resolved / Solution Provided'
    },
    {
      id: 'detectable-text-field',
      category: 'community',
      type: 'issue',
      repository: 'santa112358/detectable_text_field',
      referenceNumber: 'Issue',
      title: 'Hashtag and Mention detection behavior edge cases in text input',
      url: 'https://github.com/CaoGiaHieu-dev',
      descriptionVi: 'Báo cáo các trường hợp đặc biệt (edge cases) khi nhận diện hashtag và mention trên widget nhập văn bản có định dạng của Flutter.',
      descriptionEn: 'Reported edge-case input handling for hashtag and mention detection in formatted Flutter text input widgets.',
      status: 'Resolved / Solution Provided'
    }
  ];
}
