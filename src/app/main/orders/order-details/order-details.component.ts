import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderData:any;

  constructor(private router:Router) { 
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.orderData) {
      this.orderData = nav.extras.state.orderData;
  } else {
      this.router.navigate(["/orders/orderList"]);
    }
  }
  public contentHeader: object

  ngOnInit(): void {
    console.log(this.orderData);
    
    this.contentHeader = {
      headerTitle: 'Order-list',
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
          name: 'Orders',
          isLink: true,
          link: '/orders/orderList'
         },
         {
          name: 'Order details',
          isLink:false
         }
        ]
        
      }
    }
  }
  getColor(status:any){
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

}
