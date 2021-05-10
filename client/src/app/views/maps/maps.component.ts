import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';
import { Libraries } from './libraries.component.type';
import { Library } from './library.component.type';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  libraries: Libraries;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  constructor(private session: SessionService) {
    this.session.getLibraries( this.session.currentBook?.averageRating).subscribe({
      next: this.handleGetLibraries.bind(this),
      error: this.handleGetLibrariesError,
    });
  }
  handleGetLibraries(data: any) {
    this.libraries = data;
  }

  handleGetLibrariesError(e: string) {
    console.log('handleGetLibrariesError error: ', e);
  }

  zoom = 12
  center: google.maps.LatLngLiteral
  markers = []
  infoContent: String = 'No library selected'
  googleImage: String = 'https://www.relianceorthodontics.com/scs/extensions/SC/Manor/3.1.0/img/no_image_available.jpeg';


  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });

  }

  addMarker() {
    var icon = {
      url: "https://lh3.googleusercontent.com/proxy/AC29xr3dE7ReJAOOi8QGpQe8c-QaynpFsR_yOiltqjJHtC1I0KKBLEON1u--FfTPcf3fz-3gEXEMXfHALMuMAbaqb_v_lPq69w3-rIU", // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng
      },
      label: {
        color: 'red',
        text: "You are here",
      },
      title: "You are here",
      options: {
        animation: google.maps.Animation.DROP,
        icon: icon,
      },
    });

    this.libraries.libraries.forEach(element => {
      this.markers.push({
        position: {
          lat: element.lat,
          lng: element.lng
        },
        label: {
          color: 'red',
          text: element.name,
        },
        title: element.address,
        info: element.phone,
        image: element.image,
        options: {
          animation: google.maps.Animation.DROP,
        },
      })
    });
  }

  openInfo(marker) {
    this.infoContent = marker.label.text+"\n" + marker.title +"\n"+ marker.info;
    this.googleImage = marker.image;
  }
}
