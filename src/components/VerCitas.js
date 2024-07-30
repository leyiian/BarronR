import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import instance from "../Config/AxiosConfig";
import "../css/VerCitas.css"; // Asegúrate de que la ruta sea correcta
import useAuth from "../Service/Auth";

function VerCitas() {
  const [citas, setCitas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para el filtro global

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
        <h1 className="my-4 verCitasTitle">
          Ver Estado de mis Citas
        </h1>

        <div className="card verCitasCard">
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
            className="verCitasTable"
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
