import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'

import ReactHTMLTableToExcel from './ReactHTMLTableToExcel.jsx'


const cookies = new Cookies()
const meicimg = "logo_meic.jpg";
const URI = "https://fwmback-production.up.railway.app/asepress";



function Dashboard() {
  const [ agente, setAgente ] = useState(cookies.get('info'))

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?")
    if (respuesta == true) {
      cookies.remove('info')
      cookies.remove('token')
    }
  }

  const [ reportes, setReportes ] = useState([])
  useEffect(() => {
    getReportes()
  }, [])

  const getReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    setReportes(report)
  }

  return (
    <>
      <nav className="navbar bg-body-white fixed-top position-relative shadow">
        <div className="container-fluid">
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p className="fs-2 fw-bolder text-center clrTitle">GESTION DE REPORTES MEIC</p>
          <p className="mt-5 text-secondary d-flex flex-row-reverse">
            Agente: {agente}
          </p>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Opciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to={"/home"}
                    id="btnenviar"
                    type="buttom"
                    className="nav-link"
                    aria-current="page">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href={"/formpres"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page">
                    Reportes Solicitud asesoria Presencial
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/"}
                    id="btncerrar"
                    type="button"
                    className="nav-link"
                    onClick={() => CerrarSession()}
                    aria-current="page">
                    Salir
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-none container-fluid my-3">
        <div className="row">
          <label>Filtros</label>
          <div className="col">
            <input type="date" />
          </div>
        </div>
      </div>
      <br/>
        <br/>
      <br/>
      <br/>
        <br/>
      <br/>
      <br/>
        <br/>
      <br/>
      <br/>
        <br/>
      <br/>
      <div className="container-fluid position-fixed pt-5 mt-5 top-50 start-50 translate-middle table-bordered border-primary rounded">
        <div className="d-flex flex-row mb-1">
          <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-success me-1"
          table="RepoSoliPres"
          filename="Reporte General"
          sheet="Solicitud Presencial de Asesorias"
          buttonText="Exportar datos a Excel"
        />
          <button className="d-none btn btn-success me-1">Exportar datos a PDF</button>
          <button className="d-none btn btn-success">Exportar datos a CSV</button>
        </div>
        <table id="RepoSoliPres" data-excel-name="Reportes Solicitud Presencial Asesoria" className="table table-dark table-striped caption-top badge text-nowrap table-bordered border-primary rounded overflow-x-scroll">
          <caption>Reportes solicitud de asesoria presencial</caption>
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
                <td>{reportes.fchareg}</td>
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
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item" aria-current="page">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>
    </>
  );
}

export default Dashboard;