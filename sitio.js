/* ===== Datos que se cambian aquí y se actualizan en todo el sitio ===== */
var WHATSAPP = "573177609333";   // número con indicativo de Colombia, sin + ni espacios
var PRECIO_LIBRA = 45000;        // precio de la libra de 500 g, en pesos

function pesos(n) { return "$" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function enlaceWa(texto) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto); }

document.querySelectorAll(".js-precio").forEach(function (el) { el.textContent = pesos(PRECIO_LIBRA); });
document.querySelectorAll(".js-anio").forEach(function (el) { el.textContent = new Date().getFullYear(); });

// Enlaces directos a WhatsApp (caja "Cotiza con nosotros", pie, botón flotante y tarjetas)
var saludo = "Hola, vi la página de D'Excelso Café y quiero saber qué café tienen disponible.";
document.querySelectorAll(".js-wa").forEach(function (a) {
  a.href = enlaceWa(a.dataset.mensaje || saludo); a.target = "_blank"; a.rel = "noopener";
});

// Formulario: arma el mensaje y abre WhatsApp
var form = document.getElementById("formPedido");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var libras = Math.max(1, parseInt(form.libras.value, 10) || 1);
    var lineas = [
      "Hola, quiero pedir D'Excelso Café.",
      "",
      "Nombre: " + form.nombre.value.trim(),
      "Ciudad: " + form.ciudad.value.trim(),
      "Cantidad: " + libras + (libras === 1 ? " libra" : " libras") + " (500 g c/u)",
      "Presentación: " + form.presentacion.value,
      "Es: " + form.uso.value.toLowerCase()
    ];
    if (form.nota.value.trim()) lineas.push("Nota: " + form.nota.value.trim());
    window.open(enlaceWa(lineas.join("\n")), "_blank", "noopener");
  });
}

// Menú en celular
var boton = document.getElementById("navBoton"), enlaces = document.getElementById("navEnlaces");
boton.addEventListener("click", function () {
  var abierto = enlaces.classList.toggle("abierto");
  boton.setAttribute("aria-expanded", abierto);
});
enlaces.addEventListener("click", function (e) {
  if (e.target.tagName === "A") { enlaces.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); }
});

// Botón flotante de WhatsApp al bajar
var flotante = document.getElementById("waFlotante");
function alBajar() { flotante.classList.toggle("visible", window.scrollY > 500); }
window.addEventListener("scroll", alBajar, { passive: true }); alBajar();
