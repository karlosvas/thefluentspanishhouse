import Placeholder from "react-bootstrap/Placeholder";

const PlaceholderPublicaations = () => {
  return (
    <div className="publication">
      <Placeholder animation="wave" className="title-ph">
        <Placeholder xs={9} size="lg" />
      </Placeholder>
      <div className="card-img-placeholder"></div>
      <Placeholder as="p" animation="wave" className="parragraf-ph">
        <Placeholder xs={11} />
      </Placeholder>
      <Placeholder as="p" animation="wave" className="parragraf-ph">
        <Placeholder xs={8} size="sm" />
        <Placeholder xs={11} size="sm" />
        <Placeholder xs={6} size="sm" />
      </Placeholder>
    </div>
  );
};

export default PlaceholderPublicaations;
