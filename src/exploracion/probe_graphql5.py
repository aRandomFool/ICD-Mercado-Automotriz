"""Sondeo 5: encontrar la variante de filtro de categoría que respeta Revolico."""
import requests

GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
    "Origin": "https://www.revolico.com",
}

QUERY = """
query AdsSearch(
  $category: ID
  $subcategory: ID
  $contains: String
  $categorySlug: String
  $subcategorySlug: String
  $page: Int
  $provinceSlug: String
  $pageLength: Int
) {
  adsPerPage(
    category: $category
    subcategory: $subcategory
    contains: $contains
    categorySlug: $categorySlug
    subcategorySlug: $subcategorySlug
    page: $page
    provinceSlug: $provinceSlug
    pageLength: $pageLength
  ) {
    pageInfo { pageCount }
    edges { node { id title price currency } }
    meta { total }
  }
}
"""

VARIANTES = {
    "A: subcategorySlug solo": {"subcategorySlug": "vehiculos-carros"},
    "B: category+subcategory ids": {"category": "1000", "subcategory": "1004"},
    "C: subcategory id + contains='carro'": {"concisa": None},
}


def probar(nombre, variables):
    vars_ = dict(variables)
    if nombre == "C: subcategory id + contains='carro'":
        vars_ = {"subcategory": "1004", "contains": "carro", "page": 1, "pageLength": 10}
    else:
        vars_["page"] = 1
        vars_["pageLength"] = 10
    vars_.setdefault("provinceSlug", "la-habana")
    r = requests.post(GRAPHQL, headers=HEADERS,
                      json={"query": QUERY, "variables": vars_}, timeout=30)
    body = r.json()
    if body.get("errors"):
        print(f"[{nombre}] ERROR: {body['errors'][0]['message'][:120]}")
        return
    d = body["data"]["adsPerPage"]
    titulos = [e["node"]["title"][:45] for e in d["edges"]][:5]
    print(f"[{nombre}] total={d['meta']['total']} :: {titulos}")


for nombre, variables in VARIANTES.items():
    probar(nombre, variables)