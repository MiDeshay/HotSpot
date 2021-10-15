import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { mapsKey } from '../../config/keys';
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
      this.prevUserState = this.props.user;
      // Bindings 
      this.drop = this.drop.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.placeDebugPins = this.placeDebugPins.bind(this);
      this.initMarkerWindow = this.initMarkerWindow.bind(this);
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

   componentWillUnmount(){
      this.props.clearEvents();
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
      for (let event in events) {
         let i = 0;
         let userGroups = this.props.user.groupsJoined;
         // console.log("Event Id: " + events[event].group._id);
         // console.log(userGroups)
         if (!this.prevEvents[event] && userGroups.includes(events[event].group._id)){
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
         this.initMarkerWindow(marker);
         this.markers.push(marker);
      }, timeout);
   }

   // Initialize a maps marker with html and event listeners.
   initMarkerWindow(marker) {
      // Temporary until events route is updated. ------------------------
      if (!marker.eventDetails.hostEmail) marker.eventDetails.hostEmail = marker.eventDetails.host.email;
      // -----------------------------------------------------------------
      marker.addListener("click", () => {
         this.infoWindow.setContent(
            `<div class='info-window'> `+
               `<h1 class='event-title'>${marker.eventDetails.title}</h1>` +
               `<p class='event-text'>${marker.eventDetails.description}</p>` + 
               `<p class='event-text'>${marker.eventDetails.address}</p>` +
               `<p class='event-text'>${marker.eventDetails.city}</p>` +
               `<p class='event-text'>${marker.eventDetails.startDate}</p>` +
               `<p class='event-text'>${marker.eventDetails.endDate}</p>` +
         
               (marker.eventDetails.hostEmail !== this.props.user.email ? "" : 
                  `<div class='event-buttons'> ` +
                     `<button id='event-edit'>Edit</button>` +
                     `<button id='event-delete'>Delete</button>`  +
                  `</div>` 
               ) +
            '</div>'
         );
         // Event handlers for buttons in info window.
         this.google.maps.event.addListener(this.infoWindow, "domready", () => {
            let deleteButton = document.getElementById('event-delete'); 
            if (deleteButton) deleteButton.onclick=this.clearMarkers;
         });

         this.infoWindow.open({
            anchor: marker,
            map: this.map,
            shouldFocus: false,
          });
      })
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