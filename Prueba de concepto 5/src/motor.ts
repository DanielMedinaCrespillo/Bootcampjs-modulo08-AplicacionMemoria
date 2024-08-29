import { Carta, Tablero } from "./modelo";

export let intentos = 0;

const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));

const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);
    [{ ...copiaCartas[indice] }, { ...copiaCartas[indiceAleatorio] }] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const card = tablero.cartas[indice];
  if (
    !card.estaVuelta &&
    !card.encontrada &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  ) {
    return true;
  }
  return false;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice;
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    return true;
  } else {
    return false;
  }
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciaPartida = (tablero: Tablero): void => {
  const cartasBarajadas: Carta[] = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export const numeroIntentos = () => {
  intentos++;
  return intentos;
};
