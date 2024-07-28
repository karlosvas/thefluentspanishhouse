import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

function CardPlaceholder() {
  return (
    <div className="d-flex justify-content-around" id="lala">
      <Card style={{ width: "18rem" }} id="holder">
        <div className="card-img-placeholder"></div>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardPlaceholder;
