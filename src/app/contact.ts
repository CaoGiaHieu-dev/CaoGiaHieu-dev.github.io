import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden bg-slate-50/50 dark:bg-[#07090e] scroll-mt-20 transition-colors duration-200">
      <!-- Subtle ambient lighting -->
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header with Scroll Reveal -->
        <div appScrollReveal class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div class="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ i18n.t().contact.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ i18n.t().contact.title }}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ i18n.t().contact.subtitle }}
          </p>
        </div>

        <!-- Main Spotlight: Prominent Official Email Card (Fully Responsive with Scroll Reveal) -->
        <div
          appScrollReveal
          [delay]="100"
          class="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-10 shadow-sm dark:shadow-2xl backdrop-blur-xl mb-6 sm:mb-8 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                <span class="text-slate-500 dark:text-slate-400 font-medium">{{ i18n.t().contact.primaryEmail }}</span>
              </div>
              <div class="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-slate-900 dark:text-white select-all break-all sm:break-normal tracking-tight">
                {{ data.profile.email }}
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ i18n.t().contact.availableNote }}
              </p>
            </div>

            <!-- Action buttons: Full-width stacked on mobile (<640px), horizontal on tablet/desktop -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                (click)="copyEmail()"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <mat-icon class="text-sm leading-none text-indigo-600 dark:text-indigo-400">
                  {{ emailCopied() ? 'check' : 'content_copy' }}
                </mat-icon>
                <span>{{ emailCopied() ? i18n.t().contact.copied : i18n.t().contact.copyEmail }}</span>
              </button>

              <a
                [href]="'mailto:' + data.profile.email"
                class="px-5 py-3 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <mat-icon class="text-sm leading-none">send</mat-icon>
                <span>{{ i18n.t().contact.openMail }}</span>
              </a>
            </div>

          </div>
        </div>

        <!-- 3 Supporting Verified Channel Cards (Grid 1 col on mobile, 3 cols on tablet/desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          
          <!-- Channel 1: GitHub Profile -->
          <a
            appScrollReveal
            [delay]="140"
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-indigo-400/50 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group min-h-[140px]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg leading-none">code</mat-icon>
                <mat-icon class="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none">arrow_outward</mat-icon>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">GitHub</h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ i18n.t().contact.githubProfile }}</p>
            </div>
            <div class="text-xs font-mono text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 pt-3 border-t border-slate-100 dark:border-slate-800/80 truncate">
              CaoGiaHieu-dev
            </div>
          </a>

          <!-- Channel 2: Official Pub.dev Author Page -->
          <a
            appScrollReveal
            [delay]="180"
            href="https://pub.dev/packages/http_security_pinning"
            target="_blank"
            rel="noopener noreferrer"
            class="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-indigo-400/50 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group min-h-[140px]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg leading-none">extension</mat-icon>
                <mat-icon class="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none">arrow_outward</mat-icon>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Pub.dev</h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Official Dart & Flutter Registry</p>
            </div>
            <div class="text-xs font-mono text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 pt-3 border-t border-slate-100 dark:border-slate-800/80 truncate">
              pub.dev/packages
            </div>
          </a>

          <!-- Channel 3: Official Facebook -->
          <a
            appScrollReveal
            [delay]="220"
            [href]="data.profile.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-indigo-400/50 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group min-h-[140px]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg leading-none">share</mat-icon>
                <mat-icon class="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none">arrow_outward</mat-icon>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Facebook</h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ i18n.t().contact.social }}</p>
            </div>
            <div class="text-xs font-mono text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 pt-3 border-t border-slate-100 dark:border-slate-800/80 truncate">
              fb.me/nhoklol.shjn
            </div>
          </a>

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
        setTimeout(() => this.emailCopied.set(false), 2000);
      });
    }
  }
}
