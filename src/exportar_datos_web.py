#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Exporta el paquete de datos de la página web (Bloques 1-11).

Reglas (docs/Dos caminos ... plan web.md):
  - Solo La Habana.
  - Precio válido: 1000 <= precio_usd < 1_000_000.
  - Marca nula / "no identificada" se excluye en análisis por marca.
  - anio == 0 se excluye en análisis por año.
  - En comercializadoras, "Microbus"/"Pickup" no son marcas en gráficos por marca.
  - Mediana por defecto; media recortada al 10% como alternativa.
  - Calidad de muestra: n>=30 suficiente, 10<=n<30 baja, n<10 insuficiente.

Salidas (para que la página funcione abriendo index.html sin servidor):
  web/assets/js/datos.js -> window.DATOS = {...};
  web/data/datos.json    -> mismo contenido (reutilizable / auditable).

Uso:
  .venv/bin/python src/exportar_datos_web.py
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
ANUNCIOS = ROOT / "data" / "interim" / "anuncios_analisis.csv"
COMERCIALIZADORAS = ROOT / "data" / "processed" / "comercializadoras.csv"
SALIDA = ROOT / "web" / "data"
JS = ROOT / "web" / "assets" / "js"

PRECIO_MIN = 1_000
PRECIO_MAX = 1_000_000  # exclusivo
TRIM = 0.10

MUNICIPIOS = {
    "arroyo naranjo": "Arroyo Naranjo",
    "boyeros": "Boyeros",
    "centro habana": "Centro Habana",
    "cerro": "Cerro",
    "cotorro": "Cotorro",
    "diez de octubre": "Diez de Octubre",
    "guanabacoa": "Guanabacoa",
    "habana del este": "Habana del Este",
    "habana vieja": "Habana Vieja",
    "la lisa": "La Lisa",
    "marianao": "Marianao",
    "playa": "Playa",
    "plaza": "Plaza",
    "regla": "Regla",
    "san miguel del padrón": "San Miguel del Padrón",
}

MARCAS = {
    "bmw": "BMW",
    "mg": "MG",
    "gmc": "GMC",
    "jac": "JAC",
    "jmc": "JMC",
    "gac": "GAC",
    "byd": "BYD",
    "baic": "BAIC",
    "dfsk": "DFSK",
    "maxus": "MAXUS",
    "mini": "MINI",
    "mercedes-benz": "Mercedes-Benz",
    "land rover": "Land Rover",
    "alfa romeo": "Alfa Romeo",
}


def etiqueta_marca(valor: str) -> str:
    valor = str(valor).strip().lower()
    return MARCAS.get(valor, valor.title())


def media_recortada(serie: pd.Series, proporcion: float = TRIM) -> float | None:
    """Ordena, elimina `proporcion` por cada cola y promedia el resto."""
    datos = serie.dropna().sort_values()
    if datos.empty:
        return None
    k = int(len(datos) * proporcion)
    recortados = datos.iloc[k : len(datos) - k] if k else datos
    return float(recortados.mean()) if not recortados.empty else None


def calidad(n: int) -> str:
    if n >= 30:
        return "suficiente"
    if n >= 10:
        return "baja"
    return "insuficiente"


def redondear(valor) -> int | None:
    if valor is None or pd.isna(valor):
        return None
    return int(round(float(valor)))


def resumen_precio(serie: pd.Series) -> dict:
    serie = serie.dropna()
    n = int(len(serie))
    return {
        "n": n,
        "mediana": redondear(serie.median()),
        "media_recortada_10": redondear(media_recortada(serie)),
        "p25": redondear(serie.quantile(0.25)),
        "p75": redondear(serie.quantile(0.75)),
        "min": redondear(serie.min()),
        "max": redondear(serie.max()),
        "calidad": calidad(n),
    }


def resumen_catalogo(serie: pd.Series) -> dict:
    """Resumen de precios de catálogo. No usa calidad de muestra: no es una muestra."""
    serie = serie.dropna()
    return {
        "modelos": int(len(serie)),
        "mediana": redondear(serie.median()),
        "p25": redondear(serie.quantile(0.25)),
        "p75": redondear(serie.quantile(0.75)),
        "min": redondear(serie.min()),
        "max": redondear(serie.max()),
    }


def percentiles(serie: pd.Series) -> dict:
    serie = serie.dropna()
    return {
        f"p{int(q * 100)}": redondear(serie.quantile(q))
        for q in (0.10, 0.25, 0.50, 0.75, 0.90)
    }


def cargar_datos() -> tuple[pd.DataFrame, pd.DataFrame]:
    anuncios = pd.read_csv(ANUNCIOS, encoding="utf-8-sig")
    formal = pd.read_csv(COMERCIALIZADORAS, encoding="utf-8-sig")

    anuncios["precio_usd"] = pd.to_numeric(anuncios["precio_usd"], errors="coerce")
    anuncios["anio"] = pd.to_numeric(anuncios["anio"], errors="coerce").fillna(0).astype(int)
    anuncios["marca"] = (
        anuncios["marca"].fillna("no identificada").astype(str).str.strip().str.lower()
    )
    anuncios["municipio"] = anuncios["municipio"].fillna("").astype(str).str.strip().str.lower()

    formal["precio_usd"] = pd.to_numeric(formal["precio_usd"], errors="coerce")
    formal["marca"] = formal["marca"].fillna("no identificada").astype(str).str.strip()
    # Clave de marca para la web: respeta marca_norm del CSV (agrupa
    # "Changan Deepal" en "Changan") y cae en el nombre original si falta.
    formal["marca_norm"] = (
        formal["marca_norm"]
        .fillna(formal["marca"].str.lower())
        .astype(str)
        .str.lower()
        .str.strip()
    )
    formal["marca_web"] = formal["marca_norm"]
    return anuncios, formal


def filtrar_precio_valido(df: pd.DataFrame) -> pd.DataFrame:
    p = df["precio_usd"]
    return df[(p >= PRECIO_MIN) & (p < PRECIO_MAX)].copy()


def construir_meta(inf: pd.DataFrame, inf_val: pd.DataFrame, form: pd.DataFrame, form_val: pd.DataFrame) -> dict:
    inf_act = inf_val[inf_val.get("estado_verificacion", "") == "activo"]
    return {
        "generado": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "alcance": "La Habana (15 municipios)",
        "reglas": {
            "precio_valido": f"{PRECIO_MIN} <= precio_usd < {PRECIO_MAX}",
            "mercado_informal": "Revolico (precios pedidos, no de cierre)",
            "mercado_formal": "Comercializadoras autorizadas (precios de lista/referencia)",
            "catalogo_formal": "el número de modelos mide cobertura del catálogo, no ventas",
            "mediana_por_defecto": True,
            "media_recortada_10": "se elimina 10% inferior y 10% superior",
            "anio_0": "se trata como ausente y se excluye de análisis por año",
            "marca_no_identificada": "excluida en análisis por marca",
            "formal_microbus_pickup": "excluidas como marca en gráficos por marca",
            "calidad_muestra_informal": "n>=30 suficiente · 10<=n<30 baja · n<10 insuficiente",
        },
        "muestras": {
            "informal_total": int(len(inf)),
            "informal_precio_valido": int(len(inf_val)),
            "informal_activos_precio_valido": int(len(inf_act)),
            "informal_activos_mediana": redondear(inf_act["precio_usd"].median()),
            "formal_modelos": int(len(form_val)),
            "entrevistas": 30,
        },
        "brecha": {
            "informal_mediana": redondear(inf_val["precio_usd"].median()),
            "formal_mediana": redondear(form_val["precio_usd"].median()),
            "brecha_usd": redondear(
                form_val["precio_usd"].median() - inf_val["precio_usd"].median()
            ),
            "informal_media_recortada_10": redondear(media_recortada(inf_val["precio_usd"])),
            "formal_media_recortada_10": redondear(media_recortada(form_val["precio_usd"])),
        },
        "percentiles": {
            "informal": percentiles(inf_val["precio_usd"]),
            "formal": percentiles(form_val["precio_usd"]),
        },
        "fuentes": [
            {"nombre": "Revolico", "url": "https://www.revolico.com", "tipo": "informal"},
            {"nombre": "BDC ONE", "url": "https://bdcone.online", "tipo": "formal"},
            {"nombre": "Dongfeng Cuba", "url": "https://dongfengqba.com", "tipo": "formal"},
            {"nombre": "MCV Comercial", "url": "https://mcvcommercial.com", "tipo": "formal"},
            {"nombre": "CIMEX", "url": "https://cimex.cu", "tipo": "formal"},
        ],
        "datasets": {
            "informal": "data/interim/anuncios_analisis.csv",
            "formal": "data/processed/comercializadoras.csv",
            "entrevistas": "data/raw/entrevistas/Entrevistas.txt",
        },
    }


def construir_informal(inf: pd.DataFrame, inf_val: pd.DataFrame) -> dict:
    municipios = []
    for clave, grupo in inf.groupby("municipio"):
        if not clave:
            continue
        validos = grupo[
            (grupo["precio_usd"] >= PRECIO_MIN) & (grupo["precio_usd"] < PRECIO_MAX)
        ]
        item = {
            "clave": clave,
            "label": MUNICIPIOS.get(clave, clave.title()),
            "anuncios": int(len(grupo)),
            **resumen_precio(validos["precio_usd"]),
        }
        municipios.append(item)
    municipios.sort(key=lambda x: x["anuncios"], reverse=True)

    marcas = []
    for clave, grupo in inf.groupby("marca"):
        if clave == "no identificada":
            continue
        validos = grupo[
            (grupo["precio_usd"] >= PRECIO_MIN) & (grupo["precio_usd"] < PRECIO_MAX)
        ]
        item = {
            "clave": clave,
            "label": etiqueta_marca(clave),
            "anuncios": int(len(grupo)),
            **resumen_precio(validos["precio_usd"]),
        }
        marcas.append(item)
    marcas.sort(key=lambda x: x["anuncios"], reverse=True)

    anios = inf[inf["anio"] > 0]
    anios_validos = inf_val[inf_val["anio"] > 0]
    sin_anio_validos = inf_val[inf_val["anio"] == 0]
    por_anio = (
        anios.groupby("anio").size().reset_index(name="n").sort_values("anio")
    )
    decadas = (
        anios_validos.assign(decada=(anios_validos["anio"] // 10) * 10)
        .groupby("decada")["precio_usd"]
        .agg(
            n="size",
            mediana="median",
            p25=lambda s: s.quantile(0.25),
            p75=lambda s: s.quantile(0.75),
        )
        .reset_index()
        .sort_values("decada")
    )
    por_decada = [
        {
            "decada": int(fila.decada),
            "n": int(fila.n),
            "mediana": redondear(fila.mediana),
            "p25": redondear(fila.p25),
            "p75": redondear(fila.p75),
            "share": (fila.n / len(anios_validos) * 100) if len(anios_validos) else 0,
        }
        for fila in decadas.itertuples()
    ]

    mm = (
        inf_val[inf_val["marca"] != "no identificada"]
        .groupby(["municipio", "marca"])["precio_usd"]
        .agg(
            n="size",
            mediana="median",
            p25=lambda s: s.quantile(0.25),
            p75=lambda s: s.quantile(0.75),
        )
        .reset_index()
    )
    mm = mm[mm["municipio"] != ""]
    municipio_marca = [
        {
            "municipio": fila.municipio,
            "marca": fila.marca,
            "n": int(fila.n),
            "mediana": redondear(fila.mediana),
            "p25": redondear(fila.p25),
            "p75": redondear(fila.p75),
        }
        for fila in mm.itertuples()
    ]

    return {
        "municipios": municipios,
        "municipio_marca": municipio_marca,
        "marcas": marcas,
        "anios": {
            "declarado": int(len(anios)),
            "declarado_precio_valido": int(len(anios_validos)),
            "sin_declarar": int(len(inf) - len(anios)),
            "clasicos": int((anios["anio"] < 2000).sum()),
            "modernos": int((anios["anio"] >= 2000).sum()),
            "con_anio_mediana": redondear(anios_validos["precio_usd"].median()),
            "sin_anio_n": int(len(sin_anio_validos)),
            "sin_anio_mediana": redondear(sin_anio_validos["precio_usd"].median()),
            "sin_anio_p25": redondear(sin_anio_validos["precio_usd"].quantile(0.25)),
            "sin_anio_p75": redondear(sin_anio_validos["precio_usd"].quantile(0.75)),
            "sin_anio_share": (len(sin_anio_validos) / len(inf_val) * 100) if len(inf_val) else 0,
            "por_decada": por_decada,
            "por_anio": [
                {"anio": int(fila.anio), "n": int(fila.n)} for fila in por_anio.itertuples()
            ],
        },
        "precios_validos": sorted(int(round(v)) for v in inf_val["precio_usd"]),
        "puntos_marca": [
            {"m": fila.marca, "p": int(round(fila.precio_usd))}
            for fila in inf_val[inf_val["marca"] != "no identificada"][
                ["marca", "precio_usd"]
            ].itertuples()
        ],
    }


def construir_formal(form: pd.DataFrame, form_val: pd.DataFrame) -> dict:
    catalogo = []
    for fila in form_val.itertuples():
        catalogo.append(
            {
                "entidad": str(fila.entidad),
                "marca": str(fila.marca),
                "modelo": str(fila.modelo),
                "clase": "" if pd.isna(fila.clase) else str(fila.clase),
                "propulsion": "" if pd.isna(fila.propulsion) else str(fila.propulsion),
                "precio_usd": redondear(fila.precio_usd),
                "precio_original": None
                if pd.isna(fila.precio_original)
                else float(fila.precio_original),
                "moneda": "" if pd.isna(fila.moneda) else str(fila.moneda),
                "url": "" if pd.isna(fila.url) else str(fila.url),
            }
        )
    catalogo.sort(key=lambda x: (x["entidad"], x["marca"], x["precio_usd"]))

    sin_marcas_no_validas = form_val[
        ~form_val["marca_web"].isin(["microbus", "pickup"])
    ]
    marcas = []
    for clave, grupo in sin_marcas_no_validas.groupby("marca_web"):
        marcas.append(
            {
                "clave": clave,
                "label": etiqueta_marca(clave),
                **resumen_catalogo(grupo["precio_usd"]),
            }
        )
    marcas.sort(key=lambda x: x["modelos"], reverse=True)

    entidades = []
    for clave, grupo in form_val.groupby("entidad"):
        entidades.append(
            {
                "clave": str(clave),
                "label": str(clave),
                "marcas": int(grupo["marca_web"].nunique()),
                **resumen_catalogo(grupo["precio_usd"]),
            }
        )
    entidades.sort(key=lambda x: x["modelos"], reverse=True)

    return {
        "catalogo": catalogo,
        "marcas": marcas,
        "entidades": entidades,
        "precios_validos": sorted(int(round(v)) for v in form_val["precio_usd"]),
        "rango": {
            "min": redondear(form_val["precio_usd"].min()),
            "max": redondear(form_val["precio_usd"].max()),
        },
    }


def construir_comparacion(inf_val: pd.DataFrame, form_val: pd.DataFrame) -> dict:
    """Compara precios de lista con precios pedidos, sin tratar el catálogo como muestra."""
    inf = (
        inf_val[inf_val["marca"] != "no identificada"]
        .groupby("marca")["precio_usd"]
        .agg(n="size", mediana="median")
    )
    form = (
        form_val[~form_val["marca_web"].isin(["microbus", "pickup"])]
        .groupby("marca_web")["precio_usd"]
        .agg(modelos="size", mediana="median")
    )

    cobertura = []
    for marca in sorted(set(inf.index) | set(form.index)):
        tiene_inf = marca in inf.index
        tiene_form = marca in form.index
        n_inf = int(inf.loc[marca, "n"]) if tiene_inf else 0
        med_inf = inf.loc[marca, "mediana"] if tiene_inf else None
        modelos = int(form.loc[marca, "modelos"]) if tiene_form else 0
        med_form = form.loc[marca, "mediana"] if tiene_form else None

        if n_inf >= 10 and modelos > 0:
            estado = "comparable"
        elif n_inf >= 10 and modelos == 0:
            estado = "solo_informal"
        elif 0 < n_inf < 10 and modelos > 0:
            estado = "informal_baja"
        elif n_inf == 0 and modelos > 0:
            estado = "solo_formal"
        else:
            continue

        item = {
            "clave": marca,
            "label": etiqueta_marca(marca),
            "estado": estado,
            "informal": None
            if not tiene_inf
            else {
                "n": n_inf,
                "mediana": redondear(med_inf),
                "calidad": calidad(n_inf),
            },
            "formal": None
            if not tiene_form
            else {"modelos": modelos, "mediana": redondear(med_form)},
        }
        if estado == "comparable":
            diferencia = med_inf - med_form
            item["diferencia"] = redondear(abs(diferencia))
            item["direccion"] = (
                "informal" if diferencia > 0 else "formal" if diferencia < 0 else "igual"
            )
        cobertura.append(item)

    comparables = [item for item in cobertura if item["estado"] == "comparable"]
    comparables.sort(key=lambda item: item["informal"]["mediana"], reverse=True)
    return {
        "criterio": "≥10 anuncios informales y presencia en catálogo formal; el catálogo no es una muestra",
        "marcas": comparables,
        "cobertura": cobertura,
    }


def main() -> None:
    anuncios, formal = cargar_datos()
    inf_val = filtrar_precio_valido(anuncios)
    form_val = filtrar_precio_valido(formal)

    datos = {
        "meta": construir_meta(anuncios, inf_val, formal, form_val),
        "informal": construir_informal(anuncios, inf_val),
        "formal": construir_formal(formal, form_val),
        "comparacion": construir_comparacion(inf_val, form_val),
    }

    SALIDA.mkdir(parents=True, exist_ok=True)
    texto = json.dumps(datos, ensure_ascii=False, indent=2, allow_nan=False)
    (SALIDA / "datos.json").write_text(texto + "\n", encoding="utf-8")
    JS.mkdir(parents=True, exist_ok=True)
    (JS / "datos.js").write_text(
        "// Generado por src/exportar_datos_web.py — no editar a mano.\n"
        "window.DATOS = " + texto + ";\n",
        encoding="utf-8",
    )

    print(f"OK -> {JS / 'datos.js'}")
    print(f"   informal válidos: {len(inf_val)} | modelos formales: {len(form_val)}")
    print(f"   mediana informal: {datos['meta']['brecha']['informal_mediana']}")
    print(f"   mediana formal:   {datos['meta']['brecha']['formal_mediana']}")
    print(f"   comparación:      {[m['label'] for m in datos['comparacion']['marcas']]}")


if __name__ == "__main__":
    main()
