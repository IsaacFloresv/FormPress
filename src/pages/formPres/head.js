import { useState } from 'react';
import Cookies from 'universal-cookie'
const cookies = new Cookies()




const CompHead = () => {
const [agente, setAgente] = useState(cookies.get('info'))


  const meicimg = "logo_meic.jpg";
  return (
    <header>
      <nav className="navbar navbar-light shadow max-w-7xl py-6 px-1">
        <div className="container justify-content-center">
          
            <div className="col-3">
              <img
                src={meicimg}
                alt="MEIC"
                width="192"
                height="84"
                className="float-start"
              />
            </div>
            <div className="col-6 fs-2 fw-bolder text-center clrTitle">
              <span className="text-center">SOLICITUD ASESORIA PRESENCIAL</span>
            </div>
            <div className="col-3">
              <p className="mt-5 text-secondary d-flex flex-row-reverse">
                Agente: {agente}
              </p>
            </div>
          
        </div>
      </nav>
    </header>
  );
};

export default CompHead;
