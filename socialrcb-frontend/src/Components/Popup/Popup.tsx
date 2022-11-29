import "./Popup.scss";
import { Mapa } from "../Mapa/Mapa";

interface popupType {
  trigger: boolean;
  title: string;
  setTrigger: (trigger: boolean) => void;
  opis: string;
  latitude: number;
  longitude: number;
  id: number;
}

export const Popup = ({
  trigger,
  title,
  opis,
  setTrigger,
  id,
  latitude,
  longitude,
}: popupType) => {
  return trigger ? (
    <div className="popupwrapper">
      <div className="popup">
        <h1 className="popup__title">{title}</h1>
        <p className="popup__content">{opis}</p>
        {longitude !== 0 && latitude !== 0 && (
          <Mapa latitude={latitude} longitude={longitude} id={id} />
        )}
        <button
          className="popup__button popup__button--close"
          onClick={() => setTrigger(false)}
        >
          Zamknij
        </button>
      </div>
    </div>
  ) : null;
};
