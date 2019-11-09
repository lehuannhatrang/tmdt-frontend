import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const mapStyles =
    {
        height: "420px",
        width: "85%",
    }
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
    if (!this.props.google) {
      return <div>Loading map...</div>;
    }
    return (
        <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: 10.773328, lng: 106.659425}}
            >
            <Marker position={{ lat: 10.773328, lng: 106.659425}} />
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
  v: "3"
})(MapContainer);