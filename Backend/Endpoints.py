import streamlit as st
import urllib
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
from sklearn.naive_bayes import BernoulliNB, GaussianNB, MultinomialNB
from sklearn.model_selection import train_test_split

from os import remove
from matplotlib import pyplot as plot
import json 
import matplotlib.pyplot as plt
import numpy as np
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.neural_network import MLPRegressor
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
##GAUS

# Import LabelEncoder
from sklearn import preprocessing
from sklearn.naive_bayes import GaussianNB

# Import LabelEncoder
from sklearn import preprocessing

RMSE = 0

def lineal(x_name, y_name, datos,predicciony):
    prediccionx = predicciony
    predi = ""
    x = datos[x_name].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    plot.scatter(x,y)
    model = LinearRegression()
    model.fit(x,y)
    y_pred =model.predict(x)
    plot.plot(x,y_pred,color='r')       
    plot.savefig("/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/Frontend/app-web/src/res/img/lineal.jpg")
    plot.clf()
    plot.cla()
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y,y_pred)   
    print('RMSE', rmse)
    print('R2', r2)
    if prediccionx != "":
        nuevo_x = np.array([float(prediccionx)])
        prediccion = model.predict(nuevo_x.reshape(-1,1))
        prediccionFinal = str(prediccion[0])
        predi = prediccionFinal
    RMSE = rmse
    final = "RMSE:"+str(RMSE)+" R2:"+str(r2)+ " Prediccion: "+str(predi)
    return final
    

def polinomial(x_name, y_name, datos, degree,prediccionx):
    pred = ""
    x = datos[x_name].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    x_poly = poly.fit_transform(x)
    model = LinearRegression()
    model.fit(x_poly,y)
    y_pred = model.predict(x_poly)
    plot.scatter(x,y)
    plot.plot(x,y_pred,color='r')    
    rmse = np.sqrt(mean_squared_error(y,y_pred))
    r2 = r2_score(y,y_pred)
    print ('RMSE: ' + str(rmse))
    print ('R2: ' + str(r2))     
    plot.savefig("/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/Frontend/app-web/src/res/img/lineal.jpg")
    plot.clf()
    plot.cla()
    rmse = np.sqrt(mean_squared_error(y,y_pred))
    r2 = r2_score(y,y_pred)
    print ('RMSE: ' + str(rmse))
    print ('R2: ' + str(r2))
    if prediccionx != "":
        prediccion = model.predict(poly.fit_transform([[float(prediccionx)]]))
        prediccione_final = str(prediccion[0])
        print ('Prediccion: ' + prediccione_final)
        pred = prediccione_final
    final = "RMSE: "+str(rmse)+"R2: "+str(r2)+"preccion:" +str(pred)
    return final

def prediction():
    url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/spambase/spambase.data'
    raw_data = urllib.request.urlopen(url)
    dataset = np.loadtxt(raw_data, delimiter=',')
    x = dataset[:,0:48]
    y = dataset[:, -1]
    x_train, x_test, y_train, y_test = train_test_split(x,y,test_size=0.33,random_state=17)
    BernNB = BernoulliNB(binarize=True)
    BernNB.fit(x_train, y_train)
    y_expect = y_test
    y_pred = BernNB.predict(x_test)
    print(accuracy_score(y_expect, y_pred))
    GausNB = GaussianNB()
    GausNB.fit(x_train, y_train)
    y_pred = GausNB.predict(x_test)
    print(accuracy_score(y_expect, y_pred))


def arbolDecision_func(x_name, y_name, titulo, datos):
    x = datos[x_name].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    x_array = []
    y_array = []

    # Convirtiendo a listas las columnas
    for i in x:
        x_array.append(i[0])

    for j in y:
        y_array.append(j[0])

    # Codificando los datos de las listas
    le = preprocessing.LabelEncoder()
    x_encoded = le.fit_transform(x_array)
    y_encoded = le.fit_transform(y_array)

    # Combinando atributos de listas
    features=list(zip(x_encoded))

    # fit the model
    clf = DecisionTreeClassifier().fit(features, y_encoded)
    plot_tree(clf, filled=True)
    plt.savefig("/home/byron/Documentos/Proyectos/OLC2_Ciencia_datos/Frontend/app-web/src/res/img/lineal.jpg") 
    # plt.show()
    return {'informacion': "arbol generado"}

 

def gaussDecision_func(x_name1, x_name2, y_name, datos):
    x1 = datos[x_name1].values.reshape(-1,1)
    x2 = datos[x_name2].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    x1_array = []
    x1_unicos = []
    x2_array = []
    x2_unicos = []
    y_array = []
    y_unicos = []
    # Convirtiendo a arreglos los datos y sacando los datos unicos
    for i in x1:
        x1_array.append(i[0])
        if i[0] not in x1_unicos:
            x1_unicos.append(i[0])

    for j in x2:
        x2_array.append(j[0])
        if j[0] not in x2_unicos:
            x2_unicos.append(j[0])

    for k in y:
        y_array.append(k[0])
        if k[0] not in y_unicos:
            y_unicos.append(k[0])

    # Codificando la informacion
    le = preprocessing.LabelEncoder()
    x1_encoded = le.fit_transform(x1_array)
    x2_encoded = le.fit_transform(x2_array)
    y_encoded = le.fit_transform(y_array)

    # Convirtiendo a arreglos los datos y sacando los datos unicos
    y_encoded_unicos = []
    for i in y_encoded:
        if i not in y_encoded_unicos:
            y_encoded_unicos.append(i)
    
    x1_encoded_unicos = []
    for i in x1_encoded:
        if i not in x1_encoded_unicos:
            x1_encoded_unicos.append(i)

    x2_encoded_unicos = []
    for i in x2_encoded:
        if i not in x2_encoded_unicos:
            x2_encoded_unicos.append(i)


    informacionPx1 = "Columna x1: " + str(x1_unicos) + "\n" + "Columna x1 encoded: " + str(x1_encoded_unicos) + "\n\n"
    informacionPx2 = "Columna x2: " + str(x2_unicos) + "\n" + "Columna x2 encoded: " + str(x2_encoded_unicos) + "\n\n"
    informacionClasifica = "Columna y: " + str(y_unicos) + "\n" + "Columna y encoded: " + str(y_encoded_unicos) + "\n\n"

    informacionFinal = informacionPx1 + informacionPx2 + informacionClasifica

    # Combinando atributos de las codificaciones
    features=list(zip(x1_encoded, x2_encoded))

    model = GaussianNB()
    model.fit(features, y_encoded)

    # Prediccion Quemada
    predicted = model.predict([[0,27]]) 

    informacionGeneral = "\n" + informacionFinal +"\n Valor a predecir: [0,27] \n" + "Prediccion: " + str(predicted)
    return  informacionGeneral

def RedesNeuronales(x_name,y_name,datos,predicciony):
    df = datos 
    df = df.dropna()
    x = df[x_name]
    y = df[y_name]
    x = np.asarray(x)
    X=x[:,np.newaxis]

    while True:
        x_train,x_test,y_train,y_test = train_test_split(X,y)
        mlr=MLPRegressor(solver='lbfgs', alpha = 1e-5,hidden_layer_sizes=(3,3),random_state=1)
        mlr.fit(x_train,y_train)
        print(mlr.score(x_train,y_train))
        if mlr.score(x_train,y_train)>0.75:
            break
    nuevo_x = np.array([float(predicciony)])
    predic = mlr.predict(nuevo_x.reshape(-1,1))
    return str(predic[0])