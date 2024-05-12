import "./App.css";

export default function Title({ title }) {
  return (
    <div className="title-container">
      <span className="title">{title}</span>
      <div className="title-inline"></div>
    </div>
  );
}
