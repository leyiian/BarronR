import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Config from "../Config/Config";
import axios from "axios";
import { Tag } from "primereact/tag";
import instance from "../Config/AxiosConfig";

function VerCitas() {
  const [citas, setCitas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para el filtro global
  const onInputChange = (e) => {
    setGlobalFilter(e.target.value); // Actualizamos el filtro global
  };

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
    <div className="table-filter">
      <Form.Control
        type="text"
        placeholder="Buscar"
        style={{ maxWidth: "300px" }}
        value={globalFilter}
        onChange={onInputChange}
      />
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e9f5f9",
        display: "flex",
        flexDirection: "column", // Alinea el contenido en columna
        padding: "2rem", // Espaciado alrededor del contenedor principal
      }}
    >
      <Container
        className="aut-citas-container"
        style={{ padding: "1rem", marginTop: "0" }}
      >
        <h1 className="my-4" style={{ marginBottom: "1rem" }}>
          Ver Estado de mis Citas
        </h1>

        <div
          className="card"
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <DataTable
            value={citas}
            editMode="row"
            dataKey="id"
            paginator={true} // Habilitar paginación
            rows={10} // Número de filas por página
            globalFilter={globalFilter} // Aplicar filtro global
            emptyMessage="No se encontraron citas."
            header={filterHeader} // Componente de filtro global
            tableStyle={{ minWidth: "100%" }} // Asegúrate de que la tabla use el 100% del ancho del contenedor
            style={{ fontSize: "0.875rem" }} // Ajusta el tamaño de la fuente para una mejor legibilidad
          >
            <Column field="id" header="Id" style={{ width: "5%" }} />
            <Column
              field="nombre_paciente"
              header="Nombre"
              style={{ width: "20%" }}
            />
            <Column field="fecha" header="Fecha" style={{ width: "15%" }} />
            <Column
              field="Observaciones"
              header="Observaciones"
              style={{ width: "25%" }}
            />
            <Column
              field="id_consultorio"
              header="Consultorio"
              style={{ width: "10%" }}
            />
            <Column
              field="nombreDoc"
              header="Doctor"
              style={{ width: "15%" }}
            />
            <Column
              field="especialidad"
              header="Especialidad"
              style={{ width: "10%" }}
            />
            <Column
              field="estado"
              header="Estado"
              body={statusBodyTemplate}
              style={{ width: "15%" }}
            />
          </DataTable>
        </div>
      </Container>
    </div>
  );
}

export default VerCitas;
