import { Component } from '@angular/core';
import { ParticleCanvasComponent } from '../shared/particle-canvas';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleCanvasComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {}
