import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'


const meicimg = "logo_meic.jpg";
const URI = "https://fwmback-production.up.railway.app/asepress";

function Dashboard() {

  const [ reportes, setReportes ] = useState([])
  useEffect(() => {
    getReportes()
  }, [])

  const getReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    setReportes(report)
    console.log(report)
  }

  return (
    <>
      <nav class="navbar bg-body-white fixed-top position-relative shadow">
        <div class="container-fluid">
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p class="navbar-brand ">GESTION DE REPORTES MEIC</p>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Opciones</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">Inicio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Reportes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Salir</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <label>Filtros</label>
          <div className="col">
            <input type="date" id="start" name="trip-start"
              value="2018-07-22"
              min="2018-01-01" max="2018-12-31" />
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5 mt-5 position-absolute top-50 start-0 translate-middle-y  table-bordered border-primary rounded">
        <table className="table table-dark table-striped caption-top badge text-nowrap table-bordered border-primary rounded overflow-x-scroll">
          <caption>Reportes solicitud de asesoria presencial</caption>
          <button className="btn btn-success">Exportar datos a Excel</button><button className="btn btn-success">Exportar datos a Excel</button><button className="btn btn-success">Exportar datos a Excel</button>
          <thead>
            <tr>
              <th scope="col"># Reporte</th>
              <th scope="col">Agente</th>
              <th scope="col">Creado</th>
              <th scope="col">Estado</th>
              <th scope="col">Origen</th>
              <th scope="col">Usuario Esp.</th>
              <th scope="col">Observasión</th>
              <th scope="col">Tipo Ident.</th>
              <th scope="col">N. Ident.</th>
              <th scope="col">Nombre Cliente</th>
              <th scope="col">1er Apell Cliente</th>
              <th scope="col">2do Apell Cliente</th>
              <th scope="col">Correo 1</th>
              <th scope="col">Correo 2</th>
              <th scope="col">Telefono 1</th>
              <th scope="col">Telefono 2</th>
              <th scope="col">Provincia</th>
              <th scope="col">Canton</th>
              <th scope="col">Distrito</th>
              <th scope="col">Materia</th>
              <th scope="col">Asunto Consult.</th>
              <th scope="col">Bien</th>
              <th scope="col">Tipo Ident. Comerciante</th>
              <th scope="col">N. Ident. Comerciante</th>
              <th scope="col">Razon Social/Nombre Comerciante</th>
              <th scope="col">Nombre Fantasía</th>
              <th scope="col">Descripción del caso</th>
              <th scope="col">Respuesta Enviada</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reportes) => (
              <tr key={reportes.id}>
                <th scope="row">{reportes.id_report}</th>
                <td>{reportes.id_agente}</td>
                <td>{reportes.fchacomplet}</td>
                <td>{reportes.status}</td>
                <td>{reportes.origen_r}</td>
                <td>{reportes.usuario_s}</td>
                <td>{reportes.us_obser}</td>
                <td>{reportes.tdia}</td>
                <td>{reportes.ndia}</td>
                <td>{reportes.nomba}</td>
                <td>{reportes.apell1a}</td>
                <td>{reportes.apell2a}</td>
                <td>{reportes.email}</td>
                <td>{reportes.email2}</td>
                <td>{reportes.tel}</td>
                <td>{reportes.tel2}</td>
                <td>{reportes.provi}</td>
                <td>{reportes.canto}</td>
                <td>{reportes.distr}</td>
                <td>{reportes.materia}</td>
                <td>{reportes.asunto}</td>
                <td>{reportes.bien}</td>
                <td>{reportes.tdic}</td>
                <td>{reportes.ndic}</td>
                <td>{reportes.razon_social}</td>
                <td>{reportes.nombre_fantasia}</td>
                <td>{reportes.desch}</td>
                <td>{reportes.respe}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item" aria-current="page">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>
    </>
  );
}

export default Dashboard;