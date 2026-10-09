"""Prueba la API GraphQL de Revolico: AdsSearch + categorías."""
import json

import requests

GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
    "Origin": "https://www.revolico.com",
}

ADS_SEARCH = """
query AdsSearch(
  $category: ID
  $subcategory: ID
  $contains: String
  $price: BasePriceFilterInput
  $sort: [adsPerPageSort]
  $hasImage: Boolean
  $categorySlug: String
  $subcategorySlug: String
  $page: Int
  $provinceSlug: String
  $municipalitySlug: String
  $pageLength: Int
) {
  adsPerPage(
    category: $category
    subcategory: $subcategory
    contains: $contains
    price: $price
    hasImage: $hasImage
    sort: $sort
    categorySlug: $categorySlug
    subcategorySlug: $subcategorySlug
    page: $page
    provinceSlug: $provinceSlug
    municipalitySlug: $municipalitySlug
    pageLength: $pageLength
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
      pageCount
    }
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
        mainImage {
          gcsKey
        }
        viewCount
        contactInfo
        phoneInfo {
          firstPhone {
            prefix
            number
            type
            isWhatsapp
          }
          secondPhone {
            prefix
            number
            type
            isWhatsapp
          }
        }
      }
    }
    meta {
      total
    }
  }
}
"""

CATEGORIES = """
query CategoriesSelect($hasDescription: Boolean!) {
  categories {
    id
    title
    slug
    order
    subcategories {
      id
      title
      slug
    }
    description @include(if: $hasDescription)
  }
}
"""


def post(query, variables):
    r = requests.post(GRAPHQL, headers=HEADERS,
                      json={"query": query, "variables": variables}, timeout=30)
    print("STATUS:", r.status_code)
    return r


print("=" * 70)
print("1) CATEGORÍAS (buscamos 'Carro' / 'Auto')")
print("=" * 70)
r = post(CATEGORIES, {"hasDescription": False})
try:
    cats = r.json()["data"]["categories"]
    for c in cats:
        t = c["title"].lower()
        if "carro" in t or "auto" in t or "moto" in t or "vehic" in t or "accident" in t:
            print(f"  CAT: {c['title']} (id={c['id']}, slug={c['slug']})")
            for sc in c["subcategories"]:
                print(f"      -> {sc['title']} (id={sc['id']}, slug={sc['slug']})")
except Exception as e:
    print("Error parseando categorías:", e)
    print(r.text[:800])

print()
print("=" * 70)
print("2) BÚSQUEDA con contains='carro' (página 1, 20 resultados)")
print("=" * 70)
r = post(ADS_SEARCH, {"contains": "carro", "page": 1, "pageLength": 20})
try:
    body = r.json()
    d = body["data"]["adsPerPage"]
    print("TOTAL encontrados:", d["meta"]["total"])
    print("Páginas:", d["pageInfo"]["pageCount"])
    for e in d["edges"][:5]:
        n = e["node"]
        print("  -", n["price"], n["currency"], "|", n["title"][:60], "| prov:", n["provinceId"])
except Exception as e:
    print("Error:", e)
    print(r.text[:1500])