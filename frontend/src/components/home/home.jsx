import React from 'react';
import GoogleMapReact from 'google-map-react';
import PinsContainer from './pins_container';

const mapsAPI = "AIzaSyBvn9RZTw5O6r1sV18x8gnvKztsRicJLxk";
export default class Home extends React.Component{

   constructor(props){
      super(props)

      this.center = {
         lat: -34.397, 
         lng: 150.644 
      }
      this.zoom = 11;
      this.handleApiLoaded = this.handleApiLoaded.bind(this);
   }

   componentDidMount(){
   }

   handleApiLoaded(map, maps){
      return;
   }

   render(){
      const Pin = ({ text }) => <div onClick={console.log(this.props)}>{text}</div>;

      return (
         <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: mapsAPI }}
               defaultCenter={this.center}
               defaultZoom={this.zoom}
               yesIWantToUseGoogleMapApiInternals
               onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
               <PinsContainer
                  lat={-34.397}
                  lng={150.644}
                  text="My Marker"
                  
               />
            </GoogleMapReact>
         </div>
      )  
   }
}