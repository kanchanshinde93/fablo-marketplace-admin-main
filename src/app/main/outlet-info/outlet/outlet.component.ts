import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})

export class OutletComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'address' }, { name: 'Actions' }];
  editOutletForm: FormGroup;
  Submitted: Boolean = false;
 rows: any;
  data = [];
  filteredData = [];
  formula: string = 'OutletList';
  outletList: any;
  newImage: any;
  outletId: any;
  outletData: any;
  previousImage: any;
  changeById: any;
  outetverifiedId:any
  isVerifiedStutes:any
  imageURL: any;
  addProductForm: any;

  constructor(private modalService: NgbModal, private router:Router ,private spinner: NgxSpinnerService,private toastr:ToastrService , private fb: FormBuilder, private adminService: AdminServiceService) { }

  public contentHeader: object
  selectedImage: File | null = null;

  outletImagenew(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedImage = fileList[0];
    }
  }

  SelectImage(event: any) {
    this.selectedImage = event.target.files[0]

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL.push(event.target.result);
      this.addProductForm.patchValue({
        fileSource: this.imageURL,
      });

    };
    reader.readAsDataURL(event.target.files[0]);
  }
  ngOnInit(): void {

    // edit outlet form
    this.editOutletForm = this.fb.group({
      outletName: new FormControl('', [Validators.required]),
      outletImage: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      shopAddress: new FormControl('', [Validators.required]),
    })
    this.allOutlet();
    this.contentHeader = {
      headerTitle: 'Outlet',
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
            isLink: false
          }
        ]
      }
    }
  }

  get b() {
    return this.editOutletForm.controls
  }

  allOutlet() {
    this.spinner.show();
    this.adminService.getAllOutlet().subscribe((data: any) => {
      this.spinner.hide();
      this.outletList = data.items;
      this.rows = data.items;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.outletList;
      this.filteredData = this.outletList;
    })
  }

  selectButtonClass(isClosed: boolean): any {
    switch (isClosed) {
      case true:
        return "badge-light-danger";
      case false:
        return "badge-light-info";
    }
  }

  // open edit outlet modal
  openEditOutletModal(data: any, outletdata: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    
    this.previousImage = outletdata.outletImage
    this.outletData = outletdata.outletId;
    this.editOutletForm.patchValue({
      outletName: outletdata.outletName,
      phone: outletdata.phone,
      area: outletdata.area,
      shopAddress: outletdata.shopAddress
    });
    // console.log(outletdata);

  }
  // get change image
  outletImage(event: any) {
    this.newImage = event.target.files[0];
  }

  editOutletFormSubmit() {
    this.Submitted = true;
    if (this.editOutletForm.invalid) {
      return
    }
    else {

      const formData = new FormData();
      formData.append('outletName', this.editOutletForm.value.outletName);
      formData.append('phone', this.editOutletForm.value.phone);
      formData.append('area', this.editOutletForm.value.area);
      formData.append('shopAddress', this.editOutletForm.value.shopAddress);

      if (this.newImage == undefined) {
        formData.append('outletImage', this.previousImage);
      }else{
        formData.append('outletImage', this.newImage);
      }

this.adminService.editOutlet(this.outletData,formData).subscribe((res:any)=>{
  if(res.status){
    this.toastr.success(res.message,"Success!");
    this.allOutlet();
    this.modalService.dismissAll();
  }
  else{
    this.toastr.error(res.message,"error!");
  }
});
 }
  }
  
  openoutletDetails(outletData:any){
    this.router.navigate(["/outletInfo/outletDetails"], { state: { outletData } });
  }

// open change outlet status Modal
/* changeOutletStatus(data:any,outlet:any){
  this.changeById = outlet.outletId;
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'md'
    
  });
} */


statusChange(event: any, data: any, outlet: any) {
  this.changeById = outlet.outletId;
  // console.log(outlet);
  this.modalService.open(data, {
    centered: true,
    scrollable: true,
    size: "md",
  });
  event.target.checked = !event.target.checked;
  //console.log("event=>", event.currentTarget.className);

 
}

outletStatusChange(){
  this.adminService.changStatus(this.changeById).subscribe((res:any)=>{
    if(res.status){
      this.toastr.success(res.message,"Success!");
      this.allOutlet();
      this.modalService.dismissAll();
    }else{
      this.toastr.error(res.message,"error!");
      this.allOutlet();
      this.modalService.dismissAll();
    }
  })
}

VerifiedOutletStatus(data:any,outlet:any){
  // console.log(outlet.isVerified);
  this.outetverifiedId=outlet.outletId;
  this.isVerifiedStutes=outlet.isVerified;
  
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'md'
  });
}

VerifiedoutletChange(){

  if(!this.isVerifiedStutes){
    const body={
      "outletId":this.outetverifiedId,
      "status":true
   }
   this.adminService.verifiedoutlet(body).subscribe((res:any)=>{
    if(res.status){
      this.toastr.success(res.message,"Success!");
      this.allOutlet();
      this.modalService.dismissAll();
    }else{
      this.toastr.error(res.message,"error!");
      this.allOutlet();
      this.modalService.dismissAll();
    }
  })
  }
  else{
    const body={
      "outletId":this.outetverifiedId,
      "status":false
   }
   this.adminService.verifiedoutlet(body).subscribe((res:any)=>{
    if(res.status){
      this.toastr.success(res.message,"Success!");
      this.allOutlet();
      this.modalService.dismissAll();
    }else{
      this.toastr.error(res.message,"error!");
      this.allOutlet();
      this.modalService.dismissAll();
    }
  })
  }
 
}

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase()
    // console.log(this.outletList)
 
    this.rows = this.outletList.filter(function (d) {
      const phoneString = (d.phone || '').toString();
      return d.outletName?.toLowerCase().indexOf(val) !== -1 || d.sellerId?.toLowerCase().indexOf(val) !== -1 ||d.outletId?.toLowerCase().indexOf(val) !== -1 ||!val;
    });
    this.kitchenSinkRows = this.rows;
  }

  onSelect({ selected }: any) {
    this.exportCSVData = selected;
  }

  flattenData(tempData:any) {
    return tempData.map((item:any) => {
      return {
        SellerId: item.sellerId,
        OutletId: item.outletId,
        OUTLETNAME: item.outletName,
        STATUS: item.isClosed,
        PHONE: item.phone,
        ISVERIFIED: item.isVerified,
      };
    });
  }

  downloadCSV(event: any) {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ['SELLER ID', 'OUTLET ID','OUTLETNAME', 'STATUS', 'CONTACT PHONE','ISVERIFIED'],
    }
  

 if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.flattenData(this.tempData), this.formula, options);

    } else {
      const fileInfo = new ngxCsv(this.flattenData(this.tempData), this.formula, options);
      this.exportCSVData = undefined;
    } 

  }
  onActivate(event: any) {
    // console.log('Activate Event', event.type);
  }

  // modal Open Vertically Centered
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });
  }
  // modal Open Animation Disabled
  modalOpenAD(modalAD) {
    this.modalService.open(modalAD, {
      centered: true,
      windowClass: 'animation-disable',
      animation: false
    });
  }
}

