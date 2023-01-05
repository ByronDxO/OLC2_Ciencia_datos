import M from '@materializecss/materialize/dist/js/materialize.min';
import FileUpload from '../regresiones/fileupload'
import lineal from '../../res/img/lineal.jpg'
import { postfile, generarLineal, generarpoli,generaroArbol,gaus } from '../../Api/Route';
import { useEffect, useState } from "react";
import axios from 'axios'
const Navigation = () => {
  const [data, setData] = useState(null);
  const [nombre1, setNombre1] = useState("")
  const [nombre2, setNombre2] = useState("")
  const [nombre3, setNombre3] = useState("")
  const [predic, setPredic] = useState(0)
  const [tipoRegresion, setTipoRegresion] = useState(1)
  const [name4, setName4] = useState("")
  const [grado, setGrado] = useState("")
  const [nombreG,setNombreG] = useState("")

  const definirNombreG = e =>{
    console.log("entro")
    setNombreG(e)
    console.log(nombreG)
  }
  const SubirArchivo = e => {
    console.log("entro")
    setData(e)
    console.log(data)
  }
  const definirGrado = e => {
    console.log("entro")
    setGrado(e)
    console.log(e)
  }
  const definirnombre = async () => {
    if (tipoRegresion == "1") {
      setName4("regresion lineal")

    } else if (tipoRegresion == "2") {
      setName4("regresion polinomial")
    } else if (tipoRegresion == "3") {
      setName4("Clasificador Gaus")
    } else if (tipoRegresion == "4") {
      setName4("clasificador Arbol")
    } else if (tipoRegresion == "5") {
      setName4("Redes Neuronales ")
    }
  }

  const cargarnombre1 = e => {
    console.log("entro")
    setNombre1(e)
    console.log(e)
  }

  const cargarnombre2 = e => {
    setNombre2(e)
    console.log(nombre2)
  }

  const cargarnombre3 = e => {
    console.log("entro")
    setNombre3(e)
    console.log(e)
  }
  const GenerarGrafica = async () => {
    if (tipoRegresion == "1") {
      console.log(nombre1, nombre2 + "--")
      let a = await generarLineal(nombre1, nombre2, nombre3)
      let a1 = await a.json()
      console.log(a1)
      setPredic(a1)
    } else if (tipoRegresion == "2") {
      setName4("regresion polinomial")
      console.log(nombre1, nombre2 + "--")
      console.log(grado)
      let a = await generarpoli(nombre1, nombre2, nombre3, grado)
      let a1 = await a.json()
      console.log(a1)
      setPredic(a1)
    } else if (tipoRegresion == "3") {
      setName4("Clasificador Gaus")
      console.log(nombre1, nombre2 + "--")
      let a = await gaus(nombre1, nombre2, nombreG)
      let a1 = await a.json()
      console.log(a1)
      setPredic(a1)

    } else if (tipoRegresion == "4") {
      setName4("clasificador Arbol")
      console.log(nombre1, nombre2 + "--")
      console.log(grado)
      let a = await generaroArbol(nombre1, nombre2)
      let a1 = await a.json()
      console.log(a1)
    } else if (tipoRegresion == "5") {
      setName4("Redes Neuronales ")
    }

  }
  const insertarArchivo = async () => {
    const f = new FormData();
    for (let index = 0; index < data.length; index++) {
      f.append("file", data[index])
      console.log("entro")
    }
    await axios.post("http://127.0.0.1:5000/file", f, { headers: { 'Content-Type': 'multipar/form-data' } })
      .then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    M.AutoInit()


  }, []);


  return (

    <div className='container'>
      <h3>Archivo a analizar </h3>
      <form method="post" enctype="multipart/form-data">
        <div>
          <label for="file">Choose file to upload</label>
          <input type="file" name="files" multiple onChange={(e) => SubirArchivo(e.target.files)} />
        </div>
        <div>
          <a class="waves-effect waves-light btn" onClick={() => insertarArchivo()} >button</a>

        </div>
        <a class="waves-effect waves-light btn" onClick={() => setTipoRegresion(1)}>Regresion Lineal </a>

        <a class="waves-effect waves-light btn" onClick={() => setTipoRegresion(2)}>Regresion polinomial</a>

        <a class="waves-effect waves-light btn" onClick={() => setTipoRegresion(3)}>Caslificador Gausiano</a>
        <a class="waves-effect waves-light btn" onClick={() => setTipoRegresion(4)}>Clasificador de arboles</a>

        <a class="waves-effect waves-light btn" onClick={() => setTipoRegresion(5)}>Redes Neuronales</a>
        <a class="waves-effect waves-light btn" onClick={() => definirnombre()}>Definir</a>
      </form>
      <h3>Columnas </h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col s12"><h3>{name4}</h3></div>



        <div class="col s12"><h3>Dependiente </h3></div>

        <div class="col s6">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" onChange={(e) => cargarnombre1(e.target.value)}></textarea>
                <label for="textarea1">Ingresar </label>
              </div>
            </div>
          </form>
        </div>

        <div class="col s12"><h3>Independiente </h3></div>
        <div class="col s4">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" onChange={(e) => cargarnombre2(e.target.value)}></textarea>
                <label for="textarea1">Ingresar </label>
              </div>
            </div>
          </form>

          <h3>Prediccion</h3>

          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="textarea1" class="materialize-textarea" onChange={(e) => cargarnombre3(e.target.value)}></textarea>
                  <label for="textarea1">Ingresar PRediccion</label>
                </div>
              </div>
            </form>
          </div>
        </div>


      </div>

      <div>
        <h3>Grado </h3>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" onChange={(e) => definirGrado(e.target.value)}></textarea>
              <label for="textarea1">Ingresar Grado</label>
            </div>
          </div>
        </form>

      </div>
      <div>
        <h3>Nombre G  </h3>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" onChange={(e) => definirNombreG(e.target.value)}></textarea>
              <label for="textarea1">Ingresar nombre G  </label>
            </div>
          </div>
        </form>

      </div>
      <div className='row'>
        <div className='column s6'>
          <h3> Operaciones</h3>

        </div>
        <div className='column s12'>

        </div>




      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Resultados</span>
              <p>{predic}</p>
            </div>

          </div>
        </div>
      </div>
      <a class="waves-effect waves-light btn" onClick={() => GenerarGrafica()}>Graficar</a>

      <a class="waves-effect waves-light btn">Definir Tendencia</a>

      <a class="waves-effect waves-light btn">Predecir</a>
      <img class="materialboxed" width="650" src={lineal}></img>




    </div>



  );
}

export default Navigation;