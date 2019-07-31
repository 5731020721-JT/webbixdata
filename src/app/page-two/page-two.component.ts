import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { e } from '@angular/core/src/render3';
import { getViewData } from '@angular/core/src/render3/instructions';
import { Chart } from 'chart.js';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.css']
})
export class PageTwoComponent implements OnInit {
  // chart: Chart;
  interval: any;
  interval2: any;
  public userName;
  public image;
  public userID;  
  public churn;
  public total;  
  public Dtotal;
  public Gtotal;
  public basket = [];
  public pic = [];
  public pic2 = [];
  public OfItem;
  public items = [];
  public Offer = [];
  public lowestprice = [];
  public id = "";
  public date2 = [];
  public date = [];
  public data1 = [];
  public data2 = [];
  public data3 = [];
  public data4 = [];
  public data11= [];  
  public data22= [];  
  public data33= [];  
  public data44= [];  
  public busket2 = [];
  LineChart:any;
  constructor(private api: ApiService) { }
  ngOnInit() {

    // this.init();

    
    this.api.getPicture().subscribe((data) => { 
      console.log(data)
      this.pic = data;
     });
     this.api.getAllitem().subscribe((data) => { 
      this.items = data;
      // alert(data)
   }); 
    this.interval = setInterval(() => {
      this.api.getAlluser().subscribe((data) => { 
        console.log(data)
        this.userName = data[0].firstname;
        this.image = data[0].image;
        this.userID = data[0].id;
        this.churn = data[0].churn;
       });
  }, 3000);

  this.interval2 = setInterval(() => {  
    var lbk = 0;
    this.api.getBasket(this.userID).subscribe((data) => { 
      console.log(data)
      var num = data.length;

        
        
        if(num > 3){
          this.busket2 = data.slice(num-3); 
        }else{
          this.busket2 = data;
        }
       
        
        
        
       


      this.basket = data;
      // alert(JSON.stringify(this.basket))
      this.GetPicture();
      this.GetOffer();
     });
 }, 4000); 

  }

 GetPicture(){
  this.pic2 = [];
  this.total = 0;
  this.Dtotal = 0;
  this.Gtotal = 0;
    this.basket.forEach(element => {
      this.total += Number((element.price*element.number)  - (element.price*element.promo));
      if(this.churn){
        this.Dtotal = Number(this.total*(60/100));
        this.Gtotal = Number(this.total - (this.total*(60/100)));
      }else{
        this.Dtotal = Number(this.total*(40/100));
        this.Gtotal = Number(this.total - (this.total*(40/100)));
      }
      
});

 // alert(JSON.stringify(this.busket2))
 this.busket2.forEach(element => {
  this.pic.forEach(pic2 =>{
    //   alert(element.item_code + "  " + pic2.item_code)
         if(element.item_code == pic2.item_code){
           this.pic2.push(pic2.item_pic)
         }
     })
  });
}

GetOffer(){
  //this.OfItem = [];
  var ltime = this.basket[0].update_time;
  this.OfItem = this.basket[0].item_code;
  this.basket.forEach(element => {
    
     if(element.update_time > ltime){
      this.OfItem = element.item_code;

     // alert(this.OfItem)
     }
  });

  
  
  this.api.getOffer(this.OfItem).subscribe((data) => { 
  
    if(data.length > 0  && this.OfItem != this.id){
    this.id = this.OfItem;
    this.Offer = data;
    
    this.getChartData(data);
    var count = 0;
    var lowestprice;
    this.lowestprice = []
    
        
    this.Offer.forEach(element => {
      lowestprice = 100000;
        var A = [];
    //alert(this.items)
      this.items.forEach(element2 => {
  
        
       if(element2.item_id == element.item_code){
          //  alert(element.item_code + "  " + element2.retail_name)
          A.push({"retailname":element2.retail_name,"price":element2.price})
          
          if((lowestprice >= element2.price) && (element2.price > 0)){
            
            lowestprice = element2.price;
          }
           
     
        } 
        
      });
      this.lowestprice.push(lowestprice);  
   
      this.Offer.push(A);
      alert(JSON.stringify(  this.Offer))
     
      console.log(this.Offer)
    });
  
  }

   });

}

getChartData(offer)
{
  this.date= [];
  this.data1= [];  
  this.data2= [];  
  this.data3= [];  
  this.data4= [];  
  this.date2= [];
  this.data11= [];  
  this.data22= [];  
  this.data33= [];  
  this.data44= [];  
    this.api.getChart1(offer[0].item_code).subscribe((data) => { 
         data[0].date.forEach(element => {
           var date = new Date(element).getDate();
          this.date.push(date)      
         });
         data[0].bigc.forEach(element => {
          this.data1.push(element)      
         });
         data[0].lotus.forEach(element => {
          this.data2.push(element)      
         });         
         data[0].makro.forEach(element => {
          this.data3.push(element)      
         });                  
         data[0].s1.forEach(element => {
          this.data4.push(element)      
         });
     
         this.api.getChart2(offer[1].item_code).subscribe((data) => { 
          data[0].date.forEach(element => {
            var date = new Date(element).getDate();
           this.date2.push(date)      
          });
          data[0].bigc.forEach(element => {
           this.data11.push(element)      
          });
          data[0].lotus.forEach(element => {
           this.data22.push(element)      
          });         
          data[0].makro.forEach(element => {
           this.data33.push(element)      
          });                  
          data[0].s1.forEach(element => {
           this.data44.push(element)      
          });

          this.Chart();  
         this.Chart2();
      //   alert(this.)
 
  })


})
}

Chart(){
 //alert(this.data1 + "  " + this.data2)
  this.LineChart = new Chart('lineChart',{
    type: 'line',
    
data:{
 labels: this.date,
 datasets: [{
   label: 'BigC',
   data: this.data1,
   fill:false,
   lineTension: 0.2,
   borderColor:"green",
   borderWidth: 1
 },
 {
   label: 'Lotus',
   data: this.data2,
   fill:false,
   lineTension: 0.2,
   borderColor:"blue",
   borderWidth: 1
 },
 {
   label: 'Makro',
   data: this.data3,
   fill:false,
   lineTension: 0.2,
   borderColor:"red",
   borderWidth: 1
 },
 {
   label: 'S1',
   data: this.data4,
   fill:false,
   lineTension: 0.2,
   borderColor:"gold",
   borderWidth: 3
 }
]    
},
options:{
 title:{
   text:"Line Chart",
   display:false
 },
 scales: {
   yAxes: [{
     ticks:{
       beginAtZero:false
     }
   }]
 }
}

});
   
}

Chart2(){
  // alert(this.date)
   this.LineChart = new Chart('lineChart2',{
     type: 'line',
 data:{
  labels: this.date2,
  datasets: [{
    label: 'BigC',
    data: this.data11,
    fill:false,
    lineTension: 0.2,
    borderColor:"green",
    borderWidth: 1
  },
  {
    label: 'Lotus',
    data: this.data22,
    fill:false,
    lineTension: 0.2,
    borderColor:"blue",
    borderWidth: 1
  },
  {
    label: 'Makro',
    data: this.data33,
    fill:false,
    lineTension: 0.2,
    borderColor:"red",
    borderWidth: 1
  },
  {
    label: 'S1',
    data: this.data44,
    fill:false,
    lineTension: 0.2,
    borderColor:"gold",
    borderWidth: 3
  }
 ]    
 },
 options:{
  title:{
    text:"Line Chart",
    display:false
  },
  scales: {
    yAxes: [{
      ticks:{
        beginAtZero:false
      }
    }]
  }
 }
 
 });
    
 }

}
