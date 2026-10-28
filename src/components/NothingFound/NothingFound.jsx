import "./NothingFound.css";

function NothingFound({
  title = "Nothing found",
  text = "Sorry, but nothing matched your search terms.",
}) {
  return (
    <div className="nothing-found">
      <h3 className="nothing-found__title">{title}</h3>
      <p className="nothing-found__text">{text}</p>
    </div>
  );
}

export default NothingFound;