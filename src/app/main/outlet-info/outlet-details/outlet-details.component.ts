import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable'
import { Router, Navigation } from '@angular/router';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
 
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;
  rows: any;
  data = [];

  lat = 20.5937; // Latitude for India's center
  lng = 78.9629; // Longitude for India's center
  zoom = 5; // Zoom level, adjust as needed
  filteredData = [];
  outletData: any;
  shopTime: any;
  openingHoursValue: any;
  openingTime: any;
  closingTime: any;
  newTime: any;
  sellerDetails: any;
  viewDetails: any;
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'address' }, { name: 'Actions' }];
  modalRef: NgbModalRef;
  outofStock: any;
  outofStockList: any;
  isAvailable: any;
  locationPoint: any;
  constructor(private router: Router, private toastr:ToastrService ,private modalService: NgbModal, private adminService: AdminServiceService,private spinner: NgxSpinnerService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outletData) {
      this.outletData = nav.extras.state.outletData;
      // console.log(this.outletData);
    } else {
      this.router.navigate(["/outletInfo/outlet"]);
    }
  }

  public contentHeader: object

  ngOnInit(): void {
    this.outletByID();
    this.sellerBySellerId();
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
            name: 'Outlet',
            isLink: true,
            link: '/outletInfo/outlet'
          },
          {
            name: 'Outlet Details',
            isLink: false
          }
        ]
      }
    }


  }

  outletByID() {
    this.spinner.show();
    this.adminService.getoutletById(this.outletData.outletId).subscribe((data: any) => {
      this.spinner.hide();
      this.viewDetails = data.items;
      this.locationPoint=this.viewDetails.location;
      console.log("this.viewDetails",this.locationPoint);

      this.shopTime = this.viewDetails.openingHours;
      this.openingHoursValue = this.shopTime["0"][0];
      this.newTime = this.openingHoursValue.replace(/"/g, '');
      const [startTime, endTime] = this.newTime.split(' - ')
      this.openingTime = startTime;
      this.closingTime = endTime;
    });
  }

  sellerBySellerId() {
    this.spinner.show();
    const formData = {
      "sellerId": this.outletData.sellerId
    }
    this.adminService.getSellerDetails(formData).subscribe((data: any) => {
      this.spinner.hide();
      this.sellerDetails = data.items;
       console.log("this.sellerDetails",this.sellerDetails);
    });
  }

  viewOffer(outlet: any) {
    this.router.navigate(["/userType/offers"], { state: { outlet } });
  }

  viewOrderHistory(outlet: any) {
    this.router.navigate(["/userType/orderHistory"], { state: { outlet } });
  }

  viewMenu(outlet: any) {
    this.router.navigate(["/userType/menu"], { state: { outlet } });
  }

  viewOutofStock(data: any, outofStock: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    this.outofStock = outofStock.outletId
    this.outofStockProduct();

  }

  outofStockProduct() {
    const formData = {
      outletId: this.outofStock
    }
    this.adminService.getOutofStockProduct(formData).subscribe((data: any) => {
      this.outofStockList = data.items;
      this.rows = data.items;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.outofStockList;
      this.filteredData = this.outofStockList;
    })
  }

  // open stock update Modal
  oenUpdateStockModal(data:any,isAvailable:any){
  this.modalRef = this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'md'
    });
    console.log(isAvailable);
    this.isAvailable = isAvailable.productId;
  }

  updateStocks(){
    this.adminService.chnageStockStatus(this.isAvailable).subscribe((res:any)=>{
     if(res.status){
        this.toastr.success(res.message,"Success!");
        this.outofStockProduct();
        this.modalRef.close();
      }else{
        this.toastr.error(res.message,"error!");
      }
    })
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.outofStockList.filter(function (d: any) {

      return d.productName?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = this.rows;

  }
}
