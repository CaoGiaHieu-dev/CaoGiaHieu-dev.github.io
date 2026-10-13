import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07090e]/90 border-b border-slate-800/80 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
        
        <!-- Zone 1: Brand Wordmark (Touch-friendly & Responsive) -->
        <a href="#" class="flex items-center gap-2.5 whitespace-nowrap shrink-0 group min-h-[44px]">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs font-mono group-hover:border-indigo-400/60 group-hover:bg-indigo-500/20 transition-all shadow-sm">
            GH
          </div>
          <span class="text-sm font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {{ data.profile.name }}
          </span>
        </a>

        <!-- Zone 2: Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-300 whitespace-nowrap">
          <a href="#packages" class="hover:text-white transition-colors py-2 px-1">
            {{ i18n.t().nav.packages }}
          </a>
          <a href="#architecture" class="hover:text-white transition-colors py-2 px-1">
            {{ i18n.t().nav.architecture }}
          </a>
          <a href="#contributions" class="hover:text-white transition-colors py-2 px-1">
            {{ i18n.t().nav.contributions }}
          </a>
          <a href="#contact" class="hover:text-white transition-colors py-2 px-1">
            {{ i18n.t().nav.contact }}
          </a>
        </nav>

        <!-- Zone 3: Language Switcher + GitHub & Pub.dev Links -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <!-- Segmented Language Switcher (Synced with Browser & LocalStorage) -->
          <div
            class="flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5 text-xs font-mono"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              (click)="i18n.setLang('vi')"
              [class.bg-indigo-600]="i18n.lang() === 'vi'"
              [class.text-white]="i18n.lang() === 'vi'"
              [class.font-bold]="i18n.lang() === 'vi'"
              [class.shadow-sm]="i18n.lang() === 'vi'"
              [class.text-slate-400]="i18n.lang() !== 'vi'"
              class="px-2.5 py-1.5 sm:py-1 min-h-[36px] sm:min-h-[32px] rounded-md transition-all cursor-pointer hover:text-white text-[11px] whitespace-nowrap flex items-center justify-center"
              title="Tiếng Việt (Đồng bộ với cài đặt trình duyệt)"
            >
              VI
            </button>
            <button
              type="button"
              (click)="i18n.setLang('en')"
              [class.bg-indigo-600]="i18n.lang() === 'en'"
              [class.text-white]="i18n.lang() === 'en'"
              [class.font-bold]="i18n.lang() === 'en'"
              [class.shadow-sm]="i18n.lang() === 'en'"
              [class.text-slate-400]="i18n.lang() !== 'en'"
              class="px-2.5 py-1.5 sm:py-1 min-h-[36px] sm:min-h-[32px] rounded-md transition-all cursor-pointer hover:text-white text-[11px] whitespace-nowrap flex items-center justify-center"
              title="English (Synced with browser settings)"
            >
              EN
            </button>
          </div>

          <!-- Pub.dev Link (Hidden on very small screens, visible on tablet & desktop) -->
          <a
            href="https://pub.dev/packages/http_security_pinning"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>pub.dev</span>
            <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
          </a>

          <!-- GitHub Link (Tablet & Desktop) -->
          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <mat-icon class="text-sm leading-none">code</mat-icon>
            <span>GitHub</span>
          </a>

          <!-- Mobile Hamburger Toggle (44x44px touch target) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="w-11 h-11 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 md:hidden transition-colors border border-transparent hover:border-slate-800"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="text-xl">{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-b border-slate-800 bg-[#07090e]/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 text-sm text-slate-300 shadow-2xl">
          <a
            (click)="closeMobileMenu()"
            href="#packages"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-400 text-lg">extension</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.packages }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#architecture"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-400 text-lg">account_tree</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.architecture }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#contributions"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-400 text-lg">commit</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.contributions }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#contact"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-400 text-lg">mail</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.contact }}</span>
          </a>

          <!-- External Links inside Mobile Menu -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <a
              href="https://pub.dev/packages/http_security_pinning"
              target="_blank"
              rel="noopener noreferrer"
              class="text-indigo-400 hover:underline flex items-center gap-1.5 py-1.5"
            >
              <mat-icon class="text-sm">extension</mat-icon>
              <span>pub.dev/packages</span>
            </a>
            <a
              [href]="data.profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white flex items-center gap-1.5 font-semibold py-1.5"
            >
              <mat-icon class="text-sm">code</mat-icon>
              <span>CaoGiaHieu-dev</span>
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class Header {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
