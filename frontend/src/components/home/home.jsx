import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { mapsKey } from '../../config/keys';
import Modal from '../modals/modal';



export default class Home extends React.Component{
   constructor(props){
      super(props)

      // The map and collection of related objects/collection. 
      // this.markers contains the collection of actual markers representing events.
      this.map = null;
      this.markers = {}; // The list of marker objects created from currentEvents. These are references to the marker object directly created by google maps API.
      this.infoWindow = null;
      this.mousePos = {
         lat: 0,
         lng: 0,
      };

      this.selectedEvent = {
         event: null,
         marker: null,
      };

      // Google Maps API loader uses the current component's React state as map options.
      this.loader = null;
      this.state = {
         center: {
            lat: 0,
            lng: 0
         },
         clickableIcons: false,
         zoom: 11, // Hard coded default zoom value, free free to change. Lower number less zoom.
         pins: this.pins, // These pins are only used for debugging
         currentEvents: {}, // This will be the list of events that are currently marked on the map. Used for drawing markers.
      }
      // Get google from the window
      this.google = window.google;

      // Only draw event markers on initial load and when added. All subsequent markers will be placed when a new marker is instantiated.
      this.eventsLoaded = false;
      // Bindings
      this.drop = this.drop.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
      this.clearMarkers = this.clearMarkers.bind(this);
      this.addEvent = this.addEvent.bind(this);
      this.initMarkerWindow = this.initMarkerWindow.bind(this);

      this.eventRespondButton = "";
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

         this.props.fetchUsers()
   }

   componentDidUpdate() {
      if (this.state.currentEvents !== this.props.events){
         this.drop();
         this.eventsLoaded = true;
         this.setState({
            currentEvents: this.props.events,   
         })
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
         });
      } else {
         // Improve error messages later
      }
   }

   // Place a marker at cursor position
   addEvent(){
      this.map.addListener("click", (mapsMouseEvent) => {
         this.mousePos.lat = mapsMouseEvent.latLng.lat();
         this.mousePos.lng = mapsMouseEvent.latLng.lng();
         this.props.openCreate();
      });
   }

   // Uses this.state.currentEvents to determine whether to draw a new marker or not.
   // Iterates through events prop, if an event is found to not be in state.currentEvents,
   // add a new marker with that event's details.
   drop(){
      const events = this.props.events;
      for (let event in events) {
         let i = 0;
         let userGroups = this.props.user.groupsJoined;

         if (!this.state.currentEvents[event] && userGroups.includes(events[event].group._id)){
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
         this.markers[marker.eventDetails._id] = marker;
      }, timeout);
   }

   // Initialize a maps marker with html and event listeners.
   initMarkerWindow(marker) {
      let eventId = marker.eventDetails._id;
      let joinButton = `<button id='event-respond' class='button'>Join</button>`; 
      let leaveButton = `<button id='event-respond' class='button'>Leave</button>`; 
      
      marker.addListener("click", () => {
         console.log(this.props.events[eventId]);
         this.infoWindow.setContent(
            `<div class='info-window'> `+
               `<div class='event-header'>`+
                  `<h1 class='event-title'>${marker.eventDetails.title}</h1>` +
                  `<div class='event-buttons'> ` +
                     (marker.eventDetails.hostEmail !== this.props.user.email ? 
                        (this.props.events[eventId].attendeesEmail.includes(this.props.user.email)? leaveButton : joinButton )
                        :
                        `<button id='event-edit' class='button'>Edit</button>` +
                        `<button id='event-delete' class='button'>Delete</button>`  
                     ) +
                  `</div>` +
               `</div>` +
                  `<p class='event-text'>${marker.eventDetails.description}</p>` +
                  `<p class='event-text'>${marker.eventDetails.address}</p>` +
                  `<p class='event-text'>${marker.eventDetails.city}</p>` +
                  `<p class='event-text'>Begin: ${marker.eventDetails.startDate}</p>` +
                  `<p class='event-text'>End: ${marker.eventDetails.endDate}</p>` +

            '</div>'
         );

         // Event handlers for buttons in info window.
         // Delete button and Edit button dispatches their respective action using the marker's information
         this.google.maps.event.addListener(this.infoWindow, "domready", () => {
            let deleteButton = document.getElementById('event-delete');
            if (deleteButton) deleteButton.onclick = () => {
               this.props.deleteEvent(eventId)
               this.markers[eventId].setMap(null);
               delete this.markers[eventId];
            }

            let editButton = document.getElementById('event-edit');
            if (editButton) editButton.onclick=() => {
               this.selectedEvent = {
                  event: marker.eventDetails,
                  marker: this.markers[eventId],
                  infoWindow: this.infoWindow,
               }
               this.props.openUpdate();
            }

            let respondButton = document.getElementById('event-respond');
            if (respondButton) respondButton.onclick=() => {
               if (respondButton.innerHTML === 'Join'){
                  this.props.joinEvent(eventId, {email: this.props.user.email});
                  respondButton.innerHTML = 'Leave';
               } else {
                  this.props.declineEvent(eventId, {email: this.props.user.email});
                  respondButton.innerHTML = 'Join';
               }
            }
         });

         this.infoWindow.open({
            anchor: marker,
            map: this.map,
            shouldFocus: false,
          });
      })
   }

   clearMarkers() {
      for (let id in this.markers) {
         this.markers[id].setMap(null);
      }
      this.markers = {};
   }

   render(){
      return (
         <div id='map'>
            <Modal pos={this.mousePos} event={this.selectedEvent} />
         </div>
      )
   }
}