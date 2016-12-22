var Index = React.createClass({

  getInitialState: function() {
    let presetCity = this.props.cities.find(city => window.location.href.indexOf(city.name) > -1);
    let presetPictures = presetCity ? this.props.pictures.filter(pic => pic.city_id === presetCity.id) : [];
    let presetProviders = presetCity ? this.props.providers.filter(provider => provider.home_city === presetCity.id) : [];

    return {
      pictures: presetPictures,
      providers: presetProviders,
      city: presetCity,
      map: false,
      markers: [],
      infoWindow: new google.maps.InfoWindow(),
    };
  },

  // clearState(value) {
  //   let newState = {};
  //   newState[value] = '';
  //   this.setState(newState, this.getPictures);
  //   if(value = 'city') {
  //     this.state.map.setZoom(1);
  //     this.state.map.panTo([0, 0]);
  //   }
  // },

  citySelect(city) {
    this.setState({city: city}, this.getProviders);
    this.state.map.setZoom(5);
    var latlng = new google.maps.LatLng(city.location[0],city.location[1]);
    this.state.map.panTo(latlng);
  },

  getProviders() {
    let providers = this.props.providers.filter(p => p.city_id === this.state.city.id);
    this.setState({providers: providers}, this.getPictures)
  },

  getPictures() {
    let city_id = this.state.city.id;
    // let provider_id = this.state.provider;
    let pictures = this.props.pictures.filter(pic => {
      // if(this.state.provider && this.state.city) { return pic.city_id == city_id && pic.provider_id == provider_id; }
      // else if(this.state.provider) {return pic.provider_id == provider_id}
      if(this.state.city) {return pic.city_id == city_id}
      else {return false;}
    });
    this.setState({pictures: pictures}, this.setMarkers);
  },

  render() {
    let cityWidth = 1 / this.props.cities.length * 100;
    let cityStyle = {width: `${cityWidth}%`};
    let citySummary = this.state.city ? <div className="city-summary col-xs-12"><h2>{this.state.city.name}</h2>{this.state.city.description}</div> : '';
    let featuredPics = this.state.pictures.map( (pic, index) => {
      if(index < 3) {
        return <div className="col-xs-4 featured-image"><img src={pic.url}></img></div>
      }
    });
    return (
      <div>
        <div className="page-header">
          {this.props.cities.map(city => <a href={`#${city.name}`} className="city-link" key={city.id} onClick={this.citySelect.bind(this, city)} style={cityStyle}>{city.name}</a>)}
        </div>
        <div className="container">
          {citySummary}
          {featuredPics}
          <div id="map-canvas" className="col-sm-8"></div>
          <div className="col-sm-4 providers">
            {this.state.providers.map(provider => <div key={provider.id}>{provider.name}</div>)}
          </div>
        </div>
      </div>
    );
  },

  setMarkers() {
    var that = this;
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
      var content = '<div id="content"><p id="firstHeading" class="firstHeading">' + ig.title + '</p><img class="marker-img" src="' + ig.url + '"></img></div>';

      function toggleBounce() {
        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        };
      };
      google.maps.event.addListener(marker, 'click', function() {
        that.state.infoWindow.setContent(content);
        that.state.infoWindow.open(map, marker);
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
