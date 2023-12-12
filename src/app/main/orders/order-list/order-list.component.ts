import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AdminServiceService } from 'app/Services/admin-service.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public DateRangeOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'range'
  };
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'address' }, { name: 'Actions' }];
  rows: any;
  data = [];
  filteredData = [];
  formula: string = 'Agent';
  status = 'all'
  date: any;
  start: any;
  end: any;
  ordersList: any;
  allOrder: any;
  Order: any;
  orderId: any;
  OrderStatus: any;
  constructor(private modalService: NgbModal,private toastr:ToastrService ,private adminService: AdminServiceService 
    ,private spinner: NgxSpinnerService, private router:Router) { }
  public contentHeader: object;

  ngOnInit(): void {
    var from = new Date();
    var end = from.setDate(from.getDate()+ 1);
    from.setDate(from.getDate() - 5);
    this.start = moment(from).format("MM-DD-YYYY");
    this.end = moment(end).format("MM-DD-YYYY");
    this.allOrders();
  
    
    
    this.contentHeader = {
      headerTitle: 'Order-list',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboad/home'
          },
          {
            name: 'Order-list',
            isLink: false
          }
        ]
      }
    }
  }


  getOrders(status: any) {
    this.status = status;
    this.allOrders();
  }

  // select date from date picker
  getDate(event: any) {
    var date = event.target.value;
    const [from, to] = date.split("to")
    this.start = moment(from).format("MM-DD-YYYY");
    this.end = moment(to).format("MM-DD-YYYY");
    this.allOrders();
  }

  // get all order api call
  allOrders() {
    this.spinner.show();
    this.adminService.getAllOrder(this.status, this.start, this.end).subscribe((data: any) => {
      this.spinner.hide();
      this.ordersList = data.items;
      this.allOrder = this.ordersList;
      this.rows = data.items;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.allOrder;
      this.filteredData = this.allOrder;
     });
  }

  //redirected to view order details
  viewOrderDetails(orderData:any){
    this.router.navigate(["/orders/orderDetails"], { state: { orderData } });
  }

  selectColor(status:any){
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

  // open order status chage Modal

  opneStatusChnageModal(data:any,Order:any){
    this.orderId = Order.orderId;
    this.OrderStatus = this.getNextStatus(Order.status);
    if (this.OrderStatus[0]) {
     this.modalService.open(data,{
       centered:true,
      scrollable:true,
      size:'md'
     });
    }
    
  }

   getNextStatus(currentStatus: any) {
    switch (currentStatus) {
      case "pending":
        return ["accepted", "cancelled"];
      case "preparing":
        return ["ready"];
      case "ready":
        return ["dispatched"];
      case "dispatched":
        return ["delivered"];
      case "delivered":
        return [];
      case "cancelled":
        return [];
    }
  }

  changStatus(orderId:any,orderStatus:any){

   const formData = {
    orderId:orderId,
    orderStatus:orderStatus
   }

    this.adminService.changOrderStatus(formData).subscribe((res) => {
    if (res.status) {
        this.toastr.success(res.message,"Success!");
        this.allOrders();
        this.modalService.dismissAll();
      }else{
        this.toastr.error(res.message,"error!");
        this.allOrders();
      }
    });
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.ordersList.filter(function (d) {

      return d.client.clientName?.toLowerCase().indexOf(val) !== -1 || d.outlet.outletName?.toLowerCase().indexOf(val) !== -1 || d.orderId?.toLowerCase().indexOf(val) !== -1 || !val;
    });



    // update the rows
    this.kitchenSinkRows = this.rows;
  }

  onActivate(event: any) {
  }


  
}  