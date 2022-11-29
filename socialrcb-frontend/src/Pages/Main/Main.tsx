import React from "react";
import { useState, useEffect } from "react";
import { News } from "../../Components/News/News";
import axios from "axios";

interface propTypes {
  kategoria: number[];
  setKategoria: (kategoria: number[]) => void;
  region: number[];
  setRegion: (region: number[]) => void;
}

export const Main = ({
  kategoria,
  setKategoria,
  region,
  setRegion,
}: propTypes) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/news/")
      .then((res) => {
        // console.log("git dziala");
        setData(res.data.reverse());
      })
      .catch((err) => {
        // console.log("blad");
        // console.log(err);
      });
  }, []);

  // console.log(data);
  // console.log(kategoria.includes(1));

  return (
    <div>
      {data.map(
        ({
          category,
          title,
          shortcut,
          water_level_value,
          water_level_warning_status_value,
          water_level_alarm_status_value,
          river_name,
          created_at,
          province_id,
          content,
          longitude,
          latitude,
          id,
        }) =>
          kategoria.includes(category) &&
          region.includes(province_id) && (
            <News
              key={id}
              kategoria={category}
              title={title}
              shortContent={shortcut}
              waterLevel={water_level_value}
              waterLevelWarning={water_level_warning_status_value}
              waterLevelCritical={water_level_alarm_status_value}
              riverName={river_name}
              date={created_at.replace("T", " ").replace("Z", "")}
              content={content}
              longitude={longitude}
              latitude={latitude}
              id={id}
              province_id={province_id}
            />
          )
      )}
      <p>Brak Newsów</p>
    </div>
  );
};
