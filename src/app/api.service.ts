import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Http ,Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  options;
  constructor(private http: Http) { 
    let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); 
    this.options = options;

  }
  getAlluser(): Observable<any> {
    return this.http.get(`http://localhost:3000/alluser`).map((res: Response) => {
      return res.json();
    });
  }

    getAllitem(): Observable<any> {
      return this.http.get(`https://1teamapi.azurewebsites.net/product4`).map((res: Response) => {
        return res.json();
      });

     }

     getPicture(): Observable<any> {
      return this.http.get(`http://1teamapi.azurewebsites.net/getpicture/`).map((res: Response) => {
        return res.json();
      });

     }

     getBasket(userID): Observable<any> {
      return this.http.get(`http://1teamapi.azurewebsites.net/getbasket/`+ userID).map((res: Response) => {
        return res.json();
      });

     }

     getOffer(itemID): Observable<any> {
      return this.http.get(`http://1teamapi.azurewebsites.net/getoffer/`+ itemID).map((res: Response) => {
        return res.json();
      });

     }

     getChart1(itemID): Observable<any> {
      return this.http.get(`http://1teamapi.azurewebsites.net/getgraph/`+ itemID).map((res: Response) => {
        return res.json();
      });
    }

      getChart2(itemID): Observable<any> {
        return this.http.get(`http://1teamapi.azurewebsites.net/getgraph/`+ itemID).map((res: Response) => {
        return res.json();
      });
     }
     

}
