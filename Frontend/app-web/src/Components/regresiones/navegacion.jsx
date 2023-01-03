import M from '@materializecss/materialize/dist/js/materialize.min';
import FileUpload from '../regresiones/fileupload'

import {useEffect, useState} from "react";
const Navigation = () => {

    return (
        
        <div    className='container'>
        <h3>Archivo a analizar </h3>
        <form method="post" enctype="multipart/form-data">
        <div>
            <label for="file">Choose file to upload</label>
            <input type="file" id="file" name="file" multiple />
        </div>
        <div>
            <button>SUBIR</button>
        </div>
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
  <div class="col s12"><h3>Variables</h3></div>
  
  
        
  <div class="col s12"><h3>Dependiente </h3></div>
  
  <div class="col s6">
  <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>


<ul id='dropdown1' class='dropdown-content'>
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li class="divider" tabindex="-1"></li>
  <li><a href="#!">three</a></li>
  <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
  <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
</ul>

  </div>
  
  <div class="col s12"><h3>Independiente </h3></div>
  <div class="col s4">
  <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>


<ul id='dropdown1' class='dropdown-content'>
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li class="divider" tabindex="-1"></li>
  <li><a href="#!">three</a></li>
  <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
  <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
</ul>

<h3>Prediccion</h3>
<div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Ingresar PRediccion</label>
        </div>
      </div>
    </form>
  </div>
  </div>
  
    </div> 
    
        <div className='row'>
        <div className='column s6'>
            <h3> Operaciones</h3>

        </div>


        

    </div>
    
<a class="waves-effect waves-light btn">Graficar</a>

<a class="waves-effect waves-light btn">Definir Tendencia</a>

<a class="waves-effect waves-light btn">Predecir</a>
      
        </div>
      
    
        
    );
}

export default Navigation;