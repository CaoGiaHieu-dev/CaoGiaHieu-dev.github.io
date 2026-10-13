import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData, PubPackage } from './portfolio-data';
import { Translation } from './translation';

interface LogEntry {
  id: number;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  time: string;
  message: string;
  detail?: string;
}

@Component({
  selector: 'app-packages',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="packages" class="py-16 sm:py-20 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#07090e] to-[#0a0e18] relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Header -->
        <div class="max-w-3xl mb-10 sm:mb-14">
          <div class="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <span class="text-indigo-400 font-semibold">{{ i18n.t().packages.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {{ i18n.t().packages.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-400 leading-relaxed">
            {{ i18n.t().packages.subtitle }}
          </p>
        </div>

        <!-- 3 Verified Packages Grid (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          @for (pkg of data.publishedPackages; track pkg.id) {
            <div class="rounded-2xl bg-slate-900/60 border border-slate-800/90 p-5 sm:p-7 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
              
              <div>
                <!-- Top metadata row -->
                <div class="flex items-baseline justify-between mb-3 gap-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-mono font-bold text-indigo-400">pub.dev</span>
                    <span aria-hidden="true" class="text-slate-600">&middot;</span>
                    <span class="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      {{ pkg.versionSpec }}
                    </span>
                  </div>
                  <a
                    [href]="pkg.pubDevUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors min-h-[32px] px-1"
                  >
                    <span>pub.dev</span>
                    <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
                  </a>
                </div>

                <!-- Package Name -->
                <h3 class="text-base sm:text-lg font-bold text-white font-mono mb-2 group-hover:text-indigo-300 transition-colors">
                  {{ pkg.name }}
                </h3>

                <!-- Bilingual Description -->
                <p class="text-xs text-slate-300 leading-relaxed mb-4 sm:mb-5">
                  {{ i18n.lang() === 'vi' ? pkg.descriptionVi : pkg.descriptionEn }}
                </p>

                <!-- Tags: Unboxed text separators with wrap -->
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-mono text-slate-400 mb-5 sm:mb-6">
                  @for (t of pkg.tags; track t) {
                    <span>{{ t }}</span>
                    @if (!$last) {
                      <span aria-hidden="true" class="text-slate-700">&middot;</span>
                    }
                  }
                </div>
              </div>

              <!-- Install command & Snippet toggle -->
              <div class="pt-4 sm:pt-5 border-t border-slate-800/80 space-y-3 mt-auto">
                <!-- Copyable command bar with touch-friendly button -->
                <div class="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#060910] border border-slate-800 font-mono text-xs">
                  <code class="text-slate-300 text-[11px] truncate mr-2">{{ pkg.installCommand }}</code>
                  <button
                    type="button"
                    (click)="copyCommand(pkg.installCommand, pkg.name)"
                    class="text-slate-400 hover:text-white min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Copy command"
                  >
                    <mat-icon class="text-sm leading-none">
                      {{ copiedPackage() === pkg.name ? 'check' : 'content_copy' }}
                    </mat-icon>
                  </button>
                </div>

                <!-- Actions row with touch-friendly hitboxes -->
                <div class="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    (click)="selectedSnippetPackage.set(pkg)"
                    class="min-h-[40px] px-1 font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <mat-icon class="text-sm leading-none">code</mat-icon>
                    <span>{{ i18n.t().packages.viewCode }}</span>
                  </button>

                  <a
                    [href]="pkg.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="min-h-[40px] px-1 text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono transition-colors"
                  >
                    <mat-icon class="text-sm leading-none">folder</mat-icon>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Interactive 3-Package Technical Testbench (Multi-device friendly) -->
        <div class="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 sm:p-6 md:p-8 shadow-xl">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <mat-icon class="text-indigo-400 text-lg leading-none">terminal</mat-icon>
                <span>{{ i18n.t().packages.playgroundTitle }}</span>
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                {{ i18n.t().packages.playgroundSubtitle }}
              </p>
            </div>

            <!-- Segmented Package Tabs (Horizontal touch-scroller on narrow screens) -->
            <div class="flex items-center overflow-x-auto no-scrollbar touch-scroll p-1 bg-[#060910] border border-slate-800 rounded-xl text-xs font-mono max-w-full shrink-0">
              <button
                type="button"
                (click)="activeTestTab.set('logger')"
                [class.bg-indigo-600]="activeTestTab() === 'logger'"
                [class.text-white]="activeTestTab() === 'logger'"
                [class.text-slate-400]="activeTestTab() !== 'logger'"
                class="px-3 py-2 min-h-[36px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                dynamic_logger
              </button>
              <button
                type="button"
                (click)="activeTestTab.set('pinning')"
                [class.bg-indigo-600]="activeTestTab() === 'pinning'"
                [class.text-white]="activeTestTab() === 'pinning'"
                [class.text-slate-400]="activeTestTab() !== 'pinning'"
                class="px-3 py-2 min-h-[36px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                http_security_pinning
              </button>
              <button
                type="button"
                (click)="activeTestTab.set('sticky')"
                [class.bg-indigo-600]="activeTestTab() === 'sticky'"
                [class.text-white]="activeTestTab() === 'sticky'"
                [class.text-slate-400]="activeTestTab() !== 'sticky'"
                class="px-3 py-2 min-h-[36px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                refresh_sticky
              </button>
            </div>
          </div>

          <!-- Tab 1: dynamic_logger live testbench -->
          @if (activeTestTab() === 'logger') {
            <div class="space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    (click)="emitLog('INFO')"
                    class="px-3 py-2 min-h-[40px] rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">info</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerInfo }}</span>
                  </button>
                  <button
                    type="button"
                    (click)="emitLog('WARN')"
                    class="px-3 py-2 min-h-[40px] rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">warning</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerWarn }}</span>
                  </button>
                  <button
                    type="button"
                    (click)="emitLog('ERROR')"
                    class="px-3 py-2 min-h-[40px] rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">error</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerError }}</span>
                  </button>
                </div>

                <button
                  type="button"
                  (click)="clearLogs()"
                  class="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer min-h-[40px] px-2"
                >
                  <mat-icon class="text-xs leading-none">delete_sweep</mat-icon>
                  <span>{{ i18n.t().packages.loggerClear }}</span>
                </button>
              </div>

              <!-- Terminal console window -->
              <div class="rounded-xl bg-[#060910] border border-slate-800 p-3 sm:p-4 font-mono text-[11px] sm:text-xs max-h-64 overflow-y-auto touch-scroll space-y-2">
                @for (entry of logHistory(); track entry.id) {
                  <div class="flex items-start gap-2 leading-relaxed">
                    <span class="text-slate-500 text-[10px] sm:text-[11px] shrink-0">{{ entry.time }}</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
                      [class.bg-sky-500/10]="entry.level === 'INFO'"
                      [class.text-sky-300]="entry.level === 'INFO'"
                      [class.bg-amber-500/10]="entry.level === 'WARN'"
                      [class.text-amber-300]="entry.level === 'WARN'"
                      [class.bg-rose-500/10]="entry.level === 'ERROR'"
                      [class.text-rose-300]="entry.level === 'ERROR'"
                      [class.bg-slate-700/30]="entry.level === 'DEBUG'"
                      [class.text-slate-300]="entry.level === 'DEBUG'"
                    >
                      [{{ entry.level }}]
                    </span>
                    <div class="flex-1 text-slate-200 break-words">
                      <span>{{ entry.message }}</span>
                      @if (entry.detail) {
                        <div class="text-[10px] sm:text-[11px] text-rose-400/80 font-mono mt-0.5 pl-2 border-l border-rose-800 break-words">
                          {{ entry.detail }}
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tab 2: http_security_pinning testbench -->
          @if (activeTestTab() === 'pinning') {
            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  (click)="testPinning(true)"
                  class="px-4 py-2.5 min-h-[44px] rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <mat-icon class="text-sm leading-none">lock</mat-icon>
                  <span>{{ i18n.t().packages.pinningTestValid }}</span>
                </button>
                <button
                  type="button"
                  (click)="testPinning(false)"
                  class="px-4 py-2.5 min-h-[44px] rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <mat-icon class="text-sm leading-none">gpp_bad</mat-icon>
                  <span>{{ i18n.t().packages.pinningTestInvalid }}</span>
                </button>
                <button
                  type="button"
                  (click)="pinningState.set('idle')"
                  class="px-3 py-2.5 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center cursor-pointer"
                >
                  {{ i18n.t().packages.pinningReset }}
                </button>
              </div>

              <div class="p-4 rounded-xl bg-[#060910] border border-slate-800 font-mono text-xs">
                @if (pinningState() === 'idle') {
                  <div class="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
                    <span class="text-indigo-400">Target Host:</span> https://api.secure-domain.com<br>
                    <span class="text-indigo-400">Allowed SPKI Pin:</span> SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=<br>
                    <span class="text-slate-500">Trạng thái: Đang chờ thực hiện handshake...</span>
                  </div>
                } @else if (pinningState() === 'verified') {
                  <div class="text-emerald-400 space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                      <mat-icon class="text-base leading-none">verified_user</mat-icon>
                      <span>TLS 1.3 Handshake Thành Công &middot; SPKI SHA-256 Verified</span>
                    </div>
                    <div class="text-slate-300 text-[11px] leading-relaxed">
                      Server Public Key SHA-256 hash trùng khớp hoàn hảo với cấu hình AllowedPins.<br>
                      Dữ liệu phản hồi HTTP 200 OK được giải mã an toàn qua dart:io HttpClient.
                    </div>
                  </div>
                } @else if (pinningState() === 'blocked') {
                  <div class="text-rose-400 space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                      <mat-icon class="text-base leading-none">shield</mat-icon>
                      <span>Tấn công MITM bị chặn &middot; HandshakeException: Pin Mismatch</span>
                    </div>
                    <div class="text-slate-300 text-[11px] leading-relaxed">
                      Phát hiện chứng chỉ giả mạo từ proxy / trung gian không nằm trong whitelist.<br>
                      http_security_pinning lập tức ngắt socket trước khi bất kỳ dữ liệu nhạy cảm nào được truyền đi.
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tab 3: refresh_sticky testbench -->
          @if (activeTestTab() === 'sticky') {
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  (click)="triggerStickyRefresh()"
                  [disabled]="isRefreshing()"
                  class="px-4 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                >
                  <mat-icon class="text-sm leading-none">refresh</mat-icon>
                  <span>{{ isRefreshing() ? i18n.t().packages.stickyReloading : i18n.t().packages.stickyTrigger }}</span>
                </button>
              </div>

              <!-- Visual scroll container -->
              <div class="rounded-xl bg-[#060910] border border-slate-800 p-3 sm:p-4 h-48 overflow-y-auto touch-scroll relative">
                <!-- Sticky pinned header -->
                <div
                  class="sticky top-0 z-10 px-3 py-2 rounded-lg backdrop-blur-md border transition-all text-xs font-mono flex items-center justify-between mb-3 gap-2"
                  [class.bg-indigo-950/80]="isRefreshing()"
                  [class.border-indigo-500/40]="isRefreshing()"
                  [class.text-indigo-300]="isRefreshing()"
                  [class.bg-slate-900/80]="!isRefreshing()"
                  [class.border-slate-800]="!isRefreshing()"
                  [class.text-slate-400]="!isRefreshing()"
                >
                  <div class="flex items-center gap-1.5 truncate">
                    <mat-icon class="text-xs leading-none shrink-0" [class.animate-spin]="isRefreshing()">
                      {{ isRefreshing() ? 'sync' : 'push_pin' }}
                    </mat-icon>
                    <span class="truncate">Sticky Refresh Indicator</span>
                  </div>
                  <span class="text-[11px] shrink-0">
                    {{ isRefreshing() ? 'Fetching...' : '120 FPS' }}
                  </span>
                </div>

                <div class="space-y-2 text-xs font-mono text-slate-300">
                  <div class="p-2.5 rounded bg-slate-900/60 border border-slate-800/80">Item 1: Feed Payload Synchronized (Cached)</div>
                  <div class="p-2.5 rounded bg-slate-900/60 border border-slate-800/80">Item 2: Real-time telemetry snapshot record</div>
                  <div class="p-2.5 rounded bg-slate-900/60 border border-slate-800/80">Item 3: Clean UI scrollable element with 120 FPS</div>
                </div>
              </div>
            </div>
          }

        </div>

      </div>

      <!-- Dart Snippet Modal (Responsive & Touch-Friendly) -->
      @if (selectedSnippetPackage(); as p) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div class="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-7 relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto touch-scroll">
            <button
              type="button"
              (click)="selectedSnippetPackage.set(null)"
              class="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <mat-icon>close</mat-icon>
            </button>

            <div class="flex items-baseline gap-2 mb-1.5 pr-8">
              <h3 class="text-lg sm:text-xl font-bold font-mono text-white truncate">{{ p.name }}</h3>
              <span class="text-xs font-mono text-emerald-400 font-semibold">{{ p.versionSpec }}</span>
            </div>
            <p class="text-xs text-slate-300 mb-5 leading-relaxed">
              {{ i18n.lang() === 'vi' ? p.descriptionVi : p.descriptionEn }}
            </p>

            <div class="rounded-xl bg-[#060910] border border-slate-800 overflow-hidden mb-6">
              <div class="px-3 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
                <span class="text-xs font-mono text-slate-400 truncate">example/main.dart</span>
                <a
                  [href]="p.pubDevUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-mono shrink-0"
                >
                  <span>pub.dev</span>
                  <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
                </a>
              </div>
              <div class="p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-indigo-200 overflow-x-auto touch-scroll leading-relaxed">
                <pre class="whitespace-pre"><code>{{ p.dartSnippet }}</code></pre>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                (click)="selectedSnippetPackage.set(null)"
                class="px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center"
              >
                {{ i18n.t().packages.close }}
              </button>
              <a
                [href]="p.pubDevUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
              >
                <mat-icon class="text-sm leading-none">extension</mat-icon>
                <span>{{ i18n.t().packages.openPubDev }}</span>
              </a>
            </div>
          </div>
        </div>
      }
    </section>
  `
})
export class Packages {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly copiedPackage = signal<string | null>(null);
  readonly selectedSnippetPackage = signal<PubPackage | null>(null);

  // Technical Playground state
  readonly activeTestTab = signal<'logger' | 'pinning' | 'sticky'>('logger');

  readonly logHistory = signal<LogEntry[]>([
    {
      id: 1,
      level: 'INFO',
      time: '08:42:15.102',
      message: '[AppKernel] DynamicLogger engine initialized with level: LogLevel.debug'
    },
    {
      id: 2,
      level: 'DEBUG',
      time: '08:42:15.118',
      message: '[NetworkRegistry] Registered HttpClient provider for endpoints'
    }
  ]);

  readonly pinningState = signal<'idle' | 'verified' | 'blocked'>('idle');
  readonly isRefreshing = signal(false);

  copyCommand(cmd: string, pkgName: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        this.copiedPackage.set(pkgName);
        setTimeout(() => this.copiedPackage.set(null), 2000);
      });
    }
  }

  emitLog(level: 'INFO' | 'WARN' | 'ERROR'): void {
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    let message = '';
    let detail: string | undefined;

    if (level === 'INFO') {
      message = '[RouterCoordinator] Navigation stack transitioned to /dashboard';
    } else if (level === 'WARN') {
      message = '[CacheStorage] Memory threshold reached 82%, flushing expired records';
    } else {
      message = '[HttpClient] TLS certificate handshaking failed on untrusted peer';
      detail = 'HandshakeException: SPKI Pinning failed on host api.internal.corp (Pin mismatch)';
    }

    this.logHistory.update(list => [
      ...list,
      {
        id: Date.now(),
        level,
        time: timeStr,
        message,
        detail
      }
    ]);
  }

  clearLogs(): void {
    this.logHistory.set([]);
  }

  testPinning(valid: boolean): void {
    this.pinningState.set(valid ? 'verified' : 'blocked');
  }

  triggerStickyRefresh(): void {
    this.isRefreshing.set(true);
    setTimeout(() => {
      this.isRefreshing.set(false);
    }, 1500);
  }
}
