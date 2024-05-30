import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { IHero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    HeroCardComponent,
    MatIconModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})
export class HeroListComponent implements OnInit {
  heroes: IHero[] = [];
  searchQuery: string = '';

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes(this.searchQuery)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  deleteHero(id: number): void {
    this.heroService.deleteHero(id).subscribe(() => this.getHeroes());
  }

  updateHero(id: number, name: string, power: string): void {
    const updatedHero = { name, power };
    this.heroService
      .updateHero(id, updatedHero)
      .subscribe(() => this.getHeroes());
  }

  searchHeroes(): void {
    this.getHeroes();
  }
}
