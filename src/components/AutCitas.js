import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { Container, Form, Spinner } from "react-bootstrap"; // Agregamos Spinner para indicador de carga

import Config from "../Config/Config";

function AutCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados] = useState(["Rechazado", "Autorizado", "Pendiente"]);
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para el filtro global

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/citas`);
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

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
      setLoading(false);
    }
  };
  
const onRowEditComplete = async (event) => {
  try {
    const { id, Observaciones, fecha, estado, id_paciente } = event.data;
    const response = await axios.post(`${Config.baseURL}/cita/guardar`, {
      id,
      Observaciones,
      fecha,
      estado,
      id_paciente
    });
    console.log(event.data);
    console.log('Cita actualizada:', response.data);

    // Actualiza el estado local
    setCitas(prevCitas => 
      prevCitas.map(cita => 
        cita.id === id ? { ...cita, Observaciones, fecha, estado } : cita
      )
    );
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
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

  const statusEditor = (props) => {
    const handleChange = (e) => {
      const newValue = e.value;
      props.editorCallback(newValue); // Llama a editorCallback del componente padre
      onStatusChange(props.rowIndex, newValue); // Llama a onStatusChange del componente padre con el índice y el nuevo valor
    };
  
    return (
      <Dropdown
        value={props.value} // Valor seleccionado del Dropdown
        options={estados} // Opciones disponibles
        onChange={handleChange} // Ejecuta la función handleChange en el evento onChange
        placeholder="Selecciona un estado"
        itemTemplate={(option) => (
          <Tag value={option} severity={getSeverity(option)} />
        )}
      />
    );
  };
  
  
  const onStatusChange = (index, newEstado) => {
    let updatedCitas = [...citas]; // Clonar el arreglo de citas
    updatedCitas[index].estado = newEstado; // Actualizar el estado en el índice dado
    setCitas(updatedCitas); // Actualizar el estado de citas
  };
  

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.estado} severity={getSeverity(rowData.estado)} />
    );
  };

  const onInputChange = (e) => {
    setGlobalFilter(e.target.value); // Actualizamos el filtro global
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
    <Container className="aut-citas-container">
      <h1 className="my-4">Autorización de Citas</h1>
      {loading ? ( // Mostrar spinner de carga mientras se cargan los datos
        <Spinner animation="border" role="status">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      ) : (
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
            onRowEditComplete={onRowEditComplete}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="id" header="Id" style={{ width: "5%" }} />
            <Column
              field="nombre_paciente"
              header="Nombre"
              style={{ width: "20%" }}
            />
            <Column field="fecha" header="Fecha" style={{ width: "20%" }} />
            <Column
              field="Observaciones"
              header="Observaciones"
              style={{ width: "20%" }}
            />
            <Column
              field="estado"
              header="Estado"
              body={statusBodyTemplate}
              editor={(props) => statusEditor(props)}
              style={{ width: "20%" }}
            />
            <Column
              rowEditor={true}
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      )}
    </Container>
  );
}

export default AutCitas;
