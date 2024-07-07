import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Config from "../Config";

function Especialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
  
    useEffect(() => {
      fnEspecialidad();
    }, []);
  
    const eliminarEspecialidad = async (id) => {
      try {
        const response = await axios.post(`${Config.baseURL}/especialidad/eliminar`, { id });
        if (response.data === "OK") {
          fnEspecialidad();
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        setError("Ocurrió un error en el servidor");
        console.error("Ocurrió un error: ", error);
      }
    };
  
    const fnEspecialidad = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/especialidades`);
        setEspecialidades(response.data);
      } catch (error) {
        setError("Ocurrió un error al cargar las especialidades");
        console.error("Ocurrió un error: ", error);
      }
    };
  
    return (
      <Container className="mt-5">
        <h1 className="text-center mb-4">Especialidades</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="d-flex justify-content-end mb-3">
          <Button className="pi pi-plus-circle" variant="outline-success" onClick={() => navigate("/especialidad")} size="sm">
            
          </Button>
        </div>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/especialidad/${item.id}`)}
                    variant="primary"
                    size="sm"
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => eliminarEspecialidad(item.id)}
                    variant="danger"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }

export default Especialidades
