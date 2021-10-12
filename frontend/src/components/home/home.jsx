import React from 'react';
import GoogleMapReact from 'google-map-react';
import PinsContainer from '../pins/pins_container';

const mapsAPI = "AIzaSyBN9X253aM9oxuU80falN4ijQxxbeutSyE";
export default class Home extends React.Component{

   constructor(props){
      super(props)

      this.lat = 0;
      this.lng = 0;
      this.zoom = 11;
      this.state = ({
         lat: this.lat,
         lng: this.lng
      })

      this.getLocation = this.getLocation.bind(this);
      this.map = null;
      this.maps = null;
      this.pins = [];
      this.markers = [];
      this.drop = this.drop.bind(this);
      this.handleApiLoaded = this.handleApiLoaded.bind(this);   
      this.addMarkerWithTimeout = this.addMarkerWithTimeout.bind(this);
   }

   componentDidMount(){
      this.getLocation();
      this.drop();
   }

   componentDidUpdate(){
      
   }

   handleApiLoaded({map, maps}){
      this.map = map;
      this.maps = maps;
   }

   getLocation() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition( pos => {
            this.setState({
               lat: pos.coords.latitude,
               lng: pos.coords.longitude
            })

            for (let i = 0; i < 15; i++){
               let sign = -1;
               let lat = pos.coords.latitude + (Math.floor(Math.random() * .30 * sign));
               let lng = pos.coords.longitude + (Math.floor(Math.random() * .30 * sign));
               this.pins.push( Object.assign({}, {lat, lng}));
            }
            
         });
      } else { 
         // Improve error messages later
      }
   }

   drop(){
      for (let i = 0; i < this.pins.length; i++) {
         console.log(this.pins);
         this.addMarkerWithTimeout(this.pins[i], i * 200);
      }
   }

   addMarkerWithTimeout(position, timeout) {
      window.setTimeout(() => {
         
         this.markers.push(
            new this.maps.Marker({
               position: position,
               map: this.map,
               animation: this.maps.Animation.DROP,
            })
         );
      }, timeout);
   }

   render(){
      console.log(this.pins);
      return (
         <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: mapsAPI }}
               center={this.state}
               zoom={this.zoom}
               yesIWantToUseGoogleMapApiInternals
               onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
               <PinsContainer
                  lat={this.state.lat}
                  lng={this.state.lng}
               />
               
            </GoogleMapReact>
         </div>
      )  
   }
}