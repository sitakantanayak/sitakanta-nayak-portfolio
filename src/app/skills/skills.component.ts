
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit,AfterViewInit {
  skills: Skill[] = [
    { name: 'HTML5', level: 90, category: 'frontend' },
    { name: 'CSS3/SCSS', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'Angular', level: 90, category: 'frontend' },
    { name: 'React', level: 80, category: 'frontend' },
    { name: 'Java', level: 80, category: 'backend' },
    { name: 'Spring Boot', level: 80, category: 'backend' },
    { name: 'Hibernate', level: 80, category: 'backend' },
    { name: 'Oracle', level: 65, category: 'database' },
    { name: 'PostgreSQL', level: 70, category: 'database' },
    { name: 'GSAP', level: 80, category: 'animation' },
    { name: 'Git', level: 85, category: 'tools' }
  ];
  
  categories: string[] = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
  activeCategory: string = 'All';

  constructor() {}
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from('.skill-bar-fill', {
      width: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    setTimeout(() => {
      this.filterSkills(this.activeCategory);
    }, 2000);
  }

  filterSkills(category: string): void {
    this.activeCategory = category;
    // Animation for filtered items
    gsap.fromTo('.skill-item', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }
    );
  }

  getFilteredSkills(): Skill[] {
    if (this.activeCategory.toLowerCase() === 'all') {
      return this.skills;
    }
    return this.skills.filter(skill => 
      skill.category.toLowerCase() === this.activeCategory.toLowerCase()
    );
  }
}
