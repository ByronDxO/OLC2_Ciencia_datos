from flask import Flask, request, render_template, Response , jsonify
from io import BytesIO
from flask_cors import CORS
from Endpoints import lineal,polinomial,arbolDecision_func,gaussDecision_func
import pandas as pd
import os
from os import remove

app = Flask(__name__)


cors = CORS(app, resources={r"/*": {"origins": "*"}})
UPLOAD_FOLDER  = '/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/uploads'
app.config['UPLOAD_FOLDER']= UPLOAD_FOLDER
file_name = ""

@app.route("/")
def initial_message():
    """return JSON with string data as the value"""
    #return {'data': 'This text was fetched using an HTTP call to server on render'}, 200
    return {'msg': "Bienvenido a la pagina de ciencia de Datos"}


@app.route('/file', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    
    d = {}
    try:        
        file = request.files['file']
        filename = file.filename    
        file_name = filename    
        print(f"Uploading file {filename}")
        file.save(os.path.join(app.config['UPLOAD_FOLDER'],'lineal.csv'))
        file_bytes = file.read()
        file_content = BytesIO(file_bytes).readlines()
        print(file_content)
        d['status'] = 1
        print(file_name)
        df = pd.read_csv(UPLOAD_FOLDER+'/'+'lineal.csv')
        print(df)

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)

@app.route('/generar_lineal', methods=['POST'])
def generarlLineal():
    req = request.json
    if request.is_json:
        try:
            nombre1 = req['nombre']
            nombre2 = req['variable']
            prediccion = req['prediccion']
            
            df = pd.read_csv(UPLOAD_FOLDER+'/'+'lineal.csv')
            result =  lineal( str(nombre1),str(nombre2),df,prediccion)
            print(result)

            return jsonify(result)
        except Exception as ex:
            return {'msg': f"error al generar lineal ",
                    'error': ex}, 501
    return {'msg': "Datos incorrectos",
            'error': "Los datos deben tener el formato json"}, 501

@app.route('/generar_pol', methods=['POST'])
def generarpol():
    req = request.json
    if request.is_json:
        try:
            nombre1 = req['nombre']
            nombre2 = req['variable']
            prediccion = req['prediccion']
            grade = req['grado']
            print(nombre1,nombre2,prediccion,grade)
            df = pd.read_csv('/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/uploads/lineal.csv')
            print(df)
            #result =  polinomial( str(nombre1),str(nombre2),df,grado,prediccion)
            result = polinomial(str(nombre1),str(nombre2),df,int(grade) ,prediccion)
            print(result)
            
            return jsonify(str(result))
        except Exception as ex:
            return {'msg': f"error al generar lineal ",
                    'error': ex}, 501
    return {'msg': "Datos incorrectos",
            'error': "Los datos deben tener el formato json"}, 501   



@app.route('/generar_arbol', methods=['POST'])
def generarArbol():
    req = request.json
    if request.is_json:
        try:
            nombre1 = req['nombre']
            nombre2 = req['variable']
            
            print(nombre1,nombre2)
            df = pd.read_csv('/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/uploads/lineal.csv')
            print(df)
            #result =  polinomial( str(nombre1),str(nombre2),df,grado,prediccion)
            print("entro a server")
           # result = arbolDecision_func(str(nombre1),str(nombre2),"TREE",df)    
            
            result = arbolDecision_func(str(nombre1),str(nombre2),"arbol",df)        
            print("arbol generado ")
            
            return jsonify(str(result))
        except Exception as ex:
            return {'msg': f"error al generar lineal ",
                    'error': ex}, 501
    return {'msg': "Datos incorrectos",
            'error': "Los datos deben tener el formato json"}, 501   
            

@app.route('/gaus', methods=['POST'])
def Gaus():
    req = request.json
    if request.is_json:
        try:
            nombre1 = req['nombre']
            nombre2 = req['variable']
            nombre3 = req['nombreG']
            print(nombre1,nombre2)
            df = pd.read_csv('/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/uploads/lineal.csv')
            print(df)
            #result =  polinomial( str(nombre1),str(nombre2),df,grado,prediccion)
            print("entro a server")
           # result = arbolDecision_func(str(nombre1),str(nombre2),"TREE",df)    
            
            result = gaussDecision_func(str(nombre1),str(nombre2),str(nombre3),df)        
            print("arbol generado ")
            
            return jsonify(str(result))
        except Exception as ex:
            return {'msg': f"error al generar lineal ",
                    'error': ex}, 501
    return {'msg': "Datos incorrectos",
            'error': "Los datos deben tener el formato json"}, 501  
if __name__ == "__main__":
    app.run(debug=True)