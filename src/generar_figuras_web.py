#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera las figuras de la web con estilo consistente y corrige las etiquetas.

Correcciones respecto a las figuras previas:
  - 04: la marca es Foton (no Ford) y se muestran n.
  - 07: ya no es un ranking de entidades; muestra la dispersión de precios
        por entidad (cada punto = un modelo) sin ordenar por mediana.
  - 03 informal: solo marcas con n>=30 (no se mezclan rarezas de n=10).
  - 05/07 municipios: etiquetas con n y calidad.

Salidas:
  web/img/*.png  (usadas por la página)
  reports/figuras/Analizar/graficos_nuevos/{03,04,07}*.png  (correcciones)

Uso:
  MPLCONFIGDIR=/tmp/mpl .venv/bin/python src/generar_figuras_web.py
"""

from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.lines import Line2D
from matplotlib.ticker import FuncFormatter

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "web" / "img"
REPORTS = ROOT / "reports" / "figuras" / "Analizar" / "graficos_nuevos"

AZUL = "#1F5FA8"
AZUL_CLARO = "#8FB3D9"
NARANJA = "#D97706"
GRIS = "#6B7280"
GRIS_CLARO = "#D1D5DB"
TINTA = "#111827"
FONDO = "#FFFFFF"

PRECIO_MIN = 1_000
PRECIO_MAX = 1_000_000

plt.rcParams.update(
    {
        "font.family": "Liberation Sans",
        "font.size": 11,
        "axes.titlesize": 16,
        "axes.labelsize": 11,
        "axes.edgecolor": GRIS_CLARO,
        "axes.labelcolor": GRIS,
        "xtick.color": GRIS,
        "ytick.color": TINTA,
        "text.color": TINTA,
        "figure.facecolor": FONDO,
        "axes.facecolor": FONDO,
        "savefig.facecolor": FONDO,
    }
)


def miles(valor: float) -> str:
    return f"{int(round(valor)):,}".replace(",", ".")


def usd(valor: float) -> str:
    return f"{miles(valor)} USD"


def guardar(fig, nombre: str, tambien_reporte: bool = False) -> None:
    WEB.mkdir(parents=True, exist_ok=True)
    fig.savefig(WEB / nombre, dpi=170, bbox_inches="tight", pad_inches=0.22)
    if tambien_reporte:
        REPORTS.mkdir(parents=True, exist_ok=True)
        fig.savefig(REPORTS / nombre, dpi=170, bbox_inches="tight", pad_inches=0.22)
    plt.close(fig)
    print("  ", nombre)


def estilo(
    ax,
    eje_x: bool = False,
    eje_y: bool = False,
    formato_x: bool | None = None,
    formato_y: bool | None = None,
) -> None:
    for lado in ("top", "right"):
        ax.spines[lado].set_visible(False)
    ax.spines["left"].set_color(GRIS_CLARO)
    ax.spines["bottom"].set_color(GRIS_CLARO)
    if eje_x:
        ax.grid(axis="x", color="#EEF0F3", linewidth=0.9)
        ax.set_axisbelow(True)
    if eje_y:
        ax.grid(axis="y", color="#EEF0F3", linewidth=0.9)
        ax.set_axisbelow(True)
    ax.tick_params(axis="both", length=0)
    formato = FuncFormatter(lambda valor, _: miles(valor))
    if eje_x if formato_x is None else formato_x:
        ax.xaxis.set_major_formatter(formato)
    if eje_y if formato_y is None else formato_y:
        ax.yaxis.set_major_formatter(formato)


def fuente(fig, texto: str) -> None:
    fig.text(
        0.01,
        -0.02,
        texto,
        ha="left",
        va="top",
        fontsize=8.5,
        color=GRIS,
    )


def cargar() -> tuple[pd.DataFrame, pd.DataFrame]:
    inf = pd.read_csv(ROOT / "data" / "interim" / "anuncios_analisis.csv", encoding="utf-8-sig")
    form = pd.read_csv(ROOT / "data" / "processed" / "comercializadoras.csv", encoding="utf-8-sig")
    inf["precio_usd"] = pd.to_numeric(inf["precio_usd"], errors="coerce")
    inf["anio"] = pd.to_numeric(inf["anio"], errors="coerce").fillna(0).astype(int)
    inf["marca"] = inf["marca"].fillna("no identificada").astype(str).str.lower().str.strip()
    inf["municipio"] = inf["municipio"].fillna("").astype(str).str.lower().str.strip()
    form["precio_usd"] = pd.to_numeric(form["precio_usd"], errors="coerce")
    form["marca"] = form["marca"].fillna("no identificada").astype(str).str.strip()
    form["marca_norm"] = (
        form["marca_norm"].fillna(form["marca"].str.lower()).astype(str).str.lower().str.strip()
    )
    return inf, form


def valido(df: pd.DataFrame) -> pd.DataFrame:
    return df[(df["precio_usd"] >= PRECIO_MIN) & (df["precio_usd"] < PRECIO_MAX)].copy()


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
}


def marca_label(valor: str) -> str:
    valor = str(valor).lower()
    return MARCAS.get(valor, valor.title())


# --------------------------------------------------------------------------
# 1. Brecha formal vs informal
# --------------------------------------------------------------------------
def fig_brecha(inf: pd.DataFrame, form: pd.DataFrame) -> None:
    med_inf = inf["precio_usd"].median()
    med_form = form["precio_usd"].median()
    n_inf, n_form = len(inf), len(form)

    fig, ax = plt.subplots(figsize=(8.6, 5.2))
    barras = ax.bar(
        ["Informal\n(Revolico)", "Formal\n(comercializadoras)"],
        [med_inf, med_form],
        color=[AZUL, NARANJA],
        width=0.52,
    )
    for barra, valor, n in zip(barras, [med_inf, med_form], [n_inf, n_form]):
        ax.annotate(
            f"{usd(valor)}\nn = {miles(n)}",
            (barra.get_x() + barra.get_width() / 2, valor),
            textcoords="offset points",
            xytext=(0, 9),
            ha="center",
            fontsize=11.5,
            fontweight="bold",
            color=TINTA,
        )
    brecha = med_form - med_inf
    ax.annotate(
        "",
        xy=(1, med_form),
        xytext=(1, med_inf),
        arrowprops=dict(arrowstyle="<->", color=GRIS, linewidth=1.2),
    )
    ax.annotate(
        f"brecha\n{usd(brecha)}",
        xy=(1.02, (med_inf + med_form) / 2),
        ha="left",
        va="center",
        fontsize=10,
        color=GRIS,
    )
    ax.set_ylim(0, med_form * 1.22)
    ax.set_ylabel("Precio mediano (USD)")
    ax.set_title(
        "Dos caminos, una brecha: precio mediano por canal",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.02,
        "Precios válidos: 1.000–999.999 USD · Revolico son precios pedidos, no de cierre",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_y=True)
    ax.spines["bottom"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com) y catálogos BDC ONE, Dongfeng, MCV y CIMEX.")
    guardar(fig, "01_brecha_formal_vs_informal.png", tambien_reporte=False)


# --------------------------------------------------------------------------
# 2. Precio mediano por municipio (n>=30)
# --------------------------------------------------------------------------
def fig_municipios(inf: pd.DataFrame) -> None:
    filas = []
    for clave, grupo in inf.groupby("municipio"):
        if not clave:
            continue
        filas.append(
            {
                "label": MUNICIPIOS.get(clave, clave.title()),
                "n": len(grupo),
                "mediana": grupo["precio_usd"].median(),
            }
        )
    tabla = pd.DataFrame(filas).query("n >= 30").sort_values("mediana")

    fig, ax = plt.subplots(figsize=(9.2, 6.6))
    barras = ax.barh(tabla["label"], tabla["mediana"], color=AZUL, height=0.62)
    for barra, fila in zip(barras, tabla.itertuples()):
        ax.annotate(
            f"{usd(fila.mediana)}  ·  n={miles(fila.n)}",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=TINTA,
        )
    ax.set_xlim(0, tabla["mediana"].max() * 1.33)
    ax.set_xlabel("Precio mediano (USD)")
    ax.set_title(
        "El precio pedido cambia según el municipio",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        "Solo municipios con n≥30 precios válidos · la diferencia puede reflejar el mix de autos, no la ubicación",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com). Precios pedidos, no de cierre.")
    guardar(fig, "02_mediana_precio_por_municipio.png")


# --------------------------------------------------------------------------
# 3. Precio mediano por marca (informal, n>=30) y formal (todo)
# --------------------------------------------------------------------------
def fig_marcas(inf: pd.DataFrame, form: pd.DataFrame) -> None:
    filas = [
        {"label": marca_label(clave), "n": len(grupo), "mediana": grupo["precio_usd"].median()}
        for clave, grupo in inf[inf["marca"] != "no identificada"].groupby("marca")
        if len(grupo) >= 30
    ]
    tabla = pd.DataFrame(filas).sort_values("mediana")

    fig, ax = plt.subplots(figsize=(9.2, 6.4))
    barras = ax.barh(tabla["label"], tabla["mediana"], color=AZUL, height=0.62)
    for barra, fila in zip(barras, tabla.itertuples()):
        ax.annotate(
            f"{usd(fila.mediana)}  ·  n={miles(fila.n)}",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=TINTA,
        )
    ax.set_xlim(0, tabla["mediana"].max() * 1.32)
    ax.set_xlabel("Precio mediano (USD)")
    ax.set_title(
        "¿Qué marcas se piden más caras? (mercado informal)",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        "Solo marcas con n≥30 precios válidos · un precio alto no significa mejor auto",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com). 1.110 anuncios (31%) sin marca identificada, excluidos.")
    guardar(fig, "03_precio_por_marca_informal.png", tambien_reporte=True)

    # Formal
    filas = [
        {"label": marca_label(clave), "n": len(grupo), "mediana": grupo["precio_usd"].median()}
        for clave, grupo in form.groupby("marca_norm")
        if clave not in ("microbus", "pickup")
    ]
    tabla = pd.DataFrame(filas).sort_values("mediana")
    fig, ax = plt.subplots(figsize=(9.2, 5.8))
    colores = [AZUL if n >= 5 else GRIS_CLARO for n in tabla["n"]]
    barras = ax.barh(tabla["label"], tabla["mediana"], color=colores, height=0.62)
    for barra, fila in zip(barras, tabla.itertuples()):
        ax.annotate(
            f"{usd(fila.mediana)}  ·  n={miles(fila.n)}",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=TINTA,
        )
    ax.set_xlim(0, tabla["mediana"].max() * 1.30)
    ax.set_xlabel("Precio mediano (USD)")
    ax.set_title(
        "Catálogo formal: precio de lista por marca",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        "Barras grises: n<5 (muestra insuficiente) · cada entidad vende marcas distintas",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: BDC ONE, Dongfeng Cuba, MCV Comercial y CIMEX. Precios de lista/referencia.")
    guardar(fig, "03_precio_por_marca_formal.png", tambien_reporte=True)


# --------------------------------------------------------------------------
# 4. Comparación por marca (n>=10 en ambos)
# --------------------------------------------------------------------------
def fig_comparacion(inf: pd.DataFrame, form: pd.DataFrame) -> None:
    inf_g = inf[inf["marca"] != "no identificada"].groupby("marca")["precio_usd"].agg(["count", "median"])
    form_g = form[~form["marca_norm"].isin(["microbus", "pickup"])].groupby("marca_norm")["precio_usd"].agg(["count", "median"])

    filas = []
    for clave in sorted(set(inf_g.index) & set(form_g.index)):
        if inf_g.loc[clave, "count"] >= 10 and form_g.loc[clave, "count"] >= 10:
            filas.append(
                {
                    "label": marca_label(clave),
                    "n_inf": int(inf_g.loc[clave, "count"]),
                    "med_inf": inf_g.loc[clave, "median"],
                    "n_form": int(form_g.loc[clave, "count"]),
                    "med_form": form_g.loc[clave, "median"],
                }
            )
    tabla = pd.DataFrame(filas)

    x = np.arange(len(tabla))
    ancho = 0.34
    fig, ax = plt.subplots(figsize=(9.2, 5.6))
    b1 = ax.bar(x - ancho / 2, tabla["med_inf"], ancho, color=AZUL, label="Informal (Revolico)")
    b2 = ax.bar(x + ancho / 2, tabla["med_form"], ancho, color=NARANJA, label="Formal (catálogo)")
    for barras, columna, n_col in (
        (b1, "med_inf", "n_inf"),
        (b2, "med_form", "n_form"),
    ):
        for barra, fila in zip(barras, tabla.itertuples()):
            ax.annotate(
                f"{usd(getattr(fila, columna))}\nn={miles(getattr(fila, n_col))}",
                (barra.get_x() + barra.get_width() / 2, barra.get_height()),
                xytext=(0, 6),
                textcoords="offset points",
                ha="center",
                fontsize=9,
                color=TINTA,
            )
    ax.set_xticks(x)
    ax.set_xticklabels(tabla["label"])
    ax.set_ylim(0, max(tabla[["med_inf", "med_form"]].max()) * 1.28)
    ax.set_ylabel("Precio mediano (USD)")
    ax.set_title(
        "El mismo nombre, dos precios (con cautela)",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        f"Marcas con n≥10 en ambos canales: {len(tabla)} de 11 marcas del catálogo formal",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    ax.legend(frameon=False, loc="upper right", fontsize=9.5)
    estilo(ax, eje_y=True)
    ax.spines["bottom"].set_visible(False)
    fuente(fig, "Fuente: Revolico y catálogos formales. No es el mismo vehículo, versión ni año.")
    guardar(fig, "04_comparacion_formal_vs_informal_por_marca.png", tambien_reporte=True)


# --------------------------------------------------------------------------
# 5. Catálogo formal por entidad: dispersión, no ranking
# --------------------------------------------------------------------------
def fig_catalogo(form: pd.DataFrame) -> None:
    entidades = (
        form.groupby("entidad").size().sort_values(ascending=True).index.tolist()
    )
    fig, ax = plt.subplots(figsize=(9.6, 5.6))
    rng = np.random.default_rng(42)
    for y, entidad in enumerate(entidades):
        precios = form.loc[form["entidad"] == entidad, "precio_usd"].dropna().values
        jitter = rng.uniform(-0.12, 0.12, size=len(precios))
        ax.scatter(
            precios,
            np.full(len(precios), y) + jitter,
            s=46,
            color=AZUL,
            alpha=0.72,
            edgecolors=FONDO,
            linewidths=0.8,
            zorder=3,
        )
        mediana = float(np.median(precios))
        ax.plot(
            [mediana, mediana],
            [y - 0.28, y + 0.28],
            color=NARANJA,
            linewidth=2.2,
            zorder=4,
        )
        ax.annotate(
            f"n={len(precios)}",
            (precios.max(), y),
            xytext=(10, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=GRIS,
        )
    ax.set_yticks(range(len(entidades)))
    ax.set_yticklabels(entidades)
    ax.set_xlim(0, form["precio_usd"].max() * 1.12)
    ax.set_xlabel("Precio de lista (USD)")
    ax.set_title(
        "Qué ofrece el canal formal y a qué precio",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        "Cada punto es un modelo · línea naranja = mediana · no ordenar entidades por precio: venden productos distintos",
        transform=ax.transAxes,
        fontsize=9.2,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    leyenda = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=AZUL, markersize=8, label="Modelo"),
        Line2D([0], [0], color=NARANJA, linewidth=2.2, label="Mediana"),
    ]
    ax.legend(handles=leyenda, frameon=False, loc="lower right", fontsize=9.5)
    fuente(fig, "Fuente: BDC ONE, Dongfeng Cuba, MCV Comercial y CIMEX (83 modelos).")
    guardar(fig, "07_catalogo_formal_por_entidad.png", tambien_reporte=True)


# --------------------------------------------------------------------------
# 6. Concentración municipal (conteos)
# --------------------------------------------------------------------------
def fig_municipios_conteo(inf: pd.DataFrame) -> None:
    total = len(inf)
    tabla = (
        inf[inf["municipio"] != ""]
        .groupby("municipio")
        .size()
        .reset_index(name="n")
        .assign(label=lambda d: d["municipio"].map(lambda x: MUNICIPIOS.get(x, x.title())))
        .sort_values("n")
    )
    fig, ax = plt.subplots(figsize=(9.2, 6.6))
    barras = ax.barh(tabla["label"], tabla["n"], color=AZUL, height=0.62)
    for barra, fila in zip(barras, tabla.itertuples()):
        ax.annotate(
            f"{miles(fila.n)}  ·  {fila.n / total * 100:.1f}%",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=TINTA,
        )
    ax.set_xlim(0, tabla["n"].max() * 1.24)
    ax.set_xlabel("Anuncios publicados")
    ax.set_title(
        "La oferta no se reparte igual por La Habana",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        f"{miles(total)} anuncios · Playa + Centro Habana + Plaza concentran el 51%",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com). Conteo de anuncios, no disponibilidad real de compra.")
    guardar(fig, "a_estructura_concentracion_municipio.png")


# --------------------------------------------------------------------------
# 7. Concentración por marca (conteos, top 12)
# --------------------------------------------------------------------------
def fig_marcas_conteo(inf: pd.DataFrame) -> None:
    total = len(inf)
    tabla = (
        inf[inf["marca"] != "no identificada"]
        .groupby("marca")
        .size()
        .reset_index(name="n")
        .assign(label=lambda d: d["marca"].map(marca_label))
        .sort_values("n", ascending=False)
        .head(12)
        .sort_values("n")
    )
    fig, ax = plt.subplots(figsize=(9.2, 5.8))
    barras = ax.barh(tabla["label"], tabla["n"], color=AZUL, height=0.62)
    for barra, fila in zip(barras, tabla.itertuples()):
        ax.annotate(
            f"{miles(fila.n)}  ·  {fila.n / total * 100:.1f}%",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=9.5,
            color=TINTA,
        )
    ax.set_xlim(0, tabla["n"].max() * 1.26)
    ax.set_xlabel("Anuncios publicados")
    ax.set_title(
        "Hyundai domina la publicación de anuncios",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.015,
        "Top 12 marcas identificadas · 1.110 anuncios (31%) no declaran marca y quedan fuera",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com). Publicar más no significa vender más.")
    guardar(fig, "a_estructura_concentracion_marca.png")


# --------------------------------------------------------------------------
# 8. Clásicos vs modernos (conteo y proporción)
# --------------------------------------------------------------------------
def fig_anios(inf: pd.DataFrame) -> None:
    total = len(inf)
    con_anio = inf[inf["anio"] > 0]
    clasicos = int((con_anio["anio"] < 2000).sum())
    modernos = int((con_anio["anio"] >= 2000).sum())
    sin_anio = total - len(con_anio)

    fig, ax = plt.subplots(figsize=(9.2, 4.6))
    etiquetas = ["Sin año\ndeclarado", "Clásicos\n(<2000)", "Modernos\n(≥2000)"]
    valores = [sin_anio, clasicos, modernos]
    colores = [GRIS_CLARO, NARANJA, AZUL]
    barras = ax.barh(etiquetas, valores, color=colores, height=0.58)
    for barra, valor in zip(barras, valores):
        ax.annotate(
            f"{miles(valor)}  ·  {valor / total * 100:.1f}%",
            (barra.get_width(), barra.get_y() + barra.get_height() / 2),
            xytext=(6, 0),
            textcoords="offset points",
            va="center",
            fontsize=10,
            color=TINTA,
        )
    ax.set_xlim(0, max(valores) * 1.22)
    ax.set_xlabel("Anuncios")
    ax.set_title(
        "La mitad del parque no declara su año",
        loc="left",
        fontweight="bold",
        pad=16,
    )
    ax.text(
        0,
        1.02,
        f"De {miles(total)} anuncios, solo {miles(len(con_anio))} permiten clasificar el auto",
        transform=ax.transAxes,
        fontsize=9.5,
        color=GRIS,
    )
    estilo(ax, eje_x=True)
    ax.spines["left"].set_visible(False)
    fuente(fig, "Fuente: Revolico (revolico.com). Año tal como lo declara el anuncio.")
    guardar(fig, "q5_clasicos_vs_modernos_conteo.png")

    # Proporción sobre los que sí declaran año
    fig, ax = plt.subplots(figsize=(9.2, 3.4))
    ax.barh([""], [clasicos], color=NARANJA, height=0.5)
    ax.barh([""], [modernos], left=[clasicos], color=AZUL, height=0.5)
    ax.annotate(
        f"Clásicos: {miles(clasicos)} ({clasicos / len(con_anio) * 100:.1f}%)",
        (clasicos / 2, 0),
        xytext=(-10, 0),
        textcoords="offset points",
        ha="right",
        va="center",
        color=NARANJA,
        fontsize=9.5,
        fontweight="bold",
        annotation_clip=False,
    )
    ax.annotate(
        f"Modernos: {miles(modernos)} ({modernos / len(con_anio) * 100:.1f}%)",
        (clasicos + modernos / 2, 0),
        ha="center",
        va="center",
        color=FONDO,
        fontsize=10,
        fontweight="bold",
    )
    ax.set_xlim(0, len(con_anio))
    ax.set_yticks([])
    ax.set_xlabel("Anuncios con año declarado")
    ax.set_title(
        "Entre quienes declaran año, casi todo es moderno",
        loc="left",
        fontweight="bold",
        pad=18,
    )
    estilo(ax, formato_x=True)
    ax.spines["left"].set_visible(False)
    ax.spines["bottom"].set_visible(False)
    fig.text(
        0.01,
        -0.08,
        "Fuente: Revolico (revolico.com). Base: 1.821 anuncios con año; 1.745 sin año quedan fuera.",
        ha="left",
        va="top",
        fontsize=8.5,
        color=GRIS,
    )
    guardar(fig, "q5_clasicos_vs_modernos_proporcion.png")


def main() -> None:
    inf, form = cargar()
    inf_v = valido(inf)
    form_v = valido(form)
    print("Generando figuras web...")
    fig_brecha(inf_v, form_v)
    fig_municipios(inf_v)
    fig_marcas(inf_v, form_v)
    fig_comparacion(inf_v, form_v)
    fig_catalogo(form_v)
    fig_municipios_conteo(inf)
    fig_marcas_conteo(inf)
    fig_anios(inf)
    print("Listo.")


if __name__ == "__main__":
    main()
