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
    neutro: ["badge--neutro", "Sin datos suficientes"],
  };

  function calidadN(n) {
    if (n >= 30) return "suficiente";
    if (n >= 10) return "baja";
    return "insuficiente";
  }

  function badgeCalidad(clave, n) {
    const [clase, texto] = n > 0 ? CALIDAD[clave] || CALIDAD.insuficiente : CALIDAD.neutro;
    return `<span class="badge ${clase}">${texto}</span>`;
  }

  function textoCalidad(clave, n) {
    if (!n) return "Sin precios válidos para este grupo.";
    if (clave === "suficiente") return "Lectura razonable: n≥30.";
    if (clave === "baja") return "Leer con cautela: 10≤n<30.";
    return "No usar para conclusiones: n<10.";
  }

  function diferenciaConSigno(valor) {
    const signo = valor > 0 ? "+" : valor < 0 ? "−" : "";
    return `${signo}${usd(Math.abs(valor))}`;
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
     Bloque 2 · Explorador de percentiles
     ------------------------------------------------------------ */
  function initPercentiles() {
    const botones = $$("[data-percentil]");
    if (!botones.length) return;

    const p = D.meta.percentiles;
    const salida = {
      informal: $("#pct-informal"),
      formal: $("#pct-formal"),
      detalleInformal: $("#pct-informal-detalle"),
      detalleFormal: $("#pct-formal-detalle"),
      etiqueta: $("#pct-etiqueta"),
      diferencia: $("#pct-diferencia"),
      barraInformal: $("#barra-pct-informal"),
      barraFormal: $("#barra-pct-formal"),
    };
    const baseInformal = D.meta.muestras.informal_precio_valido;
    const baseFormal = D.meta.muestras.formal_modelos;

    const aplicar = (q) => {
      const clave = `p${q}`;
      const informal = p.informal[clave];
      const formal = p.formal[clave];
      const maximo = Math.max(informal, formal) || 1;

      salida.informal.textContent = usd(informal);
      salida.formal.textContent = usd(formal);
      salida.detalleInformal.textContent = `${q} % de los ${fmt(baseInformal)} anuncios con precio válido está por debajo.`;
      salida.detalleFormal.textContent = `${q} % de los ${fmt(baseFormal)} modelos de catálogo está por debajo.`;
      salida.etiqueta.textContent = `P${q}`;
      salida.diferencia.textContent = usd(formal - informal);
      salida.barraInformal.style.width = `${(informal / maximo) * 100}%`;
      salida.barraFormal.style.width = `${(formal / maximo) * 100}%`;

      botones.forEach((boton) => {
        const activo = Number(boton.dataset.percentil) === q;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
      });
    };

    botones.forEach((boton) => boton.addEventListener("click", () => aplicar(Number(boton.dataset.percentil))));
    aplicar(50);
  }

  /* ------------------------------------------------------------
     Bloque 3 · Curva de concentración por municipio
     ------------------------------------------------------------ */
  function initConcentracion() {
    const control = $("#concentracion");
    if (!control) return;

    const municipios = [...D.informal.municipios].sort((a, b) => b.anuncios - a.anuncios);
    const total = D.meta.muestras.informal_total;
    const salida = {
      valor: $("#concentracion-valor"),
      pct: $("#conc-pct"),
      n: $("#conc-n"),
      k: $("#conc-k"),
      barra: $("#conc-barra"),
      lista: $("#conc-lista"),
    };

    const actualizar = () => {
      const k = Number(control.value);
      const elegidos = municipios.slice(0, k);
      const anuncios = elegidos.reduce((suma, municipio) => suma + municipio.anuncios, 0);
      const proporcion = total ? (anuncios / total) * 100 : 0;

      salida.valor.textContent = `${k} ${k === 1 ? "municipio" : "municipios"}`;
      salida.pct.textContent = pct(proporcion);
      salida.n.textContent = fmt(anuncios);
      salida.k.textContent = fmt(k);
      salida.barra.style.width = `${proporcion}%`;
      salida.lista.textContent = elegidos.map((municipio) => municipio.label).join(" · ");
    };

    control.addEventListener("input", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 4 · Misma marca, distinto municipio
     ------------------------------------------------------------ */
  function initMunicipioMarca() {
    const selectMarca = $("#mm-marca");
    const selectMunicipio = $("#mm-municipio");
    if (!selectMarca || !selectMunicipio) return;

    const marcas = D.informal.marcas.filter((m) => m.n > 0).sort((a, b) => collator.compare(a.label, b.label));
    const municipios = [...D.informal.municipios].sort((a, b) => collator.compare(a.label, b.label));
    const celdas = new Map(
      D.informal.municipio_marca.map((fila) => [`${fila.municipio}|${fila.marca}`, fila])
    );

    selectMarca.innerHTML = marcas.map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`).join("");
    selectMunicipio.innerHTML = municipios.map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`).join("");
    selectMarca.value = "hyundai";
    selectMunicipio.value = "playa";

    const salida = {
      mediana: $("#mm-mediana"),
      n: $("#mm-n"),
      marca: $("#mm-marca-label"),
      municipio: $("#mm-municipio-label"),
      ciudad: $("#mm-ciudad"),
      nCiudad: $("#mm-n-ciudad"),
      diferencia: $("#mm-dif"),
      calidad: $("#mm-calidad"),
    };

    const actualizar = () => {
      const marca = marcas.find((m) => m.clave === selectMarca.value) || marcas[0];
      const municipio = municipios.find((m) => m.clave === selectMunicipio.value) || municipios[0];
      if (!marca || !municipio) return;

      const celda = celdas.get(`${municipio.clave}|${marca.clave}`);
      salida.marca.textContent = marca.label;
      salida.municipio.textContent = municipio.label;
      salida.ciudad.textContent = usd(marca.mediana);
      salida.nCiudad.textContent = fmt(marca.n);

      if (!celda) {
        salida.mediana.textContent = "—";
        salida.n.textContent = "0";
        salida.diferencia.textContent = "—";
        salida.calidad.innerHTML = `${badgeCalidad("neutro", 0)} <span class="resultado__texto">No hay anuncios de esta marca en este municipio con precio válido.</span>`;
        return;
      }

      const diferencia = celda.mediana - marca.mediana;
      salida.mediana.textContent = fmt(celda.mediana);
      salida.n.textContent = fmt(celda.n);
      salida.diferencia.textContent = diferenciaConSigno(diferencia);
      salida.calidad.innerHTML = `${badgeCalidad(calidadN(celda.n), celda.n)} <span class="resultado__texto">${textoCalidad(calidadN(celda.n), celda.n)}</span>`;
    };

    selectMarca.addEventListener("change", actualizar);
    selectMunicipio.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 5 · Comparador de rangos entre marcas
     ------------------------------------------------------------ */
  function initRangoMarcas() {
    const selectA = $("#rango-a");
    const selectB = $("#rango-b");
    if (!selectA || !selectB) return;

    const marcas = D.informal.marcas.filter((m) => m.n >= 30).sort((a, b) => collator.compare(a.label, b.label));
    if (marcas.length < 2) return;

    const opciones = marcas.map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`).join("");
    selectA.innerHTML = opciones;
    selectB.innerHTML = opciones;
    selectA.value = marcas.some((m) => m.clave === "bmw") ? "bmw" : marcas[0].clave;
    selectB.value = marcas.some((m) => m.clave === "lada") ? "lada" : marcas[1].clave;

    const maximo = Math.max(...marcas.map((m) => m.p75), 1);
    const salida = {
      diferencia: $("#rango-diferencia"),
    };

    const pintar = (sufijo, marca) => {
      $(`#rango-${sufijo}-nombre`).textContent = marca.label;
      $(`#rango-${sufijo}-n`).textContent = `n = ${fmt(marca.n)}`;
      $(`#rango-${sufijo}-valores`).textContent =
        `P25 ${fmt(marca.p25)} · Mediana ${fmt(marca.mediana)} · P75 ${fmt(marca.p75)} USD`;

      const banda = $(`#rango-${sufijo}-banda`);
      const mediana = $(`#rango-${sufijo}-mediana`);
      const izquierda = (marca.p25 / maximo) * 100;
      const ancho = Math.max(((marca.p75 - marca.p25) / maximo) * 100, 0.8);
      banda.style.left = `${izquierda}%`;
      banda.style.width = `${ancho}%`;
      mediana.style.left = `${(marca.mediana / maximo) * 100}%`;
    };

    const actualizar = () => {
      const a = marcas.find((m) => m.clave === selectA.value) || marcas[0];
      const b = marcas.find((m) => m.clave === selectB.value) || marcas[1];
      pintar("a", a);
      pintar("b", b);

      const diferencia = a.mediana - b.mediana;
      if (diferencia === 0) {
        salida.diferencia.textContent = "Las dos marcas tienen la misma mediana.";
      } else {
        const mayor = diferencia > 0 ? a.label : b.label;
        salida.diferencia.textContent = `Diferencia de medianas: ${usd(Math.abs(diferencia))} · ${mayor} pide más.`;
      }
    };

    selectA.addEventListener("change", actualizar);
    selectB.addEventListener("change", actualizar);
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
     Bloque 7 · Explorador de cobertura formal-informal
     ------------------------------------------------------------ */
  function initCobertura() {
    const select = $("#cobertura-select");
    if (!select) return;

    const cobertura = [...D.comparacion.cobertura].sort((a, b) => collator.compare(a.label, b.label));
    select.innerHTML = cobertura.map((m) => `<option value="${esc(m.clave)}">${esc(m.label)}</option>`).join("");
    select.value = cobertura.some((m) => m.clave === "dongfeng") ? "dongfeng" : cobertura[0].clave;

    const salida = {
      estado: $("#cobertura-estado"),
      infMediana: $("#cobertura-inf-mediana"),
      infN: $("#cobertura-inf-n"),
      formMediana: $("#cobertura-form-mediana"),
      formN: $("#cobertura-form-n"),
      diferencia: $("#cobertura-diferencia"),
    };

    const ESTADOS = {
      comparable: ["estado--comparable", "Comparable"],
      solo_informal: ["estado--solo-informal", "Solo informal"],
      informal_baja: ["estado--informal-baja", "Informal con n<10"],
      solo_formal: ["estado--solo-formal", "Solo catálogo formal"],
    };

    const actualizar = () => {
      const item = cobertura.find((m) => m.clave === select.value) || cobertura[0];
      if (!item) return;

      const [clase, etiqueta] = ESTADOS[item.estado] || ESTADOS.solo_informal;
      let texto = "";
      if (item.estado === "comparable") {
        texto = `${etiqueta}: ${fmt(item.informal.n)} anuncios informales y ${fmt(item.formal.modelos)} modelos de catálogo.`;
      } else if (item.estado === "solo_informal") {
        texto = `${etiqueta}: ${fmt(item.informal.n)} anuncios, sin presencia en el catálogo formal.`;
      } else if (item.estado === "informal_baja") {
        texto = `${etiqueta}: catálogo formal (${fmt(item.formal.modelos)} modelos), pero la mediana informal se apoya en pocos anuncios.`;
      } else if (item.estado === "solo_formal") {
        texto = `${etiqueta}: ${fmt(item.formal.modelos)} modelos de catálogo, sin anuncios informales.`;
      }
      salida.estado.className = `estado ${clase}`;
      salida.estado.textContent = texto;

      salida.infMediana.textContent = item.informal ? usd(item.informal.mediana) : "—";
      salida.infN.textContent = item.informal ? fmt(item.informal.n) : "0";
      salida.formMediana.textContent = item.formal ? usd(item.formal.mediana) : "—";
      salida.formN.textContent = item.formal ? fmt(item.formal.modelos) : "0";

      if (item.estado === "comparable") {
        const direccion =
          item.direccion === "informal" ? "el informal pide más" : item.direccion === "formal" ? "el formal es más caro" : "medianas iguales";
        salida.diferencia.textContent = `Diferencia: ${usd(item.diferencia)} · ${direccion}.`;
      } else {
        salida.diferencia.textContent = "Sin comparación de medianas: falta uno de los dos canales o la muestra informal es insuficiente.";
      }
    };

    select.addEventListener("change", actualizar);
    actualizar();
  }

  /* ------------------------------------------------------------
     Bloque 8 · Explorador por década
     ------------------------------------------------------------ */
  function initDecadas() {
    const select = $("#decada-select");
    if (!select) return;

    const anios = D.informal.anios;
    const decadas = [...anios.por_decada].sort((a, b) => a.decada - b.decada);
    const maximo = Math.max(...decadas.map((d) => d.mediana), anios.sin_anio_mediana, 1);

    select.innerHTML =
      decadas.map((d) => `<option value="${d.decada}">Años ${d.decada}</option>`).join("") +
      '<option value="sin">Sin año declarado</option>';
    if (decadas.some((d) => d.decada === 2020)) select.value = "2020";

    const salida = {
      mediana: $("#decada-mediana"),
      n: $("#decada-n"),
      label: $("#decada-label"),
      share: $("#decada-share"),
      shareLabel: $("#decada-share-label"),
      rango: $("#decada-rango"),
      barra: $("#decada-barra"),
      calidad: $("#decada-calidad"),
    };

    const actualizar = () => {
      const valor = select.value;
      let datos;
      if (valor === "sin") {
        datos = {
          mediana: anios.sin_anio_mediana,
          n: anios.sin_anio_n,
          p25: anios.sin_anio_p25,
          p75: anios.sin_anio_p75,
          share: anios.sin_anio_share,
          etiqueta: "sin año",
          etiquetaShare: "de los anuncios con precio válido",
        };
      } else {
        const decada = decadas.find((d) => String(d.decada) === String(valor)) || decadas[decadas.length - 1];
        datos = {
          mediana: decada.mediana,
          n: decada.n,
          p25: decada.p25,
          p75: decada.p75,
          share: decada.share,
          etiqueta: `${decada.decada}`,
          etiquetaShare: "de los que declaran año",
        };
      }

      const calidad = calidadN(datos.n);
      salida.mediana.textContent = fmt(datos.mediana);
      salida.n.textContent = fmt(datos.n);
      salida.label.textContent = datos.etiqueta;
      salida.share.textContent = pct(datos.share);
      salida.shareLabel.textContent = datos.etiquetaShare;
      salida.rango.textContent = `${fmt(datos.p25)}–${fmt(datos.p75)} USD`;
      salida.barra.style.width = `${(datos.mediana / maximo) * 100}%`;
      salida.calidad.innerHTML = `${badgeCalidad(calidad, datos.n)} <span class="resultado__texto">${textoCalidad(calidad, datos.n)}</span>`;
    };

    select.addEventListener("change", actualizar);
    actualizar();
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
      lineas.push("Cifras: 48,9% sin año · 584 precios marcador · brecha 10.699 USD · 6 marcas comparables.");

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
     Figuras: enlace para ampliar
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
    ["percentiles", initPercentiles],
    ["concentración", initConcentracion],
    ["municipio-marca", initMunicipioMarca],
    ["rango-marcas", initRangoMarcas],
    ["tabla", initTabla],
    ["cobertura", initCobertura],
    ["décadas", initDecadas],
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
