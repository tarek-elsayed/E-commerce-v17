import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IProducts } from '../../../core/intergaces/http';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass,ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) SmallCard: boolean = false;
  @Input() Products :IProducts[] = [];
  // @Input() bestProducts :IProducts[] = [];
  ngOnInit(): void {}
}
