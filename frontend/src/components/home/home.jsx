import React from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { mapsKey } from '../../config/mapsAPI'

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
         zoom: 11, // Hard coded default zoom value, free free to change
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

      // Once maps is loaded, do any actions involving map after .then
      this.loader
         .load()
         .then((google) => {
            this.google = window.google;
            this.map = new google.maps.Map(document.getElementById("map"), this.state);
            this.getLocation();
            
            this.props.getEvents();
            // Init event handlers
            this.addEventPlaceMarker();
         })
         .catch(e => {
            // Do error handling
         });
      
   }

   componentDidUpdate() {
      //if (this.pins.length !== 0) this.drop();
      if (Object.keys(this.props.events).length !== 0) this.drop();
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
            // let sign = -1;
            // for (let i = 0; i < 5; i++){
            //    let lat = pos.coords.latitude + (Math.random() * 0.2 * sign);
            //    let lng = pos.coords.longitude + (Math.random() * 0.2 * sign);
            //    sign *= -1;
            //    this.pins.push({lat, lng});
            // }
            // this.setState({
            //    pins: this.pins
            // })
            
         });
      } else { 
         // Improve error messages later
      }
   }

   // Place a marker at cursor position
   addEventPlaceMarker(){
      this.map.addListener("click", (mapsMouseEvent) => {
         let position = {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng(),
         }

         this.markers.push(
            new this.google.maps.Marker({
               animation: this.google.maps.Animation.DROP,
               position: position,
               map: this.map,
            })
         );
      });
   }

   drop(){
      this.clearMarkers();
      // for (let i = 0; i < this.pins.length; i++) {
      //    this.addMarkerWithTimeout(this.pins[i], i * 20);
      // }
      const events = this.props.events;
      let i = 0;
      for (let event in events) {
         let pin = {
            location: events[event].location,
            title: events[event].title
         }
         this.addMarkerWithTimeout(pin, i*20);
         i++;
      }
   }

   clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
   }

   // Spawns markers on the map with a delayed animation inbetween.
   addMarkerWithTimeout(pin, timeout) {
      console.log(pin.location);
      window.setTimeout(() => {
         this.markers.push(
            new this.google.maps.Marker({
               position: pin.location,
               map: this.map,
               animation: this.google.maps.Animation.DROP,
               label: pin.title
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