import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { AdminServiceService } from 'app/Services/admin-service.service';

@Component({
  selector: 'app-merchanht-details',
  templateUrl: './merchanht-details.component.html',
  styleUrls: ['./merchanht-details.component.scss']
})
export class MerchanhtDetailsComponent implements OnInit {
  sellerData: any;
  mode = 2;
  outletList: any;
  outletDetails: any;
  sellerInfo:any
  constructor(private router: Router, private adminService: AdminServiceService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.sellerData) {
      this.sellerData = nav.extras.state.sellerData;
    } else {
      this.router.navigate(["/userType/merchant"]);
    }
  }
  public contentHeader: object
  ngOnInit(): void {
    this.getSellerInfo();
    this.contentHeader = {
      headerTitle: 'Outlet Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboard/home'
          },
          {
            name: 'Users',
            isLink: true,
            link: '/userType/users'
          },
          {
            name: 'Seller',
            isLink: true,
            link: '/userType/merchant'
          },
          {
            name: 'Outlet Details',
            isLink: false
          }
        ]
      }
    }
  }

  // redirected to add outlet page
  addOutlet(sellerData:any){
    console.log(sellerData);
    this.router.navigate(["/outletInfo/addOutlet"], { state: { sellerData } });
  }
  getSellerInfo(){
    const formData ={
      "sellerId":this.sellerData.sellerId,
    }
    this.adminService.getSellerInfo(formData).subscribe((data: any) => {
      this.sellerInfo = data.items;
    });
  }
  
  sellerOutlet() {
    this.adminService.getSellerOutlet(this.sellerData.sellerId, this.mode).subscribe((data: any) => {
      this.outletList = data.items;
    });
  }

  // redirected to view outlet details page
  viewOutletDetails(outletData: any) {
    outletData.sellerId = this.sellerData.sellerId;
    this.router.navigate(["/outletInfo/outletDetails"], { state: { outletData } });
    this.outletDetails = outletData;
  }
}
