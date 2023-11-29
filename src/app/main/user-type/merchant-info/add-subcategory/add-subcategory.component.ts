import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://your-url.com';
@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  constructor() { }

  public contentHeader: object

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Order History',
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
            name: 'Merchant',
            isLink: true,
            link: '/userType/merchant'
          },
          {
            name: 'Menu',
            isLink: true,
            link: '/userType/menu'
          },
          {
            name: 'Add Sub Categories',
            isLink: false
          }
        ]
      }
    }
  }

}

