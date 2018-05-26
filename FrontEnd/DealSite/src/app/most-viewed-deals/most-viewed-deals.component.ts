//this module queries all the most viewed deals.

import { Component, OnInit, Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';


import {DealsService} from '../services/deals.service';
import {dealsApi} from '../services/apiEndPoints';
import {Product} from '../data/product';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-most-viewed-deals',
  templateUrl: './most-viewed-deals.component.html',
  styleUrls: ['./most-viewed-deals.component.css']
})
@Injectable()
export class MostViewedDealsComponent implements OnInit {

  
  mostViewedProducts : Product[];

  constructor(private dealService: DealsService) {
    

   }

  ngOnInit() {
    console.log('most-viewed-deails-comp ngOnInit running');
    this.getMostViewedDeals();
  };

  getMostViewedDeals() : void{
    this.dealService.getMostViewedDeals().subscribe(
      (productsFetched) => {
        console.log('products obtained in mostvieweddeals comp:\n', productsFetched);
        this.mostViewedProducts = productsFetched;
      },
      (err)=>{
        console.log('some error in fetching products from dealService to mostvieweddeals comp:\n', err);
      }
    )
  };

  sendProductToDetailView(mostViewedProduct: Product) : void{
    console.log('sendProductToDetailView executing');
    this.dealService.productDetailViewSource.next(mostViewedProduct);
  }




}
