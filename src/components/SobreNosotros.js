import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/SobreNosotros.css"; 

function SobreNosotros() {
  return (
    <div className="sobreNosotrosBackground">
      <Container className="sobreNosotrosContainer">
        <Row className="sobreNosotrosRow">
          <Col md={12} className="sobreNosotrosCol">
            <h2 className="text-center sobreNosotrosTitle">Sobre Nosotros</h2>
            <p className="sobreNosotrosText">
              Bienvenidos a nuestro consultorio médico. Estamos dedicados a proporcionar la mejor atención médica a nuestros pacientes. Nuestro equipo de profesionales altamente calificados está aquí para asistirlo con sus necesidades de salud.
            </p>
            <p className="sobreNosotrosText">
              En nuestro consultorio, creemos en el cuidado integral del paciente y nos esforzamos por ofrecer servicios personalizados para cada individuo. Nos enorgullecemos de nuestra capacidad para brindar un ambiente acogedor y de apoyo.
            </p>
            <p className="sobreNosotrosText">
              Si tiene alguna pregunta sobre nuestros servicios o desea más información, no dude en ponerse en contacto con nosotros.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SobreNosotros;
