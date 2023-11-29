import { Component, OnInit,ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AdminServiceService } from 'app/Services/admin-service.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'] 
})
export class TicketComponent implements OnInit {
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
  private exportCSVData: [] | any;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'address' }, { name: 'Actions' }];
  rows: any;
  data = [];
  filteredData = [];
  formula: string = 'Agent';
  isShow:Boolean = false;
  Status: String = 'All';
  ticketList: any;
  ticketData: any;
  allTickets: any;
  constructor(private modalService: NgbModal, private adminService:AdminServiceService) { }

  public contentHeader: object

  ngOnInit(): void {
    this.allTicket();
    this.contentHeader = {
      headerTitle: 'Ticket',
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
            name: 'ticket',
            isLink: false
          }
        ]
      }
    }
  }
  selectStatus(event:any){
    this.Status = event.target.value;
    this.allTicket();
  }

  allTicket(){
    this.adminService.getAllTickets(this.Status).subscribe((data:any)=>{
      this.ticketList = data.items;
      this.allTickets = this.ticketList 
    });
  }

  viewDetails(ticketData:any){
    this.ticketData = ticketData
    this.isShow = true;
   }
   
  closeDetails(){
    this.isShow= false;
   }

  filterUpdate(event: any) {
     const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.allTickets.filter(function (d) {

      return d.ticketId?.toLowerCase().indexOf(val) !== -1 || d.issue?.toLowerCase().indexOf(val) !== -1 || !val;
    });



    // update the rows
    this.ticketList = this.rows;

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
}

 
 