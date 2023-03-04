import { useState } from 'react';
import Cookies from 'universal-cookie'
import "./dashboard.css"

const cookies = new Cookies()


function Dashboard() {

  const [ agente, setAgente ] = useState(cookies.get('info'))


  //Cerrar Secion
  const CerrarSession = () => {
    cookies.remove('info')
    cookies.remove('token')
  }

  const Redireccion = () => {
    if (cookies.get('info')) {
      window.location.assign('/formpres') 
    }
  }

  return (
    <body>

      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow container-flud">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 bg-transparent" href="#">ATENCION EN PLATAFORMA MEIC</a>
        <h2 className="navbar-brand col-md-3 col-lg-2 fs-6 bg-transparent text-end"> Agente: {agente}</h2>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="/login" onClick={CerrarSession}>SALIR</a>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                    <span data-feather="home" className="align-text-bottom">
                    Opciones</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={Redireccion()}>
                    <span data-feather="file" className="align-text-bottom">
                    Agregar solicitud de Asesoria Presencial</span>
                  </a>
                </li>
                <li className="d-none nav-item">
                  <a className="nav-link" >
                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                    Listado de solicitudes de Asesoria Presencial
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Vista general</h1>

              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="d-none btn btn-sm btn-outline-secondary">Export</button>
                </div>
              </div>
            </div>

            <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>

          </main>
        </div>
      </div>


      <script src="js/bootstrap.bundle.min.js"></script>

      <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
        integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
        integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha"
        crossorigin="anonymous"></script>
      <script src="dashboard.js"></script>
    </body>
  );
}

export default Dashboard;