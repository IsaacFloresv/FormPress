import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'


import ReactHTMLTableToExcel from '../dashboard/ReactHTMLTableToExcel.jsx'

import "./App.css";
import BarChart from "./components/BarChart.js";
import LineChart from "./components/LineChart.js";
import PieChart from "./components/PieChart.js";
import { UserData } from "./Data.js";

const cookies = new Cookies()
const meicimg = "logo_meic.jpg";
const alegaimg = "logo.png";
const URI = "https://fwmback-production.up.railway.app/asepress";



function Stadistic() {
    const [ materia, setMateria ] = useState([]);
    const [ asunto, setAsunto ] = useState([]);
    const [ bien, setBien ] = useState([]);
    const [ idMat, setidMat ] = useState();


    const [ dreportes, setDReportes ] = useState([])
    const [ freportes, setFReportes ] = useState([])


    const [ idAsu, setidAsu ] = useState();
    const [ idBie, setidBie ] = useState();
    const [ agente, setAgente ] = useState(cookies.get('info'))
    const [ reportes, setReportes ] = useState([])
    useEffect(() => {
        getReportes()
        //getMaterias()
    }, [])


    const [ fini, setFini ] = useState();
    const [ fend, setFend ] = useState();
    const [ title, setTitle ] = useState('Gráfico');
    const [ deshaBar, setdeshaBar ] = useState('d-none');
    const [ deshaLine, setdeshaLine ] = useState('d-none');
    const [ deshaPie, setdeshaPie ] = useState('d-none');

    const CerrarSession = () => {
        const respuesta = confirm("¿Desea salir?")
        if (respuesta == true) {
            cookies.remove('info')
            cookies.remove('token')
        }
    }

    Array.prototype.unicos = function () {
        const unicos = [];
        this.forEach((elemento) => {
            if (!unicos.includes(elemento)) {
                unicos.push(elemento);
            }
        });

        return unicos;
    }

    const getMaterias = async () => {
        const res = await axios.get(URI + "/mat");
        setMateria(res.data);
    };

    let TtCasos = 0
    let Agente = []
    let result = []
    let ragente = {
        agent: ''
    }
    let rxagente = {
        agent: '',
        treport: 0,
    }
    let trxagent = {}
    const getReportes = async () => {
        const res = await axios.get(URI)
        const report = res.data

        setReportes(report)
        setDReportes(report)

        reportes.map((reportes) => {
            TtCasos += reportes.status == "Activo" ? 1 : 0
        })

        reportes.forEach(function (item) {
            Agente.push(item.id_agente);
        })

        result = Agente.unicos()

        result.map((elemento) => [
            ragente.agent = result
        ])

        /*reportes.map((reportes)=>{
            ragente.map((elemto)=>{
            if(reportes.id_agente == ragente.agent){
            rxagente.treport = rxagente.treport + 1
            rxagente.agent = ragente.agent}})
        }
        )*/

        let repeticiones = {};
        for (let i = 0; i < reportes.length; i++) {
            let valor = reportes[ i ].id_agente;
            rxagente.agent = valor
            if (repeticiones[ valor ]) {
                rxagente.treport = repeticiones[ valor ] += 1
                trxagent = { ...rxagente }

            } else {
                rxagente.treport = repeticiones[ valor ] = 1;
                trxagent = { ...rxagente }
            }
        }



        console.log(trxagent)
    }

    const [ userData, setUserData ] = useState({
        labels: UserData.map((data) => data.agente),
        datasets: [
            {
                label: `${title}`,
                data: UserData.map((data) => data.treport),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    const obtGrafic = (e) => {
        if (e.target.selectedIndex == 1) {
            setdeshaBar("d-block")
            setdeshaLine("d-none")
            setdeshaPie("d-none")
        } else if (e.target.selectedIndex == 2) {
            setdeshaBar('d-none')
            setdeshaLine('d-block')
            setdeshaPie('d-none')
        } else if (e.target.selectedIndex == 3) {
            setdeshaBar('d-none')
            setdeshaLine('d-none')
            setdeshaPie('d-block')
        } else {
            setdeshaBar('d-none')
            setdeshaLine('d-none')
            setdeshaPie('d-none')
        }
    }

    const ResetTable = () => {
        setReportes(dreportes)
    }

    const MayorFcha = (e) => {
        var info = e.split('-')
        let fech = info[2] + '/' + info[1] + '/' + info[0]

        let mayores = reportes.filter(n => Date.parse(n.fchareg.substring(0, 8)) >= Date.parse(fech))
        console.log(mayores, reportes[15].fchareg.substring(0, 8), fech)
        setReportes(dreportes)
        setFReportes(mayores)
        console.log(freportes)
    }

    const MenorFcha = (e) => {
        var info = e.split('-')
        let fech = info[2] + '/' + info[1] + '/' + info[0]

        let mayores = reportes.filter(n => Date.parse(n.fchareg.substring(0, 8)) <= Date.parse(fech))
        console.log(mayores, reportes[15].fchareg.substring(0, 8), fech)
        setReportes(dreportes)
        setFReportes(mayores)
        console.log(freportes)
    }

    const bscNReport = (e) => {
        console.log(e.target.value)
        if (e.target.value !== '') {
            const filt = dreportes.filter((reporte) => (reporte.id_report).toString().includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscAgent = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.id_agente.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)                
            }
        }
    }

    const bscFchCreado = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.fchareg.includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscStatus = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.status.toLowerCase().include(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscOrigenr = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.origen_r.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscUsuarios = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.usuario_s.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscUsObser = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.us_obser.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscTdia = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.tdia.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscNdia = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.ndia.includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscNombA = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.nomba.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscApell1A = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.apell1a.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscApell2A = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.apell2a.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscEmail1 = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.email.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscEmail2 = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.email2.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscTel1 = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.tel.includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscTel2 = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.tel2.includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscProv = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.provi.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscCanto = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.canto.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscDistr = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.distr.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscMateria = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.materia.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscAsuntot = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.asunto.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscBien = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.bien.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscTdiC = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.tdic.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscNdiCt = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.ndic.includes(e.target.value))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscRSocial = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.razon_social.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscNFantacy = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.nombre_fantasia.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscDesch = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.desch.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
    }

    const bscRespe = (e) => {
        if (e !== '') {
            const filt = dreportes.filter((reporte) => reporte.respe.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filt)
            if (filt !== null) {
                setFReportes(filt)
                setReportes(freportes)
            }
        }
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
                    <p className="fs-2 fw-bolder text-center clrTitle">Pagina Principal</p>
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
            <br />
            <br />
            <div className="row">
                <label>Filtros</label>
                <br />
                <div className="col-md-4">
                    <label htmlFor="fcini">Fecha Inicial</label>
                    <input id="fcini" type="date" value={fini} onChange={(e) => MayorFcha(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="fcfin">Fecha Final</label>
                    <input id="fcfin" type="date" value={fend} onChange={(e) => MenorFcha(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="input_TID" className="form-label">
                        Filtros Comunes
                    </label>
                    <select
                        id="input_TID"
                        className="form-select"
                        name="tid"
                        required>
                        <option value="0"
                            selected="selected" disabled>
                            Seleccione...
                        </option>
                        <option defaultValue="1">Top 10 Materias</option>
                        <option defaultValue="2">Top 10 Asuntos Consultados</option>
                        <option defaultValue="3">Top 10 Bienes</option>
                    </select>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    <label htmlFor="input_TID" className="form-label">
                        Tipo de Gráfico
                    </label>
                    <select
                        id="input_TDG"
                        className="form-select"
                        onChange={(e) => obtGrafic(e)}
                        name="tdg"
                        required>
                        <option value="0"
                            selected="selected" disabled>
                            Seleccione...
                        </option>
                        <option defaultValue="1">De Barras</option>
                        <option defaultValue="2">Lineal</option>
                        <option defaultValue="3">Circular</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="input_TID" className="form-label">
                        Tipo de identificación
                    </label>
                    <select
                        id="input_TID"
                        className="form-select"
                        name="tid"
                        required>
                        <option value="0"
                            selected="selected" disabled>
                            Seleccione...
                        </option>
                        <option defaultValue="1">Cédula Nacional</option>
                        <option defaultValue="2">Pasaporte</option>
                        <option defaultValue="3">Cédula Jurídica</option>
                        <option defaultValue="4">DIMEX</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="selectMateria" className="form-label">
                        Materia
                    </label>
                    <select
                        name="materia"
                        id="selectMateria"
                        className="form-select"
                        onChange={(e) => getAsuntConsultado(e)}
                        defaultValue={idMat}
                        required>
                        <option
                            defaultValue="DEFAULT"
                            value="0"
                            selected="selected"
                            disabled>
                            Seleccione...
                        </option>
                        {materia?.map((materia) => (
                            <option key={materia.id} value={materia.id_materia}>
                                {" "}
                                {materia.nomb_materia}{" "}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">
                        Por favor, selecione una materia.
                    </div>
                </div>
                <div className="row">
                    <div>
                        <label htmlFor="inputCed" className="form-label mt-2">
                            Titulo del Gráfico
                        </label>
                        <input
                            name="nid"
                            type="text"
                            className={`form-control`}
                            id="inputCed"
                            defaultValue={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="row mt-2">
                        <p>Opciones para Exportar</p>
                        <div className="col-md-4 mt-2 text-wrap">
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-success"
                                table="RepoSoliPres"
                                filename="Reporte General"
                                sheet="Solicitud Presencial de Asesorias"
                                buttonText="Exportar datos a Excel"
                            />
                        </div>
                        <div className="col-md-4 mt-2 text-wrap">
                            <button className="btn btn-success me-1">Exportar datos a PDF</button>
                            <button className="d-none btn btn-success">Exportar datos a CSV</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="container-fluid top-50">
                <div className="row">
                    <div className="App">
                        <div className={deshaBar}>
                            <div style={{ width: 500 }}>
                                <BarChart chartData={userData} />
                            </div>
                        </div>
                        <div className={deshaLine}>
                            <div style={{ width: 500 }}>
                                <LineChart chartData={userData} />
                            </div>
                        </div>
                        <div className={deshaPie}>
                            <div style={{ width: 500 }}>
                                <PieChart chartData={userData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <div>
                    <div>
                        <div className="container-fluid position-absolute start-0 w-auto p-3 table-bordered">
                            <button className="btn btn-danger" onClick={() => ResetTable()}>Restrablecer Tabla</button>
                            <table id="RepoSoliPres" className="table table-dark table-striped caption-top badge text-nowrap table-bordered border-primary overflow-auto">
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
                                    <tr>
                                        <td><input id="buscar" onKeyUp={(e) => bscNReport(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscAgent(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscFchCreado(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscStatus(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscOrigenr(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscUsuarios(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscUsObser(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscTdia(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscNdia(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscNombA(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscApell1A(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscApell2A(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscEmail1(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscEmail2(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscTel1(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscTel2(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscProv(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscCanto(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscDistr(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscMateria(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscAsuntot(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscBien(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscTdiC(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscNdiCt(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscRSocial(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscNFantacy(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscDesch(e)} /></td>
                                        <td><input id="buscar" onKeyUp={(e) => bscRespe(e)} /></td>
                                    </tr>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stadistic;