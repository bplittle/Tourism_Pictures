var Index = React.createClass({

  getInitialState: function() {
    return {
      pictures: [],
      provider: '',
      city: '',
      map: false,
      markers: [],
    };
  },

  clearState(value) {
    let newState = {};
    newState[value] = '';
    this.setState(newState, this.getPictures);
    if(value = 'city') {
      this.state.map.setZoom(1);
      this.state.map.panTo([0, 0]);
    }
  },

  citySelect(e) {
    this.setState({city: e.target.value}, this.getPictures);
    let city = this.props.cities.find(c => c.id == e.target.value);
    this.state.map.setZoom(5);
    var latlng = new google.maps.LatLng(city.location[0],city.location[1]);
    this.state.map.panTo(latlng);
  },

  providerSelect(e) {
    this.setState({provider: e.target.value}, this.getPictures);
  },

  getPictures() {
    let city_id = this.state.city;
    let provider_id = this.state.provider;
    let pictures = this.props.pictures.filter(pic => {
      if(this.state.provider && this.state.city) { return pic.city_id == city_id && pic.provider_id == provider_id; }
      else if(this.state.provider) {return pic.provider_id == provider_id}
      else if(this.state.city) {return pic.city_id == city_id}
      else {return [];}
    });
    this.setState({pictures: pictures}, this.setMarkers);
  },

  render() {
    return (
      <div>
        <div className="col-xs-6">
          <label>City <span className="italics clickable" onClick={this.clearState.bind(this, 'city')}> (Clear) </span></label>
          <select value={this.state.city} onChange={this.citySelect} className="form-control">
            <option value="" disabled>Select a city</option>
            {this.props.cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
          </select>
        </div>
        <div className="col-xs-6">
          <label>Traveller <span className="italics clickable" onClick={this.clearState.bind(this, 'provider')}> (Clear)</span></label>
          <select value={this.state.provider} onChange={this.providerSelect} className="form-control">
            <option value="" disabled>Select a traveller</option>
            {this.props.providers.map(provider => <option key={provider.id} value={provider.id}>{provider.username}</option>)}
          </select>
        </div>
        <br></br>
        {this.state.pictures.map(pic => <p>{pic.title}</p>)}
        <br></br>
        <br></br>
        <div id="map-canvas"></div>
      </div>
    );
  },

  setMarkers() {
    this.state.markers.forEach(marker => marker.setMap(null) );

    let instagrams = JSON.parse(JSON.stringify(this.state.pictures));
    let map = this.state.map;
    var markers = [];
    instagrams.forEach(ig => {
      var latlng = new google.maps.LatLng(ig.location[0],ig.location[1]);

      var marker = new google.maps.Marker({
          position: latlng,
          // draggable: true,
          animation: google.maps.Animation.DROP,
          map: map,
          title: 'PLACEHOLDER TITLE'
      });
      var content = '<div id="content"><p id="firstHeading" class="firstHeading">' + ig.title + '</p></div>';
      var contentWindow = new google.maps.InfoWindow({content: content});

      function toggleBounce() {
        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        };
      };
      google.maps.event.addListener(marker, 'click', function() {
        contentWindow.open(map, marker);
      });
      markers.push(marker);
      // google.maps.event.addListener(someMarker, 'click', toggleBounce, someInstagram);
    }); // end of forEach
    this.setState({markers: markers});
  },

  componentDidMount() {
    var myLatlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      zoom: 1,
      center: myLatlng,
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.setState({map: map}, this.setMarkers);


  }// end of afterDOM
});
