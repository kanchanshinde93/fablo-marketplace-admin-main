import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, Navigation } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { ToastrService } from 'ngx-toastr';

const URL = 'https://your-url.com';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddOutletComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  public openingHourdata = { hour: 13, minute: 30 };
  public closingHourdata = { hour: 13, minute: 30 };
  public meridianTP = true;
  imageNamecloud:any
  sellerData: any;
  addOutletForm: FormGroup;
  Submitted: Boolean = false;
  cuisineList: any
  cuisineData = [];
  imageURL = [];
  selectedImage: any;
  imgaename: any;
  isCuisine: any;
  constructor(private modalService: NgbModal, private toastr:ToastrService, private router: Router, private fb: FormBuilder, private adminService: AdminServiceService) {
    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.sellerData) {
      this.sellerData = nav.extras.state.sellerData;
    } else {
      this.router.navigate(["/userType/merchant"]);
    }
  }
  public contentHeader: object

  ngOnInit(): void {
console.log("Data", this.sellerData.authorizedPersonDetails.name);

    // add new outlet form
     this.addOutletForm = this.fb.group({
      outletName: new FormControl('', [Validators.required]),
      outletImage: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      preparationTime: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      shopAddress: new FormControl('', [Validators.required]),
      isVeg: new FormControl(''),
      openingHour: new FormControl('', [Validators.required]),
      closingHour: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      isFood: new FormControl(true, [Validators.required]),
      longitude: new FormControl(0, [Validators.required]),
      latitude: new FormControl(0, [Validators.required]),
    })


    this.contentHeader = {
      headerTitle: 'Add Outlet',
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
            link: '/outlet-info/outlet'
          },
          {
            name: 'Add Outlet',
            isLink: false
          }
        ]
      }
    }
  }

  get f() {
    return this.addOutletForm.controls;
  }

  SelectImage(event: any) {
    this.imageURL=[];
    this.addOutletForm.value.outletImage='';
    this.selectedImage = event.target.files[0]
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL.push(event.target.result);
    }
    reader.readAsDataURL(event.target.files[0]); 
    const formData = new FormData();
    formData.append('image', this.selectedImage);
    formData.append('folder', 'outlet');
    this.adminService.uploadImage(formData).subscribe((res:any)=>{
      if(res.status){
        this.toastr.success(res.message,"Success!");
       this.imageNamecloud =res.items
        }
       else{
        this.toastr.error(res.message,"error!");
       }
     }) 
    
  }
 

  // check selected cuisine
  cuisineCheck(cuisine: any) {
    this.isCuisine = cuisine;
    if (this.cuisineData.includes(cuisine.cuisineId)) {
      return true;
    }
    else {
     
      false;
    }
  }

  addOutletFormSubmit() {
    this.Submitted = true;
    if (this.addOutletForm.invalid) {
      console.log("Failed");
      return;
    }
    else {
      console.log("Working");

      this.addOutletForm.value.openingHour = this.formatTime(this.addOutletForm.value.openingHour);
      this.addOutletForm.value.closingHour = this.formatTime(this.addOutletForm.value.closingHour)
      const openingHours: any = [`${this.addOutletForm.value.openingHour} - ${this.addOutletForm.value.closingHour}`]
      this.addOutletForm.value.cuisine = this.cuisineData;


      const body={
        "sellerId": this.sellerData.sellerId,
        "outletName": this.addOutletForm.value.outletName,
        "outletImage":   this.imageNamecloud,
        "type": this.addOutletForm.value.type,
        "preparationTime":  this.addOutletForm.value.preparationTime,
        "area": this.addOutletForm.value.area,
        "cuisine":this.addOutletForm.value.cuisine,
        "isPureVeg": JSON.parse(this.addOutletForm.value.isVeg),
        "phone": this.addOutletForm.value.phone,
        "isFood": this.addOutletForm.value.isFood,
        "shopAddress": this.addOutletForm.value.shopAddress,
        "longitude":  this.addOutletForm.value.longitude,
        "latitude": this.addOutletForm.value.latitude,
        "openingHours": openingHours,
     }

     console.log(body)
  /*     const formData = new FormData();
      formData.append('sellerId', this.sellerData.sellerId);
      formData.append('outletName', this.addOutletForm.value.outletName);
      formData.append('outletImage', this.selectedImage);
      formData.append('type', this.addOutletForm.value.type);
      formData.append('preparationTime', this.addOutletForm.value.preparationTime);
      formData.append('area', this.addOutletForm.value.area);
      formData.append('cuisine', this.addOutletForm.value.cuisine);
      formData.append('shopAddress', this.addOutletForm.value.shopAddress);
      formData.append('longitude', this.addOutletForm.value.longitude);
      formData.append('latitude', this.addOutletForm.value.latitude);
      formData.append('isVeg', JSON.parse(this.addOutletForm.value.isVeg));
      formData.append('openingHours', openingHours);
      formData.append("isFood", this.addOutletForm.value.isFood);
      formData.append("phone", this.addOutletForm.value.phone); */

     this.adminService.addOutlet(body).subscribe((res:any)=>{
       if(res.status){
          this.toastr.success(res.message,"Success!");
          this.addOutletForm.reset();
          this.modalService.dismissAll();
          this.router.navigate(["/outletInfo/outlet"]);
        }
        else{
          this.toastr.error(res.message,"error!");
        }
      })
    } 

  }
  modalCuisineAdd(data: any) {
    this.allCuisine();
    this.modalService.open(data, {
      centered: true
    })
  }

  allCuisine() {
    this.adminService.getAllCuisine().subscribe((data: any) => {
      this.cuisineList = data.items;
    })
  }

  onCuisineSelect(cuisine: any) {
    if (this.cuisineData.includes(cuisine.cuisineId)) {
      let index = this.cuisineData.indexOf(cuisine.cuisineId);
      this.cuisineData.splice(index, 1)
    } else {
      this.cuisineData.push(cuisine.cuisineId);
    }
  }


  formatTime(dateObject: any): any {
    let { hour, minute } = dateObject
    let timeSet = "AM"
    if (hour >= 12) {
      timeSet = "PM"
      hour = hour - 12
    }
    if (hour == 0) {
      hour = 12
    }
    minute = minute == 0 ? `0${minute}` : minute
    return `${hour}:${minute} ${timeSet}`
  }

}
