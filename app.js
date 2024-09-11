let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;
const maxIntentos = 2; // Máximo de intentos permitidos por jugador
let jugadores = 5; // Número de jugadores
let jugadorActual = 0;

function asignarTextoElemento(elemento, texto) {
    const elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    } else {
        console.error(`Elemento con selector "${elemento}" no encontrado.`);
    }
}

function verificarIntento() {
    const numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (!numeroDeUsuario || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Introduce un número entre 1 y ${numeroMaximo}.`);
        return;
    }

    intentos++;
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Jugador ${jugadorActual + 1} acertó el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        terminarJuego();
    } else {
        if (intentos >= maxIntentos) {
            asignarTextoElemento('p', `Jugador ${jugadorActual + 1} ha agotado sus intentos. El número secreto era ${numeroSecreto}.`);
            pasarAlSiguienteJugador();
        } else {
            asignarTextoElemento('p', numeroDeUsuario > numeroSecreto ? 'El número secreto es menor.' : 'El número secreto es mayor.');
            limpiarCaja();
        }
    }
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

function generarNumeroSecreto() {
    const numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
        return null;
    } else if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    listaNumerosSorteados = [];
    jugadorActual = 0;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('valorUsuario').removeAttribute('disabled');
    asignarTextoElemento('p', 'Jugador 1, adivina el número secreto entre 1 y 10.');
    limpiarCaja();
    console.log(`Número secreto generado: ${numeroSecreto}`);
}

function terminarJuego() {
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
}

function pasarAlSiguienteJugador() {
    if (jugadorActual < jugadores - 1) {
        jugadorActual++;
        intentos = 0;
        asignarTextoElemento('p', `Jugador ${jugadorActual + 1}, adivina el número secreto entre 1 y 10.`);
        limpiarCaja();
    } else {
        asignarTextoElemento('p', `Todos los jugadores han tenido su turno. El número secreto era ${numeroSecreto}.`);
        terminarJuego();
    }
}

// Inicia el juego
condicionesIniciales();

// Evento para reiniciar el juego
document.getElementById('reiniciar').addEventListener('click', condicionesIniciales);

// Evento para verificar el intento
document.querySelector('.container__boton').addEventListener('click', verificarIntento);