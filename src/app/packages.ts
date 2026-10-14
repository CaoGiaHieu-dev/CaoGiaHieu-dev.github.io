import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData, PubPackage } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

interface LogEntry {
  id: number;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  time: string;
  message: string;
  detail?: string;
}

@Component({
  selector: 'app-packages',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="packages" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#07090e] dark:to-[#0a0e18] relative scroll-mt-20 transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Header with Scroll Reveal -->
        <div appScrollReveal class="max-w-3xl mb-10 sm:mb-14">
          <div class="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ i18n.t().packages.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ i18n.t().packages.title }}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ i18n.t().packages.subtitle }}
          </p>
        </div>

        <!-- 3 Verified Packages Grid (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          @for (pkg of data.publishedPackages; track pkg.id; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 100"
              class="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 p-5 sm:p-7 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 hover:shadow-lg dark:hover:shadow-indigo-500/5 shadow-xs transition-all duration-300 group"
            >
              <div>
                <!-- Top metadata row -->
                <div class="flex items-baseline justify-between mb-3 gap-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">pub.dev</span>
                    <span aria-hidden="true" class="text-slate-300 dark:text-slate-600">&middot;</span>
                    <span class="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      {{ pkg.versionSpec }}
                    </span>
                  </div>
                  <a
                    [href]="pkg.pubDevUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors min-h-[36px] px-1"
                  >
                    <span>pub.dev</span>
                    <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
                  </a>
                </div>

                <!-- Package Name -->
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors break-words">
                  {{ pkg.name }}
                </h3>

                <!-- Bilingual Description -->
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5">
                  {{ i18n.lang() === 'vi' ? pkg.descriptionVi : pkg.descriptionEn }}
                </p>

                <!-- Tags: Unboxed text separators with wrap -->
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-5 sm:mb-6">
                  @for (t of pkg.tags; track t) {
                    <span>{{ t }}</span>
                    @if (!$last) {
                      <span aria-hidden="true" class="text-slate-300 dark:text-slate-700">&middot;</span>
                    }
                  }
                </div>
              </div>

              <!-- Install command & Snippet toggle -->
              <div class="pt-4 sm:pt-5 border-t border-slate-200 dark:border-slate-800/80 space-y-3 mt-auto">
                <!-- Copyable command bar with touch-friendly button -->
                <div class="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-[#060910] border border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <code class="text-slate-700 dark:text-slate-300 text-[11px] truncate mr-2">{{ pkg.installCommand }}</code>
                  <button
                    type="button"
                    (click)="copyCommand(pkg.installCommand, pkg.name)"
                    class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Copy command"
                    aria-label="Copy install command"
                  >
                    <mat-icon class="text-sm leading-none">
                      {{ copiedPackage() === pkg.name ? 'check' : 'content_copy' }}
                    </mat-icon>
                  </button>
                </div>

                <!-- Open interactive snippet button -->
                <div class="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    (click)="selectedSnippet.set(pkg)"
                    class="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline flex items-center gap-1 min-h-[36px] py-1 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">code</mat-icon>
                    <span>{{ i18n.t().packages.viewCode }}</span>
                  </button>
                  <a
                    [href]="pkg.pubDevUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 min-h-[36px] py-1"
                  >
                    <span>pub.dev</span>
                    <mat-icon class="text-xs leading-none">launch</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Interactive 3-Package Testbench with Scroll Reveal -->
        <div appScrollReveal [delay]="120" class="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200 dark:border-slate-800/90 p-5 sm:p-7 md:p-8 shadow-sm dark:shadow-2xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-1">
                <mat-icon class="text-xs leading-none">play_circle</mat-icon>
                <span class="font-semibold">{{ i18n.t().packages.playgroundTitle }}</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {{ activeTestTab() === 'logger' ? i18n.t().packages.loggerTab : (activeTestTab() === 'pinning' ? i18n.t().packages.pinningTab : i18n.t().packages.stickyTab) }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {{ i18n.t().packages.playgroundSubtitle }}
              </p>
            </div>

            <!-- Segmented Package Tabs (Horizontal touch-scroller on narrow screens) -->
            <div class="flex items-center overflow-x-auto no-scrollbar touch-scroll p-1 bg-slate-100 dark:bg-[#060910] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono max-w-full shrink-0">
              <button
                type="button"
                (click)="activeTestTab.set('logger')"
                [class.bg-indigo-600]="activeTestTab() === 'logger'"
                [class.text-white]="activeTestTab() === 'logger'"
                [class.text-slate-600]="activeTestTab() !== 'logger'"
                [class.dark:text-slate-400]="activeTestTab() !== 'logger'"
                class="px-3 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center"
              >
                dynamic_logger
              </button>
              <button
                type="button"
                (click)="activeTestTab.set('pinning')"
                [class.bg-indigo-600]="activeTestTab() === 'pinning'"
                [class.text-white]="activeTestTab() === 'pinning'"
                [class.text-slate-600]="activeTestTab() !== 'pinning'"
                [class.dark:text-slate-400]="activeTestTab() !== 'pinning'"
                class="px-3 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center"
              >
                http_security_pinning
              </button>
              <button
                type="button"
                (click)="activeTestTab.set('sticky')"
                [class.bg-indigo-600]="activeTestTab() === 'sticky'"
                [class.text-white]="activeTestTab() === 'sticky'"
                [class.text-slate-600]="activeTestTab() !== 'sticky'"
                [class.dark:text-slate-400]="activeTestTab() !== 'sticky'"
                class="px-3 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center"
              >
                refresh_sticky
              </button>
            </div>
          </div>

          <!-- Tab 1: dynamic_logger live testbench -->
          @if (activeTestTab() === 'logger') {
            <div class="space-y-4 pt-5">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    (click)="emitLog('INFO')"
                    class="px-3.5 py-2.5 min-h-[44px] rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">info</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerInfo }}</span>
                  </button>
                  <button
                    type="button"
                    (click)="emitLog('WARN')"
                    class="px-3.5 py-2.5 min-h-[44px] rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">warning</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerWarn }}</span>
                  </button>
                  <button
                    type="button"
                    (click)="emitLog('ERROR')"
                    class="px-3.5 py-2.5 min-h-[44px] rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <mat-icon class="text-xs leading-none">error</mat-icon>
                    <span>{{ i18n.t().packages.loggerTriggerError }}</span>
                  </button>
                </div>

                <button
                  type="button"
                  (click)="clearLogs()"
                  class="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
                >
                  <mat-icon class="text-xs leading-none">delete_sweep</mat-icon>
                  <span>{{ i18n.t().packages.loggerClear }}</span>
                </button>
              </div>

              <!-- Terminal console window -->
              <div class="rounded-xl bg-slate-950 border border-slate-800 p-3 sm:p-4 font-mono text-[11px] sm:text-xs max-h-64 overflow-y-auto touch-scroll space-y-2">
                @for (entry of logHistory(); track entry.id) {
                  <div class="flex items-start gap-2 leading-relaxed">
                    <span class="text-slate-500 text-[10px] sm:text-[11px] shrink-0">{{ entry.time }}</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
                      [class.bg-sky-500/20]="entry.level === 'INFO'"
                      [class.text-sky-300]="entry.level === 'INFO'"
                      [class.bg-amber-500/20]="entry.level === 'WARN'"
                      [class.text-amber-300]="entry.level === 'WARN'"
                      [class.bg-rose-500/20]="entry.level === 'ERROR'"
                      [class.text-rose-300]="entry.level === 'ERROR'"
                      [class.bg-slate-700/30]="entry.level === 'DEBUG'"
                      [class.text-slate-300]="entry.level === 'DEBUG'"
                    >
                      [{{ entry.level }}]
                    </span>
                    <div class="flex-1 text-slate-200 break-words">
                      <span>{{ entry.message }}</span>
                      @if (entry.detail) {
                        <div class="text-[10px] sm:text-[11px] text-rose-400 font-mono mt-0.5 pl-2 border-l border-rose-800 break-words">
                          {{ entry.detail }}
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tab 2: http_security_pinning live testbench -->
          @if (activeTestTab() === 'pinning') {
            <div class="space-y-4 pt-5">
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  (click)="testValidHandshake()"
                  class="px-4 py-2.5 min-h-[44px] rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <mat-icon class="text-xs leading-none">lock</mat-icon>
                  <span>{{ i18n.t().packages.pinningTestValid }}</span>
                </button>
                <button
                  type="button"
                  (click)="testMitmAttack()"
                  class="px-4 py-2.5 min-h-[44px] rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <mat-icon class="text-xs leading-none">security</mat-icon>
                  <span>{{ i18n.t().packages.pinningTestInvalid }}</span>
                </button>
                <button
                  type="button"
                  (click)="resetPinning()"
                  class="px-3 py-2.5 min-h-[44px] rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs cursor-pointer"
                >
                  {{ i18n.t().packages.pinningReset }}
                </button>
              </div>

              <div class="rounded-xl bg-slate-50 dark:bg-[#060910] border border-slate-200 dark:border-slate-800 p-4 font-mono text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <span class="text-slate-500">{{ i18n.t().packages.pinningTargetHost }}</span>
                  <span class="text-indigo-600 dark:text-indigo-400">api.banking.example.com (TLS 1.3)</span>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <span class="text-slate-500">{{ i18n.t().packages.pinningAllowedSpki }}</span>
                  <span class="text-emerald-600 dark:text-emerald-400 truncate max-w-xs">SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=</span>
                </div>
              </div>

              <!-- Pinning Simulation Result Box -->
              <div
                class="rounded-xl p-4 border transition-colors"
                [class.border-slate-200]="pinningResult() === 'idle'"
                [class.dark:border-slate-800]="pinningResult() === 'idle'"
                [class.bg-slate-100]="pinningResult() === 'idle'"
                [class.dark:bg-slate-900/40]="pinningResult() === 'idle'"
                [class.border-emerald-500/50]="pinningResult() === 'success'"
                [class.bg-emerald-50]="pinningResult() === 'success'"
                [class.dark:bg-emerald-950/20]="pinningResult() === 'success'"
                [class.border-rose-500/50]="pinningResult() === 'blocked'"
                [class.bg-rose-50]="pinningResult() === 'blocked'"
                [class.dark:bg-rose-950/20]="pinningResult() === 'blocked'"
              >
                @if (pinningResult() === 'idle') {
                  <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <mat-icon class="text-sm leading-none">radio_button_unchecked</mat-icon>
                    <span>{{ i18n.t().packages.pinningAwaitingStatus }}</span>
                  </div>
                } @else if (pinningResult() === 'success') {
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      <mat-icon class="text-sm leading-none">check_circle</mat-icon>
                      <span>{{ i18n.t().packages.pinningSuccessTitle }}</span>
                    </div>
                    <p class="text-xs text-emerald-800 dark:text-emerald-200/90 leading-relaxed font-mono">
                      {{ i18n.t().packages.pinningSuccessDesc }}
                    </p>
                  </div>
                } @else {
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 font-mono">
                      <mat-icon class="text-sm leading-none">gpp_bad</mat-icon>
                      <span>{{ i18n.t().packages.pinningBlockedTitle }}</span>
                    </div>
                    <p class="text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed font-mono">
                      {{ i18n.t().packages.pinningBlockedDesc }}
                    </p>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tab 3: refresh_sticky live testbench -->
          @if (activeTestTab() === 'sticky') {
            <div class="space-y-4 pt-5">
              <div class="flex items-center justify-between">
                <button
                  type="button"
                  (click)="simulatePullToRefresh()"
                  [disabled]="isRefreshing()"
                  class="px-4 py-2.5 min-h-[44px] rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                >
                  <mat-icon class="text-xs leading-none" [class.animate-spin]="isRefreshing()">refresh</mat-icon>
                  <span>{{ isRefreshing() ? i18n.t().packages.stickyReloading : i18n.t().packages.stickyTrigger }}</span>
                </button>
                <span class="text-xs font-mono text-slate-500">
                  {{ isRefreshing() ? i18n.t().packages.stickyReloading : i18n.t().packages.stickyDone }}
                </span>
              </div>

              <!-- Interactive Mock Viewport with Sticky Header -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060910] h-52 overflow-y-auto touch-scroll relative p-0 font-mono text-xs">
                <!-- Sticky pinned header -->
                <div class="sticky top-0 left-0 right-0 z-10 px-4 py-2.5 bg-indigo-600 text-white font-bold flex items-center justify-between text-xs shadow-md">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-xs leading-none">vertical_align_top</mat-icon>
                    <span>{{ i18n.t().packages.stickyHeaderTitle }}</span>
                  </div>
                  <span class="text-[10px] bg-indigo-700/60 px-1.5 py-0.5 rounded text-white">pinned: true</span>
                </div>

                <div class="p-4 space-y-3 text-slate-700 dark:text-slate-300">
                  <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
                    {{ i18n.t().packages.stickyItem1 }}
                  </div>
                  <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
                    {{ i18n.t().packages.stickyItem2 }}
                  </div>
                  <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs">
                    {{ i18n.t().packages.stickyItem3 }}
                  </div>
                  <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-slate-500 shadow-xs">
                    Row 4: Cached memory footprint &lt; 2.4 MB
                  </div>
                  <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-slate-500 shadow-xs">
                    Row 5: Zero jank on iOS & Android scroll events
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

      </div>

      <!-- Code Snippet Modal Dialog -->
      @if (selectedSnippet()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl w-full overflow-hidden shadow-2xl">
            <div class="px-5 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <mat-icon class="text-indigo-600 dark:text-indigo-400 text-sm">code</mat-icon>
                <span class="text-sm font-bold font-mono text-slate-900 dark:text-white">{{ selectedSnippet()?.name }}</span>
              </div>
              <button
                type="button"
                (click)="selectedSnippet.set(null)"
                class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <mat-icon class="text-base leading-none">close</mat-icon>
              </button>
            </div>

            <div class="p-4 sm:p-5 font-mono text-xs overflow-x-auto touch-scroll bg-slate-950 text-indigo-200 max-h-[420px]">
              <pre class="whitespace-pre"><code>{{ selectedSnippet()?.dartSnippet }}</code></pre>
            </div>

            <div class="px-5 py-3.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <a
                [href]="selectedSnippet()?.pubDevUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                <span>{{ i18n.t().packages.openPubDev }}</span>
                <mat-icon class="text-xs leading-none">launch</mat-icon>
              </a>
              <button
                type="button"
                (click)="selectedSnippet.set(null)"
                class="px-4 py-2 min-h-[36px] rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                {{ i18n.t().packages.close }}
              </button>
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
  readonly selectedSnippet = signal<PubPackage | null>(null);
  readonly activeTestTab = signal<'logger' | 'pinning' | 'sticky'>('logger');

  // Testbench state
  readonly logHistory = signal<LogEntry[]>([
    {
      id: 1,
      level: 'INFO',
      time: '12:00:01.102',
      message: '[AuthService] Initializing Dart secure session token...',
    },
    {
      id: 2,
      level: 'DEBUG',
      time: '12:00:01.450',
      message: '[HttpClient] Prepared HTTP connection pool with SPKI verification',
    },
    {
      id: 3,
      level: 'INFO',
      time: '12:00:02.015',
      message: '[BlocObserver] Transition { Current: AuthLoading, Next: Authenticated }',
    },
  ]);

  readonly pinningResult = signal<'idle' | 'success' | 'blocked'>('idle');
  readonly isRefreshing = signal<boolean>(false);

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
      message = `[AppLifecycle] Route dispatched: /packages/details?id=${Math.floor(Math.random() * 900 + 100)}`;
    } else if (level === 'WARN') {
      message = `[CacheManager] Memory cache high-water mark reached (82% capacity). Flushing oldest 15 items...`;
    } else {
      message = `[HttpPinning] Handshake failure detected on untrusted intermediary proxy.`;
      detail = `HandshakeException: Certificate verification failed (Host: proxy.in-the-middle.local:8080)`;
    }

    const newEntry: LogEntry = {
      id: Date.now(),
      level,
      time: timeStr,
      message,
      detail,
    };

    this.logHistory.update(list => [newEntry, ...list.slice(0, 19)]);
  }

  clearLogs(): void {
    this.logHistory.set([]);
  }

  testValidHandshake(): void {
    this.pinningResult.set('success');
  }

  testMitmAttack(): void {
    this.pinningResult.set('blocked');
  }

  resetPinning(): void {
    this.pinningResult.set('idle');
  }

  simulatePullToRefresh(): void {
    this.isRefreshing.set(true);
    setTimeout(() => {
      this.isRefreshing.set(false);
    }, 1200);
  }
}
