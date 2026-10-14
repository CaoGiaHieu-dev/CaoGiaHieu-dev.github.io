import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-slate-200/80 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- Left Column: Typographic Hierarchy -->
          <div appScrollReveal class="lg:col-span-7 space-y-6">
            
            <!-- Category Tag -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Flutter Developer &middot; Pub.dev Package Author</span>
            </div>

            <!-- Main Headline -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {{ i18n.lang() === 'vi' ? 'Kiến trúc Flutter hiệu năng cao & Thư viện bảo mật di động' : 'High-Reliability Flutter Architecture & Core Dart Packages' }}
            </h1>

            <!-- Bio Lead Copy -->
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {{ i18n.lang() === 'vi' 
                ? 'Tác giả 3 thư viện chính thức trên Pub.dev, thiết kế kiến trúc Flutter Monorepo chuẩn doanh nghiệp và trực tiếp đóng góp kỹ thuật cho Google Flutter framework & packages.'
                : 'Author of 3 published Pub.dev packages, creator of enterprise Flutter Monorepo blueprint, and active open-source contributor to Google Flutter framework & packages.'
              }}
            </p>

            <!-- Key Quantitative Metrics Strip -->
            <div class="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div class="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                <div class="text-xl sm:text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">3</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {{ i18n.lang() === 'vi' ? 'Pub.dev Packages' : 'Pub.dev Packages' }}
                </div>
              </div>

              <div class="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                <div class="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">SPKI</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {{ i18n.lang() === 'vi' ? 'SSL Pinning Core' : 'SSL Pinning Core' }}
                </div>
              </div>

              <div class="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Core</div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {{ i18n.lang() === 'vi' ? 'Flutter Contributor' : 'Flutter Contributor' }}
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href="#packages"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{{ i18n.t().hero.btnPackages }}</span>
                <mat-icon class="text-sm leading-none">arrow_forward</mat-icon>
              </a>

              <a
                href="#architecture"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-white text-xs font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">account_tree</mat-icon>
                <span>{{ i18n.t().hero.btnContributions }}</span>
              </a>

              <a
                href="#contact"
                class="px-4 py-3 min-h-[44px] rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-xs leading-none text-slate-500 dark:text-slate-400">mail</mat-icon>
                <span>{{ i18n.t().hero.btnContact }}</span>
              </a>
            </div>

          </div>

          <!-- Right Column: macOS Studio Code Window -->
          <div appScrollReveal [delay]="140" class="lg:col-span-5 w-full">
            <div class="rounded-2xl bg-[#0d1017] border border-slate-700/60 dark:border-white/[0.12] overflow-hidden shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
              
              <!-- Window top bar with traffic lights -->
              <div class="px-4 py-3 bg-[#161b26] border-b border-slate-800/80 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                  <span class="ml-2 text-xs font-mono text-slate-400 truncate flex items-center gap-1.5">
                    <span class="text-sky-400">dart</span>
                    <span>http_security_pinning.dart</span>
                  </span>
                </div>
                <a
                  href="https://pub.dev/packages/http_security_pinning"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>pub.dev</span>
                  <mat-icon class="text-[10px] leading-none">open_in_new</mat-icon>
                </a>
              </div>

              <!-- Code Editor Body -->
              <div class="p-4 sm:p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto touch-scroll bg-[#0a0d14] max-h-[380px]">
                <pre class="font-mono text-[11px] sm:text-xs text-slate-300 whitespace-pre"><code><span class="text-slate-500">// SPKI SHA-256 Pinning with HttpClient</span>
<span class="text-purple-400">import</span> <span class="text-emerald-300">'package:http_security_pinning/http_security_pinning.dart'</span>;

<span class="text-slate-500">// Intercepts and blocks MITM proxy attacks</span>
<span class="text-purple-400">final</span> client = HttpCertificatePinning.<span class="text-sky-300">createHttpClient</span>(
  allowedPins: [
    <span class="text-amber-300">'SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E='</span>,
  ],
  timeout: <span class="text-purple-400">const</span> Duration(seconds: <span class="text-amber-300">15</span>),
);

<span class="text-purple-400">final</span> request = <span class="text-purple-400">await</span> client.<span class="text-sky-300">getUrl</span>(
  Uri.<span class="text-sky-300">parse</span>(<span class="text-emerald-300">'https://api.domain.com/v1/auth'</span>),
);
<span class="text-purple-400">final</span> response = <span class="text-purple-400">await</span> request.<span class="text-sky-300">close</span>();</code></pre>
              </div>

              <!-- Terminal Command Footer -->
              <div class="px-4 py-3 bg-[#11151f] border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                <span class="text-sky-300 text-[11px] truncate select-all">flutter pub add http_security_pinning</span>
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

  copyInstallCommand(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('flutter pub add http_security_pinning').then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }
}
