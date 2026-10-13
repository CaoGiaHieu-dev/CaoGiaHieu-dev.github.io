import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-28 overflow-hidden ambient-glow bg-mesh-pattern border-b border-slate-800/80">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          <!-- Left Column: Authentic Profile & Responsive Content -->
          <div class="lg:col-span-7 space-y-5 sm:space-y-6">
            
            <!-- Clean unboxed metadata kicker with typographic separator -->
            <div class="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-400 font-mono">
              <span class="text-indigo-400 font-semibold">{{ data.profile.title }}</span>
              <span aria-hidden="true" class="text-slate-600">&middot;</span>
              <span>{{ i18n.lang() === 'vi' ? data.profile.location : data.profile.locationEn }}</span>
              <span aria-hidden="true" class="text-slate-600">&middot;</span>
              <span class="text-emerald-400 font-medium">Pub.dev Author</span>
            </div>

            <!-- Main Heading with responsive fluid scale & anti-orphan -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.16] text-balance">
              {{ i18n.t().hero.greeting }}
              <span class="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                {{ data.profile.name }}
              </span>.
              <span class="block text-slate-300 text-xl sm:text-2xl md:text-3xl font-semibold mt-2">
                {{ i18n.t().hero.role }}
              </span>
            </h1>

            <!-- Bio prose -->
            <p class="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
              {{ i18n.t().hero.bio }}
            </p>

            <!-- 3 Factual Highlights with Responsive Spacing -->
            <div class="space-y-2.5 sm:space-y-3 pt-1 text-xs sm:text-sm text-slate-300">
              <div class="flex items-start gap-2.5">
                <mat-icon class="text-base leading-none text-emerald-400 mt-0.5 shrink-0">verified</mat-icon>
                <span>{{ i18n.t().hero.highlight1 }}</span>
              </div>
              <div class="flex items-start gap-2.5">
                <mat-icon class="text-base leading-none text-emerald-400 mt-0.5 shrink-0">verified</mat-icon>
                <span>{{ i18n.t().hero.highlight2 }}</span>
              </div>
              <div class="flex items-start gap-2.5">
                <mat-icon class="text-base leading-none text-emerald-400 mt-0.5 shrink-0">verified</mat-icon>
                <span>{{ i18n.t().hero.highlight3 }}</span>
              </div>
            </div>

            <!-- Action buttons: Stack cleanly on mobile (<640px), horizontal on tablet/desktop -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 w-full sm:w-auto">
              <a
                href="#packages"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-center"
              >
                <mat-icon class="text-sm leading-none">extension</mat-icon>
                <span>{{ i18n.t().hero.btnPackages }}</span>
              </a>

              <a
                href="#contributions"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <mat-icon class="text-sm leading-none text-indigo-400">commit</mat-icon>
                <span>{{ i18n.t().hero.btnContributions }}</span>
              </a>

              <a
                href="#contact"
                class="px-4 py-3 min-h-[44px] rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <mat-icon class="text-xs leading-none text-slate-400">mail</mat-icon>
                <span>{{ i18n.t().hero.btnContact }}</span>
              </a>
            </div>

          </div>

          <!-- Right Column: Code Snippet Card (Scaled for mobile touch screens) -->
          <div class="lg:col-span-5 w-full max-w-full">
            <div class="rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 overflow-hidden shadow-2xl backdrop-blur-xl hover:border-slate-700 transition-colors">
              <!-- Window top bar -->
              <div class="px-4 py-3 bg-[#0a0e18] border-b border-slate-800/90 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span class="ml-2 text-xs font-mono text-slate-400 truncate max-w-[170px] sm:max-w-none">
                    http_security_pinning: ^2.0.0
                  </span>
                </div>
                <a
                  href="https://pub.dev/packages/http_security_pinning"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>pub.dev</span>
                  <mat-icon class="text-[10px] leading-none">arrow_outward</mat-icon>
                </a>
              </div>

              <!-- Real code snippet with smooth horizontal touch-scrolling -->
              <div class="p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed overflow-x-auto touch-scroll bg-[#060910] max-h-[350px]">
                <pre class="font-mono text-indigo-200 whitespace-pre"><code><span class="text-slate-500">// SPKI SHA-256 Pinning with drop-in HttpClient</span>
<span class="text-purple-400">import</span> <span class="text-emerald-300">'package:http_security_pinning/http_security_pinning.dart'</span>;

<span class="text-purple-400">final</span> client = HttpCertificatePinning.createHttpClient(
  allowedPins: [
    <span class="text-emerald-300">'SPKI:r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E='</span>,
  ],
  timeout: <span class="text-purple-400">const</span> Duration(seconds: <span class="text-amber-300">15</span>),
);

<span class="text-slate-500">// Intercepts and blocks MITM proxy handshakes</span>
<span class="text-purple-400">final</span> request = <span class="text-purple-400">await</span> client.getUrl(
  Uri.parse(<span class="text-emerald-300">'https://api.yourdomain.com/v1/auth'</span>),
);
<span class="text-purple-400">final</span> response = <span class="text-purple-400">await</span> request.close();</code></pre>
              </div>

              <!-- Terminal footer with touch-friendly copy action -->
              <div class="px-4 py-3 bg-[#0a0e18] border-t border-slate-800/90 flex items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                <span class="text-slate-300 text-[11px] truncate">flutter pub add http_security_pinning</span>
                <button
                  type="button"
                  (click)="copyInstallCommand()"
                  class="text-indigo-400 hover:text-indigo-300 text-[11px] flex items-center gap-1.5 cursor-pointer min-h-[36px] px-2 rounded-lg hover:bg-slate-800 shrink-0 transition-colors"
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
