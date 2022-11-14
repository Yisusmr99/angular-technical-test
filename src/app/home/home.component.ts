import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet'; 

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 12,
    center: { lat: -33.436946, lng: -70.634387 }
  }

  marcas: any


  constructor() {
    this.marcas = [] 
  }

  ngOnInit(): void {
  }

  initMarkers($event: any = null, $marcas: any = null) {
    
    let initialMarkers = [];

    if ($event) {
      let {lat, lng} = $event
      const now = new Date();
      let newPosition = {
        position: { lat:lat, lng:lng, date: now.toLocaleString() },
        draggable: false
      }
      initialMarkers.push(newPosition)
      this.marcas.push(newPosition)
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
      .on('click', (event) => this.markerClicked(event, index));
      
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    this.initMarkers($event.latlng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  removeMark($marca: any){
    
    this.map.removeLayer(this.markers[$marca]);
    this.marcas.splice($marca, 1);
    this.markers.splice($marca, 1);
    
  }

}
