
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A fully responsive e-commerce platform with user authentication, product filtering, and payment integration.',
      image: 'assets/img/project1.jpg',
      category: 'Web App',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
      link: '#'
    },
    {
      title: 'Task Management Application',
      description: 'A real-time task management application with drag-and-drop functionality and team collaboration features.',
      image: 'assets/img/project2.jpg',
      category: 'Web App',
      technologies: ['React', 'Firebase', 'SCSS', 'Redux'],
      link: '#'
    },
    {
      title: 'Travel Blog',
      description: 'A responsive travel blog with CMS integration, image optimization, and interactive maps.',
      image: 'assets/img/project3.jpg',
      category: 'Website',
      technologies: ['Angular', 'Contentful', 'GSAP', 'Mapbox'],
      link: '#'
    },
    {
      title: 'Music Streaming Dashboard',
      description: 'An interactive dashboard for music analytics with real-time data visualization and audio playback.',
      image: 'assets/img/project4.jpg',
      category: 'Dashboard',
      technologies: ['Angular', 'D3.js', 'Web Audio API', 'Socket.io'],
      link: '#'
    }
  ];
  
  categories: string[] = ['All', 'Web App', 'Website', 'Dashboard'];
  activeCategory: string = 'All';
  hoveredProject: Project | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from('.project-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    setTimeout(() => {
      this.filterProjects(this.activeCategory);
    }, 2000);
  }

  filterProjects(category: string): void {
    this.activeCategory = category;
    // Animation for filtered items
    gsap.fromTo('.project-card', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5 }
    );
  }

  getFilteredProjects(): Project[] {
    if (this.activeCategory.toLowerCase() === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => 
      project.category.toLowerCase() === this.activeCategory.toLowerCase()
    );
  }

  setHoveredProject(project: Project | null): void {
    this.hoveredProject = project;
  }
}
