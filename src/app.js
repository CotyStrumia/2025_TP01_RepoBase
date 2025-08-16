// Versión mejorada (parte 2)
function saludar(nombre = "mundo") {
  console.log(`Hola ${nombre}`);
}

function saludarEnMayusculas(nombre = "mundo") {
  console.log(`HOLA ${String(nombre).toUpperCase()}`);
}

saludar();                 // salida original
saludar("equipo");         // param
saludarEnMayusculas("dev") // segundo modo
