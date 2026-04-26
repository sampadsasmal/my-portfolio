import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-separator',
  standalone: true,
  template: `
    <div class="relative w-full h-40 overflow-visible flex items-center justify-center pointer-events-none">
      
      <!-- Horizontal Base Line -->
      <div class="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      
      <!-- Kinetic HUD Center -->
      <div class="relative flex items-center justify-center">
        
        <!-- Rotating HUD Rings -->
        <div class="absolute w-20 h-20 border border-blue-500/30 rounded-2xl animate-[spin_10s_linear_infinite] rotate-45"></div>
        <div class="absolute w-14 h-14 border border-emerald-500/40 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
        
        <!-- Core Glowing Node -->
        <div class="relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] z-10"></div>
        <div class="absolute w-10 h-10 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>

        <!-- Meaningful Dynamic Labels -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span class="text-[10px] font-mono text-blue-400 font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            {{ label }}
          </span>
        </div>

        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span class="text-[9px] font-mono text-slate-500 font-bold tracking-widest uppercase opacity-60">
            {{ subLabel }}
          </span>
        </div>
      </div>

      <!-- Moving Data Pulse -->
      <div class="absolute left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[flow_4s_linear_infinite]"></div>
      <div class="absolute right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[flow_5s_linear_infinite_reverse]"></div>

    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    @keyframes flow {
      0% { transform: translateX(-150%); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(600%); opacity: 0; }
    }
  `]
})
export class SectionSeparatorComponent {
  @Input() label: string = 'SYSTEM_SYNC';
  @Input() subLabel: string = 'ESTABLISHING_LOGIC';
}
