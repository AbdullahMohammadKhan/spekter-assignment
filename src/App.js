import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import CurrentLocation from "./Map";

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      value: "",
      location: "",
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {
    console.log(this.state.location, this.state.name);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker
          onClick={this.onMarkerClick}
          name={
            <form>
              <label>
                Location:
                <input
                  type="text"
                  value=""
                  name="location"
                  placeholder="Your Location"
                  onChange={this.handleChange}
                />
              </label>
              <br></br>
              <label>
                Name:
                <input
                  type="text"
                  value=""
                  name="name"
                  placeholder="Your Name"
                  onChange={this.handleChange}
                />
              </label>
              <br></br>
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
          }
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAgB3236yfjDR020ozlgZSu2BCi8VhveSk",
})(MapContainer);
