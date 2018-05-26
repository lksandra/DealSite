//this component enables the company/advertiser to register with the backend.

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




import {DealsService} from '../services/deals.service';
import {Advertiser} from '../data/advertiser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-register-advertiser',
  templateUrl: './register-advertiser.component.html',
  styleUrls: ['./register-advertiser.component.css']
})
export class RegisterAdvertiserComponent implements OnInit {


  private advertiserRegistrationForm : FormGroup;
  registered: Subject<Boolean>;
  registered$: Observable<Boolean>;
  constructor(private dealsService: DealsService,
               private formBuilder: FormBuilder) { 
                 this.registered;
                 this.registered = new Subject<Boolean>();
                 this.registered$ = this.registered.asObservable();

  }

  ngOnInit() {
    this.createModelRegistrationForm();

  };

  private createModelRegistrationForm():void{
    this.advertiserRegistrationForm = this.formBuilder.group({
      advertiserName: [null, [Validators.required]],
      publisherId: []
    });
  }

  onRegistrationFormSubmit(){
    console.log('onRegistrationFormSubmit:\n', this.advertiserRegistrationForm.value);
    this.dealsService.registerAdvertiser(this.advertiserRegistrationForm.value).subscribe(
      (adv)=>{
        console.log(`adv-registration: adv: ${adv} successfully sent to backend`);
        this.advertiserRegistrationForm.reset();
        this.registered.next(true);
        
        
    },
      (err)=>{console.log('deal-upload: some error in postng product to backend:\n', err)}
    
    )
  };

  removeSuccessMsg(): void{
    console.log('oninput event generated');
    this.registered.next(false);
  }

}
