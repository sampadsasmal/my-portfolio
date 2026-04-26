import { Component, ElementRef, HostListener, ViewChild, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tiltCard') tiltCard!: ElementRef;
  
  private mouseMoveListener?: () => void;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Run mouse tracking outside Angular to avoid lag
    this.ngZone.runOutsideAngular(() => {
      this.mouseMoveListener = () => {
        const card = this.tiltCard?.nativeElement;
        if (!card) return;

        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((x - centerX) / centerX) * 10;
          const rotateX = ((centerY - y) / centerY) * 10;
          
          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
      };
      this.mouseMoveListener();
    });
  }

  ngOnDestroy() {
    // Listener is attached to DOM element directly, 
    // it will be garbage collected with the element.
  }
}
