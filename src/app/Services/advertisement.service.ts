import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { map, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdvertisementService {
  private menuUrl = environment.menuUrl;
  constructor(public http: HttpClient) {}

  getAllBanners() {
    return this.http.get(this.menuUrl + "/v1/banner/").pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  
  addBanners(data:any){
    return this.http.post(this.menuUrl + "/v1/banner/",data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
