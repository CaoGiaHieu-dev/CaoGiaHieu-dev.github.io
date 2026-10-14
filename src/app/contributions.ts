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
    <section id="contributions" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0e18] dark:to-[#07090e] relative scroll-mt-20 transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header with Scroll Reveal -->
        <div appScrollReveal class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
              <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ i18n.t().contributions.kicker }}</span>
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
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer"
          >
            <mat-icon class="text-sm leading-none text-indigo-600 dark:text-indigo-400">code</mat-icon>
            <span>github.com/CaoGiaHieu-dev</span>
          </a>
        </div>

        <!-- Filter Tabs (Smooth horizontal touch-scrolling for phones, wrap for desktop) -->
        <div appScrollReveal [delay]="80" class="flex items-center overflow-x-auto no-scrollbar touch-scroll gap-2 p-1.5 bg-slate-100 dark:bg-[#060910] border border-slate-200 dark:border-slate-800 rounded-xl mb-6 sm:mb-8 max-w-full">
          <button
            type="button"
            (click)="activeCategory.set('all')"
            [class.bg-indigo-600]="activeCategory() === 'all'"
            [class.text-white]="activeCategory() === 'all'"
            [class.text-slate-600]="activeCategory() !== 'all'"
            [class.dark:text-slate-400]="activeCategory() !== 'all'"
            class="px-3.5 py-2 min-h-[44px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center"
          >
            {{ i18n.t().contributions.filterAll }} ({{ data.contributions.length }})
          </button>
          <button
            type="button"
            (click)="activeCategory.set('flutter')"
            [class.bg-indigo-600]="activeCategory() === 'flutter'"
            [class.text-white]="activeCategory() === 'flutter'"
            [class.text-slate-600]="activeCategory() !== 'flutter'"
            [class.dark:text-slate-400]="activeCategory() !== 'flutter'"
            class="px-3.5 py-2 min-h-[44px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center"
          >
            {{ i18n.t().contributions.filterFlutter }}
          </button>
          <button
            type="button"
            (click)="activeCategory.set('community')"
            [class.bg-indigo-600]="activeCategory() === 'community'"
            [class.text-white]="activeCategory() === 'community'"
            [class.text-slate-600]="activeCategory() !== 'community'"
            [class.dark:text-slate-400]="activeCategory() !== 'community'"
            class="px-3.5 py-2 min-h-[44px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono flex items-center"
          >
            {{ i18n.t().contributions.filterCommunity }}
          </button>
        </div>

        <!-- Contributions Cards Grid (1 col on mobile, 2 cols on tablet & desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          @for (item of filteredContributions(); track item.id; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 70"
              class="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <!-- Top metadata: Type badge + Status badge -->
                <div class="flex items-center justify-between mb-3.5 gap-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <span
                      class="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold"
                      [class.bg-sky-50]="item.category === 'flutter'"
                      [class.dark:bg-sky-500/10]="item.category === 'flutter'"
                      [class.border]="true"
                      [class.border-sky-200]="item.category === 'flutter'"
                      [class.dark:border-sky-500/20]="item.category === 'flutter'"
                      [class.text-sky-700]="item.category === 'flutter'"
                      [class.dark:text-sky-300]="item.category === 'flutter'"
                      [class.bg-purple-50]="item.category === 'community'"
                      [class.dark:bg-purple-500/10]="item.category === 'community'"
                      [class.border-purple-200]="item.category === 'community'"
                      [class.dark:border-purple-500/20]="item.category === 'community'"
                      [class.text-purple-700]="item.category === 'community'"
                      [class.dark:text-purple-300]="item.category === 'community'"
                    >
                      {{ item.repository }}
                    </span>
                  </div>

                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider"
                    [class.bg-emerald-50]="item.status === 'Merged'"
                    [class.dark:bg-emerald-500/10]="item.status === 'Merged'"
                    [class.border]="true"
                    [class.border-emerald-200]="item.status === 'Merged'"
                    [class.dark:border-emerald-500/30]="item.status === 'Merged'"
                    [class.text-emerald-700]="item.status === 'Merged'"
                    [class.dark:text-emerald-400]="item.status === 'Merged'"
                    [class.bg-sky-50]="item.status === 'Resolved / Solution Provided'"
                    [class.dark:bg-sky-500/10]="item.status === 'Resolved / Solution Provided'"
                    [class.border-sky-200]="item.status === 'Resolved / Solution Provided'"
                    [class.dark:border-sky-500/30]="item.status === 'Resolved / Solution Provided'"
                    [class.text-sky-700]="item.status === 'Resolved / Solution Provided'"
                    [class.dark:text-sky-400]="item.status === 'Resolved / Solution Provided'"
                    [class.bg-slate-100]="item.status === 'Open'"
                    [class.dark:bg-slate-800]="item.status === 'Open'"
                    [class.border-slate-200]="item.status === 'Open'"
                    [class.dark:border-slate-700]="item.status === 'Open'"
                    [class.text-slate-600]="item.status === 'Open'"
                    [class.dark:text-slate-300]="item.status === 'Open'"
                  >
                    {{ item.status }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {{ item.title }}
                </h3>

                <!-- Bilingual Description -->
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {{ i18n.lang() === 'vi' ? item.descriptionVi : item.descriptionEn }}
                </p>
              </div>

              <!-- Technical reference and link snippet -->
              <div class="pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 flex-wrap gap-2">
                <span class="text-indigo-600 dark:text-indigo-400 text-[11px] truncate">{{ item.referenceNumber }}</span>
                <a
                  [href]="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors min-h-[36px] py-1 cursor-pointer shrink-0"
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

  readonly filteredContributions = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.data.contributions;
    }
    return this.data.contributions.filter(c => c.category === cat);
  });
}
