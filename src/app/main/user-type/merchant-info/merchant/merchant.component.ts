
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { log } from 'console';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: any = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;
  public loading = false;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'tradeName' }, { name: 'phone' }, { name: 'email' }, { name: 'Actions' }];
  rows: any;
  data = [];
  filteredData = [];
  formula: string = 'MerchantList';
  sellerList: any;
  constructor(private router: Router, private modalService: NgbModal,private spinner: NgxSpinnerService, private adminService: AdminServiceService) { }

  public contentHeader: object

  ngOnInit(): void {
    this.allSeller();
    this.contentHeader = {
      headerTitle: 'Seller',
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
            name: 'seller', 
            isLink: false
          } 
        ]
      }
    }
  }

  allSeller() {
    this.spinner.show();
    this.adminService.getAllSeller().subscribe((data: any) => {
      this.spinner.hide();
      this.sellerList = data.items;
      this.rows = data.items;
      this.tempData = this.rows;
      console.log(this.tempData);
      
      this.kitchenSinkRows = this.sellerList;
      this.filteredData = this.sellerList;
    });
  }

  // view Seller Details
  showSellerDetail(sellerData: any) {
    this.router.navigate(["/userType/merchantDetails"], { state: { sellerData } })
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.sellerList.filter(function (d) {

      return d.basicDetails.sellerName?.toLowerCase().indexOf(val) !== -1 ||d.basicDetails.tradeName?.toLowerCase().indexOf(val) !== -1 || d.basicDetails.phone?.toLowerCase().indexOf(val) !== -1 || d.sellerId?.toLowerCase().indexOf(val) !== -1 || !val;
    });



    // update the rows
    this.kitchenSinkRows = this.rows;

  }
  onSelect({ selected }: any) {
    this.exportCSVData = selected;
  }


   flattenData(tempData:any) {
    return tempData.map((item:any) => {
      return {
        sellerId: item.sellerId,
        sellerName: item.basicDetails.sellerName,
        tradeName: item.basicDetails.tradeName,
        authorizedPersonDetailsName: item.authorizedPersonDetails.name,
        tradeNamauthorizedPersonDetailsePhone: item.authorizedPersonDetails.phone,
        verificationStatus: item.verificationStatus,
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
      headers: ['SELLERID', 'SELLER NAME','TRADENAME', 'CONTACT NAME', 'CONTACT PHONE','STATUS'],
    }



    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.flattenData(this.tempData), this.formula, options);


    } else {
      const fileInfo = new ngxCsv(this.flattenData(this.tempData), this.formula, options);
      this.exportCSVData = undefined;
      }

  }
  onActivate(event: any) {

  }
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true,
      size: "lg"
    });
  }
}
