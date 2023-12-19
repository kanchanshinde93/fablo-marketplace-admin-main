import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { ToastrserviceService } from 'app/Services/toastr.service';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  }
  promotionList:any
  discountId: any;
  editDiscountForm: FormGroup;
  addDiscountForm: FormGroup;
  submitted: Boolean = false;
  isFlat: Boolean = false;
  offerDetail: any;
  constructor(private modalService: NgbModal,private adminService: AdminServiceService,private fb: FormBuilder , private toastr: ToastrserviceService) {

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
    this.addDiscountForm = this.fb.group({
      discountTitle: new FormControl("", [Validators.required]),
      discountPercent: new FormControl("", [Validators.required]),
      maxDiscount: new FormControl("", [Validators.required]),
      minAmount: new FormControl("", [Validators.required]),
      isFlatDiscount: new FormControl("", [Validators.required]),
    });
    this.getAllPromotion(); 
  }

  getAllPromotion() {
    this.adminService.getAllOffer().subscribe((data: any) => {
      this.promotionList = data.items;
      console.log(this.promotionList);
    });
  }

  get addDiscount() {
    return this.addDiscountForm.controls;
  }

  modalOfferDelete(modalData: any, Offer: any) {
    this.offerDetail = Offer;
    this.modalService.open(modalData, {
      centered: true,
      size: "md",
    });
  }

  deletePromotion() {
    this.adminService
      .deletData({ discountId: this.offerDetail.discountId })
      .subscribe((res: any) => {
        if (!res.status) {
          this.toastr.showError(res.message, "Error");
          this.modalService.dismissAll();
        }
        this.toastr.showSuccess(res.message, "Succes");
        this.getAllPromotion();
        this.modalService.dismissAll();
      });
  }
 

    // modal edit offers
    openEditOfferModal(data: any, discount: any) {
      this.submitted = true;
      this.modalService.open(data, {
        centered: true,
        size: "md",
      });
      this.discountId = discount.discountId;
  
      this.isFlat = discount.isFlatDiscount;
      this.addDiscountForm.patchValue({
        discountTitle: discount.discountTitle,
        isFlatDiscount: discount.isFlatDiscount,
  
        discountPercent: discount.discountPercent,
        maxDiscount: discount.maxDiscount,
        minAmount: discount.minAmount,
      });
    }

    addDiscountFormSubmit() {
      this.submitted = true;
      if (this.isFlat) {
      
        this.addDiscount.maxDiscount.setValue(0);
      }
      if (this.addDiscountForm.invalid) {
        console.log("this.addDiscountForm.invalid", this.addDiscountForm);
        return;
      } else {
        const formData = {
          discountTitle: this.addDiscountForm.value.discountTitle,
          promoCode: this.addDiscountForm.value.promoCode,
          discountPercent: this.addDiscountForm.value.discountPercent,
          maxDiscount: this.addDiscountForm.value.maxDiscount,
          minAmount: this.addDiscountForm.value.minAmount,
          isFlatDiscount: this.addDiscountForm.value.isFlatDiscount,
        };
        this.adminService.addNewDiscount(formData).subscribe((res: any) => {
          if (res.status) {
            this.toastr.showSuccess(res.message, "Success!");
            this.getAllPromotion();
            this.addDiscountForm.reset();
            this.modalService.dismissAll();
          } else {
            this.toastr.showError(res.message, "error!");
            this.getAllPromotion();
          }
        });
      }
    }
    flatValue(event: any) {
      this.isFlat = event.target.checked;
      console.log("this.isFlat", this.isFlat ? [] : [Validators.required]);
    }
    // modal add offers
    openAddPromotionModal(data: any) {
      this.addDiscountForm.reset();
      this.modalService.open(data, {
        centered: true,
      });
      this.submitted = false;
    }
  
}
