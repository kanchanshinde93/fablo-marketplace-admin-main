import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  progressValue = 50;
  constructor() { }
  public contentHeader: object

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Users',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [ 
          {
            name: 'Users',
            isLink: true,
            link: '/dashboard/users'
          }
        ]
      }
    }
  }

}
