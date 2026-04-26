import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-particle-canvas',
  standalone: true,
  template: '<canvas #particleCanvas class="absolute inset-0"></canvas>',
  styles: [':host { display: block; position: absolute; inset: 0; z-index: 1; pointer-events: none; }']
})
export class ParticleCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private mouse = { x: 0, y: 0, active: false };
  private isBrowser: boolean;
  private particles: DataNode[] = [];
  private readonly COUNT = 800;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initCanvas();
        this.createParticles();
        this.animate();
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.initCanvas();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isBrowser) {
      // Convert to normalized coordinates (-1 to 1)
      this.mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
      this.mouse.active = true;
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < this.COUNT; i++) {
      this.particles.push(new DataNode(this.ctx));
    }
  }

  private animate = () => {
    // Semi-transparent clear for motion blur/tails
    this.ctx.fillStyle = 'rgba(2, 6, 23, 0.3)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    this.particles.forEach(p => {
      p.update(this.mouse);
      p.draw();
    });

    this.animationId = requestAnimationFrame(this.animate);
  }
}

class DataNode {
  private x: number;
  private y: number;
  private z: number;
  private pz: number;
  private color: string;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.x = (Math.random() - 0.5) * ctx.canvas.width * 2;
    this.y = (Math.random() - 0.5) * ctx.canvas.height * 2;
    this.z = Math.random() * ctx.canvas.width;
    this.pz = this.z;
    
    const colors = ['#60a5fa', '#34d399', '#a78bfa', '#f472b6'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouse: { x: number, y: number, active: boolean }) {
    // Warp speed!
    this.z -= 10;
    
    // Steering based on mouse
    if (mouse.active) {
      this.x -= mouse.x * 5;
      this.y -= mouse.y * 5;
    }

    if (this.z < 1) {
      this.z = this.ctx.canvas.width;
      this.x = (Math.random() - 0.5) * this.ctx.canvas.width * 2;
      this.y = (Math.random() - 0.5) * this.ctx.canvas.height * 2;
      this.pz = this.z;
    }
  }

  draw() {
    const cx = this.ctx.canvas.width / 2;
    const cy = this.ctx.canvas.height / 2;

    // Project 3D to 2D
    const sx = (this.x / this.z) * cx + cx;
    const sy = (this.y / this.z) * cy + cy;

    // Previous position for trail
    const psx = (this.x / this.pz) * cx + cx;
    const psy = (this.y / this.pz) * cy + cy;

    this.pz = this.z;

    const size = (1 - this.z / this.ctx.canvas.width) * 3;
    const opacity = (1 - this.z / this.ctx.canvas.width);

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.globalAlpha = opacity * 0.6;
    this.ctx.lineWidth = size;
    this.ctx.moveTo(psx, psy);
    this.ctx.lineTo(sx, sy);
    this.ctx.stroke();

    // Node head
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(sx, sy, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.globalAlpha = 1;
  }
}
