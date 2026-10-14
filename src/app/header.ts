import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { Theme } from './theme';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#07090e]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2.5 sm:gap-6 md:gap-8">
        
        <!-- Zone 1: Brand Wordmark (Touch-friendly & Responsive down to 320px) -->
        <a href="#" class="flex items-center gap-2.5 whitespace-nowrap shrink-0 group min-h-[44px]">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-500/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-300 text-xs font-mono group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 transition-all shadow-sm">
            GH
          </div>
          <span class="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors max-w-[130px] xs:max-w-none truncate">
            {{ data.profile.name }}
          </span>
        </a>

        <!-- Zone 2: Desktop Navigation Links with Active Highlighting -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <a
            href="#packages"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-indigo-600]="activeSection() === 'packages'"
            [class.dark:text-indigo-400]="activeSection() === 'packages'"
            [class.font-semibold]="activeSection() === 'packages'"
          >
            {{ i18n.t().nav.packages }}
            @if (activeSection() === 'packages') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full"></span>
            }
          </a>
          <a
            href="#architecture"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-indigo-600]="activeSection() === 'architecture'"
            [class.dark:text-indigo-400]="activeSection() === 'architecture'"
            [class.font-semibold]="activeSection() === 'architecture'"
          >
            {{ i18n.t().nav.architecture }}
            @if (activeSection() === 'architecture') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full"></span>
            }
          </a>
          <a
            href="#contributions"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-indigo-600]="activeSection() === 'contributions'"
            [class.dark:text-indigo-400]="activeSection() === 'contributions'"
            [class.font-semibold]="activeSection() === 'contributions'"
          >
            {{ i18n.t().nav.contributions }}
            @if (activeSection() === 'contributions') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full"></span>
            }
          </a>
          <a
            href="#contact"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-indigo-600]="activeSection() === 'contact'"
            [class.dark:text-indigo-400]="activeSection() === 'contact'"
            [class.font-semibold]="activeSection() === 'contact'"
          >
            {{ i18n.t().nav.contact }}
            @if (activeSection() === 'contact') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-500 rounded-full"></span>
            }
          </a>
        </nav>

        <!-- Zone 3: Theme Toggle + Language Switcher + GitHub & Pub.dev Links -->
        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          <!-- Theme Toggle Button (Light / Dark) -->
          <button
            type="button"
            (click)="theme.toggle()"
            [title]="theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark"
            class="h-9 w-9 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 shadow-xs"
            [attr.aria-label]="theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark"
          >
            @if (theme.isDark()) {
              <mat-icon class="text-base text-amber-400 leading-none">light_mode</mat-icon>
            } @else {
              <mat-icon class="text-base text-indigo-600 leading-none">dark_mode</mat-icon>
            }
          </button>

          <!-- Segmented Language Switcher (Synced with Browser & LocalStorage) -->
          <div
            class="flex items-center rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-0.5 text-xs font-mono"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              (click)="i18n.setLang('vi')"
              [class.bg-indigo-600]="i18n.lang() === 'vi'"
              [class.text-white]="i18n.lang() === 'vi'"
              [class.font-bold]="i18n.lang() === 'vi'"
              [class.shadow-xs]="i18n.lang() === 'vi'"
              [class.text-slate-600]="i18n.lang() !== 'vi'"
              [class.dark:text-slate-400]="i18n.lang() !== 'vi'"
              class="px-2.5 py-1.5 sm:py-1 min-h-[36px] sm:min-h-[30px] rounded-md transition-all cursor-pointer hover:text-slate-900 dark:hover:text-white text-[11px] whitespace-nowrap flex items-center justify-center"
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
              [class.shadow-xs]="i18n.lang() === 'en'"
              [class.text-slate-600]="i18n.lang() !== 'en'"
              [class.dark:text-slate-400]="i18n.lang() !== 'en'"
              class="px-2.5 py-1.5 sm:py-1 min-h-[36px] sm:min-h-[30px] rounded-md transition-all cursor-pointer hover:text-slate-900 dark:hover:text-white text-[11px] whitespace-nowrap flex items-center justify-center"
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
            class="hidden sm:inline-flex px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>pub.dev</span>
            <mat-icon class="text-xs leading-none">open_in_new</mat-icon>
          </a>

          <!-- GitHub Link (Tablet & Desktop) -->
          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <mat-icon class="text-sm leading-none">code</mat-icon>
            <span>GitHub</span>
          </a>

          <!-- Mobile Hamburger Toggle (44x44px touch target) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 md:hidden transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="text-xl">{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#07090e]/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 text-sm text-slate-700 dark:text-slate-300 shadow-2xl transition-colors">
          <a
            (click)="closeMobileMenu()"
            href="#packages"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg">extension</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.packages }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#architecture"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg">account_tree</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.architecture }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#contributions"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg">commit</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.contributions }}</span>
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#contact"
            class="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <mat-icon class="text-indigo-600 dark:text-indigo-400 text-lg">mail</mat-icon>
            <span class="font-medium">{{ i18n.t().nav.contact }}</span>
          </a>

          <!-- Mobile Theme & External Links inside Dropdown -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
            <button
              type="button"
              (click)="theme.toggle()"
              class="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <mat-icon class="text-sm leading-none" [class.text-amber-400]="theme.isDark()" [class.text-indigo-600]="!theme.isDark()">
                {{ theme.isDark() ? 'light_mode' : 'dark_mode' }}
              </mat-icon>
              <span>{{ theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark }}</span>
            </button>
            <a
              [href]="data.profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 font-semibold py-1.5"
            >
              <mat-icon class="text-sm">code</mat-icon>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class Header implements OnDestroy {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly theme = inject(Theme);
  readonly mobileMenuOpen = signal(false);
  readonly activeSection = signal<string>('packages');

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.initSectionObserver();
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  private initSectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = ['packages', 'architecture', 'contributions', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
