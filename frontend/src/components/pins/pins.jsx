import React from 'react';
//import GoogleMapReact from 'google-map-react';

export default class Pins extends React.Component{
   componentDidMount(){
   }


   getLocation(){
      return console.log(`Lat: ${this.props.lat} Lng: ${this.props.lng}`)
   }

   render(){
      
      return (
         <div onClick={()=> this.getLocation()}>{this.props.text}</div>
      )  
   }
}
