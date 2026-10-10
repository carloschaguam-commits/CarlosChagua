function ejercicio01() {
  let dolares = prompt("Ingrese la cantidad en dolares:");
  let tasa = prompt("Ingrese la tasa de cambio:");
  let resultado = dolares * tasa;
  alert("El equivalente en soles es : " + resultado);
}

function ejercicio02() {
  let largo = prompt("Ingrese el largo del terreno:");
  let ancho = prompt("Ingrese el ancho del terreno:");
  let area = largo * ancho;
  let perimetro = 2 * (Number(largo) + Number(ancho));
  alert("El area es de : " + area + "\nEl perimetro es de : " + perimetro);
}