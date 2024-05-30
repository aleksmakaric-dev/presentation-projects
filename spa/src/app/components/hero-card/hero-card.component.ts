import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { IHero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css',
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: IHero;
  @Output() private emittedDeletedHero: EventEmitter<number> =
    new EventEmitter();

  handleHeroDeletion(id: number): void {
    this.emittedDeletedHero.emit(id);
  }
}
