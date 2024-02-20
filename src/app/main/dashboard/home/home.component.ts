import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'app/Services/admin-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import PubNub from "pubnub";
import { MapGeocoder } from '@angular/google-maps';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  ordersList: any;
  outletList: any;
  orderData: any;
  pending: any;
  delivered: any;
  dispatched: any;
  ready: any;
  preparing: any;
  cancelled: any
  notVisible: any;
  visible:any;
  open:any;
  private pubnub;
  closed: any;
  map:google.maps.Map;
marker:google.maps.Marker;
    
    // markers: google.maps.LatLngLiteral[] = [];
   
/*   markers: any[] = [
    {
      position: new google.maps.LatLng(22.7201, 75.8714),
      title: "Marker 1"
    },
    {
      position: new google.maps.LatLng(22.7814,75.9035),
      title: "Marker 2"
    },
    {
      position: new google.maps.LatLng(22.7548,75.8049),
      title: "Marker 2"
    },
    {
      position: new google.maps.LatLng(22.6709, 75.8275),
      title: "Marker 2"
    }
  ]; */
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // mapCenter: google.maps.LatLngLiteral = { lat: 22.7201, lng: 75.8714 };
  // fixedMarkerPosition: google.maps.LatLngLiteral = { lat: 22.7201, lng: 75.8714 };

  // markerPosition: google.maps.LatLngLiteral = this.mapCenter;
  constructor(private adminService: AdminServiceService,private spinner: NgxSpinnerService,geocoder: MapGeocoder) {
   /*  this.pubnub = new PubNub({
      subscribeKey: 'sub-c-e240b078-b657-4d79-84e1-0504adfe3cf8',
      userId: "clientId",
  }); */
  
    // setInterval(() => {
    //   const newLat = this.markerPosition.lat + 0.1; // Example: Increment latitude
    //   const newLng = this.markerPosition.lng + 0.1; // Example: Increment longitude
    //   this.markerPosition = { lat: newLat, lng: newLng };
    // }, 2000); // Update every 2 seconds (example)
  }
   
  public contentHeader: object

  ngOnInit(): void {
  
  /*   this.initMap()
    this.pubnub.addListener({
      message: (message: { message: { latitude: number, longitude: number, userId: string } }) => {
          console.log(message);
          // Check if latitude and longitude are valid numbers
          if (!isNaN(message.message.latitude) && !isNaN(message.message.longitude)) {
              const latLng = new google.maps.LatLng(message.message.latitude, message.message.longitude);
              if (!this.marker) {
                  // If marker doesn't exist, create a new one
                  this.marker = new google.maps.Marker({
                      position: latLng,
                      map: this.map,
                      title: message.message.userId // You can customize the title as needed
                  });
              } else {
                  // If marker exists, update its position
                 this. marker.setPosition(latLng);
              }
             this. map.setCenter(latLng);
          } else {
              console.error('Invalid latitude or longitude values received:', message.message.latitude, message.message.longitude);
          }
      }
    });
    
   this. pubnub.subscribe({
      channels: ['tracking-123456']
    }); */


    this.allCount();
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/dashboard/home'
          }
        ]
      }
    }
  }

/*  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat:  0, lng:0 },
        zoom: 18
    });
   
} */


 /*  initializeMap() {
    const mapOptions = {
      center: this.markers[0].position,
      zoom: 8
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.addMarkers();
  } */

   addMarkers() {
   /*  this.marker.forEach(markerInfo => {
      new google.maps.Marker({
        position: markerInfo.position,
        map: this.map,
        title: markerInfo.title
      });
    }); */
  }
/*   moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
}
move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
} */
/* addMarker(event: google.maps.MapMouseEvent) {
  if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
} */

  allCount() {
    this.spinner.show();
    this.adminService.count().subscribe((data: any) => {
      this.spinner.hide();
      this.ordersList = data.items.order;
      this.outletList = data.items.outlet;
      
      // for Orders
      this.delivered = this.ordersList.filter((item)=>item.status == 'delivered').map((item)=>item.count);
      this.dispatched = this.ordersList.filter((item)=>item.status == 'dispatched').map((item)=>item.count);
      this.ready = this.ordersList.filter((item)=>item.status == 'ready').map((item)=>item.count);
      this.preparing = this.ordersList.filter((item)=>item.status == 'preparing').map((item)=>item.count);
      this.pending = this.ordersList.filter((item)=>item.status == 'pending').map((item)=>item.count);
      this.cancelled = this.ordersList.filter((item)=>item.status == 'cancelled').map((item)=>item.count);
      
      // for outlets
      this.notVisible = this.outletList.filter((item)=>item.type == 'not visible').map((item)=> item.count);
      this.open = this.outletList.filter((item)=>item.type == 'open').map((item)=> item.count);
      this.visible = this.outletList.filter((item)=>item.type == 'visible').map((item)=> item.count);
      this.closed = this.outletList.filter((item)=>item.type == 'closed').map((item)=> item.count);
 });
  }
}
