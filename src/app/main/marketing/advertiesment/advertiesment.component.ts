import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
} from "@angular/forms";
import { FlatpickrOptions } from "ng2-flatpickr";
import { FileUploader } from "ng2-file-upload";
import { AdvertisementService } from "app/Services/advertisement.service";

const URL = "https://your-url.com";
@Component({
  selector: "app-advertiesment",
  templateUrl: "./advertiesment.component.html",
  styleUrls: ["./advertiesment.component.scss"],
})
export class AdvertiesmentComponent implements OnInit {
  bannerList: any;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true,
  });
  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
  };
 
  bannerImage: any;
  constructor(
    private modalService: NgbModal,
    private adServices: AdvertisementService,
    private fb: FormBuilder
  ) {}

  public contentHeader: object;
  public addBannersForm: FormGroup;
   submitted = false;

  ngOnInit(): void {
    this.addBannersForm = this.fb.group({
      type: new FormControl("", [Validators.required]),
      tag: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
    })
    this.contentHeader = {
      headerTitle: "Advertiesment",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/dashboard/home",
          },

          {
            name: "Advertiesment",
            isLink: false,
          },
        ],
      },
    };
    this.getBanners();

    
  }


  get f() {
    return this.addBannersForm.controls;
  }
  //getbanners
  getBanners() {
    this.adServices.getAllBanners().subscribe((data: any) => {
      if (!data.status) {
        this.bannerList = [];
      }
      this.bannerList = data.items;
    });
  }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      this.bannerImage  = event.target.files[0];
      this.addBannersForm.patchValue({
        fileSource: this.bannerImage
      });
    }
  }

  addBannerSubmit(){
    this.submitted = true;
    if (this.addBannersForm.invalid) {
      return;
    } else {
      let body={
        "type":this.addBannersForm.value.type, 
        "tag":this.addBannersForm.value.tag,
        "url":this.bannerImage
        }
        console.log(body);
       /*  this.adServices.addBanners(body).subscribe((data: any) => {
          if (!data.status) {
            this.bannerList = [];
          }
          this.bannerList = data.items;
        });  */
    }
  }
  // modal add promo
  modalBannerAdd(bannerAdd:any) {
    this.modalService.open(bannerAdd, {
      centered: true,
    });
    this.submitted = false;
  }

  // modal edit promo
  modalBannerEdit(bannerEdit:any) {
    this.modalService.open(bannerEdit, {
      centered: true,
    });
  }

  // modal delete promo
  modalBannerDelete(bannerDelete:any) {
    this.modalService.open(bannerDelete, {
      centered: true,
    });
  }
}
