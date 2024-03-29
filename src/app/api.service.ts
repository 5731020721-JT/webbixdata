import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Http ,Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpRequest } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  options;
  constructor(private http: Http) { 
   

  }
  getAlluser(): Observable<any> {
    return this.http.get(`https://1teamapi.azurewebsites.net/alluser`).map((res: Response) => {
      return res.json();
    });
  }

    getAllitem(): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/getprice`).map((res: Response) => {
        return res.json();
      });

     }

     getPicture(): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/getpicture/`).map((res: Response) => {
        return res.json();
      });

     }

     getBasket(userID): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/getbasket/`+ userID).map((res: Response) => {
        return res.json();
      });

     }

     getOffer(itemID,Gender): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/getoffer/`+ itemID + `/` + Gender).map((res: Response) => {
        return res.json();
      });

     }

     getChart1(itemID): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/getgraph/`+ itemID).map((res: Response) => {
        return res.json();
      });
    }

      getChart2(itemID): Observable<any> {
        return this.http.get(`https://1teamapi.azurewebsites.net/getgraph/`+ itemID).map((res: Response) => {
        return res.json();
      });
     }

     getMonth(URL): Observable<any> {
      

    //const url = {url: URL };
      //let body = 
      
      
     // let params = new HttpParams().set("requestData", JSON.stringify(url));

     
      return this.http.get(`https://1teamapi.azurewebsites.net/getround500/`).map((res: Response) => {
      return res.json();
    });
   }
     

}
