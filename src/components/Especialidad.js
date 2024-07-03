import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, Row, Button, Container } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Especialidad() {
  const [especialidad, setEspecialidad] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fnEspecialidad();
    }
  }, []);
  const fnEspecialidad = async () => {
    const response =
      await axios.post("http://127.0.0.1:8000/api/especialidad",{ id: id });
    setEspecialidad(response.data.nombre);
  };

  const enviarEspecialidad = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/especialidad/guardar",
        {
          id: id,
          nombre: especialidad,
        }
      );
      console.log(response.data);
      if (response.data === "OK") {
        navigate("/home");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Ocurrio un error en el servidor");
      console.error("Ocurrió un error: ", error);
    }
  };
  


  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={() => navigate("/home")}>UTTEC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to='/home'>Especialidad</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1>Especialidades</h1>
        <Form onSubmit={enviarEspecialidad}>
        <Form.Group controlId="formId" className="d-none">
            <Form.Control type="text" value={id}  />
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column>Especialidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la especialidad"
              value={especialidad  }
              required
              onChange={(e) => setEspecialidad(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button
            variant="outline-success"
            type="submit"
            className="w-100 mt-3"
          >
            guardar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Especialidad;
