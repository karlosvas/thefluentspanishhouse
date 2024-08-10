import Placeholder from "react-bootstrap/Placeholder";

const PlaceholderPublicaations = () => {
  return (
    <>
      <div className="publication">
        <div className="container mt-5" id="title-publication-ph">
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={9} />
          </Placeholder>
        </div>
        {window.innerWidth >= 1080 ? (
          <div
            className="card-img-placeholder"
            style={{
              height: "40vh",
              width: "45vw",
              marginTop: "35px",
              marginBottom: "0",
            }}
          ></div>
        ) : window.innerWidth >= 766 ? (
          <div
            className="card-img-placeholder"
            style={{
              height: "40vh",
              width: "70vw",
              marginTop: "35px",
              marginBottom: "0",
            }}
          ></div>
        ) : (
          <>
            <div
              className="card-img-placeholder"
              style={{
                height: "40vh",
                width: "90vw",
                marginTop: "35px",
                marginBottom: "0",
              }}
            ></div>
          </>
        )}
        <div className="container mt-0 mb-0" id="subtitle-placeholder">
          <Placeholder as="p" animation="glow">
            <Placeholder xs={10} />
          </Placeholder>
        </div>
        <div className="container" id="p-placeholder">
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
            <Placeholder xs={6} />
            <Placeholder xs={4} />
          </Placeholder>
        </div>
      </div>
    </>
  );
};

export default PlaceholderPublicaations;
