
import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  standalone: true,
  selector: '[appMouseFollow]'
})
export class MouseFollowDirective implements OnInit, OnDestroy {
  private mouseMoveListener: Function | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (event) => {
        gsap.to(this.el.nativeElement, {
          duration: 0.8,
          x: event.clientX,
          y: event.clientY,
          ease: 'power3.out'
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}
