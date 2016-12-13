var Index = React.createClass({

  render() {
    return (
      <div>
        <p>images</p>
        <div id="map-canvas"/>
      </div>
    );
  },

  componentDidMount() {
    var myLatlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      zoom: 1,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    let instagrams = JSON.parse(JSON.stringify(this.props.pictures));

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
      // google.maps.event.addListener(someMarker, 'click', toggleBounce, someInstagram);
    }); // end of forEach


  }// end of afterDOM
});
