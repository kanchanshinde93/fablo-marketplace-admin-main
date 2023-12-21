import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Router,Navigation } from '@angular/router';
import { AdminServiceService } from 'app/Services/admin-service.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  outletData:any;

  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  }
  offerList: any;
  constructor(private modalService: NgbModal, private router:Router, private adminService:AdminServiceService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.outlet) {
      this.outletData = nav.extras.state.outlet;
       console.log(this.outletData.outletName)
    } else {
      this.router.navigate(["/outletInfo/outlet"]);
    }
  }

  public contentHeader: object

  ngOnInit(): void {
    this.outletOffer();
    this.contentHeader = {
      headerTitle: 'Offers',
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
            name: 'seller',
            isLink: true,
            link: '/userType/merchant'
          },
          {
            name: 'outlet',
            isLink: true,
            link: '/outletInfo/outlet'
          },
          {
            name: 'outletDetails',
            isLink: true,
            link: '/outletInfo/outletDetails'
          },
          {
            name: 'Offers',
            isLink: false
          }
        ]
      }
    }
  }

  outletOffer(){
    console.log(this.outletData.outletId)
    this.adminService.getOutletOffer(this.outletData?.outletId).subscribe((data:any)=>{
    this.offerList = data.items;
    console.log(this.offerList);
    });
  }

  // modal add offers
  modalOfferAdd(modalAdd) {
    this.modalService.open(modalAdd, {
      centered: true,
    });
  }

  // modal edit offers
  modalOfferEdit(modalEdit) {
    this.modalService.open(modalEdit, {
      centered: true
    });
  }

  // modal delete offers
  modalOfferDelete(modalEdit) {
    this.modalService.open(modalEdit, {
      centered: true
    });
  }
  // add offer
  addmodaloffer(modalEdit) {
    this.modalService.open(modalEdit, {
      centered: true
    });
  }

}
