import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Config from "../Config/Config";
import axios from "axios";
import { Tag } from "primereact/tag";

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
    try {
      const response = await axios.get(`${Config.baseURL}/citas`);
      console.log(response.data)
      const citasWithData = await Promise.all(
        response.data.map(async (cita) => {
          const pacienteResponse = await axios.post(
            `${Config.baseURL}/paciente`,
            { id: cita.id_paciente }
          );
          const paciente = pacienteResponse.data;
          const nombreCompleto = `${paciente.nombre} ${paciente.apPat} ${paciente.apMat}`;
          return {
            ...cita,
            nombre_paciente: nombreCompleto,
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
    <div>
      <Container className="aut-citas-container">
        <h1 className="my-4">Ver Estado de mis Citas</h1>

        <div className="card">
          <DataTable
            value={citas}
            editMode="row"
            dataKey="id"
            paginator={true} // Habilitar paginación
            rows={10} // Número de filas por página
            globalFilter={globalFilter} // Aplicar filtro global
            emptyMessage="No se encontraron citas."
            header={filterHeader} // Componente de filtro global
            tableStyle={{ minWidth: "50rem" }}
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
              style={{ width: "20%" }}
            />
            <Column field="id_consultorio" header="Consultorio" style={{ width: "5%" }} />
            <Column field="id_doctor" header="Doctor" style={{ width: "20%" }} />
            <Column field="id_especialidades" header="Especialidad" style={{ width: "10%" }} />
            <Column
              field="estado"
              header="Estado"
              body={statusBodyTemplate}
              style={{ width: "20%" }}
            />
          </DataTable>
        </div>
      </Container>
    </div>
  );
}

export default VerCitas;
