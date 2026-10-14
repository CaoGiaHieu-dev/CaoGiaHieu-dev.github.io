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
    <section id="contact" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.06] relative scroll-mt-20 transition-colors duration-300">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div appScrollReveal class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div class="flex items-center justify-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
            <span class="font-semibold uppercase tracking-wider">{{ i18n.t().contact.kicker }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ i18n.t().contact.title }}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ i18n.t().contact.subtitle }}
          </p>
        </div>

        <!-- Main Spotlight: Official Gmail Card -->
        <div
          appScrollReveal
          [delay]="100"
          class="rounded-2xl glass-card border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-sm hover:border-sky-500/40 dark:hover:border-sky-400/30 transition-all mb-6 sm:mb-8"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400">
                <mat-icon class="text-sm leading-none">mail</mat-icon>
                <span class="font-semibold uppercase tracking-wider">{{ i18n.t().contact.primaryEmail }}</span>
              </div>
              <div class="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-slate-900 dark:text-white select-all break-all sm:break-normal tracking-tight">
                {{ data.profile.email }}
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {{ i18n.t().contact.availableNote }}
              </p>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                (click)="copyEmail()"
                class="px-5 py-3 min-h-[46px] rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.08] text-slate-800 dark:text-white text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">
                  {{ emailCopied() ? 'check' : 'content_copy' }}
                </mat-icon>
                <span>{{ emailCopied() ? i18n.t().contact.copied : i18n.t().contact.copyEmail }}</span>
              </button>

              <a
                [href]="'mailto:' + data.profile.email"
                class="px-5 py-3 min-h-[46px] rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold font-mono shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-center cursor-pointer active:scale-95"
              >
                <mat-icon class="text-sm leading-none">send</mat-icon>
                <span>{{ i18n.t().contact.openMail }}</span>
              </a>
            </div>

          </div>
        </div>

        <!-- 2 Supporting Channels: GitHub & Facebook (ONLY GitHub, Gmail, Facebook) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          
          <!-- Channel 1: GitHub -->
          <a
            appScrollReveal
            [delay]="140"
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/40 transition-all flex flex-col justify-between group min-h-[140px]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <mat-icon class="text-base leading-none">code</mat-icon>
                </div>
                <mat-icon class="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none">open_in_new</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1">GitHub</h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{{ i18n.t().contact.githubProfile }}</p>
            </div>
            <div class="text-xs font-mono text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 pt-3 border-t border-slate-100 dark:border-white/[0.06] truncate">
              github.com/CaoGiaHieu-dev
            </div>
          </a>

          <!-- Channel 2: Facebook (Display name: Cao Gia Hiếu) -->
          <a
            appScrollReveal
            [delay]="180"
            [href]="data.profile.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/40 transition-all flex flex-col justify-between group min-h-[140px]"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <mat-icon class="text-base leading-none">share</mat-icon>
                </div>
                <mat-icon class="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none">open_in_new</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1">Facebook</h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{{ i18n.t().contact.social }}</p>
            </div>
            <div class="text-xs font-mono text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 pt-3 border-t border-slate-100 dark:border-white/[0.06] truncate">
              Cao Gia Hiếu
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
