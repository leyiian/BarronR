import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";
import instance from "../Config/AxiosConfig";
import "../css/Citas.css"; // Importación del CSS
import useAuth from "../Service/Auth";

function Citas() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    idUsr: null,
    fecha: null,
    Observaciones: "",
    estado: "Pendiente",
    id_especialidades: "",
    id_consultorio: null,
    id_doctor: null,
  });

  useAuth();

  useEffect(() => {
    const obtenerEspecialidades = async () => {
      try {
        const response = await instance.get(`/especialidades`);
        setEspecialidades(response.data);
      } catch (error) {
        setError("Ocurrió un error al cargar las especialidades");
        console.error("Ocurrió un error: ", error);
      }
    };

    obtenerEspecialidades();

    const idUsr = localStorage.getItem("idUsuario");
    if (idUsr) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idUsr: idUsr,
      }));
    }
  }, []);

  const handleCalendarChange = (e) => {
    setFormData({ ...formData, fecha: e.value });
  };

  const handleEspecialidadChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, id_especialidades: value });

    if (value === "") {
      setError("Debe seleccionar una especialidad.");
    } else {
      setError("");
    }
  };

  const guardarCita = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fecha || !formData.id_especialidades) {
      setError("Por favor complete todos los campos.");
      return;
    }

    try {
      const response = await instance.post(`/cita/guardar`, formData);
      if (response.data === "Ok") {
        navigate("/ver_citas");
      } else {
        setError(response.data.error || "Ocurrió un error desconocido.");
      }
    } catch (error) {
      setError("Ocurrió un error al registrar la cita.");
      console.error("Ocurrió un error: ", error);
    }
  };

  return (
    <div className="citasBackground">
      <Container className="citasContainer">
        <Row className="citasRow">
          <Col md={12} className="citasCol">
            <h2 className="text-center citasTitle">Registrar Cita</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={guardarCita} className="citasForm">
              <Form.Group controlId="formFecha" className="mb-4">
                <Form.Label className="d-block citasLabel">
                  Seleccione la Fecha y Hora
                </Form.Label>
                <Calendar
                  id="calendar-24h"
                  value={formData.fecha}
                  onChange={handleCalendarChange}
                  showTime
                  hourFormat="24"
                  showIcon
                  className="citasCalendar"
                />
              </Form.Group>

              <Form.Group controlId="formEspecialidad" className="mb-4">
                <Form.Label className="citasLabel">
                  Seleccione una Especialidad
                </Form.Label>
                <Form.Select
                  aria-label="Seleccione una especialidad"
                  value={formData.id_especialidades}
                  onChange={handleEspecialidadChange}
                  className={`citasSelect ${error ? "is-invalid" : ""}`}
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </Form.Select>
                {error && formData.id_especialidades === "" && (
                  <div className="invalid-feedback">{error}</div>
                )}
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="citasButtonPrimary"
                >
                  Guardar Cita
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/home")}
                  className="citasButtonDanger"
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Citas;
