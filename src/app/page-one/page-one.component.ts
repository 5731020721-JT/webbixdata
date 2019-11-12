import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../api.service';
import { Observable , pipe} from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {
  
  constructor(private api: ApiService) { }
  interval: any;
  public price00 = 0;
  public coupon = 0;
  public men = true;
  public userName = "Username";
  public UID = "00";
  public UID2 = "01";
  public image; 
  public churn;
  public upsale = [];
  public items = [];
  public itemID = ["706006","706052","706038","706025","706042","706001","706033","705177","706003","706048"];
  public itemIDW = ["706004","706044","706054","706042","705177","706013","706033","706029","706041","706011"];
  public itemprice = [];
  

  getItem(){
    this.api.getAllitem().subscribe((data) => { 
      this.items = data;
     // console.log("GETPRICE " + JSON.stringify(data))
      this.upsale = [];
      var count = 1;
      var upsale = 0;
      var lowestprice;
      this.itemprice = []
      if(this.men){
      //men iterms
      this.itemID.forEach(element => {
        lowestprice = 100000;
        this.items.forEach(element2 => {
          if(element2.item_id == element){
            if(element2.item_id == 706033){
              console.log(element2.retail_name + "   " + element2.price)
            }
            if((Number(lowestprice) >= Number(element2.price)) && (element2.price > 0)){
             
              lowestprice = element2.price;
              upsale = element2.upsale;
              
            }
          }
        });

        this.itemprice.push(lowestprice);
        this.upsale.push(upsale)
        
      }); 
      console.log(this.upsale)
    }else{

      //women item
      this.itemIDW.forEach(element => {
        lowestprice = 100000;
        this.items.forEach(element2 => {
          if(element2.item_id == element){
            if((lowestprice >= element2.price) && (element2.price > 0)){
              lowestprice = element2.price;
              upsale = element2.upsale;
            }
            
          }
        });

        this.itemprice.push(lowestprice);
        this.upsale.push(upsale)
        
      }); 
      console.log(this.itemprice)
    }
  if(this.UID != this.UID2){
    this.GetMonth(this.image)
    this.UID2 = this.UID
    console.log('1212312121')
   }   //  alert(JSON.stringify(this.itemprice));
     });

  }

 
  GetMonth(URL){
      this.api.getMonth(URL).subscribe((data) => {
           this.price00 = data.round_500;
           this.coupon = data.coupon;
      })
  }

  ngOnInit() {
    
  this.interval = setInterval(() => {
        this.api.getAlluser().subscribe(async (data) => { 
          console.log(data)
          this.UID = data[0].id
          this.userName = data[0].firstname;
          this.image = data[0].image;
         // this.GetMonth(this.image);
          this.churn = data[0].churn;
          if(data[0].gender == "male"){
              this.men = await true;
             console.log('Gender : ' + data[0].gender)
             await this.getItem();
          }else{
              this.men = await false;
            console.log('Gender : ' + data[0].gender)
             await this.getItem();
          }
          console.log(this.churn);
         });
         
    }, 3000);
    
  }

  

  
}

