import React from 'react';
//import GoogleMapReact from 'google-map-react';

export default class Pins extends React.Component{

   constructor(props){
      super(props)

      this.getLocation = this.getLocation.bind(this);
   }

   componentDidMount(){

   }

   getLocation(){
      return console.log(`Lat: ${this.props.lat} Lng: ${this.props.lng}`)
   }

   render(){
      //const Pin = ({ text }) => <div onClick={console.log(this.props)}>{text}</div>;

      return (
         <div onClick={()=> this.getLocation()}>{this.props.text}</div>
      )  
   }
}
