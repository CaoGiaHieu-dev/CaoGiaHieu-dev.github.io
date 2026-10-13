import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenSourceContribution, PortfolioData } from './portfolio-data';
import { Translation } from './translation';

@Component({
  selector: 'app-contributions',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contributions" class="py-16 sm:py-20 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#0a0e18] to-[#07090e] relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span class="text-indigo-400 font-semibold">{{ i18n.t().contributions.kicker }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {{ i18n.t().contributions.title }}
            </h2>
            <p class="mt-2 text-sm text-slate-400 leading-relaxed">
              {{ i18n.t().contributions.subtitle }}
            </p>
          </div>

          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-medium text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-sm"
          >
            <mat-icon class="text-sm leading-none text-indigo-400">code</mat-icon>
            <span>github.com/CaoGiaHieu-dev</span>
          </a>
        </div>

        <!-- Filter Tabs (Smooth horizontal touch-scrolling for phones, wrap for desktop) -->
        <div class="flex items-center overflow-x-auto no-scrollbar touch-scroll gap-2 p-1.5 bg-[#060910] border border-slate-800 rounded-xl mb-6 sm:mb-8 max-w-full">
          <button
            type="button"
            (click)="activeCategory.set('all')"
            [class.bg-indigo-600]="activeCategory() === 'all'"
            [class.text-white]="activeCategory() === 'all'"
            [class.text-slate-400]="activeCategory() !== 'all'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono"
          >
            {{ i18n.t().contributions.filterAll }} ({{ data.contributions.length }})
          </button>
          <button
            type="button"
            (click)="activeCategory.set('flutter')"
            [class.bg-indigo-600]="activeCategory() === 'flutter'"
            [class.text-white]="activeCategory() === 'flutter'"
            [class.text-slate-400]="activeCategory() !== 'flutter'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono"
          >
            {{ i18n.t().contributions.filterFlutter }}
          </button>
          <button
            type="button"
            (click)="activeCategory.set('community')"
            [class.bg-indigo-600]="activeCategory() === 'community'"
            [class.text-white]="activeCategory() === 'community'"
            [class.text-slate-400]="activeCategory() !== 'community'"
            class="px-3.5 py-2 min-h-[40px] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 text-xs font-mono"
          >
            {{ i18n.t().contributions.filterCommunity }}
          </button>
        </div>

        <!-- Filtered Grid (1 col on mobile/tablet, 2 cols on desktop) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          @for (item of filteredContributions(); track item.id) {
            <div class="p-5 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 flex flex-col justify-between hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-300">
              <div>
                <!-- Top metadata row -->
                <div class="flex items-start justify-between mb-3 gap-2 flex-wrap sm:flex-nowrap">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-mono font-bold text-indigo-400">{{ item.repository }}</span>
                    <span aria-hidden="true" class="text-slate-600">&middot;</span>
                    <span class="text-xs font-mono text-slate-400">{{ formatTypeLabel(item.type) }}</span>
                  </div>

                  <!-- Status label -->
                  <span
                    class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full shrink-0 border"
                    [class.text-emerald-400]="item.status === 'Merged'"
                    [class.bg-emerald-500/10]="item.status === 'Merged'"
                    [class.border-emerald-500/20]="item.status === 'Merged'"
                    [class.text-amber-400]="item.status === 'Open'"
                    [class.bg-amber-500/10]="item.status === 'Open'"
                    [class.border-amber-500/20]="item.status === 'Open'"
                    [class.text-sky-300]="item.status.includes('Resolved') || item.status === 'Documented'"
                    [class.bg-sky-500/10]="item.status.includes('Resolved') || item.status === 'Documented'"
                    [class.border-sky-500/20]="item.status.includes('Resolved') || item.status === 'Documented'"
                  >
                    {{ formatStatusLabel(item.status) }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xs sm:text-sm font-bold text-white mb-2 leading-snug font-mono break-words">
                  {{ item.title }}
                </h3>

                <!-- Bilingual Description -->
                <p class="text-xs text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  {{ i18n.lang() === 'vi' ? item.descriptionVi : item.descriptionEn }}
                </p>
              </div>

              <!-- Bottom Bar with View link -->
              <div class="pt-3.5 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span class="text-slate-400 font-mono text-[11px]">{{ item.referenceNumber }}</span>
                <a
                  [href]="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors min-h-[36px] px-1"
                >
                  <span>{{ i18n.t().contributions.viewLink }}</span>
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

  formatTypeLabel(type: string): string {
    if (type === 'pr') return this.i18n.t().contributions.typePr;
    if (type === 'issue') return this.i18n.t().contributions.typeIssue;
    return this.i18n.t().contributions.typeDiscussion;
  }

  formatStatusLabel(status: string): string {
    if (status === 'Merged') return this.i18n.t().contributions.statusMerged;
    if (status === 'Open') return this.i18n.t().contributions.statusOpen;
    return this.i18n.t().contributions.statusResolved;
  }
}
