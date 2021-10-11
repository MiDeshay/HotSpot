import React from 'react';
import GoogleMapReact from 'google-map-react';

const mapsAPI = "AIzaSyBvn9RZTw5O6r1sV18x8gnvKztsRicJLxk";
export default class Home extends React.Component{
   constructor(props){
      super(props)
   }

   componentDidMount(){

   }

   render(){
      
      let api = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBvn9RZTw5O6r1sV18x8gnvKztsRicJLxk&q=Eiffel+Tower,Paris+France` ;
      return (
         <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: mapsAPI }}
               defaultCenter={this.props.center}
               defaultZoom={this.props.zoom}
            >
               <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
               />
            </GoogleMapReact>
         </div>
      )  
   }
}

{/* <iframe title='yolo' width="1500" height="700" frameborder="0" 
   src={api} allowfullscreen="">
</iframe> */}