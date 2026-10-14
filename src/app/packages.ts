import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData, PubPackage } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-packages',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="packages" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.06] relative scroll-mt-20 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div appScrollReveal class="max-w-3xl mb-12 sm:mb-16">
          <div class="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
            <span class="font-semibold uppercase tracking-wider">{{ i18n.t().packages.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ i18n.t().packages.title }}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ i18n.t().packages.subtitle }}
          </p>
        </div>

        <!-- 3 Verified Packages Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (pkg of data.publishedPackages; track pkg.id; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 80"
              class="rounded-2xl glass-card border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-7 shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/40 hover:shadow-xl dark:hover:shadow-sky-950/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <!-- Top Header: Name & Version -->
                <div class="flex items-start justify-between gap-3 mb-3.5">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-bold text-base sm:text-lg font-mono text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {{ pkg.name }}
                      </h3>
                      <span class="px-2 py-0.5 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 font-bold">
                        {{ pkg.versionSpec }}
                      </span>
                    </div>
                    <div class="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      <mat-icon class="text-xs leading-none">verified</mat-icon>
                      <span class="font-medium">Pub.dev Verified</span>
                    </div>
                  </div>

                  <!-- Direct GitHub Repo Link -->
                  <a
                    [href]="pkg.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
                    [attr.aria-label]="'GitHub repository for ' + pkg.name"
                  >
                    <mat-icon class="text-base leading-none">code</mat-icon>
                  </a>
                </div>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {{ i18n.lang() === 'vi' ? pkg.descriptionVi : pkg.descriptionEn }}
                </p>

                <!-- Tags as clean micro-chips -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  @for (tag of pkg.tags; track tag) {
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.06]">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Bottom Actions -->
              <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <!-- Install command snippet with 1-click copy -->
                <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#08090d] border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono">
                  <span class="truncate text-slate-700 dark:text-slate-300 select-all text-[11px] sm:text-xs">
                    {{ pkg.installCommand }}
                  </span>
                  <button
                    type="button"
                    (click)="copyCommand(pkg.installCommand, pkg.name)"
                    class="p-1 rounded-lg text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200 dark:hover:bg-white/[0.08] transition-colors shrink-0 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center active:scale-95"
                    [attr.aria-label]="'Copy install command for ' + pkg.name"
                  >
                    <mat-icon class="text-xs leading-none">
                      {{ copiedPackage() === pkg.name ? 'check' : 'content_copy' }}
                    </mat-icon>
                  </button>
                </div>

                <!-- View Code Implementation & External Pub.dev Link -->
                <div class="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                  <button
                    type="button"
                    (click)="selectedSnippet.set(pkg)"
                    class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 min-h-[36px] py-1 cursor-pointer font-medium"
                  >
                    <mat-icon class="text-xs leading-none">code</mat-icon>
                    <span>{{ i18n.t().packages.viewCode }}</span>
                  </button>

                  <a
                    [href]="pkg.pubDevUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 min-h-[36px] py-1"
                  >
                    <span>pub.dev</span>
                    <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

      </div>

      <!-- Code Snippet Modal Dialog -->
      @if (selectedSnippet()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div class="rounded-2xl bg-[#090b10] border border-slate-800 dark:border-white/[0.12] max-w-2xl w-full overflow-hidden shadow-2xl">
            <!-- Modal header -->
            <div class="px-5 py-4 bg-[#11141c] border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                <span class="text-sm font-bold font-mono text-white">{{ selectedSnippet()?.name }}</span>
                <span class="text-xs font-mono text-slate-400">({{ selectedSnippet()?.versionSpec }})</span>
              </div>
              <button
                type="button"
                (click)="selectedSnippet.set(null)"
                class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.08] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <mat-icon class="text-base leading-none">close</mat-icon>
              </button>
            </div>

            <!-- Modal code -->
            <div class="p-5 font-mono text-xs overflow-x-auto touch-scroll bg-[#08090d] text-sky-200 max-h-[420px] leading-relaxed">
              <pre class="whitespace-pre"><code>{{ selectedSnippet()?.dartSnippet }}</code></pre>
            </div>

            <!-- Modal footer -->
            <div class="px-5 py-3.5 bg-[#11141c] border-t border-slate-800 flex items-center justify-between">
              <a
                [href]="selectedSnippet()?.pubDevUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1.5"
              >
                <span>{{ i18n.t().packages.openPubDev }}</span>
                <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
              </a>
              <button
                type="button"
                (click)="selectedSnippet.set(null)"
                class="px-4 py-2 min-h-[36px] rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold font-mono cursor-pointer transition-colors"
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

  copyCommand(cmd: string, pkgName: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        this.copiedPackage.set(pkgName);
        setTimeout(() => this.copiedPackage.set(null), 2000);
      });
    }
  }
}
