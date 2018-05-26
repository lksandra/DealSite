//this module enables the advertiser/company to upload a deal to backend.
import { Component, OnInit, Injectable } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {DealsService} from '../services/deals.service';
import {Product} from '../data/product';

@Component({
  selector: 'app-deal-upload-form',
  templateUrl: './deal-upload-form.component.html',
  
  styleUrls: ['./deal-upload-form.component.css']
})
@Injectable()
export class DealUploadFormComponent implements OnInit {

  private dealForm: FormGroup;
   deal : Product;

  constructor(private formBuilder: FormBuilder, private dealsService : DealsService) { 
    
  }

  ngOnInit() {
    this.createModelForm();
   
  };

  createModelForm():void{
    this.dealForm = this.formBuilder.group({
      advertiserName: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      productDescription: [null, [Validators.required]],
      dealStartDate: [null, [Validators.required]],
      dealEndDate: [null, [Validators.required]],
      currency: ['USD', [Validators.required]],
      price: [null, [Validators.required]],
      discount: [null, [Validators.required, Validators.min(0)]],
      url: [null, [Validators.required]]
    });
  }

  onSubmit(){
    
    console.log('dealForm.value:\n',this.dealForm.value);
   // this.createDealFromUserInput();
    this.dealsService.uploadDealsToDataBase(this.dealForm.value).subscribe(
      (deel)=>{
        console.log(`deal-upload: deal: ${deel} successfully sent to backend`);
        this.dealForm.reset();
    },
      (err)=>{console.log('deal-upload: some error in postng product to backend:\n', err)}
    
    )
  }

 
}
