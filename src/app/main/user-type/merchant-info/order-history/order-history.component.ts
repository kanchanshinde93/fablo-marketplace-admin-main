import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AdminServiceService } from 'app/Services/admin-service.service';
import moment from 'moment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderHistoryComponent implements OnInit {
  public DateRangeOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'range'
  }; 
  outletData:any;
  date: any;
  start: any;
  end: any;
  status = 'all';
  orderList: any;
  isShow:Boolean = false;
  orderData: any;
  timingData:any;
  initTime:any;
  pendingTime:any;
  preparingTime:any;
  readyTime:any;
  dispatchedTime:any;
  deliveredTime:any;
  cancelledTime:any;
  constructor(private router:Router, private adminService:AdminServiceService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outlet) {
      this.outletData = nav.extras.state.outlet;
    } else {
      this.router.navigate(["/outletInfo/outlet"]);
    }
  }

  public contentHeader: object

  ngOnInit(): void {
    var from = new Date();
    from.setDate(from.getDate() - 5);
    this.start = moment(from).format("MM-DD-YYYY");
    this.end = moment(new Date()).format("MM-DD-YYYY");
    this.getAllOrder();
    this.contentHeader = {
      headerTitle: 'Order History',
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
            name: 'Merchant',
            isLink: true,
            link: '/userType/merchant'
          },
          {
            name: 'Outlet',
            isLink: true,
            link: '/outletInfo/outlet'
          },
          {
            name: 'Order History',
            isLink: false
          }
        ]
      }
    }
  }

  // select order status;
  getStatus(event:any){
    this.status = event.target.value;
   this.getAllOrder();
  }

// select date range
  getDate(event:any){
    var myDate =event.target.value;
    const [from,to] = myDate.split(" to ") ;
    this.start = moment(from).format("MM-DD-YYYY");
    this.end = moment(to).format("MM-DD-YYYY");
    this.getAllOrder();
    }

  getAllOrder(){
    this.adminService.getOrderhistory(this.outletData?.outletId,this.status,this.start,this.end).subscribe((data:any)=>{
      this.orderList = data.items?.orderData;
      console.log("data",data);
      
      console.log(this.orderList);
      
    });
  }

  getStatusColor(status:any){
    switch(status){
      case "pending":
        return "badge badge-light-warning";
      case "preparing":
        return "badge badge-light-info";
      case "ready":
        return "badge badge-light-secondary";
      case "dispatched":
        return "badge badge-light-dark";
      case "delivered":
        return "badge badge-light-success";
      case "cancelled":
        return "badge badge-light-danger";
    }
  }


  ViewOrderDetails(order:any){
    this.isShow = true;
    this.orderData = order;
    this.timingData = this.orderData.timing;
  }
  closeDetails(){
    this.isShow = false;
  }
// payment status color
  paymentStatus(status:any){
    switch(status){
      case "paid":
        return "badge badge-light-success";
      case "captured":
        return "badge badge-light-success";
      case "Not Collected":
        return "badge badge-light-danger";
    }
  }
  filterUpdate(event: any){}
  downloadCSV(event: any) {}
}
