
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,AboutComponent,HeaderComponent,HeroComponent,SkillsComponent,ExperienceComponent,FooterComponent,ProjectsComponent,ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioContainer') portfolioContainer!: ElementRef;
  @ViewChild('backgroundCanvas') backgroundCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cursor') cursor!: ElementRef;
  title = 'portfolio';


    // Animation properties
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    particles: Particle[] = [];
    mouse = { x: 0, y: 0, radius: 100 };
    mouseMoved = false;
    animationFrameId: number = 0;


  constructor() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    // Initialize any app-wide settings here
  }

  ngAfterViewInit(): void {
    // Setup scrolling animations
    gsap.utils.toArray('section').forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 }, 
        {
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    this.setupCustomCursor();
    this.initBackgroundCanvas();
    this.initAnimations();
    this.initScrollAnimations();
  }























  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Update mouse position for animations
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.mouseMoved = true;

    // Update custom cursor position
    gsap.to(this.cursor.nativeElement, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.1
    });
  }

  @HostListener('window:resize')
  onResize() {
    // Handle resize events for responsive animations
    this.resizeCanvas();
  }

  setupCustomCursor() {
    // Hide default cursor and set up custom animated cursor
    document.body.style.cursor = 'none';
    
    // Initialize cursor position
    gsap.set(this.cursor.nativeElement, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    // Add event listeners for cursor effects
    const links = document.querySelectorAll('a, button, .project-card, .skill-item');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(this.cursor.nativeElement.querySelector('.cursor-outline'), {
          scale: 1.5,
          opacity: 0.4,
          duration: 0.3
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(this.cursor.nativeElement.querySelector('.cursor-outline'), {
          scale: 1,
          opacity: 1,
          duration: 0.3
        });
      });
    });
  }

  initBackgroundCanvas() {
    this.canvas = this.backgroundCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();
    this.animateParticles();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Recreate particles on resize
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const particleCount = Math.floor(window.innerWidth * 0.1);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
        Math.random() * 2 + 1,
        this.getRandomColor()
      ));
    }
  }


  getRandomColor() {
    //const colors = ['#4a89dc', '#5d9cec', '#48cfad', '#a0d468', '#ffce54', '#fc6e51', '#ed5565', '#ac92ec'];
    // const colors = [
    //   '#ff005e', // Vivid Pink
    //   '#00ffd0', // Aqua Neon
    //   '#fffd38', // Bright Yellow
    //   '#00b3ff', // Electric Blue
    //   '#ff6b00', // Bright Orange
    //   '#39ff14', // Neon Green
    //   '#da00ff', // Vivid Purple
    //   '#ff007f'  // Hot Pink
    // ];

    // const colors = [
    //   '#39FF14', // Neon Green
    //   '#00FFFF', // Cyan / Neon Blue
    //   '#FF6EC7', // Neon Pink
    //   '#FFFF33', // Neon Yellow
    //   '#FF3131', // Neon Red
    //   '#FF00FF', // Fuchsia
    //   '#00FFEF', // Electric Aqua
    //   '#CCFF00'  // Acid Lime
    // ];

    const colors: string[] = [];
    for (let i = 0; i < 10; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      colors.push(color);
    }
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animateParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      // Move particles
      particle.update(this.mouse, this.canvas);
      
      // Draw particles
      particle.draw(this.ctx);
      
      // Connect particles that are close to each other
      this.connectParticles(particle, i);
    }
    
    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }

  connectParticles(currentParticle: Particle, currentIndex: number) {
    for (let j = currentIndex + 1; j < this.particles.length; j++) {
      const particle = this.particles[j];
      const distance = Math.hypot(currentParticle.x - particle.x, currentParticle.y - particle.y);
      
      if (distance < 100) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = currentParticle.color;
        this.ctx.globalAlpha = 1 - (distance / 100);
        this.ctx.lineWidth = 0.5;
        this.ctx.moveTo(currentParticle.x, currentParticle.y);
        this.ctx.lineTo(particle.x, particle.y);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  initAnimations() {
    const tl = gsap.timeline();
    tl.from(".nav-link", {
      y: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
    
    

    // Animate the cursor dot continuously
    gsap.to(this.cursor.nativeElement.querySelector('.cursor-dot'), {
      scale: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }

  initScrollAnimations() {
    // Section title animations
    const sectionTitles:any = [
      // this.aboutTitle.nativeElement,
      // this.experienceTitle.nativeElement,
      // this.skillsTitle.nativeElement,
      // this.projectsTitle.nativeElement,
      // this.contactTitle.nativeElement
    ];
    
    sectionTitles.forEach((title:any) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      // Animate section underline
      gsap.from(title.nextElementSibling, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        width: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    });
    
  
  
    
   
    
    // Skills animations
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%", 
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      onComplete: () => {
        // Animate skill progress bars
        gsap.to(".skill-progress", {
          width: function(index, target) {
            return target.getAttribute('style')?.replace('width: ', '').replace('%;', '') || "0%";
          },
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.05
        });
      }
    });
    
  
    
    // Project cards animation
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
        toggleActions: "play none none none" 
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
    

 
  }

  // Event handlers
  onLinkHover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    gsap.to(target, {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Make cursor larger on hover
    gsap.to(this.cursor.nativeElement.querySelector('.cursor-outline'), {
      scale: 1.5,
      opacity: 0.4,
      duration: 0.3
    });
  }
  
  onLinkLeave(event: MouseEvent) {
    const target = event.target as HTMLElement;
    gsap.to(target, {
      y: 0,
      duration: 0.3,
      ease: "power2.out" 
    });
    
    // Reset cursor size
    gsap.to(this.cursor.nativeElement.querySelector('.cursor-outline'), {
      scale: 1,
      opacity: 1,
      duration: 0.3
    });
  }
  
  onSkillHover(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      y: -10,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out" 
    });
  }
  
  onSkillLeave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      y: 0,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  }
  
  onProjectHover(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.project-overlay') as HTMLElement;
    
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(target, {
      y: -10,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  }
  
  onProjectLeave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.project-overlay') as HTMLElement;
    
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(target, {
      y: 0,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      duration: 0.3, 
      ease: "power2.out"
    });
  }
  
  filterProjects(category: string) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
      if ((btn as HTMLElement).getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Filter projects
    projectCards.forEach(card => {
      if (category === 'all' || (card as HTMLElement).getAttribute('data-category') === category) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          display: 'block',
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            (card as HTMLElement).style.display = 'none';
          }
        });
      }
    });
  }
  

  ngOnDestroy() {
    // Clean up animations and event listeners
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Kill all GSAP animations
    gsap.killTweensOf("*");
    
    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

// Particle class for background animation
class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  
  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = x;
    this.baseY = y;
    this.density = (Math.random() * 30) + 1;
    this.color = color;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  
  update(mouse: { x: number, y: number, radius: number }, canvas: HTMLCanvasElement) {
    // Check if particle is close to mouse
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    
    // Max distance, past which the force is zero
    const maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    
    // If we go below zero, set it to zero
    if (force < 0) force = 0;
    
    // Movement based on mouse position
    const directionX = (forceDirectionX * force * this.density);
    const directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Move particles back to their original position
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
    
    // Boundary check - keep particles inside canvas
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;
    if (this.y < 0) this.y = 0;
    if (this.y > canvas.height) this.y = canvas.height;
  }




}
