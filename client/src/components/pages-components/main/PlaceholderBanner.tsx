const PlaceholderBanner = () => {
  return (
    <>
      {window.innerWidth >= 1080 ? (
        <div className="card-img-placeholder" style={{ height: "55vh" }}></div>
      ) : window.innerWidth >= 766 ? (
        <div className="card-img-placeholder" style={{ height: "55vh" }}></div>
      ) : (
        <div className="card-img-placeholder" style={{ height: "50vh" }}></div>
      )}
    </>
  );
};

export default PlaceholderBanner;
