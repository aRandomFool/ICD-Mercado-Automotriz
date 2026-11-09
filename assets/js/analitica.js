/* Analítica GA4 — Mercado Automotriz La Habana */
(function () {
  const params = new URLSearchParams(location.search);
  const campana = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || ""
  };

  function track(evento, datos = {}) {
    if (typeof gtag !== "function") return;
    gtag("event", evento, { ...campana, ...datos });
  }

  function marcarInteraccion(tipo) {
    try {
      if (sessionStorage.getItem("interaccion")) return;
      sessionStorage.setItem("interaccion", "1");
    } catch (e) {}
    track("interaccion", { tipo });
  }

  function interactuar(evento, datos = {}) {
    track(evento, datos);
    marcarInteraccion(evento);
  }

  // Controles
  document.addEventListener("change", (e) => {
    const id = e.target.id;

    if (id === "presupuesto") {
      const valor = Number(e.target.value);
      const rango =
        valor < 10000 ? "menos_10k" :
        valor < 20000 ? "10k_20k" :
        valor < 30000 ? "20k_30k" :
        valor < 50000 ? "30k_50k" : "50k_mas";
      interactuar("interactivo_presupuesto", { rango_presupuesto: rango, valor });
    } else if (id === "concentracion") {
      interactuar("interactivo_concentracion", { valor: e.target.value });
    } else if (id === "mm-marca" || id === "mm-municipio") {
      interactuar("interactivo_marca_municipio", { campo: id, valor: e.target.value });
    } else if (id === "rango-a" || id === "rango-b") {
      interactuar("interactivo_rango", { campo: id, valor: e.target.value });
    } else if (id === "tabla-entidad" || id === "tabla-marca" || id === "tabla-orden") {
      interactuar("interactivo_catalogo", { campo: id, valor: e.target.value });
    } else if (id === "cobertura-select") {
      interactuar("interactivo_cobertura", { valor: e.target.value });
    } else if (id === "decada-select") {
      interactuar("interactivo_decada", { valor: e.target.value });
    }
  });

  // Botones de percentil
  document.querySelectorAll("[data-percentil]").forEach((boton) => {
    boton.addEventListener("click", () => {
      interactuar("interactivo_percentil", { percentil: boton.dataset.percentil });
    });
  });

  // Búsqueda
  let timer;
  document.getElementById("tabla-buscar")?.addEventListener("input", (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const texto = e.target.value.trim();
      if (texto.length >= 2) {
        interactuar("interactivo_busqueda", { caracteres: texto.length });
      }
    }, 800);
  });

  // Checklist
  document.getElementById("checklist")?.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      interactuar("checklist_item", {
        item: e.target.dataset.check || "sin_id",
        marcado: e.target.checked
      });
    }
  });
  document.getElementById("checklist-descargar")?.addEventListener("click", () => {
    interactuar("checklist_descargar", {});
  });
  document.getElementById("checklist-reiniciar")?.addEventListener("click", () => {
    interactuar("checklist_reiniciar", {});
  });

  // Clics a fuentes
  document.addEventListener("click", (e) => {
    const enlace = e.target.closest("a[href]");
    if (!enlace) return;
    if (/revolico|bdcone|dongfengqba|mcvcommercial|cimex/.test(enlace.href)) {
      interactuar("clic_fuente", { destino: new URL(enlace.href).hostname });
    }
  });

  // Bloques vistos (consumo)
  const vistos = new Set();
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting && !vistos.has(entrada.target.id)) {
          vistos.add(entrada.target.id);
          track("bloque_visto", { bloque: entrada.target.id });
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".bloque").forEach((b) => observador.observe(b));
  }

  // Tiempo de lectura
  const inicio = Date.now();
  window.addEventListener("pagehide", () => {
    const segundos = Math.round((Date.now() - inicio) / 1000);
    const rango =
      segundos < 15 ? "0-15s" :
      segundos < 60 ? "15-60s" :
      segundos < 180 ? "1-3m" : "3m+";
    track("tiempo_lectura", { rango, segundos });
  });

  // Compartir (cuando agregues botones con data-red)
  document.querySelectorAll("[data-red]").forEach((boton) => {
    boton.addEventListener("click", () => {
      interactuar("compartir_" + boton.dataset.red, {});
    });
  });
})();