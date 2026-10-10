/* ===== TecNova: JavaScript del sitio ===== */
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Formulario de registro (admision.html) ---------- */
  var form = document.getElementById("formRegistro");
  if (!form) return;

  var resultado = document.getElementById("resultado");
  var resumen = document.getElementById("resumenErrores");
  var intentado = false; // los errores se muestran al primer intento de envio

  // Pre-seleccionar carrera si viene en la URL (?carrera=...)
  var carreraURL = new URLSearchParams(location.search).get("carrera");
  if (carreraURL) {
    var sel = document.getElementById("carrera");
    Array.prototype.forEach.call(sel.options, function (o) {
      if (o.text === carreraURL) sel.value = o.text;
    });
  }

  // Solo numeros en el telefono
  var tel = document.getElementById("telefono");
  tel.addEventListener("input", function () { tel.value = tel.value.replace(/\D/g, "").slice(0, 9); });

  function marcar(campo, mensaje) {
    var err = document.getElementById("error-" + campo.id);
    campo.classList.toggle("is-invalid", !!mensaje);
    campo.classList.toggle("is-valid", !mensaje && campo.value.trim() !== "");
    if (err) err.textContent = mensaje || "";
    return mensaje;
  }

  function marcarGrupo(nombre, mensaje) {
    var err = document.getElementById("error-" + nombre);
    form.querySelectorAll('[name="' + nombre + '"]').forEach(function (i) { i.classList.toggle("is-invalid", !!mensaje); });
    err.textContent = mensaje || "";
    err.classList.toggle("d-none", !mensaje);
    return mensaje;
  }

  // Devuelve la lista de errores y pinta cada campo
  function validar() {
    var errores = [];
    function add(m) { if (m) errores.push(m); }

    var nombre = document.getElementById("nombre");
    add(marcar(nombre,
      nombre.value.trim() === "" ? "Ingresa tu nombre completo." :
      nombre.value.trim().split(/\s+/).length < 2 ? "Escribe tu nombre y apellido." : ""));

    var correo = document.getElementById("correo");
    add(marcar(correo,
      correo.value.trim() === "" ? "Ingresa tu correo electronico." :
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.value.trim()) ? "Escribe un correo valido (ej. nombre@correo.com)." : ""));

    var edad = document.getElementById("edad");
    var e = Number(edad.value);
    add(marcar(edad,
      edad.value === "" ? "Ingresa tu edad." :
      (!Number.isInteger(e) || e < 16 || e > 99) ? "La edad debe estar entre 16 y 99 años." : ""));

    var tl = document.getElementById("telefono");
    add(marcar(tl,
      tl.value === "" ? "Ingresa tu telefono." :
      !/^9\d{8}$/.test(tl.value) ? "El telefono debe tener 9 digitos y empezar con 9." : ""));

    var ciudad = document.getElementById("ciudad");
    add(marcar(ciudad, ciudad.value.trim() === "" ? "Indica tu ciudad." : ""));

    var carrera = document.getElementById("carrera");
    add(marcar(carrera, carrera.value === "" ? "Selecciona una carrera." : ""));

    add(marcarGrupo("modalidad", form.querySelector('[name="modalidad"]:checked') ? "" : "Elige una modalidad."));
    add(marcarGrupo("turno", form.querySelector('[name="turno"]:checked') ? "" : "Elige al menos un turno."));

    var t = document.getElementById("terminos");
    t.classList.toggle("is-invalid", !t.checked);
    var et = document.getElementById("error-terminos");
    et.textContent = t.checked ? "" : "Debes aceptar el tratamiento de tus datos.";
    et.style.display = t.checked ? "none" : "block";
    if (!t.checked) errores.push(et.textContent);

    return errores;
  }

  function mostrarResumen(errores) {
    if (!errores.length) { resumen.classList.add("d-none"); resumen.innerHTML = ""; return; }
    resumen.classList.remove("d-none");
    resumen.innerHTML = "<strong>Faltan datos o hay errores (" + errores.length + "):</strong><ul>" +
      errores.map(function (m) { return "<li>" + m + "</li>"; }).join("") + "</ul>";
  }

  // Revalidar en vivo una vez que la persona intento enviar
  form.addEventListener("input", function () { if (intentado) mostrarResumen(validar()); });
  form.addEventListener("change", function () { if (intentado) mostrarResumen(validar()); });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault(); // el formulario no se envia realmente
    intentado = true;
    resultado.innerHTML = "";
    var errores = validar();
    mostrarResumen(errores);

    if (errores.length) {
      var primero = form.querySelector(".is-invalid");
      if (primero) primero.focus();
      return; // BLOQUEADO: falta algun dato
    }

    // Todo correcto: mostrar confirmacion (sin enviar a ningun servidor)
    var turnos = Array.prototype.map.call(form.querySelectorAll('[name="turno"]:checked'), function (c) { return c.value; }).join(", ");
    var d = {
      nombre: form.nombre.value.trim(), correo: form.correo.value.trim(), edad: form.edad.value,
      telefono: form.telefono.value, ciudad: form.ciudad.value.trim(), carrera: form.carrera.value,
      modalidad: form.querySelector('[name="modalidad"]:checked').value, turno: turnos
    };
    var div = document.createElement("div");
    div.className = "resultado-ok";
    div.innerHTML = "<h3 class='h5'>✅ ¡Registro completo!</h3><p>Gracias, <strong></strong>. Un asesor se comunicara contigo pronto.</p><pre></pre>";
    div.querySelector("strong").textContent = d.nombre.split(" ")[0];
    div.querySelector("pre").textContent = Object.keys(d).map(function (k) { return k + ": " + d[k]; }).join("\n");
    resultado.appendChild(div);
    div.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  form.addEventListener("reset", function () {
    intentado = false;
    resultado.innerHTML = "";
    mostrarResumen([]);
    setTimeout(function () {
      form.querySelectorAll(".is-invalid, .is-valid").forEach(function (i) { i.classList.remove("is-invalid", "is-valid"); });
      form.querySelectorAll(".invalid-feedback").forEach(function (i) { i.textContent = ""; i.style.display = ""; });
      form.querySelectorAll(".text-danger.small").forEach(function (i) { i.classList.add("d-none"); });
    }, 0);
  });
});
