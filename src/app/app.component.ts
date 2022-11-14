import { Component } from '@angular/core';
import * as Leaflet from 'leaflet'; 

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 14,
    center: { lat: -33.436946, lng: -70.634387 }
  }

  initMarkers($event: any = null) {

    const initialMarkers = [
      {
        position: { lat: -33.436946, lng: -70.634387  },
        draggable: true
      },
      {
        position: { lat: -33.432589035808554, lng: -70.61245145605973  },
        draggable: true
      }
    ];

    if ($event) {
      let {lat, lng} = $event
      let newPosition = {
        position: { lat:lat, lng:lng },
        draggable: true
      }
      initialMarkers.push(newPosition)
    }

    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
    
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
    this.initMarkers($event.latlng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 
}
