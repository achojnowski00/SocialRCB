import "./Header.css";
import { Odnosnik } from "../Odnoscnik/Odnosnik";
import { useState } from "react";
import { Dropdownform } from "../Dropdownform/Dropdownform";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CategoryIcon from "@mui/icons-material/Category";

interface propTypes {
  kategoria: number[];
  setKategoria: (kategoria: number[]) => void;

  region: number[];
  setRegion: (region: number[]) => void;
}

export const Header = ({
  kategoria,
  setKategoria,
  region,
  setRegion,
}: propTypes) => {
  const [isCatVisible, setCatVisible] = useState(false);
  const [isRegionVisible, setRegionVisible] = useState(false);

  const switchCattegorisVisibility = () => {
    if (isRegionVisible) {
      setRegionVisible(false);
    }
    setCatVisible(!isCatVisible);
  };

  const switchRegionVisibility = () => {
    if (isCatVisible) {
      setCatVisible(false);
    }
    setRegionVisible(!isRegionVisible);
  };

  const logout = () => {
    localStorage.removeItem("access");
    window.location.reload();
  };

  const navigate = useNavigate();
  const navigateToProfile = () => navigate("/profile");
  const navigateToMain = () => navigate("/");

  return (
    <header className="header">
      {isCatVisible && (
        <Dropdownform
          api="http://127.0.0.1:8000/api/category/"
          kategoria={kategoria}
          setKategoria={setKategoria}
        />
      )}
      {isRegionVisible && (
        <Dropdownform
          api="http://127.0.0.1:8000/api/province/"
          kategoria={region}
          setKategoria={setRegion}
        />
      )}
      <Odnosnik
        classN="header__button header__button--main-page"
        content="Strona główna"
        icon={<HomeIcon />}
        onClick={navigateToMain}
      />

      <Odnosnik
        classN={
          "header__button header__button--kategoria" +
          (isCatVisible ? " active" : "")
        }
        content="Kategoria"
        icon={<CategoryIcon />}
        onClick={switchCattegorisVisibility}
      />

      <Odnosnik
        classN={
          "odnosnik header__button header__button--region" +
          (isRegionVisible ? " active" : "")
        }
        content="Region"
        icon={<PinDropIcon />}
        onClick={switchRegionVisibility}
      />

      <Odnosnik
        classN="header__button header__button--profile"
        content="Konto"
        icon={<PermIdentityIcon />}
        onClick={navigateToProfile}
      />
      {window.localStorage.access && (
        <button
          className="odnosnik header__button header__button--logout"
          onClick={logout}
        >
          Wyloguj
        </button>
      )}
    </header>
  );
};
