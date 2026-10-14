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
    <section id="contributions" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.08] relative scroll-mt-20 transition-colors duration-200">
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
            <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ i18n.t().contributions.subtitle }}
            </p>
          </div>

          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-xs font-mono font-medium text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer"
          >
            <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">code</mat-icon>
            <span>github.com/CaoGiaHieu-dev</span>
          </a>
        </div>

        <!-- Filter Segmented Bar -->
        <div appScrollReveal [delay]="80" class="flex items-center overflow-x-auto no-scrollbar touch-scroll gap-1.5 p-1 bg-slate-100 dark:bg-[#10131a] border border-slate-200 dark:border-white/[0.08] rounded-xl mb-8 max-w-full">
          <button
            type="button"
            (click)="activeCategory.set('all')"
            [class.bg-white]="activeCategory() === 'all'"
            [class.dark:bg-white/[0.1]]="activeCategory() === 'all'"
            [class.text-slate-900]="activeCategory() === 'all'"
            [class.dark:text-white]="activeCategory() === 'all'"
            [class.shadow-xs]="activeCategory() === 'all'"
            [class.text-slate-600]="activeCategory() !== 'all'"
            [class.dark:text-slate-400]="activeCategory() !== 'all'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono font-medium flex items-center gap-1.5"
          >
            <span>{{ i18n.t().contributions.filterAll }}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-white/[0.08]">
              {{ data.contributions.length }}
            </span>
          </button>
          
          <button
            type="button"
            (click)="activeCategory.set('flutter')"
            [class.bg-white]="activeCategory() === 'flutter'"
            [class.dark:bg-white/[0.1]]="activeCategory() === 'flutter'"
            [class.text-slate-900]="activeCategory() === 'flutter'"
            [class.dark:text-white]="activeCategory() === 'flutter'"
            [class.shadow-xs]="activeCategory() === 'flutter'"
            [class.text-slate-600]="activeCategory() !== 'flutter'"
            [class.dark:text-slate-400]="activeCategory() !== 'flutter'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono font-medium flex items-center"
          >
            {{ i18n.t().contributions.filterFlutter }}
          </button>

          <button
            type="button"
            (click)="activeCategory.set('community')"
            [class.bg-white]="activeCategory() === 'community'"
            [class.dark:bg-white/[0.1]]="activeCategory() === 'community'"
            [class.text-slate-900]="activeCategory() === 'community'"
            [class.dark:text-white]="activeCategory() === 'community'"
            [class.shadow-xs]="activeCategory() === 'community'"
            [class.text-slate-600]="activeCategory() !== 'community'"
            [class.dark:text-slate-400]="activeCategory() !== 'community'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono font-medium flex items-center"
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
              class="p-6 rounded-2xl bg-white dark:bg-[#10131a] border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/30 transition-all flex flex-col justify-between group"
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
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <mat-icon class="text-[10px] leading-none">check_circle</mat-icon>
                        MERGED
                      </span>
                    } @else if (item.status === 'Resolved / Solution Provided') {
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center gap-1">
                        <mat-icon class="text-[10px] leading-none">task_alt</mat-icon>
                        RESOLVED
                      </span>
                    } @else {
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
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
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {{ i18n.lang() === 'vi' ? item.descriptionVi : item.descriptionEn }}
                </p>
              </div>

              <!-- Bottom Link -->
              <div class="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 dark:text-slate-500 text-[11px]">{{ item.referenceNumber }}</span>
                <a
                  [href]="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline flex items-center gap-1 min-h-[32px] py-1"
                >
                  <span>{{ i18n.t().contributions.viewOnGithub }}</span>
                  <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
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
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.data.contributions;
    }
    return this.data.contributions.filter(c => c.category === cat);
  });
}
