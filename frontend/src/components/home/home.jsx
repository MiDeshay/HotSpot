import React from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import PinsContainer from '../pins/pins_container';
import { mapsKey } from '../../config/mapsAPI'


const mapsAPI = "AIzaSyAeXRSAV1JrrCUr6yNP1gXdVUN72cz5Egc";
export default class Home extends React.Component{


export default class Home extends React.Component{
   constructor(props){
      super(props)
      
      // Animations for pin dropping.
      this.map = null;
      this.pins = [];
      this.markers = [];
      
      // Google Maps API loader uses state to determine map options.
      this.loader = null;

      this.state = {
         center: {
            lat: 0,
            lng: 0
         },
         zoom: 11,
         pins: this.pins
      }
      this.google = window.google;

      // Bindings 
      this.drop = this.drop.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.addEventPlaceMarker = this.addEventPlaceMarker.bind(this);
   }

   componentDidMount(){
      this.loader = new Loader({
         apiKey: mapsKey,
         version: "weekly",
         libraries: ["places"],
      })

      this.loader
         .load()
         .then((google) => {
            this.google = window.google;
            this.map = new google.maps.Map(document.getElementById("map"), this.state);
            this.getLocation();
            
            // Init event handlers
            this.addEventPlaceMarker();
         })
         .catch(e => {
            // Do error handling
         });
      this.drop();
      
      
   }

   addEventPlaceMarker(){
      this.map.addListener("click", (mapsMouseEvent) => {
         let position = {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng(),
         }

         this.markers.push(
            new this.google.maps.Marker({
               position: position,
               map: this.map,
               animation: this.google.maps.Animation.DROP,
            })
         );
      })
   }

   componentDidUpdate() {
      if (this.pins.length !== 0) this.drop();
   }

   getLocation() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition( pos => {
            this.setState({
               center: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
               }
            })
            this.map.setCenter(this.state.center)

            // Pins added for debugging
            let sign = -1;
            for (let i = 0; i < 15; i++){
               let lat = pos.coords.latitude + (Math.random() * 0.2 * sign);
               let lng = pos.coords.longitude + (Math.random() * 0.2 * sign);
               sign *= -1;
               this.pins.push({lat, lng});
            }
            this.setState({
               pins: this.pins
            })
            
         });
      } else { 
         // Improve error messages later
      }
   }

   drop(){
      this.clearMarkers();
      for (let i = 0; i < this.pins.length; i++) {
         this.addMarkerWithTimeout(this.pins[i], i * 20);
      }
   }

   clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
   }

   // Spawns markers on the map with a delayed animation inbetween.
   addMarkerWithTimeout(position, timeout) {
      window.setTimeout(() => {
         this.markers.push(
            new this.google.maps.Marker({
               position: position,
               map: this.map,
               animation: this.google.maps.Animation.DROP,
             })
         );
      }, timeout);
   }

   render(){
      return (
         <div id='map' style={{ height: '100vh', width: '100%' }} >
      
         </div>
      )  
   }
}