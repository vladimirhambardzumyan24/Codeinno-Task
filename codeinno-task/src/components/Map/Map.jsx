import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { getRestaurantData } from "../../helper/localStorage";

export default function Map({ id }) {
  const [data] = useState(getRestaurantData());
  const [lat, setLat] = useState(40.722216);
  const [lng, setLng] = useState(-73.987501);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (data && id) {
      const restaurantData = data.filter((item) => item.id === id);
      setLng(restaurantData[0].latlng.lng);
      setLat(restaurantData[0].latlng.lat);
      setZoom(14);
    }
  }, [id, data]);

  const renderMarkers = (map, maps) => {
    if (data) {
      data.map((marker) => {
        return new maps.Marker({
          position: { lat: marker.latlng.lat, lng: marker.latlng.lng },
          map,
          title: marker.name,
        });
      });
    }
  };

  return (
    <div className="w-1/2">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDzHPuu2lfMncXceMe7uIvcd7g2ZhKlBy0",
          language: "en",
        }}
        zoom={zoom}
        center={{
          lat,
          lng,
        }}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      ></GoogleMapReact>
    </div>
  );
}
