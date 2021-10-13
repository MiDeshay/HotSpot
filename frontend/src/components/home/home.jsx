import React from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { mapsKey } from '../../config/mapsAPI'

export default class Home extends React.Component{
   constructor(props){
      super(props)
      
      // The map and collection of related objects/collection. Pins is only used for debugging. 
      // this.markers contains the collection of actual markers representing events.
      this.map = null;
      this.pins = [];
      this.markers = [];
      this.infoWindow = null;

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
      
      // Get google from the window
      this.google = window.google;

      // Only redraw pins if different from previous set 
      this.prevEvents = this.props.events;

      // Bindings 
      this.drop = this.drop.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.addEventPlaceMarker = this.addEventPlaceMarker.bind(this);
      this.placeDebugPins = this.placeDebugPins.bind(this);
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
            this.infoWindow = new google.maps.InfoWindow({
               content: "No description provided.",
            });
            this.props.getEvents();
            // Init event handlers
            this.addEventPlaceMarker();
         })
         .catch(e => {
            // Do error handling
         });
      
   }

   componentDidUpdate() {
      if (this.prevEvents !== this.props.events){
         this.drop(); 
         this.prevEvents = Object.assign({}, this.props.events);
      }
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
            //this.placeDebugPins(pos);
         });
      } else {
         // Improve error messages later
      }
   }

   placeDebugPins(pos){
      // Add random Pins around your location for debugging
      let sign = -1;
      for (let i = 0; i < 5; i++){
         let lat = pos.coords.latitude + (Math.random() * 0.2 * sign);
         let lng = pos.coords.longitude + (Math.random() * 0.2 * sign);
         sign *= -1;
         this.pins.push({lat, lng});
      }
      this.setState({
         pins: this.pins
      })
   }

   // Place a marker at cursor position
   addEventPlaceMarker(){
      this.map.addListener("click", (mapsMouseEvent) => {
         let pin = {
            location :{
               lat: mapsMouseEvent.latLng.lat(),
               lng: mapsMouseEvent.latLng.lng(),
            }
         }
         this.addMarkerWithTimeout(pin, 1);
      });
   }

   drop(){
      this.clearMarkers();

      // This for block is only used to show debug pins on the map. Will show nothing if this.pins is empty
      for (let i = 0; i < this.pins.length; i++) {
         this.pins[i].title = "Debug";
         this.addMarkerWithTimeout(this.pins[i], i * 20);
      }

      const events = this.props.events;
      let i = 0;
      for (let event in events) {
         const pin = events[event];
         pin.location = {
            lat: parseFloat(events[event].mapLat.$numberDecimal),
            lng: parseFloat(events[event].mapLng.$numberDecimal)
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
      window.setTimeout(() => {
         const marker = new this.google.maps.Marker({
            position: pin.location,
            map: this.map,
            animation: this.google.maps.Animation.DROP,
            label: pin.title,
         })
         marker.eventDetails = pin;

         marker.addListener("click", () => {
            this.infoWindow.setContent(marker.eventDetails.description);
            this.infoWindow.open({
               anchor: marker,
               map: this.map,
               shouldFocus: false,
             });
         })

         this.markers.push(marker);
      }, timeout);
   }

   render(){
      return (
         <div id='map' style={{ height: '100vh', width: '100%' }} >

         </div>
      )
   }
}