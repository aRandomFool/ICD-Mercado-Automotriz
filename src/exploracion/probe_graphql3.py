"""Sondeo 3: categorías completas, provincias y un anuncio a detalle."""
import json

import requests

GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
    "Origin": "https://www.revolico.com",
}

CATEGORIES = """
query CategoriesSelect($hasDescription: Boolean!) {
  categories {
    id
    title
    slug
    subcategories {
      id
      title
      slug
    }
  }
}
"""

PROVINCES = """
query ProvincesWithMunicipalities {
  provinces {
    id
    name
    slug
    municipalities {
      id
      name
      slug
    }
  }
}
"""

ADS_SEARCH = """
query AdsSearch(
  $category: ID
  $subcategory: ID
  $contains: String
  $page: Int
  $provinceSlug: String
  $municipalitySlug: String
  $pageLength: Int
) {
  adsPerPage(
    category: $category
    subcategory: $subcategory
    contains: $contains
    page: $page
    provinceSlug: $provinceSlug
    municipalitySlug: $municipalitySlug
    pageLength: $pageLength
  ) {
    pageInfo { pageCount }
    edges {
      node {
        id
        title
        price
        currency
        permalink
        imagesCount
        updatedOnToOrder
        isPromoted
        provinceId
        municipalityId
        mainImage { gcsKey }
        viewCount
        contactInfo
        phoneInfo {
          firstPhone { prefix number type isWhatsapp }
        }
      }
    }
    meta { total }
  }
}
"""


def post(query, variables):
    r = requests.post(GRAPHQL, headers=HEADERS,
                      json={"query": query, "variables": variables}, timeout=30)
    return r


print("### CATEGORÍAS (todas) ###")
r = post(CATEGORIES, {"hasDescription": False})
try:
    for c in r.json()["data"]["categories"]:
        print(f"CAT {c['title']} (id={c['id']}, slug={c['slug']})")
        for sc in c["subcategories"]:
            print(f"    SUB {sc['title']} (id={sc['id']}, slug={sc['slug']})")
except Exception as e:
    print("ERROR:", e, r.text[:500])

print()
print("### PROVINCIAS ###")
r = post(PROVINCES, {})
try:
    for p in r.json()["data"]["provinces"]:
        print(f"PROV {p['name']} (id={p['id']}, slug={p['slug']})")
except Exception as e:
    print("ERROR:", e, r.text[:500])

print()
print("### BÚSQUEDA ACCIÓN: contiene='carro', provincia La Habana ###")
r = post(ADS_SEARCH, {"contains": "carro", "page": 1, "pageLength": 10,
                      "provinceSlug": "la-habana"})
try:
    d = r.json()["data"]["adsPerPage"]
    print("TOTAL:", d["meta"]["total"], "| páginas:", d["pageInfo"]["pageCount"])
    print(json.dumps(d["edges"][0]["node"], indent=2, ensure_ascii=False))
except Exception as e:
    print("ERROR:", e)
    print(r.text[:1500])