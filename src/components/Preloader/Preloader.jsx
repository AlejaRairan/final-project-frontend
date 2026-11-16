import "./preloader.css";

function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <i className="circle-preloader"></i>
      <p className="preloader__text">Searching for countries...</p>
    </div>
  );
}

export default Preloader;