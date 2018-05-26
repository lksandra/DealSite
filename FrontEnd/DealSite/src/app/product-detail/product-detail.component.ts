//this component populates the view template with product details for a given product deal.

import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Product } from '../data/product';


import {DealsService} from '../services/deals.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
@Injectable()
export class ProductDetailComponent implements OnInit {

  constructor(private dealService : DealsService ) { 
    
  }

  ngOnInit() {
    this.dealService.productDetailView$.subscribe(
      (pr)=>{
        console.log('product recvd in product detailView');
        this.product = pr;
        console.log(pr.url);
      },
      (err)=>console.log('some error in obtaining data to product detail view')
    );
  }

  closeDetailComponent() : void{
    this.product = null;
  };

  productInterested(product: Product) : void{
    console.log(`productInterested executing. product:\n`, product);
    this.dealService.postProductToBackend(product).subscribe(
      (pr)=>{console.log(`product-detail: product: ${product.name} successfully sent to backend`)},
      (err)=>{console.log('product-detail: some error in postng product to backend:\n', err)}
    );
  }


  product: Product;


  

}
