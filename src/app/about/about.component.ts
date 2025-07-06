
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  email = "sitakanta.litu@gmail.com";
  constructor() {}

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from('.about-img', {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from('.about-content', {
      x: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
}
