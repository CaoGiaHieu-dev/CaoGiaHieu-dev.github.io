import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      appScrollReveal
      class="bg-white/80 dark:bg-[#08090d]/90 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/[0.06] pt-14 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-12 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200/80 dark:border-white/[0.06]">
          
          <!-- Identity -->
          <div class="sm:col-span-2 space-y-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs font-mono shadow-xs">
                GH
              </div>
              <span class="text-sm font-bold text-slate-900 dark:text-white">{{ data.profile.name }}</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {{ i18n.t().footer.headline }}
            </p>
            <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <mat-icon class="text-xs leading-none">location_on</mat-icon>
              <span>{{ i18n.t().footer.locationNote }}</span>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div>
            <div class="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 mb-3">{{ i18n.t().footer.sectionsTitle }}</div>
            <ul class="space-y-2 font-mono">
              <li><a href="#packages" class="hover:text-slate-900 dark:hover:text-white transition-colors py-1 inline-block">{{ i18n.t().nav.packages }}</a></li>
              <li><a href="#architecture" class="hover:text-slate-900 dark:hover:text-white transition-colors py-1 inline-block">{{ i18n.t().nav.architecture }}</a></li>
              <li><a href="#contributions" class="hover:text-slate-900 dark:hover:text-white transition-colors py-1 inline-block">{{ i18n.t().nav.contributions }}</a></li>
              <li><a href="#contact" class="hover:text-slate-900 dark:hover:text-white transition-colors py-1 inline-block">{{ i18n.t().nav.contact }}</a></li>
            </ul>
          </div>

          <!-- Official Channels -->
          <div>
            <div class="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 mb-3">{{ i18n.t().footer.channelsTitle }}</div>
            <ul class="space-y-2 font-mono">
              <li>
                <a
                  [href]="data.profile.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                >
                  <mat-icon class="text-xs leading-none text-sky-500">code</mat-icon>
                  <span>github.com/CaoGiaHieu-dev</span>
                </a>
              </li>
              <li>
                <a
                  [href]="data.profile.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                >
                  <mat-icon class="text-xs leading-none text-indigo-500">share</mat-icon>
                  <span>Facebook (Cao Gia Hiếu)</span>
                </a>
              </li>
              <li>
                <a
                  href="/googled27880656dcb38a8.html"
                  target="_blank"
                  class="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-300 text-emerald-600 dark:text-emerald-400 transition-colors py-1"
                >
                  <mat-icon class="text-xs leading-none">verified</mat-icon>
                  <span>{{ i18n.t().footer.googleVerified }}</span>
                </a>
              </li>
              <li>
                <a
                  [href]="'mailto:' + data.profile.email"
                  class="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
                >
                  <mat-icon class="text-xs leading-none text-slate-400">email</mat-icon>
                  <span>{{ data.profile.email }}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; 2026 {{ data.profile.name }}. {{ i18n.t().footer.rights }}
          </div>
          <div>
            <a href="#" class="hover:text-slate-800 dark:hover:text-slate-300 py-1 inline-block">{{ i18n.t().footer.backToTop }}</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class Footer {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
}
