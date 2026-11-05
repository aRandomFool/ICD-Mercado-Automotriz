/* ============================================================
   Dos caminos para comprar un carro en La Habana
   Interactivos calculados en el navegador sobre window.DATOS
   Sin dependencias · sin peticiones de red
   ============================================================ */

(() => {
  "use strict";

  const D = window.DATOS;
  if (!D) {
    console.error("No se encontró window.DATOS: revisa assets/js/datos.js");
    return;
  }

  const $ = (selector, contexto = document) => contexto.querySelector(selector);
  const $$ = (selector, contexto = document) => Array.from(contexto.querySelectorAll(selector));

  const nf = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" });
  const nf1 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1, useGrouping: "always" });
  const collator = new Intl.Collator("es");

  const fmt = (valor) => nf.format(Math.round(Number(valor) || 0));
  const usd = (valor) => `${fmt(valor)} USD`;
  const pct = (valor) => `${nf1.format(Number(valor) || 0).replace(".", ",")} %`;

  const esc = (texto) =>
    String(texto ?? "").replace(/[&<>"']/g, (caracter) => {
      const mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return mapa[caracter];
    });

  const CALIDAD = {
    suficiente: ["badge--suficiente", "Muestra suficiente (n≥30)"],
    baja: ["badge--baja", "Muestra baja (10–29)"],
    insuficiente: ["badge--insuficiente", "Muestra insuficiente (<10)"],
    neutro: ["badge--neutro", "Sin precios válidos"],
  };

  function badgeCalidad(clave, n) {
    const [clase, texto] = n > 0 ? CALIDAD[clave] || CALIDAD.insuficiente : CALIDAD.neutro;
    return `<span class="badge ${clase}">${texto}</span>`;
  }

  /** Índice del primer elemento > valor en un array ordenado. */
  function limiteSuperior(arreglo, valor) {
    let bajo = 0;
    let alto = arreglo.length;
    while (bajo < alto) {
      const medio = (bajo + alto) >> 1;
      if (arreglo[medio] <= valor) bajo = medio + 1;
      else alto = medio;
    }
    return bajo;
  }

  function textoCalidad(clave, n) {
    if (!n) return "Sin precios válidos para este grupo.";
    if (clave === "suficiente") return "Lectura razonable: n≥30.";
    if (clave === "baja") return "Leer con cautela: 10≤n<30.";
    return "No usar para conclusiones: n<10.";
  }


  /* ------------------------------------------------------------
     Figuras: enlace para ampliar y desplazamiento en móvil
     ------------------------------------------------------------ */
  function initFiguras() {
    $$(".figura > img").forEach((imagen) => {
      const enlace = document.createElement("a");
      enlace.className = "figura__enlace";
      enlace.href = imagen.getAttribute("src");
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.setAttribute("aria-label", "Abrir el gráfico en tamaño completo");

      const lienzo = document.createElement("span");
      lienzo.className = "figura__scroll";

      imagen.parentNode.insertBefore(enlace, imagen);
      lienzo.appendChild(imagen);
      enlace.appendChild(lienzo);

      const zoom = document.createElement("span");
      zoom.className = "figura__zoom";
      zoom.textContent = "Ampliar ↗";
      enlace.appendChild(zoom);
    });
  }

  /* ------------------------------------------------------------
     Bloque 1 · Mi presupuesto
     ------------------------------------------------------------ */
  function initPresupuesto() {
    const control = $("#presupuesto");
    if (!control) return;

    const precios = D.informal.precios_validos;
    const formales = D.formal.precios_validos;
    const base = D.meta.muestras.informal_precio_valido;
    const puntos = D.informal.puntos_marca;
    const etiquetas = new Map(D.informal.marcas.map((m) => [m.clave, m.label]));

    const salidaValor = $("#presupuesto-valor");
    const salidaPct = $("#presupuesto-pct");
    const salidaResumen = $("#presupuesto-resumen");
    const salidaFormales = $("#presupuesto-formales");
    const salidaMarcas = $("#presupuesto-marcas");

    const actualizar = () => {
      const presupuesto = Number(control.value);
      salidaValor.textContent = usd(presupuesto);

      const alcanzables = limiteSuperior(precios, presupuesto);
      const proporcion = base ? (alcanzables / base) * 100 : 0;
      salidaPct.textContent = pct(proporcion);
      salidaResumen.textContent = `${fmt(alcanzables)} anuncios informales dentro del presupuesto, de ${fmt(base)} con precio válido.`;

      const modelosFormales = limiteSuperior(formales, presupuesto);
      salidaFormales.textContent = fmt(modelosFormales);

      const conteo = new Map();
      for (const punto of puntos) {
        if (punto.p <= presupuesto) conteo.set(punto.m, (conteo.get(punto.m) || 0) + 1);
      }
      const top = Array.from(conteo.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      const maximo = top.length ? top[0][1] : 1;

      salidaMarcas.innerHTML = top.length
        ? top
            .map(
              ([clave, cantidad]) => `
              <li class="fila-barra">
                <span>${esc(etiquetas.get(clave) || clave)}</span>
                <span class="fila-barra__pista"><span class="fila-barra__relleno" style="width:${((cantidad / maximo) * 100).toFixed(1)}%"></span></span>
                <b>${fmt(cantidad)}</b>
              </li>`
            )
            .join("")
        : '<li class="resultado__texto">No hay anuncios con marca identificada en este rango.</li>';
    };

    control.addEventListener("input", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 2 · Mediana / media recortada
     ------------------------------------------------------------ */
  function initVariante() {
    const botones = $$("[data-variante]");
    if (!botones.length) return;

    const b = D.meta.brecha;
    const salidaInformal = $("#brecha-informal");
    const salidaFormal = $("#brecha-formal");
    const salidaDiferencia = $("#brecha-diferencia");
    const salidaEtiqueta = $("#brecha-etiqueta");
    const barraInformal = $("#barra-informal");
    const barraFormal = $("#barra-formal");

    const aplicar = (variante) => {
      const mediana = variante === "mediana";
      const informal = mediana ? b.informal_mediana : b.informal_media_recortada_10;
      const formal = mediana ? b.formal_mediana : b.formal_media_recortada_10;
      const diferencia = formal - informal;
      const maximo = Math.max(informal, formal) || 1;

      salidaInformal.textContent = usd(informal);
      salidaFormal.textContent = usd(formal);
      salidaDiferencia.textContent = usd(diferencia);
      salidaEtiqueta.textContent = mediana ? "· medianas" : "· media recortada al 10%";
      barraInformal.style.width = `${(informal / maximo) * 100}%`;
      barraFormal.style.width = `${(formal / maximo) * 100}%`;

      botones.forEach((boton) => {
        const activo = boton.dataset.variante === variante;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
      });
    };

    botones.forEach((boton) => boton.addEventListener("click", () => aplicar(boton.dataset.variante)));
    aplicar("mediana");
  }

  /* ------------------------------------------------------------
     Bloque 3 · Anuncios por municipio
     ------------------------------------------------------------ */
  function initMunicipioConteo() {
    const select = $("#municipio-conteo");
    if (!select) return;

    const municipios = [...D.informal.municipios].sort((a, b) => collator.compare(a.label, b.label));
    const total = D.meta.muestras.informal_total;

    select.innerHTML = municipios
      .map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`)
      .join("");

    const salida = {
      anuncios: $("#mc-anuncios"),
      pct: $("#mc-pct"),
      n: $("#mc-precio-n"),
      calidad: $("#mc-calidad"),
    };

    const actualizar = () => {
      const municipio = municipios.find((m) => m.clave === select.value) || municipios[0];
      salida.anuncios.textContent = fmt(municipio.anuncios);
      salida.pct.textContent = pct(total ? (municipio.anuncios / total) * 100 : 0);
      salida.n.textContent = fmt(municipio.n);
      salida.calidad.innerHTML = `${badgeCalidad(municipio.calidad, municipio.n)} <span class="resultado__texto">${textoCalidad(municipio.calidad, municipio.n)}</span>`;
    };

    select.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 4 · Precio por municipio
     ------------------------------------------------------------ */
  function initMunicipioPrecio() {
    const select = $("#municipio-precio");
    if (!select) return;

    const municipios = [...D.informal.municipios].sort((a, b) => collator.compare(a.label, b.label));
    select.innerHTML = municipios
      .map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`)
      .join("");

    const salida = {
      mediana: $("#mp-mediana"),
      recortada: $("#mp-recortada"),
      rango: $("#mp-rango"),
      n: $("#mp-n"),
      calidad: $("#mp-calidad"),
    };

    const actualizar = () => {
      const municipio = municipios.find((m) => m.clave === select.value) || municipios[0];
      if (!municipio || !municipio.n) {
        salida.mediana.textContent = "—";
        salida.recortada.textContent = "—";
        salida.rango.textContent = "—";
        salida.n.textContent = "0";
        salida.calidad.innerHTML = badgeCalidad("neutro", 0);
        return;
      }
      salida.mediana.textContent = fmt(municipio.mediana);
      salida.recortada.textContent = usd(municipio.media_recortada_10);
      salida.rango.textContent = `${fmt(municipio.p25)}–${usd(municipio.p75)}`;
      salida.n.textContent = fmt(municipio.n);
      salida.calidad.innerHTML = `${badgeCalidad(municipio.calidad, municipio.n)} <span class="resultado__texto">${textoCalidad(municipio.calidad, municipio.n)}</span>`;
    };

    select.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 5 · Selector de marca
     ------------------------------------------------------------ */
  function initMarca() {
    const select = $("#marca-select");
    if (!select) return;

    const marcas = D.informal.marcas.filter((m) => m.n > 0);
    select.innerHTML = marcas
      .map((m) => `<option value="${esc(m.clave)}">${esc(m.label)} (${fmt(m.n)})</option>`)
      .join("");

    const salida = {
      mediana: $("#marca-mediana"),
      recortada: $("#marca-recortada"),
      rango: $("#marca-rango"),
      n: $("#marca-n"),
      anuncios: $("#marca-anuncios"),
      calidad: $("#marca-calidad"),
    };

    const actualizar = () => {
      const marca = marcas.find((m) => m.clave === select.value) || marcas[0];
      if (!marca) return;
      salida.mediana.textContent = fmt(marca.mediana);
      salida.recortada.textContent = usd(marca.media_recortada_10);
      salida.rango.textContent = `${fmt(marca.min)}–${usd(marca.max)}`;
      salida.n.textContent = fmt(marca.n);
      salida.anuncios.textContent = fmt(marca.anuncios);
      salida.calidad.innerHTML = `${badgeCalidad(marca.calidad, marca.n)} <span class="resultado__texto">${textoCalidad(marca.calidad, marca.n)}</span>`;
    };

    select.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 6 · Tabla filtrable del catálogo
     ------------------------------------------------------------ */
  function initTabla() {
    const cuerpo = $("#tabla-cuerpo");
    if (!cuerpo) return;

    const catalogo = D.formal.catalogo;
    const buscar = $("#tabla-buscar");
    const entidad = $("#tabla-entidad");
    const marca = $("#tabla-marca");
    const orden = $("#tabla-orden");
    const conteo = $("#tabla-conteo");

    const entidades = Array.from(new Set(catalogo.map((f) => f.entidad))).sort(collator.compare);
    const marcas = Array.from(new Set(catalogo.map((f) => f.marca))).sort(collator.compare);

    entidad.insertAdjacentHTML(
      "beforeend",
      entidades.map((valor) => `<option value="${esc(valor)}">${esc(valor)}</option>`).join("")
    );
    marca.insertAdjacentHTML(
      "beforeend",
      marcas.map((valor) => `<option value="${esc(valor)}">${esc(valor)}</option>`).join("")
    );

    const filtrar = () => {
      const texto = (buscar.value || "").trim().toLowerCase();
      const entidadElegida = entidad.value;
      const marcaElegida = marca.value;

      let filas = catalogo.filter((fila) => {
        if (entidadElegida && fila.entidad !== entidadElegida) return false;
        if (marcaElegida && fila.marca !== marcaElegida) return false;
        if (!texto) return true;
        return `${fila.entidad} ${fila.marca} ${fila.modelo} ${fila.clase} ${fila.propulsion}`
          .toLowerCase()
          .includes(texto);
      });

      if (orden.value === "precio-asc") filas.sort((a, b) => a.precio_usd - b.precio_usd);
      else if (orden.value === "precio-desc") filas.sort((a, b) => b.precio_usd - a.precio_usd);
      else filas.sort((a, b) => collator.compare(a.marca, b.marca) || collator.compare(a.modelo, b.modelo));

      conteo.textContent = `${fmt(filas.length)} de ${fmt(catalogo.length)} modelos`;

      cuerpo.innerHTML = filas.length
        ? filas
            .map(
              (fila) => `
              <tr>
                <td>${esc(fila.entidad)}</td>
                <td>${esc(fila.marca)}</td>
                <td>${esc(fila.modelo)}</td>
                <td>${esc(fila.clase || "—")}</td>
                <td>${esc(fila.propulsion || "—")}</td>
                <td class="tabla__num">${fmt(fila.precio_usd)}</td>
              </tr>`
            )
            .join("")
        : '<tr><td colspan="6" class="tabla-vacia">No hay modelos con esos filtros.</td></tr>';
    };

    [buscar, entidad, marca, orden].forEach((elemento) => {
      elemento.addEventListener("input", filtrar);
      elemento.addEventListener("change", filtrar);
    });

    filtrar();
  }

  /* ------------------------------------------------------------
     Bloque 7 · Comparación por marca
     ------------------------------------------------------------ */
  function initComparacion() {
    const select = $("#comparacion-select");
    if (!select) return;

    const marcas = D.comparacion.marcas;
    select.innerHTML = marcas
      .map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`)
      .join("");

    const salida = {
      infMediana: $("#comp-inf-mediana"),
      infN: $("#comp-inf-n"),
      formMediana: $("#comp-form-mediana"),
      formN: $("#comp-form-n"),
      diferencia: $("#comp-diferencia"),
      calidad: $("#comp-calidad"),
    };

    const actualizar = () => {
      const marca = marcas.find((m) => m.clave === select.value) || marcas[0];
      if (!marca) return;
      const diferencia = marca.informal.mediana - marca.formal.mediana;

      salida.infMediana.textContent = usd(marca.informal.mediana);
      salida.infN.textContent = fmt(marca.informal.n);
      salida.formMediana.textContent = usd(marca.formal.mediana);
      salida.formN.textContent = fmt(marca.formal.n);
      salida.diferencia.textContent = `Diferencia: ${usd(Math.abs(diferencia))} ${diferencia >= 0 ? "más en el informal" : "más en el formal"}`;
      salida.calidad.innerHTML = `${badgeCalidad(marca.calidad.informal, marca.informal.n)} <span class="resultado__texto">informal</span> &nbsp; ${badgeCalidad(marca.calidad.formal, marca.formal.n)} <span class="resultado__texto">formal</span>`;
    };

    select.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 8 · Con año / sin año
     ------------------------------------------------------------ */
  function initAnio() {
    const botones = $$("[data-anio]");
    if (!botones.length) return;

    const anios = D.informal.anios;
    const total = D.meta.muestras.informal_total;
    const titulo = $("#anio-titulo");
    const sufijo = $("#anio-sufijo");
    const detalle = $("#anio-detalle");
    const barras = $("#anio-barras");

    const fila = (etiqueta, porcentaje, clase) => `
      <div class="barras-anio__fila">
        <span>${etiqueta}</span>
        <div class="barra"><span class="${clase || ""}" style="width:${porcentaje.toFixed(1)}%"></span></div>
        <b>${pct(porcentaje)}</b>
      </div>`;

    const aplicar = (modo) => {
      const conAnio = modo === "con";
      if (conAnio) {
        const base = anios.declarado || 1;
        const clasicosPct = (anios.clasicos / base) * 100;
        const modernosPct = (anios.modernos / base) * 100;
        titulo.textContent = fmt(anios.declarado);
        sufijo.textContent = "anuncios con año declarado";
        detalle.textContent = `${fmt(anios.clasicos)} clásicos (${pct(clasicosPct)}) y ${fmt(anios.modernos)} modernos (${pct(modernosPct)}) sobre el total con año.`;
        barras.innerHTML = fila("Clásicos", clasicosPct, "barra--naranja") + fila("Modernos", modernosPct);
      } else {
        const sinPct = total ? (anios.sin_declarar / total) * 100 : 0;
        titulo.textContent = fmt(anios.sin_declarar);
        sufijo.textContent = "anuncios sin año declarado";
        detalle.textContent = `${pct(sinPct)} del total. No se imputan: quedan fuera de los análisis que necesitan año.`;
        barras.innerHTML = fila("Sin año", sinPct, "barra--gris") + fila("Con año", 100 - sinPct);
      }

      botones.forEach((boton) => {
        const activo = boton.dataset.anio === modo;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
      });
    };

    botones.forEach((boton) => boton.addEventListener("click", () => aplicar(boton.dataset.anio)));
    aplicar("con");
  }

  /* ------------------------------------------------------------
     Bloque 10 · Checklist descargable
     ------------------------------------------------------------ */
  function initChecklist() {
    const contenedor = $("#checklist");
    if (!contenedor) return;

    const casillas = $$("input[type='checkbox']", contenedor);
    const progreso = $("#checklist-progreso");
    const descargar = $("#checklist-descargar");
    const reiniciar = $("#checklist-reiniciar");
    const CLAVE = "proyectoCD.checklist.v1";

    const leer = () => {
      try {
        return JSON.parse(localStorage.getItem(CLAVE) || "{}");
      } catch (error) {
        return {};
      }
    };

    const guardar = (estado) => {
      try {
        localStorage.setItem(CLAVE, JSON.stringify(estado));
      } catch (error) {
        /* file:// o modo privado: el checklist sigue funcionando en memoria */
      }
    };

    const estadoInicial = leer();

    const actualizarProgreso = () => {
      const marcados = casillas.filter((casilla) => casilla.checked).length;
      progreso.textContent = `${marcados} de ${casillas.length} marcados`;
    };

    casillas.forEach((casilla) => {
      casilla.checked = Boolean(estadoInicial[casilla.dataset.check]);
      casilla.addEventListener("change", () => {
        const estado = {};
        casillas.forEach((otra) => {
          estado[otra.dataset.check] = otra.checked;
        });
        guardar(estado);
        actualizarProgreso();
      });
    });

    reiniciar?.addEventListener("click", () => {
      casillas.forEach((casilla) => {
        casilla.checked = false;
      });
      guardar({});
      actualizarProgreso();
    });

    descargar?.addEventListener("click", () => {
      const lineas = [
        "CHECKLIST ANTES DE COMPRAR UN CARRO EN LA HABANA",
        "Proyecto de Ciencia de Datos · Universidad de La Habana · 2026",
        "",
      ];
      casillas.forEach((casilla) => {
        const texto = casilla.closest("label")?.querySelector("span")?.innerText.trim() || "";
        lineas.push(`[${casilla.checked ? "x" : " "}] ${texto}`);
        lineas.push("");
      });
      lineas.push("Fuente: Revolico, comercializadoras y 30 entrevistas procesadas.");
      lineas.push("Cifras: 48,9% sin año · 584 precios marcador · brecha 10.699 USD · 2 marcas comparables.");

      const blob = new Blob([lineas.join("\n")], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = "checklist-auto-la-habana.txt";
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    actualizarProgreso();
  }

  /* ------------------------------------------------------------
     Navegación: progreso, sección activa y volver arriba
     ------------------------------------------------------------ */
  function initNavegacion() {
    const barra = $("#progreso");
    const arriba = $(".volver-arriba");
    const nav = $(".indice__interior");
    const secciones = $$("main section[id^='bloque-']");
    const enlaces = new Map(
      $$(".indice a").map((enlace) => [enlace.getAttribute("href").slice(1), enlace])
    );

    let pendiente = false;
    let seccionAnterior = null;

    const actualizar = () => {
      pendiente = false;
      const recorrido = window.scrollY || document.documentElement.scrollTop;
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      const proporcion = altura > 0 ? Math.min(1, Math.max(0, recorrido / altura)) : 0;
      if (barra) barra.style.width = `${(proporcion * 100).toFixed(2)}%`;

      if (arriba) arriba.classList.toggle("visible", recorrido > 700);

      let actual = secciones[0]?.id;
      for (const seccion of secciones) {
        if (seccion.getBoundingClientRect().top <= 150) actual = seccion.id;
      }
      enlaces.forEach((enlace, id) => enlace.classList.toggle("activo", id === actual));

      if (actual && actual !== seccionAnterior && nav) {
        const enlace = enlaces.get(actual);
        if (enlace) {
          const cajaNav = nav.getBoundingClientRect();
          const cajaEnlace = enlace.getBoundingClientRect();
          if (cajaEnlace.left < cajaNav.left + 8 || cajaEnlace.right > cajaNav.right - 8) {
            nav.scrollTo({
              left: nav.scrollLeft + cajaEnlace.left - cajaNav.left - 24,
              behavior: "smooth",
            });
          }
        }
        seccionAnterior = actual;
      }
    };

    const alDesplazar = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
      }
    };

    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Fecha de generación en el pie
     ------------------------------------------------------------ */
  function initFecha() {
    const salida = $("#pie-generado");
    if (!salida || !D.meta.generado) return;
    const fecha = new Date(D.meta.generado);
    if (Number.isNaN(fecha.getTime())) return;
    salida.textContent = `Datos procesados el ${fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}.`;
  }

  /* ------------------------------------------------------------
     Arranque: cada bloque falla de forma aislada
     ------------------------------------------------------------ */
  const bloques = [
    ["figuras", initFiguras],
    ["presupuesto", initPresupuesto],
    ["variante", initVariante],
    ["municipio-conteo", initMunicipioConteo],
    ["municipio-precio", initMunicipioPrecio],
    ["marca", initMarca],
    ["tabla", initTabla],
    ["comparación", initComparacion],
    ["año", initAnio],
    ["checklist", initChecklist],
    ["navegación", initNavegacion],
    ["fecha", initFecha],
  ];

  bloques.forEach(([nombre, inicializar]) => {
    try {
      inicializar();
    } catch (error) {
      console.error(`No se pudo inicializar ${nombre}:`, error);
    }
  });
})();
