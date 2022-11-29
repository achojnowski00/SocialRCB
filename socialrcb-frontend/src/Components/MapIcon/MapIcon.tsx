import "./MapIcon.scss";
import w1 from "../../assets/provinces/1.png";
import w2 from "../../assets/provinces/2.png";
import w3 from "../../assets/provinces/3.png";
import w4 from "../../assets/provinces/4.png";
import w5 from "../../assets/provinces/5.png";
import w6 from "../../assets/provinces/6.png";
import w7 from "../../assets/provinces/7.png";
import w8 from "../../assets/provinces/8.png";
import w9 from "../../assets/provinces/9.png";
import w10 from "../../assets/provinces/10.png";
import w11 from "../../assets/provinces/11.png";
import w12 from "../../assets/provinces/12.png";
import w13 from "../../assets/provinces/13.png";
import w14 from "../../assets/provinces/14.png";
import w15 from "../../assets/provinces/15.png";
import w16 from "../../assets/provinces/16.png";

type MapIconType = {
  id: number;
};

export const MapIcon = ({ id }: MapIconType) => {
  return (
    <div className="mapIcon">
      {id === 1 && <img src={w1} alt="dolnośląskie" />}
      {id === 2 && <img src={w2} alt="kujawsko-pomorskie" />}
      {id === 3 && <img src={w3} alt="lubelskie" />}
      {id === 4 && <img src={w4} alt="lubuskie" />}
      {id === 5 && <img src={w5} alt="łódzkie" />}
      {id === 6 && <img src={w6} alt="małopolskie" />}
      {id === 7 && <img src={w7} alt="mazowieckie" />}
      {id === 8 && <img src={w8} alt="opolskie" />}
      {id === 9 && <img src={w9} alt="podkarpackie" />}
      {id === 10 && <img src={w10} alt="podlaskie" />}
      {id === 11 && <img src={w11} alt="pomorskie" />}
      {id === 12 && <img src={w12} alt="śląskie" />}
      {id === 13 && <img src={w13} alt="świętkokrzystkie" />}
      {id === 14 && <img src={w14} alt="warmińsko-mazurskie" />}
      {id === 15 && <img src={w15} alt="wielkopolskie" />}
      {id === 16 && <img src={w16} alt="zachodniopomorskie" />}
    </div>
  );
};
