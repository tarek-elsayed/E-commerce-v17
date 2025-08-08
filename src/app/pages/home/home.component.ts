import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../shared/card/card/card.component';
import { UserDataService } from '../../core/service/user-data.service';
import { IProducts } from '../../core/intergaces/http';
import { PopularPipe } from '../../core/pipe/popular.pipe';
@Component({
  selector: 'app-home',
  imports: [GalleriaModule, CardComponent,PopularPipe],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  images: any[] | undefined;
  smallProducts: IProducts[] = [];
  populartProducts: IProducts[] = [];

  constructor(private _userData: UserDataService) {}

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
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._userData.getAllProducts().subscribe((res:IProducts[]) => {
      this.smallProducts = res.slice(0,4);
      this.populartProducts = res;
      console.log(res);
    });
  }
}
