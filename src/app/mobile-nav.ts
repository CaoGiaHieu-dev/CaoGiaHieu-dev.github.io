import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Translation } from './translation';

@Component({
  selector: 'app-mobile-nav',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile Fixed Bottom Thumb-Navigation Anchor (Touch-First) -->
    <nav
      class="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090e]/95 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] pb-safe transition-all"
      aria-label="Mobile Navigation"
    >
      <div class="grid grid-cols-4 items-center h-16 px-2">
        
        <!-- Tab 1: Packages -->
        <a
          href="#packages"
          (click)="setActiveSection('packages')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-400 hover:text-white transition-colors group"
          [class.text-indigo-400]="activeSection() === 'packages'"
        >
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">extension</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.packages }}
          </span>
        </a>

        <!-- Tab 2: Monorepo -->
        <a
          href="#architecture"
          (click)="setActiveSection('architecture')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-400 hover:text-white transition-colors group"
          [class.text-indigo-400]="activeSection() === 'architecture'"
        >
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">account_tree</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.architecture }}
          </span>
        </a>

        <!-- Tab 3: Contributions -->
        <a
          href="#contributions"
          (click)="setActiveSection('contributions')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-400 hover:text-white transition-colors group"
          [class.text-indigo-400]="activeSection() === 'contributions'"
        >
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">commit</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.contributions }}
          </span>
        </a>

        <!-- Tab 4: Contact -->
        <a
          href="#contact"
          (click)="setActiveSection('contact')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-400 hover:text-white transition-colors group"
          [class.text-indigo-400]="activeSection() === 'contact'"
        >
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">mail</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.contact }}
          </span>
        </a>

      </div>
    </nav>
  `
})
export class MobileNav {
  readonly i18n = inject(Translation);
  readonly activeSection = signal<string>('packages');

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }
}
