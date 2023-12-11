import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { map, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminServiceService {
  private apiUrl = environment.apiUrl;
  private menuUrl = environment.menuUrl;
  private orderUrl = environment.orderUrl;
  private userUrl=environment.userUrl
  Header = () => {
    let headers = new HttpHeaders();
    // headers = headers.append('content-type', 'application/json');
    // headers = headers.append('Accept', 'application/json');
    headers = headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    //  console.log(headers)
    return { headers };
  };

  constructor(private http: HttpClient) {}  
  // login to dashboard
  login(body: any) {
    return this.http.post(this.apiUrl + "/v1/auth/login", body).pipe(
      map((res: any) => {
        if (res.status) {
          localStorage.setItem("token", res.items?.token);
        }
        return res;
      })
    );
  }

  // total count of order and outlets
  count() {
    return this.http.get(this.apiUrl + "/v1/config/stat", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // get all seller list
  getAllSeller() {
    return this.http.get(this.apiUrl + "/v1/seller/all", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
//get seller info

getSellerInfo(body: any) {
  return this.http.post(this.apiUrl + "/v1/seller/info", body,this.Header()).pipe(
      map((res: any) => {
        return res;
      })
    );
}
  //get seller outlet
  getSellerOutlet(sellerId: any, mode: any) {
    return this.http
      .get(
        this.apiUrl + `/v1/outlet/seller?sellerId=${sellerId}&mode=${mode}`,
        this.Header()
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // all outlet
  getAllOutlet() {
    return this.http.get(this.apiUrl + "/v1/outlet/", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // edit outlet
  editOutlet(outletId: any, body: any) {
    return this.http
      .post(this.menuUrl + "/v1/outlet/update/" + outletId, body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
    0;
  }
  // get all agent
  getAllAgent() {
    return this.http.get(this.apiUrl + "/v1/auth/", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // outlet by outlet id
  getoutletById(outletId: any) {
    return this.http
      .get(this.apiUrl + "/v1/outlet/info/" + outletId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get seller details by seller id
  getSellerDetails(body: any) {
    return this.http
      .post(this.apiUrl + "/v1/seller/info", body, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get outlet offer
  getOutletOffer(outletId: any) {
    return this.http
      .get(this.menuUrl + "/v1/outlet/discount/" + outletId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // change outlet status
  changStatus(outletId: any) {
    return this.http
      .get(this.menuUrl + "/v1/outlet/status/" + outletId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get all cuisine
  getAllCuisine() {
    return this.http
      .get(this.menuUrl + "/v1/outlet/cuisine", this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // add outlet
  addOutlet(body: any) {
    return this.http
      .post(this.apiUrl + "/v1/outlet/", body, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get all order
  getAllOrder(status: any, from: any, to: any) {
    return this.http
      .get(
        this.apiUrl +
          `/v1/order/outlets?status=${status}&from=${from}&to=${to}`,
        this.Header()
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get outlet order history
  getOrderhistory(outletId: any, status: any, from: any, to: any) {
    return this.http
      .get(
        this.orderUrl +
          "/v1/order/outlet/" +
          outletId +
          `?status=${status}&from=${from}&to=${to}`,
        this.Header()
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // add product category
  addCategory(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/category", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get category by outlet id
  getAllCategory(outletId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/category/" + outletId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // edit category
  editCategory(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/category/edit", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // get sub category by category id
  getSubCategory(categoryId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/sub-category/" + categoryId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // add product
  addProduct(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/product", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // edit prouct by productId
  editProductById(productId: any, body: any) {
    return this.http
      .post(
        this.menuUrl + "/v1/menu/product/edit/" + productId,
        body,
        this.Header()
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // change stock status
  chnageStockStatus(productId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/stock/" + productId, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get product by category/ subcategory id
  getProduct(categoryId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/prod/" + categoryId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get product customization
  getCustomization(productId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/customization/" + productId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // add product customization
  addCustomization(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/customization", body, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // edit product customization
  editCustomization(variationId: any, body: any) {
    return this.http
      .post(
        this.menuUrl + "/v1/menu/customization/edit/" + variationId,
        body,
        this.Header()
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // add variant in variation
  addVariant(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/customitem", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // edit variant by variantId
  editVariantById(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/customitem/edit", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get outlet addon
  getOutletAddon(outletId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/addOn/" + outletId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // get product addon
  getProductAddon(productId: any) {
    return this.http
      .get(this.menuUrl + "/v1/menu/product/addOn/" + productId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  // edit outlet addon
  editAddonCategory(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/addOn/Category/edit", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // add addon category
  addAddonCategory(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/addOn/Category", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // edit addon product
  editAddonProduct(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/addOn/product/edit", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // link/unlink addon
  linkUnlinkAddon(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/product/addOn", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get out of stock product
  getOutofStockProduct(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/menu/stock", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // change order Status
  changOrderStatus(body: any) {
    return this.http
      .post(this.orderUrl + "/v1/order/status", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // get all ticket
  getAllTickets(status: any) {
    return this.http
      .get(this.apiUrl + `/v1/support?status=${status}`, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // delete category
  deleteCategory(body: any) {
    return this.http
      .post(this.menuUrl + "/v1/delete", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  //sellerstutesChange
  sellerStatusChange(body: any) {
    return this.http
      .post(this.userUrl + "/v1/seller/verify", body, this.Header())
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  verifiedoutlet(body:any){
    return this.http
    .post(this.menuUrl + "/v1/outlet/verify", body, this.Header())
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  ViewTicketDetails(ticketId: any) {
    return this.http
      .get(this.apiUrl + "/v1/support/details/" + ticketId, this.Header())
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
