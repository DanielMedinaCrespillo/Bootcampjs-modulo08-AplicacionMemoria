import { Carta, Tablero, tablero } from "./modelo";
import {
  esPartidaCompleta,
  iniciaPartida,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
  intentos,
  numeroIntentos,
} from "./motor";

const crearTablero = () => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    const dataIndiceId = `[data-indice-id="${indice}"]`;
    const elementoDiv = document.querySelector(`div${dataIndiceId}`);
    if (elementoDiv && elementoDiv instanceof HTMLDivElement) {
      elementoDiv.addEventListener("click", () => manejarClickEnCarta(indice));
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  crearTablero();
  iniciaPartida(tablero);
});

const manejarClickEnCarta = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    volteaCarta(tablero, indice);
  } else {
    cartaYaEstaVolteada();
  }
};

const volteaCarta = (tablero: Tablero, indice: number) => {
  voltearLaCarta(tablero, indice);
  mostrarImagenAnimal(indice);
  mirarSiEsLaSegundaCarta(tablero);
  voltearImagen(indice);
};

const voltearImagen = (indice: number): void => {
  const cuadrado = document.querySelector(`div[data-indice-id="${indice}"]`);
  if (cuadrado && cuadrado instanceof HTMLDivElement) {
    cuadrado.classList.toggle("flipped");
  }
};

const mostrarImagenAnimal = (indice: number) => {
  const imagen = document.querySelector(`img[data-indice-id="${indice}"]`);
  if (imagen && imagen instanceof HTMLImageElement) {
    imagen.src = tablero.cartas[indice].imagen;
  }
};

const mirarSiEsLaSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;

  if (indiceA !== undefined && indiceB !== undefined) {
    if (sonPareja(indiceA, indiceB, tablero)) {
      encontradaPareja(tablero, indiceA, indiceB);
    } else {
      noEncontradaPareja(tablero, indiceA, indiceB);
    }
  }
};

const encontradaPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  parejaEncontrada(tablero, indiceA, indiceB);
  if (esPartidaCompleta(tablero)) {
    const mensajeGanador = document.getElementById("ganador");
    if (mensajeGanador && mensajeGanador instanceof HTMLDivElement) {
      mensajeGanador.innerHTML =
        "Enhorabuena!<br>Has descubierto todas las cartas!";
      mensajeGanador.style.display = "block";
    }
  }
};

const noEncontradaPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  parejaNoEncontrada(tablero, indiceA, indiceB);
  voltearLasCartasQueNoSonParejas(tablero.cartas);
  numeroIntentos();
  elementoIntentos();
};

const voltearLasCartasQueNoSonParejas = (cartas: Carta[]) => {
  setTimeout(() => {
    ponerImagenBocaAbajo(cartas);
  }, 1000);
};

const ponerImagenBocaAbajo = (cartas: Carta[]) => {
  for (let indice = 0; indice < cartas.length; indice++) {
    if (!cartas[indice].encontrada && !cartas[indice].estaVuelta) {
      const imagen = document.querySelector(`img[data-indice-id="${indice}"]`);
      if (imagen && imagen instanceof HTMLImageElement) {
        imagen.src = "";
      }
    }
  }
};

const cartaYaEstaVolteada = () => {
  const mensajeVolteada = document.getElementById("cartavolteada");
  if (mensajeVolteada && mensajeVolteada instanceof HTMLDivElement) {
    mensajeVolteada.innerHTML = "Esta carta ya esta volteada!";
    mensajeVolteada.style.display = "block";
    setTimeout(() => {
      mensajeVolteada.style.display = "none";
    }, 1000);
  }
};
const elementoIntentos = () => {
  const divIntentos = document.getElementById("intentos");

  if (divIntentos && divIntentos instanceof HTMLDivElement) {
    divIntentos.innerHTML = `Numero de Intentos: ${intentos}`;
    divIntentos.style.display = "block";
  }
};

const empezarJuego = document.getElementById("iniciarpartida");

if (empezarJuego && empezarJuego instanceof HTMLButtonElement) {
  empezarJuego.addEventListener("click", function () {
    location.reload();
  });
}
