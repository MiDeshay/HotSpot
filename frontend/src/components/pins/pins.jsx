import React from 'react';
//import GoogleMapReact from 'google-map-react';

export default class Pins extends React.Component{

   constructor(props){
      super(props) 

   }

   componentDidMount(){
   }


   getLocation(){
      return console.log(`Lat: ${this.props.lat} Lng: ${this.props.lng}`)
   }

   render(){
      
      return (
         <i className="fas fa-map-pin" onClick={()=> this.getLocation()} 
         style={ {fontSize: "300%",} }></i>
      )  
   }
}
