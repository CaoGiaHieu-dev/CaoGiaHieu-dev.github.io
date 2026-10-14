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
    <section id="architecture" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.08] relative scroll-mt-20 transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div appScrollReveal class="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
              <span class="font-semibold uppercase tracking-wider">{{ i18n.t().architecture.kicker }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
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
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-xs font-mono text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer"
          >
            <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">code</mat-icon>
            <span>{{ i18n.t().architecture.viewRepo }}</span>
            <mat-icon class="text-xs leading-none text-slate-400">open_in_new</mat-icon>
          </a>
        </div>

        <!-- 4 Architectural Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-12">
          @for (pillar of pillars(); track pillar.title; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 80"
              class="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#10131a] border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <mat-icon class="text-lg leading-none">{{ pillar.icon }}</mat-icon>
                  </div>
                  <span class="text-xs font-mono font-bold text-slate-400 dark:text-slate-600">
                    0{{ i + 1 }}
                  </span>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {{ pillar.title }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {{ pillar.detail }}
                </p>
              </div>
            </div>
          }
        </div>

        <!-- Directory Structure Code Box -->
        <div appScrollReveal [delay]="140" class="rounded-2xl bg-[#0d1017] border border-slate-700/60 dark:border-white/[0.12] overflow-hidden shadow-2xl">
          <!-- Window Header -->
          <div class="px-5 py-3.5 bg-[#161b26] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <mat-icon class="text-sm leading-none text-sky-400">folder_open</mat-icon>
              <span>{{ i18n.t().architecture.treeTitle }}</span>
            </div>
            <span class="text-[11px] text-slate-500">{{ i18n.t().architecture.treeSubtitle }}</span>
          </div>

          <div class="p-5 sm:p-6 font-mono text-[11px] sm:text-xs text-sky-200 overflow-x-auto touch-scroll bg-[#0a0d14] leading-relaxed">
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
      icon: 'verified_user'
    }
  ]);
}
