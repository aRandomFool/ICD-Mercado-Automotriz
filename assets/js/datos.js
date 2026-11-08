// Generado por src/exportar_datos_web.py — no editar a mano.
window.DATOS = {
  "meta": {
    "generado": "2026-11-06T15:17:53+00:00",
    "alcance": "La Habana (15 municipios)",
    "reglas": {
      "precio_valido": "1000 <= precio_usd < 1000000",
      "mercado_informal": "Revolico (precios pedidos, no de cierre)",
      "mercado_formal": "Comercializadoras autorizadas (precios de lista/referencia)",
      "catalogo_formal": "el número de modelos mide cobertura del catálogo, no ventas",
      "mediana_por_defecto": true,
      "media_recortada_10": "se elimina 10% inferior y 10% superior",
      "anio_0": "se trata como ausente y se excluye de análisis por año",
      "marca_no_identificada": "excluida en análisis por marca",
      "formal_microbus_pickup": "excluidas como marca en gráficos por marca",
      "calidad_muestra_informal": "n>=30 suficiente · 10<=n<30 baja · n<10 insuficiente"
    },
    "muestras": {
      "informal_total": 3566,
      "informal_precio_valido": 2703,
      "informal_activos_precio_valido": 2015,
      "informal_activos_mediana": 22000,
      "formal_modelos": 83,
      "entrevistas": 30
    },
    "brecha": {
      "informal_mediana": 22000,
      "formal_mediana": 32699,
      "brecha_usd": 10699,
      "informal_media_recortada_10": 22196,
      "formal_media_recortada_10": 34083
    },
    "percentiles": {
      "informal": {
        "p10": 5000,
        "p25": 10250,
        "p50": 22000,
        "p75": 34000,
        "p90": 40000
      },
      "formal": {
        "p10": 20662,
        "p25": 26837,
        "p50": 32699,
        "p75": 42514,
        "p90": 53220
      }
    },
    "fuentes": [
      {
        "nombre": "Revolico",
        "url": "https://www.revolico.com",
        "tipo": "informal"
      },
      {
        "nombre": "BDC ONE",
        "url": "https://bdcone.online",
        "tipo": "formal"
      },
      {
        "nombre": "Dongfeng Cuba",
        "url": "https://dongfengqba.com",
        "tipo": "formal"
      },
      {
        "nombre": "MCV Comercial",
        "url": "https://mcvcommercial.com",
        "tipo": "formal"
      },
      {
        "nombre": "CIMEX",
        "url": "https://cimex.cu",
        "tipo": "formal"
      }
    ],
    "datasets": {
      "informal": "data/interim/anuncios_analisis.csv",
      "formal": "data/processed/comercializadoras.csv",
      "entrevistas": "data/raw/entrevistas/Entrevistas.txt"
    }
  },
  "informal": {
    "municipios": [
      {
        "clave": "playa",
        "label": "Playa",
        "anuncios": 1002,
        "n": 763,
        "mediana": 24000,
        "media_recortada_10": 24793,
        "p25": 15000,
        "p75": 35000,
        "min": 1111,
        "max": 130000,
        "calidad": "suficiente"
      },
      {
        "clave": "centro habana",
        "label": "Centro Habana",
        "anuncios": 472,
        "n": 339,
        "mediana": 26000,
        "media_recortada_10": 25669,
        "p25": 16000,
        "p75": 35000,
        "min": 1100,
        "max": 130000,
        "calidad": "suficiente"
      },
      {
        "clave": "plaza",
        "label": "Plaza",
        "anuncios": 360,
        "n": 276,
        "mediana": 17000,
        "media_recortada_10": 18704,
        "p25": 6950,
        "p75": 30250,
        "min": 1400,
        "max": 100000,
        "calidad": "suficiente"
      },
      {
        "clave": "diez de octubre",
        "label": "Diez de Octubre",
        "anuncios": 330,
        "n": 243,
        "mediana": 17000,
        "media_recortada_10": 17893,
        "p25": 7000,
        "p75": 30000,
        "min": 1000,
        "max": 300000,
        "calidad": "suficiente"
      },
      {
        "clave": "arroyo naranjo",
        "label": "Arroyo Naranjo",
        "anuncios": 284,
        "n": 223,
        "mediana": 28000,
        "media_recortada_10": 27461,
        "p25": 19500,
        "p75": 37500,
        "min": 2000,
        "max": 55000,
        "calidad": "suficiente"
      },
      {
        "clave": "habana del este",
        "label": "Habana del Este",
        "anuncios": 180,
        "n": 157,
        "mediana": 19500,
        "media_recortada_10": 20174,
        "p25": 10000,
        "p75": 31600,
        "min": 1000,
        "max": 80000,
        "calidad": "suficiente"
      },
      {
        "clave": "boyeros",
        "label": "Boyeros",
        "anuncios": 174,
        "n": 147,
        "mediana": 20000,
        "media_recortada_10": 20673,
        "p25": 8500,
        "p75": 34950,
        "min": 1111,
        "max": 320000,
        "calidad": "suficiente"
      },
      {
        "clave": "cerro",
        "label": "Cerro",
        "anuncios": 174,
        "n": 132,
        "mediana": 18000,
        "media_recortada_10": 19300,
        "p25": 8000,
        "p75": 32500,
        "min": 1000,
        "max": 95000,
        "calidad": "suficiente"
      },
      {
        "clave": "la lisa",
        "label": "La Lisa",
        "anuncios": 126,
        "n": 96,
        "mediana": 13000,
        "media_recortada_10": 16276,
        "p25": 4762,
        "p75": 27250,
        "min": 1500,
        "max": 70000,
        "calidad": "suficiente"
      },
      {
        "clave": "marianao",
        "label": "Marianao",
        "anuncios": 122,
        "n": 81,
        "mediana": 16000,
        "media_recortada_10": 16595,
        "p25": 7000,
        "p75": 25500,
        "min": 1800,
        "max": 82000,
        "calidad": "suficiente"
      },
      {
        "clave": "guanabacoa",
        "label": "Guanabacoa",
        "anuncios": 100,
        "n": 80,
        "mediana": 19000,
        "media_recortada_10": 19459,
        "p25": 8375,
        "p75": 31250,
        "min": 1000,
        "max": 60000,
        "calidad": "suficiente"
      },
      {
        "clave": "san miguel del padrón",
        "label": "San Miguel del Padrón",
        "anuncios": 99,
        "n": 65,
        "mediana": 22000,
        "media_recortada_10": 22061,
        "p25": 11111,
        "p75": 32000,
        "min": 3000,
        "max": 72000,
        "calidad": "suficiente"
      },
      {
        "clave": "habana vieja",
        "label": "Habana Vieja",
        "anuncios": 74,
        "n": 50,
        "mediana": 26800,
        "media_recortada_10": 26956,
        "p25": 17625,
        "p75": 35750,
        "min": 4500,
        "max": 58000,
        "calidad": "suficiente"
      },
      {
        "clave": "cotorro",
        "label": "Cotorro",
        "anuncios": 47,
        "n": 35,
        "mediana": 14000,
        "media_recortada_10": 15834,
        "p25": 6200,
        "p75": 24498,
        "min": 4500,
        "max": 62000,
        "calidad": "suficiente"
      },
      {
        "clave": "regla",
        "label": "Regla",
        "anuncios": 20,
        "n": 15,
        "mediana": 11000,
        "media_recortada_10": 11673,
        "p25": 5375,
        "p75": 17750,
        "min": 1000,
        "max": 45000,
        "calidad": "baja"
      }
    ],
    "municipio_marca": [
      {
        "municipio": "arroyo naranjo",
        "marca": "chery",
        "n": 1,
        "mediana": 17500,
        "p25": 17500,
        "p75": 17500
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "chevrolet",
        "n": 3,
        "mediana": 16000,
        "p25": 11000,
        "p75": 24750
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "fiat",
        "n": 2,
        "mediana": 4250,
        "p25": 4125,
        "p75": 4375
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "ford",
        "n": 3,
        "mediana": 6000,
        "p25": 5750,
        "p75": 15000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "gmc",
        "n": 1,
        "mediana": 55000,
        "p25": 55000,
        "p75": 55000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "honda",
        "n": 3,
        "mediana": 38000,
        "p25": 32000,
        "p75": 38000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "hyundai",
        "n": 118,
        "mediana": 29500,
        "p25": 25000,
        "p75": 38000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "kia",
        "n": 3,
        "mediana": 18000,
        "p25": 15000,
        "p75": 18000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "lada",
        "n": 10,
        "mediana": 7000,
        "p25": 5625,
        "p75": 8000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "mercedes-benz",
        "n": 2,
        "mediana": 16000,
        "p25": 11000,
        "p75": 21000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "mg",
        "n": 1,
        "mediana": 30000,
        "p25": 30000,
        "p75": 30000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "mitsubishi",
        "n": 2,
        "mediana": 14500,
        "p25": 14250,
        "p75": 14750
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "nissan",
        "n": 8,
        "mediana": 30000,
        "p25": 29250,
        "p75": 32750
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "peugeot",
        "n": 1,
        "mediana": 9000,
        "p25": 9000,
        "p75": 9000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "plymouth",
        "n": 1,
        "mediana": 6000,
        "p25": 6000,
        "p75": 6000
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "toyota",
        "n": 7,
        "mediana": 35000,
        "p25": 18500,
        "p75": 38500
      },
      {
        "municipio": "arroyo naranjo",
        "marca": "volkswagen",
        "n": 4,
        "mediana": 33000,
        "p25": 26250,
        "p75": 34500
      },
      {
        "municipio": "boyeros",
        "marca": "aion",
        "n": 1,
        "mediana": 23300,
        "p25": 23300,
        "p75": 23300
      },
      {
        "municipio": "boyeros",
        "marca": "audi",
        "n": 1,
        "mediana": 25000,
        "p25": 25000,
        "p75": 25000
      },
      {
        "municipio": "boyeros",
        "marca": "chevrolet",
        "n": 3,
        "mediana": 4000,
        "p25": 4000,
        "p75": 5250
      },
      {
        "municipio": "boyeros",
        "marca": "daewoo",
        "n": 1,
        "mediana": 8500,
        "p25": 8500,
        "p75": 8500
      },
      {
        "municipio": "boyeros",
        "marca": "dodge",
        "n": 2,
        "mediana": 5500,
        "p25": 5250,
        "p75": 5750
      },
      {
        "municipio": "boyeros",
        "marca": "dongfeng",
        "n": 2,
        "mediana": 37500,
        "p25": 36250,
        "p75": 38750
      },
      {
        "municipio": "boyeros",
        "marca": "fiat",
        "n": 2,
        "mediana": 3750,
        "p25": 3125,
        "p75": 4375
      },
      {
        "municipio": "boyeros",
        "marca": "ford",
        "n": 4,
        "mediana": 7250,
        "p25": 6000,
        "p75": 8500
      },
      {
        "municipio": "boyeros",
        "marca": "geely",
        "n": 5,
        "mediana": 11500,
        "p25": 11500,
        "p75": 12000
      },
      {
        "municipio": "boyeros",
        "marca": "haval",
        "n": 2,
        "mediana": 17750,
        "p25": 17625,
        "p75": 17875
      },
      {
        "municipio": "boyeros",
        "marca": "honda",
        "n": 5,
        "mediana": 37500,
        "p25": 35000,
        "p75": 40000
      },
      {
        "municipio": "boyeros",
        "marca": "hyundai",
        "n": 29,
        "mediana": 29000,
        "p25": 19500,
        "p75": 36000
      },
      {
        "municipio": "boyeros",
        "marca": "infiniti",
        "n": 1,
        "mediana": 30000,
        "p25": 30000,
        "p75": 30000
      },
      {
        "municipio": "boyeros",
        "marca": "jeep",
        "n": 1,
        "mediana": 7200,
        "p25": 7200,
        "p75": 7200
      },
      {
        "municipio": "boyeros",
        "marca": "jmc",
        "n": 1,
        "mediana": 29000,
        "p25": 29000,
        "p75": 29000
      },
      {
        "municipio": "boyeros",
        "marca": "kia",
        "n": 2,
        "mediana": 10750,
        "p25": 9125,
        "p75": 12375
      },
      {
        "municipio": "boyeros",
        "marca": "lada",
        "n": 8,
        "mediana": 5000,
        "p25": 3975,
        "p75": 6250
      },
      {
        "municipio": "boyeros",
        "marca": "mercedes-benz",
        "n": 4,
        "mediana": 37500,
        "p25": 32500,
        "p75": 57500
      },
      {
        "municipio": "boyeros",
        "marca": "mg",
        "n": 1,
        "mediana": 14000,
        "p25": 14000,
        "p75": 14000
      },
      {
        "municipio": "boyeros",
        "marca": "nissan",
        "n": 3,
        "mediana": 20000,
        "p25": 19000,
        "p75": 27500
      },
      {
        "municipio": "boyeros",
        "marca": "oldsmobile",
        "n": 1,
        "mediana": 7000,
        "p25": 7000,
        "p75": 7000
      },
      {
        "municipio": "boyeros",
        "marca": "plymouth",
        "n": 1,
        "mediana": 4000,
        "p25": 4000,
        "p75": 4000
      },
      {
        "municipio": "boyeros",
        "marca": "pontiac",
        "n": 1,
        "mediana": 2200,
        "p25": 2200,
        "p75": 2200
      },
      {
        "municipio": "boyeros",
        "marca": "renault",
        "n": 4,
        "mediana": 10500,
        "p25": 10500,
        "p75": 11000
      },
      {
        "municipio": "boyeros",
        "marca": "toyota",
        "n": 5,
        "mediana": 19000,
        "p25": 19000,
        "p75": 19500
      },
      {
        "municipio": "boyeros",
        "marca": "volkswagen",
        "n": 3,
        "mediana": 37000,
        "p25": 36000,
        "p75": 37250
      },
      {
        "municipio": "centro habana",
        "marca": "audi",
        "n": 3,
        "mediana": 34000,
        "p25": 25250,
        "p75": 49500
      },
      {
        "municipio": "centro habana",
        "marca": "baic",
        "n": 3,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33250
      },
      {
        "municipio": "centro habana",
        "marca": "bmw",
        "n": 5,
        "mediana": 55000,
        "p25": 40000,
        "p75": 57000
      },
      {
        "municipio": "centro habana",
        "marca": "buick",
        "n": 1,
        "mediana": 3500,
        "p25": 3500,
        "p75": 3500
      },
      {
        "municipio": "centro habana",
        "marca": "byd",
        "n": 1,
        "mediana": 27000,
        "p25": 27000,
        "p75": 27000
      },
      {
        "municipio": "centro habana",
        "marca": "cadillac",
        "n": 1,
        "mediana": 70000,
        "p25": 70000,
        "p75": 70000
      },
      {
        "municipio": "centro habana",
        "marca": "changan",
        "n": 1,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33000
      },
      {
        "municipio": "centro habana",
        "marca": "chery",
        "n": 1,
        "mediana": 17000,
        "p25": 17000,
        "p75": 17000
      },
      {
        "municipio": "centro habana",
        "marca": "chevrolet",
        "n": 9,
        "mediana": 7000,
        "p25": 3500,
        "p75": 29500
      },
      {
        "municipio": "centro habana",
        "marca": "daewoo",
        "n": 1,
        "mediana": 8500,
        "p25": 8500,
        "p75": 8500
      },
      {
        "municipio": "centro habana",
        "marca": "dodge",
        "n": 1,
        "mediana": 11000,
        "p25": 11000,
        "p75": 11000
      },
      {
        "municipio": "centro habana",
        "marca": "dongfeng",
        "n": 2,
        "mediana": 33000,
        "p25": 32000,
        "p75": 34000
      },
      {
        "municipio": "centro habana",
        "marca": "fiat",
        "n": 1,
        "mediana": 10000,
        "p25": 10000,
        "p75": 10000
      },
      {
        "municipio": "centro habana",
        "marca": "ford",
        "n": 3,
        "mediana": 28000,
        "p25": 21500,
        "p75": 32250
      },
      {
        "municipio": "centro habana",
        "marca": "foton",
        "n": 2,
        "mediana": 50000,
        "p25": 50000,
        "p75": 50000
      },
      {
        "municipio": "centro habana",
        "marca": "geely",
        "n": 1,
        "mediana": 32000,
        "p25": 32000,
        "p75": 32000
      },
      {
        "municipio": "centro habana",
        "marca": "hino",
        "n": 1,
        "mediana": 65000,
        "p25": 65000,
        "p75": 65000
      },
      {
        "municipio": "centro habana",
        "marca": "honda",
        "n": 8,
        "mediana": 35000,
        "p25": 27375,
        "p75": 38425
      },
      {
        "municipio": "centro habana",
        "marca": "hyundai",
        "n": 100,
        "mediana": 32650,
        "p25": 22750,
        "p75": 38625
      },
      {
        "municipio": "centro habana",
        "marca": "infiniti",
        "n": 1,
        "mediana": 28500,
        "p25": 28500,
        "p75": 28500
      },
      {
        "municipio": "centro habana",
        "marca": "jeep",
        "n": 1,
        "mediana": 25500,
        "p25": 25500,
        "p75": 25500
      },
      {
        "municipio": "centro habana",
        "marca": "kia",
        "n": 20,
        "mediana": 18750,
        "p25": 16625,
        "p75": 25125
      },
      {
        "municipio": "centro habana",
        "marca": "lada",
        "n": 13,
        "mediana": 6500,
        "p25": 6000,
        "p75": 7000
      },
      {
        "municipio": "centro habana",
        "marca": "lexus",
        "n": 1,
        "mediana": 36000,
        "p25": 36000,
        "p75": 36000
      },
      {
        "municipio": "centro habana",
        "marca": "maxus",
        "n": 2,
        "mediana": 27000,
        "p25": 25500,
        "p75": 28500
      },
      {
        "municipio": "centro habana",
        "marca": "mercedes-benz",
        "n": 3,
        "mediana": 22000,
        "p25": 18500,
        "p75": 22000
      },
      {
        "municipio": "centro habana",
        "marca": "mg",
        "n": 2,
        "mediana": 29000,
        "p25": 26500,
        "p75": 31500
      },
      {
        "municipio": "centro habana",
        "marca": "mini",
        "n": 2,
        "mediana": 13000,
        "p25": 13000,
        "p75": 13000
      },
      {
        "municipio": "centro habana",
        "marca": "mitsubishi",
        "n": 4,
        "mediana": 26000,
        "p25": 26000,
        "p75": 26000
      },
      {
        "municipio": "centro habana",
        "marca": "nissan",
        "n": 11,
        "mediana": 30000,
        "p25": 16000,
        "p75": 36500
      },
      {
        "municipio": "centro habana",
        "marca": "opel",
        "n": 2,
        "mediana": 4500,
        "p25": 4500,
        "p75": 4500
      },
      {
        "municipio": "centro habana",
        "marca": "peugeot",
        "n": 3,
        "mediana": 13500,
        "p25": 13000,
        "p75": 13750
      },
      {
        "municipio": "centro habana",
        "marca": "plymouth",
        "n": 1,
        "mediana": 7000,
        "p25": 7000,
        "p75": 7000
      },
      {
        "municipio": "centro habana",
        "marca": "renault",
        "n": 1,
        "mediana": 11000,
        "p25": 11000,
        "p75": 11000
      },
      {
        "municipio": "centro habana",
        "marca": "seat",
        "n": 1,
        "mediana": 11000,
        "p25": 11000,
        "p75": 11000
      },
      {
        "municipio": "centro habana",
        "marca": "skoda",
        "n": 1,
        "mediana": 4500,
        "p25": 4500,
        "p75": 4500
      },
      {
        "municipio": "centro habana",
        "marca": "toyota",
        "n": 13,
        "mediana": 35000,
        "p25": 26000,
        "p75": 39000
      },
      {
        "municipio": "centro habana",
        "marca": "volkswagen",
        "n": 8,
        "mediana": 34250,
        "p25": 33250,
        "p75": 36000
      },
      {
        "municipio": "centro habana",
        "marca": "volvo",
        "n": 1,
        "mediana": 58000,
        "p25": 58000,
        "p75": 58000
      },
      {
        "municipio": "cerro",
        "marca": "audi",
        "n": 1,
        "mediana": 95000,
        "p25": 95000,
        "p75": 95000
      },
      {
        "municipio": "cerro",
        "marca": "baic",
        "n": 1,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33000
      },
      {
        "municipio": "cerro",
        "marca": "chevrolet",
        "n": 7,
        "mediana": 7500,
        "p25": 4500,
        "p75": 8750
      },
      {
        "municipio": "cerro",
        "marca": "fiat",
        "n": 1,
        "mediana": 7200,
        "p25": 7200,
        "p75": 7200
      },
      {
        "municipio": "cerro",
        "marca": "geely",
        "n": 2,
        "mediana": 11500,
        "p25": 11250,
        "p75": 11750
      },
      {
        "municipio": "cerro",
        "marca": "honda",
        "n": 8,
        "mediana": 30000,
        "p25": 26750,
        "p75": 36750
      },
      {
        "municipio": "cerro",
        "marca": "hyundai",
        "n": 32,
        "mediana": 31250,
        "p25": 21000,
        "p75": 37250
      },
      {
        "municipio": "cerro",
        "marca": "jeep",
        "n": 2,
        "mediana": 11000,
        "p25": 11000,
        "p75": 11000
      },
      {
        "municipio": "cerro",
        "marca": "kia",
        "n": 6,
        "mediana": 18000,
        "p25": 18000,
        "p75": 18000
      },
      {
        "municipio": "cerro",
        "marca": "lada",
        "n": 12,
        "mediana": 6250,
        "p25": 6000,
        "p75": 7625
      },
      {
        "municipio": "cerro",
        "marca": "maxus",
        "n": 1,
        "mediana": 30000,
        "p25": 30000,
        "p75": 30000
      },
      {
        "municipio": "cerro",
        "marca": "mercedes-benz",
        "n": 5,
        "mediana": 10000,
        "p25": 9000,
        "p75": 10000
      },
      {
        "municipio": "cerro",
        "marca": "mg",
        "n": 1,
        "mediana": 24000,
        "p25": 24000,
        "p75": 24000
      },
      {
        "municipio": "cerro",
        "marca": "mitsubishi",
        "n": 1,
        "mediana": 8000,
        "p25": 8000,
        "p75": 8000
      },
      {
        "municipio": "cerro",
        "marca": "opel",
        "n": 3,
        "mediana": 13000,
        "p25": 8750,
        "p75": 13500
      },
      {
        "municipio": "cerro",
        "marca": "peugeot",
        "n": 3,
        "mediana": 7500,
        "p25": 7500,
        "p75": 10500
      },
      {
        "municipio": "cerro",
        "marca": "skoda",
        "n": 2,
        "mediana": 6250,
        "p25": 5375,
        "p75": 7125
      },
      {
        "municipio": "cerro",
        "marca": "toyota",
        "n": 12,
        "mediana": 21750,
        "p25": 12000,
        "p75": 27250
      },
      {
        "municipio": "cerro",
        "marca": "volkswagen",
        "n": 4,
        "mediana": 9000,
        "p25": 8000,
        "p75": 10250
      },
      {
        "municipio": "cotorro",
        "marca": "chevrolet",
        "n": 1,
        "mediana": 36000,
        "p25": 36000,
        "p75": 36000
      },
      {
        "municipio": "cotorro",
        "marca": "honda",
        "n": 1,
        "mediana": 37500,
        "p25": 37500,
        "p75": 37500
      },
      {
        "municipio": "cotorro",
        "marca": "hyundai",
        "n": 5,
        "mediana": 30000,
        "p25": 24000,
        "p75": 35000
      },
      {
        "municipio": "cotorro",
        "marca": "lada",
        "n": 4,
        "mediana": 6950,
        "p25": 5925,
        "p75": 7675
      },
      {
        "municipio": "cotorro",
        "marca": "moskvich",
        "n": 1,
        "mediana": 4600,
        "p25": 4600,
        "p75": 4600
      },
      {
        "municipio": "cotorro",
        "marca": "peugeot",
        "n": 1,
        "mediana": 15000,
        "p25": 15000,
        "p75": 15000
      },
      {
        "municipio": "cotorro",
        "marca": "toyota",
        "n": 1,
        "mediana": 24997,
        "p25": 24997,
        "p75": 24997
      },
      {
        "municipio": "cotorro",
        "marca": "volkswagen",
        "n": 1,
        "mediana": 30500,
        "p25": 30500,
        "p75": 30500
      },
      {
        "municipio": "diez de octubre",
        "marca": "acura",
        "n": 1,
        "mediana": 17000,
        "p25": 17000,
        "p75": 17000
      },
      {
        "municipio": "diez de octubre",
        "marca": "audi",
        "n": 3,
        "mediana": 17000,
        "p25": 16750,
        "p75": 17000
      },
      {
        "municipio": "diez de octubre",
        "marca": "bmw",
        "n": 2,
        "mediana": 155000,
        "p25": 107500,
        "p75": 202500
      },
      {
        "municipio": "diez de octubre",
        "marca": "buick",
        "n": 1,
        "mediana": 13500,
        "p25": 13500,
        "p75": 13500
      },
      {
        "municipio": "diez de octubre",
        "marca": "byd",
        "n": 1,
        "mediana": 46000,
        "p25": 46000,
        "p75": 46000
      },
      {
        "municipio": "diez de octubre",
        "marca": "cadillac",
        "n": 3,
        "mediana": 100000,
        "p25": 52500,
        "p75": 115000
      },
      {
        "municipio": "diez de octubre",
        "marca": "chevrolet",
        "n": 4,
        "mediana": 6000,
        "p25": 5750,
        "p75": 13125
      },
      {
        "municipio": "diez de octubre",
        "marca": "citroen",
        "n": 1,
        "mediana": 10000,
        "p25": 10000,
        "p75": 10000
      },
      {
        "municipio": "diez de octubre",
        "marca": "daewoo",
        "n": 4,
        "mediana": 9750,
        "p25": 8125,
        "p75": 11000
      },
      {
        "municipio": "diez de octubre",
        "marca": "dongfeng",
        "n": 4,
        "mediana": 35000,
        "p25": 35000,
        "p75": 35000
      },
      {
        "municipio": "diez de octubre",
        "marca": "fiat",
        "n": 5,
        "mediana": 8000,
        "p25": 5000,
        "p75": 8000
      },
      {
        "municipio": "diez de octubre",
        "marca": "ford",
        "n": 3,
        "mediana": 7000,
        "p25": 6750,
        "p75": 21000
      },
      {
        "municipio": "diez de octubre",
        "marca": "foton",
        "n": 1,
        "mediana": 40000,
        "p25": 40000,
        "p75": 40000
      },
      {
        "municipio": "diez de octubre",
        "marca": "gac",
        "n": 1,
        "mediana": 18000,
        "p25": 18000,
        "p75": 18000
      },
      {
        "municipio": "diez de octubre",
        "marca": "gaz",
        "n": 1,
        "mediana": 4200,
        "p25": 4200,
        "p75": 4200
      },
      {
        "municipio": "diez de octubre",
        "marca": "honda",
        "n": 3,
        "mediana": 30000,
        "p25": 26500,
        "p75": 31250
      },
      {
        "municipio": "diez de octubre",
        "marca": "hyundai",
        "n": 50,
        "mediana": 25000,
        "p25": 21250,
        "p75": 35375
      },
      {
        "municipio": "diez de octubre",
        "marca": "jeep",
        "n": 1,
        "mediana": 9000,
        "p25": 9000,
        "p75": 9000
      },
      {
        "municipio": "diez de octubre",
        "marca": "kia",
        "n": 16,
        "mediana": 16850,
        "p25": 15750,
        "p75": 18850
      },
      {
        "municipio": "diez de octubre",
        "marca": "lada",
        "n": 24,
        "mediana": 6750,
        "p25": 4950,
        "p75": 7625
      },
      {
        "municipio": "diez de octubre",
        "marca": "land rover",
        "n": 2,
        "mediana": 61000,
        "p25": 56500,
        "p75": 65500
      },
      {
        "municipio": "diez de octubre",
        "marca": "mercedes-benz",
        "n": 1,
        "mediana": 300000,
        "p25": 300000,
        "p75": 300000
      },
      {
        "municipio": "diez de octubre",
        "marca": "mg",
        "n": 2,
        "mediana": 19000,
        "p25": 18000,
        "p75": 20000
      },
      {
        "municipio": "diez de octubre",
        "marca": "mitsubishi",
        "n": 2,
        "mediana": 24750,
        "p25": 18125,
        "p75": 31375
      },
      {
        "municipio": "diez de octubre",
        "marca": "moskvich",
        "n": 4,
        "mediana": 5500,
        "p25": 4375,
        "p75": 6500
      },
      {
        "municipio": "diez de octubre",
        "marca": "nissan",
        "n": 10,
        "mediana": 29000,
        "p25": 27000,
        "p75": 30000
      },
      {
        "municipio": "diez de octubre",
        "marca": "opel",
        "n": 1,
        "mediana": 5500,
        "p25": 5500,
        "p75": 5500
      },
      {
        "municipio": "diez de octubre",
        "marca": "peugeot",
        "n": 4,
        "mediana": 11000,
        "p25": 5200,
        "p75": 17000
      },
      {
        "municipio": "diez de octubre",
        "marca": "porsche",
        "n": 1,
        "mediana": 60000,
        "p25": 60000,
        "p75": 60000
      },
      {
        "municipio": "diez de octubre",
        "marca": "renault",
        "n": 2,
        "mediana": 1600,
        "p25": 1550,
        "p75": 1650
      },
      {
        "municipio": "diez de octubre",
        "marca": "skoda",
        "n": 4,
        "mediana": 4000,
        "p25": 4000,
        "p75": 4000
      },
      {
        "municipio": "diez de octubre",
        "marca": "subaru",
        "n": 2,
        "mediana": 8500,
        "p25": 8500,
        "p75": 8500
      },
      {
        "municipio": "diez de octubre",
        "marca": "toyota",
        "n": 8,
        "mediana": 36000,
        "p25": 24748,
        "p75": 38000
      },
      {
        "municipio": "diez de octubre",
        "marca": "volkswagen",
        "n": 11,
        "mediana": 8000,
        "p25": 5000,
        "p75": 12250
      },
      {
        "municipio": "guanabacoa",
        "marca": "chevrolet",
        "n": 1,
        "mediana": 8000,
        "p25": 8000,
        "p75": 8000
      },
      {
        "municipio": "guanabacoa",
        "marca": "dodge",
        "n": 1,
        "mediana": 1000,
        "p25": 1000,
        "p75": 1000
      },
      {
        "municipio": "guanabacoa",
        "marca": "foton",
        "n": 2,
        "mediana": 52000,
        "p25": 51000,
        "p75": 53000
      },
      {
        "municipio": "guanabacoa",
        "marca": "hyundai",
        "n": 17,
        "mediana": 32000,
        "p25": 19000,
        "p75": 32000
      },
      {
        "municipio": "guanabacoa",
        "marca": "infiniti",
        "n": 1,
        "mediana": 29000,
        "p25": 29000,
        "p75": 29000
      },
      {
        "municipio": "guanabacoa",
        "marca": "kia",
        "n": 5,
        "mediana": 19000,
        "p25": 18500,
        "p75": 20000
      },
      {
        "municipio": "guanabacoa",
        "marca": "lada",
        "n": 8,
        "mediana": 6000,
        "p25": 4875,
        "p75": 6500
      },
      {
        "municipio": "guanabacoa",
        "marca": "mercedes-benz",
        "n": 2,
        "mediana": 41750,
        "p25": 32625,
        "p75": 50875
      },
      {
        "municipio": "guanabacoa",
        "marca": "nissan",
        "n": 2,
        "mediana": 38500,
        "p25": 37750,
        "p75": 39250
      },
      {
        "municipio": "guanabacoa",
        "marca": "opel",
        "n": 1,
        "mediana": 31000,
        "p25": 31000,
        "p75": 31000
      },
      {
        "municipio": "guanabacoa",
        "marca": "peugeot",
        "n": 3,
        "mediana": 13000,
        "p25": 9250,
        "p75": 14000
      },
      {
        "municipio": "guanabacoa",
        "marca": "plymouth",
        "n": 2,
        "mediana": 4750,
        "p25": 4625,
        "p75": 4875
      },
      {
        "municipio": "guanabacoa",
        "marca": "toyota",
        "n": 5,
        "mediana": 19000,
        "p25": 18000,
        "p75": 21500
      },
      {
        "municipio": "guanabacoa",
        "marca": "volkswagen",
        "n": 2,
        "mediana": 6750,
        "p25": 6625,
        "p75": 6875
      },
      {
        "municipio": "habana del este",
        "marca": "audi",
        "n": 2,
        "mediana": 30500,
        "p25": 23250,
        "p75": 37750
      },
      {
        "municipio": "habana del este",
        "marca": "baic",
        "n": 1,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33000
      },
      {
        "municipio": "habana del este",
        "marca": "bmw",
        "n": 2,
        "mediana": 25500,
        "p25": 25250,
        "p75": 25750
      },
      {
        "municipio": "habana del este",
        "marca": "chevrolet",
        "n": 6,
        "mediana": 13500,
        "p25": 7375,
        "p75": 30875
      },
      {
        "municipio": "habana del este",
        "marca": "fiat",
        "n": 5,
        "mediana": 5500,
        "p25": 4000,
        "p75": 6000
      },
      {
        "municipio": "habana del este",
        "marca": "ford",
        "n": 3,
        "mediana": 4000,
        "p25": 3750,
        "p75": 4500
      },
      {
        "municipio": "habana del este",
        "marca": "geely",
        "n": 1,
        "mediana": 11600,
        "p25": 11600,
        "p75": 11600
      },
      {
        "municipio": "habana del este",
        "marca": "honda",
        "n": 3,
        "mediana": 27000,
        "p25": 26500,
        "p75": 27500
      },
      {
        "municipio": "habana del este",
        "marca": "hyundai",
        "n": 38,
        "mediana": 30750,
        "p25": 22000,
        "p75": 35000
      },
      {
        "municipio": "habana del este",
        "marca": "infiniti",
        "n": 1,
        "mediana": 75000,
        "p25": 75000,
        "p75": 75000
      },
      {
        "municipio": "habana del este",
        "marca": "kia",
        "n": 19,
        "mediana": 18000,
        "p25": 17250,
        "p75": 22000
      },
      {
        "municipio": "habana del este",
        "marca": "lada",
        "n": 7,
        "mediana": 6500,
        "p25": 5000,
        "p75": 8000
      },
      {
        "municipio": "habana del este",
        "marca": "land rover",
        "n": 3,
        "mediana": 20000,
        "p25": 12500,
        "p75": 32500
      },
      {
        "municipio": "habana del este",
        "marca": "mercedes-benz",
        "n": 1,
        "mediana": 60000,
        "p25": 60000,
        "p75": 60000
      },
      {
        "municipio": "habana del este",
        "marca": "mg",
        "n": 2,
        "mediana": 18250,
        "p25": 15375,
        "p75": 21125
      },
      {
        "municipio": "habana del este",
        "marca": "moskvich",
        "n": 1,
        "mediana": 4000,
        "p25": 4000,
        "p75": 4000
      },
      {
        "municipio": "habana del este",
        "marca": "nissan",
        "n": 11,
        "mediana": 21650,
        "p25": 20500,
        "p75": 33500
      },
      {
        "municipio": "habana del este",
        "marca": "opel",
        "n": 1,
        "mediana": 10000,
        "p25": 10000,
        "p75": 10000
      },
      {
        "municipio": "habana del este",
        "marca": "peugeot",
        "n": 4,
        "mediana": 7500,
        "p25": 5500,
        "p75": 10950
      },
      {
        "municipio": "habana del este",
        "marca": "seat",
        "n": 2,
        "mediana": 10500,
        "p25": 9250,
        "p75": 11750
      },
      {
        "municipio": "habana del este",
        "marca": "toyota",
        "n": 5,
        "mediana": 15000,
        "p25": 10000,
        "p75": 25000
      },
      {
        "municipio": "habana del este",
        "marca": "volkswagen",
        "n": 5,
        "mediana": 7000,
        "p25": 5500,
        "p75": 10000
      },
      {
        "municipio": "habana vieja",
        "marca": "baic",
        "n": 1,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33000
      },
      {
        "municipio": "habana vieja",
        "marca": "chevrolet",
        "n": 3,
        "mediana": 6500,
        "p25": 6500,
        "p75": 20175
      },
      {
        "municipio": "habana vieja",
        "marca": "dongfeng",
        "n": 5,
        "mediana": 28600,
        "p25": 25000,
        "p75": 29791
      },
      {
        "municipio": "habana vieja",
        "marca": "fiat",
        "n": 1,
        "mediana": 4500,
        "p25": 4500,
        "p75": 4500
      },
      {
        "municipio": "habana vieja",
        "marca": "honda",
        "n": 1,
        "mediana": 40000,
        "p25": 40000,
        "p75": 40000
      },
      {
        "municipio": "habana vieja",
        "marca": "hyundai",
        "n": 15,
        "mediana": 35000,
        "p25": 24500,
        "p75": 38500
      },
      {
        "municipio": "habana vieja",
        "marca": "jac",
        "n": 1,
        "mediana": 58000,
        "p25": 58000,
        "p75": 58000
      },
      {
        "municipio": "habana vieja",
        "marca": "kia",
        "n": 3,
        "mediana": 44000,
        "p25": 29000,
        "p75": 44500
      },
      {
        "municipio": "habana vieja",
        "marca": "lada",
        "n": 2,
        "mediana": 7500,
        "p25": 7500,
        "p75": 7500
      },
      {
        "municipio": "habana vieja",
        "marca": "nissan",
        "n": 3,
        "mediana": 30000,
        "p25": 18750,
        "p75": 31000
      },
      {
        "municipio": "habana vieja",
        "marca": "renault",
        "n": 1,
        "mediana": 10500,
        "p25": 10500,
        "p75": 10500
      },
      {
        "municipio": "habana vieja",
        "marca": "toyota",
        "n": 3,
        "mediana": 40000,
        "p25": 26000,
        "p75": 42500
      },
      {
        "municipio": "la lisa",
        "marca": "audi",
        "n": 2,
        "mediana": 14500,
        "p25": 13750,
        "p75": 15250
      },
      {
        "municipio": "la lisa",
        "marca": "bmw",
        "n": 2,
        "mediana": 30000,
        "p25": 26000,
        "p75": 34000
      },
      {
        "municipio": "la lisa",
        "marca": "cadillac",
        "n": 1,
        "mediana": 70000,
        "p25": 70000,
        "p75": 70000
      },
      {
        "municipio": "la lisa",
        "marca": "chevrolet",
        "n": 3,
        "mediana": 5000,
        "p25": 4250,
        "p75": 6500
      },
      {
        "municipio": "la lisa",
        "marca": "daewoo",
        "n": 2,
        "mediana": 9500,
        "p25": 8250,
        "p75": 10750
      },
      {
        "municipio": "la lisa",
        "marca": "fiat",
        "n": 7,
        "mediana": 3000,
        "p25": 2500,
        "p75": 3000
      },
      {
        "municipio": "la lisa",
        "marca": "ford",
        "n": 3,
        "mediana": 7000,
        "p25": 5250,
        "p75": 22500
      },
      {
        "municipio": "la lisa",
        "marca": "gac",
        "n": 1,
        "mediana": 27000,
        "p25": 27000,
        "p75": 27000
      },
      {
        "municipio": "la lisa",
        "marca": "geely",
        "n": 1,
        "mediana": 12000,
        "p25": 12000,
        "p75": 12000
      },
      {
        "municipio": "la lisa",
        "marca": "honda",
        "n": 5,
        "mediana": 40000,
        "p25": 28000,
        "p75": 42000
      },
      {
        "municipio": "la lisa",
        "marca": "hyundai",
        "n": 18,
        "mediana": 31500,
        "p25": 22250,
        "p75": 37250
      },
      {
        "municipio": "la lisa",
        "marca": "kia",
        "n": 6,
        "mediana": 18000,
        "p25": 14375,
        "p75": 19000
      },
      {
        "municipio": "la lisa",
        "marca": "lada",
        "n": 7,
        "mediana": 4000,
        "p25": 3000,
        "p75": 4500
      },
      {
        "municipio": "la lisa",
        "marca": "land rover",
        "n": 1,
        "mediana": 50000,
        "p25": 50000,
        "p75": 50000
      },
      {
        "municipio": "la lisa",
        "marca": "mercedes-benz",
        "n": 2,
        "mediana": 19750,
        "p25": 16375,
        "p75": 23125
      },
      {
        "municipio": "la lisa",
        "marca": "mini",
        "n": 1,
        "mediana": 3500,
        "p25": 3500,
        "p75": 3500
      },
      {
        "municipio": "la lisa",
        "marca": "nissan",
        "n": 2,
        "mediana": 27000,
        "p25": 25500,
        "p75": 28500
      },
      {
        "municipio": "la lisa",
        "marca": "oldsmobile",
        "n": 1,
        "mediana": 7000,
        "p25": 7000,
        "p75": 7000
      },
      {
        "municipio": "la lisa",
        "marca": "peugeot",
        "n": 1,
        "mediana": 2500,
        "p25": 2500,
        "p75": 2500
      },
      {
        "municipio": "la lisa",
        "marca": "renault",
        "n": 2,
        "mediana": 9000,
        "p25": 5250,
        "p75": 12750
      },
      {
        "municipio": "la lisa",
        "marca": "toyota",
        "n": 5,
        "mediana": 13000,
        "p25": 12000,
        "p75": 23000
      },
      {
        "municipio": "la lisa",
        "marca": "volkswagen",
        "n": 3,
        "mediana": 3200,
        "p25": 3000,
        "p75": 5850
      },
      {
        "municipio": "marianao",
        "marca": "bmw",
        "n": 1,
        "mediana": 50000,
        "p25": 50000,
        "p75": 50000
      },
      {
        "municipio": "marianao",
        "marca": "buick",
        "n": 1,
        "mediana": 5000,
        "p25": 5000,
        "p75": 5000
      },
      {
        "municipio": "marianao",
        "marca": "chery",
        "n": 1,
        "mediana": 18500,
        "p25": 18500,
        "p75": 18500
      },
      {
        "municipio": "marianao",
        "marca": "chevrolet",
        "n": 3,
        "mediana": 6500,
        "p25": 6000,
        "p75": 7050
      },
      {
        "municipio": "marianao",
        "marca": "dongfeng",
        "n": 2,
        "mediana": 77000,
        "p25": 74500,
        "p75": 79500
      },
      {
        "municipio": "marianao",
        "marca": "fiat",
        "n": 1,
        "mediana": 3000,
        "p25": 3000,
        "p75": 3000
      },
      {
        "municipio": "marianao",
        "marca": "geely",
        "n": 2,
        "mediana": 12000,
        "p25": 12000,
        "p75": 12000
      },
      {
        "municipio": "marianao",
        "marca": "haval",
        "n": 1,
        "mediana": 17500,
        "p25": 17500,
        "p75": 17500
      },
      {
        "municipio": "marianao",
        "marca": "hyundai",
        "n": 12,
        "mediana": 18250,
        "p25": 10833,
        "p75": 30125
      },
      {
        "municipio": "marianao",
        "marca": "kia",
        "n": 9,
        "mediana": 24000,
        "p25": 18500,
        "p75": 25500
      },
      {
        "municipio": "marianao",
        "marca": "lada",
        "n": 9,
        "mediana": 6700,
        "p25": 6000,
        "p75": 8000
      },
      {
        "municipio": "marianao",
        "marca": "mg",
        "n": 1,
        "mediana": 15000,
        "p25": 15000,
        "p75": 15000
      },
      {
        "municipio": "marianao",
        "marca": "nissan",
        "n": 6,
        "mediana": 31050,
        "p25": 30100,
        "p75": 32000
      },
      {
        "municipio": "marianao",
        "marca": "plymouth",
        "n": 1,
        "mediana": 4500,
        "p25": 4500,
        "p75": 4500
      },
      {
        "municipio": "marianao",
        "marca": "seat",
        "n": 1,
        "mediana": 11000,
        "p25": 11000,
        "p75": 11000
      },
      {
        "municipio": "marianao",
        "marca": "toyota",
        "n": 1,
        "mediana": 23500,
        "p25": 23500,
        "p75": 23500
      },
      {
        "municipio": "marianao",
        "marca": "volkswagen",
        "n": 1,
        "mediana": 32000,
        "p25": 32000,
        "p75": 32000
      },
      {
        "municipio": "playa",
        "marca": "audi",
        "n": 8,
        "mediana": 37000,
        "p25": 19000,
        "p75": 54000
      },
      {
        "municipio": "playa",
        "marca": "baic",
        "n": 1,
        "mediana": 33000,
        "p25": 33000,
        "p75": 33000
      },
      {
        "municipio": "playa",
        "marca": "bmw",
        "n": 20,
        "mediana": 45500,
        "p25": 33250,
        "p75": 98750
      },
      {
        "municipio": "playa",
        "marca": "byd",
        "n": 2,
        "mediana": 35000,
        "p25": 35000,
        "p75": 35000
      },
      {
        "municipio": "playa",
        "marca": "cadillac",
        "n": 1,
        "mediana": 130000,
        "p25": 130000,
        "p75": 130000
      },
      {
        "municipio": "playa",
        "marca": "chery",
        "n": 5,
        "mediana": 20500,
        "p25": 20500,
        "p75": 21000
      },
      {
        "municipio": "playa",
        "marca": "chevrolet",
        "n": 13,
        "mediana": 28000,
        "p25": 18000,
        "p75": 38000
      },
      {
        "municipio": "playa",
        "marca": "daewoo",
        "n": 2,
        "mediana": 7250,
        "p25": 6875,
        "p75": 7625
      },
      {
        "municipio": "playa",
        "marca": "dodge",
        "n": 3,
        "mediana": 6000,
        "p25": 4250,
        "p75": 35500
      },
      {
        "municipio": "playa",
        "marca": "dongfeng",
        "n": 13,
        "mediana": 28000,
        "p25": 26000,
        "p75": 35000
      },
      {
        "municipio": "playa",
        "marca": "fiat",
        "n": 13,
        "mediana": 6500,
        "p25": 5500,
        "p75": 9000
      },
      {
        "municipio": "playa",
        "marca": "ford",
        "n": 6,
        "mediana": 50000,
        "p25": 42500,
        "p75": 61250
      },
      {
        "municipio": "playa",
        "marca": "foton",
        "n": 3,
        "mediana": 53000,
        "p25": 46500,
        "p75": 54500
      },
      {
        "municipio": "playa",
        "marca": "geely",
        "n": 5,
        "mediana": 10500,
        "p25": 10500,
        "p75": 11500
      },
      {
        "municipio": "playa",
        "marca": "gmc",
        "n": 2,
        "mediana": 68500,
        "p25": 66750,
        "p75": 70250
      },
      {
        "municipio": "playa",
        "marca": "honda",
        "n": 23,
        "mediana": 30000,
        "p25": 23000,
        "p75": 44000
      },
      {
        "municipio": "playa",
        "marca": "hyundai",
        "n": 210,
        "mediana": 28250,
        "p25": 21275,
        "p75": 38000
      },
      {
        "municipio": "playa",
        "marca": "infiniti",
        "n": 1,
        "mediana": 28000,
        "p25": 28000,
        "p75": 28000
      },
      {
        "municipio": "playa",
        "marca": "isuzu",
        "n": 3,
        "mediana": 50000,
        "p25": 48000,
        "p75": 54500
      },
      {
        "municipio": "playa",
        "marca": "jac",
        "n": 3,
        "mediana": 21000,
        "p25": 20000,
        "p75": 21500
      },
      {
        "municipio": "playa",
        "marca": "jeep",
        "n": 2,
        "mediana": 9950,
        "p25": 7425,
        "p75": 12475
      },
      {
        "municipio": "playa",
        "marca": "jmc",
        "n": 1,
        "mediana": 35000,
        "p25": 35000,
        "p75": 35000
      },
      {
        "municipio": "playa",
        "marca": "kia",
        "n": 76,
        "mediana": 18900,
        "p25": 15875,
        "p75": 24000
      },
      {
        "municipio": "playa",
        "marca": "lada",
        "n": 36,
        "mediana": 6250,
        "p25": 4925,
        "p75": 7625
      },
      {
        "municipio": "playa",
        "marca": "land rover",
        "n": 8,
        "mediana": 41000,
        "p25": 29000,
        "p75": 50750
      },
      {
        "municipio": "playa",
        "marca": "maxus",
        "n": 1,
        "mediana": 34000,
        "p25": 34000,
        "p75": 34000
      },
      {
        "municipio": "playa",
        "marca": "mazda",
        "n": 1,
        "mediana": 37000,
        "p25": 37000,
        "p75": 37000
      },
      {
        "municipio": "playa",
        "marca": "mercedes-benz",
        "n": 6,
        "mediana": 25500,
        "p25": 25000,
        "p75": 44000
      },
      {
        "municipio": "playa",
        "marca": "mg",
        "n": 9,
        "mediana": 24000,
        "p25": 13000,
        "p75": 26000
      },
      {
        "municipio": "playa",
        "marca": "mitsubishi",
        "n": 13,
        "mediana": 22000,
        "p25": 12000,
        "p75": 27000
      },
      {
        "municipio": "playa",
        "marca": "moskvich",
        "n": 6,
        "mediana": 6500,
        "p25": 5750,
        "p75": 6500
      },
      {
        "municipio": "playa",
        "marca": "nissan",
        "n": 35,
        "mediana": 30000,
        "p25": 24000,
        "p75": 33500
      },
      {
        "municipio": "playa",
        "marca": "peugeot",
        "n": 6,
        "mediana": 11500,
        "p25": 11000,
        "p75": 13125
      },
      {
        "municipio": "playa",
        "marca": "plymouth",
        "n": 2,
        "mediana": 5600,
        "p25": 5150,
        "p75": 6050
      },
      {
        "municipio": "playa",
        "marca": "pontiac",
        "n": 1,
        "mediana": 4000,
        "p25": 4000,
        "p75": 4000
      },
      {
        "municipio": "playa",
        "marca": "porsche",
        "n": 2,
        "mediana": 13579,
        "p25": 13579,
        "p75": 13579
      },
      {
        "municipio": "playa",
        "marca": "renault",
        "n": 8,
        "mediana": 12750,
        "p25": 10750,
        "p75": 23499
      },
      {
        "municipio": "playa",
        "marca": "seat",
        "n": 1,
        "mediana": 9000,
        "p25": 9000,
        "p75": 9000
      },
      {
        "municipio": "playa",
        "marca": "skoda",
        "n": 8,
        "mediana": 10000,
        "p25": 8750,
        "p75": 10000
      },
      {
        "municipio": "playa",
        "marca": "toyota",
        "n": 38,
        "mediana": 24998,
        "p25": 19000,
        "p75": 38000
      },
      {
        "municipio": "playa",
        "marca": "volkswagen",
        "n": 20,
        "mediana": 9525,
        "p25": 5500,
        "p75": 12625
      },
      {
        "municipio": "playa",
        "marca": "volvo",
        "n": 1,
        "mediana": 56000,
        "p25": 56000,
        "p75": 56000
      },
      {
        "municipio": "plaza",
        "marca": "audi",
        "n": 4,
        "mediana": 15000,
        "p25": 13250,
        "p75": 36250
      },
      {
        "municipio": "plaza",
        "marca": "bmw",
        "n": 1,
        "mediana": 62000,
        "p25": 62000,
        "p75": 62000
      },
      {
        "municipio": "plaza",
        "marca": "byd",
        "n": 2,
        "mediana": 28500,
        "p25": 27750,
        "p75": 29250
      },
      {
        "municipio": "plaza",
        "marca": "chevrolet",
        "n": 4,
        "mediana": 12000,
        "p25": 9375,
        "p75": 18000
      },
      {
        "municipio": "plaza",
        "marca": "citroen",
        "n": 1,
        "mediana": 13000,
        "p25": 13000,
        "p75": 13000
      },
      {
        "municipio": "plaza",
        "marca": "daewoo",
        "n": 6,
        "mediana": 9400,
        "p25": 7575,
        "p75": 11000
      },
      {
        "municipio": "plaza",
        "marca": "dodge",
        "n": 1,
        "mediana": 39500,
        "p25": 39500,
        "p75": 39500
      },
      {
        "municipio": "plaza",
        "marca": "dongfeng",
        "n": 4,
        "mediana": 35500,
        "p25": 32749,
        "p75": 37000
      },
      {
        "municipio": "plaza",
        "marca": "fiat",
        "n": 11,
        "mediana": 6500,
        "p25": 3250,
        "p75": 7500
      },
      {
        "municipio": "plaza",
        "marca": "ford",
        "n": 3,
        "mediana": 15000,
        "p25": 9750,
        "p75": 28500
      },
      {
        "municipio": "plaza",
        "marca": "foton",
        "n": 2,
        "mediana": 32250,
        "p25": 30875,
        "p75": 33625
      },
      {
        "municipio": "plaza",
        "marca": "gac",
        "n": 1,
        "mediana": 27000,
        "p25": 27000,
        "p75": 27000
      },
      {
        "municipio": "plaza",
        "marca": "geely",
        "n": 6,
        "mediana": 31000,
        "p25": 15750,
        "p75": 34250
      },
      {
        "municipio": "plaza",
        "marca": "honda",
        "n": 13,
        "mediana": 33000,
        "p25": 28000,
        "p75": 37500
      },
      {
        "municipio": "plaza",
        "marca": "hyundai",
        "n": 56,
        "mediana": 28000,
        "p25": 19375,
        "p75": 33625
      },
      {
        "municipio": "plaza",
        "marca": "infiniti",
        "n": 1,
        "mediana": 13500,
        "p25": 13500,
        "p75": 13500
      },
      {
        "municipio": "plaza",
        "marca": "jac",
        "n": 1,
        "mediana": 20000,
        "p25": 20000,
        "p75": 20000
      },
      {
        "municipio": "plaza",
        "marca": "jeep",
        "n": 3,
        "mediana": 11000,
        "p25": 9250,
        "p75": 12250
      },
      {
        "municipio": "plaza",
        "marca": "kia",
        "n": 11,
        "mediana": 18500,
        "p25": 17000,
        "p75": 24500
      },
      {
        "municipio": "plaza",
        "marca": "lada",
        "n": 18,
        "mediana": 6500,
        "p25": 4625,
        "p75": 6725
      },
      {
        "municipio": "plaza",
        "marca": "mercedes-benz",
        "n": 5,
        "mediana": 25000,
        "p25": 25000,
        "p75": 30000
      },
      {
        "municipio": "plaza",
        "marca": "moskvich",
        "n": 2,
        "mediana": 4750,
        "p25": 4125,
        "p75": 5375
      },
      {
        "municipio": "plaza",
        "marca": "nissan",
        "n": 10,
        "mediana": 28500,
        "p25": 11625,
        "p75": 32000
      },
      {
        "municipio": "plaza",
        "marca": "opel",
        "n": 2,
        "mediana": 4150,
        "p25": 3975,
        "p75": 4325
      },
      {
        "municipio": "plaza",
        "marca": "peugeot",
        "n": 4,
        "mediana": 13500,
        "p25": 11750,
        "p75": 15375
      },
      {
        "municipio": "plaza",
        "marca": "renault",
        "n": 2,
        "mediana": 10500,
        "p25": 9750,
        "p75": 11250
      },
      {
        "municipio": "plaza",
        "marca": "seat",
        "n": 3,
        "mediana": 8500,
        "p25": 7750,
        "p75": 9750
      },
      {
        "municipio": "plaza",
        "marca": "subaru",
        "n": 3,
        "mediana": 7000,
        "p25": 6500,
        "p75": 7000
      },
      {
        "municipio": "plaza",
        "marca": "suzuki",
        "n": 1,
        "mediana": 5000,
        "p25": 5000,
        "p75": 5000
      },
      {
        "municipio": "plaza",
        "marca": "toyota",
        "n": 19,
        "mediana": 25000,
        "p25": 14750,
        "p75": 42500
      },
      {
        "municipio": "plaza",
        "marca": "volkswagen",
        "n": 13,
        "mediana": 4000,
        "p25": 3000,
        "p75": 17500
      },
      {
        "municipio": "regla",
        "marca": "hyundai",
        "n": 2,
        "mediana": 20000,
        "p25": 19000,
        "p75": 21000
      },
      {
        "municipio": "regla",
        "marca": "lada",
        "n": 1,
        "mediana": 5750,
        "p25": 5750,
        "p75": 5750
      },
      {
        "municipio": "regla",
        "marca": "moskvich",
        "n": 1,
        "mediana": 5000,
        "p25": 5000,
        "p75": 5000
      },
      {
        "municipio": "regla",
        "marca": "toyota",
        "n": 1,
        "mediana": 24997,
        "p25": 24997,
        "p75": 24997
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "buick",
        "n": 1,
        "mediana": 4000,
        "p25": 4000,
        "p75": 4000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "chevrolet",
        "n": 7,
        "mediana": 28000,
        "p25": 13750,
        "p75": 30000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "fiat",
        "n": 2,
        "mediana": 6500,
        "p25": 6000,
        "p75": 7000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "geely",
        "n": 2,
        "mediana": 11750,
        "p25": 11375,
        "p75": 12125
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "honda",
        "n": 1,
        "mediana": 26500,
        "p25": 26500,
        "p75": 26500
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "hyundai",
        "n": 11,
        "mediana": 25000,
        "p25": 21250,
        "p75": 35000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "kia",
        "n": 1,
        "mediana": 18000,
        "p25": 18000,
        "p75": 18000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "lada",
        "n": 2,
        "mediana": 7250,
        "p25": 6625,
        "p75": 7875
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "maxus",
        "n": 3,
        "mediana": 30000,
        "p25": 26000,
        "p75": 30000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "moskvich",
        "n": 1,
        "mediana": 4800,
        "p25": 4800,
        "p75": 4800
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "nissan",
        "n": 5,
        "mediana": 32000,
        "p25": 30000,
        "p75": 32000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "plymouth",
        "n": 1,
        "mediana": 7000,
        "p25": 7000,
        "p75": 7000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "seat",
        "n": 1,
        "mediana": 7500,
        "p25": 7500,
        "p75": 7500
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "toyota",
        "n": 4,
        "mediana": 40000,
        "p25": 35500,
        "p75": 40000
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "volkswagen",
        "n": 1,
        "mediana": 3500,
        "p25": 3500,
        "p75": 3500
      },
      {
        "municipio": "san miguel del padrón",
        "marca": "volvo",
        "n": 1,
        "mediana": 56000,
        "p25": 56000,
        "p75": 56000
      }
    ],
    "marcas": [
      {
        "clave": "hyundai",
        "label": "Hyundai",
        "anuncios": 872,
        "n": 713,
        "mediana": 29000,
        "media_recortada_10": 29261,
        "p25": 21500,
        "p75": 37500,
        "min": 2800,
        "max": 100000,
        "calidad": "suficiente"
      },
      {
        "clave": "kia",
        "label": "Kia",
        "anuncios": 220,
        "n": 177,
        "mediana": 18000,
        "media_recortada_10": 19827,
        "p25": 16000,
        "p75": 24000,
        "min": 7500,
        "max": 50000,
        "calidad": "suficiente"
      },
      {
        "clave": "lada",
        "label": "Lada",
        "anuncios": 192,
        "n": 161,
        "mediana": 6500,
        "media_recortada_10": 6274,
        "p25": 5000,
        "p75": 7500,
        "min": 1500,
        "max": 13900,
        "calidad": "suficiente"
      },
      {
        "clave": "toyota",
        "label": "Toyota",
        "anuncios": 148,
        "n": 127,
        "mediana": 24997,
        "media_recortada_10": 26961,
        "p25": 18500,
        "p75": 38000,
        "min": 3800,
        "max": 65000,
        "calidad": "suficiente"
      },
      {
        "clave": "nissan",
        "label": "Nissan",
        "anuncios": 115,
        "n": 106,
        "mediana": 30000,
        "media_recortada_10": 28482,
        "p25": 23250,
        "p75": 32000,
        "min": 7500,
        "max": 80000,
        "calidad": "suficiente"
      },
      {
        "clave": "honda",
        "label": "Honda",
        "anuncios": 90,
        "n": 74,
        "mediana": 32250,
        "media_recortada_10": 32873,
        "p25": 26000,
        "p75": 40000,
        "min": 7900,
        "max": 53000,
        "calidad": "suficiente"
      },
      {
        "clave": "volkswagen",
        "label": "Volkswagen",
        "anuncios": 88,
        "n": 76,
        "mediana": 8950,
        "media_recortada_10": 14514,
        "p25": 5000,
        "p75": 31250,
        "min": 2500,
        "max": 55000,
        "calidad": "suficiente"
      },
      {
        "clave": "chevrolet",
        "label": "Chevrolet",
        "anuncios": 83,
        "n": 67,
        "mediana": 9500,
        "media_recortada_10": 15421,
        "p25": 6000,
        "p75": 29750,
        "min": 1500,
        "max": 55000,
        "calidad": "suficiente"
      },
      {
        "clave": "bmw",
        "label": "BMW",
        "anuncios": 65,
        "n": 33,
        "mediana": 46000,
        "media_recortada_10": 56241,
        "p25": 31000,
        "p75": 85000,
        "min": 15500,
        "max": 250000,
        "calidad": "suficiente"
      },
      {
        "clave": "fiat",
        "label": "Fiat",
        "anuncios": 56,
        "n": 51,
        "mediana": 5500,
        "media_recortada_10": 5607,
        "p25": 3000,
        "p75": 7500,
        "min": 1400,
        "max": 30000,
        "calidad": "suficiente"
      },
      {
        "clave": "mercedes-benz",
        "label": "Mercedes-Benz",
        "anuncios": 42,
        "n": 31,
        "mediana": 25000,
        "media_recortada_10": 30480,
        "p25": 22000,
        "p75": 45000,
        "min": 6000,
        "max": 300000,
        "calidad": "suficiente"
      },
      {
        "clave": "audi",
        "label": "Audi",
        "anuncios": 36,
        "n": 24,
        "mediana": 18500,
        "media_recortada_10": 29800,
        "p25": 16000,
        "p75": 52000,
        "min": 8000,
        "max": 100000,
        "calidad": "baja"
      },
      {
        "clave": "peugeot",
        "label": "Peugeot",
        "anuncios": 35,
        "n": 30,
        "mediana": 12000,
        "media_recortada_10": 11167,
        "p25": 7500,
        "p75": 14000,
        "min": 1000,
        "max": 20000,
        "calidad": "suficiente"
      },
      {
        "clave": "dongfeng",
        "label": "Dongfeng",
        "anuncios": 34,
        "n": 32,
        "mediana": 35000,
        "media_recortada_10": 32498,
        "p25": 27429,
        "p75": 35250,
        "min": 22000,
        "max": 82000,
        "calidad": "suficiente"
      },
      {
        "clave": "ford",
        "label": "Ford",
        "anuncios": 32,
        "n": 28,
        "mediana": 11750,
        "media_recortada_10": 20250,
        "p25": 6000,
        "p75": 38000,
        "min": 3500,
        "max": 90000,
        "calidad": "baja"
      },
      {
        "clave": "geely",
        "label": "Geely",
        "anuncios": 30,
        "n": 25,
        "mediana": 11600,
        "media_recortada_10": 14390,
        "p25": 11000,
        "p75": 12500,
        "min": 10000,
        "max": 35000,
        "calidad": "baja"
      },
      {
        "clave": "mitsubishi",
        "label": "Mitsubishi",
        "anuncios": 24,
        "n": 22,
        "mediana": 23500,
        "media_recortada_10": 21861,
        "p25": 12500,
        "p75": 26750,
        "min": 7500,
        "max": 55000,
        "calidad": "baja"
      },
      {
        "clave": "renault",
        "label": "Renault",
        "anuncios": 22,
        "n": 20,
        "mediana": 10750,
        "media_recortada_10": 11156,
        "p25": 9750,
        "p75": 12875,
        "min": 1500,
        "max": 28000,
        "calidad": "baja"
      },
      {
        "clave": "land rover",
        "label": "Land Rover",
        "anuncios": 19,
        "n": 14,
        "mediana": 43500,
        "media_recortada_10": 39083,
        "p25": 23750,
        "p75": 51500,
        "min": 5000,
        "max": 70000,
        "calidad": "baja"
      },
      {
        "clave": "mg",
        "label": "MG",
        "anuncios": 19,
        "n": 19,
        "mediana": 24000,
        "media_recortada_10": 21294,
        "p25": 14500,
        "p75": 26000,
        "min": 11990,
        "max": 34000,
        "calidad": "baja"
      },
      {
        "clave": "moskvich",
        "label": "Moskvich",
        "anuncios": 19,
        "n": 16,
        "mediana": 5250,
        "media_recortada_10": 5351,
        "p25": 4575,
        "p75": 6500,
        "min": 2500,
        "max": 8000,
        "calidad": "baja"
      },
      {
        "clave": "daewoo",
        "label": "Daewoo",
        "anuncios": 17,
        "n": 16,
        "mediana": 8500,
        "media_recortada_10": 8914,
        "p25": 7375,
        "p75": 11000,
        "min": 6500,
        "max": 12000,
        "calidad": "baja"
      },
      {
        "clave": "skoda",
        "label": "Skoda",
        "anuncios": 17,
        "n": 15,
        "mediana": 5000,
        "media_recortada_10": 6808,
        "p25": 4250,
        "p75": 10000,
        "min": 4000,
        "max": 10000,
        "calidad": "baja"
      },
      {
        "clave": "foton",
        "label": "Foton",
        "anuncios": 12,
        "n": 10,
        "mediana": 50000,
        "media_recortada_10": 46500,
        "p25": 40000,
        "p75": 52250,
        "min": 29500,
        "max": 56000,
        "calidad": "baja"
      },
      {
        "clave": "maxus",
        "label": "MAXUS",
        "anuncios": 11,
        "n": 7,
        "mediana": 30000,
        "media_recortada_10": 28571,
        "p25": 27000,
        "p75": 30000,
        "min": 22000,
        "max": 34000,
        "calidad": "insuficiente"
      },
      {
        "clave": "cadillac",
        "label": "Cadillac",
        "anuncios": 10,
        "n": 6,
        "mediana": 85000,
        "media_recortada_10": 84167,
        "p25": 70000,
        "p75": 122500,
        "min": 5000,
        "max": 130000,
        "calidad": "insuficiente"
      },
      {
        "clave": "jeep",
        "label": "Jeep",
        "anuncios": 10,
        "n": 10,
        "mediana": 11000,
        "media_recortada_10": 10650,
        "p25": 7875,
        "p75": 12875,
        "min": 4900,
        "max": 25500,
        "calidad": "baja"
      },
      {
        "clave": "opel",
        "label": "Opel",
        "anuncios": 10,
        "n": 10,
        "mediana": 5000,
        "media_recortada_10": 7562,
        "p25": 4500,
        "p75": 12250,
        "min": 3800,
        "max": 31000,
        "calidad": "baja"
      },
      {
        "clave": "plymouth",
        "label": "Plymouth",
        "anuncios": 10,
        "n": 9,
        "mediana": 5000,
        "media_recortada_10": 5467,
        "p25": 4500,
        "p75": 6500,
        "min": 4000,
        "max": 7000,
        "calidad": "insuficiente"
      },
      {
        "clave": "seat",
        "label": "Seat",
        "anuncios": 10,
        "n": 9,
        "mediana": 9000,
        "media_recortada_10": 9556,
        "p25": 8000,
        "p75": 11000,
        "min": 7000,
        "max": 13000,
        "calidad": "insuficiente"
      },
      {
        "clave": "gmc",
        "label": "GMC",
        "anuncios": 9,
        "n": 3,
        "mediana": 65000,
        "media_recortada_10": 64000,
        "p25": 60000,
        "p75": 68500,
        "min": 55000,
        "max": 72000,
        "calidad": "insuficiente"
      },
      {
        "clave": "chery",
        "label": "Chery",
        "anuncios": 8,
        "n": 8,
        "mediana": 19750,
        "media_recortada_10": 19875,
        "p25": 18250,
        "p75": 20625,
        "min": 17000,
        "max": 25000,
        "calidad": "insuficiente"
      },
      {
        "clave": "dodge",
        "label": "Dodge",
        "anuncios": 8,
        "n": 8,
        "mediana": 6000,
        "media_recortada_10": 17000,
        "p25": 4375,
        "p75": 18125,
        "min": 1000,
        "max": 65000,
        "calidad": "insuficiente"
      },
      {
        "clave": "infiniti",
        "label": "Infiniti",
        "anuncios": 8,
        "n": 6,
        "mediana": 28750,
        "media_recortada_10": 34000,
        "p25": 28125,
        "p75": 29750,
        "min": 13500,
        "max": 75000,
        "calidad": "insuficiente"
      },
      {
        "clave": "baic",
        "label": "BAIC",
        "anuncios": 7,
        "n": 7,
        "mediana": 33000,
        "media_recortada_10": 33071,
        "p25": 33000,
        "p75": 33000,
        "min": 33000,
        "max": 33500,
        "calidad": "insuficiente"
      },
      {
        "clave": "porsche",
        "label": "Porsche",
        "anuncios": 7,
        "n": 3,
        "mediana": 13579,
        "media_recortada_10": 29053,
        "p25": 13579,
        "p75": 36790,
        "min": 13579,
        "max": 60000,
        "calidad": "insuficiente"
      },
      {
        "clave": "byd",
        "label": "BYD",
        "anuncios": 6,
        "n": 6,
        "mediana": 32500,
        "media_recortada_10": 33333,
        "p25": 27750,
        "p75": 35000,
        "min": 27000,
        "max": 46000,
        "calidad": "insuficiente"
      },
      {
        "clave": "jac",
        "label": "JAC",
        "anuncios": 6,
        "n": 5,
        "mediana": 21000,
        "media_recortada_10": 28000,
        "p25": 20000,
        "p75": 22000,
        "min": 19000,
        "max": 58000,
        "calidad": "insuficiente"
      },
      {
        "clave": "gac",
        "label": "GAC",
        "anuncios": 5,
        "n": 3,
        "mediana": 27000,
        "media_recortada_10": 24000,
        "p25": 22500,
        "p75": 27000,
        "min": 18000,
        "max": 27000,
        "calidad": "insuficiente"
      },
      {
        "clave": "mini",
        "label": "MINI",
        "anuncios": 5,
        "n": 3,
        "mediana": 13000,
        "media_recortada_10": 9833,
        "p25": 8250,
        "p75": 13000,
        "min": 3500,
        "max": 13000,
        "calidad": "insuficiente"
      },
      {
        "clave": "subaru",
        "label": "Subaru",
        "anuncios": 5,
        "n": 5,
        "mediana": 7000,
        "media_recortada_10": 7400,
        "p25": 7000,
        "p75": 8500,
        "min": 6000,
        "max": 8500,
        "calidad": "insuficiente"
      },
      {
        "clave": "buick",
        "label": "Buick",
        "anuncios": 4,
        "n": 4,
        "mediana": 4500,
        "media_recortada_10": 6500,
        "p25": 3875,
        "p75": 7125,
        "min": 3500,
        "max": 13500,
        "calidad": "insuficiente"
      },
      {
        "clave": "volvo",
        "label": "Volvo",
        "anuncios": 4,
        "n": 3,
        "mediana": 56000,
        "media_recortada_10": 56667,
        "p25": 56000,
        "p75": 57000,
        "min": 56000,
        "max": 58000,
        "calidad": "insuficiente"
      },
      {
        "clave": "haval",
        "label": "Haval",
        "anuncios": 3,
        "n": 3,
        "mediana": 17500,
        "media_recortada_10": 17667,
        "p25": 17500,
        "p75": 17750,
        "min": 17500,
        "max": 18000,
        "calidad": "insuficiente"
      },
      {
        "clave": "isuzu",
        "label": "Isuzu",
        "anuncios": 3,
        "n": 3,
        "mediana": 50000,
        "media_recortada_10": 51667,
        "p25": 48000,
        "p75": 54500,
        "min": 46000,
        "max": 59000,
        "calidad": "insuficiente"
      },
      {
        "clave": "aion",
        "label": "Aion",
        "anuncios": 2,
        "n": 1,
        "mediana": 23300,
        "media_recortada_10": 23300,
        "p25": 23300,
        "p75": 23300,
        "min": 23300,
        "max": 23300,
        "calidad": "insuficiente"
      },
      {
        "clave": "citroen",
        "label": "Citroen",
        "anuncios": 2,
        "n": 2,
        "mediana": 11500,
        "media_recortada_10": 11500,
        "p25": 10750,
        "p75": 12250,
        "min": 10000,
        "max": 13000,
        "calidad": "insuficiente"
      },
      {
        "clave": "jmc",
        "label": "JMC",
        "anuncios": 2,
        "n": 2,
        "mediana": 32000,
        "media_recortada_10": 32000,
        "p25": 30500,
        "p75": 33500,
        "min": 29000,
        "max": 35000,
        "calidad": "insuficiente"
      },
      {
        "clave": "mazda",
        "label": "Mazda",
        "anuncios": 2,
        "n": 1,
        "mediana": 37000,
        "media_recortada_10": 37000,
        "p25": 37000,
        "p75": 37000,
        "min": 37000,
        "max": 37000,
        "calidad": "insuficiente"
      },
      {
        "clave": "oldsmobile",
        "label": "Oldsmobile",
        "anuncios": 2,
        "n": 2,
        "mediana": 7000,
        "media_recortada_10": 7000,
        "p25": 7000,
        "p75": 7000,
        "min": 7000,
        "max": 7000,
        "calidad": "insuficiente"
      },
      {
        "clave": "pontiac",
        "label": "Pontiac",
        "anuncios": 2,
        "n": 2,
        "mediana": 3100,
        "media_recortada_10": 3100,
        "p25": 2650,
        "p75": 3550,
        "min": 2200,
        "max": 4000,
        "calidad": "insuficiente"
      },
      {
        "clave": "suzuki",
        "label": "Suzuki",
        "anuncios": 2,
        "n": 1,
        "mediana": 5000,
        "media_recortada_10": 5000,
        "p25": 5000,
        "p75": 5000,
        "min": 5000,
        "max": 5000,
        "calidad": "insuficiente"
      },
      {
        "clave": "acura",
        "label": "Acura",
        "anuncios": 1,
        "n": 1,
        "mediana": 17000,
        "media_recortada_10": 17000,
        "p25": 17000,
        "p75": 17000,
        "min": 17000,
        "max": 17000,
        "calidad": "insuficiente"
      },
      {
        "clave": "changan",
        "label": "Changan",
        "anuncios": 1,
        "n": 1,
        "mediana": 33000,
        "media_recortada_10": 33000,
        "p25": 33000,
        "p75": 33000,
        "min": 33000,
        "max": 33000,
        "calidad": "insuficiente"
      },
      {
        "clave": "gaz",
        "label": "Gaz",
        "anuncios": 1,
        "n": 1,
        "mediana": 4200,
        "media_recortada_10": 4200,
        "p25": 4200,
        "p75": 4200,
        "min": 4200,
        "max": 4200,
        "calidad": "insuficiente"
      },
      {
        "clave": "hino",
        "label": "Hino",
        "anuncios": 1,
        "n": 1,
        "mediana": 65000,
        "media_recortada_10": 65000,
        "p25": 65000,
        "p75": 65000,
        "min": 65000,
        "max": 65000,
        "calidad": "insuficiente"
      },
      {
        "clave": "lamborghini",
        "label": "Lamborghini",
        "anuncios": 1,
        "n": 0,
        "mediana": null,
        "media_recortada_10": null,
        "p25": null,
        "p75": null,
        "min": null,
        "max": null,
        "calidad": "insuficiente"
      },
      {
        "clave": "lexus",
        "label": "Lexus",
        "anuncios": 1,
        "n": 1,
        "mediana": 36000,
        "media_recortada_10": 36000,
        "p25": 36000,
        "p75": 36000,
        "min": 36000,
        "max": 36000,
        "calidad": "insuficiente"
      }
    ],
    "anios": {
      "declarado": 1821,
      "declarado_precio_valido": 1519,
      "sin_declarar": 1745,
      "clasicos": 69,
      "modernos": 1752,
      "con_anio_mediana": 26000,
      "sin_anio_n": 1184,
      "sin_anio_mediana": 11000,
      "sin_anio_p25": 6000,
      "sin_anio_p75": 28000,
      "sin_anio_share": 43.803181650018495,
      "por_decada": [
        {
          "decada": 1950,
          "n": 26,
          "mediana": 5250,
          "p25": 3625,
          "p75": 9250,
          "share": 1.7116524028966424
        },
        {
          "decada": 1960,
          "n": 5,
          "mediana": 4000,
          "p25": 4000,
          "p75": 4000,
          "share": 0.32916392363396973
        },
        {
          "decada": 1970,
          "n": 8,
          "mediana": 5000,
          "p25": 4975,
          "p75": 5050,
          "share": 0.5266622778143515
        },
        {
          "decada": 1980,
          "n": 3,
          "mediana": 2500,
          "p25": 2000,
          "p75": 3650,
          "share": 0.19749835418038184
        },
        {
          "decada": 1990,
          "n": 16,
          "mediana": 8000,
          "p25": 7500,
          "p75": 9375,
          "share": 1.053324555628703
        },
        {
          "decada": 2000,
          "n": 88,
          "mediana": 12000,
          "p25": 10000,
          "p75": 13000,
          "share": 5.793285055957867
        },
        {
          "decada": 2010,
          "n": 441,
          "mediana": 20000,
          "p25": 17000,
          "p75": 23000,
          "share": 29.03225806451613
        },
        {
          "decada": 2020,
          "n": 932,
          "mediana": 33000,
          "p25": 25000,
          "p75": 39000,
          "share": 61.356155365371954
        }
      ],
      "por_anio": [
        {
          "anio": 1950,
          "n": 4
        },
        {
          "anio": 1951,
          "n": 2
        },
        {
          "anio": 1952,
          "n": 5
        },
        {
          "anio": 1954,
          "n": 3
        },
        {
          "anio": 1955,
          "n": 1
        },
        {
          "anio": 1957,
          "n": 4
        },
        {
          "anio": 1958,
          "n": 7
        },
        {
          "anio": 1959,
          "n": 4
        },
        {
          "anio": 1960,
          "n": 1
        },
        {
          "anio": 1962,
          "n": 3
        },
        {
          "anio": 1968,
          "n": 1
        },
        {
          "anio": 1971,
          "n": 2
        },
        {
          "anio": 1972,
          "n": 4
        },
        {
          "anio": 1975,
          "n": 1
        },
        {
          "anio": 1976,
          "n": 1
        },
        {
          "anio": 1985,
          "n": 1
        },
        {
          "anio": 1986,
          "n": 1
        },
        {
          "anio": 1987,
          "n": 1
        },
        {
          "anio": 1990,
          "n": 2
        },
        {
          "anio": 1991,
          "n": 3
        },
        {
          "anio": 1992,
          "n": 4
        },
        {
          "anio": 1993,
          "n": 1
        },
        {
          "anio": 1994,
          "n": 3
        },
        {
          "anio": 1995,
          "n": 2
        },
        {
          "anio": 1997,
          "n": 2
        },
        {
          "anio": 1998,
          "n": 1
        },
        {
          "anio": 1999,
          "n": 5
        },
        {
          "anio": 2000,
          "n": 7
        },
        {
          "anio": 2001,
          "n": 1
        },
        {
          "anio": 2003,
          "n": 3
        },
        {
          "anio": 2004,
          "n": 5
        },
        {
          "anio": 2005,
          "n": 17
        },
        {
          "anio": 2006,
          "n": 18
        },
        {
          "anio": 2007,
          "n": 5
        },
        {
          "anio": 2008,
          "n": 15
        },
        {
          "anio": 2009,
          "n": 34
        },
        {
          "anio": 2010,
          "n": 11
        },
        {
          "anio": 2011,
          "n": 5
        },
        {
          "anio": 2012,
          "n": 7
        },
        {
          "anio": 2013,
          "n": 5
        },
        {
          "anio": 2014,
          "n": 7
        },
        {
          "anio": 2015,
          "n": 20
        },
        {
          "anio": 2016,
          "n": 45
        },
        {
          "anio": 2017,
          "n": 132
        },
        {
          "anio": 2018,
          "n": 89
        },
        {
          "anio": 2019,
          "n": 205
        },
        {
          "anio": 2020,
          "n": 112
        },
        {
          "anio": 2021,
          "n": 140
        },
        {
          "anio": 2022,
          "n": 156
        },
        {
          "anio": 2023,
          "n": 138
        },
        {
          "anio": 2024,
          "n": 308
        },
        {
          "anio": 2025,
          "n": 193
        },
        {
          "anio": 2026,
          "n": 74
        }
      ]
    },
    "precios_validos": [
      1000,
      1000,
      1000,
      1000,
      1000,
      1000,
      1100,
      1111,
      1111,
      1111,
      1400,
      1400,
      1500,
      1500,
      1500,
      1500,
      1500,
      1500,
      1500,
      1500,
      1700,
      1700,
      1800,
      1820,
      2000,
      2000,
      2000,
      2000,
      2000,
      2000,
      2000,
      2000,
      2100,
      2200,
      2200,
      2300,
      2400,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2500,
      2620,
      2800,
      2800,
      2800,
      2800,
      2800,
      2800,
      2800,
      2800,
      2950,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3000,
      3050,
      3055,
      3200,
      3200,
      3200,
      3300,
      3300,
      3300,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3500,
      3550,
      3600,
      3608,
      3700,
      3800,
      3800,
      3800,
      3800,
      3800,
      3800,
      3800,
      3800,
      3800,
      3950,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4000,
      4050,
      4050,
      4055,
      4080,
      4080,
      4100,
      4120,
      4200,
      4200,
      4200,
      4200,
      4200,
      4200,
      4200,
      4200,
      4200,
      4250,
      4300,
      4380,
      4400,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4500,
      4600,
      4700,
      4700,
      4800,
      4800,
      4800,
      4800,
      4900,
      4900,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5000,
      5200,
      5200,
      5200,
      5200,
      5250,
      5300,
      5350,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5500,
      5600,
      5750,
      5800,
      5800,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6000,
      6300,
      6400,
      6400,
      6450,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6500,
      6509,
      6700,
      6800,
      6800,
      6800,
      6800,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7000,
      7200,
      7200,
      7200,
      7200,
      7200,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7500,
      7600,
      7600,
      7800,
      7900,
      7900,
      7925,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8000,
      8200,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8500,
      8900,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9000,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9500,
      9550,
      9700,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10000,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      10500,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11000,
      11111,
      11111,
      11111,
      11111,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11500,
      11600,
      11600,
      11990,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12000,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      12500,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13000,
      13500,
      13500,
      13500,
      13500,
      13500,
      13500,
      13500,
      13500,
      13500,
      13579,
      13579,
      13579,
      13579,
      13900,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14000,
      14500,
      14500,
      14500,
      14500,
      14500,
      14500,
      14500,
      14500,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15000,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      15500,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16000,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16500,
      16700,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17000,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17500,
      17600,
      17999,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18000,
      18300,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18500,
      18800,
      18800,
      18800,
      18900,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19000,
      19300,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19500,
      19800,
      19900,
      19900,
      19900,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20000,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20500,
      20900,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21000,
      21200,
      21271,
      21271,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21500,
      21650,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22000,
      22400,
      22500,
      22500,
      22500,
      22500,
      22500,
      22999,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23000,
      23300,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23500,
      23999,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24000,
      24500,
      24500,
      24500,
      24500,
      24500,
      24500,
      24711,
      24788,
      24788,
      24997,
      24997,
      24997,
      24997,
      24997,
      24997,
      24997,
      24997,
      24998,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25000,
      25500,
      25500,
      25500,
      25500,
      25500,
      25500,
      25500,
      25500,
      25500,
      25995,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26000,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      26500,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27000,
      27260,
      27500,
      27500,
      27500,
      27500,
      27572,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28000,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28500,
      28600,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29000,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29500,
      29791,
      29791,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30000,
      30100,
      30100,
      30120,
      30500,
      30500,
      30500,
      30500,
      30500,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31000,
      31500,
      31500,
      31600,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32000,
      32500,
      32500,
      32500,
      32500,
      32500,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33000,
      33200,
      33300,
      33300,
      33400,
      33400,
      33400,
      33400,
      33400,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33500,
      33625,
      33850,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34000,
      34500,
      34500,
      34500,
      34500,
      34500,
      34500,
      34500,
      34800,
      34800,
      34900,
      34900,
      34993,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35000,
      35250,
      35500,
      35500,
      35500,
      35500,
      35500,
      35500,
      35900,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36000,
      36200,
      36300,
      36500,
      36500,
      36500,
      36500,
      36500,
      36500,
      36500,
      36500,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37000,
      37400,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37500,
      37900,
      37900,
      37900,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38000,
      38200,
      38200,
      38255,
      38255,
      38255,
      38255,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      38500,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39000,
      39500,
      39500,
      39500,
      39500,
      39600,
      39600,
      39900,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40000,
      40100,
      40500,
      40500,
      40500,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41000,
      41100,
      41500,
      41500,
      41500,
      41700,
      41800,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42000,
      42500,
      42500,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43000,
      43300,
      43500,
      43500,
      43500,
      43500,
      43500,
      43800,
      43800,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44000,
      44500,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      45000,
      46000,
      46000,
      46000,
      46000,
      46000,
      46000,
      46000,
      46000,
      47000,
      47000,
      47000,
      47000,
      47000,
      47000,
      47000,
      47000,
      47000,
      47000,
      48000,
      48000,
      48000,
      48300,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      50000,
      51000,
      51000,
      51000,
      51000,
      52000,
      52000,
      52000,
      52000,
      52000,
      53000,
      53000,
      53000,
      53000,
      53000,
      53750,
      54000,
      54000,
      54000,
      54000,
      54000,
      54000,
      54000,
      54000,
      54000,
      54000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      55000,
      56000,
      56000,
      56000,
      56000,
      56000,
      57000,
      58000,
      58000,
      58000,
      59000,
      60000,
      60000,
      60000,
      60000,
      60000,
      60000,
      60000,
      61000,
      62000,
      62000,
      62000,
      65000,
      65000,
      65000,
      65000,
      65000,
      65000,
      65000,
      65000,
      65000,
      68000,
      70000,
      70000,
      70000,
      72000,
      72000,
      72000,
      72000,
      72000,
      75000,
      80000,
      80000,
      80000,
      82000,
      85000,
      89000,
      90000,
      90000,
      95000,
      95000,
      100000,
      100000,
      100000,
      110000,
      110000,
      110000,
      120000,
      120000,
      120000,
      130000,
      130000,
      130000,
      130000,
      250000,
      300000,
      320000
    ],
    "puntos_marca": [
      {
        "m": "lada",
        "p": 6800
      },
      {
        "m": "toyota",
        "p": 18500
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "peugeot",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "nissan",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 37000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "chevrolet",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "volkswagen",
        "p": 8000
      },
      {
        "m": "volkswagen",
        "p": 8000
      },
      {
        "m": "audi",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 30500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "geely",
        "p": 32000
      },
      {
        "m": "land rover",
        "p": 60000
      },
      {
        "m": "land rover",
        "p": 50000
      },
      {
        "m": "foton",
        "p": 40000
      },
      {
        "m": "ford",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 21200
      },
      {
        "m": "nissan",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 38255
      },
      {
        "m": "jac",
        "p": 58000
      },
      {
        "m": "kia",
        "p": 23500
      },
      {
        "m": "chevrolet",
        "p": 38500
      },
      {
        "m": "kia",
        "p": 36500
      },
      {
        "m": "bmw",
        "p": 46000
      },
      {
        "m": "audi",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "toyota",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 38255
      },
      {
        "m": "fiat",
        "p": 7000
      },
      {
        "m": "nissan",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 22500
      },
      {
        "m": "hyundai",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "foton",
        "p": 53000
      },
      {
        "m": "fiat",
        "p": 2500
      },
      {
        "m": "kia",
        "p": 18500
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "nissan",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "nissan",
        "p": 38000
      },
      {
        "m": "toyota",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 16000
      },
      {
        "m": "chery",
        "p": 20500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "geely",
        "p": 10500
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 18500
      },
      {
        "m": "dongfeng",
        "p": 82000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "ford",
        "p": 4500
      },
      {
        "m": "geely",
        "p": 35000
      },
      {
        "m": "geely",
        "p": 35000
      },
      {
        "m": "moskvich",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 13000
      },
      {
        "m": "toyota",
        "p": 18000
      },
      {
        "m": "ford",
        "p": 8500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "honda",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "renault",
        "p": 22999
      },
      {
        "m": "fiat",
        "p": 23000
      },
      {
        "m": "mercedes-benz",
        "p": 50000
      },
      {
        "m": "renault",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 48000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "bmw",
        "p": 120000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "mercedes-benz",
        "p": 24000
      },
      {
        "m": "toyota",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 17600
      },
      {
        "m": "lada",
        "p": 8500
      },
      {
        "m": "toyota",
        "p": 18000
      },
      {
        "m": "volkswagen",
        "p": 11000
      },
      {
        "m": "opel",
        "p": 4500
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 28000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "mini",
        "p": 13000
      },
      {
        "m": "mini",
        "p": 13000
      },
      {
        "m": "seat",
        "p": 11000
      },
      {
        "m": "mitsubishi",
        "p": 20000
      },
      {
        "m": "chevrolet",
        "p": 2800
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 9000
      },
      {
        "m": "daewoo",
        "p": 11000
      },
      {
        "m": "daewoo",
        "p": 11000
      },
      {
        "m": "daewoo",
        "p": 11000
      },
      {
        "m": "mercedes-benz",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 23500
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 25000
      },
      {
        "m": "ford",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "land rover",
        "p": 11000
      },
      {
        "m": "land rover",
        "p": 11000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "mitsubishi",
        "p": 27000
      },
      {
        "m": "ford",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 38000
      },
      {
        "m": "toyota",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "moskvich",
        "p": 6509
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "nissan",
        "p": 18500
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "mercedes-benz",
        "p": 60000
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "toyota",
        "p": 40500
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "chevrolet",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "chery",
        "p": 25000
      },
      {
        "m": "fiat",
        "p": 5500
      },
      {
        "m": "chevrolet",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "honda",
        "p": 32000
      },
      {
        "m": "mercedes-benz",
        "p": 13000
      },
      {
        "m": "skoda",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "mitsubishi",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "chevrolet",
        "p": 35000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "oldsmobile",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 38255
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "chery",
        "p": 20500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "jeep",
        "p": 9000
      },
      {
        "m": "chevrolet",
        "p": 9500
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "peugeot",
        "p": 19800
      },
      {
        "m": "lada",
        "p": 4200
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "peugeot",
        "p": 8000
      },
      {
        "m": "chevrolet",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 45000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "mercedes-benz",
        "p": 60000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "geely",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "dongfeng",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "mitsubishi",
        "p": 26000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 3000
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 21650
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 13579
      },
      {
        "m": "land rover",
        "p": 70000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "nissan",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "fiat",
        "p": 12000
      },
      {
        "m": "mitsubishi",
        "p": 26000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "toyota",
        "p": 3800
      },
      {
        "m": "bmw",
        "p": 250000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "foton",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 38255
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "porsche",
        "p": 13579
      },
      {
        "m": "peugeot",
        "p": 20000
      },
      {
        "m": "daewoo",
        "p": 11000
      },
      {
        "m": "daewoo",
        "p": 11000
      },
      {
        "m": "audi",
        "p": 60000
      },
      {
        "m": "toyota",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "porsche",
        "p": 13579
      },
      {
        "m": "audi",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 55000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "chevrolet",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 23500
      },
      {
        "m": "kia",
        "p": 37000
      },
      {
        "m": "opel",
        "p": 3800
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "buick",
        "p": 13500
      },
      {
        "m": "moskvich",
        "p": 4000
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "seat",
        "p": 8500
      },
      {
        "m": "nissan",
        "p": 21500
      },
      {
        "m": "kia",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "moskvich",
        "p": 2500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "kia",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 13500
      },
      {
        "m": "foton",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 39600
      },
      {
        "m": "hyundai",
        "p": 39600
      },
      {
        "m": "toyota",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "hyundai",
        "p": 46000
      },
      {
        "m": "honda",
        "p": 35000
      },
      {
        "m": "volkswagen",
        "p": 3200
      },
      {
        "m": "subaru",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "fiat",
        "p": 6500
      },
      {
        "m": "toyota",
        "p": 46000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "toyota",
        "p": 35000
      },
      {
        "m": "mitsubishi",
        "p": 26000
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 37500
      },
      {
        "m": "chevrolet",
        "p": 7600
      },
      {
        "m": "toyota",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "byd",
        "p": 46000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "lada",
        "p": 5500
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 11111
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "volkswagen",
        "p": 3000
      },
      {
        "m": "subaru",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "bmw",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "audi",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "moskvich",
        "p": 4600
      },
      {
        "m": "hyundai",
        "p": 35500
      },
      {
        "m": "geely",
        "p": 12000
      },
      {
        "m": "chevrolet",
        "p": 5500
      },
      {
        "m": "hyundai",
        "p": 34800
      },
      {
        "m": "chevrolet",
        "p": 13000
      },
      {
        "m": "lada",
        "p": 5500
      },
      {
        "m": "mitsubishi",
        "p": 20000
      },
      {
        "m": "dodge",
        "p": 1000
      },
      {
        "m": "chevrolet",
        "p": 3200
      },
      {
        "m": "mercedes-benz",
        "p": 9000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "toyota",
        "p": 33000
      },
      {
        "m": "daewoo",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "chevrolet",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 35250
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 31500
      },
      {
        "m": "hyundai",
        "p": 15000
      },
      {
        "m": "honda",
        "p": 26500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "hyundai",
        "p": 35500
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "honda",
        "p": 27000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "fiat",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 22500
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "peugeot",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "mercedes-benz",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "oldsmobile",
        "p": 7000
      },
      {
        "m": "seat",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "mitsubishi",
        "p": 12000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "ford",
        "p": 36500
      },
      {
        "m": "mercedes-benz",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "jeep",
        "p": 25500
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "mg",
        "p": 12500
      },
      {
        "m": "mg",
        "p": 12500
      },
      {
        "m": "plymouth",
        "p": 4700
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "fiat",
        "p": 1500
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "daewoo",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "mg",
        "p": 11990
      },
      {
        "m": "bmw",
        "p": 60000
      },
      {
        "m": "audi",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 36500
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 3300
      },
      {
        "m": "nissan",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "land rover",
        "p": 42000
      },
      {
        "m": "daewoo",
        "p": 7000
      },
      {
        "m": "mitsubishi",
        "p": 7500
      },
      {
        "m": "mitsubishi",
        "p": 8000
      },
      {
        "m": "toyota",
        "p": 13000
      },
      {
        "m": "nissan",
        "p": 24000
      },
      {
        "m": "lada",
        "p": 3500
      },
      {
        "m": "chevrolet",
        "p": 6500
      },
      {
        "m": "lada",
        "p": 4700
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "lada",
        "p": 3500
      },
      {
        "m": "toyota",
        "p": 27500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "renault",
        "p": 10500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 31000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "audi",
        "p": 16000
      },
      {
        "m": "bmw",
        "p": 16000
      },
      {
        "m": "lada",
        "p": 3300
      },
      {
        "m": "mg",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "bmw",
        "p": 55000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "chevrolet",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "mitsubishi",
        "p": 14000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 33300
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "kia",
        "p": 15000
      },
      {
        "m": "fiat",
        "p": 9700
      },
      {
        "m": "nissan",
        "p": 18000
      },
      {
        "m": "mercedes-benz",
        "p": 9000
      },
      {
        "m": "toyota",
        "p": 10000
      },
      {
        "m": "volkswagen",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 23000
      },
      {
        "m": "fiat",
        "p": 2000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "peugeot",
        "p": 5500
      },
      {
        "m": "kia",
        "p": 36500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "chevrolet",
        "p": 6500
      },
      {
        "m": "kia",
        "p": 20500
      },
      {
        "m": "seat",
        "p": 8000
      },
      {
        "m": "volkswagen",
        "p": 17500
      },
      {
        "m": "geely",
        "p": 10000
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 17500
      },
      {
        "m": "fiat",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 7500
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 11500
      },
      {
        "m": "hyundai",
        "p": 26500
      },
      {
        "m": "volkswagen",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "renault",
        "p": 9000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 31000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 20500
      },
      {
        "m": "moskvich",
        "p": 4500
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "lada",
        "p": 13900
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "honda",
        "p": 25000
      },
      {
        "m": "mercedes-benz",
        "p": 26500
      },
      {
        "m": "toyota",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 17500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "toyota",
        "p": 50000
      },
      {
        "m": "geely",
        "p": 11000
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "toyota",
        "p": 11500
      },
      {
        "m": "kia",
        "p": 26500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "mg",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "toyota",
        "p": 11500
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "toyota",
        "p": 21500
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "peugeot",
        "p": 11000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "peugeot",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 19900
      },
      {
        "m": "nissan",
        "p": 20500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "mitsubishi",
        "p": 7500
      },
      {
        "m": "ford",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "ford",
        "p": 5500
      },
      {
        "m": "audi",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "toyota",
        "p": 22000
      },
      {
        "m": "nissan",
        "p": 9500
      },
      {
        "m": "renault",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "peugeot",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "nissan",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "plymouth",
        "p": 7000
      },
      {
        "m": "toyota",
        "p": 26000
      },
      {
        "m": "mercedes-benz",
        "p": 10000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "bmw",
        "p": 130000
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "kia",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 50000
      },
      {
        "m": "bmw",
        "p": 120000
      },
      {
        "m": "bmw",
        "p": 130000
      },
      {
        "m": "hyundai",
        "p": 19900
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "toyota",
        "p": 13000
      },
      {
        "m": "kia",
        "p": 7500
      },
      {
        "m": "fiat",
        "p": 1400
      },
      {
        "m": "toyota",
        "p": 34993
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "chevrolet",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 33400
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "geely",
        "p": 12000
      },
      {
        "m": "volkswagen",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "toyota",
        "p": 24500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "volkswagen",
        "p": 5500
      },
      {
        "m": "hyundai",
        "p": 54000
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "volkswagen",
        "p": 8900
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "bmw",
        "p": 38500
      },
      {
        "m": "audi",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "toyota",
        "p": 13000
      },
      {
        "m": "honda",
        "p": 7900
      },
      {
        "m": "hyundai",
        "p": 9500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "volkswagen",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 23500
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "jac",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 33200
      },
      {
        "m": "hyundai",
        "p": 34900
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "geely",
        "p": 12500
      },
      {
        "m": "volkswagen",
        "p": 8000
      },
      {
        "m": "geely",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "mg",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "cadillac",
        "p": 100000
      },
      {
        "m": "toyota",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 35500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "chevrolet",
        "p": 3500
      },
      {
        "m": "lada",
        "p": 8500
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "toyota",
        "p": 50000
      },
      {
        "m": "nissan",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "fiat",
        "p": 7500
      },
      {
        "m": "dongfeng",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "volkswagen",
        "p": 7000
      },
      {
        "m": "kia",
        "p": 38500
      },
      {
        "m": "chevrolet",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 32500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "volvo",
        "p": 56000
      },
      {
        "m": "isuzu",
        "p": 50000
      },
      {
        "m": "land rover",
        "p": 53000
      },
      {
        "m": "infiniti",
        "p": 28000
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "moskvich",
        "p": 6000
      },
      {
        "m": "volkswagen",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 16500
      },
      {
        "m": "audi",
        "p": 17000
      },
      {
        "m": "audi",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "chevrolet",
        "p": 3000
      },
      {
        "m": "chevrolet",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "ford",
        "p": 7000
      },
      {
        "m": "moskvich",
        "p": 6000
      },
      {
        "m": "mg",
        "p": 26000
      },
      {
        "m": "opel",
        "p": 13000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "mg",
        "p": 27000
      },
      {
        "m": "audi",
        "p": 52000
      },
      {
        "m": "mg",
        "p": 23000
      },
      {
        "m": "nissan",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 34000
      },
      {
        "m": "dongfeng",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "mitsubishi",
        "p": 22000
      },
      {
        "m": "bmw",
        "p": 62000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "geely",
        "p": 11000
      },
      {
        "m": "toyota",
        "p": 50000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 28000
      },
      {
        "m": "peugeot",
        "p": 5500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "moskvich",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 7500
      },
      {
        "m": "daewoo",
        "p": 7500
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "peugeot",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "mercedes-benz",
        "p": 40000
      },
      {
        "m": "plymouth",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 11111
      },
      {
        "m": "peugeot",
        "p": 1000
      },
      {
        "m": "honda",
        "p": 27500
      },
      {
        "m": "opel",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "daewoo",
        "p": 7800
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "plymouth",
        "p": 4500
      },
      {
        "m": "land rover",
        "p": 50000
      },
      {
        "m": "ford",
        "p": 6000
      },
      {
        "m": "fiat",
        "p": 5500
      },
      {
        "m": "gac",
        "p": 27000
      },
      {
        "m": "chevrolet",
        "p": 5000
      },
      {
        "m": "nissan",
        "p": 33000
      },
      {
        "m": "ford",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 35900
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "peugeot",
        "p": 12500
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "volkswagen",
        "p": 2800
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 4200
      },
      {
        "m": "foton",
        "p": 29500
      },
      {
        "m": "volkswagen",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 12500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "ford",
        "p": 5000
      },
      {
        "m": "byd",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "honda",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "kia",
        "p": 35000
      },
      {
        "m": "dodge",
        "p": 39500
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "honda",
        "p": 27000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 33400
      },
      {
        "m": "lada",
        "p": 8500
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "peugeot",
        "p": 15000
      },
      {
        "m": "mercedes-benz",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "ford",
        "p": 3500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "mg",
        "p": 24000
      },
      {
        "m": "daewoo",
        "p": 8500
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "daewoo",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 13000
      },
      {
        "m": "honda",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "nissan",
        "p": 16000
      },
      {
        "m": "fiat",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 2800
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "audi",
        "p": 65000
      },
      {
        "m": "dongfeng",
        "p": 72000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "skoda",
        "p": 4500
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 7600
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "geely",
        "p": 12000
      },
      {
        "m": "nissan",
        "p": 16000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 34800
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "chevrolet",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 62000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "chevrolet",
        "p": 16000
      },
      {
        "m": "nissan",
        "p": 20500
      },
      {
        "m": "mg",
        "p": 24000
      },
      {
        "m": "mg",
        "p": 24000
      },
      {
        "m": "opel",
        "p": 14000
      },
      {
        "m": "chevrolet",
        "p": 6500
      },
      {
        "m": "gac",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "kia",
        "p": 18500
      },
      {
        "m": "aion",
        "p": 23300
      },
      {
        "m": "lada",
        "p": 7200
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "bmw",
        "p": 68000
      },
      {
        "m": "skoda",
        "p": 4500
      },
      {
        "m": "buick",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "lada",
        "p": 9000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "ford",
        "p": 4000
      },
      {
        "m": "volkswagen",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "lada",
        "p": 3000
      },
      {
        "m": "mg",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "cadillac",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 47000
      },
      {
        "m": "mg",
        "p": 30000
      },
      {
        "m": "land rover",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 20500
      },
      {
        "m": "nissan",
        "p": 7500
      },
      {
        "m": "mercedes-benz",
        "p": 300000
      },
      {
        "m": "volkswagen",
        "p": 6000
      },
      {
        "m": "toyota",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "byd",
        "p": 30000
      },
      {
        "m": "peugeot",
        "p": 13500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 23500
      },
      {
        "m": "chevrolet",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "volvo",
        "p": 58000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "mg",
        "p": 17000
      },
      {
        "m": "nissan",
        "p": 40000
      },
      {
        "m": "isuzu",
        "p": 46000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "fiat",
        "p": 5500
      },
      {
        "m": "nissan",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "nissan",
        "p": 20000
      },
      {
        "m": "jeep",
        "p": 15000
      },
      {
        "m": "dongfeng",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "mercedes-benz",
        "p": 30000
      },
      {
        "m": "ford",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 33625
      },
      {
        "m": "peugeot",
        "p": 13500
      },
      {
        "m": "hyundai",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "foton",
        "p": 50000
      },
      {
        "m": "foton",
        "p": 50000
      },
      {
        "m": "byd",
        "p": 27000
      },
      {
        "m": "toyota",
        "p": 26000
      },
      {
        "m": "nissan",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 15500
      },
      {
        "m": "chevrolet",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "fiat",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 16500
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "toyota",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "peugeot",
        "p": 13500
      },
      {
        "m": "chevrolet",
        "p": 4000
      },
      {
        "m": "jac",
        "p": 22000
      },
      {
        "m": "peugeot",
        "p": 14000
      },
      {
        "m": "volkswagen",
        "p": 33000
      },
      {
        "m": "chevrolet",
        "p": 15500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "daewoo",
        "p": 7000
      },
      {
        "m": "lada",
        "p": 10000
      },
      {
        "m": "kia",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "skoda",
        "p": 4500
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "kia",
        "p": 44000
      },
      {
        "m": "hino",
        "p": 65000
      },
      {
        "m": "hyundai",
        "p": 36500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 10500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "kia",
        "p": 11500
      },
      {
        "m": "geely",
        "p": 32000
      },
      {
        "m": "lada",
        "p": 5500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 43500
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "nissan",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "volkswagen",
        "p": 2500
      },
      {
        "m": "nissan",
        "p": 8500
      },
      {
        "m": "dodge",
        "p": 5000
      },
      {
        "m": "dodge",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "land rover",
        "p": 5000
      },
      {
        "m": "kia",
        "p": 44000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "toyota",
        "p": 8000
      },
      {
        "m": "plymouth",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "dongfeng",
        "p": 26000
      },
      {
        "m": "audi",
        "p": 100000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "peugeot",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "mini",
        "p": 3500
      },
      {
        "m": "renault",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 44000
      },
      {
        "m": "ford",
        "p": 38000
      },
      {
        "m": "volkswagen",
        "p": 3200
      },
      {
        "m": "kia",
        "p": 10500
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 54000
      },
      {
        "m": "lada",
        "p": 6400
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "lada",
        "p": 9000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "changan",
        "p": 33000
      },
      {
        "m": "volkswagen",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 34500
      },
      {
        "m": "maxus",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "fiat",
        "p": 10000
      },
      {
        "m": "lada",
        "p": 11111
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "chevrolet",
        "p": 12000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "geely",
        "p": 30000
      },
      {
        "m": "renault",
        "p": 10500
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "bmw",
        "p": 110000
      },
      {
        "m": "dodge",
        "p": 65000
      },
      {
        "m": "ford",
        "p": 65000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "kia",
        "p": 40000
      },
      {
        "m": "skoda",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "kia",
        "p": 48000
      },
      {
        "m": "hyundai",
        "p": 22500
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "chevrolet",
        "p": 8000
      },
      {
        "m": "audi",
        "p": 95000
      },
      {
        "m": "hyundai",
        "p": 54000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "chevrolet",
        "p": 9500
      },
      {
        "m": "lada",
        "p": 6700
      },
      {
        "m": "volvo",
        "p": 56000
      },
      {
        "m": "lada",
        "p": 1500
      },
      {
        "m": "volkswagen",
        "p": 5000
      },
      {
        "m": "toyota",
        "p": 55000
      },
      {
        "m": "toyota",
        "p": 47000
      },
      {
        "m": "hyundai",
        "p": 10500
      },
      {
        "m": "toyota",
        "p": 42000
      },
      {
        "m": "nissan",
        "p": 36000
      },
      {
        "m": "hyundai",
        "p": 33300
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "honda",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 3608
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 12000
      },
      {
        "m": "kia",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "nissan",
        "p": 16000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "kia",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "seat",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 33400
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 15500
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "chevrolet",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 16000
      },
      {
        "m": "honda",
        "p": 37900
      },
      {
        "m": "hyundai",
        "p": 54000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "honda",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 54000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 37500
      },
      {
        "m": "volkswagen",
        "p": 10000
      },
      {
        "m": "bmw",
        "p": 25000
      },
      {
        "m": "honda",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "daewoo",
        "p": 12000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "nissan",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 33400
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "kia",
        "p": 17500
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "honda",
        "p": 33000
      },
      {
        "m": "mercedes-benz",
        "p": 61000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "toyota",
        "p": 45000
      },
      {
        "m": "maxus",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 28000
      },
      {
        "m": "honda",
        "p": 35000
      },
      {
        "m": "foton",
        "p": 54000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "chevrolet",
        "p": 30000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "gmc",
        "p": 55000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "kia",
        "p": 47000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 24500
      },
      {
        "m": "kia",
        "p": 47000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "honda",
        "p": 36500
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "gac",
        "p": 27000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "honda",
        "p": 22000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "volkswagen",
        "p": 4900
      },
      {
        "m": "honda",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "dongfeng",
        "p": 27572
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 21500
      },
      {
        "m": "nissan",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "lada",
        "p": 2950
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "opel",
        "p": 31000
      },
      {
        "m": "honda",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "fiat",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 37900
      },
      {
        "m": "toyota",
        "p": 10000
      },
      {
        "m": "chevrolet",
        "p": 30000
      },
      {
        "m": "mitsubishi",
        "p": 38000
      },
      {
        "m": "honda",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 38200
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "land rover",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "honda",
        "p": 23000
      },
      {
        "m": "subaru",
        "p": 6000
      },
      {
        "m": "volkswagen",
        "p": 2800
      },
      {
        "m": "volkswagen",
        "p": 8500
      },
      {
        "m": "nissan",
        "p": 39000
      },
      {
        "m": "nissan",
        "p": 31000
      },
      {
        "m": "honda",
        "p": 23000
      },
      {
        "m": "maxus",
        "p": 22000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "dongfeng",
        "p": 40000
      },
      {
        "m": "chevrolet",
        "p": 18000
      },
      {
        "m": "kia",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "dongfeng",
        "p": 36000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "ford",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 9000
      },
      {
        "m": "nissan",
        "p": 23999
      },
      {
        "m": "peugeot",
        "p": 2800
      },
      {
        "m": "lada",
        "p": 7200
      },
      {
        "m": "kia",
        "p": 17500
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "mercedes-benz",
        "p": 23500
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "peugeot",
        "p": 11000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "honda",
        "p": 26000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "peugeot",
        "p": 13000
      },
      {
        "m": "buick",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 18900
      },
      {
        "m": "bmw",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 19900
      },
      {
        "m": "jeep",
        "p": 13500
      },
      {
        "m": "infiniti",
        "p": 13500
      },
      {
        "m": "hyundai",
        "p": 13500
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "honda",
        "p": 25000
      },
      {
        "m": "subaru",
        "p": 8500
      },
      {
        "m": "toyota",
        "p": 32000
      },
      {
        "m": "volkswagen",
        "p": 3500
      },
      {
        "m": "kia",
        "p": 14000
      },
      {
        "m": "peugeot",
        "p": 9000
      },
      {
        "m": "nissan",
        "p": 18500
      },
      {
        "m": "opel",
        "p": 10000
      },
      {
        "m": "volkswagen",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "bmw",
        "p": 42000
      },
      {
        "m": "fiat",
        "p": 2300
      },
      {
        "m": "nissan",
        "p": 80000
      },
      {
        "m": "volkswagen",
        "p": 11000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 21000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "ford",
        "p": 24000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 14500
      },
      {
        "m": "toyota",
        "p": 18500
      },
      {
        "m": "hyundai",
        "p": 15500
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "peugeot",
        "p": 16500
      },
      {
        "m": "lada",
        "p": 4800
      },
      {
        "m": "fiat",
        "p": 3500
      },
      {
        "m": "jeep",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "toyota",
        "p": 23000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 5500
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "opel",
        "p": 4500
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "fiat",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "hyundai",
        "p": 24500
      },
      {
        "m": "hyundai",
        "p": 31000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "volkswagen",
        "p": 8000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 21500
      },
      {
        "m": "hyundai",
        "p": 33500
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "dongfeng",
        "p": 31000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "chevrolet",
        "p": 3500
      },
      {
        "m": "lada",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "nissan",
        "p": 45000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "mercedes-benz",
        "p": 26000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "volkswagen",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "renault",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "volkswagen",
        "p": 9550
      },
      {
        "m": "ford",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "nissan",
        "p": 45000
      },
      {
        "m": "renault",
        "p": 12500
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "peugeot",
        "p": 15000
      },
      {
        "m": "fiat",
        "p": 4000
      },
      {
        "m": "renault",
        "p": 1500
      },
      {
        "m": "moskvich",
        "p": 5000
      },
      {
        "m": "volkswagen",
        "p": 29000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 38200
      },
      {
        "m": "lexus",
        "p": 36000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "fiat",
        "p": 5500
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "toyota",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "skoda",
        "p": 10000
      },
      {
        "m": "lada",
        "p": 8500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "infiniti",
        "p": 28500
      },
      {
        "m": "nissan",
        "p": 30100
      },
      {
        "m": "nissan",
        "p": 30100
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "pontiac",
        "p": 2200
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "toyota",
        "p": 11000
      },
      {
        "m": "infiniti",
        "p": 30000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 24500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 30120
      },
      {
        "m": "skoda",
        "p": 4000
      },
      {
        "m": "nissan",
        "p": 21000
      },
      {
        "m": "nissan",
        "p": 23000
      },
      {
        "m": "porsche",
        "p": 60000
      },
      {
        "m": "ford",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "nissan",
        "p": 26000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "toyota",
        "p": 15000
      },
      {
        "m": "toyota",
        "p": 21000
      },
      {
        "m": "infiniti",
        "p": 29000
      },
      {
        "m": "honda",
        "p": 20000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "chevrolet",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "kia",
        "p": 25500
      },
      {
        "m": "chevrolet",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "citroen",
        "p": 13000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "lada",
        "p": 7000
      },
      {
        "m": "renault",
        "p": 1700
      },
      {
        "m": "hyundai",
        "p": 26500
      },
      {
        "m": "chevrolet",
        "p": 6000
      },
      {
        "m": "moskvich",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 26500
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "ford",
        "p": 90000
      },
      {
        "m": "chevrolet",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 26500
      },
      {
        "m": "mitsubishi",
        "p": 38000
      },
      {
        "m": "kia",
        "p": 15500
      },
      {
        "m": "mitsubishi",
        "p": 38000
      },
      {
        "m": "volkswagen",
        "p": 35000
      },
      {
        "m": "lada",
        "p": 3500
      },
      {
        "m": "hyundai",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "chery",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "subaru",
        "p": 8500
      },
      {
        "m": "renault",
        "p": 10500
      },
      {
        "m": "peugeot",
        "p": 2500
      },
      {
        "m": "kia",
        "p": 7500
      },
      {
        "m": "nissan",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 39500
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "lada",
        "p": 6800
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 39500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "fiat",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "kia",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "honda",
        "p": 53000
      },
      {
        "m": "volkswagen",
        "p": 2500
      },
      {
        "m": "volkswagen",
        "p": 39000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "chevrolet",
        "p": 34500
      },
      {
        "m": "volkswagen",
        "p": 36000
      },
      {
        "m": "kia",
        "p": 16700
      },
      {
        "m": "audi",
        "p": 52000
      },
      {
        "m": "fiat",
        "p": 4000
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "toyota",
        "p": 25000
      },
      {
        "m": "ford",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "chery",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "kia",
        "p": 14000
      },
      {
        "m": "dongfeng",
        "p": 29791
      },
      {
        "m": "volkswagen",
        "p": 9000
      },
      {
        "m": "mercedes-benz",
        "p": 58000
      },
      {
        "m": "ford",
        "p": 7000
      },
      {
        "m": "volkswagen",
        "p": 3500
      },
      {
        "m": "kia",
        "p": 14000
      },
      {
        "m": "skoda",
        "p": 8000
      },
      {
        "m": "toyota",
        "p": 39000
      },
      {
        "m": "haval",
        "p": 18000
      },
      {
        "m": "fiat",
        "p": 5500
      },
      {
        "m": "chevrolet",
        "p": 33850
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "lada",
        "p": 3000
      },
      {
        "m": "volkswagen",
        "p": 10000
      },
      {
        "m": "toyota",
        "p": 24998
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "fiat",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 12000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "chevrolet",
        "p": 33500
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 28500
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "haval",
        "p": 17500
      },
      {
        "m": "chery",
        "p": 18500
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "kia",
        "p": 17500
      },
      {
        "m": "hyundai",
        "p": 43800
      },
      {
        "m": "hyundai",
        "p": 43800
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 43300
      },
      {
        "m": "haval",
        "p": 17500
      },
      {
        "m": "cadillac",
        "p": 130000
      },
      {
        "m": "audi",
        "p": 13000
      },
      {
        "m": "hyundai",
        "p": 32500
      },
      {
        "m": "land rover",
        "p": 52000
      },
      {
        "m": "hyundai",
        "p": 90000
      },
      {
        "m": "toyota",
        "p": 24000
      },
      {
        "m": "moskvich",
        "p": 5500
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "honda",
        "p": 16000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "dodge",
        "p": 2500
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "geely",
        "p": 11500
      },
      {
        "m": "plymouth",
        "p": 6000
      },
      {
        "m": "mitsubishi",
        "p": 12000
      },
      {
        "m": "geely",
        "p": 11500
      },
      {
        "m": "pontiac",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "hyundai",
        "p": 25500
      },
      {
        "m": "hyundai",
        "p": 30500
      },
      {
        "m": "isuzu",
        "p": 59000
      },
      {
        "m": "toyota",
        "p": 24000
      },
      {
        "m": "renault",
        "p": 11500
      },
      {
        "m": "geely",
        "p": 10500
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 9500
      },
      {
        "m": "opel",
        "p": 5500
      },
      {
        "m": "mg",
        "p": 14000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "kia",
        "p": 25500
      },
      {
        "m": "toyota",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 9500
      },
      {
        "m": "lada",
        "p": 9000
      },
      {
        "m": "toyota",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "geely",
        "p": 11500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 39000
      },
      {
        "m": "volkswagen",
        "p": 39000
      },
      {
        "m": "toyota",
        "p": 39000
      },
      {
        "m": "nissan",
        "p": 31000
      },
      {
        "m": "fiat",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "citroen",
        "p": 10000
      },
      {
        "m": "geely",
        "p": 11500
      },
      {
        "m": "chevrolet",
        "p": 35000
      },
      {
        "m": "chevrolet",
        "p": 36000
      },
      {
        "m": "plymouth",
        "p": 4500
      },
      {
        "m": "jeep",
        "p": 11000
      },
      {
        "m": "chevrolet",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 40100
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "byd",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "volkswagen",
        "p": 10000
      },
      {
        "m": "lada",
        "p": 5500
      },
      {
        "m": "kia",
        "p": 16500
      },
      {
        "m": "honda",
        "p": 32500
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "seat",
        "p": 13000
      },
      {
        "m": "ford",
        "p": 8500
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "volkswagen",
        "p": 34000
      },
      {
        "m": "volkswagen",
        "p": 34000
      },
      {
        "m": "audi",
        "p": 34000
      },
      {
        "m": "volkswagen",
        "p": 31000
      },
      {
        "m": "hyundai",
        "p": 50000
      },
      {
        "m": "bmw",
        "p": 38000
      },
      {
        "m": "audi",
        "p": 16000
      },
      {
        "m": "cadillac",
        "p": 70000
      },
      {
        "m": "maxus",
        "p": 30000
      },
      {
        "m": "cadillac",
        "p": 70000
      },
      {
        "m": "toyota",
        "p": 55000
      },
      {
        "m": "toyota",
        "p": 65000
      },
      {
        "m": "toyota",
        "p": 50000
      },
      {
        "m": "hyundai",
        "p": 4100
      },
      {
        "m": "chevrolet",
        "p": 7500
      },
      {
        "m": "volkswagen",
        "p": 33000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "nissan",
        "p": 39000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "buick",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 40500
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "gaz",
        "p": 4200
      },
      {
        "m": "skoda",
        "p": 4000
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "dongfeng",
        "p": 24788
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "chevrolet",
        "p": 8500
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "volkswagen",
        "p": 38000
      },
      {
        "m": "dongfeng",
        "p": 25000
      },
      {
        "m": "suzuki",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 10500
      },
      {
        "m": "kia",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "toyota",
        "p": 23500
      },
      {
        "m": "volkswagen",
        "p": 34500
      },
      {
        "m": "hyundai",
        "p": 7000
      },
      {
        "m": "fiat",
        "p": 9000
      },
      {
        "m": "toyota",
        "p": 23500
      },
      {
        "m": "fiat",
        "p": 4500
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "chevrolet",
        "p": 2000
      },
      {
        "m": "honda",
        "p": 43000
      },
      {
        "m": "honda",
        "p": 35000
      },
      {
        "m": "honda",
        "p": 35000
      },
      {
        "m": "bmw",
        "p": 57000
      },
      {
        "m": "chevrolet",
        "p": 29500
      },
      {
        "m": "honda",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 41500
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "fiat",
        "p": 9000
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "volkswagen",
        "p": 35000
      },
      {
        "m": "moskvich",
        "p": 8000
      },
      {
        "m": "moskvich",
        "p": 4800
      },
      {
        "m": "hyundai",
        "p": 22500
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "jeep",
        "p": 7500
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 41500
      },
      {
        "m": "hyundai",
        "p": 21500
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "bmw",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 22500
      },
      {
        "m": "kia",
        "p": 11500
      },
      {
        "m": "bmw",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 31000
      },
      {
        "m": "hyundai",
        "p": 51000
      },
      {
        "m": "renault",
        "p": 14000
      },
      {
        "m": "toyota",
        "p": 45000
      },
      {
        "m": "peugeot",
        "p": 12000
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "fiat",
        "p": 7500
      },
      {
        "m": "renault",
        "p": 1500
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "volkswagen",
        "p": 12500
      },
      {
        "m": "volkswagen",
        "p": 33000
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "hyundai",
        "p": 21500
      },
      {
        "m": "kia",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "toyota",
        "p": 19500
      },
      {
        "m": "chevrolet",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "honda",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "lada",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "geely",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "renault",
        "p": 11000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "bmw",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 13000
      },
      {
        "m": "hyundai",
        "p": 41100
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 19500
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "kia",
        "p": 18500
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "baic",
        "p": 33500
      },
      {
        "m": "mercedes-benz",
        "p": 22000
      },
      {
        "m": "toyota",
        "p": 23500
      },
      {
        "m": "kia",
        "p": 18800
      },
      {
        "m": "lada",
        "p": 10000
      },
      {
        "m": "maxus",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 10500
      },
      {
        "m": "toyota",
        "p": 21000
      },
      {
        "m": "honda",
        "p": 40000
      },
      {
        "m": "mercedes-benz",
        "p": 22000
      },
      {
        "m": "renault",
        "p": 10500
      },
      {
        "m": "toyota",
        "p": 24000
      },
      {
        "m": "dongfeng",
        "p": 36000
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "chevrolet",
        "p": 18500
      },
      {
        "m": "baic",
        "p": 33000
      },
      {
        "m": "volkswagen",
        "p": 37000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "chevrolet",
        "p": 4000
      },
      {
        "m": "chevrolet",
        "p": 1500
      },
      {
        "m": "fiat",
        "p": 3000
      },
      {
        "m": "hyundai",
        "p": 9000
      },
      {
        "m": "chevrolet",
        "p": 6000
      },
      {
        "m": "chevrolet",
        "p": 36000
      },
      {
        "m": "chevrolet",
        "p": 37000
      },
      {
        "m": "honda",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 41700
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "mercedes-benz",
        "p": 25000
      },
      {
        "m": "toyota",
        "p": 22000
      },
      {
        "m": "daewoo",
        "p": 8500
      },
      {
        "m": "hyundai",
        "p": 35500
      },
      {
        "m": "kia",
        "p": 12500
      },
      {
        "m": "bmw",
        "p": 26000
      },
      {
        "m": "toyota",
        "p": 9500
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "toyota",
        "p": 24997
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "fiat",
        "p": 4000
      },
      {
        "m": "dongfeng",
        "p": 25000
      },
      {
        "m": "land rover",
        "p": 45000
      },
      {
        "m": "ford",
        "p": 6000
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "dongfeng",
        "p": 28600
      },
      {
        "m": "kia",
        "p": 18800
      },
      {
        "m": "hyundai",
        "p": 41800
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "jmc",
        "p": 29000
      },
      {
        "m": "volkswagen",
        "p": 37500
      },
      {
        "m": "hyundai",
        "p": 48000
      },
      {
        "m": "jeep",
        "p": 4900
      },
      {
        "m": "mitsubishi",
        "p": 15000
      },
      {
        "m": "land rover",
        "p": 20000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 42500
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 42500
      },
      {
        "m": "fiat",
        "p": 10500
      },
      {
        "m": "kia",
        "p": 12000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "volkswagen",
        "p": 5500
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 34500
      },
      {
        "m": "hyundai",
        "p": 38500
      },
      {
        "m": "dongfeng",
        "p": 33000
      },
      {
        "m": "audi",
        "p": 16000
      },
      {
        "m": "honda",
        "p": 43000
      },
      {
        "m": "lada",
        "p": 7500
      },
      {
        "m": "toyota",
        "p": 36000
      },
      {
        "m": "nissan",
        "p": 29000
      },
      {
        "m": "kia",
        "p": 24500
      },
      {
        "m": "toyota",
        "p": 36000
      },
      {
        "m": "nissan",
        "p": 29000
      },
      {
        "m": "geely",
        "p": 10000
      },
      {
        "m": "volkswagen",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 3600
      },
      {
        "m": "skoda",
        "p": 5000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "volkswagen",
        "p": 30500
      },
      {
        "m": "hyundai",
        "p": 39900
      },
      {
        "m": "ford",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "seat",
        "p": 11000
      },
      {
        "m": "honda",
        "p": 45000
      },
      {
        "m": "lada",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 20000
      },
      {
        "m": "acura",
        "p": 17000
      },
      {
        "m": "volkswagen",
        "p": 30500
      },
      {
        "m": "bmw",
        "p": 52000
      },
      {
        "m": "hyundai",
        "p": 53000
      },
      {
        "m": "toyota",
        "p": 29000
      },
      {
        "m": "dongfeng",
        "p": 35000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "chevrolet",
        "p": 10000
      },
      {
        "m": "kia",
        "p": 22000
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "geely",
        "p": 11600
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "jeep",
        "p": 7200
      },
      {
        "m": "geely",
        "p": 11600
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "volkswagen",
        "p": 6800
      },
      {
        "m": "kia",
        "p": 15000
      },
      {
        "m": "kia",
        "p": 15500
      },
      {
        "m": "toyota",
        "p": 23000
      },
      {
        "m": "audi",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "toyota",
        "p": 30000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "kia",
        "p": 12500
      },
      {
        "m": "kia",
        "p": 15000
      },
      {
        "m": "chevrolet",
        "p": 26500
      },
      {
        "m": "gmc",
        "p": 65000
      },
      {
        "m": "bmw",
        "p": 95000
      },
      {
        "m": "toyota",
        "p": 25000
      },
      {
        "m": "toyota",
        "p": 10000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "honda",
        "p": 28000
      },
      {
        "m": "bmw",
        "p": 22000
      },
      {
        "m": "lada",
        "p": 5500
      },
      {
        "m": "chery",
        "p": 17000
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 18000
      },
      {
        "m": "jeep",
        "p": 11000
      },
      {
        "m": "volkswagen",
        "p": 35000
      },
      {
        "m": "honda",
        "p": 45000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "fiat",
        "p": 8000
      },
      {
        "m": "lada",
        "p": 2500
      },
      {
        "m": "honda",
        "p": 29000
      },
      {
        "m": "moskvich",
        "p": 6500
      },
      {
        "m": "kia",
        "p": 26000
      },
      {
        "m": "infiniti",
        "p": 75000
      },
      {
        "m": "geely",
        "p": 12500
      },
      {
        "m": "moskvich",
        "p": 6500
      },
      {
        "m": "fiat",
        "p": 7000
      },
      {
        "m": "volkswagen",
        "p": 55000
      },
      {
        "m": "toyota",
        "p": 39000
      },
      {
        "m": "chery",
        "p": 17500
      },
      {
        "m": "toyota",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 44000
      },
      {
        "m": "kia",
        "p": 45000
      },
      {
        "m": "toyota",
        "p": 23000
      },
      {
        "m": "bmw",
        "p": 34000
      },
      {
        "m": "bmw",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 12500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "kia",
        "p": 28000
      },
      {
        "m": "kia",
        "p": 14500
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "nissan",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "volkswagen",
        "p": 4000
      },
      {
        "m": "kia",
        "p": 18500
      },
      {
        "m": "dongfeng",
        "p": 36000
      },
      {
        "m": "hyundai",
        "p": 18800
      },
      {
        "m": "hyundai",
        "p": 19300
      },
      {
        "m": "fiat",
        "p": 7200
      },
      {
        "m": "nissan",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 27000
      },
      {
        "m": "kia",
        "p": 12500
      },
      {
        "m": "renault",
        "p": 4300
      },
      {
        "m": "hyundai",
        "p": 27000
      },
      {
        "m": "nissan",
        "p": 26000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "lada",
        "p": 9000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "nissan",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 45000
      },
      {
        "m": "opel",
        "p": 4500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "lada",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "mg",
        "p": 15000
      },
      {
        "m": "lada",
        "p": 5750
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "dongfeng",
        "p": 25995
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "fiat",
        "p": 5000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "lada",
        "p": 6000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "nissan",
        "p": 44500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "maxus",
        "p": 34000
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "honda",
        "p": 46000
      },
      {
        "m": "volkswagen",
        "p": 46000
      },
      {
        "m": "audi",
        "p": 60000
      },
      {
        "m": "mitsubishi",
        "p": 11500
      },
      {
        "m": "bmw",
        "p": 15500
      },
      {
        "m": "hyundai",
        "p": 22400
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "mg",
        "p": 29000
      },
      {
        "m": "jmc",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 5000
      },
      {
        "m": "chevrolet",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "lada",
        "p": 8000
      },
      {
        "m": "hyundai",
        "p": 46000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "honda",
        "p": 47000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "kia",
        "p": 12000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 42000
      },
      {
        "m": "fiat",
        "p": 7000
      },
      {
        "m": "gmc",
        "p": 72000
      },
      {
        "m": "toyota",
        "p": 17500
      },
      {
        "m": "toyota",
        "p": 41000
      },
      {
        "m": "kia",
        "p": 19000
      },
      {
        "m": "toyota",
        "p": 37000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "kia",
        "p": 24500
      },
      {
        "m": "kia",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 9500
      },
      {
        "m": "volkswagen",
        "p": 13000
      },
      {
        "m": "kia",
        "p": 22000
      },
      {
        "m": "toyota",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 55000
      },
      {
        "m": "fiat",
        "p": 2000
      },
      {
        "m": "mitsubishi",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 20500
      },
      {
        "m": "kia",
        "p": 22000
      },
      {
        "m": "chevrolet",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "nissan",
        "p": 51000
      },
      {
        "m": "bmw",
        "p": 36000
      },
      {
        "m": "bmw",
        "p": 31000
      },
      {
        "m": "honda",
        "p": 47000
      },
      {
        "m": "nissan",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "hyundai",
        "p": 100000
      },
      {
        "m": "hyundai",
        "p": 47000
      },
      {
        "m": "kia",
        "p": 50000
      },
      {
        "m": "kia",
        "p": 17500
      },
      {
        "m": "hyundai",
        "p": 56000
      },
      {
        "m": "hyundai",
        "p": 37000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "bmw",
        "p": 85000
      },
      {
        "m": "dodge",
        "p": 11000
      },
      {
        "m": "nissan",
        "p": 51000
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "nissan",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 22000
      },
      {
        "m": "honda",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "lada",
        "p": 4500
      },
      {
        "m": "toyota",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "daewoo",
        "p": 8500
      },
      {
        "m": "nissan",
        "p": 33000
      },
      {
        "m": "maxus",
        "p": 30000
      },
      {
        "m": "lada",
        "p": 6500
      },
      {
        "m": "kia",
        "p": 12000
      },
      {
        "m": "lada",
        "p": 3500
      },
      {
        "m": "jac",
        "p": 19000
      },
      {
        "m": "toyota",
        "p": 40000
      },
      {
        "m": "hyundai",
        "p": 23500
      },
      {
        "m": "kia",
        "p": 15500
      },
      {
        "m": "plymouth",
        "p": 4000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "nissan",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 36000
      },
      {
        "m": "jac",
        "p": 20000
      },
      {
        "m": "audi",
        "p": 8000
      },
      {
        "m": "kia",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "hyundai",
        "p": 10000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "hyundai",
        "p": 33000
      },
      {
        "m": "chevrolet",
        "p": 6500
      },
      {
        "m": "dongfeng",
        "p": 27000
      },
      {
        "m": "hyundai",
        "p": 18500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "mitsubishi",
        "p": 55000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "chevrolet",
        "p": 28000
      },
      {
        "m": "foton",
        "p": 50000
      },
      {
        "m": "seat",
        "p": 9000
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "peugeot",
        "p": 7500
      },
      {
        "m": "kia",
        "p": 13000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "kia",
        "p": 15500
      },
      {
        "m": "mercedes-benz",
        "p": 35000
      },
      {
        "m": "peugeot",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 28000
      },
      {
        "m": "hyundai",
        "p": 43500
      },
      {
        "m": "honda",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 43500
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "hyundai",
        "p": 34000
      },
      {
        "m": "fiat",
        "p": 6500
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 29500
      },
      {
        "m": "honda",
        "p": 38000
      },
      {
        "m": "hyundai",
        "p": 43500
      },
      {
        "m": "mercedes-benz",
        "p": 110000
      },
      {
        "m": "hyundai",
        "p": 12000
      },
      {
        "m": "plymouth",
        "p": 6500
      },
      {
        "m": "dodge",
        "p": 6000
      },
      {
        "m": "honda",
        "p": 30000
      },
      {
        "m": "hyundai",
        "p": 29000
      },
      {
        "m": "lada",
        "p": 4800
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "kia",
        "p": 15000
      },
      {
        "m": "toyota",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 14500
      },
      {
        "m": "byd",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 14500
      },
      {
        "m": "toyota",
        "p": 23000
      },
      {
        "m": "renault",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 19000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "seat",
        "p": 7500
      },
      {
        "m": "hyundai",
        "p": 41000
      },
      {
        "m": "mazda",
        "p": 37000
      },
      {
        "m": "hyundai",
        "p": 26000
      },
      {
        "m": "nissan",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "hyundai",
        "p": 24000
      },
      {
        "m": "hyundai",
        "p": 43000
      },
      {
        "m": "foton",
        "p": 56000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "fiat",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 12500
      },
      {
        "m": "kia",
        "p": 16000
      },
      {
        "m": "hyundai",
        "p": 42000
      },
      {
        "m": "toyota",
        "p": 19000
      },
      {
        "m": "hyundai",
        "p": 21000
      },
      {
        "m": "toyota",
        "p": 34000
      },
      {
        "m": "lada",
        "p": 9500
      },
      {
        "m": "kia",
        "p": 16500
      },
      {
        "m": "hyundai",
        "p": 30000
      },
      {
        "m": "mercedes-benz",
        "p": 80000
      },
      {
        "m": "chevrolet",
        "p": 14500
      },
      {
        "m": "hyundai",
        "p": 51000
      },
      {
        "m": "cadillac",
        "p": 130000
      },
      {
        "m": "kia",
        "p": 14500
      },
      {
        "m": "hyundai",
        "p": 40000
      },
      {
        "m": "lada",
        "p": 8200
      },
      {
        "m": "peugeot",
        "p": 14000
      },
      {
        "m": "kia",
        "p": 18000
      },
      {
        "m": "kia",
        "p": 21000
      },
      {
        "m": "kia",
        "p": 13000
      },
      {
        "m": "hyundai",
        "p": 32000
      },
      {
        "m": "hyundai",
        "p": 21500
      },
      {
        "m": "kia",
        "p": 14000
      },
      {
        "m": "hyundai",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 17000
      },
      {
        "m": "kia",
        "p": 14500
      },
      {
        "m": "hyundai",
        "p": 25000
      },
      {
        "m": "kia",
        "p": 20000
      },
      {
        "m": "mitsubishi",
        "p": 27000
      },
      {
        "m": "nissan",
        "p": 23000
      },
      {
        "m": "renault",
        "p": 11000
      },
      {
        "m": "kia",
        "p": 15000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "audi",
        "p": 20000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "chevrolet",
        "p": 55000
      },
      {
        "m": "toyota",
        "p": 35000
      },
      {
        "m": "dongfeng",
        "p": 22000
      },
      {
        "m": "bmw",
        "p": 110000
      },
      {
        "m": "honda",
        "p": 22000
      },
      {
        "m": "mg",
        "p": 13000
      },
      {
        "m": "volkswagen",
        "p": 9500
      },
      {
        "m": "kia",
        "p": 17000
      },
      {
        "m": "hyundai",
        "p": 35000
      },
      {
        "m": "hyundai",
        "p": 14000
      },
      {
        "m": "ford",
        "p": 15000
      },
      {
        "m": "kia",
        "p": 24000
      },
      {
        "m": "kia",
        "p": 23000
      },
      {
        "m": "hyundai",
        "p": 12000
      }
    ]
  },
  "formal": {
    "catalogo": [
      {
        "entidad": "BDC ONE",
        "marca": "MAXUS",
        "modelo": "MAXUS T60 4X2",
        "clase": "Auto",
        "propulsion": "camioneta",
        "precio_usd": 19364,
        "precio_original": 17281.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MAXUS",
        "modelo": "MAXUS T60 4X4",
        "clase": "Auto",
        "propulsion": "camioneta",
        "precio_usd": 20754,
        "precio_original": 18522.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MAXUS",
        "modelo": "MAXUS G10",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 24592,
        "precio_original": 21947.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MAXUS",
        "modelo": "MAXUS eDELIVER 3 EV",
        "clase": "Auto",
        "propulsion": "electrico",
        "precio_usd": 25347,
        "precio_original": 22621.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MAXUS",
        "modelo": "MAXUS G90 LUXURY",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 31929,
        "precio_original": 28495.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "NEW MG3 LUXURY",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 16639,
        "precio_original": 14849.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "NEW MG5 COMFORT",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 16875,
        "precio_original": 15060.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG ZS COMFORT",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 17677,
        "precio_original": 15776.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG RX5 DCT TROPHY",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 22329,
        "precio_original": 19927.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG G50 COMFORT",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 23463,
        "precio_original": 20939.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG4 EV 64 kWh LUXURY",
        "clase": "Auto",
        "propulsion": "electrico",
        "precio_usd": 28282,
        "precio_original": 25240.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG RX8 DELUXE",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 33163,
        "precio_original": 29596.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "BDC ONE",
        "marca": "MG",
        "modelo": "MG RX9 DELUXE",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 35272,
        "precio_original": 31478.0,
        "moneda": "EUR",
        "url": "https://bdcone.online/autos/"
      },
      {
        "entidad": "CIMEX",
        "marca": "Microbus",
        "modelo": "V7",
        "clase": "SUV/Utilitario",
        "propulsion": "",
        "precio_usd": 30190,
        "precio_original": 30190.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "CIMEX",
        "marca": "Nissan",
        "modelo": "Sunny",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 31900,
        "precio_original": 31900.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "CIMEX",
        "marca": "Nissan",
        "modelo": "Kicks",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 35000,
        "precio_original": 35000.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "CIMEX",
        "marca": "Nissan",
        "modelo": "Navara",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 44950,
        "precio_original": 44950.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "CIMEX",
        "marca": "Pickup",
        "modelo": "F3",
        "clase": "SUV/Utilitario",
        "propulsion": "",
        "precio_usd": 29950,
        "precio_original": 29950.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "CIMEX",
        "marca": "Toyota",
        "modelo": "Levin",
        "clase": "Auto",
        "propulsion": "",
        "precio_usd": 22380,
        "precio_original": 22380.0,
        "moneda": "USD",
        "url": ""
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "shine",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 17816,
        "precio_original": 15900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/shine/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "shine-automatico-e2",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 18937,
        "precio_original": 16900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/shine-automatico-e2/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "shine-gs",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 20057,
        "precio_original": 17900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/shine-gs/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "m5-cargo",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 21402,
        "precio_original": 19100.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/m5-cargo/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "m5-pasajeros",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 22523,
        "precio_original": 20100.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/m5-pasajeros/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "box-430",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 24540,
        "precio_original": 21900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/box-430/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "t5-evo",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 26781,
        "precio_original": 23900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/t5-evo/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "mage-phev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 27901,
        "precio_original": 24900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/mage-phev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "rich-6",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 27901,
        "precio_original": 24900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/rich-6/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "vigo-480",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 27901,
        "precio_original": 24900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/vigo-480/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "sky-ev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 29022,
        "precio_original": 25900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/sky-ev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "epi-007-phev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 32383,
        "precio_original": 28900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/epi-007-phev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "friday-phev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 32383,
        "precio_original": 28900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/friday-phev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "huge-hev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 32383,
        "precio_original": 28900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/huge-hev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "rich-7-tiger",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 32383,
        "precio_original": 28900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/rich-7-tiger/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "epi-007-530",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 33504,
        "precio_original": 29900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/epi-007-530/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "epi-008-phev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 33504,
        "precio_original": 29900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/epi-008-phev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "friday-ev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 33504,
        "precio_original": 29900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/friday-ev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "k33-cargo",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 33504,
        "precio_original": 29900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/k33-cargo/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "k33-pasajeros",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 34624,
        "precio_original": 30900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/k33-pasajeros/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "z9-diesel",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 34624,
        "precio_original": 30900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/z9-diesel/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "m5-cargo-400",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 37090,
        "precio_original": 33100.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/m5-cargo-400/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "m5-pasajeros-400",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 38210,
        "precio_original": 34100.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/m5-pasajeros-400/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "k33-refrigerado",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 39106,
        "precio_original": 34900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/k33-refrigerado/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "z9",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 44709,
        "precio_original": 39900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/z9/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "rich-7-ev",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 46950,
        "precio_original": 41900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/rich-7-ev/"
      },
      {
        "entidad": "DONGFENG CUBA",
        "marca": "Dongfeng",
        "modelo": "v9",
        "clase": "Auto/Comercial",
        "propulsion": "",
        "precio_usd": 48071,
        "precio_original": 42900.0,
        "moneda": "EUR",
        "url": "https://dongfengqba.com/modelos/v9/"
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "BAIC",
        "modelo": "X35 Fashion Plus",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 27005,
        "precio_original": 24100.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "BAIC",
        "modelo": "BJ 30 LV2",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 42608,
        "precio_original": 38025.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "BAIC",
        "modelo": "BJ 40 Exclusive",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 48379,
        "precio_original": 43175.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "BAIC",
        "modelo": "BJ 60 Exclusive",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 73871,
        "precio_original": 65925.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Bestune",
        "modelo": "PONY",
        "clase": "Auto",
        "propulsion": "Eléctrico",
        "precio_usd": 10645,
        "precio_original": 9500.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Bestune",
        "modelo": "Joyee 03",
        "clase": "Auto",
        "propulsion": "Eléctrico",
        "precio_usd": 26237,
        "precio_original": 23415.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Bestune",
        "modelo": "T77",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 32699,
        "precio_original": 29182.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Bestune",
        "modelo": "T90 Premium",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 33818,
        "precio_original": 30180.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Changan",
        "modelo": "CS35 Plus",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 26893,
        "precio_original": 24000.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Changan",
        "modelo": "CS55 Plus",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 29134,
        "precio_original": 26000.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Changan",
        "modelo": "X7 Plus",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 31263,
        "precio_original": 27900.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Changan Deepal",
        "modelo": "S05 PHEV",
        "clase": "Auto",
        "propulsion": "REEV",
        "precio_usd": 38546,
        "precio_original": 34400.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "DFSK",
        "modelo": "Glory 330 S",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 20639,
        "precio_original": 18419.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "DFSK",
        "modelo": "Glory 500 M3",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 25173,
        "precio_original": 22465.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "DFSK",
        "modelo": "Glory 500 M6",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 28013,
        "precio_original": 25000.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "DFSK",
        "modelo": "Glory 580 Intelligent",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 32207,
        "precio_original": 28743.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "DFSK",
        "modelo": "E5 M1",
        "clase": "Auto",
        "propulsion": "Híbrido",
        "precio_usd": 36725,
        "precio_original": 32775.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "View G5",
        "clase": "Microbús",
        "propulsion": "Gasolina",
        "precio_usd": 27229,
        "precio_original": 24300.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Tunland G7 Doble Cabina MT",
        "clase": "Camioneta",
        "propulsion": "Diésel",
        "precio_usd": 38658,
        "precio_original": 34500.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "View CS2 (Panel Mixto)",
        "clase": "Panel",
        "propulsion": "Diésel",
        "precio_usd": 39951,
        "precio_original": 35654.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "View CS2 (Panel de Carga)",
        "clase": "Panel",
        "propulsion": "Diésel",
        "precio_usd": 41006,
        "precio_original": 36595.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "View i7 (Panel de Carga)",
        "clase": "Panel",
        "propulsion": "Eléctrico",
        "precio_usd": 41448,
        "precio_original": 36990.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "View CS2 (Microbús)",
        "clase": "Microbús",
        "propulsion": "Diésel",
        "precio_usd": 42420,
        "precio_original": 37857.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Tunland G7 Doble Cabina MT con CarryBoy",
        "clase": "Camioneta",
        "propulsion": "Diésel",
        "precio_usd": 42675,
        "precio_original": 38085.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Tunland G9 Doble Cabina MT",
        "clase": "Camioneta",
        "propulsion": "Diésel",
        "precio_usd": 44709,
        "precio_original": 39900.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Tunland G9 Doble Cabina AT",
        "clase": "Camioneta",
        "propulsion": "Diésel",
        "precio_usd": 49864,
        "precio_original": 44500.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Toano (Panel de Carga)",
        "clase": "Panel",
        "propulsion": "Diésel",
        "precio_usd": 50413,
        "precio_original": 44990.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Toano (Microbús – 14+1)",
        "clase": "Microbús",
        "propulsion": "Diésel",
        "precio_usd": 50648,
        "precio_original": 45200.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Toano (Panel de Carga )",
        "clase": "Panel",
        "propulsion": "Eléctrico",
        "precio_usd": 53863,
        "precio_original": 48069.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Toano (Microbús – 17+1)",
        "clase": "Microbús",
        "propulsion": "Diésel",
        "precio_usd": 54010,
        "precio_original": 48200.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Toano (Microbús Eléctrico)",
        "clase": "Microbús",
        "propulsion": "Eléctrico",
        "precio_usd": 54895,
        "precio_original": 48990.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Foton",
        "modelo": "Tunland G9 Doble Cabina AT Con CarryBoy",
        "clase": "Camioneta",
        "propulsion": "Diésel",
        "precio_usd": 54982,
        "precio_original": 49068.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Mercedes-Benz",
        "modelo": "Clase A 200 Hatchback",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 46950,
        "precio_original": 41900.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Mercedes-Benz",
        "modelo": "GLA 200 4MATIC",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 61517,
        "precio_original": 54900.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Mercedes-Benz",
        "modelo": "GLC 200 4MATIC",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 72722,
        "precio_original": 64900.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Mercedes-Benz",
        "modelo": "Clase C 200",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 73773,
        "precio_original": 65838.0,
        "moneda": "EUR",
        "url": ""
      },
      {
        "entidad": "MCV Comercial S.A.",
        "marca": "Mercedes-Benz",
        "modelo": "GLC Coupé 200 4MATIC",
        "clase": "Auto",
        "propulsion": "Gasolina",
        "precio_usd": 79125,
        "precio_original": 70614.0,
        "moneda": "EUR",
        "url": ""
      }
    ],
    "marcas": [
      {
        "clave": "dongfeng",
        "label": "Dongfeng",
        "modelos": 27,
        "mediana": 32383,
        "p25": 27341,
        "p75": 34624,
        "min": 17816,
        "max": 48071
      },
      {
        "clave": "foton",
        "label": "Foton",
        "modelos": 15,
        "mediana": 44709,
        "p25": 41227,
        "p75": 52255,
        "min": 27229,
        "max": 54982
      },
      {
        "clave": "mg",
        "label": "MG",
        "modelos": 8,
        "mediana": 22896,
        "p25": 17476,
        "p75": 29502,
        "min": 16639,
        "max": 35272
      },
      {
        "clave": "dfsk",
        "label": "DFSK",
        "modelos": 5,
        "mediana": 28013,
        "p25": 25173,
        "p75": 32207,
        "min": 20639,
        "max": 36725
      },
      {
        "clave": "maxus",
        "label": "MAXUS",
        "modelos": 5,
        "mediana": 24592,
        "p25": 20754,
        "p75": 25347,
        "min": 19364,
        "max": 31929
      },
      {
        "clave": "mercedes-benz",
        "label": "Mercedes-Benz",
        "modelos": 5,
        "mediana": 72722,
        "p25": 61517,
        "p75": 73773,
        "min": 46950,
        "max": 79125
      },
      {
        "clave": "baic",
        "label": "BAIC",
        "modelos": 4,
        "mediana": 45493,
        "p25": 38707,
        "p75": 54752,
        "min": 27005,
        "max": 73871
      },
      {
        "clave": "bestune",
        "label": "Bestune",
        "modelos": 4,
        "mediana": 29468,
        "p25": 22339,
        "p75": 32979,
        "min": 10645,
        "max": 33818
      },
      {
        "clave": "changan",
        "label": "Changan",
        "modelos": 4,
        "mediana": 30198,
        "p25": 28573,
        "p75": 33084,
        "min": 26893,
        "max": 38546
      },
      {
        "clave": "nissan",
        "label": "Nissan",
        "modelos": 3,
        "mediana": 35000,
        "p25": 33450,
        "p75": 39975,
        "min": 31900,
        "max": 44950
      },
      {
        "clave": "toyota",
        "label": "Toyota",
        "modelos": 1,
        "mediana": 22380,
        "p25": 22380,
        "p75": 22380,
        "min": 22380,
        "max": 22380
      }
    ],
    "entidades": [
      {
        "clave": "MCV Comercial S.A.",
        "label": "MCV Comercial S.A.",
        "marcas": 6,
        "modelos": 37,
        "mediana": 41448,
        "p25": 31263,
        "p75": 50648,
        "min": 10645,
        "max": 79125
      },
      {
        "clave": "DONGFENG CUBA",
        "label": "DONGFENG CUBA",
        "marcas": 1,
        "modelos": 27,
        "mediana": 32383,
        "p25": 27341,
        "p75": 34624,
        "min": 17816,
        "max": 48071
      },
      {
        "clave": "BDC ONE",
        "label": "BDC ONE",
        "marcas": 2,
        "modelos": 13,
        "mediana": 23463,
        "p25": 19364,
        "p75": 28282,
        "min": 16639,
        "max": 35272
      },
      {
        "clave": "CIMEX",
        "label": "CIMEX",
        "marcas": 4,
        "modelos": 6,
        "mediana": 31045,
        "p25": 30010,
        "p75": 34225,
        "min": 22380,
        "max": 44950
      }
    ],
    "precios_validos": [
      10645,
      16639,
      16875,
      17677,
      17816,
      18937,
      19364,
      20057,
      20639,
      20754,
      21402,
      22329,
      22380,
      22523,
      23463,
      24540,
      24592,
      25173,
      25347,
      26237,
      26781,
      26893,
      27005,
      27229,
      27901,
      27901,
      27901,
      28013,
      28282,
      29022,
      29134,
      29950,
      30190,
      31263,
      31900,
      31929,
      32207,
      32383,
      32383,
      32383,
      32383,
      32699,
      33163,
      33504,
      33504,
      33504,
      33504,
      33818,
      34624,
      34624,
      35000,
      35272,
      36725,
      37090,
      38210,
      38546,
      38658,
      39106,
      39951,
      41006,
      41448,
      42420,
      42608,
      42675,
      44709,
      44709,
      44950,
      46950,
      46950,
      48071,
      48379,
      49864,
      50413,
      50648,
      53863,
      54010,
      54895,
      54982,
      61517,
      72722,
      73773,
      73871,
      79125
    ],
    "rango": {
      "min": 10645,
      "max": 79125
    }
  },
  "comparacion": {
    "criterio": "≥10 anuncios informales y presencia en catálogo formal; el catálogo no es una muestra",
    "marcas": [
      {
        "clave": "foton",
        "label": "Foton",
        "estado": "comparable",
        "informal": {
          "n": 10,
          "mediana": 50000,
          "calidad": "baja"
        },
        "formal": {
          "modelos": 15,
          "mediana": 44709
        },
        "diferencia": 5291,
        "direccion": "informal"
      },
      {
        "clave": "dongfeng",
        "label": "Dongfeng",
        "estado": "comparable",
        "informal": {
          "n": 32,
          "mediana": 35000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 27,
          "mediana": 32383
        },
        "diferencia": 2617,
        "direccion": "informal"
      },
      {
        "clave": "nissan",
        "label": "Nissan",
        "estado": "comparable",
        "informal": {
          "n": 106,
          "mediana": 30000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 3,
          "mediana": 35000
        },
        "diferencia": 5000,
        "direccion": "formal"
      },
      {
        "clave": "mercedes-benz",
        "label": "Mercedes-Benz",
        "estado": "comparable",
        "informal": {
          "n": 31,
          "mediana": 25000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 5,
          "mediana": 72722
        },
        "diferencia": 47722,
        "direccion": "formal"
      },
      {
        "clave": "toyota",
        "label": "Toyota",
        "estado": "comparable",
        "informal": {
          "n": 127,
          "mediana": 24997,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 1,
          "mediana": 22380
        },
        "diferencia": 2617,
        "direccion": "informal"
      },
      {
        "clave": "mg",
        "label": "MG",
        "estado": "comparable",
        "informal": {
          "n": 19,
          "mediana": 24000,
          "calidad": "baja"
        },
        "formal": {
          "modelos": 8,
          "mediana": 22896
        },
        "diferencia": 1104,
        "direccion": "informal"
      }
    ],
    "cobertura": [
      {
        "clave": "audi",
        "label": "Audi",
        "estado": "solo_informal",
        "informal": {
          "n": 24,
          "mediana": 18500,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "baic",
        "label": "BAIC",
        "estado": "informal_baja",
        "informal": {
          "n": 7,
          "mediana": 33000,
          "calidad": "insuficiente"
        },
        "formal": {
          "modelos": 4,
          "mediana": 45493
        }
      },
      {
        "clave": "bestune",
        "label": "Bestune",
        "estado": "solo_formal",
        "informal": null,
        "formal": {
          "modelos": 4,
          "mediana": 29468
        }
      },
      {
        "clave": "bmw",
        "label": "BMW",
        "estado": "solo_informal",
        "informal": {
          "n": 33,
          "mediana": 46000,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "changan",
        "label": "Changan",
        "estado": "informal_baja",
        "informal": {
          "n": 1,
          "mediana": 33000,
          "calidad": "insuficiente"
        },
        "formal": {
          "modelos": 4,
          "mediana": 30198
        }
      },
      {
        "clave": "chevrolet",
        "label": "Chevrolet",
        "estado": "solo_informal",
        "informal": {
          "n": 67,
          "mediana": 9500,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "daewoo",
        "label": "Daewoo",
        "estado": "solo_informal",
        "informal": {
          "n": 16,
          "mediana": 8500,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "dfsk",
        "label": "DFSK",
        "estado": "solo_formal",
        "informal": null,
        "formal": {
          "modelos": 5,
          "mediana": 28013
        }
      },
      {
        "clave": "dongfeng",
        "label": "Dongfeng",
        "estado": "comparable",
        "informal": {
          "n": 32,
          "mediana": 35000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 27,
          "mediana": 32383
        },
        "diferencia": 2617,
        "direccion": "informal"
      },
      {
        "clave": "fiat",
        "label": "Fiat",
        "estado": "solo_informal",
        "informal": {
          "n": 51,
          "mediana": 5500,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "ford",
        "label": "Ford",
        "estado": "solo_informal",
        "informal": {
          "n": 28,
          "mediana": 11750,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "foton",
        "label": "Foton",
        "estado": "comparable",
        "informal": {
          "n": 10,
          "mediana": 50000,
          "calidad": "baja"
        },
        "formal": {
          "modelos": 15,
          "mediana": 44709
        },
        "diferencia": 5291,
        "direccion": "informal"
      },
      {
        "clave": "geely",
        "label": "Geely",
        "estado": "solo_informal",
        "informal": {
          "n": 25,
          "mediana": 11600,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "honda",
        "label": "Honda",
        "estado": "solo_informal",
        "informal": {
          "n": 74,
          "mediana": 32250,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "hyundai",
        "label": "Hyundai",
        "estado": "solo_informal",
        "informal": {
          "n": 713,
          "mediana": 29000,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "jeep",
        "label": "Jeep",
        "estado": "solo_informal",
        "informal": {
          "n": 10,
          "mediana": 11000,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "kia",
        "label": "Kia",
        "estado": "solo_informal",
        "informal": {
          "n": 177,
          "mediana": 18000,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "lada",
        "label": "Lada",
        "estado": "solo_informal",
        "informal": {
          "n": 161,
          "mediana": 6500,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "land rover",
        "label": "Land Rover",
        "estado": "solo_informal",
        "informal": {
          "n": 14,
          "mediana": 43500,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "maxus",
        "label": "MAXUS",
        "estado": "informal_baja",
        "informal": {
          "n": 7,
          "mediana": 30000,
          "calidad": "insuficiente"
        },
        "formal": {
          "modelos": 5,
          "mediana": 24592
        }
      },
      {
        "clave": "mercedes-benz",
        "label": "Mercedes-Benz",
        "estado": "comparable",
        "informal": {
          "n": 31,
          "mediana": 25000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 5,
          "mediana": 72722
        },
        "diferencia": 47722,
        "direccion": "formal"
      },
      {
        "clave": "mg",
        "label": "MG",
        "estado": "comparable",
        "informal": {
          "n": 19,
          "mediana": 24000,
          "calidad": "baja"
        },
        "formal": {
          "modelos": 8,
          "mediana": 22896
        },
        "diferencia": 1104,
        "direccion": "informal"
      },
      {
        "clave": "mitsubishi",
        "label": "Mitsubishi",
        "estado": "solo_informal",
        "informal": {
          "n": 22,
          "mediana": 23500,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "moskvich",
        "label": "Moskvich",
        "estado": "solo_informal",
        "informal": {
          "n": 16,
          "mediana": 5250,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "nissan",
        "label": "Nissan",
        "estado": "comparable",
        "informal": {
          "n": 106,
          "mediana": 30000,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 3,
          "mediana": 35000
        },
        "diferencia": 5000,
        "direccion": "formal"
      },
      {
        "clave": "opel",
        "label": "Opel",
        "estado": "solo_informal",
        "informal": {
          "n": 10,
          "mediana": 5000,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "peugeot",
        "label": "Peugeot",
        "estado": "solo_informal",
        "informal": {
          "n": 30,
          "mediana": 12000,
          "calidad": "suficiente"
        },
        "formal": null
      },
      {
        "clave": "renault",
        "label": "Renault",
        "estado": "solo_informal",
        "informal": {
          "n": 20,
          "mediana": 10750,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "skoda",
        "label": "Skoda",
        "estado": "solo_informal",
        "informal": {
          "n": 15,
          "mediana": 5000,
          "calidad": "baja"
        },
        "formal": null
      },
      {
        "clave": "toyota",
        "label": "Toyota",
        "estado": "comparable",
        "informal": {
          "n": 127,
          "mediana": 24997,
          "calidad": "suficiente"
        },
        "formal": {
          "modelos": 1,
          "mediana": 22380
        },
        "diferencia": 2617,
        "direccion": "informal"
      },
      {
        "clave": "volkswagen",
        "label": "Volkswagen",
        "estado": "solo_informal",
        "informal": {
          "n": 76,
          "mediana": 8950,
          "calidad": "suficiente"
        },
        "formal": null
      }
    ]
  }
};
