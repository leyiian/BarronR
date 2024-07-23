import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";
import instance from "../Config/AxiosConfig";
import styles from "../css/Citas.css";

function Citas() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    idUsr: null,
    fecha: null,
    Observaciones: " ",
    estado: "Pendiente",
    id_especialidades: null,
    id_consultorio: null,
    id_doctor: null,
  });

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
    setFormData({ ...formData, id_especialidades: e.target.value });
  };

  const guardarCita = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!formData.fecha) {
        setError("Por favor complete todos los campos.");
        return;
      }

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
    <div className={styles.citasContainer}>
      <Container className={styles.citasContainer}>
        <Row className={styles.citasRow}>
          <Col md={12} className="mx-auto">
            <h2 className={`text-center ${styles.citasHeading}`}>
              Registrar Cita
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={guardarCita} className={styles.citasForm}>
              <Form.Group controlId="formFecha" className="mb-4">
                <Form.Label className={`d-block ${styles.citasLabel}`}>
                  Seleccione la Fecha y Hora
                </Form.Label>
                <Calendar
                  id="calendar-24h"
                  value={formData.fecha}
                  onChange={handleCalendarChange}
                  showTime
                  hourFormat="24"
                  showIcon
                  className={styles.citasCalendar}
                />
              </Form.Group>

              <Form.Group controlId="formEspecialidad" className="mb-4">
                <Form.Label className={styles.citasLabel}>
                  Seleccione una Especialidad
                </Form.Label>
                <Form.Select
                  aria-label="Seleccione una especialidad"
                  value={formData.id_especialidades}
                  onChange={handleEspecialidadChange}
                  className={styles.citasSelect}
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className={styles.citasButtonPrimary}
                >
                  Guardar Cita
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/home")}
                  className={styles.citasButtonDanger}
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
