import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  text = 'S.i.t.a.k.a.n.t.a N.a.y.a.k';
  characters: string[] = [];

  ngOnInit() {
    this.characters = this.text.split('.');
  }
}
