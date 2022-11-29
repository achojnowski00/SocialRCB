import "./Odnosnik.scss";
import { ReactNode, MouseEventHandler } from "react";

type OdnosnikType = {
  onClick?: () => void;
  icon?: ReactNode;
  classN: string;
  content: string;
};

export const Odnosnik = ({ classN, icon, onClick, content }: OdnosnikType) => {
  return (
    <button
      className={"odnosnik " + classN}
      onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
    >
      {icon}
      {content}
    </button>
  );
};
