/* URL - Backend*/
const url_api = "http://127.0.0.1:5000";

/* ENDPOINT */
/* USER */
const url_getUser      = url_api + "/verUsuarios";
const url_getLogin     = url_api + "/login";
const url_getRegistrar = url_api + "/registro";
/* GRAFICA */
const url_getRate     = url_api + "/graficaRitmo";
const url_getStrength = url_api + "/graficaFuerza";
const url_getVelocity = url_api + "/graficaVelocidad";
/* Reporte */
const url_getReporte1 = url_api + "/reportenumEntrenamiento";
const url_getReporte2 = url_api + "/reportenumEntrenamientoTipo";
const url_getReporte3 = url_api + "/reportenduracionEntrenamiento";

/* USER */
export async function getUser(){
    return fetch(url_getUser, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}

export async function getLogin(name, password){

    return fetch(url_getLogin, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: name,
            pass: password
        }),
    });
}

export async function addUser(name, password){

    return fetch(url_getRegistrar, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: name,
            pass: password
        }),
    });
}

/* GRAPH */

export async function getGraphStrength(id, date1, date2, limit){ /* Strength */

    return fetch(url_getStrength, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id,
            fechainicio:date1,
            fechafinal:date2,
            limite:limit
        }),
    });
}

export async function getGraphVelocity(id, date1, date2, limit){ /* Velocity */

    return fetch(url_getVelocity, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id,
            fechainicio:date1,
            fechafinal:date2,
            limite:limit
        }),
    });
}

export async function getGraphRate(id, date1, date2, limit){ /* Rate */

    return fetch(url_getRate, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id,
            fechainicio:date1,
            fechafinal:date2,
            limite:limit
        }),
    });
}


/* REPORTE */
export async function getReporte1(id){ /* Rate */

    return fetch(url_getReporte1, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id
        }),
    });
}

/* REPORTE */
export async function getReporte2(id, type){ /* Rate */

    return fetch(url_getReporte2, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id,
            tipo:type
        }),
    });
}

export async function getReporte3(id){ /* Rate */

    return fetch(url_getReporte3, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario:id
        }),
    });
}