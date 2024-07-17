import "../styles/main/prices.css";
const Prices = () => {
  return (
    <>
      <div className="divPracing">
        <div className="cardPracing">
          <h3>Clases Básicas</h3>
          <div className="price">
            <h1>$50</h1>
            <small>/ mes</small>
          </div>
          <ul>
            <li>Acceso a recursos en línea</li>
            <li>Clases grupales</li>
            <li>1 hora semanal</li>
            <li className="notPrivileges">Soporte por correo y chat</li>
            <li className="notPrivileges">Clases privadas</li>
            <li className="notPrivileges">Acceso a contenido exclusivo</li>
            <li className="notPrivileges">Soporte 24/7</li>
          </ul>
        </div>
        <div className="cardPracing">
          <h3>Clases Intermedias</h3>
          <div className="price">
            <h1>$100</h1>
            <small>/ mes</small>
          </div>
          <ul>
            <li>Acceso a recursos en línea</li>
            <li>Clases grupales y privadas</li>
            <li>2 horas semanales</li>
            <li>Soporte por correo y chat</li>
            <li className="notPrivileges">Acceso a contenido exclusivo</li>
            <li className="notPrivileges">Soporte 24/7</li>
          </ul>
        </div>
        <div className="cardPracing">
          <h3>Clases Avanzadas</h3>
          <div className="price">
            <h1>$200</h1>
            <small>/ mes</small>
          </div>
          <ul>
            <li>Acceso a contenido exclusivo</li>
            <li>Clases grupales y privadas</li>
            <li>4 horas semanales</li>
            <li>Soporte por correo y chat</li>
            <li>Acceso a contenido exclusivo</li>
            <li>Soporte 24/7</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Prices;
