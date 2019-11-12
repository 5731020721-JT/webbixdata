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
  public price00 = 0;
  public coupon = 0;
  public UID = "00";
  public UID2 = "01";
  public gender = "male"
  public userName;
  public image;
  public lenght;
  public lenght2;
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
  public OfferNew = [];
  public num;
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
        this.UID = data[0].id
        this.userName = data[0].firstname;
        this.image = data[0].image;
        this.userID = data[0].id;
        this.churn = data[0].churn;
        this.gender = data[0].gender;
       });
  }, 3000);

  this.interval2 = setInterval(() => { 
  
    var lbk = [];
    this.api.getBasket(this.userID).subscribe((data) => { 
      //console.log("BUSKETTT" + JSON.stringify(data))
      
       this.num = data.length;

        
    
      //  data.forEach(element => {
      //     lbk.push(element.update_time)
      //  });

       data.sort(function (a, b) {
        if (a.update_time > b.update_time) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
  //  console.log("ABA" + JSON.stringify(data));


       // find max update time and pop index max update time
     // console.log(this.sortbasket(data));




        if(this.num > 2){
          this.busket2 = data.slice(0,2)
         // console.log("AAA" + this.busket2.length)
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

  
  GetMonth(URL){
    this.api.getMonth(URL).subscribe((data) => {
         this.price00 = data.round_500;
         this.coupon = data.coupon;
    })
}

  

 GetPicture(){

  if(this.UID != this.UID2){
    this.GetMonth(this.image)
    this.busket2 = [];
    this.pic2 = [];
    this.UID2 = this.UID
    console.log('1212312121')
   }   
 
  this.total = 0;
  this.Dtotal = 0;
  this.Gtotal = 0;
    this.basket.forEach(element => {
      this.total += Number((element.price*element.number)  - (element.price*element.promo));
      if(this.total >= this.price00){
        this.Dtotal = this.coupon
        this.Gtotal = Number(this.total - this.coupon);
      }else{
        this.Dtotal = 0;
        this.Gtotal = Number(this.total);
      }
      
});

 // alert(JSON.stringify(this.busket2))
 //var i = 0
 
  
 this.pic2 = [];
 this.busket2.forEach(element => {
  this.pic.forEach(pic3 =>{
 
    //   alert(element.item_code + "  " + pic2.item_code)
         if(element.item_code == pic3.itemcode){
           this.pic2.push(pic3.pic_item)
          // console.log("MM" + pic3.itemcode + "i: " + i)
         //  i++;
         }
     })
  });
}

GetOffer(){
  //this.OfItem = [];
  this.OfferNew = [];
  var ltime = this.basket[0].update_time;
  this.OfItem = this.basket[0].item_code;
  this.basket.forEach(element => {
    
     if(element.update_time > ltime){
      this.OfItem = element.item_code;

     // alert(this.OfItem)
     }
  });

  
  
  this.api.getOffer(this.OfItem,this.gender).subscribe((data) => { 
   console.log("OFFER " +  this.OfItem)
    if(data.length > 0  && this.OfItem != this.id){
    this.id = this.OfItem;
    this.Offer = data;
    this.OfferNew.push({"itemcode":data[0].offer_1},{"itemcode": data[0].offer_2})
    console.log("OFFER2  " +data[0].offer_2)
    this.getChartData(this.OfferNew);
    var count = 0;
    var lowestprice;
    this.lowestprice = []
    
        
    this.OfferNew.forEach(element => {
      lowestprice = 100000;
        var A = [];
    //alert(this.items)
      this.items.forEach(element2 => {
  
        
       if(element2.item_id == element.itemcode){
          //  alert(element.item_code + "  " + element2.retail_name)
          A.push({"retailname":element2.retail_name,"price":element2.price})
          
          if((lowestprice >= element2.price) && (element2.price > 0)){
            
            lowestprice = element2.price;
          }
           
     
        } 
        
      });
      this.lowestprice.push(lowestprice);  
   
      this.Offer.push(A);
     
     
      console.log(this.Offer)
    });
    this.lenght = this.Offer[1].length;
    this.lenght2 = this.Offer[2].length;
  
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
    this.api.getChart1(offer[0].itemcode).subscribe((data) => { 
         data[0].date.forEach(element => {
           var date = new Date(element).getDate()+1;
           if(date == 32){
             date = 1;
           }
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
         //
         
         //alert(element)      
         });
     
         this.api.getChart2(offer[1].itemcode).subscribe((data) => { 
           
          data[0].date.forEach(element => {
            var date = new Date(element).getDate()+1;
            if(date == 32){
              date = 1;
            }
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
   fill: "B",
   lineTension: 0.2,
   borderColor:"gold",
   borderWidth: 1
 },
 {
   label: 'Lotus',
   data: this.data2,
   fill:"L",
   lineTension: 0.2,
   borderColor:"#06BE78",
   borderWidth: 1
 },
 {
   label: 'Makro',
   data: this.data3,
   fill:"M",
   lineTension: 0.2,
   borderColor: "#E30009",
   borderWidth: 1
 },
 {
   label: 'S1',
   data: this.data4,
   fill:"S",
   lineTension: 0.2,
   borderColor:"#0066E3",
   
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
    fill:"B",
    lineTension: 1.0,
    borderColor:"gold",
    borderWidth: 1,
    
  },
  {
    label: 'Lotus',
    data: this.data22,
    fill:"L",
    lineTension: 0.2,
    borderColor:"#06BE78",
    borderWidth: 1
  },
  {
    label: 'Makro',
    data: this.data33,
    fill:"M",
    lineTension: 0.2,
    borderColor:"#E30009",
    borderWidth: 1
  },
  {
    label: 'S1',
    data: this.data44,
    fill:"S",
    lineTension: 0.2,
    borderColor:"#0066E3",
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
