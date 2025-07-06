import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timelineSlider') timelineSlider!: ElementRef;
  @ViewChild('timelineDates') timelineDates!: ElementRef;
  @ViewChild('datesWrapper') datesWrapper!: ElementRef;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;

  experiences= [
    {
      designation: 'Associate Senior Software Engineer',
      company: 'Jocata(BillDesk)',
      startDate: 'Apr 2023',
      endDate: 'Present',
      description: 'Inprogress',
      skills: ['Angular', 'JS','TypeScript', 'CSS', 'SCSS', 'Java','Postgress','Oracle','Deployment','Git']
    },
    {
      designation: 'Associate Software Engineer',
      company: 'Jocata(BillDesk)',
      startDate: 'Apr 2022',
      endDate: 'Mar 2023',
      description: 'Inprogress.',
      skills: ['Angular', 'JS','TypeScript', 'CSS', 'SCSS', 'Java','Postgress','Oracle','Deployment','Git']
    },
    {
      designation: 'Software Engineer',
      company: 'Jocata(BillDesk)',
      startDate: 'Apr 2021',
      endDate: 'Mar 2022',
      description: 'Inprogress.',
      skills: ['Java','Spring Boot','Hibernate','ExtJS','Postgress','Oracle','Deployment','Git']
    },
    {
      designation: 'Software Engineer Trainee',
      company: 'Jocata(BillDesk)',
      startDate: 'Jan 2020',
      endDate: 'Mar 2021',
      description: 'Inprogress.',
      skills: ['Java','Spring Boot','Hibernate','ExtJS','Postgress','Oracle','Deployment','Git']
    }
  ];

  currentIndex = 0;
  private timeline: gsap.core.Timeline | null = null;
  private scrollTrigger: ScrollTrigger | null = null;

  constructor() { }

  ngOnInit(): void {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    // Small timeout to ensure DOM is ready
    setTimeout(() => {
      this.initTimeline();
      this.initAnimation();
    }, 50);
  }

  ngOnDestroy(): void {
    // Clean up GSAP animations
    if (this.timeline) {
      this.timeline.kill();
    }
    
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
    
    // Kill all GSAP animations and ScrollTriggers related to this component
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id?.includes('experience')) {
        trigger.kill();
      }
    });
  }

  initTimeline(): void {
    // Initialize the progress bar
    this.updateProgressBar();
    
    // Set initial positions
    this.updateTimelinePosition();
  }

  initAnimation(): void {
    // Entrance animation for the entire section
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 80%',
        id: 'experience-section'
      }
    });

    timeline
      .from('.section-designation', { 
        y: 30, 
        opacity: 0, 
        duration: 0.5 
      })
      .from('.timeline-progress-bar', { 
        scaleX: 0, 
        opacity: 0, 
        duration: 0.5 
      }, '-=0.2')
      .from('.date-marker', { 
        y: 20, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.5 
      }, '-=0.2')
      .from('.nav-arrow', { 
        x: (i) => i === 0 ? -20 : 20, 
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.1 
      }, '-=0.4')
      .from('.timeline-item.active .experience-card', { 
        y: 30, 
        opacity: 0, 
        duration: 0.6 
      }, '-=0.2');
  }

  navigateTimeline(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (direction === 'next' && this.currentIndex < this.experiences.length - 1) {
      this.currentIndex++;
    }

    this.updateTimelinePosition();
    this.animateCardTransition();
  }

  goToExperience(index: number): void {
    if (index !== this.currentIndex) {
      this.currentIndex = index;
      this.updateTimelinePosition();
      this.animateCardTransition();
    }
  }

  updateTimelinePosition(): void {
    if (!this.timelineSlider || !this.datesWrapper) return;
    
    // Animate content slider
    gsap.to(this.timelineSlider.nativeElement, {
      x: `-${this.currentIndex * 100}%`,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Update dates position (for centering the active date)
    const dateElements = this.datesWrapper.nativeElement.children;
    if (dateElements.length > 0) {
      const dateWidth = dateElements[0].offsetWidth;
      const containerWidth = this.timelineDates.nativeElement.offsetWidth;
      const targetPosition = (dateWidth * this.currentIndex) - (containerWidth / 2) + (dateWidth / 2);
      
      gsap.to(this.datesWrapper.nativeElement, {
        x: -Math.max(0, Math.min(targetPosition, this.datesWrapper.nativeElement.offsetWidth - containerWidth)),
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    // Update progress bar
    this.updateProgressBar();
  }

  updateProgressBar(): void {
    if (!this.timelineProgress) return;
    
    const progress = (this.currentIndex / (this.experiences.length - 1)) * 100;
    
    gsap.to(this.timelineProgress.nativeElement, {
      width: `${progress}%`,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  animateCardTransition(): void {
    const cards = document.querySelectorAll('.experience-card');
    
    // Animate out the previous card
    gsap.to(cards, {
      y: 20,
      opacity: 0.4,
      duration: 0.3
    });
    
    // Animate in the current card
    gsap.to(cards[this.currentIndex], {
      y: 0,
      opacity: 1,
      duration: 0.5,
      delay: 0.2
    });
  }
}