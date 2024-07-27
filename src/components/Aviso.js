import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Aviso.css"; 

function Aviso() {
  return (
    <div className="avisoBackground">
      <Container className="avisoprivacidadContainer">
        <Row className="avisoprivacidadRow">
          <Col md={12} className="avisoCol">
            <h2 className="text-center avisoTitle">Aviso de Privacidad</h2>
            <p className="avisoText">
              Este es el aviso de privacidad de nuestro consultorio médico. Nos
              comprometemos a proteger su información personal y a usarla solo
              para los fines para los que fue proporcionada. Sus datos serán
              manejados con confidencialidad y en cumplimiento con las
              regulaciones aplicables.
            </p>
            <p className="avisoText">
              Recopilamos información personal como su nombre, dirección,
              número de teléfono y detalles médicos para brindarle una mejor
              atención y para cumplir con nuestras obligaciones legales. Sus
              datos no serán compartidos con terceros sin su consentimiento
              previo, excepto cuando sea requerido por la ley.
            </p>
            <p className="avisoText">
              Usted tiene el derecho de acceder, rectificar y cancelar sus
              datos personales, así como de oponerse al tratamiento de los
              mismos. Si desea ejercer estos derechos o tiene alguna pregunta
              sobre nuestro aviso de privacidad, por favor contáctenos.
            </p>
            <p className="avisoText">
              Al proporcionar sus datos personales, usted acepta los términos
              y condiciones de este aviso de privacidad. Nos reservamos el
              derecho de modificar este aviso de privacidad en cualquier
              momento. Cualquier cambio será publicado en esta página.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Aviso;
