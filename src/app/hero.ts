import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-slate-200/80 dark:border-white/[0.06] relative overflow-hidden transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- Left Column: Typographic Hierarchy & Identity -->
          <div appScrollReveal class="lg:col-span-7 space-y-6">
            
            <!-- Category Tag with Active Radar Dot -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
              <span class="relative flex h-2 w-2">
                <span class="radar-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span>Senior Flutter Engineer &middot; Pub.dev Author</span>
            </div>

            <!-- Main Headline -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {{ i18n.lang() === 'vi' ? 'Kiến trúc Flutter hiệu năng cao & Thư viện bảo mật di động' : 'High-Performance Flutter Architecture & Mobile Network Security' }}
            </h1>

            <!-- Bio Lead Copy -->
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {{ i18n.t().hero.bio }}
            </p>

            <!-- Key Quantitative Metrics Strip -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-xl">
              <div class="p-3.5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
                <div class="text-2xl font-extrabold font-mono text-sky-600 dark:text-sky-400">3</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 truncate">
                  Pub.dev Packages
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
                <div class="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">11</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 truncate">
                  Core Packages
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
                <div class="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">16KB</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 truncate">
                  Android 15 Ready
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
                <div class="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">Core</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 truncate">
                  Flutter Contributor
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href="#packages"
                class="px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>{{ i18n.t().hero.btnPackages }}</span>
                <mat-icon class="text-sm leading-none">arrow_forward</mat-icon>
              </a>

              <a
                href="#architecture"
                class="px-5 py-3 min-h-[46px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.1] text-slate-800 dark:text-white text-xs font-semibold font-mono transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">account_tree</mat-icon>
                <span>{{ i18n.t().hero.btnContributions }}</span>
              </a>

              <a
                href="#contact"
                class="px-4 py-3 min-h-[46px] rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-xs leading-none text-slate-500 dark:text-slate-400">mail</mat-icon>
                <span>{{ i18n.t().hero.btnContact }}</span>
              </a>
            </div>

          </div>

          <!-- Right Column: Interactive macOS Studio Code Window -->
          <div appScrollReveal [delay]="140" class="lg:col-span-5 w-full">
            <div class="rounded-2xl bg-[#090b10] border border-slate-800 dark:border-white/[0.12] overflow-hidden shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
              
              <!-- Window top bar with traffic lights and package switcher tabs -->
              <div class="px-4 py-3 bg-[#11141c] border-b border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-inner"></span>
                  <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-inner"></span>
                  <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-inner"></span>
                </div>

                <!-- Interactive Tab Switcher -->
                <div class="flex items-center gap-1 bg-[#090b10] p-1 rounded-lg border border-slate-800/90 text-[10px] font-mono">
                  <button
                    type="button"
                    (click)="activeTab.set('pinning')"
                    [class]="'px-2 py-0.5 rounded cursor-pointer transition-colors ' + heroTabClass('pinning')"
                  >
                    pinning
                  </button>
                  <button
                    type="button"
                    (click)="activeTab.set('logger')"
                    [class]="'px-2 py-0.5 rounded cursor-pointer transition-colors ' + heroTabClass('logger')"
                  >
                    logger
                  </button>
                  <button
                    type="button"
                    (click)="activeTab.set('sticky')"
                    [class]="'px-2 py-0.5 rounded cursor-pointer transition-colors ' + heroTabClass('sticky')"
                  >
                    sticky
                  </button>
                </div>

                <a
                  [href]="currentPackage().pubDevUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 shrink-0"
                >
                  <span>pub.dev</span>
                  <mat-icon class="text-[10px] leading-none">open_in_new</mat-icon>
                </a>
              </div>

              <!-- Code Editor Body -->
              <div class="p-4 sm:p-5 font-mono text-xs text-sky-200 leading-relaxed overflow-x-auto touch-scroll bg-[#08090d] max-h-[380px]">
                <pre class="font-mono text-[11px] sm:text-xs text-slate-300 whitespace-pre"><code>{{ codeSnippet() }}</code></pre>
              </div>

              <!-- Terminal Command Footer -->
              <div class="px-4 py-3 bg-[#11141c] border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                <span class="text-sky-300 text-[11px] truncate select-all">{{ currentPackage().installCommand }}</span>
                <button
                  type="button"
                  (click)="copyInstallCommand()"
                  class="text-slate-300 hover:text-white text-[11px] flex items-center gap-1.5 cursor-pointer min-h-[32px] px-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] shrink-0 transition-colors"
                  aria-label="Copy install command"
                >
                  <mat-icon class="text-xs leading-none">{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
                  <span>{{ copied() ? i18n.t().hero.copied : i18n.t().hero.copy }}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class Hero {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly copied = signal(false);
  readonly activeTab = signal<'pinning' | 'logger' | 'sticky'>('pinning');

  readonly currentPackage = computed(() => {
    switch (this.activeTab()) {
      case 'pinning':
        return this.data.publishedPackages[1];
      case 'logger':
        return this.data.publishedPackages[0];
      case 'sticky':
        return this.data.publishedPackages[2];
    }
  });

  readonly codeSnippet = computed(() => {
    switch (this.activeTab()) {
      case 'pinning':
        return `// SPKI SHA-256 Pinning with HttpClient (MITM proxy defense)
import 'package:http_security_pinning/http_security_pinning.dart';

final client = HttpCertificatePinning.createHttpClient(
  allowedPins: [
    'SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=',
  ],
  timeout: const Duration(seconds: 15),
);

final request = await client.getUrl(
  Uri.parse('https://api.domain.com/v1/auth'),
);
final response = await request.close();`;
      case 'logger':
        return `// High-performance structured ANSI logging with level filtering
import 'package:dynamic_logger/dynamic_logger.dart';

final logger = DynamicLogger(
  tag: 'AuthService',
  level: LogLevel.debug,
);

logger.info('Handshake connection started');
logger.json({'user': 'CaoGiaHieu', 'role': 'Engineer', 'status': 200});
logger.error('Socket exception occurred', stackTrace: StackTrace.current);`;
      case 'sticky':
        return `// 120 FPS Pull-to-Refresh with pinned sticky header
import 'package:refresh_sticky/refresh_sticky.dart';

RefreshSticky(
  onRefresh: () async {
    await fetchTimelineFeed();
  },
  child: ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, i) => ListTile(title: Text(items[i])),
  ),
);`;
    }
  });

  copyInstallCommand(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.currentPackage().installCommand).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }

  heroTabClass(tab: 'pinning' | 'logger' | 'sticky'): string {
    return this.activeTab() === tab
      ? 'bg-sky-500/25 text-sky-300 font-semibold'
      : 'text-slate-400 hover:text-slate-200';
  }
}
