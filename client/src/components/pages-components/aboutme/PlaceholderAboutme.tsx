const PlaceholderAboutme = () => {
  return (
    <>
      {window.innerWidth >= 1080 ? (
        <div
          className="card-img-placeholder"
          style={{ height: "56vh", width: "40vw" }}
        ></div>
      ) : window.innerWidth >= 766 ? (
        <div
          className="card-img-placeholder"
          style={{ height: "49vh", width: "70vw" }}
        ></div>
      ) : (
        <div
          className="card-img-placeholder"
          style={{ width: "70vw", height: "22vh" }}
        ></div>
      )}
    </>
  );
};

export default PlaceholderAboutme;
