import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../shared/card/card/card.component';
@Component({
  selector: 'app-home',
  imports: [GalleriaModule, CardComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  images: any[] | undefined;

  ngOnInit() {
    this.images = [
      {
        itemImageSrc: './assets/product-1.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: './assets/product-2.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: './assets/product-3.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: './assets/product-4.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
    ];
  }
}
