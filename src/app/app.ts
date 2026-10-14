import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from './header';
import { Hero } from './hero';
import { Packages } from './packages';
import { Architecture } from './architecture';
import { Contributions } from './contributions';
import { Contact } from './contact';
import { Footer } from './footer';
import { MobileNav } from './mobile-nav';
import { Theme } from './theme';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Packages,
    Architecture,
    Contributions,
    Contact,
    Footer,
    MobileNav,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#f8fafc] dark:bg-[#090b10] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 dark:selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-100 relative">
      <!-- Global tech grid background layer -->
      <div class="fixed inset-0 bg-tech-grid pointer-events-none z-0"></div>
      
      <!-- Top ambient aurora lighting -->
      <div class="fixed top-0 left-0 right-0 h-[600px] hero-glow pointer-events-none z-0"></div>

      <!-- Main Layout -->
      <div class="relative z-10 flex flex-col min-h-screen">
        <app-header></app-header>
        <main class="flex-1">
          <app-hero></app-hero>
          <app-packages></app-packages>
          <app-architecture></app-architecture>
          <app-contributions></app-contributions>
          <app-contact></app-contact>
        </main>
        <app-footer></app-footer>
        <app-mobile-nav></app-mobile-nav>
      </div>
    </div>
  `
})
export class App {
  // Ensure Theme service is initialized
  readonly theme = inject(Theme);
}
