import { Component } from '@angular/core';
import { HeroComponent } from './hero';
import { AboutComponent } from './about';
import { ExperienceComponent } from './experience';
import { ProjectsComponent } from './projects';
import { ContactComponent } from './contact';
import { SectionSeparatorComponent } from '../shared/section-separator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    SectionSeparatorComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent { }
