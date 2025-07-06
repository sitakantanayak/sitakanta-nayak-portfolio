
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  
  contactInfo = [
    { icon: 'email', title: 'Email', value: 'sitakanta.litu@gmail.com' },
    { icon: 'phone', title: 'Phone', value: '+91-9777-611-606' },
    { icon: 'location', title: 'Location', value: 'Hyderabad, India' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      //subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from('.contact-info-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from('.contact-form-wrapper', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  submitForm(): void {
    this.isSubmitted = true;
    
    if (this.contactForm.valid) {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', this.contactForm.value);
      
      // Show success animation
      gsap.to('.form-success', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      // Reset form
      setTimeout(() => {
        this.contactForm.reset();
        this.isSubmitted = false;
        
        gsap.to('.form-success', {
          opacity: 0,
          y: -20,
          duration: 0.5
        });
      }, 3000);
    }
  }

  get formControls() {
    return this.contactForm.controls;
  }
}