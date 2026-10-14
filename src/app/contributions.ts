import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenSourceContribution, PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-contributions',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contributions" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.06] relative scroll-mt-20 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div appScrollReveal class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
              <span class="font-semibold uppercase tracking-wider">{{ i18n.t().contributions.kicker }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {{ i18n.t().contributions.title }}
            </h2>
            <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ i18n.t().contributions.subtitle }}
            </p>
          </div>

          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.1] text-xs font-mono font-medium text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer active:scale-95"
          >
            <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">code</mat-icon>
            <span>github.com/CaoGiaHieu-dev</span>
          </a>
        </div>

        <!-- Filter Segmented Bar -->
        <div appScrollReveal [delay]="80" class="flex items-center overflow-x-auto no-scrollbar touch-scroll gap-1.5 p-1 bg-slate-100 dark:bg-[#0f121a] border border-slate-200/90 dark:border-white/[0.08] rounded-xl mb-8 max-w-full">
          <button
            type="button"
            (click)="activeCategory.set('all')"
            [class]="'px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center gap-1.5 ' + filterBtnClass('all')"
          >
            <span>{{ i18n.t().contributions.filterAll }}</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded font-mono"
              [class]="activeCategory() === 'all' ? 'bg-slate-100 text-slate-900 dark:bg-sky-400/30 dark:text-sky-100' : 'bg-slate-200/70 text-slate-600 dark:bg-white/[0.08] dark:text-slate-400'"
            >
              {{ data.contributions.length }}
            </span>
          </button>
          
          <button
            type="button"
            (click)="activeCategory.set('flutter')"
            [class]="'px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center ' + filterBtnClass('flutter')"
          >
            {{ i18n.t().contributions.filterFlutter }}
          </button>

          <button
            type="button"
            (click)="activeCategory.set('community')"
            [class]="'px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center ' + filterBtnClass('community')"
          >
            {{ i18n.t().contributions.filterCommunity }}
          </button>
        </div>

        <!-- Contributions Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          @for (item of filteredContributions(); track item.id; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 70"
              class="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <!-- Top metadata: Repository + Status Badge -->
                <div class="flex items-center justify-between mb-3.5 gap-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <mat-icon class="text-xs text-sky-500 leading-none">folder</mat-icon>
                      {{ item.repository }}
                    </span>
                  </div>

                  <!-- Status -->
                  <div class="flex items-center gap-1.5">
                    @if (item.status === 'Merged') {
                      <span class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <mat-icon class="text-[10px] leading-none">check_circle</mat-icon>
                        MERGED
                      </span>
                    } @else if (item.status === 'Resolved / Solution Provided') {
                      <span class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center gap-1">
                        <mat-icon class="text-[10px] leading-none">task_alt</mat-icon>
                        RESOLVED
                      </span>
                    } @else {
                      <span class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        OPEN
                      </span>
                    }
                  </div>
                </div>

                <!-- Title -->
                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {{ item.title }}
                </h3>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {{ i18n.lang() === 'vi' ? item.descriptionVi : item.descriptionEn }}
                </p>
              </div>

              <!-- Bottom Link -->
              <div class="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 dark:text-slate-500">{{ item.referenceNumber }}</span>
                <a
                  [href]="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 group/link"
                >
                  <span>{{ i18n.t().contributions.viewOnGithub }}</span>
                  <mat-icon class="text-xs leading-none group-hover/link:translate-x-0.5 transition-transform">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class Contributions {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly activeCategory = signal<'all' | 'flutter' | 'community'>('all');

  readonly filteredContributions = computed<OpenSourceContribution[]>(() => {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.data.contributions;
    }
    return this.data.contributions.filter(c => c.category === category);
  });

  filterBtnClass(category: 'all' | 'flutter' | 'community'): string {
    const isActive = this.activeCategory() === category;
    if (isActive) {
      return 'bg-white text-slate-900 border border-slate-200/90 shadow-xs dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40 font-bold';
    }
    return 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:bg-slate-200/60 dark:hover:bg-white/[0.06] font-medium';
  }
}
