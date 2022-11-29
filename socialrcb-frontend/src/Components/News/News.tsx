import { MouseEventHandler, useState } from "react";
import "./News.scss";
import { Popup } from "../Popup/Popup";
import { MapIcon } from "../MapIcon/MapIcon";

type NewsType = {
  kategoria: number;
  title: string;
  shortContent: string;
  onClick?: () => MouseEventHandler;
  waterLevel: number;
  waterLevelWarning: number;
  waterLevelCritical: number;
  riverName: string;
  date: string;
  content: string;
  longitude: number;
  latitude: number;
  id: number;
  province_id: number;
};

export const News = ({
  kategoria,
  title,
  shortContent,
  waterLevel,
  waterLevelWarning,
  waterLevelCritical,
  riverName,
  date,
  content,
  longitude,
  latitude,
  id,
  province_id,
}: NewsType) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="news">
      <MapIcon id={province_id} />
      {kategoria !== 5 && (
        <>
          <h1 className="news__title">{title}</h1>
          <p className="news__shortcut">{shortContent}</p>
        </>
      )}

      {kategoria === 5 && (
        <>
          <h1 className="news__title">Stan wód rzeki {riverName}</h1>
          <p className="news__shortcut">Poziom wody: {waterLevel}</p>
          <p className="news__shortcut">
            Poziom ostrzegawczy: {waterLevelWarning}
          </p>
          <p className="news__shortcut">
            Poziom krytyczny: {waterLevelCritical}
          </p>
        </>
      )}

      <p className="news__date">{date}</p>
      <button className="news__button" onClick={() => setButtonPopup(true)}>
        Pokaz wiecej
      </button>
      <Popup
        opis={content}
        title={title}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        latitude={latitude}
        longitude={longitude}
        id={id}
      />
    </div>
  );
};
