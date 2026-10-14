import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { ScrollRevealDirective } from './scroll-reveal';

@Component({
  selector: 'app-architecture',
  imports: [MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="architecture" class="py-16 sm:py-20 md:py-24 border-b border-slate-200/80 dark:border-white/[0.06] relative scroll-mt-20 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <!-- Section Header -->
        <div appScrollReveal class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
              <span class="font-semibold uppercase tracking-wider">{{ i18n.t().architecture.kicker }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              {{ data.monorepoArchitecture.name }}
            </h2>
            <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ i18n.lang() === 'vi' ? data.monorepoArchitecture.taglineVi : data.monorepoArchitecture.taglineEn }}
            </p>
          </div>

          <!-- Direct GitHub Link -->
          <a
            [href]="data.monorepoArchitecture.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.1] text-xs font-mono text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs cursor-pointer active:scale-95"
          >
            <mat-icon class="text-sm leading-none text-sky-600 dark:text-sky-400">code</mat-icon>
            <span>{{ i18n.t().architecture.viewRepo }}</span>
            <mat-icon class="text-xs leading-none text-slate-400">open_in_new</mat-icon>
          </a>
        </div>

        <!-- Architectural Badges Strip -->
        <div appScrollReveal [delay]="60" class="flex flex-wrap gap-2 mb-10">
          <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 font-medium flex items-center gap-1.5">
            <mat-icon class="text-xs leading-none">account_tree</mat-icon>
            Dart Pub Workspaces (Native)
          </span>
          <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-medium flex items-center gap-1.5">
            <mat-icon class="text-xs leading-none">layers</mat-icon>
            Dual State: MVVM + Provider & BLoC
          </span>
          <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium flex items-center gap-1.5">
            <mat-icon class="text-xs leading-none">verified</mat-icon>
            Pure Dart Domain (0 Dependencies)
          </span>
          <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium flex items-center gap-1.5">
            <mat-icon class="text-xs leading-none">memory</mat-icon>
            Android 15 (16KB Page Size Ready)
          </span>
          <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-medium flex items-center gap-1.5">
            <mat-icon class="text-xs leading-none">smart_toy</mat-icon>
            Gemini AI Code Review Tooling
          </span>
        </div>

        <!-- 4 Architectural Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          @for (pillar of pillars(); track pillar.title; let i = $index) {
            <div
              appScrollReveal
              [delay]="i * 70"
              class="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#0e1118] border border-slate-200/90 dark:border-white/[0.08] shadow-xs hover:border-sky-500/50 dark:hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <mat-icon class="text-lg leading-none">{{ pillar.icon }}</mat-icon>
                  </div>
                  <span class="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    0{{ i + 1 }}
                  </span>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {{ pillar.title }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {{ pillar.detail }}
                </p>
              </div>
            </div>
          }
        </div>

        <!-- Interactive Architecture Deep-Dive View -->
        <div appScrollReveal [delay]="140" class="rounded-2xl bg-[#090b10] border border-slate-800 dark:border-white/[0.12] overflow-hidden shadow-2xl">
          
          <!-- Tab Navigation Bar -->
          <div class="px-4 py-3 bg-[#11141c] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              <span class="ml-2 font-bold text-slate-300">{{ data.monorepoArchitecture.name }}</span>
            </div>

            <!-- View Modes -->
            <div class="flex items-center gap-1 bg-[#090b10] p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                (click)="activeView.set('layers')"
                [class]="'px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5 ' + tabBtnClass('layers')"
              >
                <mat-icon class="text-xs leading-none">layers</mat-icon>
                <span>{{ i18n.t().architecture.tabLayers }}</span>
              </button>

              <button
                type="button"
                (click)="activeView.set('tree')"
                [class]="'px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5 ' + tabBtnClass('tree')"
              >
                <mat-icon class="text-xs leading-none">folder_open</mat-icon>
                <span>{{ i18n.t().architecture.tabTree }}</span>
              </button>

              <button
                type="button"
                (click)="activeView.set('tools')"
                [class]="'px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5 ' + tabBtnClass('tools')"
              >
                <mat-icon class="text-xs leading-none">build</mat-icon>
                <span>{{ i18n.t().architecture.tabTools }}</span>
              </button>
            </div>
          </div>

          <!-- Tab Content 1: 5-Tier C4 Architecture Layer Cards -->
          @if (activeView() === 'layers') {
            <div class="p-5 sm:p-6 space-y-4 bg-[#08090d]">
              <div class="text-xs font-mono text-slate-400 mb-4 flex items-center justify-between">
                <span>{{ i18n.t().architecture.layersHeading }}</span>
                <span class="text-sky-400 font-semibold">Strict Unidirectional Dependency Rules</span>
              </div>

              <div class="space-y-3">
                @for (layer of data.monorepoArchitecture.layers; track layer.name; let idx = $index) {
                  <div class="p-4 rounded-xl bg-[#0f121a] border border-slate-800/90 hover:border-slate-700 transition-colors">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div class="flex items-center gap-2">
                        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                          {{ layer.badge }}
                        </span>
                        <h4 class="text-sm font-bold text-white font-mono">{{ layer.name }}</h4>
                      </div>
                      <span class="text-xs text-slate-400 font-medium">
                        {{ i18n.lang() === 'vi' ? layer.roleVi : layer.roleEn }}
                      </span>
                    </div>

                    <p class="text-xs text-slate-300 leading-relaxed mb-3">
                      {{ i18n.lang() === 'vi' ? layer.detailsVi : layer.detailsEn }}
                    </p>

                    <div class="flex flex-wrap gap-1.5">
                      @for (pkg of layer.packages; track pkg) {
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161b26] text-slate-300 border border-slate-800">
                          {{ pkg }}
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tab Content 2: Physical Folder Structure Tree -->
          @if (activeView() === 'tree') {
            <div class="p-5 sm:p-6 font-mono text-[11px] sm:text-xs text-sky-200 overflow-x-auto touch-scroll bg-[#08090d] leading-relaxed">
              <div class="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
                <span>{{ i18n.t().architecture.treeHeading }}</span>
                <span class="text-slate-500">pubspec.yaml (workspace: [...])</span>
              </div>
              <pre class="whitespace-pre"><code>{{ data.monorepoArchitecture.structureTree }}</code></pre>
            </div>
          }

          <!-- Tab Content 3: Developer CLI Automation Suite -->
          @if (activeView() === 'tools') {
            <div class="p-5 sm:p-6 space-y-4 bg-[#08090d]">
              <div class="text-xs font-mono text-slate-400 mb-4 flex items-center justify-between">
                <span>{{ i18n.t().architecture.toolsHeading }}</span>
                <span class="text-emerald-400 font-semibold">Ready for Dart CLI</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (tool of data.monorepoArchitecture.tools; track tool.name) {
                  <div class="p-4 rounded-xl bg-[#0f121a] border border-slate-800/90 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-white font-mono">{{ tool.name }}</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {{ tool.tag }}
                        </span>
                      </div>
                      <p class="text-xs text-slate-300 leading-relaxed mb-3">
                        {{ i18n.lang() === 'vi' ? tool.descVi : tool.descEn }}
                      </p>
                    </div>

                    <div class="p-2 rounded-lg bg-[#090b10] border border-slate-800 text-[11px] font-mono text-sky-300 select-all truncate">
                      <code>{{ tool.command }}</code>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class Architecture {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly activeView = signal<'layers' | 'tree' | 'tools'>('layers');

  readonly pillars = computed(() => [
    {
      title: this.i18n.t().architecture.pillar1Title,
      detail: this.i18n.t().architecture.pillar1Detail,
      icon: 'account_tree'
    },
    {
      title: this.i18n.t().architecture.pillar2Title,
      detail: this.i18n.t().architecture.pillar2Detail,
      icon: 'layers'
    },
    {
      title: this.i18n.t().architecture.pillar3Title,
      detail: this.i18n.t().architecture.pillar3Detail,
      icon: 'hub'
    },
    {
      title: this.i18n.t().architecture.pillar4Title,
      detail: this.i18n.t().architecture.pillar4Detail,
      icon: 'verified_user'
    }
  ]);

  tabBtnClass(view: 'layers' | 'tree' | 'tools'): string {
    return this.activeView() === view
      ? 'bg-sky-500/25 text-sky-300 border border-sky-500/30 font-semibold'
      : 'text-slate-400 hover:text-slate-200 border border-transparent';
  }
}
