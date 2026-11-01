# -*- coding: utf-8 -*-
"""Diccionario controlado de marcas -> normalización canónica.

Ampliación 2026-10-26 (scraping de país completo):
- Marcas ya presentes en data/raw/clasificados/revolico/anuncios.csv (36).
- Marcas de los catálogos de comercializadoras (BDC ONE, Dongfeng Cuba, MCV):
  MG, Maxus, Mitsubishi, Dongfeng + marcas de repuestos/líneas de MCV que
  aparecen como "marca" en catalogo_mcv.csv (Goodyear, Michelin, etc.) NO se
  añaden: solo marcas de vehículos.
- Variantes ortográficas frecuentes en títulos de anuncios cubanos
  (typos, acentos, abreviaturas).
- Marcas chinas/comunes en el mercado cubano reciente ausentes del dataset
  previo (Changan, Haval, Chery ya estaba, etc.).

Regla: clave y valor en minúsculas y sin acentos. El matcher debe comparar
sin acentos (ver `normalizar_marca`).
"""

# clave = variante (minúsculas, sin acentos) -> valor = canónica
MARCAS: dict = {
    # --- soviéticas / rusas ---
    "lada": "lada", "vaz": "lada", "2107": "lada", "2105": "lada",
    "2106": "lada", "2101": "lada", "niva": "lada", "priora": "lada",
    "grantа": "lada", "granta": "lada", "vesta": "lada", "kalina": "lada",
    "moskvich": "moskvich", "gaz": "gaz", "uaz": "uaz",
    # --- japonesas ---
    "toyota": "toyota", "nissan": "nissan", "honda": "honda", "mazda": "mazda",
    "mitsubishi": "mitsubishi", "suzuki": "suzuki", "subaru": "subaru",
    "isuzu": "isuzu", "daihatsu": "daihatsu", "lexus": "lexus",
    "suziki": "suzuki", "misubishi": "mitsubishi", "mitshubishi": "mitsubishi",
    # --- coreanas ---
    "hyundai": "hyundai", "kia": "kia", "daewoo": "daewoo", "ssangyong": "ssangyong",
    "hyunday": "hyundai", "hiunday": "hyundai", "hyndai": "hyundai",
    "hidundai": "hyundai", "hyundia": "hyundai", "kía": "kia", "quía": "kia",
    # --- alemanas ---
    "volkswagen": "volkswagen", "vw": "volkswagen", "volks": "volkswagen",
    "volkswaguen": "volkswagen", "volkswaggen": "volkswagen", "volskwagen": "volkswagen",
    "volkswaken": "volkswagen", "bmw": "bmw", "mercedes": "mercedes-benz",
    "mercedes-benz": "mercedes-benz", "mercedes benz": "mercedes-benz",
    "mercedez": "mercedes-benz", "mercedesbenz": "mercedes-benz", "mercides": "mercedes-benz",
    "audi": "audi", "porsche": "porsche", "opel": "opel", "skoda": "skoda",
    "seat": "seat", "mini": "mini", "wolks": "volkswagen",
    # --- americanas ---
    "chevrolet": "chevrolet", "chevy": "chevrolet", "ford": "ford",
    "dodge": "dodge", "jeep": "jeep", "cadillac": "cadillac", "buick": "buick",
    "chrysler": "chrysler", "pontiac": "pontiac", "oldsmobile": "oldsmobile",
    "lincoln": "lincoln", "plymouth": "plymouth", "gmc": "gmc",
    "chverolet": "chevrolet", "chevvy": "chevrolet", "cherolet": "chevrolet",
    # --- europeas ---
    "fiat": "fiat", "peugeot": "peugeot", "renault": "renault",
    "citroen": "citroen", "volvo": "volvo", "saab": "saab", "lancia": "lancia",
    "land rover": "land rover", "landrover": "land rover", "range rover": "land rover",
    "alfa romeo": "alfa romeo", "dacia": "dacia", "rover": "land rover",
    # --- chinas / nuevas en Cuba ---
    "byd": "byd", "chery": "chery", "geely": "geely", "jac": "jac",
    "dongfeng": "dongfeng", "foton": "foton", "baic": "baic", "mg": "mg",
    "maxus": "maxus", "great wall": "great wall", "greatwall": "great wall",
    "gwm": "great wall", "haval": "haval", "changan": "changan",
    "chana": "chana", "lifan": "lifan", "zotye": "zotye", "hongqi": "hongqi",
    "byton": "byton", "voyah": "voyah", "zeekr": "zeekr", "baojun": "baojun",
    "wuling": "wuling", "faw": "faw", "shacman": "shacman", "jmc": "jmc",
    "zx auto": "zx auto", "zxauto": "zx auto", "soueast": "soueast",
    "brilliance": "brilliance", "haima": "haima", "jette": "jetta",
    # --- misceláneas ---
    "tesla": "tesla", "saturn": "saturn", "infiniti": "infiniti",
    "acura": "acura", "maserati": "maserati", "ferrari": "ferrari",
    "lamborghini": "lamborghini", "aston martin": "aston martin",
    "bugatti": "bugatti", "bentley": "bentley", "rolls royce": "rolls royce",
    "pgo": "pgo", "zaz": "zaz", "ikco": "ikco", "proton": "proton",
    "perodua": "perodua", "tata": "tata", "mahindra": "mahindra",
    "skytwell": "skytwell", "seres": "seres", "aion": "aion",
    "gac": "gac", "fuso": "fuso", "hino": "hino", "ud": "ud",
}


def _sin_acentos(texto: str) -> str:
    """Colapsa acentos/diacríticos (á -> a). Requiere unicodedata."""
    import unicodedata
    return "".join(
        c for c in unicodedata.normalize("NFD", texto)
        if unicodedata.category(c) != "Mn"
    )


def normalizar_marca(texto) -> str:
    """Devuelve la marca canónica a partir de texto libre, o '' si no hay match.

    Busca por token-frase con bordes de palabra, sobre texto en minúsculas y
    sin acentos. No adivina: si no hay match documentado en MARCAS -> ''.
    """
    import re
    if texto is None:
        return ""
    t = _sin_acentos(str(texto).strip().lower())
    if not t:
        return ""
    # orden: variantes multi-palabra primero, luego simples (evita match parcial)
    variantes = sorted(MARCAS.keys(), key=len, reverse=True)
    for var in variantes:
        patron = r"(?<![a-z0-9])" + re.escape(var) + r"(?![a-z0-9])"
        if re.search(patron, t):
            return MARCAS[var]
    return ""
