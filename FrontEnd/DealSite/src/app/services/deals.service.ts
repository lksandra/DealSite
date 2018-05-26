//this service component is the modus via which all the components communicate with each other or
//communciate with the backend.

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';


import {dealsApi} from './apiEndPoints';
import {Product} from '../data/product';
import { Subject } from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DealsService {

  productDetailViewSource = new Subject<Product>();
 productDetailView$ = this.productDetailViewSource.asObservable();

  constructor(private httpclient : HttpClient) { };

  

//to get all the availabel deasl from the backend.
  getAllDeals(): Observable<Product[]> {
   return this.httpclient.get<Product[]>(dealsApi.apiUrls.allDeals).pipe(
     tap((products)=>console.log('products fetched:\n', products)),
     catchError((err) : Observable<Product[]>=>{
      console.log('some error occured in fetching products:\n',err);
      return of([]);
     })
   )
 };

 
 
  
//to post a deal to the backend.
  postProductToBackend (product : Product): Observable<Product> {
    
    console.log(`postProductToBackend product:\n`, product);
    return this.httpclient.post<Product>(dealsApi.apiUrls.interestedProduct, product, httpOptions).pipe(
      tap((prod: Product) => console.log(`posted product: ${prod}`)),
      catchError((err): Observable<Product> => {
        console.log('some error occured in posting product to backend:\n', err);
        return of();

      })
    );
  };

  //to get most viewed deals from the backend
  getMostViewedDeals() : Observable<Product[]>{
    console.log(`getMostViewedDeals product:\n`);
    return this.httpclient.get<Product[]>(dealsApi.apiUrls.mostViewedDeals).pipe(
      tap((products)=>console.log('mostViewedProducts fetched:\n', products)),
      catchError((err) : Observable<Product[]>=>{
       console.log('some error occured in fetching mostViewedProducts:\n',err);
       return of([]);
      })
    )

  }

  //to upload a deal to the backend databse
  uploadDealsToDataBase(val : Object) : Observable<Object>{
    console.log("uploadDealsToDataBase val:\n", val);
    return this.httpclient.post<Object>(dealsApi.apiUrls.uploadDeals, val, httpOptions).pipe(

      tap((deals)=>console.log("uploadDealsToDatabase successfully posted:\n", deals)),
      catchError((err): Observable<Object> => {
        console.log('some error occured in posting product to backend:\n', err);
        return of();}
     )
    )
  }

  //to register the advertiser with the backend.
  registerAdvertiser(val: Object) : Observable<Object>{
    console.log("registerAdvertiser val:\n", val);
    return this.httpclient.post<Object>(dealsApi.apiUrls.registerAdvertiser, val, httpOptions).pipe(

      tap((adv)=>console.log("registerAdvertiser successfully posted:\n", adv)),
      catchError((err): Observable<Object> => {
        console.log('some error occured in registering Advertiser:\n', err);
        return of();}
     )
    )
  }

 




}
