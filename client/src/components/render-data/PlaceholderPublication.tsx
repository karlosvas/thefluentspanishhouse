const PlaceholderPublicaations = () => {
  return (
    <>
      {window.innerWidth >= 1080 ? (
        <div
          className="card-img-placeholder"
          style={{ height: "40vh", width: "45vw", marginTop: "35px" }}
        ></div>
      ) : window.innerWidth >= 766 ? (
        <div
          className="card-img-placeholder"
          style={{ height: "40vh", width: "70vw", marginTop: "35px" }}
        ></div>
      ) : (
        <div
          className="card-img-placeholder"
          style={{ height: "40vh", width: "90vw", marginTop: "35px" }}
        ></div>
      )}
    </>
  );
};

export default PlaceholderPublicaations;
