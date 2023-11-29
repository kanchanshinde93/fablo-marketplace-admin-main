import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  }
  constructor(private modalService: NgbModal) {

  }

  public contentHeader: object

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Promotion',
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
            name: 'Promotion',
            isLink: false
          }
        ]
      }
    }
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
  modalOfferDelete(modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true
    });
  }
  // modal add promo
  modalPromoAdd(promoAdd) {
    this.modalService.open(promoAdd, {
      centered: true,
      size: 'lg'
    });
  }

  // modal edit promo
  modalPromoEdit(promoEdit) {
    this.modalService.open(promoEdit, {
      centered: true,
      size: 'lg'
    });
  }

  // modal delete promo
  modalPromoDelete(promoDelete) {
    this.modalService.open(promoDelete, {
      centered: true
    });
  }
  
}
