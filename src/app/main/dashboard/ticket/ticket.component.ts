import { Component, OnInit,ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  showticketfirsttime:boolean=true;
  allTickets: any;
  ticketDetails: any;
  noDataFound:any
  constructor(private modalService: NgbModal, private adminService:AdminServiceService,private spinner: NgxSpinnerService) { }

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
            name: 'Ticket',
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
    this.spinner.show();
    this.adminService.getAllTickets(this.Status).subscribe((data:any)=>{
      this.spinner.hide();
      if (!data.status) {
        this.noDataFound=data.message;
      }
      this.allTickets = data.items;
      this.ticketList  = this.allTickets
      
    });
  }

  viewDetails(ticketData:any){
    this.ticketData = ticketData
    this.isShow = true;
    this.showticketfirsttime=false;
   }
   
  closeDetails(){
    this.isShow= false;
   }


 
  onActivate(event: any) {
    // console.log('Activate Event', event.type);
  }
  viewDetailsTicket(ticketid:any){
 /*    console.log( this.showticketfirsttime)
    console.log(ticketid); */
    
    this.showticketfirsttime=false;
    // this.allTicket()
    this.adminService.ViewTicketDetails(ticketid).subscribe((data: any) => {
      this.ticketDetails = data.items;
    });
  }
}

 
 