import React, { useEffect, useState } from "react";
import { Container, Form, Modal, Button } from "react-bootstrap";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import instance from "../Config/AxiosConfig";
import "../css/VerCitas.css"; // Asegúrate de que la ruta sea correcta
import useAuth from "../Service/Auth";

function VerCitas() {
  const [citas, setCitas] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);


  const handleShowModal = async (cita) => {
    setSelectedCita(cita);
    try {
      const response = await instance.post(`/medicamentos`, { id_cita: cita.id });
      setMedicamentos(response.data.medicamentos);
    } catch (error) {
      console.error("Error al obtener los medicamentos:", error);
      setMedicamentos([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCita(null);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button className="pi pi-file rounded-pill" variant="outline-info" onClick={() => handleShowModal(rowData)}/>
    );
  };

  const onInputChange = (e) => {
    setGlobalFilter(e.target.value); // Actualizamos el filtro global
  };

  useAuth();

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    const idUsr = localStorage.getItem("idUsuario");
    try {
      const response = await instance.post(`/citas/paciente`, {
        idUsr: idUsr,
      });
      console.log(response.data);
      const citasWithData = await Promise.all(
        response.data.map(async (cita) => {
          const pacienteResponse = await instance.post(`/paciente`, {
            id: cita.id_paciente,
          });
          const especialidadResponse = await instance.post(`/especialidad`, {
            id: cita.id_especialidades,
          });
          const doctorResponse = await instance.post(`/doctor`, {
            id: cita.id_doctor,
          });
          const doctor = doctorResponse.data;
          const nombreDoc =
            doctor.nombre && doctor.apellido_paterno && doctor.apellido_materno
              ? `${doctor.nombre} ${doctor.apellido_paterno} ${doctor.apellido_materno}`
              : "No se ha asignado doctor";

          const paciente = pacienteResponse.data;
          const especialidad = especialidadResponse.data;
          const nombreCompleto = `${paciente.nombre} ${paciente.apPat} ${paciente.apMat}`;
          return {
            ...cita,
            nombre_paciente: nombreCompleto,
            especialidad: especialidad.nombre,
            nombreDoc: nombreDoc,
          };
        })
      );
      setCitas(citasWithData);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const getSeverity = (estado) => {
    switch (estado) {
      case "Rechazado":
        return "danger";
      case "Autorizado":
        return "success";
      case "Pendiente":
        return "warning";
      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />
    );
  };

  const filterHeader = (
    <div className="tableFilter">
      <Form.Control
        type="text"
        placeholder="Buscar"
        value={globalFilter}
        onChange={onInputChange}
      />
    </div>
  );

  return (
    <div className="verCitasBackground">
      <Container className="verCitasContainer">
        <h1 className="my-4 verCitasTitle">Ver Estado de mis Citas</h1>

        <div className="card verCitasCard">
          <DataTable
            value={citas}
            editMode="row"
            dataKey="id"
            paginator={true}
            rows={10}
            globalFilter={globalFilter}
            emptyMessage="No se encontraron citas."
            header={filterHeader}
            tableStyle={{ minWidth: "100%" }}
            className="verCitasTable"
          >
            <Column field="id" header="Id" style={{ width: "5%" }} />
            <Column field="nombre_paciente" header="Nombre" style={{ width: "20%" }} />
            <Column field="fecha" header="Fecha" style={{ width: "15%" }} />
            <Column field="Observaciones" header="Observaciones" style={{ width: "25%" }} />
            <Column field="id_consultorio" header="Consultorio" style={{ width: "10%" }} />
            <Column field="nombreDoc" header="Doctor" style={{ width: "15%" }} />
            <Column field="especialidad" header="Especialidad" style={{ width: "10%" }} />
            <Column field="estado" header="Estado" body={statusBodyTemplate} style={{ width: "15%" }} />
            <Column header="Acciones" body={actionBodyTemplate} style={{ width: "10%" }} />
          </DataTable>
        </div>

        {/* Modal para mostrar detalles de la cita */}
        <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ver Medicamentos Recetados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCita && (
          <div>
            <p><strong>Id:</strong> {selectedCita.id}</p>
            <p><strong>Nombre del Paciente:</strong> {selectedCita.nombre_paciente}</p>
          </div>
        )}
        <hr />
        <h5>Medicamentos Recetados</h5>
        {medicamentos.length > 0 ? (
          <ul>
            {medicamentos.map((medicamento, index) => (
              <li key={index}>
                <strong>Medicamento:</strong> {medicamento.nombre} <br />
                <strong>Cantidad:</strong> {medicamento.cantidad} {medicamento.unidad} <br />
                <strong>Cada Cuánto:</strong> {medicamento.cadaCuando} <br />
                <strong>Duración:</strong> {medicamento.cuantosDias} días
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron medicamentos recetados para esta cita.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
      </Container>
    </div>
  );
}

export default VerCitas;
