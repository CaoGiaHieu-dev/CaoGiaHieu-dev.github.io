import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-architecture',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="architecture" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#07090e] relative scroll-mt-20 transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header (Responsive Stack with Scroll Reveal) -->
        <div appScrollReveal class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-5 sm:gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
              <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ i18n.t().architecture.kicker }}</span>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono break-words">
              {{ data.monorepoArchitecture.name }}
            </h2>
            <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ i18n.lang() === 'vi' ? data.monorepoArchitecture.descriptionVi : data.monorepoArchitecture.descriptionEn }}
            </p>
          </div>

          <a
            [href]="data.monorepoArchitecture.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer"
          >
            <mat-icon class="text-sm leading-none text-indigo-600 dark:text-indigo-400">code</mat-icon>
            <span>{{ i18n.t().architecture.viewRepo }}</span>
            <mat-icon class="text-xs leading-none text-slate-400">open_in_new</mat-icon>
          </a>
        </div>

        <!-- 4 Architectural Pillars Grid (1 col on mobile, 2 cols on tablet & desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          @for (pillar of pillars(); track pillar.title; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 80"
              class="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-indigo-400/50 dark:hover:border-indigo-500/30 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-all duration-300"
            >
              <div class="flex items-center gap-3.5 mb-3.5">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <mat-icon class="text-lg leading-none">{{ pillar.icon }}</mat-icon>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {{ pillar.title }}
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {{ pillar.detail }}
              </p>
            </div>
          }
        </div>

        <!-- Directory Structure Code Box (Zero mobile overflow + smooth touch swipe) -->
        <div appScrollReveal [delay]="140" class="rounded-2xl bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-300 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-2xl">
          <div class="px-4 sm:px-6 py-3.5 bg-slate-950 dark:bg-[#0a0e18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300 dark:text-slate-400">
            <span class="flex items-center gap-2">
              <mat-icon class="text-sm leading-none text-indigo-400">folder_open</mat-icon>
              <span>{{ i18n.t().architecture.treeTitle }}</span>
            </span>
            <span class="text-[11px] text-slate-400 dark:text-slate-500">{{ i18n.t().architecture.treeSubtitle }}</span>
          </div>

          <div class="p-4 sm:p-6 font-mono text-[10px] sm:text-[11px] md:text-xs text-indigo-200 overflow-x-auto touch-scroll bg-[#060910] leading-relaxed max-w-full">
            <pre class="whitespace-pre"><code>{{ data.monorepoArchitecture.structureTree }}</code></pre>
          </div>
        </div>

      </div>
    </section>
  `
})
export class Architecture {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);

  readonly pillars = computed(() => [
    {
      title: this.i18n.t().architecture.pillar1Title,
      detail: this.i18n.t().architecture.pillar1Detail,
      icon: 'account_tree'
    },
    {
      title: this.i18n.t().architecture.pillar2Title,
      detail: this.i18n.t().architecture.pillar2Detail,
      icon: 'layers'
    },
    {
      title: this.i18n.t().architecture.pillar3Title,
      detail: this.i18n.t().architecture.pillar3Detail,
      icon: 'hub'
    },
    {
      title: this.i18n.t().architecture.pillar4Title,
      detail: this.i18n.t().architecture.pillar4Detail,
      icon: 'verified'
    }
  ]);
}
