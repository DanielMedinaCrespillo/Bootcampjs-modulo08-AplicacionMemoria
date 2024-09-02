const animales = [
  "🐸",
  "🐧",
  "🐤",
  "🐇",
  "🦅",
  "🐈",
  "🐸",
  "🐧",
  "🐤",
  "🐇",
  "🦅",
  "🐈",
];

function barajarArray(animales: string[]): string[] {
  let indice = animales.length;
  while (indice != 0) {
    let indiceAleatorio = Math.floor(Math.random() * indice);
    indice--;
    [animales[indice], animales[indiceAleatorio]] = [
      animales[indiceAleatorio],
      animales[indice],
    ];
  }
  return animales;
}

console.log(barajarArray(animales));
