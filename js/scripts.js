// ---------- Ejercicios ----------
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

// ---------- Cambiar texto e imagen del producto ----------
const productos = {
  zeus: {
    img: "imagenes/arcanaz.webp",
    titulo: "Zeus, el Dios del Trueno",
    sku: "BST-498",
    precioViejo: "$45.00",
    precio: "$40.00",
    desc: "Domina el cielo con el Arcana de Zeus. Rayos cargados de energía, una armadura divina y una nube de tormenta que te acompaña en cada combate. Haz que tu héroe luzca como un verdadero dios del trueno."
  },
  juggernaut: {
    img: "imagenes/arcanaj.webp",
    titulo: "Arcana de Juggernaut",
    sku: "BST-499",
    precioViejo: "$45.00",
    precio: "$40.00",
    desc: "El Arcana de Juggernaut transforma tu espada en una hoja legendaria con efectos únicos y animaciones espectaculares."
  },
  wraith: {
    img: "imagenes/arcanaw.jpg",
    titulo: "Arcana de Wraith King",
    sku: "BST-500",
    precioViejo: "$45.00",
    precio: "$40.00",
    desc: "Revive el poder del Rey Espectro con un Arcana lleno de llamas verdes y efectos de ultratumba."
  },
  legion: {
    img: "imagenes/arcanal.webp",
    titulo: "Arcana de Legion Commander",
    sku: "BST-501",
    precioViejo: "$45.00",
    precio: "$40.00",
    desc: "Lidera la legión con armadura dorada, estandartes de guerra y hojas ardientes que dejan una estela de fuego en cada duelo."
  },
  terrorblade: {
    img: "imagenes/arcanat.jpeg",
    titulo: "Arcana de Terrorblade",
    sku: "BST-502",
    precioViejo: "$45.00",
    precio: "$40.00",
    desc: "Alas oscuras, un núcleo carmesí y garras de energía roja. Convierte a tu demonio en una verdadera pesadilla."
  }
};

function cambiarProducto(clave) {
  const p = productos[clave];
  document.getElementById("imgProducto").src = p.img;
  document.getElementById("tituloProducto").textContent = p.titulo;
  document.getElementById("skuProducto").textContent = p.sku;
  document.getElementById("precioViejo").textContent = p.precioViejo;
  document.getElementById("precioProducto").textContent = p.precio;
  document.getElementById("descProducto").textContent = p.desc;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Botón que rota entre los 5 productos
const orden = ["zeus", "juggernaut", "wraith", "legion", "terrorblade"];
let indiceActual = 0;

function alternar() {
  indiceActual = (indiceActual + 1) % orden.length;
  cambiarProducto(orden[indiceActual]);
}
