import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../api.service';
import { Observable , pipe} from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { e } from '@angular/core/src/render3';
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
  public userName = "Username";
  public image = "https://oneteamblob.blob.core.windows.net/profilepicture/1564569225802.png"; 
  public churn;
  public items = [];
  public itemID = ["1001052","1701063","1901012","2101572","3701164","4101062","4102038","4104376","4105003","5604004","7602156"];
  public itemprice = [];

  getItem(){
    this.api.getAllitem().subscribe((data) => { 
      this.items = data;
      var count = 1;
      var lowestprice;
      this.itemID.forEach(element => {
        lowestprice = 100000;
        this.items.forEach(element2 => {
          if(element2.item_id == element){
            if((lowestprice >= element2.price) && (element2.price > 0)){
              lowestprice = element2.price;
            }
          }
        });

        this.itemprice.push(lowestprice);
        
      });
      //  alert(JSON.stringify(this.itemprice));
     });
  }
  ngOnInit() {
    this.getItem();
  this.interval = setInterval(() => {
        this.api.getAlluser().subscribe((data) => { 
          console.log(data)
          this.userName = data[0].firstname;
          this.image = data[0].image;
          this.churn = data[0].churn;
          console.log(this.churn);
         });
    }, 3000);
  }

  
}

