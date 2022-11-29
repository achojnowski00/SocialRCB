import React from "react";
import "./Profile.scss";
import { useState, useEffect } from "react";
import Login from "../../Components/Login/Login";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export const Profile = () => {
  const [data, setData] = useState([]);
  const [newsletter, setNewsletter] = useState(false);
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);
  const [userProvinces, setUserProvinces] = useState([]);

  useEffect(() => {
    if (window.localStorage.user !== undefined) {
      const userId = window.localStorage.user
        .replace("{", "")
        .replace("}", "")
        .split(",")[0]
        .split(":")[1];
      axios
        .get("http://127.0.0.1:8000/api/user/" + userId + "/")
        .then((res) => {
          // console.log("git dziala");
          setData(res.data);
          setNewsletter(res.data.newsletter);
          setUserProvinces(res.data.provinces);
        })
        .catch((err) => {
          // console.log("blad");
          // console.log(err);
        });
    }
  }, []);

  const [dataKat, setDataKat] = useState([]);
  useEffect(() => {
    // console.log(data.length);
    axios
      .get("http://127.0.0.1:8000/api/province/")
      .then((res) => {
        // console.log("git dziala");
        setDataKat(res.data);
        // console.log(dataKat);
      })
      .catch((err) => {
        // console.log("blad", err);
      });
  }, []);

  const handleChangeCheckbox = (e) => {
    const value = e.target.checked;
    setNewsletter(value);
    // console.log(e.target.checked);
    axios.patch(`http://127.0.0.1:8000/api/user/${data.id}/`, {
      newsletter: !newsletter,
    });
  };

  const handleDeleteProfile = (e) => {
    setIsConfirmPopupVisible(!isConfirmPopupVisible);
  };

  const handleConfirmDeleteProfile = (e) => {
    axios.delete(`http://127.0.0.1:8000/api/user/${data.id}/`);
    localStorage.removeItem("access");
    window.location.reload();
  };

  const ConfirmPopup = () => {
    return (
      <div className="confirmPopup">
        <p className="confirmPopup__title">Czy na pewno chcesz usunac konto?</p>
        <div className="confirmPopup__buttons">
          <button
            className="confirmPopup__button confirmPopup__button--delete"
            onClick={handleConfirmDeleteProfile}
          >
            Tak
          </button>
          <button
            className="confirmPopup__button confirmPopup__button--cancel"
            onClick={handleDeleteProfile}
          >
            Nie
          </button>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    axios.get(`http://127.0.0.1:8000/api/user/${data.id}/`).then((res) => {
      if (res.data.provinces.includes(e.id)) {
        axios.patch(`http://127.0.0.1:8000/api/user/${data.id}/`, {
          provinces: res.data.provinces.filter((item) => item !== e.id),
        });
      } else {
        axios.patch(`http://127.0.0.1:8000/api/user/${data.id}/`, {
          provinces: [...res.data.provinces, e.id],
        });
      }

      window.location.reload();
    });
  };

  return (
    <div>
      {window.localStorage.access === undefined && <Login />}
      {window.localStorage.access && (
        <div className="profile">
          <div className="profile__backgroundImage"></div>
          <div className="profile__picture"></div>
          <p className="profile__name">{data.username}</p>
          <div className="profile__dane">
            Dane użytkownika
            <p className="profile__dane-text">
              Nazwa użytkownika: {data.username}
            </p>
            <p className="profile__dane-text">Email: {data.email}</p>
          </div>

          <div className="profile__dane">
            Powiadomienia
            <p className="profile__dane-text">
              Czy chcesz otrzymywać powiadomienia e-mail?
              <Checkbox
                onChange={handleChangeCheckbox}
                type="checkbox"
                checked={newsletter}
              />
            </p>
            <div className="prowincje">
              {newsletter &&
                dataKat.map((item) => (
                  <div className="checkboxForm" key={item.id}>
                    <Checkbox
                      className="checkboxForm__box"
                      onChange={() => handleChange(item)}
                      checked={userProvinces.includes(item.id)}
                    />
                    <p className="checkboxForm__title">{item.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="controlls">
            <button
              onClick={handleDeleteProfile}
              className="controlls__btn controlls__btn--delete"
            >
              Usuń konto
            </button>
            {isConfirmPopupVisible && <ConfirmPopup />}
          </div>
        </div>
      )}
    </div>
  );
};
