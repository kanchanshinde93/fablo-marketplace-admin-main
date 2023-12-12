import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ordersList: any;
  outletList: any;
  orderData: any;
  pending: any;
  delivered: any;
  dispatched: any;
  ready: any;
  preparing: any;
  cancelled: any
  notVisible: any;
  visible:any;
  open:any;
  closed: any;
  

  constructor(private adminService: AdminServiceService,private spinner: NgxSpinnerService) { }
  public contentHeader: object

  ngOnInit(): void {
    this.allCount();
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboard/home'
          }
        ]
      }
    }
  }

  allCount() {
    this.spinner.show();
    this.adminService.count().subscribe((data: any) => {
      this.spinner.hide();
      this.ordersList = data.items.order;
      this.outletList = data.items.outlet;
      
      // for Orders
      this.delivered = this.ordersList.filter((item)=>item.status == 'delivered').map((item)=>item.count);
      this.dispatched = this.ordersList.filter((item)=>item.status == 'dispatched').map((item)=>item.count);
      this.ready = this.ordersList.filter((item)=>item.status == 'ready').map((item)=>item.count);
      this.preparing = this.ordersList.filter((item)=>item.status == 'preparing').map((item)=>item.count);
      this.pending = this.ordersList.filter((item)=>item.status == 'pending').map((item)=>item.count);
      this.cancelled = this.ordersList.filter((item)=>item.status == 'cancelled').map((item)=>item.count);
      
      // for outlets
      this.notVisible = this.outletList.filter((item)=>item.type == 'not visible').map((item)=> item.count);
      this.open = this.outletList.filter((item)=>item.type == 'open').map((item)=> item.count);
      this.visible = this.outletList.filter((item)=>item.type == 'visible').map((item)=> item.count);
      this.closed = this.outletList.filter((item)=>item.type == 'closed').map((item)=> item.count);
 });
  }
}
