const voltearImagen = (): void => {
  const cuadrado = document.querySelector(".cuadrado");
  if (cuadrado) {
    cuadrado.classList.toggle("flipped");
  }
};

const cuadrado = document.querySelector(".cuadrado");
if (cuadrado) {
  cuadrado.addEventListener("click", voltearImagen);
}
