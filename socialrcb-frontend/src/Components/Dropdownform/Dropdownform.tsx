import "./Dropdownform.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

type DropdownformType = {
  api: string;
  kategoria: number[];
  setKategoria: (kategoria: number[]) => void;
};

export const Dropdownform = ({
  api,
  kategoria,
  setKategoria,
}: DropdownformType) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // console.log(data.length);
    axios
      .get(api)
      .then((res) => {
        // console.log("git dziala");
        setData(res.data);
      })
      .catch((err) => {
        // console.log("blad");
        // console.log(err);
      });
  }, []);

  // console.log(kategoria);

  // funkcja append or unAppend{}
  // jezeli jesy w tanlicy to usun
  // jezeli nie to dodaj

  const handleChange = (e: any) => {
    // console.log(e.id);
    if (kategoria.includes(e.id)) {
      setKategoria(kategoria.filter((item) => item !== e.id));
    } else {
      setKategoria([...kategoria, e.id]);
    }
  };

  const handleUnCheckAll = () => {
    setKategoria([]);
  };

  const handleCheckAll = () => {
    setKategoria(data.map((item) => item.id));
  };

  return (
    <div className="dropdownForm">
      {data.length === 0 && <CircularProgress />}
      {data.length !== 0 && (
        <button
          className="checkButton checkButton--uncheck"
          onClick={handleUnCheckAll}
        >
          Odznacz wszystkie
        </button>
      )}
      {data.length !== 0 && (
        <button
          className="checkButton checkButton--check"
          onClick={handleCheckAll}
        >
          Zaznacz wszystkie
        </button>
      )}
      {data.map((item) => (
        <div className="checkboxForm" key={item.id}>
          <Checkbox
            className="checkboxForm__box"
            // onChange={() => setKategoria([item.id])} // stara linijka dzialajaca jako tako
            onChange={() => handleChange(item)}
            checked={kategoria.includes(item.id)}
          />
          <p className="checkboxForm__title">{item.name}</p>
        </div>
      ))}
    </div>
  );
};
