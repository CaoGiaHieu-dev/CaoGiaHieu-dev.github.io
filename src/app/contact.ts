import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="py-16 sm:py-20 md:py-24 border-b border-slate-800/80 relative overflow-hidden bg-[#07090e]">
      <!-- Subtle ambient lighting -->
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div class="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <span class="text-indigo-400 font-semibold">{{ i18n.t().contact.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {{ i18n.t().contact.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-400 leading-relaxed">
            {{ i18n.t().contact.subtitle }}
          </p>
        </div>

        <!-- Main Spotlight: Prominent Official Email Card (Fully Responsive) -->
        <div class="rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-900/60 border border-slate-800 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl mb-6 sm:mb-8 hover:border-slate-700 transition-colors">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <span class="text-slate-400 font-medium">{{ i18n.t().contact.primaryEmail }}</span>
              </div>
              <div class="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-white select-all break-all sm:break-normal tracking-tight">
                {{ data.profile.email }}
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                {{ i18n.t().contact.availableNote }}
              </p>
            </div>

            <!-- Action buttons: Full-width stacked on mobile (<640px), horizontal on tablet/desktop -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                (click)="copyEmail()"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <mat-icon class="text-sm leading-none text-indigo-400">
                  {{ emailCopied() ? 'check' : 'content_copy' }}
                </mat-icon>
                <span>{{ emailCopied() ? i18n.t().contact.copied : i18n.t().contact.copyEmail }}</span>
              </button>

              <a
                [href]="'mailto:' + data.profile.email"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-center"
              >
                <mat-icon class="text-sm leading-none">send</mat-icon>
                <span>{{ i18n.t().contact.openMail }}</span>
              </a>
            </div>

          </div>
        </div>

        <!-- 3 Supporting Channel Cards (1 col mobile, 2 cols tablet, 3 cols desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          
          <!-- GitHub Card -->
          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all block group min-h-[80px]"
          >
            <div class="flex items-center justify-between mb-1.5 sm:mb-2">
              <div class="text-xs font-mono text-slate-400">{{ i18n.t().contact.githubProfile }}</div>
              <mat-icon class="text-xs leading-none text-slate-600 group-hover:text-indigo-400 transition-colors">open_in_new</mat-icon>
            </div>
            <div class="text-sm font-bold font-mono text-white group-hover:text-indigo-400 transition-colors truncate">
              &#64;{{ data.profile.handle }}
            </div>
          </a>

          <!-- Facebook Card -->
          <a
            [href]="data.profile.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all block group min-h-[80px]"
          >
            <div class="flex items-center justify-between mb-1.5 sm:mb-2">
              <div class="text-xs font-mono text-slate-400">{{ i18n.t().contact.social }}</div>
              <mat-icon class="text-xs leading-none text-slate-600 group-hover:text-indigo-400 transition-colors">open_in_new</mat-icon>
            </div>
            <div class="text-sm font-bold font-mono text-white group-hover:text-indigo-400 transition-colors truncate">
              facebook.com/hieu.shjn
            </div>
          </a>

          <!-- Location & Timezone Card -->
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between sm:col-span-2 lg:col-span-1 min-h-[80px]">
            <div class="text-xs font-mono text-slate-400 mb-1.5 sm:mb-2">{{ i18n.t().contact.timezone }}</div>
            <div class="text-sm font-semibold text-white">
              {{ i18n.lang() === 'vi' ? data.profile.location : data.profile.locationEn }}
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class Contact {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly emailCopied = signal(false);

  copyEmail(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.data.profile.email).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2500);
      });
    }
  }
}
