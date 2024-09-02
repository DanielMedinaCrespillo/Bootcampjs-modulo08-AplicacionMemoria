interface CardsImagenes {
  nombre: string;
  imagen: string;
}

const card1 = document.getElementById("carta1") as HTMLDivElement;
const card2 = document.getElementById("carta2") as HTMLDivElement;

let carta1click = false;
let carta2click = false;

const click1cuadro = (): void => {
  const img1 = card1.querySelector("img") as HTMLImageElement;
  img1.src = "imagen/delfin.png";
  carta1click = true;
  chequeoDeCartas();
};

const click2cuadro = (): void => {
  const img2 = card2.querySelector("img") as HTMLImageElement;
  img2.src = "imagen/pinguino.png";
  carta2click = true;
  chequeoDeCartas();
};

const chequeoDeCartas = (): void => {
  if (carta1click && carta2click) {
    setTimeout(() => {
      const img1 = card1.querySelector("img") as HTMLImageElement;
      const img2 = card2.querySelector("img") as HTMLImageElement;
      img1.src = "";
      img2.src = "";
      carta1click = false;
      carta2click = false;
    }, 1000);
  }
};

// Agregar los eventos de clic a las cartas
document.addEventListener("DOMContentLoaded", () => {
  card1.addEventListener("click", click1cuadro);
  card2.addEventListener("click", click2cuadro);
});
