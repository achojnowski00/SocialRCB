import "./CheckItem.scss";

type WalkType = {
  content: string;
  id: number;
  funkcja: () => void;
};

export const CheckItem = ({ content, id }: WalkType) => {
  return (
    <div className="walk">
      <input type="checkbox" />
      <p className="nazwa">{content}</p>
    </div>
  );
};
