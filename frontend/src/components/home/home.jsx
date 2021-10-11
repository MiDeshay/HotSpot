import React from 'react';
import GoogleMapReact from 'google-map-react';
import PinsContainer from '../pins/pins_container';

const mapsAPI = null;
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
      //this.handleApiLoaded = this.handleApiLoaded.bind(this);   
   }

   componentDidMount(){
      this.getLocation();
   }

   // handleApiLoaded(map, maps){
   //    return;
   // }

   getLocation() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition( pos => {
            this.setState({
               lat: pos.coords.latitude,
               lng: pos.coords.longitude
            })
         });
      } else { 
         // Improve error messages later
      }
   }

   render(){

      return (
         <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: mapsAPI }}
               center={this.state}
               zoom={this.zoom}
               yesIWantToUseGoogleMapApiInternals
               //onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
               <PinsContainer
                  lat={this.state.lat}
                  lng={this.state.lng}
                  text="My Marker"
                  
               />
            </GoogleMapReact>
         </div>
      )  
   }
}