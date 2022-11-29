import "./ErrorMess.css";

type ErrorMessType = {
  message: string;
};

export const ErrorMess = ({ message }: ErrorMessType) => {
  return <p className="errorMess">{message}</p>;
};
