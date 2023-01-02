import streamlit as st
import urllib
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
from sklearn.naive_bayes import BernoulliNB, GaussianNB, MultinomialNB
from sklearn.model_selection import train_test_split

from matplotlib import pyplot as plot

def lineal(x_name, y_name, datos):
    x = datos[x_name].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    plot.scatter(x,y)
    model = LinearRegression()
    model.fit(x,y)
    y_pred =model.predict(x)
    plot.plot(x,y_pred,color='r')
    plot.show()
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y,y_pred)
    print('RMSE', rmse)
    print('R2', r2)

def polinomial(x_name, y_name, datos, degree):
    x = datos[x_name].values.reshape(-1,1)
    y = datos[y_name].values.reshape(-1,1)
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    x_poly = poly.fit_transform(x)
    model = LinearRegression()
    model.fit(x_poly,y)
    y_pred = model.predict(x_poly)
    plot.scatter(x,y)
    plot.plot(x,y_pred,color='r')
    plot.show()
    rmse = np.sqrt(mean_squared_error(y,y_pred))
    r2 = r2_score(y,y_pred)
    print ('RMSE: ' + str(rmse))
    print ('R2: ' + str(r2))

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


