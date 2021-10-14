import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { mapsKey } from '../../config/mapsAPI';
import Modal from '../modals/modal';

export default class Home extends React.Component{
   constructor(props){
      super(props)
      
      // The map and collection of related objects/collection. Pins is only used for debugging. 
      // this.markers contains the collection of actual markers representing events.
      this.map = null;
      this.pins = [];
      this.markers = [];
      this.infoWindow = null;
      this.mousePos = {
         lat: 0,
         lng: 0,
      };

      // Google Maps API loader uses the current component's React state to determine map options.
      this.loader = null;

      this.state = {
         center: {
            lat: 0,
            lng: 0
         },
         zoom: 11, // Hard coded default zoom value, free free to change. Lower number less zoom.
         pins: this.pins // These pins are only used for debugging
      }
      
      // Get google from the window
      this.google = window.google;

      // Only draw event markers on initial load and when added. All subsequent markers will be placed when a new marker is instantiated.
      this.eventsLoaded = false;
      this.prevEvents = this.props.events;

      // Bindings 
      this.drop = this.drop.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.placeDebugPins = this.placeDebugPins.bind(this);
   }

   // Google maps loader
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
            this.addEvent();
         })
         .catch(e => {
            // Do error handling
         });
      
   }

   componentDidUpdate() {
      if (this.prevEvents !== this.props.events){
         this.drop(); 
         this.eventsLoaded = true;
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

   // Add random Pins around your location for debugging
   placeDebugPins(pos){
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
   addEvent(){
      this.map.addListener("click", (mapsMouseEvent) => {
         this.mousePos.lat = mapsMouseEvent.latLng.lat();
         this.mousePos.lng = mapsMouseEvent.latLng.lng();
         this.props.openModal();
      });
   }

   drop(){
      // This block is only used to show debug pins on the map. Will show nothing if this.pins is empty
      for (let i = 0; i < this.pins.length; i++) {
         this.pins[i].title = "Debug";
         this.addMarkerWithTimeout(this.pins[i], i * 20);
      }

      const events = this.props.events;
      let i = 0;
      for (let event in events) {
         if (!this.prevEvents[event]){
            const pin = events[event];
            this.addMarkerWithTimeout(pin, i*20);
            i++;
         }
      }
   }

   // Spawns markers on the map with a delayed animation inbetween.
   addMarkerWithTimeout(pin, timeout) {
      window.setTimeout(() => {
         const marker = new this.google.maps.Marker({
            position: {
               lat: parseFloat(pin.mapLat.$numberDecimal),
               lng: parseFloat(pin.mapLng.$numberDecimal),
            },
            map: this.map,
            animation: this.google.maps.Animation.DROP,
            label: pin.title[0],
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

   clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
   }

   render(){
      return (
         
         <div id='map' style={{ height: '100vh', width: '100%' }} >
            <Modal pos={this.mousePos}/>
         </div>
      )
   }
}