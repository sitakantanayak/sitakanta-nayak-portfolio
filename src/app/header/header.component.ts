
import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
