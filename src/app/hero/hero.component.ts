
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {


  @ViewChild('circle', { static: true }) circle!: ElementRef;
  @ViewChild('profileImage', { static: true }) profileImage!: ElementRef;
  @ViewChild('contentContainer', { static: true }) contentContainer!: ElementRef;
  @ViewChild('name', { static: true }) name!: ElementRef;
  @ViewChild('title', { static: true }) title!: ElementRef;
  @ViewChild('description', { static: true }) description!: ElementRef;
  @ViewChild('socialLinks', { static: true }) socialLinks!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.initAnimationSitakanta();
  }


  initAnimationSitakanta(): void {
    const tl = gsap.timeline();

    // tl.to(this.circle.nativeElement, {
    //   opacity: 1,
    //   scale: 1,
    //   duration: 1,
    //   ease: 'elastic.out(1, 0.3)'
    // });
    
    // tl.to(this.profileImage.nativeElement, {
    //   opacity: 1,
    //   duration: 1,
    //   delay: 0.2
    // }, '-=0.5');
    
    tl.fromTo('.hero-greeting', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
    )
    .fromTo('.hero-title span', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.cta-button', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );
    
    // Parallax effect for the hero background
    gsap.to('.hero-bg', {
      backgroundPosition: `50% ${window.innerHeight / 2}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
