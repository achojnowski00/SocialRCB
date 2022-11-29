import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Mapa.css";

type MapaType = {
  latitude: number;
  longitude: number;
  id: number;
};

export const Mapa = ({ latitude, longitude, id }: MapaType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqFEMqZuNlQwZzCgOMiNqiZvxEzNEJN9E",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <GoogleMapa id={id} longitude={longitude} latitude={latitude} />;
};

const GoogleMapa = ({ latitude, longitude, id }: MapaType) => {
  // const point = useMemo(() => ({ lat: longitude, lng: latitude }), []);
  return (
    <GoogleMap
      zoom={14}
      center={{ lat: longitude, lng: latitude }}
      mapContainerClassName="map-container"
    >
      {id && <Marker key={id} position={{ lat: longitude, lng: latitude }} />}
    </GoogleMap>
  );
};

// AIzaSyAhOZjcbouxBxwbf2bi80MTdFqBmGqvujk
