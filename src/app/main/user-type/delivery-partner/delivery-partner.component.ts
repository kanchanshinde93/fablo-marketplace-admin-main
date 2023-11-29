import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.scss']
})
export class DeliveryPartnerComponent implements OnInit {
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
  rows: any;
  data = [];
  filteredData = [];
  formula: string = 'DeliveryPartner';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Delivery Partner',
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
            name: 'Delivery Partner',
            isLink: false
          }
        ]
      }
    }
  }
  public contentHeader: object

  filterUpdate(event: any) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys([0]);

    this.data = this.filteredData.filter(function (item: any): | any {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]?.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
    this.kitchenSinkRows = this.data;
    this.table.offset = 0;

  }
  onSelect({ selected }: any) {
    this.exportCSVData = selected;
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
      headers: ['name', 'phone', 'address'],
    }

    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);

    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);
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