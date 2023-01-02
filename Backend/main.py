from flask import Flask, request, render_template, Response , jsonify
from flask_cors import CORS
from Endpoints import *

app = Flask(__name__)


cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def initial_message():
    """return JSON with string data as the value"""
    #return {'data': 'This text was fetched using an HTTP call to server on render'}, 200
    return {'msg': "Bienvenido a la pagina de ciencia de Datos"}






if __name__ == "__main__":
    app.run(debug=True)